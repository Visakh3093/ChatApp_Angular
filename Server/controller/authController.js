
const userModel = require('../model/userSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const deleteUserData = async (req, res) => {
    try {
        await userModel.deleteMany({});
        return res.status(200).json({ status: 200, message: 'Data deleted successfully' });
    } catch (error) {
        console.log('error: ', error);
    }
}

const createUser = async (req, res) => {
    try {
        const { name, email, password, mobile } = req.body
        if (name && email && password && mobile) {
            const user = await userModel.findOne({ email: email })
            if (user) {
                return res.status(200).json({ status: 400, message: 'User already exist' })
            }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds)
            const newUser = new userModel({
                name: name,
                email: email,
                password: hashedPassword,
                mobile: mobile,
                isAdmin: false
            })

            await newUser.save()
            return res.status(200).json({ status: 200, message: 'User created successfully' })

        }
        else {
            res.status(200).json({ status: 400, message: 'All fields are required' })
        }
    } catch (error) {
        res.status(200).json({ status: 500, message: 'Internal server error' })
    }
}

const loginUser = async (req, res) => {
    try {
        
        const { email, password } = req.body
        if (email && password) {
            const userData = await userModel.findOne({ email: email })
            if (!userData) {
                return res.status(200).json({ status: 400, message: 'User not found' })
            }
            const hashedPassword = userData.password
            bcrypt.compare(password, hashedPassword, (err, result) => {
                if (err) {
                    return res.status(200).json({ error: 'Internal server error' });
                }
                if (!result) {
                    return res.status(200).json({ status: 400, message: 'Invalid credentials' })
                }
                const token = jwt.sign({ userId: userData._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
                return res.status(200).json({ status: 200, message: 'Login successful', token: token })
            })
        }
        else {
            res.status(200).json({ status: 400, message: 'All fields are required' })
        }

    } catch (error) {
        res.status(200).json({ status: 500, message: 'Internal server error' })
    }
}                              

const getLoggedInUser = async (req, res) => {
    try {
        const token = req.header('Authorization')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded)
        {
            const user = await userModel.findById(decoded.userId)
            const resObj = {
                _id: user._id,
                name : user.name,
                email : user.email,
                mobile : user.mobile,
                token : token
            }
            res.status(200).json({ status: 200, data: resObj })
        }
    } catch (error) {
        res.status(200).json({ status: 500, message: 'Internal server error' })
    }
}


module.exports = {
    deleteUserData,
    createUser,
    loginUser,
    getLoggedInUser
}
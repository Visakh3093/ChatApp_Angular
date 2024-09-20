const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')
        if (!token) return res.status(401).json({ status: 401, message: 'Unauthorized' })
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return res.status(401).json({ status: 401, message: 'Invalid token' })
        req.userId = decoded.userId
        req.user = await User.findById(decoded.userId)
        next()
    } catch (error) {
        return res.status(200).json({ status: 500, message: 'Authorization Error' })
    }
}
    
module.exports = authMiddleware;
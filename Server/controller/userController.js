const userModel = require("../model/userSchema")

const searchUsers = async (req, res) => {
    try {
        const keyword = req.query.search
            ? {
                $or: [
                    { name: { $regex: req.query.search, $options: "i" } },
                    { email: { $regex: req.query.search, $options: "i" } },
                ],
            } : {};

        const users = await userModel.find(keyword).find({
            _id: { $ne: req.userId }
        });

        res.status(200).json(users);
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ status: 500, message: 'Internal server error' });
    }
};


module.exports = {
    searchUsers
}
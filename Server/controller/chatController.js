const Chat = require('../model/chatModel')
const chatModel = require('../model/chatModel')
const userModel = require('../model/userSchema')

const accessChat = async (req,res)=>{
    try {
        const { userId } = req.body
        if(!userId)
        {
            return res.status(200).json({ status: 400, message: 'All fields are required' })
        }

        let isChat = await chatModel.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.userId } } },
                { users: { $elemMatch: { $eq: userId } } },
            ],
        }).populate("users", "-password").populate("latestMessage")
        
        isChat = await userModel.populate(isChat, {
            path: "latestMessage.sender",
            select: "name pic email",
        })

        if(isChat.length > 0)
        {
            res.status(200).json({ status: 200, data: isChat[0]})
        }
        else
        {
            let chatData = {
                chatName : "sender",
                isGroupChat : false,
                users : [req.userId, userId]
            }
            const createdChat = await chatModel.create(chatData)
    
            const FullChat = await chatModel.findOne({ _id: createdChat._id }).populate("users", "-password")
    
            res.status(200).json({ status: 200,message:"New Chat Created", data: FullChat})
        }

    } catch (error) {
        console.log('error: ', error);
        return res.status(200).json({ status: 500, message: 'Internal server error' })
    }
} 

const fetchChats = async (req,res)=>{
    try {
        chatModel.find({users:{$elemMatch:{$eq: req.userId}}})
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results)=>{
            results = await userModel.populate(results,{
                path: "latestMessage.sender",
                select: "name pic email",
            })

            res.status(200).json({ status: 200, data: results })
        })
    } catch (error) {
        return res.status(200).json({ status: 500, message: 'Internal server error' })
    }
}

const createGroupChat = async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(200).send({ status: 400, message: "Please Fill all the feilds" });
    }

    var users = JSON.parse(req.body.users);

    if (users.length < 2) {
        return res
            .status(200)
            .send({ status:400, message:"More than 2 users are required to form a group chat"});
    }

    users.push(req.user);

    try {
        const groupChat = await chatModel.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await chatModel.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json({status:200, message:"New Group Chat Created", data:fullGroupChat});
    } catch (error) {
        res.status(200).send({ status: 500, message: "Something went wrong" });
    }
}

const renameGroup = async(req,res)=>{
    try {
        const { chatId, chatName } = req.body

        const updatedChat = await chatModel.findByIdAndUpdate(chatId, { chatName }, { new: true })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

            if(!updatedChat)
            {
                return res.status(404).json({ status: 404, message: 'Chat not found' })
            }

            res.status(200).json({ status: 200, data: updatedChat })

    } catch (error) {
        return res.status(200).json({ status: 500, message: 'Internal server error' })
    }
}

const addToGroup = async (req,res)=>{
    try {

        const {chatId, userId} = req.body

        const added = await chatModel.findByIdAndUpdate(chatId, { $push:{ users:userId } }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password")

        if(!added)
        {
            return res.status(200).json({ status: 404, message: 'Group not found' })
        }

        res.status(200).json({ status: 200, data: added })

        
    } catch (error) {
        return res.status(200).json({ status: 500, message: 'Internal server error' })
    }
}

const removeFromGroup = async (req,res)=>{
    try {
        const {chatId, userId} = req.body

        const removed = await chatModel.findByIdAndUpdate(chatId, {$pull:{ users:userId } }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password")

        if(!removed)
        {
            return res.status(200).json({ status: 404, message: 'chat not found' })
        }

        return res.status(200).json({ status: 200, data: removed })

    } catch (error) {
        return res.status(200).json({ status: 500, message: 'Internal server error' })
    }
}



module.exports = {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup
}
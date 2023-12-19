const Message = require('../models/Message');
const User = require("../models/User");
const Conversation = require('../models/Conversation');

const messageController = {
    sendMessage: async (req, res, next) => {
        try {
            const { senderId, receiverId, content } = req.body;

            const senderExists = await User.findById(senderId);
            const receiverExists = await User.findById(receiverId);

            if (!senderExists || !receiverExists) {
                return res.status(404).json({ message: "Sender or receiver not found." });
            }

            let conversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] }
            });

            if (!conversation) {
                conversation = new Conversation({
                    participants: [senderId, receiverId],
                    messages: []
                });
            }

            conversation.messages.push({
                sender: senderId,
                content: content
            });

            await conversation.save();
            res.status(201).json(conversation);
        } catch (error) {
            console.log("Error in sendMessage:", error);
            res.status(500).json({ message: "An error occurred.", error: error.message });
            next(error);
        }
    },

    getMessages: async (req, res, next) => {
        try {
            const { senderId, receiverId } = req.query;

            const senderExists = await User.findById(senderId);
            const receiverExists = await User.findById(receiverId);

            if (!senderExists || !receiverExists) {
                return res.status(404).json({ message: "Sender or receiver not found." });
            }

            const conversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] }
            }).populate('messages.sender');

            if (!conversation) {
                return res.status(404).json({ message: "No conversation found." });
            }

            res.status(200).json(conversation.messages);
        } catch (error) {
            console.log("Error in getMessages:", error);
            res.status(500).json({ message: "An error occurred.", error: error.message });
            next(error);
        }
    }
};

module.exports = messageController;

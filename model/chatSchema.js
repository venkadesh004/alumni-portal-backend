const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    alumniEmail: {
        type: String,
        required: true
    },
    chats: {
        type: Array
    }
});

const ChatSchema = mongoose.model("ChatSchema", chatSchema);

module.exports = ChatSchema;
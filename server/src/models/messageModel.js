const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
    {
        chatId: String,
        senderId: String,
        text: String,
    },
    {
        timestamps: true,
    }
);

const messageModel = mongoose.model("Message", messageSchema);

module.exports = messageModel;

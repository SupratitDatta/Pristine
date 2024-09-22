import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({
    userIDs: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    seenBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
    lastMessage: String
});

export const Chat = mongoose.model('Chat', chatSchema);
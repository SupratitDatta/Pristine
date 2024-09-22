import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    text: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    chatId: {
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Message = mongoose.model('Message', messageSchema);
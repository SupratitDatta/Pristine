import mongoose, { Schema } from "mongoose";

const savedPostSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    unique: {
        userId: 1,
        postId: 1
    }
});

export const SavedPost = mongoose.model('SavedPost', savedPostSchema);
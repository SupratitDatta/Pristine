import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    savedPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'SavedPost'
    }],
    chatIDs: [{
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    }]
});

export const User = mongoose.model('User', userSchema);
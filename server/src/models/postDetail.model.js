import mongoose, { Schema } from "mongoose";

const postDetailSchema = new Schema({
    desc: {
        type: String,
        required: true
    },
    utilities: {
        type: String
    },
    pet: {
        type: String
    },
    income: {
        type: String,
        required: true
    },
    size: {
        type: Number
    },
    school: {
        type: Number,
        required: true
    },
    bus: {
        type: Number,
        required: true
    },
    restaurant: {
        type: Number
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        unique: true
    }
});

export const PostDetail = mongoose.model('PostDetail', postDetailSchema);  
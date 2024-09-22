import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: [String]
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    bedroom: {
        type: Number,
        required: true
    },
    bathroom: {
        type: Number
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['buy', 'rent']
    },
    property: {
        type: String,
        enum: ['apartment', 'house', 'condo', 'land']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postDetail: {
        type: Schema.Types.ObjectId,
        ref: 'PostDetail'
    },
    savedPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'SavedPost'
    }]
});

export const Post = mongoose.model('Post', postSchema);
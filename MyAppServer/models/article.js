const mongoose = require('mongoose')

const articlsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User',
        required: true
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String
    },
    md: {
        type: String
    },
    picture: {
        type: String
    },
    comment: [
        {
            commentator: {
                type: String,
            },
            commentDate: {
                type: Date,
                default: Date.now
            },
            commentContent: {
                type: String,
            }
        }
    ],
    tag: {
        type: String
    }
})


module.exports = mongoose.model('Article', articlsSchema)
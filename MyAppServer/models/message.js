// 创建用户集合
const mongoose = require('mongoose')
// 创建集合规则
const messageSchema = new mongoose.Schema({
    commentator: {
        type: String,
    },
    commentDate: {
        type: Date,
        default: Date.now
    },
    commentContent: {
        type: String,
    },
    picture: {
        type: String
    }
})


// 创建集合
module.exports = mongoose.model('Message', messageSchema)




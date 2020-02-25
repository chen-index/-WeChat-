// 创建用户集合
const mongoose = require('mongoose')
// 创建集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    personality: {
        type: String
    },
    picture: {
        type: String
    }
})

// Users.create({
//     username: 'admin',
//     email: '949145821@qq.com',
//     password: '123456',
//     role: 'admin',
//     state: 0
// }).then(() => {
//     console.log('用户创建成功')
// }).catch(() => {
//     console.log('用户创建失败')
// })

// 创建集合
module.exports = mongoose.model('User', userSchema)




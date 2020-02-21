var express = require('express');
var router = express.Router();
var Message = require('../models/message')



// 发表评论
router.post('/messages', async (req, res, next) => {
    const { commentator, commentDate, commentContent } = req.body
    let message = await Message.create(req.body)
    if (message) {
        res.json({
            status: "200",
            msg: '发表评论成功',
            result: message
        })
    } else {
        res.json({
            status: "400",
            msg: '发表评论失败'
        })
    }
})

// 获取评论列表
router.get('/messages', async (req, res, next) => {
    let message = await Message.find()
    if (message) {
        res.json({
            status: "200",
            msg: '获取评论列表成功',
            result: message
        })
    } else {
        res.json({
            status: "400",
            msg: '获取评论列表失败'
        })
    }
})

module.exports = router;

var express = require('express');
var router = express.Router();
var Home = require('../models/home')

//点赞
router.post('/sure', async (req, res, next) => {
    const sure = req.body.sure
    let home = await Home.update({
        sure: sure
    })
    if (home) {
        res.json({
            status: "200",
            msg: '点赞成功',
            result: home
        })
    } else {
        res.json({
            status: "400",
            msg: '点赞失败'
        })
    }
})

//获取点赞数
router.get('/sure', async (req, res, next) => {
    let home = await Home.find()
    if (home) {
        res.json({
            status: "200",
            msg: '',
            result: home
        })
    } else {
        res.json({
            status: "400",
            msg: '点赞失败'
        })
    }
})

module.exports = router;
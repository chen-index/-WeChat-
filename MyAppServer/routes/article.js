var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose')
var Article = require('../models/article')
var Users = require('../models/user')
const formidable = require('formidable')
const path = require('path')
var upload = require('../upload')

//设置跨域访问
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

router.post('/upload', upload.single('file'), async (req, res, next) => {
    var file = req.file;
    console.log(req.body);
    console.log(req.file);
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    const { _id, author } = req.body
    console.log(_id)
    var str = file.path
    var stra = str.substr(13)
    console.log(str)
    console.log(stra)
    const article = await Article.updateOne({_id: _id}, {
        picture: stra
    })
    if (article) {
        res.json({
            status: '200',
            msg: '上传图片成功',
            result:{
                article,
            }
        })
    } else {
        res.json({
            status: '400',
            msg: '上传图片失败'
        })
    }

});

// router.post('/upload', async (req, res, next) => {
//     // 创建表单解析对象
//     const form = new formidable.IncomingForm()
//     // 配置上传文件的存放位置\
//     form.uploadDir = path.join(__dirname, '../', 'public', 'uploads')
//     // 保留上传文件的后缀
//     form.keepExtensions = true
//     // 解析表单
//     form.parse(req, (err, fields, files) => {
//         // err错误信息
//         // field 存储普通请求参数
//         // files存储上传的文件信息
//     })
// })

// 发布评论
router.post('/comment' ,async (req, res, next) => {
    const {commentator, commentDate, commentContent, article_id} = req.body
    console.log(article_id)
    let comment = await Article.update({_id: article_id}, {
        '$push':{
            comment: {
                commentator: commentator,
                commentDate: commentDate,
                commentContent: commentContent
            }
        }
    })
    if (comment) {
        res.json({
            status: "200",
            msg: '发表评论成功',
            result: comment
        })
    } else {
        res.json({
            status: "400",
            msg: '发表评论失败'
        })
    }
})

// 获取评论列表
router.get('/comment', async (req, res, next) => {
    const _id = req.param('_id')
    const article = await Article.findOne({_id:_id})
    if (article) {
        res.json({
            status: "200",
            msg: '获取评论列表成功',
            result: article.comment
        })
    } else {
        res.json({
            status: '400',
            msg: '获取评论列表失败'
        })
    }
})

// 添加文章
router.post('/addarticle',async (req, res, next) => {
    const {
        title,
        author,
        publishDate,
        cover,
        content,
        md,
        tag
    } = req.body
    let article = await Article.find()
    Article.create(req.body)
    res.json({
        status: "200",
        msg: '添加文章成功',
        result: article
    })
})

//获取文章列表 分页
router.get('/articles', async (req, res, next) => {
    const pagenum = parseInt(req.param('pagenum'))
    const pagesize = parseInt(req.param('pagesize'))
    // 查询用户数据的总数
    let count = await Article.countDocuments({})
    // 总页数
    let total = parseInt(Math.ceil(count / pagesize))
    // 页码对应的数据查询开始位置
    let start = (pagenum - 1) * pagesize
    // 查询数据库
    let article = await Article.find().sort({'publishDate': -1}).limit(pagesize).skip(start)
    // let articles = article.reverse()
    // let articlesf = articles
    if (article) {
        res.json({
            status: '200',
            msg: '查询成功',
            result:{
                article,
                total: count
            }
        })
    } else {
        res.json({
            status: '400',
            msg: '查询失败'
        })
    }
})

// 根据id查询文章
router.get('/article', async (req, res, next) => {
    const _id = req.query._id
    const article = await Article.findOne({_id: _id})
    if (article) {
        res.json({
            status: '200',
            msg: '查询用户成功',
            result:{
                article,
            }
        })
    } else {
        res.json({
            status: '400',
            msg: '查询用户失败'
        })
    }
})

// 根据id修改文章
router.post('/editarticle', async (req, res, next) => {
    const {title, content, _id, md, userid, author} = req.body
    let aduser = await Users.findOne({_id: userid})
    if (aduser.username !== author && aduser.role !== 'admin') {
        res.json({
            status: '1',
            msg: '用户不能修改他人文章',
        })
    } else if (aduser.username === author || aduser.role === 'admin') {
        let articles = await Article.updateOne({_id: _id}, {
            title: title,
            content: content,
            md: md
        })
        if (articles) {
            res.json({
                status: '200',
                msg: '修改文章成功',
                result:{
                    articles,
                }
            })
        } else {
            res.json({
                status: '400',
                msg: '修改文章失败'
            })
        }
    }
})

//根据id删除文章
router.get('/delete', async (req, res, next) => {
    const id = req.param('id')
    const userid = req.param('userid')
    const author = req.param('author')
    let aduser = await Users.findOne({_id: userid})
    if (aduser.username !== author && aduser.role !== 'admin') {
        res.json({
            status: '1',
            msg: '用户不能修改他人文章'
        })
    } else if (aduser.username === author || aduser.role === 'admin') {
        let article = await Article.findOneAndDelete({_id: id})
        if (article) {
            res.json({
                status: '200',
                msg: '删除用户成功',
                result:''
            })
        } else {
            res.json({
                status: '400',
                msg: '删除用户失败'
            })
        }
    }
})

module.exports = router;
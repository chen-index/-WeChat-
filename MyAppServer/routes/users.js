var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Users = require('../models/user')
var md5 = require('md5-node')
var Joi = require('joi')

mongoose.set('useCreateIndex', true)
// mongoose.connect('mongodb://chenhao:19981026@127.0.0.1:27017/myApp',{useUnifiedTopology: true,useNewUrlParser:true})
mongoose.connect('mongodb://127.0.0.1:27017/myApp',{useUnifiedTopology: true,useNewUrlParser:true})
mongoose.connection.on("connected", function () {
  console.log("MongDB connected success")
})
// useNewUrlParser
mongoose.connection.on("err", function () {
  console.log("MongDB connected fail")
})

mongoose.connection.on("disconnected", function () {
  console.log("MongDB connected disconnected")
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 登录
router.post('/login', async (req, res, next) => {
  const { name } = req.body
  let users = await Users.findOne({name: req.body.name})
    if (users) {
        res.json({
            status:'200',
            msg:'',
            result:{
                name:users.name,
                _id: users._id,
                gender: users.gender,
                personality: users.personality,
            }
        });
    } else {
      res.json({
        status:"400",
        msg:'没有记录过'
      })
    }
  })

//登出接口
router.post('/logout', function (req, res, next) {
  res.cookie('email','',{
    path:'/',
    maxAge:-1
  })
  res.json({
    status:'0',
    msg:'',
    result:''
  })
})

//注册用户
router.post('/register', async (req, res, next) => {
    const { name, gender, personality } = req.body
    let user = await Users.findOne({name: req.body.name})
    // 如果用户已存在
    if (user) {
        return res.json({
            status: "1",
            msg: '名字已被占用'
        })
    } else {
        let users = await Users.create({
            name: name,
            gender: gender,
            personality: personality
        })
        if (users) {
            req.session.name = users.name
            req.session.gender = users.gender
            req.session.personality = users.personality
            res.json({
                status:"200",
                msg:'注册用户成功',
                result: {
                    name:users.name,
                    gender:users.gender,
                    personality:users.personality,
                    _id: users._id
                }
            })
        } else {
            res.json({
                status:"400",
                msg:err.message,
                result: ''
            })
        }
    }
})


//添加用户
router.post('/add', async (req, res, next) => {
  const { state,
          username,
          email,
          password,
          role } = req.body
    var md5password = md5(password)
    let user = await Users.findOne({email: req.body.email})
  // 如果用户已存在
  if (user) {
    return res.json({
      status: "1",
      msg: '邮箱已被占用'
    })
  } else {
    Users.create({
        state: state,
        username: username,
        email: email,
        role: role,
        password: md5password
    })
    res.json({
      status:"200",
      msg:'添加用户成功',
      result: ''
    })
  }
})

// 渲染用户列表 分页功能
router.get('/users', async (req, res, next) => {
  const pagenum = parseInt(req.param('pagenum'))
  const pagesize = parseInt(req.param('pagesize'))
  // 查询用户数据的总数
  let count = await Users.countDocuments({})
  // 总页数
  let total = parseInt(Math.ceil(count / pagesize))
  // 页码对应的数据查询开始位置
  let start = (pagenum - 1) * pagesize
  // 查询数据库
  let users = await Users.find().limit(pagesize).skip(start)
  if (users) {
    res.json({
        status: '200',
        msg: '查询成功',
        result:{
            users,
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

//根据id查询用户
router.get('/user', async (req, res, next) => {
    const id = req.param('id')
    // const id = "5e12c71800bfd015247563d5"
    if (id) {
        // 根据id查询数据库
        let users = await Users.findOne({_id: id})
        // res.send(users)
        if (users) {
            res.json({
                status: '200',
                msg: '查询用户成功',
                result:{
                    users,
                }
            })
        } else {
            res.json({
                status: '400',
                msg: '查询用户失败'
            })
        }
    }
})

// 根据id修改用户
router.post('/edituser', async (req, res, next) => {
    const {username, email, role, _id, userid} = req.body
    let aduser = await Users.findOne({_id: userid})
    if (aduser.role !== 'admin') {
        return res.json({
            status: '1',
            msg: '用户权限不够'
        })
    } else if (aduser.role === 'admin') {
        let user = await Users.updateOne({_id: _id}, {
            username: username,
            email: email,
            role: role
        })
        if (user) {
            res.json({
                status: '200',
                msg: '修改用户成功'
            })
        } else {
            res.json({
                status: '400',
                msg: '修改用户失败'
            })
        }
    } else {
        res.json({
            status: '444',
            msg: '修改用户失败'
        })
    }
})

//修改用户状态
router.post('/updatestate', async (req, res, next) => {
    const { state, _id, userid } = req.body
    let aduser = await Users.findOne({_id: userid})
    if (aduser.role !== 'admin') {
        return res.json({
            status: '1',
            msg: '用户权限不够'
        })
    } else if (aduser.role === 'admin') {
        let users = await Users.updateOne({_id: _id},{
            state: state
        })
        if (users) {
            res.json({
                status: '200',
                msg: '修改状态成功',
                result:''
            })
        } else {
            res.json({
                status: '400',
                msg: '修改状态失败'
            })
        }
    } else {
        res.json({
            status: '400',
            msg: '修改状态失败'
        })
    }
})

//根据id删除用户
router.get('/delete', async (req, res, next) => {
    const id = req.param('id')
    const userid = req.param('userid')
    let aduser = await Users.findOne({_id: userid})
    if (aduser.role !== 'admin') {
        return res.json({
            status: '1',
            msg: '用户权限不够'
        })
    } else if (aduser.role === 'admin') {
        let users = await Users.findOneAndDelete({_id: id})
        if (users) {
            res.json({
                status: '200',
                msg: '删除用户成功',
                result:''
            })
        }
    } else {
        res.json({
            status: '400',
            msg: '删除用户失败'
        })
    }

})


module.exports = router;

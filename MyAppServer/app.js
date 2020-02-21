var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var ejs = require('ejs')
var session = require('express-session')
var upload = require('./upload')
var compression = require('compression')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter = require('./routes/article');
var messageRouter = require('./routes/message');
var homeRouter = require('./routes/home');

var app = express();

//解决跨域
app.all('*', function(req, res, next) {
    //设为指定的域
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("X-Powered-By", ' 3.2.1');
    next();
});

// 数据库连接
// require('./models/connect')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);
app.set('view engine', 'html');

app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
  secret: 'secret key',
  resave: false, //添加 resave 选项
  saveUninitialized: true, //添加 saveUninitialized 选项
  cookie: { maxAge: 60 * 1000 }
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/app/', indexRouter);
app.use('/app/users', usersRouter);
app.use('/app/article', articleRouter);
app.use('/app/message', messageRouter);
app.use('/app/home', homeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// server
// {
//   listen 80;
//   server_name location;
//
//   location / {
//     root /opt/demo/ace;
//   index index.html;
// }
//
//   location /users/.* {
//   proxy_pass http://127.0.0.1:3000;
//       }
//
//   location /article/.* {
//   proxy_pass http://127.0.0.1:3000;
//       }
//
//   location /message/.* {
//   proxy_pass http://127.0.0.1:3000;
//       }
// }

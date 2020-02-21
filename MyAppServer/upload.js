var fs = require('fs');
var path = require('path');
var multer = require('multer')

var createFolder = function(folder){
    try{
        fs.accessSync(folder);
    }catch(e){
        fs.mkdirSync(folder);
    }
};
// var uploadFolder = ('/home/images') // 服务器
var uploadFolder = ('./public/uploads')

createFolder(uploadFolder);

// 通过 filename 属性定制
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        var str = file.originalname.split('.')
        cb(null, Date.now() + '.' + str[1])
    }
});

var upload = multer({ storage: storage })

module.exports = upload;


var http = require('http');
var querystring = require('querystring');
var util = require('util');
var url = require('url');
const cors=require('cors');//解决跨域

var express = require('express');
var fs = require("fs");
var app = module.exports = express();
//配置
function configure() {
  app.use(express.methodOverride());
  app.use(express.cookieParser('keyboard cat'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}
//configure();
//保存base64图片POST方法
app.post('/upload', function (req, res) {
  //接收前台POST过来的base64
  var imgData = req.body.imgData;
  //过滤data:URL
  var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = new Buffer(base64Data, 'base64');
  fs.writeFile("out.png", dataBuffer, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send("保存成功！");
    }
  });
});
if (!module.parent) {
  app.listen(8082);
  console.log('Express started on port 8082');
}

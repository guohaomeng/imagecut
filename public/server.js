var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');



app.use('/public', express.static('public'));

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

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
// 创建服务器

var server = app.listen(8081, function () {
 
   var host = server.address().address
   var port = server.address().port
  
   console.log("访问地址为 http://%s:%s", host, port)
  
 })

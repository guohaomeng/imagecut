var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');



app.use('/public', express.static('public'));

app.get('/index.html', function (req, res) {
  res.sendFile(__dirname + "/" + "index.html");
})

//保存base64图片POST方法
app.post('/upload', function (req, res) {
  //接收前台POST过来的base64
  var imgData = req.body.imgData;
  //过滤data:URL
  var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = new Buffer(base64Data, 'base64');
  fs.writeFile(gettime(), dataBuffer, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send("保存成功！");
    }
  });
});
// 创建服务器
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("访问地址为 http://%s:%s" + "/public/index.html", host, port);

})
//获取时间
function gettime() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  //console.log(year+'年'+month+'月'+day+'日 '+hour+':'+minute+':'+second);
  var time = year + '' + month + '' + day + '' + hour + '' + minute + '' + second;
  console.log(time);
  var filename = time + ".png"
  return filename;
}

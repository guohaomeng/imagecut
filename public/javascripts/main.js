// 选择文件触发事件 
function selectImg(file) {
  //文件为空，返回  
  if (!file.files || !file.files[0]) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function (evt) {
    var replaceSrc = evt.target.result;
    // 更换cropper的图片  
    $('#image').cropper('replace', replaceSrc, false);// 默认false，适应高度，不失真  
  }
  reader.readAsDataURL(file.files[0]);
}
// cropper图片裁剪 
var $image = $('#image');
$image.cropper({
  aspectRatio: 1 / 1,
  preview: ".small",
  crop: function (event) {
    console.log(event.detail.x);
    console.log(event.detail.y);
    console.log(event.detail.width);
    console.log(event.detail.height);
    console.log(event.detail.rotate);
    console.log(event.detail.scaleX);
    console.log(event.detail.scaleY);
  }
});

// 旋转  
function buttonrotage() {
  $('#image').cropper("rotate", 45);
}
//复位
function buttonresize() {
  $('#image').cropper("reset");
}

// 确定按钮点击事件  
function buttonyes() {
	$("#buttonyes1").text("上传中···");
  if ($("#image").attr("src") == null) {
    return false;
  } else {
    var cas = $('#image').cropper('getCroppedCanvas');// 获取被裁剪后的canvas  
    var base64 = cas.toDataURL('image/jpeg'); // 转换为base64  
	console.log(encodeURIComponent(base64));
    //    $("#finalImg").prop("src", base64);// 显示图片  
    uploadFile(encodeURIComponent(base64))//编码后上传服务器  

  }
}

//ajax请求上传  
function uploadFile(file) {
  $.ajax({
    url: 'http://49.233.131.188:8081/upload',
    type: 'POST',
    data: "file=" + file,
    async: true,
    success: function (data) {
      console.log(data);
      $("#buttonyes1").text("确定");
    }
    
  });
}  

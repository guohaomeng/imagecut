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

// Get the Cropper.js instance after initialized
var cropper = $image.data('cropper');
$('img').cropper(options);

$("#getCroppedCanvas").on("click", function () {
  console.log($('#image').cropper('getCroppedCanvas'));;
  var cas = $('#image').cropper('getCroppedCanvas');
  var base64url = cas.toDataURL('image/jpeg');
  cas.toBlob(function (e) {
    console.log(e);  //生成Blob的图片格式
  })
  console.log(base64url); //生成base64图片的格式
  $('.cavans').html(cas)  //在body显示出canvas元素
})


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
  if ($("#image").attr("src") == null) {
    return false;
  } else {
    var cas = $('#image').cropper('getCroppedCanvas');// 获取被裁剪后的canvas  
    var base64 = cas.toDataURL('image/jpeg'); // 转换为base64  

    //    $("#finalImg").prop("src", base64);// 显示图片  
    uploadFile(encodeURIComponent(base64))//编码后上传服务器  

  }
}

//ajax请求上传  
function uploadFile(file) {
  $.ajax({
    url: './upload/upload.do',
    type: 'POST',
    data: "file=" + file,
    async: true,
    success: function (data) {
      console.log(data)
    }
  });
}  

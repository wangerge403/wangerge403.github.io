//初始化摄像头
function init() {
    $("#correct").css("display", "none");
    getMedia();
  
  
}

$(function () {
    init();
    again();
    var timer;
    try {
        connect();   //身份证连接
        // timer = window.setInterval(function () {
        var connect_status = getStatus(); //获取身份证状态
        console.log(123456);
        if (connect_status.status == 1 && connect_status.resultFlag == -1) {
            message_tool.show_alert(connect_status.errorMsg, 2);
            window.clearTimeout(timer);
        } else if (connect_status.status == 0 && connect_status.resultFlag == 0) {
            console.log('读卡器连接成功');
            
            var card_info = readCert();
            if (card_info.resultFlag == 0 && card_info.resultContent) {
                
                console.log(card_info.resultContent);
                read_face_info(card_info);
                
            }
        }
    } catch (error) {
        window.clearTimeout(timer);
        console.log(error);
        // message_tool.show_tips('检查到读卡器异常，您可以通过手动录入身份信息！', 2);
    }
});

var video = document.getElementById("video");
function getMedia() {
    var constraints = {
        video: { width: 140, height: 200 },
        audio: false
    };
    var promise = navigator.mediaDevices.getUserMedia(constraints);

        promise.then(function (MediaStream) {
        video.srcObject = MediaStream;
        video.play();
        if( video.play()){   
            //延时2s拍照                    
            setTimeout(function (){

                takePhoto();
                
            }, 2000);

        }
    }).catch(function (PermissionDeniedError) {
        console.log(PermissionDeniedError);
    })
}
function takePhoto() {
    //获得Canvas对象
    canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, 140, 200);
}

function read_face_info(ret) {

    fillInfo(ret);
 
}
//信息填充
function fillInfo(ret) {
    
    var pName = ret.resultContent.partyName;
    var pSex = ret.resultContent.gender == 1 ? '男' : '女';
    var pNation = ret.resultContent.nation;
    var pBorn = ret.resultContent.bornDay.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1,$2,$3");//变换日期显示
    var pAddress = ret.resultContent.certAddress;

    console.log(ret.resultContent);

    $('#name').html(pName);
    $('#sex').html(pSex);
    $('#nation').html(pNation);
    $('#birthday').html(pBorn);
    $('#address').html(pAddress);

    var canvas1 = document.getElementById("canvas1");
    var ctx1 = canvas1.getContext("2d");
    var img = new Image();
    //指定图片的URL
    img.src = "data:image/jpg;base64," + ret.resultContent.identityPic;
    

    //浏览器加载图片完毕后再绘制图片
    img.onload = function () {

       
            
        //以Canvas画布上的坐标(10,10)为起始点，绘制图像
        ctx1.drawImage(img, 0, 0, 150, 200);
      

    
        setTimeout(function () {
            checkEmpty();
            //人脸比对
            var formData = new FormData();
            var canvas = document.getElementById("canvas");
            var capture_base64 = canvas.toDataURL('image/jpeg');
            var canvas1 = document.getElementById("canvas1");
            var cert_base64 = canvas1.toDataURL('image/jpeg');
          
                $.ajax({
                    url: "http://180.76.140.250:50000/LandowRmtSvr.ashx",
                    type: "POST",
                    data: {
                        cert_base64: cert_base64, 
                        capture_base64: capture_base64, 
                    },
                    dataType: "JSON",
                    success: function (res) {
                        console.log(res)
                        var result = parseInt(res.Data);//字符串转整数
                        if (res.Code == '1'||res.Code == '0') {
                           
                            var newResult = result.toFixed(2); //保留两位有效小数 
                            var mess = '对比成功！';
                            // console.log(newResult);
                            if (newResult >= 80) {
                                
                                $("#dot-ani").html(newResult + '%');
                                doTTS(mess);
                                $("#fa").html("成功！");
                            }
                       
                            //对比成功但不是本人
                            if(result < 80) {
                                var mess = '您应该不是本人！';
                                $("#dot-ani").html(newResult + '%');
                                $("#fa").html("失败！");
                                doTTS(mess);
                                $('.mask').slideDown();
                            }
                        }
                        // 没有检测到人脸再次调用摄像头并请求
                        if (res.Code == '0' && !result) {
                            $("#correct").css({"display":"block"});
                            $("#correct").fadeIn(30);
                            $("#correct").fadeOut(3000);
                            var mess = $('#correct').text();
                            doTTS(mess);
                            $("#dot-ani").html(0 + '%');
                            $("#fa").html("失败！");
                            $('.mask').slideDown();
                        }
                        
                    }
                });
        }, 5000);
    };

}

function upload() {
    var path = document.getElementById("File1").value;
    var path = document.getElementById("File2").value;
    var img = document.getElementById("img1");
    if ($.trim(path) == "") {
        alert("请选择要上传的文件");
        return;
    }

    $("#form1").ajaxSubmit({
        success: function (str) {
            alert(str);
        },
        error: function (error) { alert(error); },
        url: 'LandoCertAuth.ashx', /*设置post提交到的页面*/
        type: "post", /*设置表单以post方法提交*/
        dataType: "text/json" /*设置返回值类型为文本*/
    });
}

//文字转语音

function doTTS(mess) {
    console.log(mess)
    var msg = new SpeechSynthesisUtterance(mess);
    msg.volume = 100;//音量
    msg.rate = 0.6;//语速
    msg.pitch = 1.8;//音调
    console.log(msg);
    window.speechSynthesis.speak(msg);
}

// 来一次
function again(){
    $('#oneMore').click(function(){
        window.location.reload();//刷行当前页面
    })
}
// 取消
$('#cancel').on('click', function(){
    $(this).parent().parent().slideUp();
    
    setTimeout("$(window).attr('location','page1.html')", 2000)
})

//验证canvas画布是否为空函数
function isCanvasBlank(canvas) {

var blank = document.createElement('canvas');//系统获取一个空canvas对象
    blank.width = canvas.width;
    blank.height = canvas.height;
    return canvas.toDataURL() == blank.toDataURL();//比较值相等则为空
}
//调用
//表单非空验证
function checkEmpty() {
    var c=document.getElementById("canvas1"); // 获取html的canvas对象，我这个id="canvas"
    if(isCanvasBlank(c)){
        alert("请放置好你您的身份证！");
    }
}

$(function(){
// 同意协议
$("button.ok").on('click', function(){
    $(".mask").css("display", "none");
})
// 放弃注册
$("button.cancel").on('click', function(){
    $(location).attr("href", "../index.html");
})

// 用户名验证
$("input#user").bind("focus", function () {
        $(".sj1").css("display", "block");
        $(".user_put").css("display", "block");
        $(".ok-tips1").css("display", "none");
    }).bind("blur", function () {
        //失去焦点
        let str = $(this).val();
        str = str.replace(/\s/g, '');//忽略空字符串，将空字符串替换为空格
        console.log(str.length)
        if($(this).val() == '') {
            $(".sj1").css("display", "none");
            $(".user_put").css("display", "none");
        }
        else if(str.length < 6 ){
                $(".user_put").css("border-color", "red");
                $(".sj1").css("border-right-color", "red").css("display", "block");
                $(".user_put").html("请输入正确的用户名！");
                $(".user_put").css({"height": "40px", "width": "160px"})
                              .css("line-height", "40px");
                $(".ok-tips1").css("display", "none");
            }
        else if(str.length >= 6 ){
                $(".sj1").css("display", "none");
                $(".user_put").css("display", "none");
                $(".ok-tips1").fadeIn();
            }
    }).bind("keypress", function (e) {
        if(e.keyCode === 13){
        if($(this).val().replace(/\s/g, '').length >= 6){
            $(".sj1").css("display", "none");
            $(".user_put").css("display", "none");
            $(".ok-tips1").css("display", "block");
        }
    }
    });
//密码验证
    $("input#pass").bind("focus", function () {
        $(".sj2").css("display", "block");
        $(".pass_put").css("display", "block");
        $(".ok-tips2").css("display", "none");
    })
    //阻止回车事件，表单提交
    $("input").bind("keypress", function(e){
        if(e.keyCode === 13){
            e.preventDefault();
        }
    })
}) 




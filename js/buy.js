// 选择版本
$(function(){
    let bgBox = $(".bg .version");

    $(".major .ok1").addClass("ok");
    $(".major").addClass("active");

    vName = $(".major").find("span").eq(0).html(); //版本名称
    uPrice = parseInt($(".major").find("span").eq(1).html()); //优惠价
    oPrice = parseInt($(".or-money").html()); //原价
    $(".money-number").html(uPrice);

    $(".right-form li").click(function(){

        $(".ok1").removeClass("ok");
        $(this).siblings().removeClass("active");

        $(this).find(".ok1").addClass("ok");
        $(this).addClass("active");

        $(this).css({"color": "#1bb859"});

      let text1 =  $(this).find("span").eq(0).html();
          uPrice = parseInt($(this).find("span").eq(1).html()) ;
          
      bgBox.html(text1);
      $(".money-number").html(uPrice);
//原价
      $(".or-money").html(uPrice * 2);
      oPrice = parseInt($(".or-money").html());
    })


    //增加数量
    $(".add").click(function () {
        $(".numbers").val(parseInt($(".numbers").val()) + 1);
        years = parseInt($(".numbers").val());
    });
    $(".reduce").click(function () {
        if(parseInt($(".numbers").val()) > 0) {
            $(".numbers").val(parseInt($(".numbers").val()) - 1);
            years = parseInt($(".numbers").val());

        }else{
            $(".numbers").val("0");
        }
    })
})
//点击购买获取选择好的信息：版本, 年限,  单价 ， 折扣， 总价
let vName = null; // 版本
let years = new Number; //年限
let uPrice = new Number; // 单价
let oPrice = new Number; // 原价
let tPrice = uPrice * years; // 总价


$(".rush-to-buy button").click(function () {
    // 未选年限，弹出提示
    if(parseInt($(".numbers").val()) == 0) {
        $(".mask").show();
    }
    data = {
        vN : vName, // 版本
        y : years, //年限
        uP : uPrice, // 单价
        disc : 10 / (oPrice / uPrice), //折扣
        tP: uPrice * years// 总价
   }
   if(parseInt($(".numbers").val()) > 0) {

        window.open('payment.html'); // 结算页面
   }
})
//关闭提示弹框
$(".warn button").click(function () {
    $(".mask").hide();

})

//标准
$(".standard").click(function(){
    
    vName = $(this).find(".version-name").html();

    $(this).find(".version-name").css({
        "color": "#1bb859",
        "font-weight": "bold"
    });
    $(this).siblings().find("span").css({
        "color": "#777",
        "font-weight": "normal"

    });
})
$(".major").click(function(){
    vName = $(this).find(".version-name").html();

    $(this).find(".version-name").css({
        "color": "#ea4848",
        "font-weight": "bold"
    });
    $(this).siblings().find("span").css({
        "color": "#777",
        "font-weight": "normal"

    });

})
$(".enjoy").click(function(){
    vName = $(this).find(".version-name").html();

    $(this).find(".version-name").css({
        "color": "#f60",
        "font-weight": "bold"
    });
    $(this).siblings().find("span").css({
        "color": "#777",
        "font-weight": "normal"

    });

})
$(".emperor").click(function(){
    vName = $(this).find(".version-name").html();

    $(this).find(".version-name").css({
        "color": "#f90",
        "font-weight": "bold"
    });
    $(this).siblings().find("span").css({
        "color": "#777",
        "font-weight": "normal"
    });

})
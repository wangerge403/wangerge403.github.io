$(function () {
    $(".pay-type li").click(function () {
        $(this).css({ "border-color": "#0b86eb" });
        $(this).find(".ok1").addClass("ok");

        $(this).siblings().css({ "border-color": "#aaa" });
        $(this).siblings().find(".ok1").removeClass("ok");

        let index = $(".pay-type li").index(this);
        if (index === 2) {
            $(".to-taobao").fadeIn();
        } else {
            $(".to-taobao").fadeOut();

        }
    })
    $(".pay-money button").click(function () {
        $(location).attr('href', '../pages/alipay.html');

    })
    // 删除商品
    $(".tbody-list button").click(function () {
        $(this).parent().parent().remove();

        //显示应付金额
        $(".should").html("0");
    })
})
//来自下单页面的数据
var newData = window.opener.data;
if (newData) {
    //渲染到页面上
    let str = '';
    str = "<tr>\
            <td>"+ newData.vN + "</td>\
            <td>"+ newData.uP + "</td>\
            <td>"+ newData.y + "</td>\
            <td>"+ Math.ceil(newData.disc) + "折" + "</td>\
            <td class='total'>"+ newData.tP + "</td>\
            <td><button>删除</button></td>\
        </tr>"
    $(".tbody-list").html(str);
    //显示应付金额
    $(".should").html($(".total").html());
}


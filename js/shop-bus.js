$(function () {
    //单价
    let price = parseInt($(".price-list").html());
    //增加数量
    $(".add").click(function () {
        $(".numbers").val(parseInt($(".numbers").val()) + 1);
        $(".total").html(price * $(".numbers").val());
        //显示应付金额
        $(".should").html($(".total").html());

    });
    $(".reduce").click(function () {
        if (parseInt($(".numbers").val()) > 0) {
            $(".numbers").val(parseInt($(".numbers").val()) - 1);
            $(".total").html(price * $(".numbers").val());
            //显示应付金额
            $(".should").html($(".total").html());
        } else {
            $(".numbers").val("0");
        }
    })

    if (parseInt($(".num").html()) == 0) {
        //判断购物车中是有商品
    $(".bus-tips").show();
        
        } else if (parseInt($(".num").html()) > 0) {
            $(".bus-tips").hide();
            $(".product-list").show();
        }
    
})

//来自网站模板页面的数据
let newData = window.opener.data;

if (newData) {
    $(".num").html(newData.num);//商品数量

    let str = '';
    str = "<tr>\
                <td>"+ newData.vN + "</td>\
                <td class='price-list'>"+ newData.p + "</td>\
                <td class='num-list'>"+ `<button class="reduce">-</button><input type="text" value="` + newData.num + `" class="numbers"><button class="add">+</button>` + "</td>\
                <td class='total'>"+ newData.tP + "</td>\
                <td><button>删除</button></td>\
            </tr>"
    $(".tbody-list").html(str);
    //显示应付金额
    $(".should").html($(".total").html());
}else {
    $(".bus-tips").show();

}




// 删除商品
$(".tbody-list button").click( function () {
    $(this).parent().parent().remove();

        //显示应付金额
        $(".should").html("0");
})



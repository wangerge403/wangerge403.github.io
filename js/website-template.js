$(function () {
    let numbers = new Number;
    //前往购物车
    $(".car-menu img").click(function () {
        // $(location).attr("href", "../pages/shop-bus.html");
        numbers = parseInt($(".num span").html());
        data = {
            vN: vName,
            p: price,
            num: times,
            tP: price * times
        }
        window.open("shop-bus.html");
    })
    // 默认
    $(".all-product").css("color", "#d10707");
    $(".all-product a").html('√').css("border-color", "#d10707");
    $(".select-area").html("<span class='ok'>" + "全部" + "</span>");


    $(".industry a").hover(function () {
        // $(this).css("border-color", "#d10707");
        // $(this).html('√');
        // $(this).next().css("color", "#d10707");
    }, function () {
        // $(this).css("border-color", "#666");
        // $(this).html('');
        // $(this).next().css("color", "#666");

    })
    $("li a").on('click', function () {
        let clickBox = $(this).next().html();
        $(".select-area").html("<span class='ok'>" + clickBox + "</span>");
    })

    $(".template-show li").hover(function () {
        $(this).find(".details-show").show();
    }, function () {
        $(this).find(".details-show").hide();
    })

    $(".art-name").click(function () {
        $(".all-product").css("color", "");
        $(".all-product a").html('').css("border-color", "");
        $(".all").hide();


        $(this).css("color", "#d10707");
        $(this).html('√').css("border-color", "#d10707");
        $(this).next().css("color", "#d10707");

        $(".art").show();
    })
})
// 飞入购物车
let vName = ""; // 商品名称
let price = 50; //价格
let times = 0; //点击的次数---->数量
//总价 = price * times
var S = {
    init: function () {
        $(".car-pic").on('click', this.addShoping);
    },
    addShoping: function (e) {
        e.stopPropagation();
        vName = $(".train p").html(); // 商品名称
        // price = $(".train .money").html(); //价格
        times ++;
        $target = $(".car-menu img");
        // 点击的位置
        x = $(".car-pic").offset().left,
            y = $(".car-pic").offset().top,
            // 目标位置
            X = $target.offset().left,
            Y = $target.offset().top;

        $('body').append(S.addImg);
        let $obj = $("#cartIcon");
        //移动到目标位置
        $obj.css({ 'left': x, 'top': y }).animate({ 'left': X - 17, 'top': Y - 5 }, 800, function () {
            // 到达目标位置后透明
            $obj.animate({
                'top': Y + 5,
                "width": "30px",
                "height": "30px",
                'opacity': 0
            }, 500, function () {
                //谈出
                $obj.fadeOut(300, function () {
                    // 移除
                    $obj.remove();
                    // $target.next().html(parseInt($target.next().html()) + 1);
                    $(".num span").html(parseInt($(".num span").html()) + 1);
                });
            })
        });
    },
    addImg: function () {
        let icon = '<div id="cartIcon" style="width:50px;height:50px;padding:2px;background:#fff;border:solid 5px #e54144;overflow:hidden;position:absolute;z-index:890;"><img src="../images/cart.png" width="50" height="50" /></div>';
        return icon;
    }
};
S.init(); 

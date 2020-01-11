//logo旋转360edeg
// setinterval($(".landou-logo").css({

//     'transform':'scale(1)',
    
//     'transform':'scale(1)'
//     }), 2000)

//在线客服
$(function(){
    $(".type-nav li").addClass("list");
    blockRemove ();

    //判断购物车中有无商品
    let carNum =  parseInt($("#bus .number").html());

    if ( carNum == 0 ) {
        $(".nav-list").append(`<li class="bus-tips">
        <span>购物车中还没有商品，赶紧选购吧!</span>
        </li>`)
        $("#bus").find("span").eq(0).addClass("white");

        $("li#bus").hover(function () {
            $(this).css({
                "borderTop": "1px solid #1c65ff",
                "borderLeft": "1px solid #1c65ff",
                "borderRight": "1px solid #1c65ff",
                "borderBottom": "none"
            })
        }, function () {
            $(this).css({
                "border": "1px solid #bbb"
            })
        })
    }else if (carNum > 0) {

        $("li.bus-tips").remove();
        $("#bus").find("span").eq(0).removeClass("white");
         
        $("li#bus").hover(function () {
            $(this).css({
                "border": "1px solid #1c65ff"
            })
        }, function () {
            $(this).css({
                "border": "1px solid #bbb"
            })
        })

    }
})
let box = $(".online-service");

let barBox = $(".nav-bar");

$(window).scroll(function(){
    let top = document.documentElement.scrollTop ;
    if (top >= 100) {
        box.css("top", top + 120 + "px");
    } else if(document.documentElement.scrollTop === 0){
        box.css("top", "120px");
    }
    // 导航条变身
    if(document.documentElement.scrollTop >= 116){

        barBox.removeClass("nav-bar");
        barBox.addClass("scrollStyle");
        $(".scrollStyle li").removeClass("list").addClass("scrollList");
        $(".scrollStyle ul").removeClass("type-nav").addClass("type-nav-scroll");
        $(".scrollStyle ul a").removeClass("linkBar");

        //滚动后 nav-bar的样式
        $(".scrollLink").hover(function(){
            $(this).addClass("active");

        },function(){
            $(this).removeClass("active");
        })

    }else{
        barBox.addClass("nav-bar").removeClass("scrollStyle");
        $(".nav-bar li").removeClass("scrollList").addClass("list");
        $(".nav-bar ul").removeClass("type-nav-scroll").addClass("type-nav");
        $(".nav-bar ul a").removeClass("scrollLink").addClass("linkBar");

    }
})
// jquery监听页面刷新
// $(window).on('beforeunload unload', function(){
//     console.log(111)
// }) 

//qq
$(".qq").mouseover(function(){
    $(".xq").css("top", "0px").css("height", "65px");
    $(".xq").html("<span>QQ联系咨询</span>");
    $(".xq").fadeIn(20);
});
$(".qq").mouseleave(function(){
    $(".xq").fadeOut(20);
})
//电话
$(".tel-contact").mouseover(function(){
    $(".xq").css("top", "71px").css("height", "65px");
    $(".xq").html("<span>0527-xxxx-xxxx</span>");
    $(".xq").fadeIn(20);
});
$(".tel-contact").mouseleave(function(){
    $(".xq").fadeOut(20);
})
//微信
$(".wx-contact").mouseover(function(){
    $(".xq").css("top", "142px").css("height", "150px");
    $(".xq").html("<span>扫一扫，添加客服微信</span>" + " <img src='./images/wx-qr.jpg' alt='客服微信'>")
    $(".xq").fadeIn(20);
});
$(".wx-contact").mouseleave(function(){
    $(".xq").fadeOut(20);
})
// 跳转到qq
//返回顶部
$(".back-top").click(function(){
    let timer = setInterval(() => {
        let cur = document.documentElement.scrollTop;
        if(cur > 0){

            let speed = cur / 8;
            // Math.ceil()  --> 返回 >=speed 的最小整数  
            // Math.floor()     --> 返回 <=speed的最大整数
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            document.documentElement.scrollTop = cur - speed;
        }else if(cur <= 2 ){
            clearInterval(timer);//回到顶部清除计时器
            document.documentElement.scrollTop = 0;
        }
    }, 50);

    })
//案例锚点
$("li.to-cases").click(function(){

    document.getElementById("cases").scrollIntoView({block: "end", inline:"end", behavior:"smooth"})
})
$(function(){
    
//鼠标悬停在购物车区域，出现提示框

    $(".nav-list li:first-child").mouseover(function(){
        $("#bus .white").fadeIn(20);
        $(".bus-tips").slideDown("slow");
    });
    $(".nav-list li:first-child").mouseleave(function(){
        $("#bus .white").fadeOut(20);
        $(".bus-tips").slideUp();
    })
//鼠标悬停在左侧导航栏，展示详情
    $(".left-nav-area ul").mouseover(function(){
        $(".left-nav-infro").fadeIn("slow");
    });
    $(".left-nav-area ul").mouseleave(function(){
        $(".left-nav-infro").fadeOut("slow");
    });
//点击跳转注册页面
    $(".btn2").click(function(){
        $(location).attr('href', './pages/signUp.html');
    });
    //点击跳转登录页面
    $(".btn3").click(function(){

        $(location).attr('href', './pages/login.html');
    });
    //下单yemian
    $(".product-list button").click(function(){

        $(location).attr('href', './pages/buy.html');
    });

    //购物车
    $("#bus").click(function(){

        $(location).attr('href', './pages/shop-bus.html');
    });
})
// logo上的小方块跑下来  动画队列

    $(window).scroll(function(){
    if(document.documentElement.scrollTop >= 116){
        
        console.log("滚动啦")

        $(".first-list").unbind("mouseover");
        $(".scond-list").unbind("mouseover");
        $(".third-list").unbind("mouseover");
        $(".four-list").unbind("mouseover");


    }else{
        blockRemove ();
    }
})
function blockRemove () {
 //蓝色块
 $(".first-list").bind("mouseover", function(){
    $(".blue-block").css("display", "block");
    $(".blue-block").animate({marginLeft: "-20px"}, "fast")
                    .animate({marginTop: "81px"}, "fast")
                    .animate({marginLeft: "290px"}, "fast");
}).bind("mouseleave", function(){

    $(".blue-block").stop(false, false).animate({marginLeft: "-20px"}, "fast")
                    .animate({marginTop: "0px"}, "fast")
                    .animate({marginLeft: "0px"}, "fast");
    $(".blue-block").css("display", "none");
})


// 黄色块
$(".scond-list").bind("mouseover", function(){
    $(".orange-block").css("display", "block");
    $(".orange-block").animate({marginLeft: "50px"}, "fast")
                      .animate({marginTop: "82px"}, "fast")
                      .animate({marginLeft: "440px"}, "fast");
 }).bind("mouseleave", function(){
    $(".orange-block").animate({marginLeft: "50px"}, "fast")
                      .animate({marginTop: "20px"}, "fast")
                      .animate({marginLeft: "17px"}, "fast");
    $(".orange-block").css("display", "none");
})
//红色块
$(".third-list").bind("mouseover", function(){
    $(".red-block").css("display", "block");
    $(".red-block").animate({marginTop: "81px"}, "150")
                   .animate({marginLeft: "590px"}, "150");
}).bind("mouseleave", function(){
    $(".red-block").animate({marginLeft: "0px"}, "150")
                   .animate({marginTop: "37px"}, "150");
    $(".red-block").css("display", "none");
})
//绿色块
$(".four-list").bind("mouseover", function(){
    $(".green-block").css("display", "block");
    $(".green-block").animate({marginTop: "81px"}, "200")
                     .animate({marginLeft: "745px"}, "200");
}).bind("mouseleave", function(){
    $(".green-block").animate({marginLeft: "34px"}, "200")
                     .animate({marginTop: "37px"}, "200");
    $(".green-block").css("display", "none");

        })

}


//滚动前 nav-bar的样式
$(".linkBar").mouseover(function(){
    $(this).addClass("active").removeClass("linkBar");

}).mouseleave(function(){
    $(this).removeClass("active").addClass("linkBar");


})


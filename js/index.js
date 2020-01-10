$(".class-left>li").click(function () {
    var index = $(this).index();
    $(this).addClass("cur").siblings().removeClass("cur");
    $(".class-right>li").eq(index).show().siblings().hide();
});





$(".header-class").click(function () {
    $(".side").toggle(200);
});
$(".header-left-class").click(function (){
    $(".header-left").attr("style","left:0");
    $(".index").attr("style","margin-left:80%;");
    $(".mb").show();
});
$(".index").click(function (){
    if($('.header-left').css('left') >= 0 + 'px'){
        $(".index").attr("style","margin-left:0;");
        $(".header-left").attr("style","left:-80%");
        $(".mb").hide();
    }
})

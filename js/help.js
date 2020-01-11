$(function () {

    let i = j = k = new Number;

    function open(obj) {
        obj.attr("src", "../images/help/icojtshangbai.png");
        obj.parent().parent().css({
            "backgroundColor": "#39494b",
            color: "#fff"
        });
    }
    function colse(obj) {
        obj.attr("src", "../images/help/icojtxiab.png");
        obj.parent().parent().css({
            "backgroundColor": "#fff",
            color: "#000"
        });
    }
    function clickToggle1(obj) {
        if (i % 2 == 1) {
            open(obj);
        }
        else if (i % 2 == 0) {
                colse(obj);
                backDefault(obj.parent().parent().find("li"));
            }
        obj.parent().next().slideToggle(300);
    }
    function clickToggle2(obj) {
        if (j % 2 == 1) {
            open(obj);

        }
        else if (j % 2 == 0) {
                colse(obj);
                backDefault(obj.parent().parent().find("li"));

            }
        obj.parent().next().slideToggle(300);
    }
    function clickToggle3(obj) {
        if (k % 2 == 1) {
            open(obj);
        }
        else if (k % 2 == 0) {
                colse(obj);
                backDefault(obj.parent().parent().find("li"));

            }
        obj.parent().next().slideToggle(300);
    }
    $("li .la").click(function () {
        // $(this).attr("id", "clicked");
        if ($(this).parent().attr("class") == "novice-text") {
            i++;
            clickToggle1($(this));
        }
        if ($(this).parent().attr("class") == "help-text") {
            j++;
            clickToggle2($(this));
        }
        if ($(this).parent().attr("class") == "about-us-text") {
            k++;
            clickToggle3($(this));
        }
    })
    // 收起导航栏时， 恢复默认样式
    function backDefault(obj) {
        obj.animate({
            left: "0px"
        }, 300)
            .css({
                backgroundColor: "#eee",
                color: "#666"
            });
    }

    $(".scond li").click(function () {
        $(this).animate({
            left: "20px"
        }, 300)
            .css({
                position: "relative",
                backgroundColor: "#fff",
                color: "#000"
            });
        $(this).siblings().animate({
            left: "0px"
        }, 300)
            .css({
                backgroundColor: "#eee",
                color: "#666"
            });
        $(".get-back-psw").show();
    })
})
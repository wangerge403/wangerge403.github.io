// 切换个人中心页面
let handelClick = function(){
    let basicBox = document.getElementsByClassName("basic-dd")[0];
    let perBox = document.getElementsByClassName("active")[0];
    let reviseBox = document.getElementsByClassName("edit-psw-dd")[0];
    let backBox = document.getElementsByClassName("back")[0];
    // console.log(basicBox)
    basicBox.addEventListener("click", function(){
        perBox.className = '';
        basicBox.className = 'active';
        reviseBox.className = '';
        document.getElementsByClassName("details-per-infor")[0].style.display = "none";
        document.getElementsByClassName("edit")[0].style.display = "block";
        document.getElementsByClassName("revise-psw")[0].style.display = "none";

    })
    perBox.addEventListener("click", function(){
        perBox.className = 'active';
        basicBox.className = '';
        reviseBox.className = '';
        document.getElementsByClassName("details-per-infor")[0].style.display = "block";
        document.getElementsByClassName("edit")[0].style.display = "none";
        document.getElementsByClassName("revise-psw")[0].style.display = "none";

    })
    reviseBox.addEventListener("click", function(){
        perBox.className = '';
        basicBox.className = '';
        reviseBox.className = 'active';
        document.getElementsByClassName("revise-psw")[0].style.display = "block";
        document.getElementsByClassName("edit")[0].style.display = "none";
        document.getElementsByClassName("details-per-infor")[0].style.display = "none";

    })
       
    backBox.addEventListener("click", function(){
        window.location = "../index.html";
    })
}

handelClick();
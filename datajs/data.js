

  $('button').on('click', function () {
        if ($('input').val == '') {
            alert("请输入个人信息！");
        }else{
            let girlName = $('.girl-name').val();
            let girlId= $('.girl-id').val();
            let girlAddress = $('.girl-addr').val();
            let girlDetails = $('.girl-details').val();

            console.log(girlName, girlId, girlAddress, girlDetails)


            girldata = {
                gN: girlName,
                gI: girlId,
                gA: girlAddress,
                gD: girlDetails
            }
            localStorage.setItem('girldata', JSON.stringify(girldata));
            console.log(girldata)
        }
    })
    // 男生信息
    $('span').click(function () {

        if ($('input').val == '') {
            alert("请输入个人信息！")
        }else{
            let boyName = $('.boy-name').val();
            let boyId= $('.boy-id').val();
            let boyAddress = $('.boy-addr').val();
            let boyDetails = $('.boy-details').val();

        console.log(boyName, boyId, boyAddress, boyDetails)

        boydata = {
            bN: boyName,
            bI: boyId,
            bA: boyAddress,
            bD: boyDetails
        }
        localStorage.setItem('boydata', JSON.stringify(boydata));
        console.log(boydata)
        }
    })

// 取值时：把获取到的Json字符串转换回对象

var newData1 = localStorage.getItem('girldata');

var z = JSON.parse(newData1);

$(".g-name").html(z.gN);
$(".g-sex").html("女");
$(".g-nat").html("中国");
// $(".g-name").html(z.gN);
$(".g-id").html(z.gI);



//男生信息
var newData2 = localStorage.getItem('boydata');

var y = JSON.parse(newData2);

$(".b-name").html(y.bN);
$(".b-sex").html("男");
$(".b-nat").html("中国");
// $(".b-name").html(z.bN);
$(".b-id").html(y.bI);





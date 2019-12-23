const vm = new Vue({
    el:'.wrapper',
    data:{
        add:'新增',
        choose:'选择 ',
        del:'删除',
        arr:[],
        task:'',
        task1:''
    },

    methods:{
//获取input框里的值来改变宽高
        inpChange(e){
            console.log(111)
            $("input:checkbox:checked").next().next()
            .css({"width": vm.task + "px", "height":  vm.task1 + "px"});
        },
/**
 * 点击添加按钮向页面渲染文本框 
 * 新增div ==> input、span
 */
        addDiv(){
            let div = $('.dataTab div');
                str =  '<div class="col">\
                <input type="checkbox" class="checkboxed"><input type="text" @input="inputHandel(e)" class="change">' +           
                '<span id="la" ></span>\
                     </div>'
                    //  var doc = new DOMParser().parseFromString(str, "text/xml")
                    // console.log(doc.firstChild.innerHTML); 
                    // console.log($('.dataTab').html(str))

                     $('.dataTab').append(str);

                    //  $('.dataTab').html($('.dataTab').html() + str);
            
                        $('input.change').on('input', function(e){

                            var text_length = $(this).val().length;
                            var current_width = parseInt(text_length) *13.33;
                            $(this).css("width",current_width+"px");
                            if(!$('input.change').val()){
                                $('input.change').css("width",30 +"px");
                               }else{
                                $(this).css("width",current_width+"px");
                               }
                        })
                    $('.checkboxed').hide();//隐藏复选框
                     // 获取span元素的宽度和高度
                    var width = $('#la').outerWidth();
                    var height = $('#la').outerHeight();
                    //将获取到的宽高渲染到页面上
                    $('#inp1').val(width + 'px');
                    $('#inp2').val(height + 'px'); 
                     var oBox =Array.from(document.querySelectorAll('span'));  
                     oBox1 = oBox;
                     changeWH(oBox1);//动态渲染后的span赋给新的变量oBox1

        }
    }
})

//点击选择按钮，复选框出现
$('.cho').click(() => {
    $('.checkboxed').show();
})

//删除div ==> input、span
$(function(){
    $(".del").click(function() {
        $("input:checkbox:checked").each(function() {
            $(this).nextAll().parent().remove();//删除下面的所有兄弟元素的父级div
            $(this).remove();
            $('.checkboxed').hide();
        });
    });
});

 $('.dataTab span').mousedown(function(e) { // 在页面点击span而触发此事件               
            var width =$(e.target).outerWidth(); // e.target表示被点击的目标
            var height =$(e.target).outerHeight();
            //将获取到的宽高渲染到页面上
            $('#inp1').val(width + 'px');
            $('#inp2').val(height + 'px'); 
          })

 var oBox =Array.from(document.querySelectorAll('span')); //获取已有的span存在变量oBox
 changeWH(oBox);

    function changeWH(data){
        for (let i = 0; i < data.length; i++) {
            data[i].onmousedown = (e) => {
             e = e ? e : window.event;//浏览器兼容问题
             var x = e.clientX;//鼠标相对于浏览器窗口
             var y = e.clientY;
             console.log(x,y)
             var oBoxL = data[i].offsetLeft;//左边距10
             var oBoxT = data[i].offsetTop;//上边距100
             var oBoxW = data[i].offsetWidth;//元素的width + border
             var oBoxH = data[i].offsetHeight;
             console.log(oBoxL, oBoxT, oBoxW, oBoxH)
             var d = null;
             if (x + 20 > oBoxL + oBoxW ) {
                 //鼠标的x坐标，小于，
                 d = 'right';//右
             }  else if (y  + 8 > oBoxT + oBoxH) {
                 d = 'bottom';//下
             }

             document.onmousemove = function(e) {
                 e = e || event;
                 var xx = e.clientX;
                 var yy = e.clientY;
                 if (d == 'right') {
                     data[i].style.width = oBoxW + xx - x + 'px'
                     data[i].style.left = xx + 'px';
                     //将获取到的宽高渲染到页面上
                     $('#inp1').val(oBoxW + xx - x + 'px');
                 } else if (d == 'bottom') {
                     data[i].style.height = oBoxH + yy - y + 'px';
                     data[i].style.top = 72 + 'px';
                     $('#inp2').val(oBoxH + yy - y + 'px');
                 }
                 return false;
             }
             document.onmouseup = function() {
                 //鼠标抬起， 清空
                 document.onmousemove = null;
                 document.onmouseup = null;
             }
             if (e.preventDefault) {
                 //阻止默认事件
                 e.preventDefault();
             }
         }
        }
    }   
//输入框获得焦点的时候，为空
$(function(){
    $(".edit-top #inp1").focus(() =>{
        let text = '';
        console.log(112233)
        $(".edit-top #inp1").val(text)
    })
    
    $(".edit-top #inp2").focus(() =>{
        let text = '';
        $(".edit-top #inp2").val(text)
    })
})
getData();
//点击提交按钮，拿出输入框的值，文本框的宽高
let data ={};

function getData(){
  $("#get").click(function(){
    let res = $('.dataTab .change');
        res.each(function(index){
            data[index]={};

            data[index]["inputValue"]= $(this).val();
            data[index]["spanWidth"]=$(this).next().outerWidth();
            data[index]["spanHeight"]=$(this).next().outerHeight();

            })
    console.log(data);//输出对象

  })
}

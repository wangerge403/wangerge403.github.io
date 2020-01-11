function createWrapperArea(areaDom, options){
    //创建一个区域用来显示图片和小圆圈
    var imgArea = document.createElement('div');//创建一个图片区域
    var numberArea = document.createElement('div');//创建一个小圆圈区域


    var status = 0;//当前显示的是第几个
    changeTimer = null;
    intervalTime = 2000;//2s切换间隔时间
    var aniTimer = 0;//动画计时器ight

    initImg();
    initNumbers();
    setStatus();
    autoChange();   
    btnChange();
//显示图片
    function initImg(){
        imgArea.style.width = '100%';//imgArea占满父级
        imgArea.style.height = '100%';
        imgArea.style.display = 'flex';
        imgArea.style.overflow = 'hidden';
        imgArea.style.marginTop = -20 + 'px';
        
        for (var i = 0; i < options.length; i++) {
            var obj = options[i];//存取数组里的每一个对象
            var img = document.createElement('img');
            img.src = obj.Url;//对象里的Url
            img.style.width = '100%';//img占满父级
            img.style.height = '100%';
            imgArea.appendChild(img);
        }
        imgArea.children[0].style.marginLeft = '0';//*********** */
        imgArea.addEventListener('mouseenter',function(){
            clearInterval(changeTimer);
            changeTimer = null;
        })
        imgArea.addEventListener('mouseleave', function(){
            autoChange();
        })
        wrapperDiv.appendChild(imgArea);
    }
// 切换按钮

function btnChange(){
    var btnLeft = document.getElementsByClassName('btn-left');
    var btnRight = document.getElementsByClassName('btn-right');
    for (var i = 0; i < btnLeft.length; i++) {
       (function(y){
        btnLeft[y].addEventListener('click', function(){
            if (status ===options.length-1 ) {
                status = 0;
            }
            else{
                status++;
            }
            setStatus();   
            console.log(1);
            if(status === options.length - 1){
                numberArea.children[0].style.backgroundColor = '#fff'; 
                imgArea.children[0].style.marginLeft = status*-100 + "%";
            }
        })
       })(i) 
                
      
    }
    for (var j = 0; j < btnRight.length; j++) {
        (function(y){
            btnRight[y].addEventListener('click', function(){
             if (status ===options.length-1 ) {
                 status = 0;
             }
             else{
                 status++;
             }
             setStatus();   
             console.log(2);
         })
        })(j)         
    }  
        
}

//添加小圆圈
    function initNumbers(){

        for (let i = 0; i < options.length-1; i++) {
            var sp = document.createElement('span');
            sp.style.display = 'inline-block';
            sp.style.width = '50px';
            sp.style.height = '12px';
            sp.style.backgroundColor = '#fff';
            sp.style.margin = '0 7px';
            // sp.style.borderRadius = '50%';
            sp.style.cursor = 'pointer';
            //立即执行函数
            (function(index){
                sp.addEventListener('click', function(){
                    console.log(1);
                    status = index;
                    setStatus();

                   
                })
            })(i)
            numberArea.appendChild(sp);
        }
        numberArea.style.textAlign = 'center';
        numberArea.style.marginTop = '-25px';

        wrapperDiv.appendChild(numberArea);
    }
//设置小圆圈当前状态
    function setStatus(){
        for (var i = 0; i < numberArea.children.length; i++) {
            if (i === status) {
                numberArea.children[i].style.backgroundColor = '#ff9000'; 
            }
            else{
                numberArea.children[i].style.backgroundColor = '#fff';
            }
            
        }

//过渡动画流畅度
        var start = parseInt(imgArea.children[0].style.marginLeft);
        var end = status * -100;
        var dis = end - start;
        var time = 500;
        var speed = dis / time;

        if(aniTimer){
            clearInterval(aniTimer);
        }


        aniTimer = setInterval(function(){
            start += speed * 20;
            imgArea.children[0].style.marginLeft = start + '%';
            if(Math.abs(end - start) < 1){
                imgArea.children[0].style.marginLeft = end + '%';
                clearInterval(aniTimer);
                aniTimer = null;
                 // 当播到第4张（与第一张相同）使第4张 瞬间变为第一张，直接修改left为0，这就实现了第六张与第一张 和谐切换
                if(status === options.length - 1){
                    numberArea.children[0].style.backgroundColor = '#ff9000'; 
                    status = 0;
                    imgArea.children[0].style.marginLeft = "0";
                   
                }
            }
        }, 20)
       
    }
/**
 * 自动切换
 */
function autoChange(){
    changeTimer  = setInterval(function(){
        if (status ===options.length-1 ) {
            status = 0;
        }
        else{
            status++;
        }
        setStatus();
    },intervalTime)
    
   
}
}
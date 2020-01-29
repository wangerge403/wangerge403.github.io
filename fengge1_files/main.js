var car2 = {
/****************************************************************************************************/
/*  对象私有变量/函数返回值/通用处理函数
*****************************************************************************************************/	
/*************************
 *  = 对象变量，判断函数
 *************************/
	_events 		: {},									// 自定义事件---this._execEvent('scrollStart');
	_windowHeight	: $(window).height(),					// 设备屏幕高度
	_windowWidth 	: $(window).width(),

	_rotateNode		: $('.p-ct'),							// 旋转体

	_page 			: $('.m-page'),							// 模版页面切换的页面集合
	_pageNum		: $('.m-page').size(),					// 模版页面的个数
	_pageNow		: 0,									// 页面当前的index数
	_pageNext		: null,									// 页面下一个的index数

	_touchStartValY	: 0,									// 触摸开始获取的第一个值
	_touchDeltaY	: 0,									// 滑动的距离

	_moveStart		: true,									// 触摸移动是否开始
	_movePosition	: null,									// 触摸移动的方向（上、下）
	_movePosition_c	: null,									// 触摸移动的方向的控制
	_mouseDown		: false,								// 判断鼠标是否按下
	_moveFirst		: true,
	_moveInit		: false,

	_firstChange	: false,

	_elementStyle	: document.createElement('div').style,	// css属性保存对象

	_UC 			: RegExp("Android").test(navigator.userAgent)&&RegExp("UC").test(navigator.userAgent)? true : false,

	_iPhoen			: RegExp("iPhone").test(navigator.userAgent)||RegExp("iPod").test(navigator.userAgent)||RegExp("iPad").test(navigator.userAgent)? true : false,
	_Android		: RegExp("Android").test(navigator.userAgent)? true : false,
	_IsPC			: function(){ 
						var userAgentInfo = navigator.userAgent; 
						var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"); 
						var flag = true; 
						for (var v = 0; v < Agents.length; v++) { 
							if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; } 
						} 
						return flag; 
					} ,
	_music			: true,

/***********************
 *  = gobal通用函数
 ***********************/
 	// 判断函数是否是null空值
	_isOwnEmpty		: function (obj) { 
						for(var name in obj) { 
							if(obj.hasOwnProperty(name)) { 
								return false; 
							} 
						} 
						return true; 
					},
	
	// 判断浏览器内核类型
	_vendor			: function () {
						var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
							transform,
							i = 0,
							l = vendors.length;
				
						for ( ; i < l; i++ ) {
							transform = vendors[i] + 'ransform';
							if ( transform in this._elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
						}
						return false;
					},
	// 判断浏览器来适配css属性值
	_prefixStyle	: function (style) {
						if ( this._vendor() === false ) return false;
						if ( this._vendor() === '' ) return style;
						return this._vendor() + style.charAt(0).toUpperCase() + style.substr(1);
					},
	// 判断是否支持css transform-3d（需要测试下面属性支持）
	_hasPerspective	: function(){
						var ret = this._prefixStyle('perspective') in this._elementStyle;
						if ( ret && 'webkitPerspective' in this._elementStyle ) {
							this._injectStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
								ret = node.offsetLeft === 9 && node.offsetHeight === 3;
							});
						}
						return !!ret;
					},
		_translateZ : function(){
						if(car2._hasPerspective){
							return ' translateZ(0)';
						}else{
							return '';
						}
					},

	// 判断属性支持是否
	_injectStyles 	: function( rule, callback, nodes, testnames ) {
						var style, ret, node, docOverflow,
							div = document.createElement('div'),
							body = document.body,
							fakeBody = body || document.createElement('body'),
							mod = 'modernizr';

						if ( parseInt(nodes, 10) ) {
							while ( nodes-- ) {
								node = document.createElement('div');
								node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
								div.appendChild(node);
								}
						}

						style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
						div.id = mod;
						(body ? div : fakeBody).innerHTML += style;
						fakeBody.appendChild(div);
						if ( !body ) {
							fakeBody.style.background = '';
							fakeBody.style.overflow = 'hidden';
							docOverflow = docElement.style.overflow;
							docElement.style.overflow = 'hidden';
							docElement.appendChild(fakeBody);
						}

						ret = callback(div, rule);
						if ( !body ) {
							fakeBody.parentNode.removeChild(fakeBody);
							docElement.style.overflow = docOverflow;
						} else {
							div.parentNode.removeChild(div);
						}

						return !!ret;
					},
	// 自定义事件操作
 	_handleEvent 	: function (type) {
						if ( !this._events[type] ) {
							return;
						}

						var i = 0,
							l = this._events[type].length;

						if ( !l ) {
							return;
						}

						for ( ; i < l; i++ ) {
							this._events[type][i].apply(this, [].slice.call(arguments, 1));	
						}
					},
	// 给自定义事件绑定函数
	_on				: function (type, fn) {
						if ( !this._events[type] ) {
							this._events[type] = [];
						}

						this._events[type].push(fn);
					},
	//禁止滚动条
	_scrollStop		: function(){
						//禁止滚动
						$(window).on('touchmove.scroll',this._scrollControl);
						$(window).on('scroll.scroll',this._scrollControl);
					},
	//启动滚动条
	_scrollStart 	: function(){		
						//开启屏幕禁止
						$(window).off('touchmove.scroll');
						$(window).off('scroll.scroll');
					},
	//滚动条控制事件
	_scrollControl	: function(e){e.preventDefault();},

/**************************************************************************************************************/
/*  关联处理函数
***************************************************************************************************************/
/**
 *  单页面-m-page 切换的函数处理
 *  -->绑定事件
 *  -->事件处理函数
 *  -->事件回调函数
 *  -->事件关联函数【
 */
 	// 页面切换开始
 	page_start		: function(){
 		car2._page.on('touchstart mousedown',car2.page_touch_start);
 		car2._page.on('touchmove mousemove',car2.page_touch_move);
 		car2._page.on('touchend mouseup',car2.page_touch_end);
 	},

 	// 页面切换停止
 	page_stop		: function(){
		car2._page.off('touchstart mousedown');
 		car2._page.off('touchmove mousemove');
 		car2._page.off('touchend mouseup');
 	},

 	// page触摸移动start
 	page_touch_start: function(e){
 		//e.preventDefault();
 		if(!car2._moveStart) return;

 		if(e.type == "touchstart"){
        	car2._touchStartValY = window.event.touches[0].pageY;
        }else{
        	car2._touchStartValY = e.pageY||e.y;
        	car2._mouseDown = true;
        }

        car2._moveInit = true;

        // start事件
        car2._handleEvent('start');
 	},

 	// page触摸移动move
 	page_touch_move : function(e){
 		e.preventDefault();

		if(!car2._moveStart) return;
		if(!car2._moveInit) return;

		// 设置变量值
 		var $self = car2._page.eq(car2._pageNow),
 			h = parseInt($self.height()),
 			moveP,
 			scrollTop,
 			node=null,
 			move=false;

 		// 获取移动的值
 		if(e.type == "touchmove"){
        	moveP = window.event.touches[0].pageY;
        	move = true;
        }else{
        	if(car2._mouseDown){
        		moveP = e.pageY||e.y;
        		move = true;
        	}else return;
        }


		// 获取下次活动的page
        node = car2.page_position(e,moveP,$self);
        //console.log(node);
        // page页面移动 		
 		car2.page_translate(node);

        // move事件
        car2._handleEvent('move');
		
		
		
		
		
 	},

 	// page触摸移动判断方向
 	page_position	: function(e,moveP,$self){ 		
 		var now,next;
	
 		// 设置移动的距离
 		if(moveP!='undefined') car2._touchDeltaY = moveP - car2._touchStartValY;

 		// 设置移动方向
    	car2._movePosition = moveP - car2._touchStartValY >0 ? 'down' : 'up';
    	if(car2._movePosition!=car2._movePosition_c){
    		car2._moveFirst = true;
    		car2._movePosition_c = car2._movePosition;
    	}else{
			car2._moveFirst = false;
    	}

		// 设置下一页面的显示和位置        
        if(car2._touchDeltaY<=0){
        	if($self.next('.m-page').length == 0){
        		car2._pageNext = 0;
        	} else {
        		car2._pageNext = car2._pageNow+1;	
        	}
 			
 			next = car2._page.eq(car2._pageNext)[0];
 		}else{
 			if($self.prev('.m-page').length == 0 ) {
 				if (car2._firstChange) {
 					car2._pageNext = car2._pageNum - 1;
 				} else {
 					return;
 				}
 			} else {
 				car2._pageNext = car2._pageNow-1;	
 			}
 			
 			next = car2._page.eq(car2._pageNext)[0];
 		}

 		now = car2._page.eq(car2._pageNow)[0];
 		node = [next,now];

 		// move阶段根据方向设置页面的初始化位置--执行一次
 		if(car2._moveFirst) init_next(node);

 		function init_next(node){
 			var s,l,_translateZ = car2._translateZ();

 			car2._page.removeClass('action');
 			$(node[1]).addClass('action').removeClass('f-hide');
 			car2._page.not('.action').addClass('f-hide');
 			
 			// 模版高度适配函数处理
	 		car2.height_auto(car2._page.eq(car2._pageNext),'false');

 			// 显示对应移动的page
			$(node[0]).removeClass('f-hide').addClass('active'); 
			
			
			
	 		// 设置下一页面的显示和位置        
	        if(car2._movePosition=='up'){
 				s = parseInt($(window).scrollTop());
 				if(s>0) l = $(window).height()+s;
 				else l = $(window).height();
 				node[0].style[car2._prefixStyle('transform')] = 'translate(0,'+l+'px)'+_translateZ;
 				$(node[0]).attr('data-translate',l);

 				$(node[1]).attr('data-translate',0);
	 		}else{
 				node[0].style[car2._prefixStyle('transform')] = 'translate(0,-'+Math.max($(window).height(),$(node[0]).height())+'px)'+_translateZ;
 				$(node[0]).attr('data-translate',-Math.max($(window).height(),$(node[0]).height()));

 				$(node[1]).attr('data-translate',0);
	 		}
 		}
 		
 		return node;
 	},

 	// page触摸移动设置函数
 	page_translate	: function(node){
 		// 没有传值返回
 		if(!node) return;
		
 		var _translateZ = car2._translateZ(),
 			y_1,y_2,scale,
 			y = car2._touchDeltaY;

 		// 切换的页面移动
 		if($(node[0]).attr('data-translate')) y_1 = y + parseInt($(node[0]).attr('data-translate'));
		node[0].style[car2._prefixStyle('transform')] = 'translate(0,'+y_1+'px)'+_translateZ;
		
		// 当前的页面移动
		if($(node[1]).attr('data-translate')) y_2 = y + parseInt($(node[1]).attr('data-translate'));
		scale = 1 - Math.abs(y*0.2/$(window).height());
		y_2 = y_2/5;
		try{
			node[1].style[car2._prefixStyle('transform')] = 'translate(0,'+y_2+'px)'+_translateZ+' scale('+scale+')';
		}catch(e){
			console.log(e);	
		}
 	},

 	// page触摸移动end
 	page_touch_end	: function(e){
 		car2._moveInit = false;
 		car2._mouseDown = false;
 		if(!car2._moveStart) return;
 		if(!car2._pageNext&&car2._pageNext!=0) return;

 		car2._moveStart = false;

 		// 确保移动了
 		if(Math.abs(car2._touchDeltaY)>10){
 			car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transition')] = 'all .3s';
 			car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transition')] = 'all .3s';
 		}
			
		// 页面切换
 		if(Math.abs(car2._touchDeltaY)>=100){		// 切换成功
 			car2.page_success();
 		}else if(Math.abs(car2._touchDeltaY)>10&&Math.abs(car2._touchDeltaY)<100){	// 切换失败		
 			car2.page_fial();
 		}else{									// 没有切换
 			car2.page_fial();
 		}

 		// end事件
        car2._handleEvent('end');

        // 注销控制值
 		car2._movePosition = null;
 		car2._movePosition_c = null;
 		car2._touchStartValY = 0;
		
         
		 if($('#j-mengban').hasClass('z-show')){
			 if(car2._pageNext == mengvalue){
			  car2.page_stop();
			  
		   }
		 }
		 



 	},

 	// 切换成功
 	page_success	: function(){
 		var _translateZ = car2._translateZ();
 		
 		// 下一个页面的移动
 		car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transform')] = 'translate(0,0)'+_translateZ;
 	
 		// 当前页面变小的移动
 		var y = car2._touchDeltaY > 0 ? $(window).height()/5 : -$(window).height()/5;
 		var scale = 0.8;
 		car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transform')] = 'translate(0,'+y+'px)'+_translateZ+' scale('+scale+')';
 	
 		// 成功事件
    	car2._handleEvent('success');
 	},

 	// 切换失败
 	page_fial	: function(){
 		var _translateZ = car2._translateZ();

 		// 判断是否移动了
		if(!car2._pageNext&&car2._pageNext!=0) {
			car2._moveStart = true;
			car2._moveFirst = true;
			return;
		}

 		if(car2._movePosition=='up'){
 			car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transform')] = 'translate(0,'+$(window).height()+'px)'+_translateZ;
 		}else{
 			car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transform')] = 'translate(0,-'+$(window).height()+'px)'+_translateZ;
 		}

 		car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transform')] = 'translate(0,0)'+_translateZ+' scale(1)';

 		// fial事件
    	car2._handleEvent('fial');
 	},

/**
 *  对象函数事件绑定处理
 *  -->start touch开始事件
 *  -->mov   move移动事件
 *  -->end   end结束事件
 */
 	haddle_envent_fn : function(){
 		// 当前页面移动，延迟加载以后的图片
		car2._on('start',car2.lazy_bigP);

		// 当前页面移动
		car2._on('move',function(){
			
		});

		// 切换失败事件
		car2._on('fial',function(){
			setTimeout(function(){
				car2._page.eq(car2._pageNow).attr('data-translate','');
 				car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transform')] = '';
 				car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transition')] = '';
 				car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transform')] = '';
	 			car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transition')] = '';

	 			car2._page.eq(car2._pageNext).removeClass('active').addClass('f-hide');
				car2._moveStart = true;
				car2._moveFirst = true;
				car2._pageNext = null;
				car2._touchDeltaY = 0;
				car2._page.eq(car2._pageNow).attr('style','');
	 		},300)
		})

		// 切换成功事件
		car2._on('success',function(){
			// 判断最后一页让，开启循环切换
			if (car2._pageNext == 0 && car2._pageNow == car2._pageNum -1) {
				car2._firstChange = true;
			}

			
			setTimeout(function(){
				

				// 判断是否为最后一页，显示或者隐藏箭头
				/*if(car2._pageNext == car2._pageNum-1 ) $('.u-arrow').addClass('f-hide');
				else  $('.u-arrow').removeClass('f-hide');*/

	 			car2._page.eq(car2._pageNow).addClass('f-hide').removeClass('item_show');

				car2._page.eq(car2._pageNow).attr('data-translate','');
 				car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transform')] = '';
 				car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transition')] = '';
 				car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transform')] = '';
	 			car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transition')] = '';
	 			car2._page.eq(car2._pageNext).addClass('item_show');

	 			// 初始化切换的相关控制值
	 			$('.p-ct').removeClass('fixed');
	 			car2._page.eq(car2._pageNext).removeClass('active');
				car2._page.eq(car2._pageNext).removeClass('fixed');
				car2._pageNow = car2._pageNext;
				car2._moveStart = true;
				car2._moveFirst = true;
				car2._pageNext = null;
				car2._page.eq(car2._pageNow).attr('style','');
				car2._page.eq(car2._pageNow).removeClass('fixed');
				car2._page.eq(car2._pageNow).attr('data-translate','');
				car2._touchDeltaY = 0;

				// 切换成功后，执行当前页面的动画---延迟200ms
				setTimeout(function(){
					if(car2._page.eq(car2._pageNow).hasClass('z-animate')) return;
					car2._page.eq(car2._pageNow).addClass('z-animate');
				},20)

				// 隐藏图文组件的文本
				$('.j-detail').removeClass('z-show');
				$('.txt-arrow').removeClass('z-toggle');

			
	 		},300)

			// 切换成功后，发送统计
			var laytouType = car2._page.eq(car2._pageNow).attr('data-statics');
			
		})
 	},


/**
 *  media资源管理
 *  -->绑定声音控制事件
 *  -->函数处理声音的开启和关闭
 *  -->异步加载声音插件（延迟做）
 *  -->声音初始化
 *  -->视频初始化
 *  -->声音和视频切换的控制
 */

	
 	// 声音初始化
 	audio_init : function(){
 		// 声音按钮点击事件
 		var f = $("#audio_play");
 		if(f.attr('class')=='audio'){
 			setTimeout(function(){
 				document.getElementById("audio_play").play();
 			},1000); 			
 			$("#soundButton").on('click',function(){
	 			//如果有音乐的话
	 			if(document.getElementById("audio_play").paused){
	 				car2.audio_play();
				}else{
					car2.audio_stop();
				}
	 		});
 		}else{
 			car2._music = false;
 			//不显示音乐按钮
	 		$(".musicpage").addClass('f-hide');
 		}
 	},

 	// 声音播放
 	audio_play : function(){
 		if(car2._music){
	 		document.getElementById("audio_play").play();
	 		$("#soundButton").addClass('openSound');
	 	}
 	},

 	// 声音停止
 	audio_stop	: function(){
 		if(car2._music){
	 		document.getElementById("audio_play").pause();
	 		$("#soundButton").removeClass('openSound');
	 	}
 	},

 	// 视频初始化
 	video_init : function(){
 		// 视频
 		var v = $("#video_iframe_src").val();
 		//如果有标示开启视频
 		if(v){
 			$("#videoshow").on('click',function(){
 				//视频开启后 调整z-index 在最上层显示 防止 特效阻挡视频页面
 				$(".item_show").css({'z-index':'99999999999999'});
	 			//$("#video_iframe").attr("src",v);
	 			var videoframe='<iframe id="video_iframe" height="100%" width="100%" src="'+v+'" frameborder="0" allowfullscreen=""></iframe>'; 
	 			$(".m-Video").html(videoframe);
	 			$(".u-maskLayer").css({"display":"block","opacity":"1"});
	 			//停止播放音乐
		 		car2.audio_stop();
	 		});
	 		$("#videohide").on('click',function(){
	 			//视频关闭后 还原z-index 
	 			$(".item_show").css({'z-index':'9'});
	 			//$("#video_iframe").attr("src",'');
	 			$(".m-Video").empty();
	 			$(".u-maskLayer").css({"display":"none","opacity":"0"});
	 			//重新播放音乐
	 			car2.audio_play();
	 		});
 		}
 	},

	// media管理初始化
	media_init : function(){
        // 视频初始化
        car2.video_init();
		// 绑定音乐加载事件
		car2.audio_init();
	},

/**
 *  图片延迟加载功能
 *  -->替代需要延迟加载的图片
 *  -->优化加载替代图片
 *  -->切换功能触发图片的延迟加载
 *  -->替代图片为400*400的透明大图片
 */
	/* 图片延迟加载 */
	lazy_img : function(){
		var lazyNode = $('.lazy-img');
		lazyNode.each(function(){
			var self = $(this);
			if(self.is('img')){
				self.attr('src','http://mb.wed6.com/static/Scripts/img/load.gif');
			}else{
				// 把原来的图片预先保存下来
				var position = self.css('background-position'),
					size = self.css('background-size');

				self.attr({
					'data-position' : position,
					'data-size'	: size
				});

				if(self.attr('data-bg')=='no'){
					self.css({
						'background-repeat'	: 'no-repeat'
					})
				}

				self.css({
					'background-image'	: 'url(http://mb.wed6.com/static/Scripts/img/load.gif)',
					'background-size'	: '120px 120px',
					'background-position': 'center'
				})

				if(self.attr('data-image')=='no'){
					self.css({
						'background-image'	: 'none'
					})
				}
			}
		})
	},

	// 开始加载前三个页面
	lazy_start : function(){
		// 前三个页面的图片延迟加载
		setTimeout(function(){
			for(var i=0;i<3;i++){
				var node = $(".m-page").eq(i);
				if(node.length==0) break;
				if(node.find('.lazy-img').length!=0){
					car2.lazy_change(node,false);
					// 飞出窗口的延迟
					if(node.attr('data-page-type')=='flyCon'){
						car2.lazy_change($('.m-flypop'),false);
					}
				}else continue;
			}
		},200)
	},
	
	// 加载当前后面第三个
	lazy_bigP : function(){
		for(var i=3;i<=5;i++){
			var node = $(".m-page").eq(car2._pageNow+i);
			if(node.length==0) break;
			if(node.find('.lazy-img').length!=0){
				car2.lazy_change(node,false);
				// 飞出窗口的延迟
				if(node.attr('data-page-type')=='flyCon'){
					car2.lazy_change($('.m-flypop'),false);
				}
			}else continue;
		}
	},

	// 图片延迟替换函数
	lazy_change : function(node,goon){
		// 3d图片的延迟加载
		if(node.attr('data-page-type')=='3d') car2.lazy_3d(node);

		// 飞出窗口的延迟
		if(node.attr('data-page-type')=='flyCon'){
			var img = $('.m-flypop').find('.lazy-img');
			img.each(function(){
				var self = $(this),
					srcImg = self.attr('data-src');

				$('<img />')
					.on('load',function(){
						if(self.is('img')){
							self.attr('src',srcImg)
						}
					})
					.attr("src",srcImg);
			})
		}

		// 其他图片的延迟加载
		var lazy = node.find('.lazy-img');
		lazy.each(function(){
			var self = $(this),
				srcImg = self.attr('data-src'),
				position = self.attr('data-position'),
				size = self.attr('data-size');

			if(self.attr('data-bg')!='no'){
				$('<img />')
					.on('load',function(){
						if(self.is('img')){
							self.attr('src',srcImg)
						}else{
							self.css({
								'background-image'	: 'url('+srcImg+')',
								'background-position'	: position,
								'background-size' : size
							})
						}

						// 判断下面页面进行加载
						if(goon){
							for(var i =0;i<$(".m-page").size();i++){
								var page = $(".m-page").eq(i);
								if($(".m-page").find('.lazy-img').length==0) continue
								else{
									car2.lazy_change(page,true);
								}
							}
						}
					})
					.attr("src",srcImg);

				self.removeClass('lazy-img').addClass('lazy-finish');
			}else{
				if(self.attr('data-auto')=='yes') self.css('background','none');
			}
		})	
	},

	
	// 正则函数验证
	regFunction	: function(inputName){
		var empty_tip = '',
			reg_tip = '',
			reg = '';

		//判断
		switch (inputName) {
			case 'name':
				reg = /^[\u4e00-\u9fa5|a-z|A-Z|\s]{1,20}$/;
				empty_tip = '不能落下姓名哦！';
				reg_tip = '这名字太怪了！';
				break;
			case 'sex':
				empty_tip = '想想，该怎么称呼您呢？';
				reg_tip = '想想，该怎么称呼您呢？';
				break;
			case 'tel':
				reg = /^1[0-9][0-9]\d{8}$/;
				empty_tip = '有个联系方式，就更好了！';
				reg_tip = '这号码,可打不通... ';
				break;
			case 'email':
				reg = /(^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$)/i;
				empty_tip = '都21世纪了，应该有个电子邮箱吧！';
				reg_tip = '邮箱格式有问题哦！';
				break;
			case 'company':
				reg = /^[\u4e00-\u9fa5|a-z|A-Z|\s|\d]{1,20}$/;
				empty_tip = '填个公司吧！';
				reg_tip = '这个公司太奇怪了！';
				break;
			case 'job':
				reg = /^[\u4e00-\u9fa5|a-z|A-Z|\s]{1,20}$/;
				empty_tip = '请您填个职位';
				reg_tip = '这个职位太奇怪了！';
				break;
			case 'date':
				empty_tip = '给个日期吧！';
				reg_tip = '';
				break;
			case 'time':
				empty_tip = '填下具体时间更好哦！' ;
				reg_tip = '' ;
				break;
			case 'age':
				reg = /^([3-9])|([1-9][0-9])|([1][0-3][0-9])$/;
				empty_tip = '有个年龄就更好了！';
				reg_tip = '这年龄可不对哦！' ;
				break;
		}
		return {
			empty_tip	:empty_tip,
			reg_tip		:reg_tip,
			reg 		:reg
		}
	},



/**************************************************************************************************************/
/*  单个处理函数
***************************************************************************************************************/
/**
 * 单个函数处理-unit
 * -->高度的计算
 * -->文本的展开
 * -->文本的收起
 * -->输入表单的操作
 * -->微信的分享提示
 */
	// 根据设备的高度，来适配每一个模版的高度，并且静止滑动
	// --文档初始化计算
	// --页面切换完成计算
	height_auto	: function(ele,val){
		ele.children('.page-con').css('height','auto');
		var height = $(window).height();

		// 需要解除固定高度的page卡片
		var vial = true;
		if(!vial){
			if(ele.height()<=height){
				ele.children('.page-con').height(height+2);
				if((!$('.p-ct').hasClass('fixed'))&&val=='true') $('.p-ct').addClass('fixed');
			}else{
				car2._scrollStart();
				if(val=='true') $('.p-ct').removeClass('fixed');
				ele.children('.page-con').css('height','100%');
				return;
			}
		}else{
			ele.children('.page-con').height(height+2);
			if((!$('.p-ct').hasClass('fixed'))&&val=='true') $('.p-ct').addClass('fixed');
		}
	},



	// 对象私有变量刷新
	refresh	: function(){
		$(window).height() = $(window).height();
		car2._windowWidth = $(window).width();
	},

/**************************************************************************************************************/
/*  函数初始化
***************************************************************************************************************/
/**
 *  相关插件的启动
 */
	//插件启动函数
 	plugin : function(){
        
		car2.start_callback();
		//留言绑定
      	car2.liuyan_bind();

 	},


	// 蒙板插件回调函数处理
 	start_callback : function(){

 		// 开启window的滚动
 		car2._scrollStart();

 		// 开启页面切换
		car2.page_start();

		// 箭头显示
		//$('.u-arrow').removeClass('f-hide');
       
 	},

/**
 * app初始化
 */
	// 样式适配
	styleInit : function(){
		// 禁止文版被拖动
		document.body.style.userSelect = 'none';
		document.body.style.mozUserSelect = 'none';
		document.body.style.webkitUserSelect = 'none';

		// 判断设备的类型并加上class
		if(car2._IsPC()) $(document.body).addClass('pc');
		else $(document.body).addClass('mobile');
		if(car2._Android) $(document.body).addClass('android');
		if(car2._iPhoen) $(document.body).addClass('iphone');

		// 判断是否有3d
		if(!car2._hasPerspective()){
			car2._rotateNode.addClass('transformNode-2d');
			$(document.body).addClass('no-3d');
		}else{
			car2._rotateNode.addClass('transformNode-3d');
			$(document.body).addClass('perspective');
			$(document.body).addClass('yes-3d');
		}

		// 图片延迟加载的处理
		this.lazy_img();
		
		// 模版提示文字显示
		setTimeout(function(){
			$('.m-alert').find('strong').addClass('z-show');

		},3000)

		$('.u-arrow').on('touchmove',function(e){e.preventDefault()})

		$('.p-ct').height($(window).height());
		$('.m-page').height($(window).height());
		$('#j-mengban').height($(window).height());
		$('.translate-back').height($(window).height());
	},
	//婚礼倒计时
	djs:function(sstime){
		var stime = sstime;
		setInterval(function(){
			if (stime < 1) { stime = 0; }
			var day = Math.floor(stime / (24 * 60 * 60));
			var hour = Math.floor((stime - day * (24 * 60 * 60)) / (60 * 60));
			var minute = Math.floor((stime - day * (24 * 60 * 60) - hour * (60 * 60)) / 60);
			var second = Math.floor(stime - day * (24 * 60 * 60) - hour * (60 * 60) - minute * 60);
			$('#day').text(day);
			$('#hour').text(hour);
			$('#minute').text(minute);
			$('#second').text(second);
			stime--;	
		}, 1000);
	},
	//微信分享
	weixinfenxiang:function(desc,title,url,imgurl,acurl){
		$.getJSON(acurl, {url: url},function(data){
		  wx.config({
		    appId   : data.entity.appid,
		    timestamp : data.entity.timestamp,
		    nonceStr  : data.entity.noncestr,
		    signature : data.entity.signature,
		    jsApiList: [
		      // 所有要调用的 API 都要加到这个列表中
		      "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo","onMenuShareQZone"
		    ]
		  });
		   wx.ready(function () {
		    // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
		      wx.checkJsApi({
		        jsApiList: [
		          'getNetworkType',
		          'previewImage',
		           'onMenuShareTimeline',
		          'onMenuShareAppMessage',
		          'onMenuShareQQ',
		          'onMenuShareWeibo',
			  'onMenuShareQZone'
		        ],
		        success: function (res) { /*alert(JSON.stringify(res));*/ }
		      });
		    var shareData = {
		        title: title,
		        desc: desc,
		        //link: document.url,
		        link: url,
		        imgUrl: imgurl,
		        trigger: function (res) {/*alert('用户点击发送给朋友');*/},
		        success: function (res) {/*alert('已分享');*/},
		        cancel: function (res) {/*alert('已取消');*/},
		        fail: function (res) {/*alert(JSON.stringify(res));*/}
		    };
		    wx.onMenuShareAppMessage(shareData);
		    wx.onMenuShareTimeline(shareData);
		    wx.onMenuShareQQ(shareData);
		    wx.onMenuShareWeibo(shareData);
		    wx.onMenuShareQZone(shareData);
		  });

		  wx.error(function (res) {/*alert(res.errMsg);*/}); 
		});
	},
	//请柬页面切换for pc
	pnext:function(){

		var a=$(".item_show"); //显示页面
		var b=a.next(); //下一页
		var c=a.prev();
		//if(a.attr('class').indexOf('pageend')>=0){//最后一页
		if(a.html()==$(".m-page:last").html()){
			a.addClass('pt-page-moveToTop');
			$('.m-fengye').addClass('item_show1');
			setTimeout(function (){ 
				a.removeClass('pt-page-moveToTop').removeClass('item_show').addClass('f-hide').addClass('action');
			    $('.m-fengye').removeClass('f-hide').removeClass('item_show1').addClass('item_show');
				car2._pageNow=0;
			},500);
			c.removeClass('action');
		}else{//其他页
			a.addClass('pt-page-moveToTop');
			b.addClass('item_show1');
			setTimeout(function (){ 
				a.removeClass('pt-page-moveToTop').removeClass('item_show').addClass('f-hide').addClass('action');
			    b.removeClass('f-hide').removeClass('item_show1').addClass('item_show');
				car2._pageNow+=1;
			},500);
			if(a.attr('class').indexOf('m-fengye')>=0){//第一页
				//c.removeClass('action');
			}else{
				c.removeClass('action');
			}
		}
		//console.log(car2._pageNow);
	},
	pprev:function(){
		var a=$(".item_show"); //显示页面
		var b=a.prev(); //下一页
		//如果当前在最后一页
		if(a.attr('class').indexOf("m-fengye")>=0){
			console.log('no');
			car2._pageNow=0;
		}else{
			a.addClass('pt-page-moveToBottom');
			b.addClass('item_show1');
			setTimeout(function (){ 
				a.removeClass('pt-page-moveToBottom').removeClass('item_show').addClass('f-hide').addClass('action');
			    b.removeClass('f-hide').removeClass('item_show1').addClass('item_show').removeClass('action');
			    b.next().next().removeClass('action');
				car2._pageNow-=1;
			},500);
		}
		//console.log(car2._pageNow);
	},
	//留言事件绑定
	liuyan_bind:function(){
		//点击打开留言窗
		$(".item6_btn1").on("click",function(e){
			e.stopPropagation();
			$("#message").removeClass('cpm-hide');
			//ajax 获取评论列表
			if($("#J_book_list").attr('datainfo')!='ok'){
				$.ajax({
				 	url: zthisurl+'',
				 	dataType: 'json',
				 	type:'POST',
				 	success: function(msg){ 
				 		//获取成功设置标示
				 		var html = '';
						$("#J_book_list").attr('datainfo',"ok");
						var data = msg.entity.list;
						for(var o in data){  
							if(data[o].guesttype==1){
					        	guanxi="男";
					        }else{
					        	guanxi="女";
					        }
					        html+='<li><p><span class="name">'+data[o].guestname+'</span>说：</p><div class="txt">'+data[o].bookcontent+'</div><p class="time" style="text-align:right">('+guanxi+'方亲友)&nbsp;</p></li>';
					    }  
					    $("#J_book_list").html(html);
				 	}
				});
			}

		});
		//关闭留言窗
		$(".message-close").on("click",function(){
			car2._scrollStart();
			$("#message").addClass('cpm-hide');
		});
		//绑定提交按钮
		$("#J_SaveReback_btn").on("click",function(){
			var msgname = $("#msgname").val();
			var msgnum = $("#msgnum").val();
			var msgguanxi = $("#msgguanxi").val();
			var msgdianhua = $("#msgphone").val();
			var msgzhufu = $("#msgzhufu").val();
			var guanxi='';
			if(msgname.length > 0 && msgguanxi.length > 0 && msgdianhua.length > 0 && msgzhufu.length > 0 ){
				var data = {p1:msgname,p2:msgnum,p3:msgguanxi,p4:msgdianhua,p5:msgzhufu,id:qid};
				if(msgguanxi==1){
				  guanxi="男";
				}else{
				  guanxi="女";
				}
				inserthtml='<li><p><span class="name">'+msgname+'</span>说：</p><div class="txt">'+msgzhufu+'</div><p class="time" style="text-align:right">('+guanxi+'方亲友)&nbsp;</p></li>';
				if($("#J_book_list").attr('datasend')!='ok'){
					//ajax 获取评论列表
					$.ajax({
					 	url: zthisurl+'app/inmsg',
					 	dataType: 'json',
					 	type:'POST',
					 	data: data,
					 	success: function(msg){
							$("#J_book_list").prepend(inserthtml);
							$("#J_book_list").attr('datasend',"ok");
							alert('感谢你的祝福');
					 	}
					});		
				}else{
					alert('感谢你的祝福!');
				}
			}else{
				alert('请检查输入信息');
			}
		});
	},

	// 对象初始化
	init : function(){
		// 样式，标签的渲染
		// 对象操作事件处理
		this.styleInit();
		this.haddle_envent_fn();
		
		// 禁止滑动
		//this._scrollStop();

		// 绑定全局事件函数处理
		// $(window).on('resize',function(){
		// 	car2.refresh();
		// })
		
		$('input[type="hidden"]').appendTo($('body'));
		
		// 图片预先加载
		$('<img />').attr('src',$('#r-cover').val());
		$('<img />').attr('src',$('.m-fengye').find('.page-con').attr('data-src'));
        
	}
};
// loading执行一次
var loading_time = new Date().getTime();
var windowLoadIsEnd = false;

window.setTimeout(function(){
	if(!windowLoadIsEnd){
		windowLoadIsEnd = true;
		windowLoad();
	}
},4000);
$(window).on('load',function(){
	if(!windowLoadIsEnd){
		windowLoadIsEnd = true;
		windowLoad();
	}
});
function windowLoad(){
		var now = new Date().getTime();
		var loading_end = false;
		var time;
		var time_del = now - loading_time;
		if ( time_del >= 500 ) {
			loading_end = true;
		}
		if ( loading_end ) {
			time = 0;
		} else {
			time = 500 - time_del;
		}
		$('.p-ct').addClass('f-hide');
		$('.u-arrow').addClass('f-hide');
		var loadingnumd = 0;
           
		var loadingnum = window.setInterval(function(){
			var v =parseInt(loadingnumd/1);
			if(loadingnumd>=100){
				v=100;
				window.clearInterval(loadingnum);
                		//当函数执行至此时一定载入完成了且进度条达到了100
                 		//此时执行下面的方法，等待0.5秒后进入请柬页面
                   		setTimeout(function(){
					if(document.getElementById('j-mengban')){
                 				$('#j-mengban').addClass('z-show');
					}
			 		runuarrow();
			   		car2.media_init();
                 		}, 500);
			}
			$(".persent").text(v+"%");
			loadingnumd += 6;
		},100);
}
/* 移动端浏览器不支持audio的自动播放功能，必须要用户触发一个事件后才能进行播放 */
window.onload = function () {
	document.addEventListener("WeixinJSBridgeReady",function onBridgeReady(){document.getElementById("audio_play").play();});
/*	
        var bot = document.getElementsByTagName('html')[0];
        bot.addEventListener('touchstart', function () {
          car2.audio_play();
          console.log('touchstart-start');
        });
        creatTouchstartEventAndDispatch(bot);
        function creatTouchstartEventAndDispatch (el) {
            
            var event = document.createEvent('Events');
            event.initEvent('touchstart', true, true);
            el.dispatchEvent(event);
        }*/
} 

$(document).ready(function(){
    $('html').one('touchstart', function(){
           car2.audio_play();
    });
});

function runuarrow(){
	//开启贵宾
	if(guest == '1'){
		$('.mb-alert').removeClass('f-hide');
		$('.m-alert').addClass('f-hide');
		$('#app_coveretc1').show();
	}else{
		//主程序
		appstart();	
	}
}

/**运行主程序*/
function appstart(){
	//开启蒙版
	if(ismengban && ismengban!='cmoren' && openmb){
		$("#app_coveretc1").hide();
		console.log(1);
		$('.m-alert').addClass('f-hide');
		$('.mb-alert').removeClass('f-hide');
		if(ismengban=="kiss"){
			txkiss.init();
		}else if(ismengban=="guaguaka"){
			txguaguaka.init();
		}else if(ismengban=="sandian"){
			//txsandian.init();
		}else if(ismengban=="fingerprint"){
			txfingerprint.init();
		}else if(ismengban=="yaoyiyao"){
			txyaoyiyao.init();
		}else if(ismengban=="ring"){
			inc('http://mb.wed6.com/static/Scripts/jquery-ui.min.js');
			setTimeout("txring.init()",2400);
		}
	}else{
		//开启特效 （js控制）
		if(texiao){
			initf();
		}
		$('.f-abs').removeClass('f-hide');
		$('.mb-alert').addClass('f-hide');
		$('.translate-back').removeClass('f-hide');
		$('.p-ct').removeClass('f-hide');
		$('.u-arrow').removeClass('f-hide');
		//绑定点击事件
		$('.u-arrow').on("click",function(){
			car2.pnext();
		});
		$('#leafContainer').removeClass('f-hide');
		$('.m-alert').addClass('f-hide');
		car2.height_auto(car2._page.eq(car2._pageNow),'false');	
		

		// 延迟加载后面三个页面图片
		car2.lazy_start();
		
		// 插件加载
		car2.plugin();

	 	$('.p-ct').height($(window).height());
		$('.m-page').height($(window).height());
		$('.translate-back').height($(window).height());	
	}
}
function removeElement()
{
document.getElementById("hb").style.display="none";
}

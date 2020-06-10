<template>
	<view class="container">
	<view class="bg-f">
		<view class="lbt-nav">
			<swiper :indicator-dots="true" indicator-active-color="#8f1315" :autoplay="true" :interval="3000" :duration="1000" class="swiper">
				<swiper-item class="swiper-item-img">
					<image src="https://group.zrngrly.cn/Uploads/image/goods/2020-05-06/5eb24d0126c69.png?imageView2/2/w/0/h/0/ignore-error/1" mode=""></image>
				</swiper-item>
				<swiper-item class="swiper-item-img">
					<image src="https://group.zrngrly.cn/Uploads/image/goods/2020-05-06/5eb24d0126c69.png?imageView2/2/w/0/h/0/ignore-error/1" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- icon---团购link页面 -->
		<view class="groupBuy-link" @click="toPinTuan">
			<image src="https://group.zrngrly.cn/Uploads/image/goods/2020-05-07/5eb3f13e7d512.png?imageView2/2/w/258/h/258/ignore-error/1" mode="" class="nav-list-img"></image>
			<view class="nav-list-text">团购</view>
		</view>
		<!-- 公告 -->
		<view style="padding-bottom:10px;">
		<view class="top-msg">
			<view class="msg-icon">
				<image src="https://group.zrngrly.cn/Uploads/image/goods/2020-05-06/5eb24e416ab8e.png" role="img"></image>
			</view>
			<view class="msg-swipe">
				<swiper class="notice-swipe" autoplay="true" interval="3000" vertical="true">
					<swiper-item class="notice-swipe-item">
					<view class="">
						但莫上线但莫上线
					</view>
					</swiper-item>
					<swiper-item class="notice-swipe-item">
					<view class="">
						但莫上线但莫上线
					</view>
					</swiper-item>
				</swiper>
			</view>
			</view>
		</view>
	</view>
	<!-- list-content -->
	<view class="list-content">
		<view class="pin-spec1">
			<!-- 水平排列团购商品 -->
			 <!-- 拼团 -->
			 <view class='pin-spec' v-if="pinList">
			   <image class="pin-spec-img" mode="widthFix" :src="pinList.pintuan_index_coming_img" v-if="pinList.pintuan_index_coming_img"></image>
			   <scroll-view class='pin-spec-scroll' scroll-x>
			      <view class='pin-spec-wrap'>
			        <view class="pin-spec-item" @click="pinTuan"
					v-for = "(item,index) in pinList.list" 
					:key="index">
			          <image :src="item.skuImage" class="pin-img"></image>
					  <!-- <image src="../../static/placeholder-refund.png" height="200" width="180" iClass="`" loadImage="item.skuImage"></image> -->
			         <!-- <view v-if="item.label_info && item.label_info.type==0" class='item-tag'>
			            <image class='item-tag-bg' mode='widthFix' src="../../static/tag.png"></image>
			            <view class='tag-name'>item.label_info.tagcontent}}</view>
			          </view> -->
			          <!-- <view v-if="item.label_info && item.label_info.type==1" class='item-tag' style='background:url(item.label_info.tagcontent) no-repeat left top;background-size: 100%;'></view> -->
			          <view class="act-end" v-if="item.spuCanBuyNum==0">已抢光</view>
			          <view class='title'>{{item.spuName}}</view>
			          <text class="pin-tag" style="border-color: #a22028;color: #a22028">{{item.pin_count}}人团</text>
			         <view class='new-bot'>
			            <view class='price'>¥{{item.actPrice[0]}}.{{item.actPrice[1]}}</view>
			            <view class="market-price">¥{{item.marketPrice[0]}}.{{item.marketPrice[1]}}</view>
			          </view>
			        </view>
			      </view>
			    </scroll-view>
			  </view>
		</view>
			<!-- 拼团 2-->
			<view class='pin-spec' v-if="pinList">
			  <image class="pin-spec-img" mode="widthFix" :src="pinList.pintuan_index_coming_img" v-if="pinList.pintuan_index_coming_img"></image>
				<view class="pinrow-wrap">
				<view class="border-bottom" v-for = "(item,index) in pinList.list" :key="index">
		        <view class="spu-content">
					 <!-- url="/lionfish_comshop/moduleA/pin/goodsDetail?&id={{item.actId}}" -->
		          <view class="item-top">
		            <image class="spu-img img-def opacity show-img" :src="item.bigImg?item.bigImg:item.skuImage"></image>
		            <view class="spu-play" if="item.is_video">
						<image class="img" src="../../static/play.png"></image>
						</view>
		          </view>
		          <view class="item-bottom">
		            <view class="spu-title">
		              <text class='span'>{{item.spuName}}</text>
		            </view>
		            <view class="spu-desc" v-if="item.spuDescribe">
		              <text class="em">{{item.spuDescribe}}</text>
		            </view>
		            <view class="spu-count">
		              <text class="pin-tag" style="color:#a22028;border-color:#a22028">{{item.pin_count}}人团</text> 
		              <view>已拼{{item.soldNum}}件</view>
					  
		            </view>
		            <view class="spu-price">
						<view class="market-price">¥{{item.marketPrice[0]}}.{{item.marketPrice[1]}}</view>
		              <view class="sale-price">
		                <text class='span'>¥{{item.actPrice[0]}}</text>.{{item.actPrice[1]}}
		              </view>
		            </view>
		          </view>
		         <!-- <block v-if="!isPast"> -->
		            <button class="add-cart-disabled" disabled="item.spuCanBuyNum==0" v-if="item.spuCanBuyNum==0">
		              已抢光
		            </button>
		           <button @click="goLink(item.actId)" iClass="add-cart" class="add-cart" style="background: linear-gradient(90deg, #a22028 0%, #b85369 100%);" v-else>
		              去拼团
		            </button>
		          <!-- </block> -->
		          <view class="mask" v-if="item.spuCanBuyNum==0?'disabled':''"></view>
		          <view class="act-end act-out" v-if="item.spuCanBuyNum==0">已抢光</view>
		        </view>
					</view>
				</view>
				<view class="pin-more" @click="seeAll">
					查看全部> 
					<!-- <text class="iconfont icon-youjiantou fsz-22"></text> -->
				</view>
			</view>
			<!-- 抢购 -->
	<image class="rush-list-title" id="rush-title" src="../../static/rush-title.png" role="img"></image>
	<form bindsubmit="goResult" style="display: block;width: 100%;">
	 <view class="search-bar">
	   <view class="search-box">
	      <input class="ipt" name="keyword" placeholder="搜索商品" type="text"/>
		<view class="search-icon">
			<text class="iconfont icon-sousuo1">
			
			</text>
		</view>
	    </view>
	    <button class="search-btn" form-type="submit" style="color:#a22028" role="button" aria-disabled="false">搜索</button>
	  </view>
	   </form>
	   
	   <!-- 抢购区导航条 -->
	     <view class="sticky-content">
	          <view class="tab-nav tab-nav-query" style='border-color:qgtab.bottom_color?qgtab.bottom_color:"#F75451"'>
	             <view @click="tabSwitch" data-idx="1" 
				 class="tab-nav-item"
				 >
	               <image v-if="tabIdx == 1" src="../../static/index-tab-left-active.png"></image>
	               <image v-else src="../../static/index-tab-left-disabled.png"></image>
	               <text style="z-index: 10;"
				   :class="tabIdx==1?'active':''">正在抢购</text>
	             </view>
	             <view @click="tabSwitch" data-idx="0" 
				 class="tab-nav-item"
				 >
	               <image v-if="tabIdx == 0" src="../../static/index-tab-right-active.png"></image>
				   <image v-else src="../../static/index-tab-right-disabled.png"></image>
				   <text style="z-index: 10;"
				   :class="tabIdx==0?'active':''">即将开抢</text>
	             </view>
	           </view>
			   <!-- 导航条 -->
			   <view class="tabs category-list">
					<scroll-view class="tabs__navs" scroll-left="0">
						<view class="tabs__navs__wrap">
							<view class="tabs__nav"
							v-for="(item,index) in firstTabList"
							:key="index" 
							data-index="index"
							>
								{{item.name}}
							</view>
							<view class="activeIndicator" style="width:28px"></view>
						</view>
					</scroll-view>
			   </view>
	         </view>
			 
			<!-- 抢购商品列表 -->
			<view class="rush-list-box" v-show="showRush">
				<view class="theme3" v-if="rushList">
					<view class="rushItem" 
						v-for = "(item,index) in rushList"
						:key="index">
						<image @click="goLink(item.actId)" :src="item.skuImage" mode="" class="new-img"></image>
						<view class='title'>
						{{item.spuName}}
						</view>
						<view class="new-bot">
							<text class="price"
							v-if="item.actPrice[0] !== '0' && item.point !=='0' && item.point !== undefined">
							¥{{item.actPrice[0]}}.{{item.actPrice[1]}}+{{item.point}}积分
							</text>
							<text class="price"
							v-if="item.actPrice[0] == '0' && item.point !=='0'">
							{{item.point}}积分
							</text>
							<text 
							class='price' 
							v-if="item.actPrice[0] == '0' && item.actPrice[1] !== '00' && item.point =='0'">
								¥{{item.actPrice[0]}}.{{item.actPrice[1]}}
								</text>
							<text 
							class="price"
							v-if="item.actPrice[0] !== '0' && item.point =='0'">
								¥{{item.actPrice[0]}}.{{item.actPrice[1]}}
							</text>
							<text
							class="price"
							v-if="item.actPrice[0] !== '0' && item.point == undefined">
								¥{{item.actPrice[0]}}.{{item.actPrice[1]}}
							</text>
							</view>
								<image class="cart" src="../../static/cart.png" @click="addBusCar"></image>
						</view>
					</view>
					<view class="slogan">
						<image src="https://group.zrngrly.cn/Uploads/image/goods/2020-05-08/5eb446338b466.png" role="img"></image>
					</view>
				</view>
				<view class="rush-list-box comming-list" v-show="showCommingEmpty">
					<view class="none-rush-list">
						<image class="img-block" src="../../static/icon-index-empty.png" mode=""></image>
						<view class="h1">
							暂时没有团购
						</view>
						<view class="h2">
							我们正在为您准备更优惠的团购
						</view>
					</view>
				</view>
			</view>
		<!-- 登录提示 -->
		<view class="mask" v-show="maskShow">
		<view class="auth-content">
			<image class="bg" mode="widthFix" src="../../static/auth-bg.png" role="img" style="height: 271.516px;"></image>
			<view class="btn">
				<view class="close-btn" @click="noLogin">
					暂不登录
				</view>
				<view class="login-btn" @click="toLogin">
					立即登录
				</view>
			</view>
		</view>	
		</view>
		<view class="share">
			<image src="../../static/share-white.png" mode="" class="share-img"></image>
			<view class="text">
				分享
			</view>
		</view>
		<view class="share top" v-show="topShow" @click="goTop">
			<image src="../../static/gotop.png" mode="" class="share-img"></image>
			<view class="text">
				顶部
			</view>
		</view>
	  </view>
</template>

<script>
	import util from '../../utils/util.js'
	export default {
		components:{
		},
		data() {
			return {
				pinList:null,
				rushList: null,
				token: '',
				pageNum: 1,
				classificationId: null,
				overPageNum: 1,
				isLogin: false,
				maskShow: false,
				topShow: false,
				contrastValue: 1200,
				tabIdx: 1,
				commingClassificationId: 0,
				tpage: 1,
				showRush: true,
				showCommingEmpty: false,  //暂时没有团购提示
				firstTabList: null
			}
		},
		onLoad() {
			this.getPinList();
			this.get_index_info();
			this.loadRushList();
			this.loadORushListver();
		},
		//触底
		onReachBottom: function(){
			// this.topShow = true;
		},
		onPageScroll: function(e){
			if(e.scrollTop > this.contrastValue){
				this.topShow = true;
			}else{
				this.topShow = false;
			}
		},
		methods: {			
			// 拼团列表
			getPinList: function(){
				uni.showLoading();
				let that = this;
				let community = wx.getStorageSync('community');
				let head_id = community.communityId || '';
				util.request({
				  url: 'entry/wxapp/index',
				  data: {
					controller: 'group.get_pintuan_list',
					is_index: 1,
					head_id
				  },
				  dataType: 'json',
				  success: function (res) { 
					uni.hideLoading();
					// this.isShow = true;
					that.pinList = res.data;
					},
					fail: (err) => {
						console.log(err)
					}
					})
			},
			toPinTuan: function(){
				uni.navigateTo({
					url:'../pintuan/pintuan'
				})
			},
			//抢购切换
			tabSwitch: function(t){
				let that = this;
				that.tabIdx = t.currentTarget.dataset.idx;
				console.log(that.tabIdx)
				if(that.tabIdx == 1){
					that.showRush = true;
					that.showCommingEmpty = false;
				}else{
					that.getCommingList();
				}
			},
			//获取首页导航条名称
			get_index_info: function() {
			    let that = this;
			    let community = wx.getStorageSync('community');
			    let communityId = community && community.communityId || '';
			    let token = wx.getStorageSync('token');
			    util.request({
			      'url': 'entry/wxapp/index',
			      'data': {
			        controller: 'index.index_info',
			        communityId,
			        token
			      },
			      dataType: 'json',
			      success: function(res) {
			        console.log(res)
			        // that.firstTabList = res.data.category_list;
					}
				})
			},
					
			// 加载抢购列表
			loadRushList: function(){
				let that = this;
				let cur_community = wx.getStorageSync('community');  //默认为空
				let gid = that.classificationId;
				// 请求抢购商品列表信息
				util.request({
				  url: 'entry/wxapp/index',
				  data: {
						controller: 'index.load_gps_goodslist',
						token: that.token, //默认空字符串
						pageNum: that.pageNum,
						head_id: cur_community.communityId,
						gid,
						per_page: 12
				  },
				  dataType: 'json',
				  success: function (res) {  
					that.rushList = res.data.list;
					},
					fail: (err) => {
						console.log(err)
					}
					})
			},
			// 获取售罄商品
			loadORushListver: function(){
				let that = this;
				let cur_community = wx.getStorageSync('community');  //默认为空
				let gid = that.classificationId;
				// 请求抢购商品列表信息
				util.request({
				  url: 'entry/wxapp/index',
				  data: {
						controller: 'index.load_over_gps_goodslist',
						token: that.token, //默认空字符串
						pageNum: that.overPageNum,
						head_id: cur_community.communityId,
						gid,
						is_index_show: 1
				  },
				  dataType: 'json',
				  success: function (res) {  
					let overList = res.data.list;
					for (let i = 0; i < overList.length; i++) {
						that.rushList.push(overList[i])
					}
					},
					fail: (err) => {
						console.log(err)
					}
					})
		},
		//即将开抢列表
		getCommingList: function(){
			let that = this;
			let token = wx.getStorageSync('token');
			let cur_community = wx.getStorageSync('community');
			let gid = that.commingClassificationId;
			console.log(gid)
			util.request({
				url: 'entry/wxapp/index',
				data: {
				  controller: 'index.load_comming_goodslist',
				  token,
				  pageNum: that.tpage,
				  head_id: cur_community.communityId,
				  gid
				},
				dataType: 'json',
				success: function (res) {
				  console.log(res)
				  if (res.data.code == 1) {
					  that.showRush = false;
					  that.showCommingEmpty = true;
				  }
				  },
				  fail:(err) => {
					 console.log(err) 
				  }
				})
		},
		//加入购物车
		addBusCar: function(){
			let that = this;
			/**
			 * 判断是否已经登录
			 * 未登录，需要先去登录
			 * 已经登录，可以将商品加入购物车
			 */
			let isLogin = that.isLogin;
			if(!isLogin){
				that.maskShow = true;
				
			}else{
				//已经登录，可以将商品加入购物车
			}
				
		},
		noLogin: function(){
			let that = this;
			this.maskShow = false;
		},
		toLogin: function(){
			this.maskShow = false;
			uni.navigateTo({
				url:'../login/login'
			})
		},
		// 查看全部
		seeAll: function(){
			uni.navigateTo({
				url:'../pintuan/pintuan'
			})
		},
		// 滚动到底部,显示回到顶部按钮
		// reachBottom: function(){
		// 	this.topShow = true;
		// 	console.log("到达底部")
		// },
		//点击回到顶部按钮
		goTop: function(){
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 500
			})
		},
		goLink: function(id) {
			//携带商品actId
			let url = "../goodsDetail/goodsDetail?id=" + id;
			wx.navigateTo({
				url 
				})
		  },
		pinTuan: function(){
			uni.navigateTo({
				url:'../pintuan/pintuan'
			})
		}
	}
}
</script>

<style>
	.container {
		width: 100%;
		height: auto;
		background-color: #eee;
	}
	.bg-f{
		background-color: #fff;
	}
	.lbt-nav{
		padding: 20rpx;
	}
	.swiper{
		border-radius: 20rpx;
		overflow: hidden;
		height: 350rpx;
	}
	.swiper-item-img image{
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}
	.groupBuy-link{
		width: 25%;
		height: 10%;
		margin: 20rpx 0 20rpx 0;
		text-align: center;
		
		}
	.nav-list-img{
		width: 90rpx;
		height: 90rpx;
	}
	.nav-list-text{
		margin-top: 6rpx;
	}
	
	/* 公告 */
	.top-msg {
	width: 690rpx;
	height: 80rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	color: #ff5344;
	font-size: 24rpx;
	line-height: 24rpx;
	margin: 0 auto;
	background: #fff9f4;
	border-radius: 40rpx;
	position: relative;
	}
	.top-msg .msg-icon{
		position: absolute;
		line-height: 85rpx;
	}
	.top-msg .msg-swipe{
		margin-left: 60rpx;
	}
	.top-msg image {
	width: 42rpx;
	height: 26rpx;
	margin-right: 20rpx;
	margin-top: -4rpx;
	
	}
	.notice-swipe {
	height: 80rpx;
	}
	.notice-swipe-item {
	line-height: 80rpx;	
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	}
	.list-content{
		padding: 20rpx;
	}
	
	/* 1.拼团列表 */
	.pin-spec {
	  position: relative;
	  background: #fff;
	  margin: 20rpx;
	  border-radius: 10rpx;
	  overflow: hidden;
	}
	
	.pin-spec-img {
	  width: 100%;
	  vertical-align: top;
	  border-radius: 10rpx 10rpx 0 0;
	}
	
	.pin-spec-scroll {
	  max-height: 380rpx;
	}
	
	.pin-spec-wrap {
	  position: relative;
	  display: flex;
	  flex-direction: row;
	  flex-wrap: nowrap;
	}
	
	.pin-spec-item {
	  position: relative;
	  width: 240rpx;
	  box-sizing: border-box;
	  padding: 20rpx;
	  font-size: 28rpx;
	}
	
	.pin-spec-item .pin-img {
	  width: 200rpx;
	  height: 200rpx;
	  margin-bottom: 20rpx;
	}
	
	.pin-spec-item .title {
	  overflow: hidden;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	}
	
	.new-bot {
	  margin-top: 10rpx;
	  display: flex;
	  align-items: center;
	}
	
	.pin-spec-item .price {
	  color: #ff5041;
	}
	
	.pin-spec-item .act-end {
	  position: absolute;
	  height: 60rpx;
	  border-radius: 10rpx;
	  background: rgba(0, 0, 0, 0.5);
	  color: #fff;
	  font-size: 28rpx;
	  text-align: center;
	  line-height: 60rpx;
	  left: 50%;
	  top: 80rpx;
	  padding: 0 12rpx;
	  transform: translateX(-50%);
	}
	
	.pin-spec-item .market-price {
	  text-decoration: line-through;
	  color: #999;
	  font-size: 22rpx;
	  margin-left: 10rpx;
	}
	
	.pin-spec-item .pin-tag {
	  display: inline-block;
	  font-size: 22rpx;
	  padding: 0 6rpx;
	  margin-right: 10rpx;
	  border: 0.1rpx solid #ff5344;
	  vertical-align: middle;
	  color: #ff5344;
	  border-radius: 4rpx;
	}
	
	/* 标签 */
	
	.pin-spec .item-tag {
	  position: absolute;
	  left: 20rpx;
	  top: 20rpx;
	  width: 54rpx;
	  height: 62rpx;
	  z-index: 1;
	  color: #fff;
	  text-align: center;
	}
	
	.item-tag-bg {
	  position: absolute;
	  left: 0;
	  top: 0;
	  width: 54rpx;
	  height: 62rpx;
	  z-index: 0;
	}
	
	.pin-spec .item-tag .tag-name {
	  position: relative;
	  padding-top: 6rpx;
	  font-size: 20rpx;
	  line-height: 1;
	  font-weight: 600;
	  z-index: 1;
	}
	
	.pin-spec .item-tag .tag-name.two-word {
	  font-size: 22rpx;
	  padding-top: 14rpx;
	}
	/* 拼团2 */
	.pinrow-wrap .spu-content {
	  display: block;
	  overflow: hidden;
	  margin: 20rpx auto;
	  padding: 20rpx 20rpx 30rpx;
	  box-sizing: border-box;
	  position: relative;
	  display: flex;
	  border-bottom: 1px solid #e5e5e5;
	}
	.border-bottom{
	}

	.pinrow-wrap .spu-img {
	  width: 240rpx;
	  height: 240rpx;
	  border-radius: 10rpx;
	}
	
	.pinrow-wrap .item-top {
	  position: relative;
	}
	
	.item-bottom {
	  flex: 1;
	  box-sizing: border-box;
	  margin-left: 20rpx;
	  display: flex;
	  flex-direction: column;
	  justify-content: space-between;
	}
	
	.pinrow-wrap .spu-content .spu-title {
	  color: #333;
	  font-size: 30rpx;
	  height: 32rpx;
	  width: 400rpx;
	  margin-bottom: 12rpx;
	  font-weight: bold;
	  position: relative;
	}
	
	.pinrow-wrap .spu-content .spu-title .span {
	  width: 100%;
	  height: 40rpx;
	  position: absolute;
	  left: 0;
	  top: -4rpx;
	  line-height: 40rpx;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	  margin: 0;
	}
	
	.pinrow-wrap .spu-content .spu-desc {
	  font-size: 26rpx;
	  line-height: 26rpx;
	  color: #999;
	  position: relative;
	  width: 400rpx;
	  height: 26rpx;
	  margin-bottom: 12rpx;
	}
	
	.pinrow-wrap .spu-content .spu-desc .em {
	  width: 100%;
	  height: 32rpx;
	  position: absolute;
	  left: 0;
	  top: -2rpx;
	  line-height: 32rpx;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	}
	
	.pinrow-wrap .spu-content .spu-price {
	  /* display: flex; */
	  /* align-items: flex-end; */
	  font-size: 26rpx;
	  line-height: 26rpx;
	  overflow: hidden;
	}
	
	.pinrow-wrap .spu-content .spu-price .sale-price {
	  color: #ff5344;
	  margin-right: 12rpx;
	}
	
	.pinrow-wrap .spu-content .spu-price .sale-price .span {
	  font-size: 46rpx;
	  line-height: 42rpx;
	  margin: 0;
	  font-weight: bold;
	}
	
	.pinrow-wrap .spu-content .spu-price .market-price {
	  text-decoration: line-through;
	  color: #999;
	  margin-right: 20rpx;
	  margin-bottom: 10rpx;
	}
	
	.pinrow-wrap .spu-content .spu-count {
	  /* margin-top: auto; */
	  font-size: 24rpx;
	  color: #999;
	  margin-bottom: 10rpx;
	}
	
	.pinrow-wrap .spu-content .spu-count .pin-tag {
	  display: inline-block;
	  font-size: 22rpx;
	  padding: 0 6rpx;
	  margin-bottom: 10rpx;
	  border: 0.1rpx solid #ff5344;
	  vertical-align: middle;
	  color: #ff5344;
	  border-radius: 4rpx;
	}
	
	.pinrow-wrap .spu-content .add-cart,
	.pinrow-wrap .spu-content .add-cart-disabled {
	  width: 160rpx;
	  height: 60rpx;
	  padding: 0;
	  margin: 0;
	  position: absolute;
	  right: 15rpx;
	  bottom: 30rpx;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  background: linear-gradient(90deg, #ff5041 0%, #ff695c 100%);
	  color: #fff;
	  border-radius: 30rpx;
	  font-size: 26rpx;
	  font-weight: bold;
	}
	
	.pinrow-wrap .spu-content .add-cart-disabled {
	  background: #ccc;
	}
	
	.pinrow-wrap .spu-play {
	  position: absolute;
	  left: 120rpx;
	  top: 95rpx;
	  width: 100rpx;
	  height: 100rpx;
	  margin-left: -50rpx;
	}
	
	.pinrow-wrap .spu-play .img {
	  width: 100%;
	  height: 100%;
	}
	
	.pinrow-wrap .mask {
	  background: rgba(255, 255, 255, 0.5);
	  width: 300rpx;
	  height: 240rpx;
	  position: absolute;
	  left: 25rpx;
	  top: 30rpx;
	}
	
	.pinrow-wrap .act-end {
	  position: absolute;
	  height: 60rpx;
	  border-radius: 10rpx;
	  background: rgba(0, 0, 0, 0.5);
	  color: #fff;
	  font-size: 28rpx;
	  text-align: center;
	  line-height: 60rpx;
	  left: 130rpx;
	  top: 120rpx;
	  padding: 0 12rpx;
	  margin-left: -45rpx;
	}
	
	.pin-more {
	  text-align: center;
	  padding-bottom: 20rpx;
	  font-size: 24rpx;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	}

/* 抢购 */
.rush-list-title {
	  width: 336rpx;
	  height: 88rpx;
	  display: block;
	  margin: 0 auto 20rpx;
}

.search-bar {
  padding: 12rpx 25rpx;
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.search-box {
  background-color: #f0f0f0;
  height: 56rpx;
  line-height: 56rpx;
  border-radius: 28rpx;
  color: #acacac;
  display: flex;
  align-content: center;
  flex: 1;
}

.search-btn {
  padding-left: 20rpx;
  background: transparent;
  line-height: 1;
  font-size: 28rpx;
  padding-right: 5rpx;
  width: 95rpx;
}

button.search-btn::after {
  content: none;
}
.search-icon {
  position: absolute;
  left: 20rpx;
  margin-left: 25rpx;
  margin-right: 12rpx;
}

.search-icon .iconfont {
  font-size: 34rpx;
  padding-top: 10rpx;
}
.search-box .ipt {
  padding: 0 30rpx 0 60rpx;
  line-height: 56rpx;
  height: 56rpx;
  width: 100%;
  box-sizing: border-box;
}

/* tab-switch */
.sticky-content {
  background: #fff;
  padding-bottom: 14rpx;
  position: sticky;
  position: -webkit-sticky;
  z-index: 99;
  top: -80rpx;
  transition: top 0.3s;
}

.sticky-content.tab-nav-sticky {
  top: 0;
}

.sticky-content .tab-nav {
  height: 70rpx;
  display: flex;
  margin: 0 30rpx;
  border-bottom: 4rpx solid #fc4443;
  transition: all 0.3s linear;
}

.sticky-content .tab-nav .count-down-content {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #444;
}

.sticky-content .tab-nav .count-down-content em {
  font-size: 26rpx;
}

.sticky-content .tab-nav .count-down-content .count-down-left-text {
  font-size: 26rpx;
}

.sticky-content .tab-nav .count-down-content .count-down {
  height: 68rpx;
  line-height: 68rpx;
  color: #444;
  font-size: 26rpx;
  display: flex;
  align-items: center;
  flex: 1;
}

.sticky-content .tab-nav .count-down-content .count-down .item-time {
  width: 34rpx;
  height: 32rpx;
  line-height: 32rpx;
  color: #fff;
  text-align: center;
  background: #444;
  border-radius: 4rpx;
  padding: 0 2rpx;
}

.sticky-content .tab-nav .tab-nav-item{
  color: #6c6c6c;
  font-size: 26rpx;
  font-weight: bold;
  position: relative;
  z-index: 1;
  width: 190rpx;
  height: 70rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sticky-content .tab-nav .active{
	color: #fff;
}
.sticky-content .tab-nav .tab-nav-item image {
  width: 190rpx;
  height: 70rpx;
  position: absolute;
  left: 0;
  top: 0;
}


/* 抢购商品列表信息 */
.rush-list-box {
	position: relative;
	min-height: 1300rpx;
	margin-top: 20rpx;
}
.theme3 {
	display: flex;
	flex-wrap: wrap;
	margin: 20rpx;
	border-radius: 10rpx;
	overflow: hidden;
	background-color: #fff;
}
.rushItem{
	position: relative;
	width: 215rpx;
	box-sizing: border-box;
	padding: 67rpx 20rpx;
	font-size: 28rpx;
}
.rushItem .new-img {
	width: 200rpx;
	height: 170rpx;
	margin-bottom: 20rpx;
	overflow: hidden;
}
.rushItem .title{
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.rushItem .new-bot {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 10rpx;

}
.price {
	color: #ff5041;
}
.cart{
	position: absolute;
	z-index: 10;
	width: 35rpx;
	height: 35rpx;
	padding: 10rpx;
	margin: 0;
	right: 10rpx;
	top: 356rpx;
	background: linear-gradient(0deg, #a22028 0%, #b85369 100%);;
	border-radius: 50%;
	text-align: center;
	line-height: 50rpx;
}

/* 登录提示蒙层 */
.mask{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.7);
	z-index: 900;
	transition: all 0.2s ease-in-out;
	display:flex;
	justify-content: center;
	align-items: center;
}
.mask .auth-content {
	width: 520rpx;
	min-height: 580rpx;
	max-height: 660rpx;
	background: #fff;
	border-radius: 24rpx;
	position: relative;
	display: flex;
}
.auth-content .bg {
	width: 520rpx;

}
.auth-content .btn {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 30rpx;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	font-size: 28rpx;
}
.auth-content .btn .close-btn {
	color: #f45b56;
	border: 1rpx solid #f45b56;
	border-radius: 36rpx;
	margin: 0 15rpx;
	padding: 0 15px;
	height: 64rpx;
	line-height: 64rpx;
}
.auth-content .btn .login-btn{
	border-radius: 36rpx;
	margin: 0 15rpx;
	padding: 0 15px;
	height: 64rpx;
	line-height: 64rpx;
	background-color: #ff5100;
	color: #fff;
}
/* 分享 */
.share{
	position: fixed;
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	z-index: 900;
	bottom: 400rpx;
	right: 50rpx;
	background-color: rgba(0, 0, 0, .7);
	color: #fff;
	font-size: 28rpx;
	text-align: center;
	padding: 10rpx;
}
.top{
	bottom: 250rpx;
}
.share .share-img{
	width: 50rpx;
	height: 50rpx;
}
.slogan {
	height: 120rpx;
	padding-bottom: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.slogan image {
	width: 250rpx;
	height: 56rpx;
}
.tabs {
	position: relative;
	padding-right: 10rpx;

}
.tabs__nav:first-child {
	margin-left: 30rpx;
}
.tabs__nav {
	position: relative;
	padding-bottom: 16rpx;
	margin-right: 50rpx;
	font-size: 28rpx;
	font-weight: bold;
	line-height: 44rpx;
	flex-shrink: 0;
	transition: all 0.6s ease;
	color: #666;
	padding-top: 10rpx;
}

.tabs__navs__wrap {
	position: relative;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
}

.activeIndicator {
	width: 56rpx;
	height: 6rpx;
	position: absolute;
	bottom: 0;
	left: 28rpx;
	border-radius: 24rpx;
	background: linear-gradient(to right, #fe655c, #fa875b);
	box-shadow: 0rpx 4rpx 4rpx 0rpx rgba(255, 89, 0, 0.25);
	transition: all 1s ease-in-out;

}

/* 即将开抢 */
.none-rush-list {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-bottom: 140rpx;
	padding-top: 140rpx;

}
.none-rush-list .img-block {
	width: 240rpx;
	height: 240rpx;
	margin-bottom: 30rpx;

}
.none-rush-list .h1 {
	font-size: 32rpx;
	line-height: 32rpx;
	color: #444;
	margin-bottom: 20rpx;
}
.none-rush-list .h2 {
	font-size: 24rpx;
	line-height: 24rpx;
	color: #aaa;
}

</style>

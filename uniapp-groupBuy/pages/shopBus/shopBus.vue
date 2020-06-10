<template>
	<view class="pb100">
		<!-- 未登录 -->
		<view class="empty pos-a" v-show="logined">
				<image src="../../static/icon-index-empty.png"></image>
				<view class="h1">
					点击
					<text style="color:#a22028">“去登录”</text>
					查看购物车商品
					</view>
				<view class="tobtn" style="background: #a22028" @click="isLogin">去登录</view>
		</view>
		<view class="empty emptyBus" v-show="emptyBus">
			<image src="../../static/icon-index-empty.png"></image>
			<view class="h1">购物车空空如也，赶紧去逛逛吧~</view>
			<view @click="toSopping" class="btn" style="background:#a22028">去购物</view>
		</view>
		<!-- 大家常买 -->
		<view class="everybody-shop">
			<view class="title" style="font-size: 32rpx;text-align: center;">
				— 大家常买 —
			</view>
			<view class="goods-list">
				<view class="good-one" 
					v-for="(item,index) in goodsList"
					:key="index">
					<view class="good-img" @click="toGoodsDetails(item.actId)">
						<image class="img" :src="item.skuImage" mode=""></image>
					</view>
					<view class="spu-title">
						<text class="span">{{item.spuName}}</text>
					</view>
					<view class="spu-price">
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
					</view>
					<image class="cart" src="../../static/cart.png" @click="addBusCar"></image>
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
	</view>
</template>

<script>
	import util from '../../utils/util.js'
	export default {
		data() {
			return {
				logined: true,  //默认未登录
				emptyBus: false,
				maskShow: false,
				pageNum: 1,
				classificationId: null,
				goodsList: null
			}
		},
		onLoad() {
			let that = this;
			//检查有没有登录过
			uni.getStorage({
				key:"isLogin",
				success: (res) => {
					if(res.data == true){
						that.logined = false;
						that.emptyBus = true;
						that.getEveryBodShop();
					}
				}
			});
		},
		methods: {
			isLogin: function(){
				this.maskShow = true;
			},
			noLogin: function(){
				this.maskShow = false;
			},
			toLogin: function(){
				this.maskShow = false;
				uni.navigateTo({
					url:'../login/login'
				})
			},
			// 获取大家常买商品列表
			getEveryBodShop: function(){
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
					  console.log(res)
					that.goodsList = res.data.list;
					},
					fail: (err) => {
						console.log(err)
					}
					})
			},
			toGoodsDetails: function(id){
				//携带商品actId
				let url = "../goodsDetail/goodsDetail?id=" + id;
				wx.navigateTo({
					url 
					})
			},
			//去购物
			toSopping: function(){
				uni.reLaunch({
					url:'../index/index'
				})
			},
			addBusCar: function(){
				
			}
		}
	}
</script>

<style>
.pb100 {
	padding-bottom: 140rpx;
	
	}
.empty.pos-a {
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	padding: 0;
	}
.empty {
	background: #fff;
	margin-bottom: 50rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	}
.empty image{
		width: 218rpx;
		height: 218rpx;
		margin-bottom: 30rpx;
	}
.h1{
		color: #666;
		font-size: 30rpx;
		line-height: 30rpx;
		margin-bottom: 60rpx;
	}
.tobtn{
	width: 310rpx;
	height: 96rpx;
	border-radius: 20rpx;
	background: linear-gradient(to right, #ff5041, #ff695c);
	line-height: 96rpx;
	text-align: center;
	color: #fff;
	font-size: 30rpx;
	font-weight: bold;
	}
.emptyBus{
	width: 100%;
	height: auto;
	padding-top: 50rpx;
}
.emptyBus .btn{
	width: 310rpx;
	height: 96rpx;
	border-radius: 20rpx;
	background: linear-gradient(to right, #ff5041, #ff695c);
	line-height: 96rpx;
	text-align: center;
	color: #fff;
	font-size: 30rpx;
	font-weight: bold;
}
/* 大家常买样式 */
.everybody-shop{
	width: 100%;
	background-color: #eee;
	margin-top: 20rpx;
	
	}
.everybody-shop .goods-list{
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding: 15rpx;
	}
.everybody-shop .good-one{
	width: 350rpx;
	height: 506rpx;
	border-radius: 20rpx;
	background: #fff;
	margin-top: 20rpx;
	box-sizing: border-box;
	padding: 30rpx 25rpx;
	box-shadow: 0 0 40rpx rgba(0, 0, 0, 0.05);
	position: relative;

}
.good-img{
	width: 100%;
	height: 280rpx;
}
.good-img .img{
	width: 100%;
	height: 100%;
	border-radius: 20rpx;
}
.spu-title {
	font-size: 28rpx;
	line-height: 36rpx;
	height: 36rpx;
	color: #444;
	margin-bottom: 16rpx;
	font-weight: 500;
	position: relative;
	margin-top: 16rpx;

}
.spu-title .span {
	display: block;
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

}
.spu-price {
	display: flex;
	align-items: flex-end;
	font-size: 20rpx;
	margin-bottom: 22rpx;
}
.sale-price {
	color: #ff5344;
	margin-right: 8rpx;
}
.spu-price .sale-price .span {
	font-size: 40rpx;
	line-height: 40rpx;
	margin-left: 4rpx;
	font-weight: 500;
}
.spu-price .market-price {
	text-decoration: line-through;
	color: #999;
}
.price {
	color: #ff5041;
}
.good-one .pin-tag {
	display: inline-block;
	font-size: 20rpx;
	padding: 4rpx 6rpx;
	margin-right: 10rpx;
	border: 0.1rpx solid #ff5344;
	line-height: 1;
	vertical-align: middle;
	color: #ff5344;
	border-radius: 4rpx;
}
.good-one .cart{
	position: absolute;
	width: 35rpx;
	height: 35rpx;
	padding: 10rpx;
	margin: 0;
	right: 10rpx;
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
</style>

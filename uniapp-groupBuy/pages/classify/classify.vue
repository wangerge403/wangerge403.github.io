<template>
	<view class='page-wrap'>
	  <!--搜索框-->
	  <form bindsubmit="goResult" style="display: block;width: 100%;">
	    <view class='search-bar'>
	      <view class='search-box'>
	        <input class='ipt' placeholder="搜索商品" confirm-type="搜索" type="text" name="keyword"></input>
	        <view class='search-icon'>
	          <text class="iconfont icon-sousuo1"></text>
	        </view>
	      </view>
	      <button class="search-btn" formType="submit" style="color:#a22028">搜索</button>
	    </view>
	  </form>
	 <!-- <view class="" 
	  v-for="(item,index) in leftList"
	  :key="index">
	  	{{item.name}}
	  </view> -->
	   <view class="page-content" >
		   <!-- 左侧导航栏 -->
	      <scroll-view scrollWithAnimation scrollY class="page-category">
	        <view @click="changeCategory(index)" 
			class="category-item"
			:class="idx == index?'active': ''"
			v-for="(item,index) in leftList"
			:key="index">
	          <view class="item-border" style="background: #a22028"></view>
	          <view>{{item.name}}</view>
	        </view>
	        <view class="category-item"></view>
	      </scroll-view>
		  <scroll-view scroll-y="true" class="page-list" upper-threshold=50>
			<!-- <view class="scroll-col-tip-top">
				<span v-if="isFirstCategory">已经拉到最顶部啦～</span>
				<block >
				  <span else>下拉查看上一个分类</span>
				</block>
			</view>  -->
	<!-- 	  	<view class="scroll-col-tip-bottom" wx:elif="{{canNext}}">
		  	    <span wx:if="{{isLastCategory}}">看到我的底线了吗～</span>
		  	    <block wx:else>
		  	    <span>上拉查看下一个分类</span>
		  	    </block>
		  	</view> -->
			<view class="spu-content" style="position: relative;">
				<view class="i-router-class item--spu-content" @click="toGoodsDetails(item.actId)"
				v-for="(item,index) in typeGoodsList"
				:key="index">
					<view class="item-left">
							<image class="goods-img" :src="item.skuImage" mode=""></image>
					</view>
					<view class="item-right">
						<view class="item-right-top">
							<view class="spu-title">
								<text class="span">{{item.spuName}}</text>
							</view>
							<view class="spu-desc">
								<text class="em">{{item.spuDescribe}}</text>
							</view>
						</view>
						<view class="spu-price">
							<view class="sale-price">
								<text class="span">￥{{item.actPrice[0]}}</text><text>.{{item.actPrice[1]}}</text>
							</view>
							<view class="market-price">{{item.marketPrice[0]}}.{{item.marketPrice[1]}}</view>
						</view>
					</view>
				</view>
				<image class="cart" @click="addBusCar" src="../../static/cart.png">
			</view>
		  </scroll-view>
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
				leftList: [],
				idx: 0,
				isFirstCategory: true,
				isLogin: false,
				maskShow: false,
				pageNum: 1,
				rushCategoryId: 7,
				typeGoodsList: null
			}
		},
		onLoad() {
			this.get_cate_list();
			let id = this.rushCategoryId;
			this.getTypeGoods(id);  //默认加载第一页
		},
		methods: {
			get_cate_list: function() {
				let that = this;
				util.request({
					'url': 'entry/wxapp/index',
					'data': {
						controller: 'goods.get_category_list',
						is_type_show: 1
					},
					dataType: 'json',
					success: function(res) {
						that.leftList = res.data.data;
					  },
					fail: function(err){
						console.log(err)
					}
					})
				},
			// 请求每一类的商品
			getTypeGoods: function(id){
				let that = this;
				let token = wx.getStorageSync('token');
				let cur_community = wx.getStorageSync('community');
				let rushCategoryId = id;
				util.request({
					url: 'entry/wxapp/index',
					data: {
					  controller: 'index.load_gps_goodslist_new',
					  token,
					  pageNum: that.pageNum,
					  head_id: cur_community.communityId,
					  gid: rushCategoryId,
					  per_page: 30
					},
					dataType: 'json',
					success: function(res) {
						that.typeGoodsList = res.data.list;
					  },
					fail:function(err){
						console.log(err)
					}
					})
			},
			changeCategory: function(index) {
				this.idx = index;
				//展示相应类别商品
				this.rushCategoryId = 7 - index;
				if(index == 4){
					this.rushCategoryId = 2;
				}
				let id = this.rushCategoryId;
				this.getTypeGoods(id);
			},
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
			toGoodsDetails: function(id){
				//携带商品actId
				let url = "../goodsDetail/goodsDetail?id=" + id;
				wx.navigateTo({
					url 
					})
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
			}
		}
	}
</script>

<style>
.page-wrap {

}

/* 搜索 */

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
  padding-right: 0;
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

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}

/* 列表 */

.page-content {
  position: relative;
  width: 750rpx;
  flex-shrink: 0;
  flex-grow: 1;
}

.page-category {
  position: absolute;
  top: 0;
  left: 0;
  width: 160rpx;
  height: 1000rpx;
  background: #f8f8f7;
  padding-bottom: 100rpx;
}

.category-item {
  position: relative;
  width: 160rpx;
  height: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  color: #787878;
  line-height: 30rpx;
}

.category-item view {
  max-width: 136rpx;
  text-align: center;
}

.category-item .item-border {
  position: absolute;
  top: 36rpx;
  left: 0;
  display: none;
  width: 8rpx;
  height: 28rpx;
  background: linear-gradient(#ff7955, #ff4242);
}

.category-item.active {
  background: #fff;
  font-weight: 500;
  color: #333;
}

.category-item.active .item-border {
  display: block;
}

.page-list {
  position: absolute;
  top: 0;
  left: 160rpx;
  width: 590rpx;
  height: 1000rpx;
  padding-top: 10rpx;
  box-sizing: border-box;
}

/* 商品信息样式 */
.item--spu-content{
	position: relative;
	display: flex;
	justify-content: center;
}
.spu-content .cart{
	position: absolute;
	width: 35rpx;
	height: 35rpx;
	padding: 10rpx;
	margin: 0;
	right: 30rpx;
	bottom: 10rpx;
	background: linear-gradient(0deg, #a22028 0%, #b85369 100%);;
	border-radius: 50%;
	text-align: center;
	line-height: 50rpx;
}
.spu-content .item-left {
  width: 170rpx;
  height: 170rpx;
}
.item-left .goods-img{
	width: 100%;
	height: 100%;
	background-color: #eee;
}
.spu-content .item-right {
  flex: 1;
  box-sizing: border-box;
  margin-left: 24rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-right .spu-title {
  color: #222;
  font-size: 30rpx;
  height: 32rpx;
  /* width: 350rpx; */
  margin-bottom: 12rpx;
  margin-top: 10rpx;
  font-weight: 500;
  position: relative;
}

.spu-title .span {
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
.item-right .spu-desc {
	font-size: 26rpx;
	line-height: 26rpx;
	color: #999;
	position: relative;
	width: 350rpx;
	height: 26rpx;
	margin-bottom: 12rpx;
}

.item-right .spu-desc .em {
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

.item-right .spu-price {
  display: flex;
  flex-direction: column;
  /* align-items: flex-end; */
  font-size: 24rpx;
  line-height: 24rpx;
  overflow: hidden;
  margin-top: 10rpx;
}

.item-right .spu-price .sale-price {
  color: #ff5344;
  margin-right: 12rpx;
}
.sale-price .span {
  font-size: 36rpx;
  line-height: 36rpx;
  margin: 0;
  font-weight: bold;
}

.item-right .spu-price .market-price {
  text-decoration: line-through;
  color: #999;
  margin-top: 5rpx;
}

/* 登录提示蒙层 */
.page-wrap .mask{
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

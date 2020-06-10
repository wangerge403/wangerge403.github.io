<template>
	<view class="wrap">
		<!-- 导航条 -->
		<view class="bg-f">
			<view class="sticky-content">
				<view class="tabs category-list">
					<scroll-view class="tabs__navs">
						<view class="tabs__navs__wrap">
							<view @click="changeCategory(index)"
							class="tabs__nav"
							:class="idx == index?'active': ''"
							v-for="(item,index) in tabList"
							:key="index">
								{{item.name}}
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<!-- 商品列表 -->
			<view class="swipe">
				<swiper class="swiper-content" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item
					v-for="(item,index) in slider_list"
					:key="index">
						<view class="banner">
							<image :src="item.image" mode=""></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="list twoCol">
			<view class="good-one" @click="toGoodsDetails(item.actId)"
			v-for="(item,index) in goodsList"
			:key="index">
				<view class="good-img">
					<image class="img" :src="item.skuImage" mode=""></image>
				</view>
				<view class="spu-title">
					<text class="span">{{item.spuName}}</text>
				</view>
				<view class="spu-price">
					<view class="sale-price">
						<text class="span">￥{{item.actPrice[0]}}</text>.{{item.actPrice[1]}}
					</view>
					<view class="market-price">¥{{item.danPrice}}</view>
				</view>
				<view class="spu-count">
					<text class="pin-tag" style="color:;border-color:">
					{{item.pin_count}}人团
					</text>
					已拼{{item.soldNum}}件
				</view>
				<view class="add-cart">
					去开团
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
				tabList: null,
				idx: 0,
				slider_list: null,
				pageNum:1,
				classificationId: 0,
				goodsList: null
			}
		},
		onLoad() {
			this.getTabs();
			this.getData();
		},
		methods: {
			getTabs: function(){
				let that = this;
				util.request({
				    url: 'entry/wxapp/index',
					data: {
					  controller: 'group.pintuan_slides'
					},
				    dataType: 'json',
				  success: function (res) {
					// let {category_list} = res;
					that.slider_list = res.data.slider_list;
					res.data.category_list.push({name: "推荐", id: 0})
					that.tabList = res.data.category_list;
				  }
				})
			},
			changeCategory: function(index) {
				this.idx = index;
				//展示相应类别商品
			},
			// 获取商品列表
			getData: function(){
				let that = this;
				let token = wx.getStorageSync('token');
				let gid = that.classificationId;
				let community = wx.getStorageSync('community');
				let head_id = community.communityId || 0;
				
				util.request({
				  url: 'entry/wxapp/index',
				  data: {
					controller: 'group.get_pintuan_list',
					pageNum: that.pageNum,
					gid,
					token,
					head_id
				  },
				  dataType: 'json',
				  success: function (res) {
					that.goodsList = res.data.list;
					uni.hideLoading();
					uni.stopPullDownRefresh();
				  }
				})
			},
			toGoodsDetails: function(id){
				//携带商品actId
				let url = "../goodsDetail/goodsDetail?id=" + id;
				wx.navigateTo({
					url 
					})
			}
		}
	}
</script>

<style>
.wrap {
	width: 100%;
	height: auto;
	padding-bottom: 100rpx;

}
.bgc-f{
	position: relative;
}
.sticky-content{
	position: fixed;
	left: 0;
	right: 0;
	z-index: 100;
	background-color: #fff;
}

.tabs__navs__wrap {
	position: relative;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
}
.active {
	font-weight: bold;
	font-size: 30rpx;
	color: #0086B3;
}
.tabs__nav:first-child{
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
.swipe {
	position: absolute;
	margin-top: 100rpx;
	height: 320rpx;
}
.swiper-content {
	width: 750rpx;
	height: 320rpx;
	border-radius: 12rpx;

}
.swiper-content .banner {
	width: 710rpx;
	height: 320rpx;
	margin: 0 20rpx;
	display: block;
	border-radius: 12rpx;
	position: relative;
	overflow: hidden;

}
.swiper-content .banner image{
	width: 710rpx;
	height: 320rpx;
}
/* 商品信息区域 */
.list{
	position: relative;
	padding: 0 20rpx;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	background-color: #ddd;
	top: 420rpx;
	padding: 20rpx;
}
.list .good-one{
	width: 350rpx;
	height: 506rpx;
	border-radius: 20rpx;
	background: #fff;
	box-sizing: border-box;
	padding: 30rpx 25rpx;
	box-shadow: 0 0 40rpx rgba(0, 0, 0, 0.05);
	position: relative;
	margin-bottom: 10rpx;

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
.spu-count {
	display: flex;
	align-items: flex-end;
	font-size: 20rpx;
	color: #999;
	margin-top: 10rpx;

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
.add-cart{
	width: 100rpx;
	height: 50rpx;
	padding: 0;
	margin: 0;
	position: absolute;
	right: 20rpx;
	bottom: 25rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(90deg, #a22028 0%, #ff0041 100%);
	color: #fff;
	border-radius: 25rpx;
	font-size: 24rpx;
	font-weight: bold;
}



</style>

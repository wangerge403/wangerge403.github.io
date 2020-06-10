<template>
	<view>
		<navigator class="list-item" url="">
			<text class="span">体现规则</text>
			<image class="icon-right right-arrow" src="../../static/rightArrowImg.png" mode=""></image>
		</navigator>
		<navigator class="list-item" url="">
			<text class="span">团购赚佣教程</text>
			<image class="icon-right right-arrow" src="../../static/rightArrowImg.png" mode=""></image>
		</navigator>
		<navigator class="list-item" url="">
			<text class="span">分销收益教程</text>
			<image class="icon-right right-arrow" src="../../static/rightArrowImg.png" mode=""></image>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.list-item {
	height: 100rpx;
	background: #fff;
	border-bottom: 0.1rpx solid #e4e4e4;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 20rpx;

}
.list-item .span {
	font-size: 28rpx;
}
.list-item .icon-right {
	width: 12rpx;
	height: 22rpx;
}


</style>

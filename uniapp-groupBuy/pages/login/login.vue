<template>
	<view class="index">
		<view class="login-wrap">
			<view class="title" style="text-align: center;margin-top: 50rpx;font-size: 48rpx;">
				—— 登录 ——
			</view>
			<view class="phone inp">
				<text class="text">手机号:</text><input class="input phone-input" type="text" value="" v-model="phoneNumer" placeholder="请输入手机号码" @blur="judgePhoneNumber"/>
			</view>
			<view class="veri inp">
				<text class="text">验证码:</text><input class="input" type="text" value="" v-model="veriNumber" placeholder="验证码"/>
				<view class="send" @click="getVeriCode" v-show="btnShow">{{text}}</view>
				<view class="count-down" v-show="cdShow">
					重新发送 ({{num}}s)
					</view>
			</view>
			<view class="btn">
				<button class="login-btn" @click="toLogin">登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	import util from '../../utils/util.js'
	export default {
		data() {
			return {
				phoneNumer: null,
				veriNumber: null,
				btnShow: true,
				cdShow: false,
				text: "发送",
				num: 60
			}
		},
		onLoad() {
		},
		methods: {
			//校验手机号码
			checkPhoneNumber: function(){
			
				},
			
			// rand: function(min,max) {
			//         return Math.floor(Math.random()*(max-min))+min;
			//     },
			getVeriCode: function(){
				//获取验证码
				let that = this;
				let phone = this.phoneNumer;
				let reg = /^1\d{10}$/;
				if(phone == '' || phone == undefined){
					uni.showToast({
						title: "请输入手机号码！",
						icon: "none",
						duration: 1000
					})
				}
				else if(reg.test(phone)){
					util.request({
					  url: 'entry/wxapp/index',
					  data: {
							controller: 'user.send_sms',
							phone
					  },
					  dataType: 'json',
					  success: function (res) {  
						if(res.data.msg == "短信发送成功"){
							that.btnShow = false;
							that.cdShow = true;
							//倒计时开始
							that.countDown();
						}
						},
						fail: (err) => {
							console.log(err)
						}
						})
				}else{
					uni.showToast({
						title: "请正确输入手机号码",
						icon: "none",
						duration: 1000
					})
					}
			},
			//倒计时
			countDown: function(){
				let that = this;
				setInterval(() => {
					that.num = that.num - 1;
					if(that.num == 0){
						that.cdShow = false;
						that.btnShow = true;
						that.text = "重新发送";
					}
				}, 1000)
			},
			toLogin: function(){
				let that = this;
				let phone = this.phoneNumer;
				let code = that.veriNumber;
				let reg = /^1\d{10}$/;  //校验手机号
				let re = /^\d{4}$/;  //校验验证码
				if(reg.test(phone) && re.test(code)){
					util.request({
					  url: 'entry/wxapp/index',
					  data: {
							controller: 'user.verify_phone',
							phone,
							code
					  },
					  dataType: 'json',
					  success: function (res) {  
						  console.log(res.data.msg)
						if(res.data.msg == "该验证码已超过有效时间"){
							uni.showToast({
								title:"该验证码已超过有效时间",
								icon:"none",
								duration: 1500
							})
						}
						else if(res.data.msg == "没有该手机号"){
							uni.showToast({
								title:"没有该手机号",
								icon:"none",
								duration: 1000
							})
						}else if(res.data.msg == "验证成功"){
							uni.showToast({
								title:"登录成功",
								icon:"none",
								duration: 1000
							});
							//保存登录状态
							uni.setStorage({
								key: "isLogin",
								data: true,
								success: () => {
									uni.navigateBack({
										delta: 1,
										animationType:"pop-out",
										animationDuration: 200
									})
								}
							});
						}
						},
						fail: (err) => {
							console.log(err)
						}
						})
				}else if(phone == undefined || code == undefined){
					uni.showToast({
						title:"手机号或验证码不能为空",
						icon:"none",
						duration: 1000
					})
				}else{
					uni.showToast({
						title:"手机号或验证码错误",
						icon:"none",
						duration: 1000
					})
				}
				
			}
		}
	}
</script>

<style>
	.index{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
	}
	.login-wrap{
		position: relative;
		top: 50rpx;
		width: 80%;
		height: 60%;
		box-shadow: 0 0 30rpx #666;
		border-radius: 35rpx;
	}
	.phone{
		margin-top: 100rpx;
	}
	.inp{
		display: flex;
		justify-content: left;
		margin-bottom: 50rpx;
		padding-left: 30rpx;
	}
	.input{
		border-bottom: 1px solid #000;
		width: 200rpx;
		height: 70rpx;
		padding-left: 10rpx;
		margin-left: 10rpx;
	}
	.text{
		line-height: 70rpx;
	}
	.phone-input{
		width: 382rpx;
	}
	.send{
		width: 160rpx;
		height: 65rpx;
		border: 1px solid #ff5100;
		color: #ff5100;
		text-align: center;
		border-radius: 10rpx;
		margin-left: 20rpx;
		line-height: 65rpx;
		padding: 0 10rpx;
	}
	.count-down{
		width: 160rpx;
		color: #666;
		font-size: 24rpx;
		text-align: center;
		margin-left: 20rpx;
		line-height: 65rpx;
	}
	.login-btn{
		width: 280rpx;
		height: 90rpx;
		line-height: 90rpx;
		background-color: #ff5100;
		color: #fff;
		position: relative;
		top: 80rpx;
	}
	.login-btn:active{
		background-color: #ff6e07;
	}
</style>

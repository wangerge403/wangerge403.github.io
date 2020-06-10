<template>
	<view class="article">
	  <view class="wxParse">
		<!-- <parser html="{{article}}" /> -->
		<view class="" v-html="article">
			
		</view>
	  </view>
	</view>
</template>

<script>
	import util from '../../utils/util.js'
	export default {
		data() {
			return {
				article: null
			}
		},
		onLoad(options) {
			let type = options.type || "";
			// let type = "pintuan";
			if (!type) {
			      wx.showModal({
			        title: '提示',
			        content: '参数错误',
			        showCancel: false,
			        confirmColor: '#F75451',
			        success(res) {
			          if (res.confirm) {
			            // wx.navigateBack()
			          }
			        }
			      })
			      return false;
			    }
			 let navTitle = {
			      vipcard: '权益规则',
			      pintuan: '拼团规则',
			      signin: '活动规则',
			      solitaire: '接龙规则'
			    }
				// 设置导航栏标题
			    uni.setNavigationBarTitle({
			      title: navTitle[type] || '规则'
			    })
			    uni.showLoading();
			    this.getData(type);
		},
		methods: {
			getData: function(type){
				uni.showLoading();
				let urls = {
				      vipcard: 'vipcard.get_vipcard_baseinfo',
				      pintuan: 'group.pintuan_slides',
				      signin: 'signinreward.get_signinreward_baseinfo',
				      solitaire: 'solitaire.get_rule'
				    }
				let token = wx.getStorageSync('token');
				let that = this;
				util.request({
				    url: 'entry/wxapp/user',
				    data: {
				        controller: urls[type],
				        token: token
				    },
				    dataType: 'json',
				    success: function (res) {
				        console.log(res)
				        wx.hideLoading();
						if (res.data.code == 0) {
						  if (type == 'vipcard') {
							let { vipcard_buy_pagenotice } = res.data.data;
							that.article = vipcard_buy_pagenotice;
						  } else if (type == 'pintuan') {
							let { pintuan_publish } = res.data;
							that.article = pintuan_publish;
						  } else if (type == 'signin') {
							let { signinreward_pagenotice } = res.data.data;
							that.article = signinreward_pagenotice;
						  } else if (type == 'solitaire') {
							let { solitaire_notice } = res.data;
							that.article = solitaire_notice;
						  }
							}
						},
					fail: function(err){
						console.log(err)
						}
					})

			}
		}
	}
</script>

<style>
.article {
  background: #fff;
  padding: 20rpx 30rpx;
  font-size: 28rpx;
}
</style>

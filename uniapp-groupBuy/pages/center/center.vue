<template>
	<view class="pb100">
		<view class="personal">
			<view class="basicInform">
				<image class="back-img" src="../../static/TOP_background@2x.png" role="img"></image>
			<view class="personalCon">
				<view class="userInfo">
					<view @click="loginIng" class="userInfo" style="color:">
					<image class="userAvatarUrl" src="../../static/head-bitmap.png" role="img"></image>
					<view class="user-name">点击登录账户</view>
					</view>
					<view class="fetch-coder signIn" @click="loginIng">
						<text ></text>
						<image class="iconfont icon-qiandao" src="../../static/qiandao.png" mode=""></image>
						<view class="fetch-coder-text">积分签到</view>
					  </view>
				    <view class="fetch-coder" @click="loginIng">
						<text class="iconfont icon-erweima1">123</text>
						<view class="fetch-coder-text">提货码</view>
					</view>
				</view>
			</view>
			</view>
			<!-- 我的订单 -->
			 <view class="order">
			      <view class="my-order">
			        <view class="my-order-title">
			          <text>我的订单</text>
			        </view>
			        <view class="to-order" @click="loginIng">
			          <text>查看全部订单</text>
			        </view>
			        <view class="order-right">
			          <image class="icon-right" src="../../static/rightArrowImg.png"></image>
			        </view>
			      </view>
			      <view class="orderTab">
			        <view class="order_status" @click="loginIng">
			          <text class="num" style="background:#a22028"></text>
			          <image class="icon-img" src="../../static/needPayIcon.png"></image>
			          <text style="color: #444;">待付款</text>
			        </view>
			        <view class="order_status" @click="loginIng">
			          <text class="num" style="background:#a22028"></text>
			          <image class="icon-img" src="../../static/undeli.png"></image>
			          <text style="color: #444;">待配送</text>
			        </view>
			        <view class="order_status" @click="loginIng">
			          <text class="num" style="background:#a22028"></text>
			          <image class="icon-img" src="../../static/distributionIcon.png"></image>
			          <text style="color: #444;">待提货</text>
			        </view>
			        <view class="order_status" @click="loginIng">
			          <!-- <text class="num" wx:if="{{member_info.has_get_count!=0}}">{{member_info.has_get_count}}</text> -->
			          <image class="icon-img" src="../../static/completeIcon.png"></image>
			          <text style="color: #444;">已提货</text>
			        </view>
			        <view class="order_status" @click="loginIng">
			          <image class="icon-img" src="../../static/refundIcon.png"></image>
			          <text style="color: #444;">售后服务</text>
			        </view>
			      </view>
			    </view>
			<!-- 我的拼团---收益 -->
			<view class="tool distribution">
				<view>
				<view class="item-main" @click="loginIng">
				  <view class="item-title">
					  <text>我的拼团</text>
					  </view>
				  <view class="tool-right">
					  <image class="icon-right" src="../../static/rightArrowImg.png"></image>
					  </view>
				</view>
			   </view>
				<view>
					<view class="item-main" @click="loginIng">
					  <view class="item-title">
						  <text>拼团收益</text>
						  </view>
					  <view class="tool-right">
						 <image class="icon-right" src="../../static/rightArrowImg.png"></image>
					  </view>
					</view>
				</view>
			</view>
			<!-- 余额--积分--优惠券 -->
			 <view class="tool">
			      <view class="toolList">
			        <view class="yuenav">
			          <view class="item-main" @click="loginIng">
			            <view class="item-title">
			              <image class="toolIcon" src="../../static/wallet.png"></image>
			              <text>余额</text>
			            </view>
			            <view class="tool-right">
			              <text style='margin-right:10rpx;font-size: 20rpx;'>查看</text>
			              <image class="icon-right " src="../../static/rightArrowImg.png"></image>
			            </view>
			          </view>
			        </view>
			        <!-- <view >
			          <view class="item-main">
			            <view class="item-title">
			              <image class="toolIcon" src="../../static/soli.png"></image>
			              <text>我的接龙</text>
			            </view>
			            <view class="tool-right">
			              <image class="icon-right " src="../../static/rightArrowImg.png"></image>
			            </view>
			          </view>
			        </view> -->
			        <!-- <block wx:if="{{is_show_score==1}}">
			          <view class="score" bindtap="goLink2" data-link="/lionfish_comshop/moduleA/score/signin" wx:if="{{isopen_signinreward==1}}">
			            <view class="item-main">
			              <view class="item-title">
			                <image class="toolIcon" mode="widthFix" src="{{user_tool_icons.i2?user_tool_icons.i2:'../../static/icon-score.png'}}"></image>
			                <text>积分</text>
			              </view>
			              <view class="tool-right">
			                <text style='margin-right:10rpx;'>立即签到</text>
			                <image class="icon-right " src="../../static/rightArrowImg.png"></image>
			              </view>
			            </view>
			          </view> -->
			          <view class="score">
			            <view class="item-main" @click="loginIng">
			              <view class="item-title">
			                <image class="toolIcon" src="../../static/icon-score.png"></image>
			                <text>积分</text>
			              </view>
			              <view class="tool-right">
							  <text style='margin-right:10rpx;font-size: 20rpx;'>立即签到</text>
			                <image class="icon-right " src="../../static/rightArrowImg.png"></image>
			              </view>
			            </view>
			          </view>
			        <!-- </block> -->
			        <view>
			          <view class="item-main" @click="loginIng">
			            <view class="item-title">
			              <image class="toolIcon" src="../../static/coupon.png"></image>
			              <text>优惠券</text>
			            </view>
			            <view class="tool-right">
			              <image class="icon-right " src="../../static/rightArrowImg.png"></image>
			            </view>
			          </view>
			        </view>
			       <!-- <navigator hoverClass="none" url="/lionfish_comshop/moduleA/groupCenter/communityMembers" wx:if="{{member_info.pickup_id>0}}">
			          <view class="item-main">
			            <view class="item-title">
			              <image class="toolIcon" mode="widthFix" src="{{user_tool_icons.i4?user_tool_icons.i4:'../../static/groupCenterIcon.png'}}"></image>
			              <text>核销管理</text>
			            </view>
			            <view class="tool-right">
			              <image class="icon-right " src="../../static/rightArrowImg.png"></image>
			            </view>
			          </view>
			        </navigator> -->
			       <!-- <view bindtap="goToGroup" wx:if="{{member_info.is_head==1}}">
			          <view class="item-main">
			            <view class="item-title">
			              <image class="toolIcon" mode="widthFix" src="{{user_tool_icons.i5?user_tool_icons.i5:'../../static/groupCenterIcon.png'}}"></image>
			              <text>{{groupInfo.owner_name}}中心</text>
			            </view>
			            <view class="tool-right">
			              <image class="icon-right " src="../../static/rightArrowImg.png"></image>
			            </view>
			          </view>
			        </view> -->
			       <!-- <navigator hoverClass="none" url="/lionfish_comshop/moduleA/groupCenter/apply" wx:elif="{{member_info.is_head==2||member_info.is_head==3}}">
			          <view class="item-main">
			            <view class="item-title">
			              <image class="toolIcon" mode="widthFix" src="{{user_tool_icons.i5?user_tool_icons.i5:'../../static/groupCenterIcon.png'}}"></image>
			              <text>{{groupInfo.owner_name}}审核中</text>
			            </view>
			            <view class="tool-right">
			              <image class="icon-right " src="../../static/rightArrowImg.png"></image>
			            </view>
			          </view>
			        </navigator> -->
			       <!-- <block wx:else>
			          <navigator hoverClass="none" url="/lionfish_comshop/moduleA/groupCenter/recruit" wx:if="{{close_community_apply_enter==0}}">
			            <view class="item-main">
			              <view class="item-title">
			                <image class="toolIcon" mode="widthFix" src="{{user_tool_icons.i5?user_tool_icons.i5:'../../static/groupCenterIcon.png'}}"></image>
			                <text>申请成为{{groupInfo.owner_name}}</text>
			              </view>
			              <view class="tool-right">
			                <image class="icon-right " src="../../static/rightArrowImg.png"></image>
			              </view>
			            </view>
			          </navigator>
			        </block> -->
			        <!-- <view wx:if="{{enabled_front_supply==0&&is_supply==2&&is_open_supplymobile==1}}">
			          <view class="item-main" bindtap="goLink2" data-link="/lionfish_comshop/moduleB/supply/index">
			            <view class="item-title">
			              <image aspectFit class="toolIcon supplier" mode="widthFix" src="{{user_tool_icons.i6?user_tool_icons.i6:'../../static/icon-supplier.png'}}"></image>
			              <text>{{supply_diy_name}}</text>
			            </view>
			            <view class="tool-right">
			              <image class="icon-right " src="../../static/rightArrowImg.png"></image>
			            </view>
			          </view>
			        </view> -->
			        <!-- <block wx:elif="{{enabled_front_supply==1}}">
			          <navigator hoverClass="none" url="/lionfish_comshop/pages/supply/recruit" wx:if="{{is_supply==0||needAuth}}">
			            <view class="item-main">
			              <view class="item-title">
			                <image aspectFit class="toolIcon supplier" mode="widthFix" src="{{user_tool_icons.i6?user_tool_icons.i6:'../../static/icon-supplier.png'}}"></image>
			                <text>申请成为{{supply_diy_name}}</text>
			              </view>
			              <view class="tool-right">
			                <image class="icon-right " src="../../static/rightArrowImg.png"></image>
			              </view>
			            </view>
			          </navigator> -->
			    <!--      <view wx:elif="{{is_supply==1}}">
			            <view class="item-main">
			              <view class="item-title">
			                <image aspectFit class="toolIcon supplier" mode="widthFix" src="{{user_tool_icons.i6?user_tool_icons.i6:'../../static/icon-supplier.png'}}"></image>
			                <text>{{supply_diy_name}}审核中</text>
			              </view>
			            </view>
			          </view> -->
			        <!--  <view wx:elif="{{is_supply==2}}">
			            <view class="item-main" wx:if="{{is_open_supplymobile==1}}" bindtap="goLink2" data-link="/lionfish_comshop/moduleB/supply/index">
			              <view class="item-title">
			                <image aspectFit class="toolIcon supplier" mode="widthFix" src="{{user_tool_icons.i6?user_tool_icons.i6:'../../static/icon-supplier.png'}}"></image>
			                <text>{{supply_diy_name}}</text>
			              </view>
			              <view class="tool-right">
			                <image class="icon-right " src="../../static/rightArrowImg.png"></image>
			              </view>
			            </view>
			            <view class="item-main" wx:else>
			              <view class="item-title">
			                <image aspectFit class="toolIcon supplier" mode="widthFix" src="{{user_tool_icons.i6?user_tool_icons.i6:'../../static/icon-supplier.png'}}"></image>
			                <text>您已是{{supply_diy_name}}</text>
			              </view>
			            </view>
			          </view> -->
			        <!-- </block> -->
			        <navigator>
			          <view class="item-main" @click="loginIng">
			            <view class="item-title">
			              <image class="toolIcon" src="../../static/protocolIcon.png"></image>
			              <text>常见帮助</text>
			            </view>
			            <view class="tool-right">
			              <image class="icon-right " src="../../static/rightArrowImg.png"></image>
			            </view>
			          </view>
			        </navigator>
	<!-- 		        <button class="item-fav" openType="contact" sessionFrom="sobot|{{userInfo.nickName}}|{{userInfo.avatarUrl}}" wx:if="{{user_service_switch!=0}}">
			          <view class="item-main">
			            <view class="item-title">
			              <image class="toolIcon" mode="widthFix" src="{{user_tool_icons.i8?user_tool_icons.i8:'../../static/serviceIcon.png'}}"></image>
			              <text>联系客服</text>
			            </view>
			            <view class="tool-right">
			              <image class="icon-right " src="../../static/rightArrowImg.png"></image>
			            </view>
			          </view>
			        </button> -->
			<!--        <navigator hoverClass="none" url="/lionfish_comshop/pages/user/articleProtocol?about=1" wx:if="{{is_show_about_us==1}}">
			          <view class="item-main">
			            <view class="item-title">
			              <image class="toolIcon" mode="widthFix" src="{{user_tool_icons.i9?user_tool_icons.i9:'../../static/aboutUsIcon.png'}}"></image>
			              <text>关于我们</text>
			            </view>
			            <view class="tool-right">
			              <image class="icon-right " src="../../images/rightArrowImg.png"></image>
			            </view>
			          </view>
			        </navigator> -->
					
					<!-- 登录后显示退出登录 -->
			        <!-- <view bindtap="loginOut" wx:if="{{!needAuth&&ishow_user_loginout_btn==1}}">
			          <view class="item-main">
			            <view class="item-title">
			              <image class="toolIcon" mode="widthFix" src="../../images/loginOut.png"></image>
			              <text>退出登录</text>
			            </view>
			            <view class="tool-right">
			              <image class="icon-right " src="../../images/rightArrowImg.png"></image>
			            </view>
			          </view>
			        </view> -->
			      </view>
			    </view>
			<!-- app -->
			<view class="version">
				<text>但莫团购</text>
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
	export default {
		data() {
			return {
				skin:{
					color: "#a22028"
				},
				isLogin: false,
				maskShow: false
			}
		},
		methods: {
			loginIng: function(){
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
					//已经登录，继续执行
				}
			},
			noLogin: function(){
				let that = this;
				this.maskShow = false;
			},
			toLogin: function(){
				uni.navigateTo({
					url:'../login/login'
				})
			}
		}
	}
</script>

<style>
	
page{
		background-color: #EEEEEE;
	}
.pb100 {
	padding-bottom: 100rpx;
	
}
.personal {
	width: 100%;
	position: relative;
	overflow: hidden;
}
.personal .basicInform {
	width: 100%;
	height: 340rpx;
}
.personal .basicInform .back-img {
	width: 100%;
	height: 340rpx;
}
.personal .basicInform .personalCon {
	width: 100%;
	height: 210rpx;
	padding-top: 30rpx;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 3;
}
.personal .basicInform .personalCon .userInfo {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.userInfo .userAvatarUrl {
	border-radius: 50%;
	width: 100rpx;
	height: 100rpx;
	margin-left: 40rpx;
	margin-right: 20rpx;
}
.fetch-coder.signIn {
	right: 112rpx;
}
.fetch-coder {
	position: absolute;
	right: 20rpx;
	text-align: center;
	color: #fff;

}
.fetch-coder .iconfont {
	color: #fff;
	background: rgba(0, 0, 0, 0.1);
	width: 72rpx;
	height: 72rpx;
	text-align: center;
	line-height: 72rpx;
	border-radius: 50%;
	display: inline-block;

}
.fetch-coder-text {
	font-size: 22rpx;
	margin-top: 4rpx;

}

/* 我的订单 */
.personal .order {
	position: relative;
	height: 260rpx;
	width: 710rpx;
	border-radius: 20rpx;
	margin: -160rpx 0 0 20rpx;
	background: #fff;
	z-index: 5;
	box-shadow: 0 0 40rpx rgba(0, 0, 0, 0.1);
}

.personal .order .my-order {
  padding: 22rpx 30rpx;
  display: flex;
  align-items: center;
}

.personal .order .my-order .my-order-title {
  flex: 1;
  font-weight: 500;
  color: #444;
}

.personal .order .my-order .to-order {
  font-size: 24rpx;
  color: #aaa;
  margin-right: 20rpx;
}

.personal .order .orderTab {
  border-top: 0.1rpx solid #efefef;
  padding: 32rpx 42rpx 0;
  background-color: #fff;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.personal .order .orderTab .order_status {
  position: relative;
  color: #58595b;
  font-size: 24rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.personal .order .orderTab .order_status .num {
  width: 28rpx;
  height: 28rpx;
  background: #fff;
  font-size: 20rpx;
  color: #fff;
  border: 2rpx solid #fff;
  background: #ff6557;
  border-radius: 50%;
  position: absolute;
  right: 0;
  top: -10rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.personal .order .orderTab .order_status .icon-img {
  height: 56rpx;
  width: 56rpx;
  margin-bottom: 20rpx;
}

.personal .icon-right {
  width: 12rpx;
  height: 22rpx;
}

.personal .tool {
  width: 710rpx;
  border-radius: 20rpx;
  margin: 20rpx 0 0 20rpx;
  background: #fff;
  box-shadow: 0 0 40rpx rgba(0, 0, 0, 0.1);
}

.personal .tool .border-top-bottom {
  border-top: 1rpx solid #efefef;
  border-bottom: 1rpx solid #efefef;
}

.personal .tool .item-main {
  padding: 32rpx 40rpx;
  border-bottom: 1rpx solid #efefef;
}

.personal .tool .item-main .item-title {
  height: 40rpx;
  width: 400rpx;
  color: #444;
  font-size: 28rpx;
  display: flex;
  align-items: center;
}

.personal .tool .item-main .tool-right {
  float: right;
  display: flex;
  align-items: center;
  margin-top: -30rpx;
}

.personal .tool .item-fav {
  background: #fff;
  margin: 0;
  padding: 0;
  height: 108rpx;
}

.personal .tool button::after {
  border: none;
}

.personal .canvas-content {
  width: 710rpx;
  height: 316rpx;
  border-radius: 20rpx;
  margin: 20rpx 0 0 20rpx;
  background: #fff;
  text-align: center;
  box-shadow: 0 0 40rpx rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  font-family: PingFangSC-Regular;
  font-weight: 400;
}

.personal .canvas-content .left {
  position: relative;
}

.personal .canvas-content .right {
  flex: 1;
}

.personal .canvas-content .icon-sm-logo {
  position: absolute;
  height: 56rpx;
  width: 56rpx;
  top: 122rpx;
  left: 122rpx;
}

.personal .canvas-content .canvas {
  height: 220rpx;
  width: 220rpx;
  margin: 48rpx 0 0 44rpx;
}

.personal .canvas-content .title1 {
  text-align: center;
  margin-top: 158rpx;
  font-size: 28rpx;
  line-height: 28rpx;
  color: #f75451;
  margin-left: -20rpx;
}

.personal .canvas-content .title2 {
  text-align: center;
  margin-top: 20rpx;
  font-size: 24rpx;
  line-height: 24rpx;
  color: #949494;
}

.personal .canvas-content .btn {
  text-align: center;
  box-sizing: border-box;
  border-radius: 26rpx;
  border: 2rpx solid #ff695c;
  padding: 14rpx 0;
  margin: 20rpx auto 0;
  width: 184rpx;
  font-size: 24rpx;
  line-height: 24rpx;
  color: #ff5344;
}

.version {
  width: 100%;
  font-size: 24rpx;
  color: #aaa;
  text-align: center;
  margin: 80rpx auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.personal .basicInform .personalCon {
  width: 100%;
  height: 210rpx;
  padding-top: 30rpx;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
}

.personal .basicInform .personalCon .userInfo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.personal .basicInform .personalCon .userInfo .userAvatarUrl {
  border-radius: 50%;
  width: 100rpx;
  height: 100rpx;
  margin-left: 40rpx;
  margin-right: 20rpx;
}

/* .personal .basicInform .personalCon .userInfo .user-name {
  color: #fff;
} */

.personal .basicInform .personalCon .userInfo .user-name .user-name-top {
  font-size: 30rpx;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.personal .basicInform .personalCon .userInfo .user-name .user-name-top view:first-of-type {
  max-width: 400rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.personal .basicInform .personalCon .userInfo .user-name .user-name-top .refresh {
  position: relative;
}

.personal .basicInform .personalCon .userInfo .user-name .user-name-top .refresh .modify {
  width: 24rpx;
  height: 24rpx;
  background: #ea544c;
  opacity: 0;
  border: none;
  position: absolute;
  left: 0;
  top: 0;
  padding: 20rpx 40rpx;
}

.personal .basicInform .personalCon .userInfo .user-name .user-name-top .refresh .modify::after {
  border: none;
}

.personal .basicInform .personalCon .userInfo .user-name .user-name-top .refresh .updateWx {
  color: #fff;
  margin-left: 190rpx;
}

.personal .basicInform .personalCon .userInfo .user-name .user-name-top .refreshImg {
  width: 24rpx;
  height: 24rpx;
  margin-left: 20rpx;
}

.personal .basicInform .personalCon .userInfo .user-name .member {
  font-size: 24rpx;
  color: #fff;
  margin-top: 4rpx;
}

.personal .basicInform .personalCon .pineCones {
  padding: 0 50rpx;
  margin-top: 60rpx;
  display: flex;
  justify-content: space-between;
}

.personal .basicInform .personalCon .pineCones .myPineCones {
  color: #e9cc95;
  font-size: 28rpx;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.personal .basicInform .personalCon .pineCones .myPineCones .pineConesImg {
  width: 28rpx;
  height: 30rpx;
  margin-right: 10rpx;
}

.personal .basicInform .personalCon .pineCones .myPineCones .pineConeRules {
  font-size: 20rpx;
  margin-left: 28rpx;
  text-decoration: underline;
}

.personal .basicInform .personalCon .pineCones .myPineCones navigator {
  margin-top: -8rpx;
}

.personal .basicInform .personalCon .pineCones .pineconeDetail {
  color: #e9cc95;
  font-size: 24rpx;
  padding: 2rpx 20rpx;
  border: 0.1rpx solid #e9cc95;
  border-radius: 22rpx;
}

.personal .order.close-yue {
  position: relative;
  margin-top: -100rpx;
  z-index: 2;
}

.yuenav .tool-right {
  margin-top: -38rpx !important;
}

/* 会员分销 */
.disModal {
  width: 90%;
}

.modal-content {
  position: relative;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 10rpx;
  font-size: 28rpx;
}

.modal-head {
  position: relative;
  padding: 20rpx 30rpx;
}

.modal-foot {
  position: relative;
  padding: 20rpx 30rpx;
  /* border-bottom:1rpx solid #efefef; */
}

.modal-head::after,.modal-foot::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
	transform: scaleY(.5);
}

.modal-head::after {
  border-bottom: 1px solid #c8c7cc;
  bottom: 0;
}

.modal-foot::before {
  border-top: 1px solid #c8c7cc;
  top: 0;
}

.modal-foot .tot, .modal-head-r {
  color: #ff5344;
}

.modal-head-l {
  color: #333;
  font-size: 30rpx;
  font-weight: bold;
}

.modal-body {
  padding: 50rpx 30rpx;
  color: #333;
}

.modal-foot-r.btn {
  color: #fff;
  background-color: #ff5344;
  padding: 6rpx 30rpx;
  border-radius: 8rpx;
}

.distribut-new {
  text-align: center;
}

.bor-r {
  position: relative;
  padding-right: 20rpx;
  margin-right: 20rpx;
}

.bor-r::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 1px;
	transform: scaleX(.5);
  border-right: 1px solid #c8c7cc;
}

.distribut-tot {
  font-size: 58rpx;
  font-weight: bold;
  padding-left: 30rpx;
}

.model-close {
  text-align: center;
  margin: 30rpx 0;
}

.model-close .close {
  width: 60rpx;
  height: 60rpx;
}

/* 20190603 */
.personal .distribution .my-distribution {
  padding: 22rpx 30rpx;
  display: flex;
  align-items: center;
}

.personal .distribution .my-distribution .my-distribution-title {
  flex: 1;
  font-weight: 500;
  color: #444;
}

.personal .distribution .my-distribution .to-distribution {
  font-size: 24rpx;
  color: #aaa;
  margin-right: 20rpx;
}

.personal .distribution .item-main {
  padding: 20rpx 30rpx;
}

.toolList {
  border-top:1rpx solid #efefef;
}

.nocode {
  border: 1rpx solid #e5e5e5;
  height: 220rpx;
  line-height: 220rpx;
  width: 220rpx;
  margin: 48rpx 0 0 44rpx;
  background: rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #fff;
}

.toolIcon {
  width: 40rpx;
  max-height: 50rpx;
  margin-right: 18rpx;
}

.userLevel {
  display: flex;
  align-items: center;
  margin-top: 10rpx;
  color: #fff;
}

.userLevelName {
  background: #372d35;
  border-radius: 20rpx;
  padding: 0 15rpx;
  height: 38rpx;
  line-height: 38rpx;
  text-align: center;
  font-size: 22rpx;
}

.userLevelName .iconfont {
  color: #fae9bb;
  font-size: 24rpx;
}

.userLevel .userLeveldiscount {
  font-size: 24rpx;
  margin-left: 10rpx;
}

.fetch-coder {
  position: absolute;
  right: 20rpx;
  text-align: center;
  color: #fff;
}

.fetch-coder .iconfont {
  color: #fff;
  background: rgba(0, 0, 0, 0.1);
  width: 72rpx;
  height: 72rpx;
  text-align: center;
  line-height: 72rpx;
  border-radius: 50%;
  display: inline-block;
}

.fetch-coder-text {
  font-size: 22rpx;
  margin-top: 4rpx;
}

/* 会员条 */
.personal .order.hasVip {
  margin-top: -95rpx;
}

.vip {
  margin: 20rpx;
}

.signIn {
  right: 112rpx;
}

/* 自提点 */
.community.modal-body {
  padding: 30rpx;
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

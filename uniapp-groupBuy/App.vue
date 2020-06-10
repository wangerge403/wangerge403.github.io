<script>
export default {
	
	onLaunch: function() {
		
	},
	onShow: function() {
		console.log('App Show');
			
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
}
/* #endif */
page{
	width: 100%;
	height: 100%;
}
</style>

mui.ready(function(){
	new Vue({
		el:"#app",
		data:{
			showPanel:"condition",
			gotoPanel:"all",
			
		},
		methods:{
			showConditionPanel:function(){
				this.showPanel="condition";
			},
			showJourneyPanel:function(){
				this.showPanel="journey";
			},
			showStatePanel:function(){
				this.showPanel="state";
			},
			showAllPanel:function(){
				this.gotoPanel="all";
			},
			showNewsPanel:function(){
				this.gotoPanel="news";
			},
			showInterviewPanel:function(){
				this.gotoPanel="interview";
			},
			showPicturePanel:function(){
				this.gotoPanel="picture";
			},
			showVideoPanel:function(){
				this.gotoPanel="video";
			}
/*			var gallery = mui('.mui-slider');
			gallery.slider({
			interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
			});*/
		}
	});
});

mui.plusReady(function(){
	plus.navigator.setStatusBarBackground("#FFFFFF");//OS顶部状态栏背景色为白色
	plus.navigator.setStatusBarStyle("dark");//OS顶部文字黑色(白色light，黑色dark)
	plus.screen.lockOrientation("portrait-primary");//禁止横屏切换
	//隐藏滚动条
	plus.webview.currentWebview().setStyle({
		scrollIndicator:'none'
	});
	var gallery=mui('.mui-slider');
		gallery.slider({
			interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
		});
});

mui.init();
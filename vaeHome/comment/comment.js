mui.ready(function(){
	new Vue({
		el:"#app",
		data:{
			comment_text:"",
			post_id:localStorage.getItem("post_id")
		},
		methods:{
			sendComment:function(){
				var ref=this;
				$.ajax({
					type:"post",
					url:vaehome+"/vaehome/user/addComment",
					data:{
						comment_detail:ref.comment_text,
						post_id:ref.post_id,
						user_id:localStorage.getItem("id")						
					},
					success:function(){ 
    					//获得列表界面的webview  
     					var list = plus.webview.currentWebview().opener();
      					//触发列表界面的自定义事件（refresh）,从而进行数据刷新   
     					mui.fire(list, 'refresh');  
     					//返回true，继续页面关闭逻辑     
    					mui.toast("评论成功，经验加10");
    					return true;
						
					},
					error:function(){
						mui.toast("执行异常");
					}
				});
			}
		}
	})
});
mui.plusReady(function(){
	plus.navigator.setStatusBarBackground("#FFFFFF");//OS顶部状态栏背景色为白色
	plus.navigator.setStatusBarStyle("dark");//OS顶部文字黑色(白色light，黑色dark)
	plus.screen.lockOrientation("portrait-primary");//禁止横屏切换
	//隐藏滚动条
	plus.webview.currentWebview().setStyle({
		scrollIndicator:'none'
	})
});

mui.init();
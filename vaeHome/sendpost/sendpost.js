mui.ready(function(){
	new Vue({
		el:"#app",
		data:{
			circle_id:"",
			post_text:""
		},
		methods:{
			sendPost:function(){
				var ref=this;
				$.ajax({
					type:"post",
					url:vaehome+"/vaehome/user/addPost",
					data:{
						user_id:localStorage.getItem("id"),
						circle_id:ref.circle_id,
						post_detail:ref.post_text
					},
					success:function(){
						var list =	plus.webview.getWebviewById("../main/main.html")  	
						if(list){
							list.reload(true)
						}
    					mui.currentWebview.close();
    					mui.toast("发帖成功，经验加10");
					},
					error:function(){
						mui.toast("执行异常");
					}
				});
			}
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
	
});
mui.init();


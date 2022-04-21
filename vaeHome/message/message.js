mui.ready(function(){
	new Vue({
		el:"#app",
		data:{
			message:[]
		},
		methods:{
			getid:function(){
				alert(plus.webview.getLaunchWebview().id);
			}
		},
		mounted:function(){
			var ref=this;
			$.ajax({
				type:"post",
				url:vaehome+"/vaehome/user/searchMessage",
				data:{
					user_id:localStorage.getItem("id")
				},
				success:function(json){
					ref.message=json;
				},
				error:function(){
					mui.toast("执行异常");
				}
			});
		}
	
	});
});
mui.plusReady(function(){
	
});
mui.init();



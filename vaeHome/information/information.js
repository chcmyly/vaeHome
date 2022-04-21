mui.ready(function(){
	new Vue({
		el:"#app",
		data:{
			uername:localStorage.getItem("username"),
			id:localStorage.getItem("id"),
			sex:"女",
			exp:"",
			hot:"",
			fans:"",
			care:"",
			photo_path:"",
			card:{
				
			},
			post:[],
			user_head:"",
			user_image:""
		},
		methods:{
			readPost: function(s, e) {
				var e=event.currentTarget;
				var obj = $(e); //触发事件的元素
				var name = obj.attr("name"); //元素的name属性
				var element = null;
				if(name == "post1") {
					element = obj;
				} else {
					element = obj.parents("div[name='post1']");
				}
				var post_id = element.data("id"); //取出当前帖子的id
				/*alert(post_id);*/
				localStorage.setItem("post_id",post_id);
				mui.openWindow({
					url:"../post_detail/post.html",
/*					id:"post.html",
					extras:{
						ID:post_id
					}*/ 
				});
			}
		},
		mounted:function(){
			var ref=this;
			//ajax
			$.ajax({
				url:vaehome+"/vaehome/user/searchNum",
				type:"post",
				data:{
					id:localStorage.getItem("id")
				},
				success:function(json){
					ref.exp=json.exp;
					ref.care=json.care_num;
					ref.fans=json.fan_num;
					ref.hot=json.hot;
					var photo_path=json.photo_path;
					document.getElementById("photo").src=photo_path;
					/*在返回list的时候前端应该接收到一个list数组，不能直接调用list中的项*/
				},
				error:function(error){
					mui.toast("执行错误");
				}
			});
			$.ajax({
				type:"post",
				url:vaehome+"/vaehome/user/searchPostByUser",
				data:{
					user_id:localStorage.getItem("id")
				},
				success:function(json){
					ref.post=json;
				},
				error:function(){
					mui.toast("执行异常");
				}
			});
			
		}
			
	
		
	});
});
mui.plusReady(function(){
	plus.navigator.setStatusBarBackground("#007AFF");  //OS顶部状态栏背景色
	plus.navigator.setStatusBarStyle("light");  //OS顶部文字白色
	plus.screen.lockOrientation("portrait-primary"); //禁止横屏切换
	//隐藏滚动条
	plus.webview.currentWebview().setStyle({
		scrollIndicator:'none'
	})
});


mui.init({
	gestureConfig: {
		longtap: true, //默认为false
		release: true
	}
});
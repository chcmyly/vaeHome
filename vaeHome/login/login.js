mui.ready(function(){
	new Vue({
		el:"#app",
		data:{
	       username:"",
		   password:"",
		   id:""
		},
		mounted:function(){
			//检测用户是否已经登录
			$.ajax({
				url:vaehome+"/vaehome/user/isLogin",
				type:"post",
				data:{
					username:localStorage.getItem("username")
				},
				success:function(json){
					if(json.result){
						location.href="../main/main.html";						
							/*mui.toast("存储成功");*/
							//alert(localStorage.getItem("usrname"));

					}
					else{
						mui.toast("执行异常");
					}
				},
				error:function(){
					mui.toast("执行异常");
				}				
			});
		},
		methods:{
			
			loginSystem:function(){
				//登录事件
				var bool_1=checkUsername(this.username);
				var bool_2=checkPhonenum(this.username);
				var bool_3=checkEmail(this.username);
				var bool_4=checkPassword(this.password);
				var bool=(bool_1 || bool_2 || bool_3) && bool_4;
				if(bool){
					//Ajax上传登录数据
					var ref=this;
					$.ajax({
						type:"post",
						url:vaehome+"/vaehome/user/login",
						data:{
							username:ref.username,
							password:ref.password
						},
						success:function(json){
							if(json.result){
								
								//alert(ref.username);
								$.ajax({
									type:"post",
									url:vaehome+"/vaehome/user/searchUser",
									data:{
										username:ref.username
									},
									success:function(json){
										ref.id=json.id;
										ref.username=json.Username;
										localStorage.setItem("username",ref.username);//本地保存用户名
										localStorage.setItem("id",ref.id);
										/*alert(localStorage.getItem("id"));*/
									}
/*									error:function(){
										mui.toast("执行异常");
									}*/
								});
								mui.toast("登录成功");
								mui.openWindow({
	       							url:"../main/main.html"
	       						});
							}
							else{
								mui.toast("登录失败");
							}
						},
						error:function(){
							mui.toast("执行异常");
						}
					});
					
					
					

				}
				else{
					mui.toast("输入信息有误");	
				}
			},
		gotoregister:function(){
			mui.openWindow({
				url: "../register/register.html"	
			});
		},
		forgetpassword:function(){
			mui.openWindow({
				url:"../forget/forget.html"
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
	})
});

mui.init();
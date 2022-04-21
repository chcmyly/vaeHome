mui.ready(function(){
	new Vue({
	el:"#app",
	data:{
		username:"",
		password:"",
		repassword:"",
		checkbox:"",
		id:""
	},
	methods:{
			gotoapointment:function(){
			mui.openWindow({
				url: "apointment.html"	
				});
			},
	       registSystem:function(){
	       	//注册事件
	       	var bool_1=checkUsername(this.username);
	       	var bool_2=checkPassword(this.password);
	       	var bool=bool_1&&bool_2;
	       	if(bool){
	       		if(this.password==this.repassword){
	       			if(this.checkbox==true){
	       				var ref=this;
	       				$.ajax({
	       				url:vaehome+"/vaehome/user/register",
	       				type:"post",
	       				data:{
	       					"username":ref.username,
	       					"password":ref.password
	       				},
	       				success:function(json){
	       					if(json.result){
	       						localStorage.setItem("username",ref.username);
	       						$.ajax({
	       							type:"post",
	       							url:vaehome+"/vaehome/user/addHotExp",
	       							data:{
	       								"username":localStorage.getItem("username")
	       							},
	       							success:function(json){
	       								ref.id=json;
	       								localStorage.setItem("id",ref.id);
	       								/*alert(localStorage.getItem("id"));*/
	       								/*mui.toast("注册成功");*/
	       								mui.openWindow({
	       									url:"../figure/figure.html"
	       								});
	       							},
	       							error:function(){
	       								mui.toast("执行异常");
	       							}
	       						});
	       					}
	       				},
	       				error:function(){
	       					mui.toast("注册失败");
	       				}
	       			});
	       				
	       			}
	       			else{
	       				mui.toast("请先阅读并同意《用户注册协议》");
	       			}
	       		}
	       		else{
	       			mui.toast("两次密码不一致");
	       		}
	       	}
	       	else{
	       		mui.toast("注册信息有误");
	       	}
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
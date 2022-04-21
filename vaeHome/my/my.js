mui.ready(function(){
	new Vue({
		el:"#app",
		data:{
	       username:localStorage.getItem("username"), 
		   id:localStorage.getItem("id"),
	       care:"",
	       fans:"",
	       friend:"",
	       hot:"",
	       photo_path:"",
	       exp:""
		},	
		methods:{
			gotomyhome:function(){
				mui.openWindow({
					url:"../information/information.html"	
				});
			},
			toSet:function(){
				mui.openWindow({
					url:"set.html"
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
					ref.friend=json.friendID;
					var photo_path=json.photo_path;
					document.getElementById("photo").src=photo_path;
					/*在返回list的时候前端应该接收到一个list数组，不能直接调用list中的项*/
				},
				error:function(error){
					mui.toast("执行错误");
				}
			});
			
			
		}
	})
})
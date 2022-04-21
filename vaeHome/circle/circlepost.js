mui.ready(function(){
	new Vue({
		el:"#app", 
		data:{
			circle_post:[],
			circle_name:"",
			circle_id:localStorage.getItem("circle_id")
		},
		mounted:function(){
		var ref=this;
			$.ajax({
				type:"post",
				url:vaehome+"/vaehome/user/searchPostByCircle",
				data:{
					circle_id:ref.circle_id
				},
				success:function(json){		
						ref.circle_post=json;
						ref.circle_name=json[0].name;
				},
				error:function(){
					mui.toast("执行异常");
				}
			});
		}
	});
	
});
mui.ready(function(){
	new Vue({
		el:"#app",
		data:{
			sex:"女",
			user:[]
		},
		mounted:function(){
			var ref=this;
			$.ajax({
				type:"post",
				url:vaehome+"/vaehome/user/searchAllUser",
				date:{
					
				},
				success:function(json){
					ref.user=json;
				},
				error:function(){
					mui.toast("执行异常")
				}
			});
		},
		methods:{
			addCare:function(s,e){
				var e=event.currentTarget;
				var obj = $(e); //触发事件的元素
				var name = obj.attr("name"); //元素的name属性
				var element = null;
				if(name == "user1") {
					element = obj;
				} else {
					element = obj.parents("dt[name='user1']");
				}
				var care_id = element.data("id"); //取出当前帖子的id
				$.ajax({
					type:"post",
					url:vaehome+"/vaehome/user/addCare",
					data:{
						user_id:localStorage.getItem("id"),
						care_id:care_id
					},
					success:function(){
						mui.toast("关注成功");
					},
					error:function(){
						mui.toast("执行异常");
					}
				});
			}
		}
		
	})
})
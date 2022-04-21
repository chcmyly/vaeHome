mui.ready(function(){
	new Vue({
		el:"#app",
		data:{
			
		},
		methods:{
			quitCount:function(){
				localStorage.clear();
				mui.openWindow({
					url:"../login/login.html"
				})
			}
		}
		
	})
});
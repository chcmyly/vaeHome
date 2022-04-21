mui.ready(function(){
	new Vue({
		el:"#app",
		data:{
			showPanel:"ground",
			post:[],
			hotpost:[],
			carepost:[]
		},
		methods:{
			search1:function(){
				localStorage.setItem("circle_id","1")
				mui.openWindow({
					url:"circlepost.html"
				});
			},
			search2:function(){
				localStorage.setItem("circle_id","2")
				mui.openWindow({
					url:"circlepost.html"
				});
			},
			search3:function(){
				localStorage.setItem("circle_id","3")
				
				mui.openWindow({
					url:"circlepost.html"
				});
			},
			search4:function(){
				localStorage.setItem("circle_id","4")
				mui.openWindow({
					url:"circlepost.html"
				});
			},
			search5:function(){
				localStorage.setItem("circle_id","5")
				mui.openWindow({
					url:"circlepost.html"
				});
			},
			search12:function(){
				localStorage.setItem("circle_id","12")
				mui.openWindow({
					url:"circlepost.html"
				});
			},
			search11:function(){
				localStorage.setItem("circle_id","11")
				mui.openWindow({
					url:"circlepost.html"
				});
			},
			search7:function(){
				localStorage.setItem("circle_id","7")
				mui.openWindow({
					url:"circlepost.html"
				});
			},
			search9:function(){
				localStorage.setItem("circle_id","9")
				mui.openWindow({
					url:"circlepost.html"
				});
			},
			search0:function(){
				localStorage.setItem("circle_id","0")
				mui.alert("圈子正在开发中~")
			},
			 
			showGroundPanel:function(){
				this.showPanel="ground";
			},
			showHotPanel:function(){
				this.showPanel="hot";
			},
			showCarePanel:function(){
				this.showPanel="care";
			},
/*			loadHotPost:function(){
				var ref=this;
				$.ajax({
					url:vaehome+"/vaehome/user/searchPostByHot",
					type:"post",
					data:{
						
					},
					success:function(json){
						ref.hotpost=json;
					},
					error:function(){
						mui.toast("执行异常");
					}
				});
			},*/
			readPost:function(s, e) {
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
			},
			sendPost:function(){
				mui.openWindow({
					url:"../sendpost/sendpost.html",
					id:"circle.html"
				})
			}
		},
		mounted:function(){
			var ref=this;
			$.ajax({
				type:"post",
				url:vaehome+"/vaehome/user/searchAllPost",
				data:{
					
				},
				success:function(json){		
						ref.post=json;				
				},
				error:function(){
					mui.toast("执行异常");
				}
			});
			$.ajax({
				type:"post",
				url:vaehome+"/vaehome/user/searchPostByHot",
				data:{
						
				},
				success:function(json){
					ref.hotpost=json;
					/*mui.toast(json[1].name);*/
				},
				error:function(){
					mui.toast("执行异常");
				}
				});
				$.ajax({
					type:"post",
					url:vaehome+"/vaehome/user/searchPostByCare",
					data:{
						user_id:localStorage.getItem("id")
					},
					success:function(json){
						ref.carepost=json;
					},
					error:function(){
						mui.toast("执行异常");
					}
				});				
				
			window.addEventListener('fresh', function(event) {
    			location.reload();
			});

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
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:0//自动轮播周期，若为0则不自动播放，默认为0；
        });
});

mui.init();
            

        
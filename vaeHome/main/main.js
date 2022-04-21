mui.ready(function(){
});

mui.plusReady(function(){
	plus.navigator.setStatusBarBackground("#F7F7F7");//OS顶部状态栏背景色为白色
	plus.navigator.setStatusBarStyle("dark");//OS顶部文字黑色
	plus.screen.lockOrientation("portrait-primary");//禁止横屏切换
	//隐藏滚动条
	plus.webview.currentWebview().setStyle({
		scrollIndicator:'none'
		//softinputMode:'adjustResize'
	});
	
    var pages = ["/vae/vae.html","/circle/circle.html","/found/found.html","/message/message.html","/my/my.html"];
    var arr = document.getElementsByClassName("mui-tab-item")
    var styles = {
        top:"0",
        bottom:"10%"
    }
    var pageArr = [];
    var slef = plus.webview.currentWebview();
    for(var i=0; i<arr.length; i++){
        // 有几个选项卡，需要创建几个子页面
        var page = plus.webview.create(pages[i],pages[i],styles);
        pageArr.push(page);
        !function(i){
            arr[i].addEventListener("tap",function(){
                // 让当前页面(i)显示，不是当前页面隐藏
                for(var j=0; j<pageArr.length; j++){
                    if(j!=i) pageArr[j].hide();
                    else pageArr[j].show();
                }
                /* 让新创建的webview，追加合并到当前的窗口上。合并成一个窗口。
                 * 目的：将父子窗口合并成一个页面，实现同开同关的效果。 避免点击返回安监室，子页面先关闭，而父页面的头部和尾部没有关闭的BUG。
                 */
                slef.append(pageArr[i]);
                
            })
        }(i);
    }
    // 默认触发第0个选项卡的tap事件。
    mui.trigger(arr[0],"tap");
});

mui.init();
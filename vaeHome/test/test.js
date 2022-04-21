/*mui.ready(function(){
	new Vue({
		el:"#app",
		data:{
			circle:""
		},
		methods:{
			timepicker:function(){			
				//手动设置起止时间
				var dtpicker = new mui.DtPicker({
	   				type: "date",//设置日历初始视图模式 
	    			beginDate: new Date(2015, 00, 01),//设置开始日期  --月份：索引是0；
	    			endDate: new Date(2016, 04, 25),//设置结束日期 
	    			labels: ['Year', 'Mon', 'Day', 'Hour', 'min'],//设置默认标签区域提示语 
	    			customData: { 
	        		h: [
	           		 	{ value: 'AM', text: 'AM' },
	            		{ value: 'PM', text: 'PM' }
	        		] 
	    			}//时间/日期别名 
				});
				dtpicker.show(function(e) {
	   	 			console.log(e);
	   			 	document.getElementById('datebox04').getElementsByTagName('span')[0].innerText = '-- '+e.text
				});
			
		}
	}
});
});*/
mui.ready(function(){
	new Vue({
		el:"#app",
		data:{
			
		},
		methods:{
			showDate:function (){
	var dDate=new Date;
	//设置默认（当前）时间
	dDate.toLocaleDateString();//setFullYear(1986,5,14); //js中月份是从0开始存储的，1986,5,14显示的是1986,6,14
	//设置开始（最小）时间
	var minDate=new Date;
	minDate.setFullYear(1950,00,01);
	//设置结束（最大）时间
	var maxDate=new Date;
	maxDate.toLocaleDateString();//setFullYear(2019,05,04);  

	plus.nativeUI.pickDate(
		//选择了的时候做什么动作
		function(e){
			var d=e.date;
			mui.toast('您选择的日期是:'+d.getFullYear() + "-" + (d.getMonth() +1) +"-" + d.getDate() );
		},
		//取消了的时候做什么动作
		function(e){
			mui.toast("您没有选择时间");
		},
		//一个对象，规定了控件标题，默认时间，最大时间，最小时间
		{
			title:'选择日期',
			date:dDate,
			minDate:minDate,
			maxDate:maxDate
		}
	)
	
}
		}
	});
});
/*function showDate(){
	var dDate=new Date;
	//设置默认（当前）时间
	dDate.toLocaleDateString();//setFullYear(1986,5,14); //js中月份是从0开始存储的，1986,5,14显示的是1986,6,14
	//设置开始（最小）时间
	var minDate=new Date;
	minDate.setFullYear(1950,00,01);
	//设置结束（最大）时间
	var maxDate=new Date;
	maxDate.toLocaleDateString();//setFullYear(2019,05,04);  

	plus.nativeUI.pickDate(
		//选择了的时候做什么动作
		function(e){
			var d=e.date;
			mui.toast('您选择的日期是:'+d.getFullYear() + "-" + (d.getMonth() +1) +"-" + d.getDate() );
		},
		//取消了的时候做什么动作
		function(e){
			mui.toast("您没有选择时间");
		},
		//一个对象，规定了控件标题，默认时间，最大时间，最小时间
		{
			title:'选择日期',
			date:dDate,
			minDate:minDate,
			maxDate:maxDate
		}
	)
	
}*/
mui.init();


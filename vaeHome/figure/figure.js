var temp;//定义全局变量用于存放生日
mui.ready(function(){
	new Vue({
		el:"#app",
		data:{
			sex:"",
			city:"",
			username:localStorage.getItem("username"),
			birthday:"",
			email:"",
			phonenum:""
		},
		methods:{
			Selectbirthday:function(){
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
						temp=d.getFullYear() + "-" + (d.getMonth() +1) +"-" + d.getDate();
						/*mui.toast('您选择的日期是:'+d.getFullYear() + "-" + (d.getMonth() +1) +"-" + d.getDate() );*/
						/*alert(localStorage.getItem("birthday"));*/
						document.getElementById("birthday").innerHTML = temp;
						
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
			},
			sendInformation:function(){
				/*alert(temp);*/
				
				var bool_0;
					if(this.sex==null){
						bool_0=false;
					}else{
						bool_0=true;
					};				
				var bool_1=checkCity(this.city);
				var bool_2;
					if(temp==null){
						bool_2=false;
					}else{
						bool_2=true;
					};
				var bool_3=checkEmail(this.email);
				var bool_4=checkPhonenum(this.phonenum);
				var bool=bool_0&&bool_1 && bool_2 && bool_3&& bool_4;
				/*alert(bool);*/
/*				if(bool){
					alert(temp);
				}else{
					alert("2");
				}*/
				if(bool){
					var ref=this;
					$.ajax({
					type:"post",
					url:vaehome+"/vaehome/user/updateUser",
					data:{
						user_id:localStorage.getItem("id"),
						sex:ref.sex,
						address:ref.city,
						birthday:temp,
						email:ref.email,
						phonenum:ref.phonenum
					},
					success:function(){
						mui.toast("欢迎回家");
						mui.openWindow({
							url:"../main/main.html"
						})
					},
					error:function(){
						mui.toast("执行异常");
					}
				});
				}
				else{
					mui.toast("输入信息有误");
				}
				
			}
		}
	})
})
//var v_city;
//var v_sex;
//var v_birthday;
//function clickItem(json){
//	var type=json.type;
//	var callback;
//	if(type="picker"){
//		callback = function(){
//			var obj=$(this);
//			var picker=new mui.PopPicker();
//			console.log(json.el);
//			picker.setData(json.data);
//			picker.pickers[0].setSelectedValue(1,2000);
//			picker.show(function(items){
//				if(json.el=="#sex"){
//					v_city=itmes[0].value;
//					console.log(JSON.stringify(v_sex));
//				}else {
//					mui.toast("1");					
//				}
//				console.log(JSON.stringify(items[0].value));
//				var element =obj.find(".value");
//				element.html(items[0].value+"<i class='iconfont icon-jiantouyou'></i>");
//				element.data("value",items[0].value)
//				picker.dispose();
//			});			
//		}
//	}else if(type="prompt"){
//		callback=function(){
//			var obj=$(this);
//			mui.prompt(json.message,json.placeholder,json.title,json.btn,function(result){
//				if(result.index==1){
//					var element =obj.find(".value");
//					console.log(json.el);
//					var regExp=new RegExp(json.pattern); //正则表达式
//					if(regExp.test(result.value)){
//						if(json.el=="#city"){
//							v_city=result.value;
//							console.log(JSON.stringify(v_city));
//						}else {
//							mui.toast(1);
//						}
//						console.log(JSON.stringify(result.value));
//						element.html(result.value + json.unit + "<i class='iconfont icon-jiantouyou'></i>");
//					}else{
//						mui.toast("填写错误");
//					}
//					
//				}
//			},'div');
//		}
//	}else if(type=="datePicker"){
//		callback =function(){
//			var obj=$(this);
//			var dtPicker=new mui.DtPicker({
//				type:'date',
//				beginDate:new Date(1950,00,01),//设置开始日期
//				endDate:new Date.toLocaleDateString() //设置结束日期
//			});
//			dtPicker.show(function(items){
//				var element =obj.find(".value");
//				var year=items.y.value;
//				var month=items.m.value;
//				var date=items.d.value;
//				var temp=year+"-"+month+"-"+date;
//				v_birthday=temp;
//				console.log(v_birthday);
//				element.html(temp + "<i class='iconfont icon-jiantouyou'></i>");
//				dtPicker.dispose();
//			});
//		}
//	}
//	
//}

var v_sex;
var v_birthday;
var v_height;
var v_weight;
var v_married;
var v_city;
var v_education;
var v_tel;
var v_email;
var v_education_list="";
var v_work_list="";
var v_introduction="暂无";
var v_evaluate="暂无";
var v_experience="暂无";
var v_job_city;
var v_job_salary;
var v_job_name;
var v_job_hiredate;
var path;

function getImage() {
    var cmr = plus.camera.getCamera();
    var res = cmr.supportedImageResolutions[0];
    var fmt = cmr.supportedImageFormats[0];
    cmr.captureImage(function(path) {
        //plus.io.resolveLocalFileSystemURL(path, function(entry) {  
    plus.io.resolveLocalFileSystemURL(path, function(entry) {
        var localUrl = entry.toLocalURL();
        uploadHead(localUrl + "?version=" + new Date().getTime());
    }, function(err) {
        console.error("拍照失败：" + err.message);
    }, {
        index: 1
    });
    });
} 
//本地相册选择
function galleryImg() {
    plus.gallery.pick(function(a) {
    plus.io.resolveLocalFileSystemURL(a, function(entry) {
        plus.io.resolveLocalFileSystemURL("_doc/", function(root) {
        root.getFile("head.png", {}, function(file) {
            //文件已存在
            file.remove(function() {
            console.log("file remove success");
            entry.copyTo(root, 'head.png', function(e) {
                var e = e.fullPath + "?version=" + new Date().getTime();
                uploadHead(e); /*上传图片*/
                //变更大图预览的src
                //目前仅有一张图片，暂时如此处理，后续需要通过标准组件实现
                },function(e) {
                            console.log('copy image fail:' + e.message);
            });
            }, function() {
            console.log("delete image fail:" + e.message);
            });
        }, function() {
            //文件不存在
            entry.copyTo(root, 'head.png', function(e) {
            var path = e.fullPath + "?version=" + new Date().getTime();
            uploadHead(path); /*上传图片*/
            },function(e) {
            console.log('copy image fail:' + e.message);
            });
        });
        }, function(e) {
        console.log("get _www folder fail");
        })
    }, function(e) {
        console.log("读取拍照文件错误：" + e.message);
    });
    }, function(a) {}, {
    filter: "image"
    })
};

//上传头像图片
function uploadHead(imgPath) {
    var image = new Image();
    image.src = imgPath;
    path=imgPath;
    image.onload = function() {
    var imgData = getBase64Image(image);
    console.log(imgData);

		$.ajax({
			url:nebula +"/resume/updatephoto",
			type:"post",
			data:{
				img:imgData
			},	
			beforeSend:function(request){
				request.setRequestHeader("Authorization",localStorage.getItem("token"));
			},
			success:function(json){
				mui.toast("图片保存成功");
				document.getElementById('head').src = imgPath;
			},
			error:function(error){
				console.log(JSON.stringify(error));
				mui.toast("执行错误");
			}
		});
    }
}
//将图片压缩转成base64
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    var width = img.width;
    var height = img.height;
    // calculate the width and height, constraining the proportions
    if(width > height) {
    if(width > 100) {
        height = Math.round(height *= 100 / width);
        width = 100;
    }
    } else {
    if(height > 100) {
        width = Math.round(width *= 100 / height);
        height = 100;
    }
    }
    canvas.width = width; /*设置新的图片的宽度*/
    canvas.height = height; /*设置新的图片的长度*/
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height); /*绘图*/
    var dataURL = canvas.toDataURL("image/png", 0.8);
    return dataURL.replace("data:image/png;base64,", "");
}

function clickItem(json) {
	var type = json.type;
	var callback;
	if(type == "picker") {
		callback = function() {
			var obj = $(this);
			var picker = new mui.PopPicker(); 
			console.log(json.el);
			picker.setData(json.data);
			picker.pickers[0].setSelectedValue(1,2000);
			picker.show(function(items) {
				if(json.el=="#sex"){
					v_sex=items[0].value;
					console.log(JSON.stringify(v_sex));
				}else if(json.el=="#marriage"){
					v_married=items[0].value;
				}else if(json.el=="#info [name='education']"){
					v_education=items[0].value;
				}else if(json.el=="#education [name='education']"){
					v_education_list+="bg :"+items[0].value+",";
				}
				console.log(JSON.stringify(items[0].value));
				var element = obj.find(".value");
				element.html(items[0].value + "<i class='iconfont icon-enter'></i>");
				element.data("value", items[0].value)
				picker.dispose();
			});
		}
	} else if(type == "prompt") {
		callback = function() {
			var obj = $(this);
			mui.prompt(json.message, json.placeholder, json.title, json.btn, function(result) {
				if(result.index == 1) {
					var element = obj.find(".value");
					console.log(json.el);
					var regExp = new RegExp(json.pattern);
					if(regExp.test(result.value)) {
						if(json.el=="#height"){
							v_height=result.value;
							console.log(JSON.stringify(v_height));
						}else if(json.el=="#weight"){
							v_weight=result.value;
						}else if(json.el=="#ancestral_home"){
							v_city=result.value;
						}else if(json.el=="#tel"){
						v_tel=result.value;
						}else if(json.el=="#email"){
							v_email=result.value;
						}else  if(json.el=="[name='school']"){
							v_education_list+="[{ school :"+result.value+",";
						}else if(json.el=="[name='major']"){
							v_education_list+=" major :"+result.value+",";
						}else if(json.el=="#education [name='education']"){
							v_education_list+=" bg :"+result.value+",";
						}else if(json.el=="#education [name='year']"){
							v_education_list+=" out:"+result.value+"}]";
						}else if(json.el=="#work [name='company']"){
							v_work_list+="[{ firm:"+result.value+" ,";	
						}else if(json.el=="#work [name='content']"){
							v_work_list+=" content :"+result.value+"}]";
						}else if(json.el=="#apply [name='job_city']"){
							v_job_city=result.value;
						}else if(json.el=="#apply [name='job_salary']"){
							v_job_salary=result.value;
						}else if(json.el=="#apply [name='job_name']"){
							v_job_name=result.value;
						}else if(json.el=="#apply [name='job_hiredate']"){
							v_job_hiredate=result.value;
						}else if(json.el=="#introduction [name='intro']"){
							v_introduction=result.value;
						}else if(json.el=="#evaluate [name='evalu']"){
							v_evaluate=result.value;
						}else if(json.el=="#experience [name='exper']"){
							v_experience=result.value;
						}
						console.log(JSON.stringify(result.value));
						element.html(result.value + json.unit + "<i class='iconfont icon-enter'></i>");
					} else {
						mui.toast("填写错误");
					}
				}

			}, 'div');
		}

	} else if(type == "datePicker") {
		callback = function() {
			var obj = $(this);
			var dtPicker = new mui.DtPicker({
				type: 'date',			
    			beginDate: new Date(1956, 04, 25),//设置开始日期
				endDate: new Date(2030, 04, 25),//设置结束日期
			});
			dtPicker.show(function(items) {
				var element = obj.find(".value");
				var year = items.y.value;
				var month = items.m.value;
				var date = items.d.value;
				var temp = year + "-" + month + "-" + date;
				if(json.el=="#birthday"){
					v_birthday=temp;
					console.log(v_birthday);
				}else if(json.el=="#work [name='hiredate']"){
					v_work_list+=" in :"+temp+",";
				}else if(json.el=="#work [name='leavedate']"){
					v_work_list+=" out :"+temp+",";
				}
				element.html(temp + "<i class='iconfont icon-enter'></i>");
				dtPicker.dispose();
			});
		}
	}
	$(json.el).on("tap", callback);

		var artEditor = new Eleditor({
						el: json.el,
						toolbars:[
							"editText",
							"delete",
							"cancel"
						]
				});

		$(json.el).data("editor",artEditor);

	
}

mui.ready(function()  {
	 
	var array = [{
			el: "#sex",
			type: "picker",
			data: [{
				value: '男',
				text: '男'
			}, {
				value: '女',
				text: '女'
			}]
		}, {
			el: "#birthday",
			type: "datePicker"
		},
		{
			el: "#height",
			message: "请输入您的身高",
			placeholder: "",
			title: "身高",
			btn: ["取消", "确认"],
			unit: "cm",
			pattern: "^[12][0-9]{2}$",
			type: "prompt"
		},
		{
			el: "#weight",
			message: "请输入您的体重",
			placeholder: "",
			title: "体重",
			btn: ["取消", "确认"],
			unit: "kg",
			pattern: "^[1-9][0-9]{1,2}$",
			type: "prompt"
		},

		{
			el: "#marriage",
			data: [{
				value: '未婚',
				text: '未婚'
			}, {
				value: '已婚',
				text: '已婚'
			}],
			type: "picker"
		},
		{
			el: "#ancestral_home",
			message: "输入您的籍贯",
			placeholder: "",
			title: "籍贯",
			btn: ["取消", "确认"],
			unit: "",
			pattern: "^[\u4e00-\u9fa5]{2,4}$",
			type: "prompt"
		},
		{
			el: "#info [name='education']",
			data: [{
				value: '无',
				text: '无'
			}, {
				value: '中专',
				text: '中专'
			}, {
				value: '大专',
				text: '大专'
			}, {
				value: '本科',
				text: '本科'
			}, {
				value: '研究生',
				text: '研究生'
			}, {
				value: '博士',
				text: '博士'
			}],
			type: "picker"
		},
		{
			el: "#tel",
			message: "输入您的电话",
			placeholder: "",
			title: "电话",
			btn: ["取消", "确认"],
			unit: "",
			pattern: "^[1][0-9]{10}$",
			type: "prompt"
		},
		{
			el: "#email",
			message: "输入您的邮箱",
			placeholder: "",
			title: "邮箱",
			btn: ["取消", "确认"],
			unit: "",
			pattern: "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$",
			type: "prompt"
		},
		{
			el: "[name='school']",
			message: "输入您的学校",
			placeholder: "",
			title: "学校",
			btn: ["取消", "确认"],
			unit: "",
			pattern: "^[\u4e00-\u9fa5]{4,20}$",
			type: "prompt"
		}, {
			el: "[name='major']",
			message: "输入您的专业",
			placeholder: "",
			title: "专业",
			btn: ["取消", "确认"],
			unit: "",
			pattern: "^[\u4e00-\u9fa5]{4,20}$",
			type: "prompt"
		},
		{
			el: "#education [name='education']",
			data: [{
				value: '无',
				text: '无'
			}, {
				value: '中专',
				text: '中专'
			}, {
				value: '大专',
				text: '大专'
			}, {
				value: '本科',
				text: '本科'
			}, {
				value: '研究生',
				text: '研究生'
			}, {
				value: '博士',
				text: '博士'
			}],
			type: "picker"
		},
		{
			el: "#education [name='year']",
			message: "输入您的毕业年份",
			placeholder: "",
			title: "年份",
			btn: ["取消", "确认"],
			unit: "",
			pattern: "^[12][0-9]{3}$",
			type: "prompt"
		},
		{
			el: "#work [name='company']",
			message: "输入您工作过的企业名称",
			placeholder: "",
			title: "企业",
			btn: ["取消", "确认"],
			unit: "",
			pattern: "^[a-zA-Z0-9\u4e00-\u9fa5]{2,40}$",
			type: "prompt"
		},
		{
			el: "#work [name='hiredate']",
			type: "datePicker"
		}, {
			el: "#work [name='leavedate']",
			type: "datePicker"
		}, {
			el: "#work [name='content']",
			message: "输入您工作过的内容",
			placeholder: "",
			title: "工作内容",
			btn: ["取消", "确认"],
			unit: "",
			pattern: "^[a-zA-Z0-9\u4e00-\u9fa5]{2,40}$",
			type: "prompt"
		},{
			el:"#introduction [name='intro']",
			message: "输入您的自我介绍",
			placeholder: "",
			title: "自我介绍",
			btn: ["取消", "确认"],
			unit: "",
			pattern: "^[a-zA-Z0-9\u4e00-\u9fa5]{2,40}$",
			type: "prompt"
		},
		{
			el:"#evaluate [name='evalu']",
			message: "输入您的技术自评",
			placeholder: "",
			title: "技术自评",
			btn: ["取消", "确认"],
			unit: "",
			pattern: "^[a-zA-Z0-9\u4e00-\u9fa5]{2,40}$",
			type: "prompt"
		},
		{
			el:"#experience [name='exper']",
			message: "输入您的技术经验",
			placeholder: "",
			title: "技术经验",
			btn: ["取消", "确认"],
			unit: "",
			pattern: "^[a-zA-Z0-9\u4e00-\u9fa5]{2,40}$",
			type: "prompt"
		},{
			el:"#apply [name='job_city']",
			message: "输入您期望的工作地点",
			placeholder: "",
			title: "求职地点",
			btn: ["取消", "确认"],
			unit: "",
			pattern: "^[a-zA-Z0-9\u4e00-\u9fa5]{2,40}$",
			type: "prompt"
		},{
			el:"#apply [name='job_salary']",
			message: "输入您期望的薪资要求",
			placeholder: "",
			title: "薪资要求",
			btn: ["取消", "确认"],
			unit: "",
			pattern: "^[a-zA-Z0-9\u4e00-\u9fa5]{2,40}$",
			type: "prompt"
		},{
			el:"#apply [name='job_name']",
			message: "输入您的求职岗位",
			placeholder: "",
			title: "求职岗位",
			btn: ["取消", "确认"],
			unit: "",
			pattern: "^[a-zA-Z0-9\u4e00-\u9fa5]{2,40}$",
			type: "prompt"
		},
		{
			el:"#apply [name='job_hiredate']",
			message: "输入您的入职时间",
			placeholder: "",
			title: "入职时间",
			btn: ["取消", "确认"],
			unit: "",
			pattern: "^[a-zA-Z0-9\u4e00-\u9fa5]{2,40}$",
			type: "prompt"
		}
	];
//	alert($("#education [name = 'school'] .value").text());

	$(".operate").on("tap", function()  {
		if($(this).text() == "修改") {//点击，修改变为保存
			$(this).text("保存");
			var tem;
			for(tem in array) {
				clickItem(array[tem]);
			}
		
			$("#education .btn1").on("tap", function()  {
				//绑定已有控件的点击事件
				for(tem in array) {
					if(array[tem].type == "editor") {
						$(array[tem].el).removeAttr("Eleditor-Inited");
					} else {
						$(array[tem].el).unbind("tap");
					}
				}
				var li = '<dt name= ' + "dynamic" + tem +'>教育经历&nbsp;&nbsp;(长按删除)</dt><dd><a name="school"><span class="label">毕业学校</span><span class="value"><i class="iconfont icon-enter"></i></span></a></dd><dd><a name="major"><span class="label">所学专业</span><span class="value"><i class="iconfont icon-enter"></i></span></a></dd><dd><a name="education"><span class="label">学历</span><span class="value"><i class="iconfont icon-enter"></i></span></a></dd><dd><a name="year"><span class="label">毕业年份</span><span class="value"><i class="iconfont icon-enter"></i></span></a></dd>';
				$("#education dl").append(li);
				//为所有控件重新绑定点击事件
				for( tem in array) {
					clickItem(array[tem]);
				}
				
				
				//为所有动态的内容解除长按事件
				$("[name='dynamic']").unbind("longtap");
				//为所有的动态内容绑定长按事件
				$("[name='dynamic']").on("longtap", function() {
					//TODO 震动
					//plus.device.vibrate(100);
					var obj = $(this);
					mui.confirm("是否删除选中的内容", "提示信息", ["否", "是"], function(result) {
						if(result.index == 1) {
							obj.nextUntil("dt").remove();
							obj.remove();
						}
					}, "div");
				});
			});
			
			$("#work .btn1").on("tap", function() {
				//绑定已有控件的点击事件
				for(tem in array) {
					if(array[tem].type == "editor") {
						$(array[tem].el).removeAttr("Eleditor-Inited");
					} else {
						$(array[tem].el).unbind("tap");
					}
				}
				var li = '<dt name="dynamic2">工作经历</dt><dd><a name="company"><span class="label">企业名称</span><span class="value"><i class="iconfont icon-enter"></i></span></a></dd><dd><a name="hiredate"><span class="label">入职时间</span><span class="value"><i class="iconfont icon-enter"></i></span></a></dd><dd><a name="leavedate"><span class="label">离职时间</span><span class="value"><i class="iconfont icon-enter"></i></span></a></dd><dd><a><span class="label">工作内容</span><span class="value"><i class="iconfont icon-enter"></i></span></a><div name="content"></div></dd>';
				$("#work dl").append(li);
				//为所有控件重新绑定点击事件
				for( tem in array) {
					clickItem(array[tem]);
				}
				//为所有动态的内容绑定长按事件
				$("[name='dynamic2']").unbind("longtap");
				//为所有的动态内容绑定长按事件
				$("[name='dynamic2']").on("longtap", function() {
					//TODO 震动
					//plus.device.vibrate(100);
					var obj = $(this);
					mui.confirm("是否删除选中的内容", "提示信息", ["否", "是"], function(result) {
						if(result.index == 1) {
							obj.nextUntil("dt").remove();
							obj.remove();
						}
					}, "div");
				});
			});

		} else {
			$(this).text("修改");
			console.log("sex:"+v_sex);
			console.log("birthday:"+v_birthday);
			console.log("height:"+v_height);
			console.log("weight:"+v_weight);
			console.log("married:"+v_married);
			console.log("city:"+v_city);
			console.log("education:"+v_education);
			console.log("tel:"+v_tel);
			console.log("email:"+v_email);
			console.log("education_list:"+v_education_list);
			console.log("work_list:"+v_work_list);
			console.log("introduction:"+v_introduction);
			console.log("evaluate:"+v_evaluate);
			console.log("experience:"+v_experience);
			console.log("job_city:"+v_job_city);
			console.log("job_salary:"+v_job_salary);
			console.log("job_name:"+v_job_name);
			console.log("job_hiredate:"+v_job_hiredate);
			$.ajax({
					url:nebula+"/saveresume/update",
					type:"post",
					data:{
						sex:v_sex,
						birthday:v_birthday,
						height:v_height,
						weight:v_weight,
						married:v_married,
						city:v_city,
						education:v_education,
						tel:v_tel,
						email:v_email,
						introduction:v_introduction,
						evaluate:v_evaluate,
						experience:v_experience,
						education_list:v_education_list,
						work_list:v_work_list,
						job_name:v_job_name,
						job_city:v_job_city,
						job_salary:v_job_salary,
						job_hiredate:v_job_hiredate
					},	
					beforeSend:function(request){
					request.setRequestHeader("Authorization",localStorage.getItem("token"));
					},
					success:function(json){
						//ref.recruit_info=json.data;
						mui.toast("简历信息保存成功");
					},
					error:function(error){
						console.log(JSON.stringify(error));
						mui.toast("执行错误");
					}
					});
			
			    }
			});
			var temp;
			for(temp in array) {
				if(array[temp].type == "editor") {
					var editor=$(array[temp].el).data("editor");
					//editor.destory();
					$(array[temp].el).removeData("editor");
				} else {
					$(array[temp].el).unbind("tap");
				}
			}
			$(".btn[name='add']").unbind("tap");
			var dynamic = $("[name='dynamic']")
			dynamic.text(dynamic.text().substring(0,4))
			
			
			new Vue({
				el:"#info_1",
				data:{
					photo_path:"",
					name:"",
					auth:""
				},
				methods:{
					takePicture:function() {
						if(mui.os.plus) {
					        var a = [{
					            title: "拍照"
						    },{
						        title: "从手机相册选择"
						    }];
						    plus.nativeUI.actionSheet({
						        title: "修改用户头像",
						        cancel: "取消",
						        buttons: a
						    }, function(b) { /*actionSheet 按钮点击事件*/
						        switch(b.index) {
						        case 0:
						            break;
						        case 1:
						            getImage(); /*拍照*/
						            break;
						        case 2:
						            galleryImg(); /*打开相册*/
						            break;
						        default:
						            break;
						        }
						    });
					    }
					}
				},
				mounted:function(){
					document.getElementById("head").src=path;
					var ref = this;
					var temp="";
					$.ajax({
						type:"post",
						url:nebula+"/resume/searchResumeInfo",
						data:{
							
						},
						beforeSend:function(request){
							request.setRequestHeader("Authorization",localStorage.getItem("token"));						
						},
						success:function(json){
							ref.photo_path=picture+"/"+json.data.photo_path.split("/")[2];
							document.getElementById("head").src=path;
							ref.name=json.data.name;
							ref.auth=json.data.auth;
						},
						error:function(error){
							console.log(JSON.stringify(error));
							mui.toast("执行异常")
						}
					});
				}
			});
});
	
mui.init({
	
    beforeback: function() {

　　　　 //获得父页面的webview

        var list = plus.webview.currentWebview().opener();

　　　　 //触发父页面的自定义事件(refresh),从而进行刷新

        mui.fire(list, 'refresh');

        //返回true,继续页面关闭逻辑

        return true;

    }
});

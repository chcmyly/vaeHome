function checkUsername(username){
	var reg=/^(?!(\d+)$)[\u4e00-\u9fffa-zA-Z\d\-_]+$/;/*/^[a-zA-Z0-9_]{3,15}$/;*//*/^[a-zA-Z\x{4e00}-\x{9fa5}]{6,20}$/u*/
	return reg.test(username);
}

function checkPassword(password){
	var reg=/^[a-zA-Z0-9_]{6,20}$/;
	return reg.test(password);
}

function checkEmail(userEmail){
	var reg=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
	return reg.test(userEmail);
}

function checkPhonenum(Phonenum){
	var reg=/^[1][3,4,5,6,7,8][0-9]{9}$/;
	return reg.test(Phonenum);
}
function checkCity(City){
	var reg= /^[\u4e00-\u9fa5]+$/;
	return reg.test(City);
}

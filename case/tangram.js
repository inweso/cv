function upDown(ud){
	var num = document.getElementById("num");
	var  divId = "div" + num.value;
	var device = document.getElementById(divId);
	device.style.top = parseInt(device.offsetTop) + ud + "px";
}
function leftRight(ud){
	var num = document.getElementById("num");
	var  divId = "div" + num.value;
	var device = document.getElementById(divId);
	device.style.left = parseInt(device.offsetLeft) + ud + "px";
}
function rotate(){
	var num = document.getElementById("num");
	var  divId = "div" + num.value;
	var device = document.getElementById(divId);
	var angle = document.getElementById("angle").value;
	device.style.transform = "rotate(" +  angle + "deg)";
	console.log(num);
	console.log(divId);
	console.log(device);
	console.log(angle);
	console.log(device.style.transform);
}
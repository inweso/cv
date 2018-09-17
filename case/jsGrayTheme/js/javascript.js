function goTop(obj , target){
	clearInterval(obj.timer);
	window.onscroll = function(){
		if(document.documentElement.scrollTop >= 300 || document.body.scrollTop >=300){
			obj.style.visibility = "visible";
		}else{
			obj.style.visibility = "hidden";
		}
	}
	obj.onclick = function(){
		obj.timer = setInterval(function(){
			var current = document.documentElement.scrollTop || document.body.scrollTop;
			var speed = (target - current) / 10;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			document.documentElement.scrollTop = document.body.scrollTop = current + speed;
			if(current == 0){
				clearInterval(obj.timer);
			}
		},20);
	}
}


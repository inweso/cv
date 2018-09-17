$(document).ready(function(){
	//点击隐藏简历节点
	$(".close-button").click(function(){
		$(this).parent().fadeOut("slow");
	});

	//打开遮罩
	$("#show-shade").click(function(){
		$("#shade").animate({width:"100%",height:"100%"},"fast");
	});

	//关闭遮罩
	$("#shade-close").click(function(){
		$("#shade").animate({width:0,height:0},"fast");
	});

	//背景轮播
	function slide(id,child){
		var box = document.getElementById(id);
		var lists = box.getElementsByTagName(child);
		var lists_num = 0;
		setInterval(function(){
			for(let i = 0; i < lists.length; i++){
				lists[i].className = "";
			}
			lists_num++;
			if(lists_num >= lists.length){
				lists_num = 0;
			}
			lists[lists_num].className = "bg-show";
		},3000);
	}
	setTimeout(slide("bg","li"),3000);
});
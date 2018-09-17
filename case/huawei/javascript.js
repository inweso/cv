$(document).ready(function(){
	//顶部大banner关闭
	$("#btn-close-max").click(function(){
		$(".top-banner-max").hide(1000);
		$(".top-banner-min").show(1000);
	});

	//顶部小banner关闭
	$("#btn-close-min").click(function(){
		$(".top-banner-min").hide(1000)
	});

	//搜索框焦点事件（搜索关键词的显示/隐藏）
	$(".search .search-text").focus(function(){
		$(".search .search-key").hide();
	});
	$(".search .search-text").blur(function(){
		$(".search .search-key").show();
	});

	/*轮播图背景*/
	$(".banner a").each(function(index){
		$(this).css("background-image","url(./images/banner"+(index+1)+".jpg)");
		$(".banner-btn").append($("<span></span>"));//动态插入轮播图按钮
	});
	$(".banner2 a").each(function(index){
		$(".banner2-btn").append($("<span></span>"));//动态插入首页中间小轮播图按钮
	});
	slideShow(".banner",".banner li",".banner-btn span");//首页分类大banner
	slideShow(".banner2",".banner2 li",".banner2-btn span");//首页中间小banner

	/*轮播图切换效果*/
	function slideShow(parent, lists, btn){
		let current = 0;
		$(btn).eq(current).addClass("current");
		let timer;
		timer = setInterval(auto,5000);

		/*自动切换图片*/
		function auto(){
			current++;
			if(current>=$(lists).length){
				current = 0;
			}
			play();			
		}

		/*鼠标进入离开事件*/
		$(parent).mouseover(function(){
			clearInterval(timer);
		});
		$(parent).mouseout(function(){
			timer = setInterval(auto,5000);
		});

		/*轮播图按钮事件*/
		$(btn).each(function(index){
			$(this).hover(function(){
				current = index;
				play();
			});
		});

		/*图片切换和按钮样式*/
		function play(){
			$(lists).eq(current).siblings().fadeTo("slow",0);
			$(lists).eq(current).fadeTo("slow",1);
			$(btn).eq(current).addClass("current");
			$(btn).eq(current).siblings().removeClass("current");
		}
	}/*轮播图切换效果结束*/
	
	/*滚动公告*/
	animateUp()
	function animateUp(){
		$("#notice-lists").append("<li>" + $("#notice-lists").children().first().html() + "</li>");
		let index = 1;
		setInterval(function(){
			let css = {
				top: index * -48 +"px"
			}
			index++;
			if(index>=$("#notice-lists").children().length+1){
				index = 0;
				$("#notice-lists").css("top",0);
				css.top = 0;
			}
			$("#notice-lists").animate(css,666);
		},2000);
	}/*滚动公告结束*/

	
	/*精品推荐*/
	$(".arrow-left").click(function(){
		if(parseInt($(".recomm-lists ul").css("left")) >= 0){
			$(".arrow-left").css("cursor","not-allowed");
		}else if(parseInt($(".recomm-lists ul").css("left")) >= -1198){//防止过头
			$(".recomm-lists ul").css("left","0px");
		}else{
			$(".recomm-lists ul").css("left",(parseInt($(".recomm-lists ul").css("left"))+1198) + "px");
			$(".arrow-right").css("cursor","pointer");
		}
	});

	$(".arrow-right").click(function(){
		if(parseInt($(".recomm-lists ul").css("left")) <= -4772){
			$(".arrow-right").css("cursor","not-allowed");
		}else if(parseInt($(".recomm-lists ul").css("left")) <= -3574){//防止过头
			$(".recomm-lists ul").css("left","-4772px");
		}else{
			$(".recomm-lists ul").css("left",(parseInt($(".recomm-lists ul").css("left"))-1198) + "px");
			$(".arrow-left").css("cursor","pointer");
		}
	});

	/*返回顶部*/
	$(window).scroll(function(){
		if($("html,body").scrollTop()>=900){
			$(".gotop-btn").css("display","block");
		}else{
			$(".gotop-btn").css("display","none");
		}
	});
	$(".gotop-btn").click(function(){
		$("html,body").animate({scrollTop:0},"slow");
	});

});
/**
 * description：轮播效果
 * author：Wiz
 * update: 2017/11/20
 * exportsUsage: autoSlide.init();
 * @return {[type]}         [description]
 */

(function(){
	var num = 0;
	var newSlideBox;
	function AutoSlide(){}

	AutoSlide.prototype = {
		/*
			初始化函数
		 */
		init:function(){
			var initParam = {
				"slider": document.getElementById("slidePic"),
				"focus": document.getElementsByClassName("focus")[0]
			}
			this.timer = null;
			//判断是手机还是电脑打开，选择初始化
			if(this.isPhone()){
				this.phoneSlide(initParam);
			}else{
				var obj = this.drawSlide(initParam);
				this.computeStart(initParam,obj);
			}
		},
		/*
			电脑轮播
		 */
		computeStart: function(param,obj){
			var _this = this;
			this.timer = setTimeout(function(){
				num += 1;
				_this.computerSlide(param,obj,num);
				_this.computeStart(param,obj);
			},3000);
		},
		computerSlide: function(param,obj,n){
			var moveBox = obj.slideFocus.parentNode.getElementsByClassName("slide-box")[0];
			var left = Number(moveBox.parentNode.offsetWidth);
			if(n == moveBox.children.length-1){
				newSlideBox = moveBox.cloneNode(true);
				newSlideBox.style["left"] = left + "px";
				param["focus"].appendChild(newSlideBox);
			}else if(n >= moveBox.children.length){
				moveBox.style["left"] = -n*left + "px";
				num = n = 0;
				moveBox = newSlideBox;
				moveBox.style["left"] = -n*left + "px";
				obj.slideFocus.getElementsByClassName("on")[0].className = "";
				obj.slideFocus.children[n].className = "on";
				setTimeout(function(){
					obj.slideFocus.parentNode.getElementsByClassName("slide-box")[0].remove();
				},1000);
				return;
			}
			//获取slide-box父容器的宽度
			moveBox.style["left"] = -n*left + "px";
			moveBox.style["width"] = (moveBox.children.length)*left + "px";
			//清除之前的标记
			obj.slideFocus.getElementsByClassName("on")[0].className = "";
			obj.slideFocus.children[n].className = "on";
		},
		/*
			当鼠标点击左右按钮时
		 */
		/*
			手机轮播
		 */
		phoneSlide: function(param){
			alert("这不是手机");
		},
		/*
			判断是否为手机打开
		 */
		isPhone: function(){
			var agentInfo = navigator.userAgent;
			//手机系统名
			var agents = ["Android","iphone","SymbianOS","Windows Phone","iPad","iPod"];
			var flag = true;
			for(var i = 0;i < agents.length;i++){
				if(agentInfo.indexOf(agents[i] != -1)){flag = false;break;}
			}
			return flag;
		},
		/*
			绘制轮播图的结构
		 */
		drawSlide: function(param){
			var _this = this;
			//create slide box
			var slideBox = document.createElement("div");
			//获取slide-box父容器的宽度
			var width = Number(param["slider"].parentNode.offsetWidth);
			slideBox.className = "slide-box";
			slideBox.style["width"] = (param["slider"].children.length)*width + "px";
			//创建焦点的容器
			var slideFocus = document.createElement("div");
			slideFocus.className = "slide-focus";
			var obj = {
				"slideBox": slideBox,
				"slideFocus": slideFocus
			}
			for(var i = 0;i < param["slider"].children.length;i++){
				var imgDiv = document.createElement("div");
				var focusSpan = document.createElement("span");
				/*
					当鼠标至于焦点上时效果
				 */
				focusSpan.onmouseover = function(){
					var e = event.target;
					if(e.className.indexOf("on") < 0){
						num = Number(e.getAttribute("data-index"));
						_this.computerSlide(param,obj,num);
					}
				}
				imgDiv.style["background-image"] = "url(" + param["slider"].children[i].getAttribute('src') + ")";
				focusSpan.setAttribute("data-index",i);
				slideBox.appendChild(imgDiv);
				slideFocus.appendChild(focusSpan);
			}
			//设置轮播图焦点初始标记
			slideFocus.children[0].className = "on";
			param["focus"].appendChild(slideBox);
			param["focus"].appendChild(slideFocus);
			param["slider"].remove();
			param["focus"].onmouseover = function(){
				clearTimeout(_this.timer);
			}
			param["focus"].onmouseout = function(){
				_this.computeStart(param,obj);
			}
			return obj;
		}
	}
	var autoSlides = new AutoSlide();
	window["autoSlide"] = autoSlides;
})();

/*(function(root,factory,plug){
	factory(root,plug);
})(window,function(root,plug){
	var imgs = document.getElementsByClassName("slide-box")[0].children;//slider image container
	var sfs = document.getElementsByClassName("slide-focus")[0].children;//slide focus.children//
	var num = 0;
	function move(n){
		n == imgs.length ? (num = n = 0):n;
		imgs[n].className = "active";
		sfs[n].className = "on";
		for(var i=0;i<imgs.length;i++){
			if(i == n){
				continue;
			}
			imgs[i].className = "";
			sfs[i].className = "";
		}
		num += 1;
	}
	(function(){
		for(var i=0;i<sfs.length;i++){
			sfs[i].onmouseover = function(event){
				num = Number(event.target.getAttribute("data-index"));
				move(num);
			};
		}
	})();
	setInterval(function(){
		move(num);
	},2000);
	
},"slider");*/
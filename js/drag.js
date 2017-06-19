addEvent(window,"load",function(){
	function Drag(obj){//构造函数  this指实例化对象
		this.attr=obj;
		//获取浏览器窗口的宽高
		this.dw=document.documentElement.clientWidth;
		this.dh=document.documentElement.clientHeight;
		//获取实例化对象的宽高
		this.ow=this.attr.offsetWidth;
		this.oh=this.attr.offsetHeight;
	}
	Drag.prototype={
		drag:function(){
			this.down();
		},
		down:function(){
			//保存实例化对象
			var that=this;
			this.attr.onmousedown=function(e){
				var ev=e||window.event;
				//保存距离事件源左、上的距离
				that.ox=ev.offsetX;
				that.oy=ev.offsetY;
				that.move();
				that.up();
			}
		},
		up:function(){
			this.attr.onmouseup=function(){
				document.onmousemove=null;
			}
		},
		move:function(e){
			var that=this;
			document.onmousemove=function(e){
				var ev=e||window.event;
				that.cx=ev.clientX;
				that.cy=ev.clientY;
				that.left=that.cx-that.ox;
				that.top=that.cy-that.oy;
				if(that.left<=0){
					that.left=0;
				}
				if(that.top<=0){
					that.top=0;
				}
				if(that.left>=that.dw-that.ow){
					that.left=that.dw-that.ow
				}
				if(that.top>=that.dh-that.oh){
					that.top=that.dh-that.oh
				}
				that.attr.style.left=that.left+"px";
				that.attr.style.top=that.top+"px";
			}
			
		}
	}
	var box=$("#box");
	var newdrag=new Drag(box);
	newdrag.drag();
})
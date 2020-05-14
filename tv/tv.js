function flash(url){  
 var videoObject = {
		container: '#myElement',//“#”代表容器的ID，“.”或“”代表容器的class
		variable: 'player',//该属性必需设置，值等于下面的new chplayer()的对象
		autoplay:true,//自动播放
		live:true,//直播视频形式
		video:url,//视频地址
	};
	var player=new ckplayer(videoObject);
}


function hls(url){
	var videoObject = {
		container: '#myElement',//“#”代表容器的ID，“.”或“”代表容器的class
		variable: 'player',//该属性必需设置，值等于下面的new chplayer()的对象
		autoplay:true,
		html5m3u8:true,
		video:url//视频地址
	};
	var player=new ckplayer(videoObject);
	
}




function frame(url){if(url){document.getElementById('myElement').innerHTML='<iframe border="0" marginWidth="0" frameSpacing="0" marginHeight="0" src="'+url+'" frameBorder="0" noResize width="100%" height="100%" vspace="0" scrolling="no"></iframe>';}}

function m(){
 var	isMobile = /android|phone|mobi|ipad|ipod|blackberry|symbian|midp|ios/i.test(navigator.userAgent.toLowerCase());	
var m1 = document.getElementById("m1");
var m2 = document.getElementById("m2");
var m3 = document.getElementById("m3");
var m4 = document.getElementById("m4");
if (isMobile){
	m2.style.display="none";
	m4.style.display="none";
}else {
m1.style.display="none";
m3.style.display="none";
}}




 window.onload = function(){
 function hh(){	
 var div1 = document.getElementById("myElement");
 var width=parseInt(div1.style.width) || div1.offsetWidth;
 div1.style.height=width*0.55 + "px";}
 hh();
 window.onresize=function(){hh()}
 }


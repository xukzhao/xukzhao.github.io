
 function uu(u){   
var	isMobile = /android|phone|mobi|ipad|ipod|blackberry|symbian|midp|ios/i.test(navigator.userAgent.toLowerCase());
	z = 0;
if (isMobile) {
	document.getElementById('myElement').innerHTML = '<' + 'video autoplay="autoplay" src="' + u + '" controls="controls" width="100%" height="100%" preload="auto"' + '></' + 'video>'
} else {
    var flashvars = {
	f: 'http://www.icantv.cn/ckplayer/m3u8.swf',
	a: encodeURIComponent(u),
	lv: 1,
	c: 0,
	s: 4,
	v:100,
	wh:'16:9',
	p: 1
};
	var params = {
		bgcolor: '#FFF',
		allowFullScreen: true,
		allowScriptAccess: 'always',
		wmode: 'transparent'
	};
	CKobject.embedSWF('http://www.icantv.cn/ckplayer/ckplayer.swf', 'myElement', 'ckplayer_a1', '100%', '100%', flashvars, params)
}} 

function frame(url){if(url){document.getElementById('myElement').innerHTML='<iframe border="0" marginWidth="0" frameSpacing="0" marginHeight="0" src="'+url+'" frameBorder="0" noResize width="100%" height="100%" vspace="0" scrolling="no"></iframe>';}}

function m(){
 var	isMobile = /android|phone|mobi|ipad|ipod|blackberry|symbian|midp|ios/i.test(navigator.userAgent.toLowerCase());	
var m1 = document.getElementById("m1");
var m2 = document.getElementById("m2");
if (isMobile){
	m2.style.display="none";
}else {
m1.style.display="none";
}}




 window.onload = function(){
 function hh(){	
 var div1 = document.getElementById("myElement");
 var width=parseInt(div1.style.width) || div1.offsetWidth;
 div1.style.height=width*0.55 + "px";}
 hh();
 window.onresize=function(){hh()}
 }


// var div1 = document.getElementById('pic1');
// var div2 = document.getElementById('pic2');
// var div3 = document.getElementById('pic3');
// div1.onmouseover = function(){
// 	div1.getElementsByTagName('a')[0].style.top=0;
// }
// div1.onmouseout = function(){
// 	div1.getElementsByTagName('a')[0].style.top=160px;
// }


// function showMeg(index){
// 	var Div = document.getElementById('pic'+index);
// 	Div.onmouseover= showAtop;
// 	Div.onmouseover= hideAtop;
// 	function showAtop(){
// 		Div.getElementsByTagName('a')[0].style.top=0;
// 	}
// 	function hideAtop(){
// 		Div.getElementsByTagName('a')[0].style.top=160+'px';
// 	}
// }
// showMeg(1);
// showMeg(2);
// showMeg(3);

function showDetail(){
	var Div = document.getElementById('picList').getElementsByTagName('div');
	var divHeight = 160+'px';
	for (var i = 0; i < Div; i++){
		Div[i].onmouseover = showMeg;
		Div[i].onmouseout = hideMeg;
	}
	function showMeg(){
		this.getElementsByTagName('a')[0].style.top = 0;
	}
	function hideMeg(){
		this.getElementsByTagName('a')[0].style.top = divHeight;
	}
}
showDetail();
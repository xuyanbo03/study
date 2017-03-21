function $(id) {
	return typeof id==='string'?document.getElementsById();
}
window.onload=function(){
	var titles=$('notice-tit').getElementsByTagName('li');
		divs=$('notice-con').getElementsByTagName('div');
	if(titles.length!=divs.length)
		return;
	for (var i = 0; i <titles.length; i++) {
		titles[i].id=i;
		titles.onmouseover=function(){
			for(var j=0;j<titles.length;j++){
				divs[j].style .display=none;
				titles[j].className='';
			}//清除所有li的class
			this.className='select';//高亮显示
			divs[this.id].style.display='block';
		}
	}
}
var falls = {
	topArry:[0,0,0,0,0],
	leftArry:[],
	imgArray:[],
	num:0,
	dataNum:9
}

$(function(){
	getData();
	getMinHeight();
	
});

function getData(){
	$.getJSON(
		"json/falls.json",
		function(data){
			if(data.success){
				var row = data.row,
					len = row.length,
					html = "";
				for(var i = 0;i < len;i++){
					html += "<div class='img-box'>"
						 + "<img src='"+row[i].src+"'/></div>";
				}
				$("#container").append(html);	
				getLeft();
				if(getMinHeight()<window.screen.height){
					getData();
				}

				falls.imgArray = [];
				
				$("#container .img-box").each(function(i){
					if(i >= falls.num){
						falls.imgArray.push(this);
					}
				})
				falls.num += falls.dataNum;
				//修改位置
				reset();
			}
		}
	)	
}

function getMinHeight(){
	var minHeight = Math.min.apply(null,falls.topArry);
	return(minHeight);
}

function getLeft(){
	for(var i = 0; i < 5; i++){
		var left = $("#container .img-box").eq(i).offset().left;
		falls.leftArry.push(left);
	}
}

function reset(){
	var img = falls.imgArray;
	for (var i = 0,len = img.length; i < len; i++) {
		var	minHeight = getMinHeight(),
			index = 0;

		for(var x = 0;x < falls.dataNum; x++){
			if(minHeight == falls.topArry[x]){
				index = x;
				break;
			}			
		}
		$(img[i]).css({
			"position":"absolute",
			"top":minHeight,
			"left":falls.leftArry[index]
		});

		falls.topArry[index] += $(img[i]).height();
	}
}

window.onscroll = function(){
	var minHeight = getMinHeight();
	if(window.scrollY>minHeight/2){
		getData();
	}
}

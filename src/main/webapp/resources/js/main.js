const IS_DEBUG = true;

function logNow(logContents){
    if(IS_DEBUG){
        console.log(logContents);
    }
}

$(document).ready(function(){
	initKiosk();
	initJson("korean");
});

var global_json = null;
function initJson(language) {
	$.getJSON( "./resources/" + language + ".json", function(data){
		global_json = data;
	});
}

function initKiosk() {
	$('#div_contents').hide();
	$('#div_contents2').hide();
	$('#div_side_detail').hide();
	
	$('#div_side').hide();
	$('#img_shadow').hide();
	
	$('#div_main').attr('onclick', 'initMain();');
}

function initMain() {
	$('#div_main').removeAttr('onclick');
	
	$('#div_contents').show();
	$('#div_side').show();
	$('#img_shadow').show();
	
	showSideBottom();
	showMain();
	showSideTop(0);
}

function showSideBottom() {
	var html_string = "";
	
	for(var i = 0; i < 2; i++){
		html_string += '<div id="div_side' + (i + 10) + '" class="div_side_bottom" onclick="javascript:setSideBottom(' + i + ');"></div>';
	}
	
	$('#div_side_bottom').html(html_string);
}

function setSideBottom(index_num) {
	switch (index_num) {
		case 0: {
			alert("뒤로가기");
			break;
		}
		case 1: {
			alert("홈");
			break;
		}
	}
}

function showMain() {
	var html_string = "";
	
	for(var i = 0; i < 5; i++){
		html_string += '<div id="div_area' + i + '" onclick="javascript:setMainArea(' + i + ');"></div>';
	}
	
	$('#div_contents').html(html_string);
	$('#div_contents').css('background-image', 'url(./resources/image/temp_main.png)');
}

function setMainArea(index_num) {
	switch (index_num) {
		case 0: {
			alert("area0");
			break;
		}
		case 1: {
			showArea1();
			break;
		}
		case 2: {
			alert("area2");
			break;
		}
		case 3: {
			alert("area3");
			break;
		}
		case 4: {
			alert("area4");
			break;
		}
	}
}

function showSideTop(index_num) {
	var html_string = "";
	
	switch (index_num) {
		//메인
		case 0: {
			for(var i = 0; i < 3; i++){
				html_string += '<div id="div_main_side' + i + '" class="div_main_side_top" onclick="javascript:setMainSide(' + i + ');"></div>';
			}
			html_string += '<div style="width:100%; height:30px;"></div>';
			for(var i = 3; i < 8; i++){
				html_string += '<div id="div_main_side' + i + '" class="div_main_side_mid" onclick="javascript:setArea1(' + (i - 3) + ');"></div>';
			}
			
			$('#div_side_top').css('background-image', 'url(./resources/image/temp_main_side.png)');
			break;
		}
		//원더아리아
		case 1: {
			for(var i = 0; i < 6; i++){
				html_string += '<div id="div_side_area1_0_' + i + '" class="div_side_area1_0" onclick="javascript:setSideArea1_0(' + i + ');"></div>';
			}
			
			$('#div_side_top').css('background-image', 'url(./resources/image/temp_area1_0_side_top.png)');
			break;
		}
		case 2: {
			break;
		}
		case 3: {
			break;
		}
	}
	
	$('#div_side_top').html(html_string);
	
}

function setMainSide(index_num) {
	switch (index_num) {
		case 0: {
			alert("이벤트");
			break;
		}
		case 1: {
			alert("운영시간");
			break;
		}
		case 2: {
			alert("주변관광지");
			break;
		}
	}
}
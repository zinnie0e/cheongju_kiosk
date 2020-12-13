const IS_DEBUG = true;

function logNow(logContents){
    if(IS_DEBUG){
        console.log(logContents);
    }
}

$(document).ready(function(){
	initKiosk();
	initJsonPromotion();
});

var global_json = null;
function initJson(language) {
	$.ajax({
		async: false,
		dataType: "json",
		url: "./resources/" + language + ".json",
		success: function (result) {
			global_json = result;
		}
	});
}

var promotion_json = null;
function initJsonPromotion() {
	$.ajax({
		async: false,
		dataType: "json",
		url: "./resources/temp_promotion.json",
		success: function (result) {
			promotion_json = result.promotion;
			initPromotion(true);
		}
	});
}

var promotion_timer = null;
var promotion_num = 0;
function initPromotion(play) {
	if(play){
		$('#div_promotion').show();
		$('#div_promotion').css('background-image', promotion_json[promotion_num]);
		promotion_timer = setInterval(() => {
			$('#div_promotion').css('background-image', promotion_json[promotion_num]);
			
			promotion_num++;
			if(promotion_num >= promotion_json.length){
				promotion_num = 0;
			}
		}, 6 * 1000);
	} else {
		clearInterval(promotion_timer);
		$('#div_promotion').hide();
	}
}

function initKiosk() {
	$('#div_contents').hide();
	$('#div_contents2').hide();
	$('#div_side_detail').hide();
	
	$('#div_side').hide();
	$('#img_shadow').hide();
	
	
	$('#div_main').attr('onclick', 'initMain();');
	
	initJson("korean");
	initJsonPromotion();
}

function initMain() {
	$('#div_main').removeAttr('onclick');
	
	initPromotion(false);
	
	$('#div_contents').show();
	$('#div_side').show();
	$('#img_shadow').show();
	
	showSideBottom();
	showMain();
	showSideTop(1);
}

function showSideBottom() {
	var html_string = "";
	
	html_string += '<div id="div_side_back" class="div_side_bottom" onclick="javascript:backPage(0);"></div>';
	html_string += '<div id="div_side_home" class="div_side_bottom" onclick="javascript:history.go(0);"></div>';
	
	$('#div_side_bottom').html(html_string);
}

function showMain() {
	var html_string = '<div id="div_language">';
	for(var i = 0; i < 4; i++){
		html_string += '<div id="div_language' + i + '" class="div_language" onclick="javascript:setMainLanguage(' + i + ');"></div>';
	}
	html_string += '</div>';
	
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
		case 1: {
			for(var i = 0; i < 3; i++){
				html_string += '<div id="div_main_side' + i + '" class="div_main_side_top" onclick="javascript:setMainSide(this, ' + i + ');"></div>';
			}
			html_string += '<div style="width:100%; height:30px;"></div>';
			for(var i = 3; i < 8; i++){
				html_string += '<div id="div_main_side' + i + '" class="div_main_side_mid" onclick="javascript:setArea1(this, ' + (i - 3) + ');"></div>';
			}
			
			$('#div_side_top').css('background-image', 'url(./resources/image/temp_main_side.png)');
			break;
		}
		//원더아리아
		case 11: {
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

function resetSide(){
	$('.div_main_side_top').css('background-color', '');
	$('.div_main_side_mid').css('background-color', '');
}

function setSide(document){
	resetSide();
	$(document).css('background-color', 'aqua');
}

function setMainSide(document, index_num) {
	setSide(document);
	switch (index_num) {
		case 0: {
			alert("이벤트");
			break;
		}
		case 1: {
			$('#div_contents').html('');
			$('#div_contents').css('background-image', 'url(./resources/image/temp_operating.png)');
			break;
		}
		case 2: {
			alert("주변관광지");
			break;
		}
	}
	
	backPage(1);
}

function setMainLanguage(index_num) {
	switch (index_num) {
		case 0: {
			alert("kr");
			break;
		}
		case 1: {
			alert("en");
			break;
		}
		case 2: {
			alert("ch");
			break;
		}
		case 3: {
			alert("jp");
			break;
		}
	}
}

function backPage(current_depth){
	switch (current_depth) {
		case 0: {
			history.go(0);
			break;
		}
		case 1: {
			$('#div_side_back').attr('onclick', 'initMain();');
			break;
		}
		case 2: {
			$('#div_side_back').attr('onclick', 'showArea1();');
			break;
		}
	}
}
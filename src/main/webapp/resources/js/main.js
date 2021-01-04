const IS_DEBUG = true;

function logNow(logContents){
    if(IS_DEBUG){
        console.log(logContents);
    }
}

$(document).ready(function(){
	initKiosk();
	initJsonPromotion();
	resetTimer();
	startTimer();
	getPollution();
});

var initSeconds = 60; // 타이머 초
var remainSeconds;
function resetTimer(){ // 타이머 초기화 함수
	remainSeconds = initSeconds; 
}

function startTimer(){ // 타이머 시작 함수
	logNow(remainSeconds);
	if(remainSeconds > 0){
		remainSeconds -= 1;
		setTimeout("startTimer()",1000); //1초간격으로 재귀호출
	}else{
		history.go(0);
	}
}

var global_json = null;
function initJson(language) {
	$.ajax({
		async: false,
		dataType: "json",
		url: "./resources/string/" + language + ".json",
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
		}, 15 * 1000);
	} else {
		clearInterval(promotion_timer);
		$('#div_promotion').hide();
	}
}
function getPollution(){
	$.getJSON( "./resources/apival/pollution.jsp", function( pollutionData ) {
		logNow(pollutionData);
		poll_info = 'url(./resources/image/main/dust_icon_';
		var compare = pollutionData.compare;
		if(compare == 1)
			poll_info += "good.png";
		else if(compare == 2)
			poll_info += "ordinary.png";
		else if (compare == 3)
			poll_info += "bad.png";
		$('#ticker_finedust_icon').css('background-image', poll_info);
	});
	
}
function getTemperature(){ //기온
    $.getJSON( "./resources/apival/temperature.jsp", function( data ) {
    	var maxtem; var mintem;
    	var wea_info = 'url(./resources/image/main/weather_icon_';

        if(data != undefined && !isNaN(data.mintem) && !isNaN(data.maxtem) && !isNaN(data.weaCode)) {
        	if(data.mintem == '-999') mintem = '-'; else mintem = data.mintem + '°';
        	if(data.maxtem == '-999') maxtem = '-'; else maxtem = data.maxtem + '°';
        	
        	switch(data.weaCode){
        		case 1:
        			wea_info += 'sunny.png)';
        			break;
        		case 2:
        			wea_info += 'sunny-cloud.png)';
        			break;
        		case 3:
        			wea_info += 'cloudy.png)';
        			break;
        		case 4:
        			wea_info += 'rain.png)';
        			break;
        		case 5:
        			wea_info += 'snow-rain.png)';
        			break;
        		case 6:
        			wea_info += 'snow.png)';
        			break;
        	}
        } else {
        	logNow("날씨 데이터 오류");
        }
        document.getElementById("ticker_temperature_min").innerHTML = mintem;
        document.getElementById("ticker_temperature_max").innerHTML = maxtem;
        $('#ticker_temperature_icon').css('background-image', wea_info);
    });
}

function setTime() { //날짜 및 시간
	var d = new Date();
    document.getElementById("ticker_time").innerHTML = leadZero(d.getHours(),2) + ':' + leadZero(d.getMinutes(),2);
	document.getElementById("ticker_date").innerHTML = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate() + ' ' + getDayOfWeek(d.getDay());
}

function getDayOfWeek(dow){
    return global_json.dayOfWeek[dow];
}

//leading zero 만들기
function leadZero(input,digits){
    for(var cur = (input + '').length; cur < digits; cur++){
        input = '0' + input;
    }
    return input;
}

function initKiosk() {
	$('#div_contents').hide();
	$('#div_contents2').hide();
	$('#div_side_detail').hide();
	
	$('#div_side').hide();
	$('#img_shadow').hide();
	
	if(language == null)
		language = "korean";
	
	$('#div_main').attr('onclick', 'initMain();');

	getTemperature();
	
	initJson(language);
	document.getElementById("ticker_notice_ment").innerHTML = global_json.ticker_notice_ment;
	setTime();
	initJson(language);
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
	html_string += '<div id="div_side_home" class="div_side_bottom" onclick="javascript:initMain();"></div>';
	
	$('#div_side_bottom').html(html_string);
}

function showMain() {
	var html_string = '<div id="div_milestone">';
	for(var i = 0; i < 5; i++){
		html_string += '<div id="div_milestone' + i + '" class="div_milestone" onclick="javascript:setMainArea(' + i + ');"></div>';
		html_string += '<div id="div_milestone_sub' + i + '" onclick="javascript:setMainArea(' + i + ');"></div>';
	}
	html_string += '</div>';
	
	html_string += '<div id="div_language">';
	for(var i = 0; i < 4; i++){
		html_string += '<div id="div_language' + i + '" class="div_language" onclick="javascript:setMainLanguage(' + i + ');"></div>';
	}
	html_string += '</div>';
	
	$('#div_contents').html(html_string);
	if(language == null)
		language = "korean";
	$('#div_contents').css('background-image', 'url(./resources/image/main/main_map.png)');
	$('#div_language').css('background-image', global_json.main_language);
	$('#div_milestone0').css('background-image', global_json.btn_main_map[0]);
	$('#div_milestone1').css('background-image', global_json.btn_main_map[1]);
	$('#div_milestone2').css('background-image', global_json.btn_main_map[2]);
	$('#div_milestone3').css('background-image', global_json.btn_main_map[3]);
	$('#div_milestone4').css('background-image', global_json.btn_main_map[4]);
}

function setMainArea(index_num) {
	switch (index_num) {
		case 0: { //첨단문화산업단지
			showArea0(language);
			break;
		}
		case 1: { //문화제조창
			showArea1();
			break;
		}
		case 2: { //복합공용주차장
			showArea2();
			break;
		}
		case 3: { //국립현대미술관
			showArea3();
			break;
		}
		case 4: { //동부창고
			showArea4();
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
		//첨단문화산업단지
		case 2: {
			for(var i = 0; i <= 6; i++){
				html_string += '<div id="div_side_area0_' + i + '" class="div_side_area0" onclick="javascript:setSideArea0(' + i + ');"></div>';
			}
			
			$('#div_side_top').css('background-image', 'url(./resources/image/industry_side_top.png)');
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
	//$(document).css('background-color', 'aqua');
}

function setMainSide(document, index_num) {
	setSide(document);
	switch (index_num) {
		case 0: { 
			//진행중 이벤트
			initEvent();
			break;
		}
		case 1: {
			showSideTop(1);
			$('#div_contents').html('');
			$('#div_contents').css('background-image', 'url(./resources/image/temp_operating.png)');
			$('#div_main_side1').css('background-image', 'url(./resources/image/temp_operating_sel.png)');
			break;
		}
		case 2: {
			showSideTop(1);
			$('#div_contents').html('');
			$('#div_contents').css('background-image', 'url(./resources/image/main/tour.png)');
			$('#div_main_side2').css('background-image', 'url(./resources/image/temp_operating_sel.png)');
			break;
		}
	}
	
	backPage(1);
}

var language = null;
function setMainLanguage(index_num) {
	
	html_string = '<div id="div_main_language"></div>';
	switch (index_num) {
		case 0: {
			language = "korean";
			break;
		}
		case 1: {
			language = "english";
			break;
		}
		case 2: {
			language = "chinese";
			break;
		}
		case 3: {
			language = "japanese";
			break;
		}
	}
	initJson(language);
	initMain();
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
		case 3: {
			$('#div_side_back').attr('onclick', 'setMainArea(0);');
			break;
		}
		case 4: {
			$('#div_side_back').attr('onclick', 'setArea1(this,1);');
			break;
		}
		case 5: {
			$('#div_side_back').attr('onclick', 'setArea1(this, 0)');
			break;
		}
	}
}

//스크롤 동작 체크
function scrollCheck() {
	$('#div_area0_pin').hide();
	$('#div_area0_industry').hide();
	$('#div_scroll_top').hide();
	$("#div_side_detail").scroll(function(){
		resetTimer();
		var scrollTop = $("#div_side_detail").scrollTop();
		var innerHeight = $('#div_side_detail').innerHeight();
		if(scrollTop > 0) {
			$('#div_scroll_top').show();
		}
		if(scrollTop == 0) {
			$('#div_scroll_top').hide();
		}
		if(scrollTop + innerHeight <= $('#div_side_detail').prop('scrollHeight')) {
			$('#div_scroll_bottom').show();
		}
		if(scrollTop + innerHeight >= $('#div_side_detail').prop('scrollHeight')) {
			$('#div_scroll_bottom').hide();
		}
	});
}
const IS_DEBUG = true;
var SETTING_URL = "http://localhost:9090";
//var SETTING_URL = "http://cheongjukiosk.iptime.org:10000/kioskserver";

function logNow(logContents){
    if(IS_DEBUG){
        console.log(logContents);
    }
}

var onload_time;
$(document).ready(function(){
	onload_time = new Date();
	onload_time.setMinutes(onload_time.getMinutes() + 5); //체크
	
	initUsageStt();
	setUsageStt(new Date());
	initJsonPromotion();
	initKiosk();
	resetTimer();
	startTimer();
});

var initSeconds = 30; // 타이머 초
var remainSeconds;
function resetTimer(){ // 타이머 초기화 함수
	remainSeconds = initSeconds; 
}

function startTimer(){ // 타이머 시작 함수
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

var usageJson = new Object();
function initUsageStt(){
	usageJson.event = 0;
	usageJson.industry = 0;
	usageJson.wonder = 0;
	usageJson.craft = 0;
	usageJson.library = 0;
	usageJson.media = 0;
	usageJson.foundation = 0;
	usageJson.museum = 0;
	usageJson.dongbu = 0;
	usageJson.parking = 0;
	usageJson.hours = 0;
}

function setUsageStt(now_time){
	var date = '';
	date += now_time.getFullYear();
    date += ("0" + (1 + now_time.getMonth())).slice(-2);
    date += ("0" + now_time.getDate()).slice(-2);
    
	var sendData = {
		date: date,
		event_cnt: usageJson.event,
		industry_cnt: usageJson.industry,
		wonder_cnt: usageJson.wonder,
		craft_cnt: usageJson.craft,
		library_cnt: usageJson.library,
		media_cnt: usageJson.media,
		foundation_cnt: usageJson.foundation,
		museum_cnt: usageJson.museum,
		dongbu_cnt: usageJson.dongbu,
		parking_cnt: usageJson.parking,
		hours_cnt: usageJson.hours
	};
	
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		async: false,
		url: SETTING_URL + "/usage/update_usage",
		data : JSON.stringify(sendData),
		success: function (result) {
		},
		error: function() {
		}
	});
}

var promotion_json = null;
function initJsonPromotion() {
	$.ajax({
		type: "POST",
		dataType: "json",
		url: SETTING_URL + "/event/select_event_promotion",
		async: false,
		success: function (result) {
			result.sort(function(){ //프로모션 배열 랜덤
				return Math.random() - Math.random();
			});
			promotion_json = result;
		}
	});
}

var promotion_timer = null;
var promotion_num = 0;
function initPromotion(play) {
	if(play){
		$('#txt_source').hide();
		$('#div_promotion').show();
		$('#div_promotion').css('background-image', 'url(./external_image/promotion/'+ promotion_json[promotion_num]["poster"] +')');
		promotion_timer = setInterval(() => {
			if(promotion_num == promotion_json.length-1){
				var now_time = new Date();
				if(onload_time <= now_time){
					setUsageStt(now_time);
					window.location.reload();
				}
				initJsonPromotion();
				promotion_num = -1;
			}
			promotion_num++;
			resetTimer();
			$('#div_promotion').css('background-image', 'url(./external_image/promotion/'+ promotion_json[promotion_num]["poster"] +')');
		}, 15 * 1000);
	} else {
		clearInterval(promotion_timer);
		$('#div_promotion').css('background-image', promotion_json[promotion_num]);
		$("#div_promotion").addClass("blurEffect");
		$('#div_promotion').html('<div id="div_promotion_black" style="background-color: rgba(0, 0, 0, 0.8);"></div>');
	}
	
}

function initPollution(){
	$.getJSON( "./resources/apival/pollution.jsp", function( pollutionData ) {
		poll_info = 'url(./resources/image/main/dust_icon_';
		var compare = pollutionData.compare;
		if(compare == 1 || compare == null)
			poll_info += "good.png";
		else if(compare == 2)
			poll_info += "ordinary.png";
		else if (compare == 3)
			poll_info += "bad.png";
		$('#ticker_finedust_icon').css('background-image', poll_info);
	});
	
}

function initWeather(){ //기온 + 날씨
    $.getJSON( "./resources/apival/temperature.jsp", function( data ) {
        if(data != undefined && !isNaN(data.temperature) && !isNaN(data.weaCode)) {
        	//기온
        	if(data.temperature >= 0) $('#ticker_temperature').css('color', '#ff5e3c');
        	else $('#ticker_temperature').css('color', '#8ec9e8');
        	document.getElementById("ticker_temperature").innerHTML = data.temperature + '℃'
        	
        	//날씨
        	var wea_info = 'url(./resources/image/main/weather_icon_';
        	switch(data.weaCode){
        		case 1:
        			wea_info += 'sunny';
        			break;
        		case 2:
        			wea_info += 'sunny-cloud';
        			break;
        		case 3:
        			wea_info += 'cloudy';
        			break;
        		case 4:
        			wea_info += 'rain';
        			break;
        		case 5:
        			wea_info += 'snow-rain';
        			break;
        		case 6:
        			wea_info += 'snow';
        			break;
        	}
        	wea_info += '.png)';
        	$('#ticker_temperature_icon').css('background-image', wea_info);
        } else {
        	logNow("기상청 데이터 오류");
        }
    });
}

function initTime() { //날짜 및 시간
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
	hideMainAll();
	
	$("#div_promotion").css("pointer-events", "");
	initPromotion(true);
	
	if(language == null) language = "korean";
	
	initJson(language);
	initTicker();
}

var interval_timer = null;
function initTicker(){ 
	initTime();
	initWeather();
	initPollution();
	initNetwork();
	
	setInterval(() => {
		initTime();
	}, 60 * 1000); 
	
	setInterval(() => {
		initWeather();
		initPollution();
		initNetwork();
	}, 10 * 60 * 1000); 
	
	document.getElementById("ticker_notice_ment").innerHTML = initNotice();
	document.getElementById("ticker_finedust").innerHTML = global_json.ticker_finedust;
}

function initNetwork(){
	var sendData = {online: navigator.onLine}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		async: false,
		url: SETTING_URL + "/network/insert_network",
		data : JSON.stringify(sendData),
		success: function (result) {
			logNow("network insert : " + result);
		},
		error: function (result) {
		}
	});
}

function initNotice(){
	var notice_ment = "";
	
	var sendData = {language: getAbbOfLanguage(language)}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/notice/select_notice",
		data : JSON.stringify(sendData),
		success: function (result) {
			for(var i = 0 ; i < result.length ; i++){
				notice_ment += result[i]["notice"];
				if(i != result.length - 1) notice_ment += "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;";
			}
		}
	});
	return notice_ment;
}

function hideMainAll(){
	$('#div_contents').hide();
	$('#div_contents2').hide();
	$('#div_side_detail').hide();
	$('#div_side').hide();
	$('#img_shadow').hide();
	$("#div_promotion").removeClass("blurEffect");
	$('#div_promotion_black').hide();
}

function initMain() {
	$("#div_promotion").css("pointer-events", "none");
	$('#txt_source').show();
	
	initPromotion(false);
	
	initTicker();
	
	$('#div_contents').show();
	$('#div_side').show();
	$('#img_shadow').show();
	
	showSideBottom();
	showMain();
	showSideTop(1);
}

function showSideTop(index_num) {
	var html_string = "";
	switch (index_num) {
		//메인
		case 1: {
			//for(var i = 0; i < 3; i++){ 관광지 모드
			for(var i = 0; i < 2; i++){
				html_string += '<div class="div_main_side_top" onclick="javascript:setMainSide(this, ' + i + ');"></div>';
			}
			html_string += '<div style="width:100%; height:30px;"></div>';
			for(var i = 3; i < 8; i++){
				html_string += '<div class="div_main_side_mid" onclick="javascript:showCulture(' + (i - 3) + ');"></div>';
			}
			setSide(0);
			break;
		}
		//원더아리아
		case 11: {
			for(var i = 0; i < 6; i++){
				html_string += '<div class="div_side_area1_0" onclick="javascript:setSideArea1_0(' + i + ');"></div>';
			}
			setWonderSide(0);
			break;
		}
		//첨단문화산업단지
		case 2: {
			if(language == "korean"){
				for(var i = 0; i <= 7; i++){
					html_string += '<div class="div_side_area0_ko" onclick="javascript:setSideArea0(' + i + ');"></div>';
				}
			}else{
				for(var i = 0; i <= 6; i++){
					html_string += '<div class="div_side_area0_en" onclick="javascript:setSideArea0(' + i + ');"></div>';
				}
			}
			setIndustrySide(0);
			break;
		}
		case 3: {
			break;
		}
	}
	$('#div_side_top').html(html_string);
}

function showSideBottom() {
	$('#div_side_bottom').css('background-image', 'url('+ global_json.side_bottom +')');
	var html_string = "";
	html_string += 
		'<div style="width: 100%; height:168px; margin-top:30px;">'+
			'<div id="div_side_back" class="div_side_bottom" onclick="javascript:backPage(0);"></div>'+
			'<div id="div_side_home" class="div_side_bottom" onclick="javascript:initMain();"></div>'+
		'</div>';
	
	$('#div_side_bottom').html(html_string);
}

function showMain() {
	var html_string = '<div id="div_milestone">';
	for(var i = 0; i < 5; i++){
		html_string += '<div id="div_milestone' + i + '" class="div_milestone" onclick="javascript:setMainArea(' + i + ');"></div>';
		html_string += '<div id="div_milestone_sub' + i + '" onclick="javascript:setMainArea(' + i + ');"></div>';
	}
	html_string += '</div><div id="div_main_poi"></div>';
	
	html_string += '<div id="div_language"><div id="div_language_container">';
	for(var i = 0; i < 4; i++){
		html_string += '<div class="div_language" onclick="javascript:setMainLanguage(' + i + ');"></div>';
	}
	html_string += '</div></div>';
	
	$('#div_contents').html(html_string);
	if(language == null) language = "korean";
	
	kioskNum = window.location.href.slice(-1);
	if(kioskNum == 1) {
		$('#div_main_poi').css('top', global_json.main_poi1[1]+"px");
		$('#div_main_poi').css('left', global_json.main_poi1[2]+"px");
		$('#div_main_poi').css('background-image', 'url(' + global_json.main_poi1[0] + ')');
	} else if(kioskNum == 2) {
		$('#div_main_poi').css('top', global_json.main_poi2[1]+"px");
		$('#div_main_poi').css('left', global_json.main_poi2[2]+"px");
		$('#div_main_poi').css('background-image', 'url(' + global_json.main_poi2[0] + ')');
	}
	$('#div_contents').css('background-image', 'url(./resources/image/main/main_map.png)');
	$('#div_language').css('background-image', 'url(' + global_json.main_language + ')');
	$('#div_milestone0').css('background-image', 'url(' + global_json.btn_main_map[0] + ')');
	$('#div_milestone1').css('background-image', 'url(' + global_json.btn_main_map[1] + ')');
	$('#div_milestone2').css('background-image', 'url(' + global_json.btn_main_map[2] + ')');
	$('#div_milestone3').css('background-image', 'url(' + global_json.btn_main_map[3] + ')');
	$('#div_milestone4').css('background-image', 'url(' + global_json.btn_main_map[4] + ')');
	
}

function setMainArea(index_num) {
	switch (index_num) {
		case 0: { //첨단문화산업단지
			usageJson.industry += 1;
			showArea0(language);
			break;
		}
		case 1: { //문화제조창
			showCultureList();
			break;
		}
		case 2: { //복합공용주차장
			usageJson.parking += 1;
			showParking();
			break;
		}
		case 3: { //국립현대미술관
			usageJson.museum += 1;
			showMuseum();
			break;
		}
		case 4: { //동부창고
			usageJson.dongbu += 1;
			showDongbu();
			break;
		}
	}
}

function setSide(index){
	switch(index){
		case 0: 
			$('#div_side_top').css('background-image', 'url('+ global_json.side_top[0] +')');
			break;
		case 1: 
			$('#div_side_top').css('background-image', 'url('+ global_json.side_top[1] +')');
			break;
		case 2: 
			$('#div_side_top').css('background-image', 'url('+ global_json.side_top[2] +')');
			break;
		case 3: 
			$('#div_side_top').css('background-image', 'url('+ global_json.side_top[3] +')');
			break;
		case 4: 
			$('#div_side_top').css('background-image', 'url('+ global_json.side_top[4] +')');
			break;
		case 5: 
			$('#div_side_top').css('background-image', 'url('+ global_json.side_top[5] +')');
			break;
		case 6: 
			$('#div_side_top').css('background-image', 'url('+ global_json.side_top[6] +')');
			break;
		case 7: 
			$('#div_side_top').css('background-image', 'url('+ global_json.side_top[7] +')');
			break;
		case 8: 
			$('#div_side_top').css('background-image', 'url('+ global_json.side_top[8] +')');
			break;
	}
}

function setMainSide(document, index_num) {
	switch (index_num) {
		case 0: { 
			//진행중 이벤트
			usageJson.event += 1;
			setSide(1);
			initEvent();
			break;
		}
		case 1: {
			usageJson.hours += 1;
			setSide(2);
			$('#div_contents').html('');
			$('#div_contents').css('background-image', 'url('+ global_json.hours +')');
			break;
		}
		case 2: { //청주관광지
			setSide(3);
			$('#div_contents').html('');
			$('#div_contents').css('background-image', 'url('+ global_json.tour +')');
			break;
		}
	}
	
	backPage(1);
}

var language = null;
function setMainLanguage(index_num) {
	html_string = '<div id="div_main_language"></div>';
	switch (index_num) {
		case 0: 
			language = "korean";
			break;
		case 1: 
			language = "english";
			break;
		case 2: 
			language = "chinese";
			break;
		case 3: 
			language = "japanese";
			break;
	}
	initJson(language);
	initMain();
}

function getAbbOfLanguage(lang){
	switch (lang) {
	case "korean": 
		return "kr";
	case "english": 
		return "en";
	case "chinese": 
		return "ch";
	case "japanese": 
		return "jp";
	}
}

function backPage(current_depth){
	switch (current_depth) {
		case 0: {
			initKiosk();
			break;
		}
		case 1: {
			$('#div_side_back').attr('onclick', 'initMain();');
			break;
		}
		case 2: {
			$('#div_side_back').attr('onclick', 'showCultureList();');
			break;
		}
		case 3: {
			$('#div_side_back').attr('onclick', 'setMainArea(0);');
			break;
		}
		case 4: {
			$('#div_side_back').attr('onclick', 'showCulture(1);');
			break;
		}
		case 5: {
			$('#div_side_back').attr('onclick', 'showCulture(0)');
			break;
		}
		case 6: { //진행중 이벤트
			$('#div_side_back').attr('onclick', 'initEvent()');
			break;
		}
		case 7: { //동부창고
			$('#div_side_back').attr('onclick', 'showDongbu()');
			break;
		}
	}
}

//스크롤 동작 체크
function scrollCheck() {
	$('#div_area0_pin').hide();
	$('#div_area0_industry').hide();
	$('#div_scroll_top').hide();
	if($('#div_side_detail').children().length < 12) {
		$('#div_scroll_bottom').hide();
		$('#div_scroll_top').hide();
	}
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

//스크롤 화살표 동작
function scrollMove(index) {
	if(index=="up")
		$("#div_side_detail").scrollTop($("#div_side_detail").scrollTop()-100);
	else if(index=="down")
		$("#div_side_detail").scrollTop($("#div_side_detail").scrollTop()+100);
}
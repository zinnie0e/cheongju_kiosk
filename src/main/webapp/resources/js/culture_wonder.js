function showArea1_0() {
	initJsonArea1_0();
	showSideTop(11);
	var html_string = '<div id="div_contents2"><div id="div_side_detail"></div>'+
		'<div id="div_wonder_building_flow">';
	for(var i = 2; i >= 0; i--) 
			html_string += '<div class="div_wonder_building_flow" onclick="javascript:showArea1_0Flow(' + i + ');"></div>';
	html_string += '</div>'+
					  '<div id="div_asst_flow">';
	for(var i = 2; i >= 0; i--) 
		html_string += '<div class="div_asst_flow" onclick="javascript:showArea1_0Flow(' + i + ');"></div>';
	html_string +=
		'</div>'+
		'<div id="div_flow_map"></div>'+
		'<div id="div_scroll_top" onclick="javascript:scrollMove(\'up\')"></div>'+
		'<div id="div_scroll_bottom" onclick="javascript:scrollMove(\'down\')"></div>'+
		// 원더아리아 핀 표시 : div_area1_0_pin 주석 모두 풀기 
		//'<div id="div_area1_0_pin"></div>'+
		'<div id="div_area1_0_shop"><div id="div_shop_info"></div></div>'+
		'<div id="div_area1_0_flow">';
	for(var i = 0; i < 3; i++){
		html_string += '<div class="div_area1_0_flow" onclick="javascript:showArea1_0Flow(' + i + ');"></div>';
	}	
	html_string += '</div></div>';
	
	$('#div_contents').html(html_string);
	$('#div_contents2').css('background-image', 'url(' + global_json.culture_wonder + ')');
	
	showSideDetailArea1_0("all");
	
	$('#div_area1_0_flow').val("close");
	//$('#div_area1_0_pin').hide();
	$('#div_flow_map').hide();
	$('#div_area1_0_shop').hide();
	
	$('#div_area1_0_shop').css('background-image', '');
	$('#div_scroll_top').css('background-image', 'url(./resources/image/culture/menu_culture_wonder_list_top.png)');
	$('#div_scroll_bottom').css('background-image', 'url(./resources/image/culture/menu_culture_wonder_list_bottom.png)');
	scrollCheck();	
}

//매장 데이터 리스트
var shop_json = null;
function initJsonArea1_0() {
	var from = {language : getAbbOfLanguage(language)};
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/wonder/select_wonder_list",
		async: false,
		data: JSON.stringify(from),
		success: function (result) {
			shop_json = result;
			for(var i=0; i < shop_json.length; i++) {
				if(shop_json[i].flow == 1)
					shop_json[i].flow = 0;
				else if(shop_json[i].flow == 2)
					shop_json[i].flow = 1;
				else if(shop_json[i].flow == 5)
					shop_json[i].flow = 2;
			}
		},
		error: function () {
		}
	});
}

function setSideArea1_0(index_num) {
	switch (index_num) {
		case 0: {
			setWonderSide(1);
			showSideDetailArea1_0("의류");
			break;
		}
		case 1: {
			setWonderSide(2);
			showSideDetailArea1_0("패션잡화");
			break;
		}
		case 2: {
			setWonderSide(3);
			showSideDetailArea1_0("카페");
			break;
		}
		case 3: {
			setWonderSide(4);
			showSideDetailArea1_0("음식점");
			break;
		}
		case 4: {
			setWonderSide(5);
			showSideDetailArea1_0("도서");
			break;
		}
		case 5: {
			setWonderSide(6);
			showSideDetailArea1_0("편의시설");
			break;
		}
	}
}

//원더아리아 매장 리스트
function showSideDetailArea1_0(index_value) {
	var html_string = "";
	
	if(index_value == "all"){
		for(var i = 0; i < shop_json.length; i++){
			html_string += '<div id="div_area1_0_side_detail' + i + '" class="div_area1_0_side_detail" onclick="javascript:setSideDetailArea1_0(' + i + ');"><div id="div_shop_name"><div class="mul">' + shop_json[i].name + '</div></div></div>';
		}
		
		if($('#div_area1_0_side_detail').length >= 10) {
			$('#div_scroll_bottom').hide();
		}
	} else {
		for(var i = 0; i < shop_json.length; i++){
			if(shop_json[i].shop_cate == index_value){
				html_string += '<div id="div_area1_0_side_detail' + i + '" class="div_area1_0_side_detail" onclick="javascript:setSideDetailArea1_0(' + i + ');"><div id="div_shop_name"><div class="mul">' + shop_json[i].name + '</div></div></div>';
			}
		}
		if($('#div_area1_0_side_detail').length <= 10) {
			$('#div_scroll_bottom').remove();
		}
	}
	$('#div_side_detail').html(html_string);
	$('.div_area1_0_side_detail').css('background-image', 'url(./resources/image/culture/menu_culture_wonder_list_bg.png)');
	$('#div_side_detail').css('background-image', 'url(./resources/image/culture/menu_culture_wonder_list_bg2.png)');
	
	//textFit(document.getElementsByClassName('mul'));
	
	backPage(5);
}

//원더아리아 매장 설명
var before = null;
function setSideDetailArea1_0(index) {
	
	$(document).ready(function () {
		$('.div_side_area1_0').click(function() {
			before = null;
		});
	});

	var flow = parseInt(shop_json[index].flow)+1;
	var start_time = shop_json[index].start_time;
	var end_time = shop_json[index].end_time;
	if(flow == 3) flow = 5;

	//$('#div_area1_0_pin').css('top', shop_json[index].image_x + 'px');
	//$('#div_area1_0_pin').css('left', shop_json[index].image_y + 'px');
	//$('#div_area1_0_pin').show();
	$('#div_flow_map').show();
	//$('#div_area1_0_pin').css('background-image', 'url(./resources/image/poi/point_arrival.png)');
	$('#div_area1_0_shop').show();
	html_string = '<div id="div_wonder_logo"></div>'+
				  '<div id="div_wonder_name"><b>' + shop_json[index].name + '</b></div>'+
				  '<div id="div_wonder_info_img">'+
				  '<div class="div_wonder_img"><img src="./resources/image/culture/wonder_icon1.png"></img></div>';
				  if(shop_json[index].start_time != '' && shop_json[index].start_time != ' ' && shop_json[index].start_time != null)
					  html_string += '<div class="div_wonder_img"><img src="./resources/image/culture/wonder_icon2.png"></img></div>';
				  if(shop_json[index].tel != '' && shop_json[index].tel != ' ' && shop_json[index].tel != null)
					  html_string += '<div class="div_wonder_img"><img src="./resources/image/culture/wonder_icon3.png"></img></div>';
				  html_string += '</div>'+
				  '<div id="div_wonder_info">'+
				  '<div class="div_wonder_info">' + global_json.culture_wonder_detail + ' <b>' + flow;
				  if(language == "korean") html_string += "층";
				  else html_string +="F";			
				  html_string += '</b></div>';
	if(shop_json[index].start_time != '' && shop_json[index].start_time != ' ' && shop_json[index].start_time != null)
	  html_string += '<div class="div_wonder_info">' + start_time.substring(0,2) + ':' + start_time.substring(2,4) + ' ~ ' + end_time.substring(0, 2) + ':' + end_time.substring(2,4) + '</div>';
	if(shop_json[index].tel != '' && shop_json[index].tel != ' ' && shop_json[index].tel != null)
	  html_string += '<div class="div_wonder_info">' + shop_json[index].tel + '</b></div>';
	  html_string += '</div>';	
	
	$('#div_shop_info').html(html_string);
	
	$('#div_asst_flow').hide();
	$('#div_wonder_building_flow').hide();
	
	$('#div_area1_0_flow').css('top', '575px');
	$('#div_contents2').css('background-image', 'url(' + global_json.culture_wonder_floor[shop_json[index].flow] + ')');
	$('#div_shop_info').css('background-image', 'url(./resources/image/culture/culture_wonder_detail_bg.png)');
	
	kioskNum = window.location.href.slice(-1);
	if(kioskNum == 2) $('#div_flow_map').css('background-image', 'url(' + global_json.culture_wonder_shop2[shop_json[index].uid-1] + ')');
	else $('#div_flow_map').css('background-image', 'url(' + global_json.culture_wonder_shop1[shop_json[index].uid-1] + ')');
	
	$('#div_wonder_logo').css('background-image', 'url(./resources/image/poi/wonder_logo_L/' + shop_json[index].logo +')');
	$('#div_area1_0_side_detail' + index).css('background-image', 'url(./resources/image/culture/menu_culture_wonder_list_sellect_bg.png)');
	
	if(!(before == null) || !(index == before)) {
		$('#div_area1_0_side_detail' + before + '').css('background-image', 'url(./resources/image/culture/menu_culture_wonder_list_bg.png)');
	}
	
	if((index == before)){
		$('#div_area1_0_side_detail' + before + '').css('background-image', 'url(./resources/image/culture/menu_culture_wonder_list_sellect_bg.png)');
	}
	
	before = index;
	
	backPage(5);
}

//원더아리아 각 층별 이미지
function showArea1_0Flow(index_num) {
	$('#div_contents2').css('background-image', 'url(' + global_json.culture_wonder_floor[index_num] + ')');
	
	kioskNum = window.location.href.slice(-1);
	if(kioskNum == 2) $('#div_flow_map').css('background-image', 'url(' + global_json.culture_wonder_floor_detail2[index_num] + ')');
	else $('#div_flow_map').css('background-image', 'url(' + global_json.culture_wonder_floor_detail1[index_num] + ')');
	
	html_string = "";
	//층별 이미지 클릭 시 해당 층 리스트 출력
	for(var i = 0; i < shop_json.length; i++)
		if(shop_json[i].flow == (index_num))
			html_string += '<div id="div_area1_0_side_detail'+i+'" class="div_area1_0_side_detail" onclick="javascript:setSideDetailArea1_0(' + i + ');">' + '<div id="div_shop_name"><div class="mul">' + shop_json[i].name + '</div></div></div>';
	$('#div_side_detail').html(html_string);
	
	//매장 리스트 11개 이하 스크롤 제거
	if($('.div_area1_0_side_detail').length <= 11) {
		$('#div_scroll_top').hide();
		$('#div_scroll_bottom').hide();
		$('#div_side_detail').css('overflow', 'hidden'); 
	}
	else {
		html_string +=
			'<div id="div_scroll_top" onclick="javascript:scrollMove(\'up\')"></div>'+
			'<div id="div_scroll_bottom" onclick="javascript:scrollMove(\'down\')"></div>'+
		$('div_side_detail').html(html_string);
		$('#div_scroll_top').hide();
		$('#div_scroll_bottom').show();
		
	}
	
	$('.div_area1_0_side_detail').css('background-image', 'url(./resources/image/culture/menu_culture_wonder_list_bg.png)');
	$('#div_side_top').css('background-image', 'url('+ global_json.side_wonder_top[0] +')');
	$('#div_area1_0_flow').css('top', '575px');
	$('#div_area1_0_flow').val("open");
	$('#div_asst_flow').hide();
	$('#div_wonder_building_flow').hide();
	$('#div_area1_0_shop').hide();
	//$('#div_area1_0_pin').hide();
	$('#div_flow_map').show();
	
	backPage(5);
}


function setWonderSide(index){
	switch(index){
		case 0: 
			$('#div_side_top').css('background-image', 'url('+ global_json.side_wonder_top[0] +')');
			break;
		case 1: 
			$('#div_side_top').css('background-image', 'url('+ global_json.side_wonder_top[1] +')');
			break;
		case 2: 
			$('#div_side_top').css('background-image', 'url('+ global_json.side_wonder_top[2] +')');
			break;
		case 3: 
			$('#div_side_top').css('background-image', 'url('+ global_json.side_wonder_top[3] +')');
			break;
		case 4: 
			$('#div_side_top').css('background-image', 'url('+ global_json.side_wonder_top[4] +')');
			break;
		case 5: 
			$('#div_side_top').css('background-image', 'url('+ global_json.side_wonder_top[5] +')');
			break;
		case 6: 
			$('#div_side_top').css('background-image', 'url('+ global_json.side_wonder_top[6] +')');
			break;
	}
}

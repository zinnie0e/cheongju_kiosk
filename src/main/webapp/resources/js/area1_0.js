function showArea1_0() {
	initJsonArea1_0();
	showSideTop(11);
	logNow(shop_json);
	var html_string = '<div id="div_contents2">'+
					  '<div id="div_side_detail">'+
					  '</div>'+
					  '<div id="div_scroll_top"></div>'+
					  '<div id="div_scroll_bottom"></div>'+
					  '<div id="div_area1_0_pin"></div>'+
					  '<div id="div_area1_0_shop"><div id="div_shop_info"></div></div>'+
					  '<div id="div_area1_0_flow">';
	for(var i = 0; i < 3; i++){
		html_string += '<div id="div_area1_0_flow' + i + '" class="div_area1_0_flow" onclick="javascript:showArea1_0Flow(' + i + ');"></div>';
	}
	html_string += '</div></div>';
	
	$('#div_contents').html(html_string);
	
	$('#div_contents2').css('background-image', global_json.culture_wonder);
	
	showSideDetailArea1_0("all");
	
	$('#div_area1_0_flow').val("close");
	$('#div_area1_0_pin').hide();
	$('#div_area1_0_shop').css('background-image', '');
	$('#div_scroll_top').css('background-image', 'url(./resources/image/culture/menu_culture_wonder_top.png)');
	$('#div_scroll_bottom').css('background-image', 'url(./resources/image/culture/menu_culture_wonder_bottom.png)');
	scrollCheck();	
}

var shop_json = null;
function initJsonArea1_0() {
	$.ajax({
		async: false,
		dataType: "json",
		url: "./resources/temp_area1_0_shop_list.json",
		success: function (result) {
			shop_json = result;
		}
	});
}

function setSideArea1_0(index_num) {
	switch (index_num) {
		case 0: {
			showSideDetailArea1_0("의류");
			break;
		}
		case 1: {
			showSideDetailArea1_0("패션잡화");
			break;
		}
		case 2: {
			showSideDetailArea1_0("카페");
			break;
		}
		case 3: {
			showSideDetailArea1_0("음식점");
			break;
		}
		case 4: {
			showSideDetailArea1_0("도서");
			break;
		}
		case 5: {
			showSideDetailArea1_0("편의시설");
			break;
		}
	}
}

//ajax
function showSideDetailArea1_0(index_value) {
	var html_string = "";
	var data = shop_json.area1_0_shop_list;
	if(index_value == "all"){
		//ajax all
		//ajax 변경 후 인수 i를 json_data로 변경해야 함
		for(var i = 0; i < data.length; i++){
			html_string += '<div id="div_area1_0_side_detail' + i + '" class="div_area1_0_side_detail" onclick="javascript:setSideDetailArea1_0(' + i + ');">' + data[i].name + '</div>';
		}
		$('#div_side_detail').html(html_string);	
	} else {
		for(var i = 0; i < data.length; i++){
			if(data[i].shop == index_value)
				html_string += '<div id="div_area1_0_side_detail' + i + '" class="div_area1_0_side_detail" onclick="javascript:setSideDetailArea1_0(' + i + ');">' + data[i].name + '</div>';
		}
		$('#div_side_detail').html(html_string);
	}
	 /*else if(index_value == "의류"){
	//ajax 의류
	for(var i = 0; i < data.length; i++){
		if(data[i].shop == "의류")
			html_string += '<div id="div_area1_0_side_detail' + i + '" class="div_area1_0_side_detail" onclick="javascript:setSideDetailArea1_0(' + i + ');">' + data[i].name + '</div>';
	}
	$('#div_side_detail').html(html_string);
} else if(index_value == "패션잡화"){
	for(var i = 0; i < data.length; i++){
		if(data[i].shop == "패션잡화")
			html_string += '<div id="div_area1_0_side_detail' + i + '" class="div_area1_0_side_detail" onclick="javascript:setSideDetailArea1_0(' + i + ');">' + data[i].name + '</div>';
	}
	$('#div_side_detail').html(html_string);
} else if(index_value == "카페"){
	for(var i = 0; i < data.length; i++){
		if(data[i].shop == "카페")
			html_string += '<div id="div_area1_0_side_detail' + i + '" class="div_area1_0_side_detail" onclick="javascript:setSideDetailArea1_0(' + i + ');">' + data[i].name + '</div>';
	}
	$('#div_side_detail').html(html_string);
} else if(index_value == "음식점"){
	for(var i = 0; i < data.length; i++){
		if(data[i].shop == "음식접")
			html_string += '<div id="div_area1_0_side_detail' + i + '" class="div_area1_0_side_detail" onclick="javascript:setSideDetailArea1_0(' + i + ');">' + data[i].name + '</div>';
	}
	$('#div_side_detail').html(html_string);
} else if(index_value == "도서"){
	alert("도서");
} else if(index_value == "편의시설"){
	alert("편의시설");
}*/
	$('.div_area1_0_side_detail').css('background-image', 'url(./resources/image/culture/menu_culture_wonder_list_bg.png)');
	$('#div_side_detail').css('background-image', 'url(./resources/image/culture/menu_culture_wonder_list_bg2.png)')
}

function setSideDetailArea1_0(i) {
	logNow("setSideDetailArea1_0: " + i);
	
	showArea1_0Flow(shop_json.area1_0_shop_list[i].flow);
	var data = shop_json.area1_0_shop_list;
	$('#div_area1_0_pin').css('top', data[i].top);
	$('#div_area1_0_pin').css('left', data[i].left);
	$('#div_area1_0_pin').show();
	
	$('#div_shop_info').css('background-image', 'url(./resources/image/culture/culture_wonder_detail_bg.png)');
}

function showArea1_0Flow(index_num) {
	logNow("showArea1_0Flow: " + index_num);
	
	if($('#div_area1_0_flow').val() == "close"){
		//2,5층 json 데이터 변경
		$('#div_contents2').css('background-image', global_json.culture_wonder_1f);
		$('#div_area1_0_flow').css('top', '460px');
		$('#div_area1_0_flow').val("open");
	} else {
//		$('#div_contents2').css('background-image', 'url(./resources/image/temp_area1_0_flow' + index_num + '.png)');
	}
}

//스크롤 y축 값
function scrollCheck() {
	$('#div_area0_pin').hide();
	$('#div_area0_industry').hide();
	showSideDetailArea0("all");
	$('#div_scroll_top').hide();
	$("#div_side_detail").scroll(function(event){
		var scrollTop = $("#div_side_detail").scrollTop();
		var innerHeight = $('#div_side_detail').innerHeight();
		logNow($('#div_side_detail').scrollTop());
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
			logNow("실핸");
			$('#div_scroll_bottom').hide();
		}
	});
}
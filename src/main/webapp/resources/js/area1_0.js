function showArea1_0() {
	initJsonArea1_0();
	showSideTop(11);
	
	var html_string = '<div id="div_contents2"><div id="div_area1_0_pin"></div><div id="div_area1_0_shop"></div><div id="div_area1_0_flow">';
	for(var i = 2; i >= 0; i--){
		html_string += '<div id="div_area1_0_flow' + i + '" class="div_area1_0_flow" onclick="javascript:showArea1_0Flow(' + i + ');"></div>';
	}
	html_string += '</div></div>';
	
	html_string += '<div id="div_side_detail"></div>';
	
	$('#div_contents').html(html_string);
	
	$('#div_contents2').css('background-image', 'url(./resources/image/temp_area1_0.png)');
	
	showSideDetailArea1_0("all");
	$('#div_area1_0_flow').val("close");
	$('#div_area1_0_pin').hide();
	$('#div_area1_0_shop').css('background-image', '');
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
	if(index_value == "all"){
		//ajax all
		//ajax 변경 후 인수 i를 json_data로 변경해야 함
		for(var i = 0; i < 16; i++){
			html_string += '<div id="div_area1_0_side_detail' + i + '" class="div_area1_0_side_detail" onclick="javascript:setSideDetailArea1_0(' + i + ');">' + i + '</div>';
		}
		$('#div_side_detail').html(html_string);
		$('#div_side_detail').css('background-image', 'url(./resources/image//temp_side_detail_area1_0.png)');		
	} else if(index_value == "의류"){
		//ajax 의류
		for(var i = 0; i < 5; i++){
			html_string += '<div id="div_area1_0_side_detail' + i + '" class="div_area1_0_side_detail" onclick="javascript:setSideDetailArea1_0(' + i + ');">' + i + '</div>';
		}
		$('#div_side_detail').html(html_string);
		$('#div_side_detail').css('background-image', 'url(./resources/image//temp_side_detail_area1_0_0.png)');
	} else if(index_value == "패션잡화"){
		alert("패션잡화");
	} else if(index_value == "카페"){
		alert("카페");
	} else if(index_value == "음식점"){
		alert("음식점");
	} else if(index_value == "도서"){
		alert("도서");
	} else if(index_value == "편의시설"){
		alert("편의시설");
	}
}

function setSideDetailArea1_0(i) {
	logNow("setSideDetailArea1_0: " + i);
	
	showArea1_0Flow(shop_json.area1_0_shop_list[i].flow);
	
	$('#div_area1_0_pin').css('top', shop_json.area1_0_shop_list[i].top);
	$('#div_area1_0_pin').css('left', shop_json.area1_0_shop_list[i].left);
	$('#div_area1_0_pin').show();
	
	$('#div_area1_0_shop').css('background-image', 'url(./resources/image/temp_area1_0_shop.png)');
}

function showArea1_0Flow(index_num) {
	logNow("showArea1_0Flow: " + index_num);
	
	if($('#div_area1_0_flow').val() == "close"){
		$('#div_contents2').css('background-image', 'url(./resources/image/temp_area1_0_flow1.png)');
		$('#div_area1_0_flow').css('top', '460px');
		$('#div_area1_0_flow').val("open");
	} else {
//		$('#div_contents2').css('background-image', 'url(./resources/image/temp_area1_0_flow' + index_num + '.png)');
	}
}
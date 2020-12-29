//한국공예관 홈
function showArea1_1() {
	initArea1_1();
	showSideTop(1);
	
	var html_string = '<div id="div_culture_menu">';
	
	for(var i = 0; i < craft_json.area1_1_menu_list.length; i++){
		// for문 반복횟수, i => json데이터로 변경해야함
		html_string += '<div id="div_culture_menu' + i + '" class="div_culture_menu" onclick="javascript:showCraftMenu(' + i + ');"></div>';
	}
	html_string += '</div>';
	
	
	$('#div_contents').html(html_string);
	$('#div_contents3').hide();
	$('#div_contents').css('background-image', global_json.culture_craft);
	for(var i = 0; i < 4; i++) {
		$('#div_culture_menu').css('background-image', global_json.btn_culture_craft[i]);
	}
	$('#div_main_side4').css('background-image', 'url(./resources/image/culture/culture_craft_sel.png)');
	

}
//한국공예관 메뉴 선택
function showCraftMenu(menu) {
			$('#div_culture_menu').remove();
			html_string = '<div id="div_contents" onclick="javascript:showArea1_1();"><div id="div_contents3" onclick="alert("asd");"></div></div>';
			$('#div_contents').html(html_string);
			$('#div_contents3').css('background-image', global_json.culture_craft_detail[menu]);
}

//한국공예관 데이터
var craft_json = null;
function initArea1_1() {
	$.ajax({
		async: false,
		dataType: "json",
		url: "./resources/temp_area1_1_menu_list.json",
		success: function (result) {
			craft_json = result;
		}
	});
}
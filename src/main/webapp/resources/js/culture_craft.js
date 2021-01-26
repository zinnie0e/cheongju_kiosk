//한국공예관
function showCraft() {
	setSide(5);
	
	var html_string = '<div id="div_culture_menu">';
	for(var i = 0; i < 4; i++){
		html_string += '<div class="div_culture_menu" onclick="javascript:showCraftDetail(' + i + ');"></div>';
	}
	html_string += '</div>';
	
	$('#div_contents').html(html_string);
	$('#div_contents3').hide();
	$('#div_contents').css('background-image', 'url(' + global_json.culture_craft + ')');
}

//한국공예관 디테일
function showCraftDetail(menu) {
	$('#div_culture_menu').remove();
	html_string = 
		'<div id="div_contents" onclick="javascript:showCraft();" style="background-color: rgba(0, 0, 0, 0.7);">'+
			'<div id="div_craft_detail" onclick="javascript:event.stopPropagation();resetTimer();">'+
				'<div class="close_popup" onclick="javascript:showCraft();"></div>'+
			'</div>'+
		'<div>';
	$('#div_contents').html(html_string);
	$('#div_craft_detail').css('background-image', 'url(' + global_json.culture_craft_detail[menu] + ')');
	
	backPage(4);
}
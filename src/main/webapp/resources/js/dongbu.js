function showDongbu() {
	showSideTop(1);
	$('#div_contents').css('background-image', 'url('+ global_json.dongbu +')');
	
	var html_string = "";
	html_string += '<div id="div_area4_flow">';
	for(var i = 0; i < 8; i++){ //버튼
		html_string += '<div class="div_area4_flow" onclick="javascript:showDongbuDetail(' + i + ');"></div>';
	}
	html_string += '</div>';
	for(var i = 0; i < 8; i++){ //건물
		html_string += '<div id="div_area4_building'+ i +'" onclick="javascript:showDongbuDetail(' + i + ');"></div>';
	}
	$('#div_contents').html(html_string);
	
	backPage(1);
}

function showDongbuDetail(index) {
	//index
	//0:36동, 1:37동, 2:38동, 3:Out, 4:6동, 5:8동, 6:34동, 7:35동
	$('#div_area4_flow').hide();
	
	html_string = 
		'<div id="div_contents" onclick="javascript:showDongbu();" style="background-color: rgba(0, 0, 0, 0.7);">'+
			'<div id="div_dongbu_detail" onclick="javascript:event.stopPropagation();resetTimer();">'+
				'<div class="close_popup" onclick="javascript:showDongbu();"></div>'+
			'</div>'
		'<div>';
	$('#div_contents').html(html_string);
	
	$('#div_dongbu_detail').css('background-image', 'url('+ global_json.dongbu_detail[index] +')');
	backPage(7);
}
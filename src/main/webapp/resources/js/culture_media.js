//시청자 미디어 센터
function showArea1_3() {
	showSideTop(1);
	html_string = '<div id="div_contents"></div>';
	$('#div_contents').css('background-image', 'url('+ global_json.culture_media +')');
	//$('#div_main_side6').css('background-image', 'url(./resources/image/culture_media_sel.png)');
	$('#div_contents').html(html_string);
}
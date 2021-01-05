//시청자 미디어 센터
function showMedia() {
	setSide(7);
	html_string = '<div id="div_contents"></div>';
	$('#div_contents').css('background-image', 'url('+ global_json.culture_media +')');
	$('#div_contents').html(html_string);
}
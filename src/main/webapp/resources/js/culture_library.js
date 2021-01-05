//열린도서관
function showLibrary() {
	setSide(6);
	html_string = '<div id="div_contents"></div>';
	$('#div_contents').css('background-image', 'url('+ global_json.culture_library +')');
	$('#div_contents').html(html_string);
}
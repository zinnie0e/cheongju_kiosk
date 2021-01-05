//청주시문화산업진흥재단
function showFoundation() {
	setSide(8);
	html_string = '<div id="div_contents"></div>';
	$('#div_contents').css('background-image', 'url('+ global_json.foundation +')');
	$('#div_contents').html(html_string);
}
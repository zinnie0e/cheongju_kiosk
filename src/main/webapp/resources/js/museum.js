function showMuseum() {
	setSide(9);
	var html_string = "";
	$('#div_contents').html(html_string);
	$('#div_contents').css('background-image', 'url(' + global_json.museum + ')');
	
	backPage(1);
}
function showParking() {
	var html_string = "";
	showSideTop(1);
	$('#div_contents').html(html_string);
	$('#div_contents').css('background-image', 'url(' + global_json.parking + ')');
	
	backPage(1);
}
//시청자 미디어 센터
function showArea1_4() {
	showSideTop(1);
	html_string = '<div id="div_contents"></div>';
	$('#div_contents').css('background-image', 'url(./resources/image/foundation.png)');
	$('#div_main_side7').css('background-image', 'url(./resources/image/foundation_sel.png)');
	$('#div_contents').html(html_string);
}
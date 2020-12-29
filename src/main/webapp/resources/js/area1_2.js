//열린도서관
function showArea1_2() {
	showSideTop(1);
	html_string = '<div id="div_contents"></div>';
	$('#div_contents').css('background-image', 'url(./resources/image/culture_library.png)');
	$('#div_main_side5').css('background-image', 'url(./resources/image/culture_library_sel.png)');
	$('#div_contents').html(html_string);
}
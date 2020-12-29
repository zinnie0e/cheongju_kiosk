function showArea4() {
	var html_string = "";
	var flow = [0, 38, 37, 36, 35, 34, 8, 6, "parking"];
	showSideTop(1);
	
	html_string += '<div id="div_area4_flow">';
	for(var i in flow){
		html_string += '<div id=div_area4_flow' + i + ' class="div_area4_flow" onclick="javascript:showArea4Flow(' + flow[i] + ');"></div>';
	}
	$('#div_contents').html(html_string);
	$('#div_contents').css('background-image', 'url(./resources/image/dongbu/dongbu.png)');
	
	backPage(1);
}

function showArea4Flow(flow) {
	$('#div_area4_flow').hide();
	if(flow == 0)
		$('#div_contents').css('background-image', 'url(./resources/image/dongbu/dongbu_out.png)');
	else
		$('#div_contents').css('background-image', 'url(./resources/image/dongbu/dongbu_' + flow + '.png)');
	html_string = '<div id="div_contents" onclick="javascript:showArea4();">';
	$('#div_contents').html(html_string);
}
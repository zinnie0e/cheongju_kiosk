function showArea1() {
	var html_string = "";
	
	for(var i = 0; i < 5; i++){
		html_string += '<div id="div_event_' + i + '" onclick="javascript:setArea1(this, ' + i + ');"></div>';
	}
	
	$('#div_contents').html(html_string);
	$('#div_contents').css('background-image', 'url(./resources/image/temp_area1.png)');
	
	backPage(1);
}

function setArea1(document, index_num) {
	setSide(document);
	switch (index_num) {
		case 0: {
			showArea1_0();
			break;
		}
		case 1: {
			alert("한국공예관");
			break;
		}
		case 2: {
			alert("열린도서관");
			break;
		}
		case 3: {
			alert("미디어 센터");
			break;
		}
		case 4: {
			alert("산업진흥재단");
			break;
		}
	}
	
	backPage(2);
}
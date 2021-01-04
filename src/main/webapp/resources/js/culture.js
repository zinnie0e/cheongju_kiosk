function showArea1() {
	showSideTop(1);
	
	var html_string = "";
	html_string += '<div id="div_area1">';
	for(var i = 0; i < 4; i++){
		html_string += '<div class="div_area1" onclick="javascript:setArea1(this, ' + i + ');"></div>';
	}
	html_string += '</div>';
	
	$('#div_contents').html(html_string);
	$('#div_contents').css('background-image', 'url('+ global_json.culture +')');
	backPage(1);
}

function setArea1(document, index_num) {
	setSide(document);
	switch (index_num) {
		case 0: {
			//원더아리아
			showArea1_0();
			break;
		}
		case 1: {
			//한국공예관
			showArea1_1();
			break;
		}
		case 2: {
			//미디어재단
			showArea1_3();
			break;
		}
		case 3: {
			//열린도서관
			showArea1_2();
			break;
		}
		case 4: {
			//산업진흥재단
			showArea1_4();
			break;
		}
	}
	
	backPage(2);
}
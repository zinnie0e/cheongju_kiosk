function showCultureList() {
	showSideTop(1);
	
	var html_string = "";
	html_string += '<div id="div_area1">';
	for(var i = 0; i < 4; i++){
		html_string += '<div id="div_area1_'+ i +'" onclick="javascript:showCulture(' + i + ');"></div>';
	}
	html_string += '</div>';
	
	$('#div_contents').html(html_string);
	$('#div_contents').css('background-image', 'url('+ global_json.culture +')');
	backPage(1);
}

function showCulture(index_num) {
	switch (index_num) {
		case 0: {
			//원더아리아
			showArea1_0();
			break;
		}
		case 1: {
			//한국공예관
			showCraft();
			break;
		}
		case 2: {
			//열린도서관
			showLibrary();
			break;
		}
		case 3: {
			//미디어센터
			showMedia();
			break;
		}
		case 4: {
			//산업진흥재단
			showFoundation();
			break;
		}
	}
	if(index_num != 4) backPage(2);
	else backPage(1);
}
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
			usageJson.wonder += 1;
			showArea1_0();
			break;
		}
		case 1: {
			//한국공예관
			usageJson.craft += 1;
			showCraft();
			break;
		}
		case 2: {
			//열린도서관
			usageJson.library += 1;
			showLibrary();
			break;
		}
		case 3: {
			//미디어센터
			usageJson.media += 1;
			showMedia();
			break;
		}
		case 4: {
			//미술관
			usageJson.museum += 1;
			showMuseum();
			break;
		}
		case 5: {
			//산업진흥재단
			usageJson.foundation += 1;
			showFoundation();
			break;
		}
	}
	if(index_num != 4) backPage(2);
	else backPage(1);
}
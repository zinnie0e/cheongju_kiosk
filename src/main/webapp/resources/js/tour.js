function showTour(){
	$('#div_contents').html('');
	$('#div_contents').css('background-image', 'url('+ global_json.tour +')');
	
	var html_string = "";
	html_string += '<div id="div_tour_area">';
	for(var i = 0; i <= 10; i++){ //버튼
		html_string += '<div id="div_tour_area' + i + '" onclick="javascript:showTourDetail(' + i + ');"></div>';
	}
	html_string += '</div>';
	
	$('#div_contents').html(html_string);
	
	backPage(1);
}

function showTourDetail(index){
	//index
	//0:초정행궁, 1:정북동토성, 2:상당산성, 3:고인쇄박물관, 4:수암골, 5:청주랜드, 6:미동산수목원, 7:옥화구곡, 8:충북문화관, 9:문의문화재단지
	
	$('#div_tour_area').hide();
	
	html_string = 
		'<div id="div_contents" onclick="javascript:showTour();" style="background-color: rgba(0, 0, 0, 0.7);">'+
			'<div id="div_tour_detail" onclick="javascript:event.stopPropagation();resetTimer();">'+
				'<div id="close_popup" onclick="javascript:showTour();"></div>'+
			'</div>'
		'<div>';
	$('#div_contents').html(html_string);
	
	$('#div_tour_detail').css('background-image', 'url('+ global_json.tour_detail[index] +')');
	backPage(8);
}
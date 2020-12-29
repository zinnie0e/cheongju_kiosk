var event_json = null;
function initJsonEvent() {
	$.ajax({
		async: false,
		dataType: "json",
		url: "./resources/temp_event.json",
		success: function (result) {
			event_json = result;
		}
	});
}

function initEvent(){ //이벤트 리스트 초기화
	initJsonEvent();
	$('#div_contents').html('');
	$('#div_contents').css('background-image', 'url(./resources/image/main/event_bg_ko.png)');
	
	/*$('#div_guide').css('background-image', 'url(./resources/image/main/event_touch.png)');
	
	$('#div_guide').click(function(){
		logNow("aa");
		$('#div_guide').css('background-image', '');
		$('#div_guide').css('z-index', -999);
	});*/
	
	var html_string = "";
	html_string += '<div class="swiper-container"><div class="swiper-wrapper">';
	for(var i = 0 ; i < parseInt(event_json.event_list.length) ; i++){
		html_string +=
			'<div class="swiper-slide">'+
				'<div id="div_event_list'+ i +'" class="div_event_item" onclick="javascript:event.stopPropagation();showEvent(' + i + ');">'+ event_json.event_list[i]["name"] +'</div>'+
			'</div>';
	}
	html_string += '</div></div>';
		
	$('#div_contents').html(html_string);
	
	var swiper = new Swiper('.swiper-container',{ 
		slidesPerView: 3,
	    spaceBetween: 0,
		direction: 'vertical',
		loop: true
	});
}

function showEvent(index_num){ //각 이벤트 상세 내용
	$('.swiper-container').html("");
	$('#div_contents').css('background-image', 'url(./resources/image/temp_event_detail'+ index_num +'.png)');
	
	$("#div_contents").click(function() { 
		initEvent();
	});
}
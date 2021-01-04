var event_json = null;
function initJsonEvent() {
	event_json = null;
	var sendData = {language: getAbbOfLanguage(language)}
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/event/select_event_list",
		data : JSON.stringify(sendData),
		success: function (result) {
			event_json = result;
		}
	});
}

function MsToFulldate(milisecond){
	var d = new Date(milisecond * 1000);
	var month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
	var day = (d.getDate()) >= 10 ? (d.getDate()) : '0' + (d.getDate());
	var hour = (d.getHours()) >= 10 ? (d.getHours()) : '0' + (d.getHours());
	var minute = (d.getMinutes()) >= 10 ? (d.getMinutes()) : '0' + (d.getMinutes());
	var full_date = d.getFullYear().toString() + month.toString() + day.toString() + hour.toString() + minute.toString();
	
	return full_date;
}

function getEventPeriod(start_time, end_time){
	return start_time.substring(0,4) + '.' + start_time.substring(4,6) + '.' + start_time.substring(6,8) + ' - ' + 
			end_time.substring(0,4) + '.' + end_time.substring(4,6) + '.' + end_time.substring(6,8) + ' / ' + 
			parseInt(start_time.substring(8,10)) + ':' + start_time.substring(10,12) + ' ~ ' + 
			parseInt(end_time.substring(8,10)) + ':' + end_time.substring(10,12);
}

function initEvent(){ //이벤트 리스트 초기화
	initJsonEvent();
	logNow(event_json);
	$('#div_contents').html('');
	$('#div_contents').css('background-image', 'url('+ global_json.event_bg +')');
	
	/*var html_string = "";
	html_string += '<div id="div_event_container">';
	for(var i = 0 ; i < parseInt(event_json.length) ; i++){
		html_string +=
			'<div id="div_event_list'+ i +'" class="div_event_item" onclick="javascript:event.stopPropagation();showEvent(' + i + ');">'+ 
				'<div style="position: absolute; width:734px; height: 156px; top: 58px; left: 62px;">'+
					'<div id="event_poster"><img src="./external_image/poster/'+ event_json[i]["poster"] +'"></img></div>'+
					'<div style="position: absolute; width:599px; height: 156px; left: 135px;">'+
						'<div style="position: absolute; width:599px; height: 25px;">'+
							'<div id="event_cate"><img src="'+ global_json.event_categori[event_json[i]["event_cate"]] +'"></img></div>'+
							'<div id="event_title">'+ event_json[i]["title"] +'</div>'+
						'</div>'+
						'<div style="bottom">'+
							'<div class="event_sub_info">'+
								'<div class="event_info_text">행사기간</div>'+
								'<div id="event_period"></div>'+
							'</div>'+
							'<div class="event_sub_info">'+
								'<div class="event_info_text">행사장소</div>'+
								'<div id="event_place"></div>'+
							'</div>'+
							'<div class="event_sub_info">'+
								'<div class="event_info_text">행사문의</div>'+
								'<div id="event_tel"></div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>';
	}
	html_string += '</div>';
	$('#div_contents').html(html_string);
	$("#div_event_container").scroll(function(event){
	});*/
	
	var html_string = "";
	html_string += 
		'<div id="div_event_up"></div>'+
		'<div class="swiper-container"><div class="swiper-wrapper">';
	for(var i = 0 ; i < parseInt(event_json.length) ; i++){
		var start_time = MsToFulldate(event_json[i]["start_time"]);
		var end_time = MsToFulldate(event_json[i]["end_time"]);
		html_string +=
			'<div class="swiper-slide">'+
				'<div id="div_event_list'+ i +'" class="div_event_item" onclick="javascript:event.stopPropagation();showEvent('+ i +', ' + event_json[i]["uid"] + ');">'+ 
					'<div style="position: absolute; width:734px; height: 156px; top: 58px; left: 62px;">'+
						'<div id="event_poster"><img src="./external_image/poster/poster_s/'+ event_json[i]["poster"] +'"></img></div>'+
						'<div style="position: absolute; width:599px; height: 156px; left: 135px;">'+
							'<div style="position: absolute; width:599px; height: 25px;">'+
								'<div id="event_cate"><img src="'+ global_json.event_categori[event_json[i]["event_cate"]] +'"></img></div>'+
								'<div id="event_title">'+ event_json[i]["title"] +'</div>'+
							'</div>'+
							'<div style="position: absolute; width:584px; height: 111px; top:60px; left: 15px;">'+
								'<div class="event_sub_info">'+
									'<div class="event_info_text">'+ global_json.event_info_title[0] +'</div>'+
									'<div class="event_info_body">'+ getEventPeriod(start_time, end_time) +'</div>'+
								'</div>'+
								'<div class="event_sub_info">'+
									'<div class="event_info_text">'+ global_json.event_info_title[1] +'</div>'+
									'<div class="event_info_body">'+ event_json[i]["place"] +'</div>'+
								'</div>'+
								'<div class="event_sub_info">'+
									'<div class="event_info_text">'+ global_json.event_info_title[2] +'</div>'+
									'<div class="event_info_body">'+ event_json[i]["manager"] + ' / ' + event_json[i]["tel"] +'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>';
	}
	html_string += 
		'</div></div>'+
		'<div id="div_event_down"></div>';
		
	$('#div_contents').html(html_string);
	
	var isLoop = true;
	if($('.swiper-slide').length < 3) isLoop = false;
	var swiper = new Swiper('.swiper-container',{ 
		slidesPerView: 3,
	    spaceBetween: 0,
		direction: 'vertical',
		loop: isLoop,
		invert: false,
		 navigation: {
			 nextEl: '#div_event_down',
		     prevEl: '#div_event_up',
		 },
	});
}

function showEvent(i, uid){ //각 이벤트 상세 내용
	$('#div_contents').html('');
	
	var start_time = MsToFulldate(event_json[i]["start_time"]);
	var end_time = MsToFulldate(event_json[i]["end_time"]);
	
	var html_string = "";
	html_string += 
		'<div id="div_contents" onclick="javascript:initEvent();" style="background-color: rgba(0, 0, 0, 0.7);">'+
			'<div id="div_event_detail" onclick="javascript:event.stopPropagation();resetTimer();">'+
				'<div style="position: absolute; width:820px; height: 30px; top: 65px; left: 40px;">'+
					'<div id="event_cate_detail"><img src="'+ global_json.event_categori[event_json[i]["event_cate"]] +'"></img></div>'+
					'<div id="event_title_detail">'+ event_json[i]["title"] +'</div>'+
				'</div>'+
				'<div id="event_poster_detail"><img src="./external_image/poster/'+ event_json[i]["poster"] +'"></img></div>'+
				'<div style="position: absolute; width:497px; height: 90px; top:160px; left: 365px;">'+
					'<div class="event_sub_info_detail">'+
						'<div class="event_info_text_detail">'+ global_json.event_info_title[0] +'</div>'+
						'<div class="event_info_body_detail">'+ getEventPeriod(start_time, end_time) +'</div>'+
					'</div>'+
					'<div class="event_sub_info_detail">'+
						'<div class="event_info_text_detail">'+ global_json.event_info_title[1] +'</div>'+
						'<div class="event_info_body_detail">'+ event_json[i]["place"] +'</div>'+
					'</div>'+
					'<div class="event_sub_info_detail">'+
						'<div class="event_info_text_detail">'+ global_json.event_info_title[2] +'</div>'+
						'<div class="event_info_body_detail">'+ event_json[i]["manager"] + ' / ' + event_json[i]["tel"] +'</div>'+
					'</div>'+
				'</div>'+
				'<div id="div_detail_contents" style="position: absolute; width:497px; height: 450px; top:375px; left: 365px;"></div>'+
			'</div>'+
		'</div>';
	
	$('#div_contents').html(html_string);
	
	var event_detail_json = null;
	
	var sendData = {language: getAbbOfLanguage(language), event_uid: uid};
	logNow(sendData);
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		async: false,
		url: SETTING_URL + "/event/select_event_detail_list",
		data : JSON.stringify(sendData),
		success: function (result) {
			logNow(result);
			event_detail_json = result;
		}
	});
	
	html_string = "";
	for(var k = 0 ; k < parseInt(event_detail_json.length) ; k++){
		html_string +=
			'<div class="event_sub_info_detail">'+
				'<div class="event_info_text_detail">'+ event_detail_json[k]["detail_title"] +'</div>'+
				'<div class="event_info_body_detail">'+ event_detail_json[k]["detail_body"] +'</div>'+
			'</div>';
	}
	$('#div_detail_contents').html(html_string);
	
	backPage(6);
}
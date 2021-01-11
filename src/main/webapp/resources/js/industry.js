function showArea0() {
	if(language == "korean" || language == "english")
		initJsonKREN();
	else if(language == "chinese" || language == "japanese")
		initJsonCHJP();
	showSideTop(2);
	
	
	var html_string = '<div id="div_industry_map"></div>'+
		'<div id="div_industry_pin"></div>'+
		'<div id="div_side_detail">'+
					  '</div>'+
					  '<div id="div_scroll_top" onclick="javascript:scrollMove(\'up\')"></div>'+
					  '<div id="div_scroll_bottom" onclick="javascript:scrollMove(\'down\')"></div>'+
					  '<div id="div_area0_industry"><div id="div_industry_detail"></div></div>'+
					  '<div id="div_area0_flow">';
	for(var i = 0; i < 3; i++){
		html_string += '<div id="div_area0_flow' + i + '" class="div_area0_flow" onclick="javascript:showArea0_Flow(' + i + ')"></div>';
	}
	html_string += '</div>'+
				   '<div id="div_area0_map_flow">';
	for(var i=2; i >= 0; i--){
		html_string += '<div id="div_area0_map_flow' + i + '" class="div_area0_map_flow" onclick="javascript:showArea0_Flow(' + i + ')"></div>';
	}
	html_string += '</div>';
	
	$('#div_contents').html(html_string);
	$('#div_scroll_top').css('background-image', 'url(./resources/image/industry/menu_industry_list_top.png)');
	$('#div_scroll_bottom').css('background-image', 'url(./resources/image/industry/menu_industry_list_bottom.png)');
	$('#div_contents').css('background-image', 'url(' + global_json.industry + ')');
	
	showSideDetailArea0("all");
	scrollCheck();	
	
	backPage(1);
}

//업체 데이터 리스트
var industry_json = null;
function initJsonKREN() {
	var from = {language : getAbbOfLanguage(language)};
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/industry/select_industry_list",
		async: false,
		data: JSON.stringify(from),
		success: function (result) {
			industry_json = result;
		},
		error: function () {
		}
	});
}
function initJsonCHJP() {
	var from = {language : getAbbOfLanguage(language)};
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: SETTING_URL + "/industry/select_industry_list2",
		async: false,
		data: JSON.stringify(from),
		success: function (result) {
			industry_json = result;
		},
		error: function () {
		}
	});
}

//가나다 순 업체 표시
function setSideArea0(i) {
	switch (i) {
	case 0:
		setIndustrySide(1);
		showSideDetailArea0("0");
		break;
	case 1:
		setIndustrySide(2);
		showSideDetailArea0("1");
		break;
	case 2:
		setIndustrySide(3);
		showSideDetailArea0("2");
		break;
	case 3:
		setIndustrySide(4);
		showSideDetailArea0("3");
		break;
	case 4:
		setIndustrySide(5);
		showSideDetailArea0("4");
		break;
	case 5:
		setIndustrySide(6);
		showSideDetailArea0("5");
		break;
	case 6:
		setIndustrySide(7);
		showSideDetailArea0("6");
		break;
	default:
		break;
	}
}

//문화산업단지 업체리스트
function showSideDetailArea0(index_value) {
	$("#div_side_detail").scrollTop(0);
	var html_string = "";
	var flow = 0;
	if($('#div_industry_map').css('backgroundImage') != "none" ) {		
		flow = $('#div_industry_map').css('backgroundImage').slice(-8,-7);
	}
	
	if(index_value == "all"){
		for(var i = 0; i < industry_json.length; i++){
			html_string += '<div id="div_area0_side_detail' + i + '" class="div_area0_side_detail" onclick="javascript:setSideDetailArea0(' + i + ',' + '\'' + industry_json[i].name + '\');">' + '<div id="div_industry_name"><div id="mul">' + industry_json[i].name + '</div></div></div>';
		}
		$('#div_side_detail').html(html_string);
		if($('#div_area0_side_detail').length >= 10) {
			$('#div_scroll_bottom').hide();
		}
	} else if(language == "korean"){
		industrySort(flow);
		koreanList(index_value);
	} else if(language == "english" || language == "chinese" || language == "japanese") {
		industrySort(flow);
		englishList(index_value);
	}
	if($('#div_side_detail').children().length < 12) {
		$('#div_scroll_bottom').hide();
		$('#div_scroll_top').hide();
	}
	//기업 리스트 11개 이하 스크롤 제거
	if($('.div_area0_side_detail_list').length <= 11 && $('.div_area0_side_detail').length == 0) {
		$('div_area0_side_detail'+ $('.div_area0_side_detail_list').length-1 +'').height(47);
		$('#div_scroll_top').hide();
		$('#div_scroll_bottom').hide();
		$('#div_scroll_bottom').css('display', 'none');
		$('#div_side_detail').css('overflow', 'hidden'); 
	}
	else {
		html_string +=
			'<div id="div_scroll_top" onclick="javascript:scrollMove(\'up\')"></div>'+
			'<div id="div_scroll_bottom" onclick="javascript:scrollMove(\'down\')"></div>'+
		$('div_side_detail').html(html_string);
		$('#div_scroll_bottom').show();
		$('#div_side_detail').css('overflow', 'auto');
	}
	
	$('#div_side_detail').css('background-image', 'url(./resources/image/industry/menu_industry_list_bg2.png)');
	$('.div_area0_side_detail').css('background-image', 'url(./resources/image/industry/menu_industry_list_bg.png)');
	$('.div_area0_side_detail_list').css('background-image', 'url(./resources/image/industry/menu_industry_list_bg.png)');
	
	backPage(3);
}

//문화산업단지 기업 설명
var before = null;
function setSideDetailArea0(index, name) {
	
	$('#div_area0_industry').show();
		$(document).ready(function () {
			$('.div_side_area0').click(function() {
			before = null;
		});
	});
	for(var i=0; i < industry_json.length; i++){
		if(industry_json[i].name == name){
			data = industry_json[i];
			break;
		}
	}
	var busi = [];
	if(data.busi1) {
		busi[0] = data.busi1;
	}
	if(data.busi2) {
		busi[1] = data.busi2;
	}
	if(data.busi3) {
		busi[2] = data.busi3;
	}
	if(data.busi4) {
		busi[3] = data.busi4;
	}
	if(data.busi5) {
		busi[4] = data.busi5;
	}
	var infolist = [];
	var complex = [];
	if(language == "korean") {
		infolist[0] = "대표자";
		infolist[1] = "사업분야";
		infolist[2] = "아이템";
		complex[0] = "첨단문화산업단지";
		complex[1] = "호";
	} else if(language == "english") {
		infolist[0] = "Representative";
		infolist[1] = "Business Area";
		infolist[2] = "Item";
		complex[0] = "Cultural Industrial Complex";
		complex[1] = "Unit";
	} else if(language == "chinese") {
		infolist[0] = "대표자";
		infolist[1] = "사업분야";
		infolist[2] = "아이템";
		complex[0] = "";
		complex[1] = "Unit";
	} else if(language == "japanese") {
		infolist[0] = "대표자";
		infolist[1] = "사업분야";
		infolist[2] = "아이템";
		complex[0] = "";
		complex[1] = "Unit";
	}
	html_string = 
		'<div id="div_industry_detail0" class="div_industry_name"><b>' + data.name + '</b></div>'+
		'<div id="div_industry_detail1" class="div_industry_unit">' + complex[0] + ' <b>' + data.room + ' '; 
		if(data.room.slice(-1) != "층") html_string += complex[1];
		html_string += '</b></div>'+
		'<div id="div_industry_logo">'+
			'<img src="">'+
		'</div>'+
			'<div id="div_industry_info">';
				if(data.owner){
					html_string +=
						'<div id="div_ceo">' + infolist[0] + '</div>'+
						'<div id="div_ceo_value">' + data.owner + '</div>';
				}
				if(busi.length){
					html_string += '<div id="div_business">' + infolist[1] + '</div><div id="div_busi">';
					for(var i = 0; i < busi.length; i++)
						html_string += '<div id="div_business_value">' + busi[i] + '</div>';
					html_string += '</div>';
				}
				if(data.item)
					html_string += '<div id="div_item">' + infolist[2] + '</div>'+
								   '<div id="div_item_value">' + data.item + '</div>';
				html_string += '<div id=div_info_bottom>';
				if(data.tel) {
					html_string += 
					'<div id="div_phone" class="div_img"></div>'+ 
						'<p id="p_phone_value">' + data.tel + '</p>';
				}
				if(data.email) {
				html_string +=
					'<div id="div_mail" class="div_img"></div>'+
						'<p id="p_email_value">' + data.email + '</p>';
				}
				if(data.homepage) {
				html_string +=
					'<div id="div_website" class="div_img"></div>'+
					'<p id="p_homepage_value">' + data.homepage + '</p>';
				}
				html_string += '</div>';
			'</div>';
	
	var top = "";
	var left = "";
	if(data.flow == 1) {
		top = Number(data.image_x) + Number(100);
		left = data.image_y-24;
	} else if(data.flow == 2) {
		top = Number(data.image_x)+Number(115);
		left = data.image_y-26;
	} else if(data.flow == 3) {
		top = Number(data.image_x)+Number(110);
		left = data.image_y-26;
	}
			
	$('#div_industry_detail').html(html_string);
	$('#div_industry_pin').show();
	$('#div_industry_pin').css('top', top + 'px');
	$('#div_industry_pin').css('left', left + 'px');
	$('#div_area0_map_flow').hide();
	$('#div_area0_pin').show();
	$('#div_area0_flow').css('top', '575px');
	$('#div_industry_detail').css('background-image', 'url(./resources/image/industry/industry_detail_bg.png)');
	$('#div_phone').css('background-image', 'url(./resources/image/industry/industry_detail_icon_tel.png)');
	$('#div_industry_pin').css('background-image', 'url(./resources/image/poi/point_arrival.png)');
	$('#div_mail').css('background-image', 'url(./resources/image/industry/industry_detail_icon_mail.png)');
	$('#div_website').css('background-image', 'url(./resources/image/industry/industry_detail_icon_web.png)');
	$('#div_contents').css('background-image', 'url(' + global_json.industry_floor[data.flow-1] + ')');
	$('#div_area0_side_detail' + index + '').css('background-image', 'url(./resources/image/industry/menu_industry_list_sellect_bg.png)');
	$('#div_industry_map').css('background-image', 'url(./resources/image/industry/industry_map_' + data.flow + 'f.png)');
	if(!(before == null) || !(index == before)) {
		$('#div_area0_side_detail' + before + '').css('background-image', 'url(./resources/image/industry/menu_industry_list_bg.png)');
	}
	if((index == before))
		$('#div_area0_side_detail' + before + '').css('background-image', 'url(./resources/image/industry/menu_industry_list_sellect_bg.png)');

	before = index;

	backPage(3);
}


//문화산업단지 각 층별 이미지
function showArea0_Flow(flow){
	html_string = "";
	$('#div_scroll_top').show();
	$('#div_scroll_bottom').show();
	$('#div_area0_industry').hide();
	$('#div_industry_pin').hide();
	$('#div_contents').css('background-image', 'url(' + global_json.industry_floor[flow] + ')');
	$('#div_industry_map').css('background-image', 'url(./resources/image/industry/industry_map_' + (flow+1) + 'f.png)');
	$('#div_area0_flow').css('top', '575px');
	
	for(var i = 0; i < industry_json.length; i++){
		if(industry_json[i].flow == (flow+1)){
			html_string += '<div id="div_area0_side_detail' + i + '" class="div_area0_side_detail" onclick="javascript:setSideDetailArea0(' + i + ',' + '\'' + industry_json[i].name + '\');">' + '<div id="div_industry_name"><div id="mul">' + industry_json[i].name + '</div></div></div>';
		}
	}
	
	$('#div_side_detail').html(html_string);
	html_string = "";
	//기업 리스트 11개 이하 스크롤 제거
	if($('.div_area0_side_detail_list').length <= 11 && $('.div_area0_side_detail').length <= 11) {
		$('#div_scroll_top').hide();
		$('#div_scroll_bottom').hide();
		$('#div_side_detail').css('overflow', 'hidden'); 
	}
	else {
		html_string +=
			'<div id="div_scroll_top" onclick="javascript:scrollMove(\'up\')"></div>'+
			'<div id="div_scroll_bottom" onclick="javascript:scrollMove(\'down\')"></div>'+
		$('div_side_detail').html(html_string);
		$('#div_scroll_top').hide();
		$('#div_scroll_bottom').show();
		
	}
	$('#div_side_detail').css('overflow', 'auto');
	$('#div_side_top').css('background-image', 'url('+ global_json.side_industry_top[0] +')');
	$('.div_area0_side_detail_list').css('background-image', 'url(./resources/image/industry/menu_industry_list_bg.png)');
	$('.div_area0_side_detail').css('background-image', 'url(./resources/image/industry/menu_industry_list_bg.png)');
	backPage(3);
}

//한국어 기업 리스트
function koreanList(index_value) {
	html_string = "";
	for(var i = 0; i < sort_list[index_value].length; i++){
		html_string += '<div id="div_area0_side_detail' + i + '" class="div_area0_side_detail_list" onclick="javascript:setSideDetailArea0(' + i + ',' + '\'' + sort_list[index_value][i] + '\');">' + '<div id="div_industry_name"><div id="mul">' + sort_list[index_value][i] + '</div></div></div>';
	}
	$('.div_area0_side_detail_list').css('background-image', 'url(./resources/image/industry/menu_industry_list_bg.png)');
	$('#div_side_detail').html(html_string);
}
//영어 기업 리스트
function englishList(index_value) {
	html_string = "";
	for(var i = 0; i < sort_list[index_value].length; i++){
		html_string += '<div id="div_area0_side_detail' + i + '" class="div_area0_side_detail_list" onclick="javascript:setSideDetailArea0(' + i + ',' + '\'' + sort_list[index_value][i] + '\');">' + '<div id="div_industry_name"><div id="mul">' + sort_list[index_value][i] + '</div></div></div>';
	}
	$('.div_area0_side_detail_list').css('background-image', 'url(./resources/image/industry/menu_industry_list_bg.png)');
	$('#div_side_detail').html(html_string);
}

//문화산업단지 사이드(가나다 정리)
var industry_list = [];
var sort_list = {0:[], 1:[], 2:[], 3:[], 4:[], 5:[], 6:[]};
var division = ["",""];
function industrySort(flow) {
	sort_list = {0:[], 1:[], 2:[], 3:[], 4:[], 5:[], 6:[]};
	industry_list = [];
	for(var j=0; j < industry_json.length; j++) {
		if(language == "korean" || language == "english")
			name = industry_json[j].name;
		else if(language == "chinese" || language == "japanese"){
			name = industry_json[j].en;
		}
		industry_list.push(name);
	}
	if(language == "korean") {
		sortResult = sort(industry_list);
		for(var i=0; i < sortResult.length; i++) {

			var fullName = compare[i][1]+sortResult[i];
			
			
			//ㄱㄴ
			if(compare[i][0] < "b2e4"){
				sort_list["0"].push(fullName);
			}
			//ㄷㄹ
			else if(compare[i][0] < "b9c8"){
				sort_list["1"].push(fullName);
			}
			//ㅁㅂ
			else if(compare[i][0] < "c0ac"){
				sort_list["2"].push(fullName);
			}
			//ㅅㅇ
			else if(compare[i][0] < "c790"){
				sort_list["3"].push(fullName);
			}
			//ㅈㅊ
			else if(compare[i][0] < "ce74"){
				sort_list["4"].push(fullName);
			}
			//ㅋㅌ
			else if(compare[i][0] < "d30c"){
				sort_list["5"].push(fullName);
			}
			//ㅍㅎ
			else{
				sort_list["6"].push(fullName);
			}
					//}
			//}
		}
		for(var i=0; i < 7; i++) {
			sort_list[i].sort();
		}
		
	} else if(language == "english" || language == "chinese" || language == "japanese") {
		var com = "";
		var test_list = [];
		for(var i=0; i < industry_list.length; i++) {
			test_list.push(industry_list[i]);
		}
		test_list.sort(function(a, b) {
			const upperCaseA = a.toUpperCase();
			  const upperCaseB = b.toUpperCase();
			  
			  if(upperCaseA > upperCaseB) return 1;
			  if(upperCaseA < upperCaseB) return -1;
			  if(upperCaseA === upperCaseB) return 0;
		});
		if(language == "english") {
			for(var i=0; i < industry_list.length; i++) {
				com = (test_list[i].substring(0,1)).toLowerCase();
				if(com < "d"){
					sort_list["0"].push(test_list[i]);
				}
				//DEFG
				else if(com < "h") {
					sort_list["1"].push(test_list[i]);
				}
				//HIJK
				else if(com < "l") {
					sort_list["2"].push(test_list[i]);
				}
				//LMNO
				else if(com < "p") {
					sort_list["3"].push(test_list[i]);
				}
				//PQRS
				else if(com < "t") {
					sort_list["4"].push(test_list[i]);
				}
				//TUV
				else if(com < "w") {
					sort_list["5"].push(test_list[i]);
				}
				//WXYZ
				else {
					sort_list["6"].push(test_list[i]);
				}
			}
		}
		else if(language == "chinese" || language == "japanese") {
			for(var i=0; i < industry_list.length; i++) {
				
				for(var j=0; j < test_list.length; j++){
					if(test_list[j] == industry_json[i].en){
						com = (test_list[j].substring(0,1)).toLowerCase();
						if(com < "d"){
							if(industry_json[i].en == "K.H"){
							}
							sort_list["0"].push(industry_json[i].name);
						}
						//DEFG
						else if(com < "h") {
							sort_list["1"].push(industry_json[i].name);
						}
						//HIJK
						else if(com < "l") {
							sort_list["2"].push(industry_json[i].name);
						}
						//LMNO
						else if(com < "p") {
							sort_list["3"].push(industry_json[i].name);
						}
						//PQRS
						else if(com < "t") {
							sort_list["4"].push(industry_json[i].name);
						}
						//TUV
						else if(com < "w") {
							sort_list["5"].push(industry_json[i].name);
						}
						//WXYZ
						else {
							sort_list["6"].push(industry_json[i].name);
						}
					}
				}
			}
		}
	}
}

//기업 순서 정렬
var compare = [];
function sort(industry_list) {
	var name = [];
	compare = [];
		for(var i=0; i < industry_list.length; i++) {
			comResult = separation(industry_list[i]);
			if(comResult[1] == "㈜")
				cut = 1;
			else if(comResult[1] == "(사)" || comResult[1] == "(주)")
				cut = 3;
			else if(comResult[1] == "")
				cut = 0;
			else
				cut = comResult[1].length;
			if(cut==0) {
				compare.push(comResult);
				name.push(industry_list[i]);
			}
			else {
				compare.push(comResult);
				name.push(industry_list[i].substring(cut));
			}

			if(industry_list[0][i] == name) {
				industry_list[0][i] = division[1] + name;
			}
			
		}
		return name;

}

//초성 분리
function separation(name) {
	var result = IsEnglish(name);
	
	division = ["",""];
	if(name[0]=="㈜") {
		division[0] = name[1].charCodeAt(0).toString(16);
		division[1] = "㈜";
		division[2] = name.slice(1);
	}
	else if(name[0]=="(") {
		division[0] = name[3].charCodeAt(0).toString(16);
		if(name.substring(0,3) == "(사)")
			division[1] = "(사)";
		else if(name.substring(0,3) == "(주)")
			division[1] = "(주)";
		division[2] = name.slice(3);
	}
	else if(result[0] > 0) {
		division[0] = name[result[0]].charCodeAt(0).toString(16);
		division[1] = name.substring(0,result[0]);
		division[2] = name;
	}
	else {
		division[0] = name[0].charCodeAt(0).toString(16);
		division[1] = "";
		division[2] = name;
	}

	return division;
}

//한글 자음모음 분리
function getConstantVowel(kor) {
    const f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
               'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
               'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    const s = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ',
               'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ',
               'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
    const t = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
               'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
               'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
               'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

    const ga = 44032;
    let uni = kor.charCodeAt(0);

    uni = uni - ga;

    let fn = parseInt(uni / 588);

    return f[fn];
}

//알파벳 검사
function IsEnglish(ch){
	for(var i=0; i < ch.length; i++){
	    if ((0x61 <= ch[i].charCodeAt() && ch[i].charCodeAt() <= 0x7A) || (0x41 <= ch[i].charCodeAt() && ch[i].charCodeAt() <= 0x5A))
	    	{}
	    else
	    	return [ i, true ];
	}
}

function setIndustrySide(index){
	switch(index){
		case 0: 
			$('#div_side_top').css('background-image', 'url('+ global_json.side_industry_top[0] +')');
			break;
		case 1: 
			$('#div_side_top').css('background-image', 'url('+ global_json.side_industry_top[1] +')');
			break;
		case 2: 
			$('#div_side_top').css('background-image', 'url('+ global_json.side_industry_top[2] +')');
			break;
		case 3: 
			$('#div_side_top').css('background-image', 'url('+ global_json.side_industry_top[3] +')');
			break;
		case 4: 
			$('#div_side_top').css('background-image', 'url('+ global_json.side_industry_top[4] +')');
			break;
		case 5: 
			$('#div_side_top').css('background-image', 'url('+ global_json.side_industry_top[5] +')');
			break;
		case 6: 
			$('#div_side_top').css('background-image', 'url('+ global_json.side_industry_top[6] +')');
			break;
		case 7: 
			$('#div_side_top').css('background-image', 'url('+ global_json.side_industry_top[7] +')');
			break;
	}
}
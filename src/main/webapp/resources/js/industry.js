function showArea0() {
	initJsonArea0();
	showSideTop(2);
	industrySort();
	
	var html_string = '<div id="div_side_detail">'+
					  '</div>'+
					  '<div id="div_scroll_top"></div>'+
					  '<div id="div_scroll_bottom"></div>'+
					  '<div id="div_area0_industry"><div id="div_industry_detail"></div></div>'+
					  '<div id="div_area0_flow">';
	
	for(var i=2; i >= 0; i--){
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
	$('#div_contents').css('background-image', global_json.industry);
	
	showSideDetailArea0("all");
	scrollCheck();	
	
	backPage(1);
}

//업체 데이터 리스트
from = {};
var industry_json = null;
function initJsonArea0() {
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8;",
		dataType: "json",
		url: "http://localhost:9090/industry/select_industry_list",
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
		showSideDetailArea0("0");
		break;
	case 1:
		showSideDetailArea0("1");
		break;
	case 2:
		showSideDetailArea0("2");
		break;
	case 3:
		showSideDetailArea0("3");
		break;
	case 4:
		showSideDetailArea0("4");
		break;
	case 5:
		showSideDetailArea0("5");
		break;
	case 6:
		showSideDetailArea0("6");
		break;
	default:
		break;
	}
}

//문화산업단지 업체리스트
function showSideDetailArea0(index_value) {
	var html_string = "";
	if(index_value == "all"){
		//ajax all
		//ajax 변경 후 인수 i를 json_data로 변경해야 함
		for(var i = 0; i < industry_json.length; i++){
			html_string += '<div id="div_area0_side_detail' + i + '" class="div_area0_side_detail" onclick="javascript:setSideDetailArea0(' + i + ',' + '\'' + industry_json[i].name + '\');">' + '<div id="div_industry_name">' + industry_json[i].name + '</div></div>';
		}
		$('#div_side_detail').html(html_string);
		if($('#div_area0_side_detail').length >= 10) {
			$('#div_scroll_bottom').hide();
		}
	} else {
		for(var i = 0; i < sort_list[index_value].length; i++){
			html_string += '<div id="div_area0_side_detail' + i + '" class="div_area0_side_detail_list" onclick="javascript:setSideDetailArea0(' + i + ',' + '\'' + sort_list[index_value][i] + '\');">' + '<div id="div_industry_name">' + sort_list[index_value][i] + '</div></div>';
		}
		$('#div_side_detail').html(html_string);
		$('#div_area0_flow').css('top', '460px');
		if($('#div_area0_side_detail').length <= 10) {
			$('#div_scroll_bottom').remove();
		}
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
	
	//json 데이터로 변경 해야 함
	for(var i=0; i < industry_json.length; i++){
		if(industry_json[i].name == name){
			data = industry_json[i];
			break;
		}
	}
	logNow(data.busi1);
	logNow(data.busi2);
	var busi = "-";
	if(data.busi1) {
		busi = data.busi1;
	}
	if(data.busi2) {
		busi += "/" + data.busi2;
	}
	if(data.busi3) {
		busi += "/" + data.busi3;
	}
	if(data.busi4) {
		busi += "/" + data.busi4;
	}
	if(data.busi5) {
		busi += "/" + data.busi5;
	}
	
	html_string = 
		'<div id="div_industry_detail0" class="div_industry_name">' + data.name + '</div>'+
		'<div id="div_industry_detail1" class="div_industry_unit">첨단문화산업단지' + data.room + '호</div>'+
		'<div id="div_industry_logo">'+
			'<img src="">'+
		'</div>'+
			'<div id="div_industry_info">'+
				'<div id="div_ceo">' + data.owner + '</div>'+
				'<div id="div_business">' + busi + '</div>'+
				'<div id="div_item">' + "c" + '</div>'+
				'<div id="div_phone">'+ 
					'<div id="div_phone_image">'+
						'<img src="./resources/image/industry/industry_detail_icon_tel.png">'+
					'</div>'+
					'<p id="p_value">' + data.tel + '</p>'+
				'</div>'+					
				'<div id="div_mail">'+
					'<div id="div_mail_image">'+
						'<img src="./resources/image/industry/industry_detail_icon_mail.png">'+
					'</div>'+
					'<p id="p_value">' + data.email + '</p>'+
				'</div>'+
				'<div id="div_website">'+
					'<div id="div_phone_website">'+
						'<img src="./resources/image/industry/industry_detail_icon_web.png">'+
					'</div>'+
					'<p id="p_value">' + data.homepage + '</p>'+
				'</div>'+
			'</div>';
	/*showArea0_Flow(industry_json.industry_kor[i].flow);
	$('#div_area0_pin').css('top', industry_json.industry_kor[i].top);
	$('#div_area0_pin').css('left', industry_json.industry_kor[i].left);*/
	$('#div_industry_detail').html(html_string);
	$('#div_area0_map_flow').hide();
	$('#div_area0_pin').show();
	$('#div_area0_flow').css('top', '460px');
	$('#div_industry_detail').css('background-image', global_json.industry_detail_bg);
	$('#div_contents').css('background-image', global_json.industry_floor[data.flow-1]);
	$('#div_area0_side_detail' + index + '').css('background-image', 'url(./resources/image/industry/menu_industry_list_sellect_bg.png)');
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
	$('#div_area0_industry').hide();
	$('#div_contents').css('background-image', global_json.industry_floor[flow]);
	$('#div_area0_flow').css('top', '460px');
	
	backPage(3);
}

//문화산업단지 사이드(가나다 정리)
var industry_list = [];
var sort_list = {0:[], 1:[], 2:[], 3:[], 4:[], 5:[], 6:[]};
var division = ["",""];
function industrySort() {
	sort_list = {0:[], 1:[], 2:[], 3:[], 4:[], 5:[], 6:[]};
	industry_list = [];
	for(var j=0; j < industry_json.length; j++) {
		name = industry_json[j].name;
		industry_list.push(name);
	}
	sortResult = sort(industry_list);
	compare.sort();
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
				//compare.push({name:separation(industry_list[i]),comp:industry_list[i]});
			}
			else {
				compare.push(comResult);
				name.push(industry_list[i].substring(cut));
				//compare.push({name:separation(industry_list[i]),comp:industry_list[i].substring(cut)});
			}

			if(industry_list[0][i] == name) {
				industry_list[0][i] = division[1] + name;
			}
			
		}
		return name.sort();

}

//초성 분리
function separation(name) {
	var result = IsEnglish(name);
	division = ["",""];
	if(name[0]=="㈜") {
		division[0] = name[1].charCodeAt(0).toString(16);
		division[1] = "㈜";
	}
	else if(name[0]=="(") {
		division[0] = name[3].charCodeAt(0).toString(16);
		if(name.substring(0,3) == "(사)")
			division[1] = "(사)";
		else if(name.substring(0,3) == "(주)")
			division[1] = "(주)";
	}
	else if(result[0] > 0) {
		division[0] = name[result[0]].charCodeAt(0).toString(16);
		division[1] = name.substring(0,result[0]);
	}
	else {
		division[0] = name[0].charCodeAt(0).toString(16);
		division[1] = "";
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
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<html>
<head>
	<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">

	<link rel="stylesheet" href="./resources/css/main.css" type="text/css" />
	<link rel="stylesheet" href="./resources/css/event.css" type="text/css" />
	<link rel="stylesheet" href="./resources/css/industry.css" type="text/css" />
	<link rel="stylesheet" href="./resources/css/culture.css" type="text/css" />
	<link rel="stylesheet" href="./resources/css/culture_wonder.css" type="text/css" />
	<link rel="stylesheet" href="./resources/css/culture_craft.css" type="text/css" />
	<link rel="stylesheet" href="./resources/css/dongbu.css" type="text/css" />
	
	<!-- 슬라이더 라이브러리 -->
	<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.css">
	<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css">
	<script src="https://unpkg.com/swiper/swiper-bundle.js"></script>
	<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
	
	<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
	
	<script src="./resources/js/main.js"></script>
	<script src="./resources/js/event.js"></script>
	<script src="./resources/js/industry.js"></script>
	<script src="./resources/js/culture.js"></script>
	<script src="./resources/js/culture_wonder.js"></script>
	<script src="./resources/js/culture_craft.js"></script>
	<script src="./resources/js/culture_library.js"></script>
	<script src="./resources/js/culture_media.js"></script>
	<script src="./resources/js/foundation.js"></script>
	<script src="./resources/js/parking.js"></script>
	<script src="./resources/js/museum.js"></script>
	<script src="./resources/js/dongbu.js"></script>
	
	<title>Home</title>
</head>
<body onclick="javascript:resetTimer();">
	<div id="kiosk_root" class="font_kr">
		<div id="div_top">
			<div id="ticker_top" style="position:absolute; width: 1000px; height: 110px; margin-top: 60px; margin-left: 40px;">
				<div id="ticker_left" style="width: 70%; height: 100%; float: left;">
					<div id="ticker_temperature_icon"></div>
					<div id="ticker_right" style="width: 590px; height: 100%; float: left;">
						<div id="ticker_date"></div>
						<div id="ticker_bottom" style="width: 550px; height: 45px; margin-left: 40px; margin-top:20px;">
							<div id="ticker_temperature"></div>
							<div id="ticker_finedust"></div>
							<div id="ticker_finedust_icon"></div>
						</div>
					</div>
				</div>
				<div id="ticker_time"></div>
			</div>
			<div id="ticker_notice"><p><MARQUEE id="ticker_notice_ment" behavior="scroll"></MARQUEE></p></div>
		</div>
		<div id="div_main">
			<div id="div_promotion" onclick="javascript:initMain();"></div>
			<div id="div_contents"></div>
			<div id="div_side">
				<div id="div_side_top"></div>
				<div id="div_side_bottom"></div>
			</div>
			<div id="div_bottom"></div>
		</div>
		<img id="img_shadow" src="./resources/image/main/shadow.png"></img>
	</div>
</body>
</html>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<html>
<head>
	<link rel="stylesheet" href="./resources/css/main.css" type="text/css" />
	<link rel="stylesheet" href="./resources/css/event.css" type="text/css" />
	<link rel="stylesheet" href="./resources/css/area0.css" type="text/css" />
	<link rel="stylesheet" href="./resources/css/area1.css" type="text/css" />
	<link rel="stylesheet" href="./resources/css/area1_0.css" type="text/css" />
	<link rel="stylesheet" href="./resources/css/area1_1.css" type="text/css" />
	<link rel="stylesheet" href="./resources/css/area4.css" type="text/css" />
	
	<!-- 슬라이더 라이브러리 -->
	<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.css">
	<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css">
	<script src="https://unpkg.com/swiper/swiper-bundle.js"></script>
	<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
	
	<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
	
	<script src="./resources/js/main.js"></script>
	<script src="./resources/js/event.js"></script>
	<script src="./resources/js/area0.js"></script>
	<script src="./resources/js/area1.js"></script>
	<script src="./resources/js/area1_0.js"></script>
	<script src="./resources/js/area1_1.js"></script>
	<script src="./resources/js/area1_2.js"></script>
	<script src="./resources/js/area1_3.js"></script>
	<script src="./resources/js/area1_4.js"></script>
	<script src="./resources/js/area2.js"></script>
	<script src="./resources/js/area3.js"></script>
	<script src="./resources/js/area4.js"></script>
	
	<title>Home</title>
</head>
<body onclick="javascript:resetTimer();">
	<div id="div_top">
		<div id="ticker_top" style="position:absolute; width: 1000px; height: 110px; margin-top: 60px; margin-left: 40px;">
			<div id="ticker_left" style="width: 75%; height: 100%; float: left;">
				<div id="ticker_temperature_icon"></div>
				<div id="ticker_right" style="width: 640px; height: 100%; float: left;">
					<div id="ticker_date"></div>
					<div id="ticker_bottom" style="width: 600px; height: 45px; margin-left: 40px; margin-top:20px;">
						<div id="ticker_temperature"><a id="ticker_temperature_min"></a><a style="height:45px;">&nbsp;/&nbsp;</a><a id="ticker_temperature_max"></a></div>
						<div id="ticker_finedust">미세먼지</div>
						<div id="ticker_finedust_icon"></div>
					</div>
				</div>
			</div>
			<div id="ticker_time"></div>
		</div>
		<div id="ticker_notice"><p><MARQUEE id="ticker_notice_ment" behavior="scroll"></MARQUEE></p></div>
	</div>
	<div id="div_main">
		<div id="div_promotion"></div>
		<div id="div_contents"></div>
		<div id="div_side">
			<div id="div_side_top"></div>
			<div id="div_side_bottom"></div>
		</div>
	</div>
	<img id="img_shadow" src="./resources/image/shadow.png"></img>
</body>
</html>

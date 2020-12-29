<%@page import="org.xml.sax.SAXException"%>
<%@page import="javax.xml.parsers.ParserConfigurationException"%>
<%@page import="org.w3c.dom.Element"%>
<%@page import="org.w3c.dom.Node"%>
<%@page import="org.w3c.dom.NodeList"%>
<%@page import="org.w3c.dom.Document"%>
<%@page import="javax.xml.parsers.DocumentBuilder"%>
<%@page import="javax.xml.parsers.DocumentBuilderFactory"%>
<%@page import="java.io.IOException"%>
<%@page import="javax.net.ssl.HttpsURLConnection"%>
<%@page import="java.net.URL"%>
<%@page import="java.util.stream.Collectors"%>
<%@page import="java.io.BufferedReader"%>
<%@page import="java.io.InputStreamReader"%>
<%@page import="java.io.InputStream"%>
<%@page import="java.util.Random"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
invokeNextVal();
%>
{
	"val" : <%= temperature %>,
	"maxtem" : <%= maxtemperature %>,
	"mintem" : <%= mintemperature %>,
	"clouds" : <%= clouds %>,
	"rain" : <%= rain %>,
	"weaCode" : <%= weaCode %>,
	"weather" : "<%= weatherDetail %>",
	"msg" : "<%= msg %>"
}
<%!
// 다음값
private static Random rndTemp = null;

// 체크 주기
private static final long CHECK_INTERVAL = 100L;
private static long lastCheckTime = 0;

// 온도
private static String temperature = null;
private static String maxtemperature = null;
private static String mintemperature = null;
// 날씨
private static String clouds = null;
private static String rain = null;
private static String weaCode = null;
private static String weatherDetail = null;
// 메시지
private static String msg = null;

private void invokeNextVal(){
	// 다음 값을 불러오기
	long currentTime = System.currentTimeMillis();
	if(currentTime >= lastCheckTime + CHECK_INTERVAL){
		// 현재 시각이 마지막 체크 시각 + CHECK_INTERVAL 를 지났으면
		
		msg = checkNow();
	}	
}

private String checkNow(){

	// 실제 연결이 이루어짐
	try{
		URL url = new URL("https://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=4311453000");
		HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
		
		conn.connect();
		
		
		//inputStream을  문자열로
		InputStream is = conn.getInputStream();
		//InputStreamReader isr = new InputStreamReader(is);
		//BufferedReader br = new BufferedReader(isr);
		//String result = br.lines().collect(Collectors.joining("\n"));
		
		
		// 출력
		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
		Document doc = dBuilder.parse(is);
				
		//optional, but recommended
		//read this - http://stackoverflow.com/questions/13786607/normalization-in-dom-parsing-with-java-how-does-it-work
		doc.getDocumentElement().normalize();
				
		NodeList nList = doc.getElementsByTagName("body");// body 태그가 데이터임

		for(int cur = 0  ; cur < nList.getLength(); cur ++){
			Node nNode = nList.item(cur);
			if (nNode.getNodeType() == Node.ELEMENT_NODE) {
				//Node를 Element로 변환
				Element eElement = (Element) nNode;
				
				// temp 온도
				temperature = eElement.getElementsByTagName("temp").item(0).getFirstChild().getNodeValue();
				maxtemperature = eElement.getElementsByTagName("tmx").item(0).getFirstChild().getNodeValue();
				mintemperature = eElement.getElementsByTagName("tmn").item(0).getFirstChild().getNodeValue();
				
				// sky 구름
				clouds = eElement.getElementsByTagName("sky").item(0).getFirstChild().getNodeValue();
				
				// pty 강수량
				rain = eElement.getElementsByTagName("pty").item(0).getFirstChild().getNodeValue();
				
				if("0".equals(rain)){
					//강수량이 없으면
					String code = null;
					switch(clouds){
						default:
						case "1":
							code = "1";	//맑음
							break;
						case "2":
							code = "2";	//구름 조금
							break;
						case "3": //구름 많음
							code = "3";	//구름 많음 + 흐림
							break;
						case "4": //흐림
							code = "3";	//구름 많음 + 흐림
							break;
					}
					weaCode = code;	//반영하기

				}else{
					//강수량이 있으면
					String code = null;
					switch(rain){
						default:
						case "1":
							code = "4";	//비
							break;
						case "2":
							code = "5";	//비 + 눈
							break;
						case "3":
							code = "6";	//눈
							break;
					}
					weaCode = code;	//반영하기
				}
				
				//날씨 상세 한국어
				/* weatherDetail = eElement.getElementsByTagName("wfKor").item(0).getFirstChild().getNodeValue(); */
			}
		}
		// close
		conn.disconnect();
		//br.close();
		//isr.close();
		is.close();
	}catch(IOException ioe){
		ioe.printStackTrace();
		return "IOException Raised:" + ioe.getMessage();
	}catch(NullPointerException npe){
		npe.printStackTrace();
		return "NullPointerException Raised:" + npe.getMessage();
	}catch(ParserConfigurationException pce){
		pce.printStackTrace();
		return "ParseConfigurationException Raised" + pce.getMessage();
	}catch(SAXException saxe){
		saxe.printStackTrace();
		return "SAXException Raised" + saxe.getMessage();
	}
	
	return "ok";
}
%>
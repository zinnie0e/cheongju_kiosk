<%@page import="java.net.HttpURLConnection"%>
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
	main(); 
%>

{
   	"aa" : "a" ,
   	"so2Value" : <%= so2Value %>,
   	"coValue" : <%= coValue %>,
   	"o3Value" : <%= o3Value %>,
   	"pm10Value": <%= pm10Value %>,
   	"pm25Value": <%= pm25Value %>,
   	"compare" : <%= compareResult %>
}
   
<%!

private static String name;
private static String so2Value;
private static String coValue;
private static String o3Value;
private static String pm10Value;
private static String pm25Value;
private static String compareResult;

public static String main(){
//private String test(){
	try{
		int compare10 = 0;
		int compare25 = 0;
	    String urlBuilder = "http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty"; 
	    urlBuilder += "?ServiceKey=xi2Q%2FMEHPIuL1ODF9w5pjYSkxxYWKPZpgzqaDhPGG1VxUlbEgBNlc1nm62YkC0yuRQOjfINZ76h5w%2FBz3RQuew%3D%3D"; 
	    urlBuilder += "&numOfRows=10";
	    urlBuilder += "&pageNo=1"; 
	    urlBuilder += "&sidoName=충북";
	    urlBuilder += "&ver=1.3";
	    
	    
	    URL url = new URL("http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnMesureSidoLIst?ServiceKey=xi2Q%2FMEHPIuL1ODF9w5pjYSkxxYWKPZpgzqaDhPGG1VxUlbEgBNlc1nm62YkC0yuRQOjfINZ76h5w%2FBz3RQuew%3D%3D&numOfRows=10&pageNo=1&sidoName=충북&searchCondition=DAILY");
	    
	    
	    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
	    conn.connect();
	    InputStream is = conn.getInputStream();
	    
	    DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
		Document doc = dBuilder.parse(is);
		
		doc.getDocumentElement().normalize();
		
		NodeList nList = doc.getElementsByTagName("body");// body 태그가 데이터임
		
		for(int cur = 0  ; cur < nList.getLength(); cur ++){
			Node nNode = nList.item(cur);
			if (nNode.getNodeType() == Node.ELEMENT_NODE) {
				//Node를 Element로 변환
				Element eElement = (Element) nNode;
				so2Value = eElement.getElementsByTagName("so2Value").item(9).getFirstChild().getTextContent();
				coValue = eElement.getElementsByTagName("coValue").item(9).getFirstChild().getTextContent();
				o3Value = eElement.getElementsByTagName("o3Value").item(9).getFirstChild().getTextContent();
				pm10Value = eElement.getElementsByTagName("pm10Value").item(9).getFirstChild().getTextContent();
				pm25Value = eElement.getElementsByTagName("pm25Value").item(9).getFirstChild().getTextContent();
				compare10 = Integer.parseInt(pm10Value);
				compare25 = Integer.parseInt(pm25Value);
				if(compare10 >= 151 || compare25 >= 76) {
					compareResult = "3";
				} else if(compare10 >= 81 || compare25 >= 36) {
					compareResult = "2";
				} else if(compare10 >= 0 || compare25 >= 0) {
					compareResult = "1";
				}
				
			}	
		}
		conn.disconnect();
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
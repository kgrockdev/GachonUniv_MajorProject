<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html style="height: 100%;">
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sunflower:wght@300&display=swap" rel="stylesheet">
<style>
body {
	background-color: #d5d7d7;
	background-size: cover;
	margin: 0px;
}
#info {
	color: #808080;
}
P {
	margin: 0px;
}
</style>
<% 
	if (session.getAttribute("userID") == null) {
		out.print("<script>alert(\"비정상적인 접근을 감지했습니다.\"); location.href='/WebDBTermProject/Authentication/Login/Login.jsp'</script>");
	}
%>
</head>
<body style="height: 100%;">
	<div style="background-color: #00bfcd; width: 100%;">
		<h3 style="text-align: center; margin: 0px; color: white; padding: 15px;">WDB 기업 채용 공고 사이트 [지원자 페이지]</h3>
	</div>
	<div>
		<jsp:include page="./UserInfoBarJSP.jsp" flush="true" />
	</div>
	<div style="text-align: center; height: 100%;">
		<div style="background-color: #FFFFFF; width: 70%; height: 100%; display: inline-block;">
			<div style="display: flex; flex-direction: row;">
				<div style="width: 100%;">
					<div id="info" style="padding: 30px;">
						<p>WDB 기업에 지원하시려는 여러분을 진심으로 환영합니다.
						<p>하단의 현재 진행중인 채용 정보를 확인하시고 원하시는 공고에 지원해주시기 바랍니다.
						<P>하나의 공고에 중복 지원하는 행동은 추후 입사시 불이익이 주어질 수 있으니 삼가해주시기 바랍니다.
					</div>
					<h2 style="text-align: center; font-family: 'Sunflower', sans-serif;">진행중인 채용 정보</h2>
					<center>
						<jsp:include page="./UserMainRecruitTableJSP.jsp" flush="true" />
					</center>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
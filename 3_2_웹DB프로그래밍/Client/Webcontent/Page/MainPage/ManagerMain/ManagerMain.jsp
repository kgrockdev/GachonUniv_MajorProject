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
		<h3 style="text-align: center; margin: 0px; color: white; padding: 15px;">WDB 기업 채용 공고 사이트 [관리자 페이지]</h3>
	</div>
	<div>
		<jsp:include page="./ManagerInfoBarJSP.jsp" flush="true" />
	</div>
	<div style="text-align: center; height: 100%;">
		<div style="background-color: #FFFFFF; width: 70%; height: 100%; display: inline-block;">
			<div id="info" style="padding: 30px;">
				<p>본 페이지는 채용자를 결정하는 관리자 페이지입니다.
				<p>해당 페이지에서 담당자를 제외하고 채용을 하는 행위는 절대 금해주시기 바랍니다.
				<p>사건이 일어나면 반드시 적발하여 책임을 묻겠습니다.
			</div>
			<div style="display: flex; flex-direction: row;">
				<div style="width: 100%;">
					<h2 style="text-align: center; font-family: 'Sunflower', sans-serif;">현재 채용중인 공고목록</h2>
					<center>
					<jsp:include page="./ManagerMainRecruitTableJSP.jsp" flush="true" />
				</center>
				</div>
			</div>
		</div>
	</div>
</body>

</html>
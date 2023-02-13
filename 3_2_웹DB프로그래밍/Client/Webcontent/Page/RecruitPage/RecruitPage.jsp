<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:useBean id="rc" class="HR_Manage.RecruitApply.RecruitApplyList" scope="request" />
<!DOCTYPE html>
<html style="height: 100%;">
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style>
body {
	background-color: #d5d7d7;
	background-size: cover;
	margin: 0px;
}
.btnGroup {
	background-color: #008CBA;
	border: none;
  	color: white;
  	padding: 15px 32px;
  	text-align: center;
  	text-decoration: none;
  	display: inline-block;
  	font-size: 16px;
  	width: 100px;
}
table {
	border-collapse: collapse;
}

th, td {
	border-bottom: 1px solid black;
	padding: 15px;
}
</style>
<% 
	if (session.getAttribute("userID") == null) {
		out.print("<script>alert(\"비정상적인 접근을 감지했습니다.\"); location.href='/WebDBTermProject/Authentication/Login/Login.jsp'</script>");
	}
%>
<%
	request.setCharacterEncoding("UTF-8");
	int recruitNumber = Integer.parseInt(request.getParameter("recruitNumber"));
%>
</head>
<body style="height: 100%;">
	<div style="background-color: #00bfcd; width: 100%;">
		<h3 style="text-align: center; margin: 0px; color: white; padding: 15px;">WDB 기업 채용 공고 사이트 [지원자 페이지]</h3>
	</div>
	<div>
		<jsp:include page="../MainPage/UserMain/UserInfoBarJSP.jsp" flush="true" />
	</div>
	
	<div style="text-align: center; height: 100%;">
		<div style="background-color: #FFFFFF; width: 70%; height: 100%; display: inline-block;">
			<div style="display: flex; flex-direction: column;">
				<div style="width: 100%;">
					<h2 style="text-align: center; font-family: 'Sunflower', sans-serif;">진행중인 채용 정보</h2>
					<center>
						<%= rc.showRecruitAnnounceTable(recruitNumber) %>
					</center>
					
				</div>
				<div>
					<center>
						<jsp:include page="RecruitPageTableJSP.jsp" flush="true">
							<jsp:param value="<%= recruitNumber %>" name="recruitNumber"/>
						</jsp:include>
					</center>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
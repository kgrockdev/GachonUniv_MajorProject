<%@page import="org.apache.catalina.connector.Response"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% request.setCharacterEncoding("UTF-8"); %>
<jsp:useBean id="login" class="HR_Manage.Authentication.Login" scope="session"/>
<jsp:setProperty name="login" property="*" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style>
body {
	background-image: url('../../Imgs/bg.png');
	background-repeat: no-repeat;
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
	width: 200px;
}
</style>
</head>
<body>
<body>
	<div style="background-color: #00bfcd; width: 100%;">
		<h3 style="text-align: center; margin: 0px; color: white; padding: 15px;">WDB 기업 채용 공고 사이트</h3>
		<hr />
	</div>
	<div style="display: flex; justify-content: center;">
		<div style="width: 50%;">
			<form action="/WebDBTermProject/Authentication/Login/Login.jsp">
				<div style="border: 1px solid; width: 100%; padding: 30px; background-color: white">
					<h3>로그인</h3>
					<hr />
					<div class="mb-3">
						<% 
							boolean result = login.loginUserDB();
							if (result == true) {
								session.setAttribute("userID", login.getUserID());
								if ((login.getUserAuth()).equals("public"))
									response.sendRedirect("/WebDBTermProject/Page/MainPage/UserMain/UserMain.jsp");
								else if ((login.getUserAuth()).equals("Manager") || (login.getUserAuth()).equals("topManager"))
									response.sendRedirect("/WebDBTermProject/Page/MainPage/ManagerMain/ManagerMain.jsp");
							}
							else
								out.print("로그인에 실패하였습니다.");
						%>
					</div>
					<div style="display: flex; justify-content: space-around; margin-top: 30px;">
						<button type="submit" class="btnGroup">확인</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</body>
</html>
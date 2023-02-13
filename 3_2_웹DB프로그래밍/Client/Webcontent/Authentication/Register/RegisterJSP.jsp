<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% request.setCharacterEncoding("UTF-8"); %>
<jsp:useBean id="register" class="HR_Manage.Authentication.Register" scope="request"/>
<jsp:setProperty name="register" property="*" />
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
	<div style="background-color: #00bfcd; width: 100%;">
		<h3 style="text-align: center; margin: 0px; color: white; padding: 15px;">WDB 기업 채용 공고 사이트</h3>
		<hr />
	</div>
	<div style="display: flex; justify-content: center;">
		<div style="width: 50%;">
			<form action="/WebDBTermProject/Authentication/Login/Login.jsp">
				<div style="border: 1px solid; width: 100%; padding: 30px; background-color: white">
					<h3>회원가입</h3>
					<hr />
					<div class="mb-3">
						<% 
							String result = register.registerUserDB();
							out.print(result);
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
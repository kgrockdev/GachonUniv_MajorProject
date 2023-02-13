<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<jsp:useBean id="sql" class="HR_Manage.Modules.SqlQuery" scope="request" />
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<div style="border: 1px solid; padding:20px;  background-color: white;">
		<h2 style="margin-top: 0px; margin-bottom: 10px">회원 정보</h2>
		<div style="font-size: 20px;">
			<label>이름 : </label>
			<label style="font-weight: bold;"><%= sql.accountToName((String)session.getAttribute("userID")) %></label>
		</div>
		<div style="font-size: 20px;">
			<label>아이디 : </label>
			<label style="font-weight: bold;"><%= (String)session.getAttribute("userID") %></label>
		</div>
		<div style="font-size: 20px;">
			<label>이메일 : </label>
			<label style="font-weight: bold;"><%= sql.accountToEmail((String)session.getAttribute("userID")) %></label>
		</div>
		
		
		<div style="margin-top: 20px;">
			<input type="button" onclick="location='/WebDBTermProject/Page/MainPage/UserMain/UserMain.jsp'" value="처음으로" style="padding: 5px; font-size: 12px;"/>
			<input type="button" onclick="location='/WebDBTermProject/Page/InfoPage/InfoPage.jsp'" value="나의정보" style="padding: 5px; font-size: 12px;"/>
			<input type="button" onclick="location='/WebDBTermProject/Authentication/Logout/LogoutJSP.jsp'" style="padding: 5px; font-size: 12px;" value="로그아웃">
			<input type="button" onclick="location='/WebDBTermProject/Authentication/Withdraw/Withdraw.jsp'" style="padding: 5px; font-size: 12px;" value="회원탈퇴">
		</div>
	</div>
</body>
</html>
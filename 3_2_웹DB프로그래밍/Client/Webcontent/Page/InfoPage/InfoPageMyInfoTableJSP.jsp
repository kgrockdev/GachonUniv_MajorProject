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
		<h2 style="margin-top: 0px; margin-bottom: 10px">ȸ�� ����</h2>
		<div style="font-size: 20px;">
			<label>�̸� : </label>
			<label style="font-weight: bold;"><%= sql.accountToName((String)session.getAttribute("userID")) %></label>
		</div>
		<div style="font-size: 20px;">
			<label>���̵� : </label>
			<label style="font-weight: bold;"><%= (String)session.getAttribute("userID") %></label>
		</div>
		<div style="font-size: 20px;">
			<label>�̸��� : </label>
			<label style="font-weight: bold;"><%= sql.accountToEmail((String)session.getAttribute("userID")) %></label>
		</div>
		
		
		<div style="margin-top: 20px;">
			<input type="button" onclick="location='/WebDBTermProject/Page/MainPage/UserMain/UserMain.jsp'" value="ó������" style="padding: 5px; font-size: 12px;"/>
			<input type="button" onclick="location='/WebDBTermProject/Page/InfoPage/InfoPage.jsp'" value="��������" style="padding: 5px; font-size: 12px;"/>
			<input type="button" onclick="location='/WebDBTermProject/Authentication/Logout/LogoutJSP.jsp'" style="padding: 5px; font-size: 12px;" value="�α׾ƿ�">
			<input type="button" onclick="location='/WebDBTermProject/Authentication/Withdraw/Withdraw.jsp'" style="padding: 5px; font-size: 12px;" value="ȸ��Ż��">
		</div>
	</div>
</body>
</html>
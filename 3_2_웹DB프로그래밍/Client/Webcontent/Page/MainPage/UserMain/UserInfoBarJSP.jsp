<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<jsp:useBean id="sql" class="HR_Manage.Modules.SqlQuery" scope="request" />
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sunflower:wght@300&display=swap" rel="stylesheet">
</head>
<body>
	<div style="background-color: #FFFFFF; width: 100%; margin-bottom: 10px; padding: 5px;">
		<div style="text-align: center;">
			<div style="width: 70%; height: 100%; display: inline-block;">
				<div style="display: flex; justify-content: space-between;">
					<span style="text-align: left;">
						<span style="font-family: 'Sunflower', sans-serif;">
							<label style="font-size:20px; font-weight: bold;">[ <%= sql.accountToName((String)session.getAttribute("userID")) %> ]</label>
							<label>�� ȯ���մϴ�!</label>
						</span>
					</span>
					<span style="text-align: right;">
						<input type="button" onclick="location='/WebDBTermProject/Page/MainPage/UserMain/UserMain.jsp'" value="ó������" style="padding: 5px; font-size: 12px;" class="btnGroup"/>
						<input type="button" onclick="location='/WebDBTermProject/Page/InfoPage/InfoPage.jsp'" value="�������" style="padding: 5px; font-size: 12px;" class="btnGroup"/>
						<input type="button" onclick="location='/WebDBTermProject/Authentication/Logout/LogoutJSP.jsp'" style="padding: 5px; font-size: 12px;" class="btnGroup" value="�α׾ƿ�">
						<input type="button" onclick="location='/WebDBTermProject/Authentication/Withdraw/Withdraw.jsp'" style="padding: 5px; font-size: 12px;" class="btnGroup" value="ȸ��Ż��">
					</span>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
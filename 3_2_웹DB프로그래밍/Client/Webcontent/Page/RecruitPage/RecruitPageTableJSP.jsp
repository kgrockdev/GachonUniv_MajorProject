<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:useBean id="sql" class="HR_Manage.Modules.SqlQuery" scope="request" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style>
table {
	border-collapse: collapse;
}

th, td {
	padding: 15px;
}
</style>
<%
	request.setCharacterEncoding("UTF-8");
	int recruitNumber = Integer.parseInt(request.getParameter("recruitNumber"));
%>
</head>
<body>
	<div style="margin-top: 50px; background-color: white">
		<hr/>
		<h2 style="font-family: 'Sunflower', sans-serif;">지원서</h2>
		<form action="RecruitPageJSP.jsp" method="Post">
			<table style="width: 60%; border: 1px solid;">
				<tr>
					<td style="text-align: center; width: 20%; background-color: #424242; color: #FFFFFF; font-weight: bold;">이름</td>
					<td><%= sql.accountToName((String)session.getAttribute("userID")) %></td>
					<td style="text-align: center; background-color: #424242; color: #FFFFFF; font-weight: bold;">성별</td>
					<td><%= sql.accountToGender((String)session.getAttribute("userID")) %></td>
				</tr>
				<tr>
					<td style="text-align: center; background-color: #424242; color: #FFFFFF; font-weight: bold;">이메일</td>
					<td colspan="3"><%= sql.accountToEmail((String)session.getAttribute("userID")) %></td>
				</tr>
				<tr>
					<td style="text-align: center; background-color: #424242; color: #FFFFFF; font-weight: bold;">지원동기</td>
					<td colspan="3"><textarea style="width: 100%" rows="10" name="recruitReason"></textarea></td>
				</tr>
				<tr style="text-align:center; border: none;">
					<td colspan="4" style="border: none;">
						<input type="hidden" name="recruitNumber" value="<%= recruitNumber %>" />
						<input type="submit" style="width: 50%; font-size: 20px;" value="지원하기" class="btnGroup"/>
					</td>
				</tr>
			</table>
		</form>
	</div>
</body>
</html>
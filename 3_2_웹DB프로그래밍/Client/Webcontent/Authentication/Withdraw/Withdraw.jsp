<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<jsp:useBean id="withdraw" class="HR_Manage.Authentication.Withdraw" scope="request" />
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<%
		String rs = withdraw.wd((String)session.getAttribute("userID"));
		out.print("<script>alert(\"" + rs + "\"); location.href='/WebDBTermProject/Authentication/Login/Login.jsp'</script>");
	%>
</body>
</html>
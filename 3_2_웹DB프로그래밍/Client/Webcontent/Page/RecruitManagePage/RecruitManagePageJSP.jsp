<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<jsp:useBean id="rm" class="HR_Manage.RecruitManage.RecruitManage" scope="request" />
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<% 
		request.setCharacterEncoding("UTF-8");
		int recruitNumber = Integer.parseInt(request.getParameter("recruitNumber"));
		String userAccount = request.getParameter("userAccount").toString();
		
		rm.setRecruitNumber(recruitNumber);
		rm.setUserAccount(userAccount);
	
		String rs = rm.Hire();
		
		out.print("<script>alert(\"" + rs + "\"); location.href='/WebDBTermProject/Page/MainPage/ManagerMain/ManagerMain.jsp'</script>");
	%>
</body>
</html>
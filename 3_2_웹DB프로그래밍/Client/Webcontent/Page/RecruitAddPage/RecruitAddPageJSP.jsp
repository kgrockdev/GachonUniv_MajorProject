<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="java.time.LocalDate"%>
<jsp:useBean id="ra" class="HR_Manage.RecruitManage.RecruitAdd" scope="request" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<% 
		LocalDate todaysDate = LocalDate.now();
	
		request.setCharacterEncoding("UTF-8");
		
		ra.setUserID((String)session.getAttribute("userID")); 
		ra.setRecruitmentName(request.getParameter("recruitmentName"));
		ra.setRecruitmentDescription(request.getParameter("recruitmentDescription"));
		ra.setPostedDate(todaysDate.toString());
		ra.setDueDate(request.getParameter("dueDate").toString());
		
		String rs = ra.createRecruit();
		
		out.print("<script>alert(\"" + rs + "\"); location.href='/WebDBTermProject/Page/MainPage/ManagerMain/ManagerMain.jsp'</script>");
	%>
</body>
</html>
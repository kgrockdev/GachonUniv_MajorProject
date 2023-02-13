<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:useBean id="ra" class="HR_Manage.RecruitApply.RecruitApply" scope="request" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<% 
		request.setCharacterEncoding("UTF-8");
		ra.setUserID((String)session.getAttribute("userID")); 
		ra.setRecruitNumber(Integer.parseInt(request.getParameter("recruitNumber")));
		ra.setRecruitReason(request.getParameter("recruitReason"));
		
		String rs = ra.insertToRecruit();
		
		out.print("<script>alert(\"" + rs + "\"); location.href='/WebDBTermProject/Page/MainPage/UserMain/UserMain.jsp'</script>");
	%>
</body>
</html>
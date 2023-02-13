<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:useBean id="rc" class="HR_Manage.RecruitApply.RecruitApplyList" scope="request" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style>
.btnGroup {
	background-color: #008CBA;
	border: none;
  	color: white;
  	padding: 15px 32px;
  	text-align: center;
  	text-decoration: none;
  	display: inline-block;
  	font-size: 16px;
  	width: 100px;
}
table {
	border-collapse: collapse;
}

th, td {
	border-bottom: 1px solid black;
	padding: 15px;
}
</style>
</head>
<body>
	<table cellspacing="10px" style="padding: 5px; width: 80%">
		<thead style="font-size: 20px;">
			<tr style="background-color: #424242; color: #FFFFFF;">
				<th scope="col">#</th>
				<th scope="col">채용 공고</th>
				<th scope="col">담당</th>
				<th scope="col">게시일</th>
				<th scope="col">마감일</th>
				<th scope="col"></th>
			</tr>
		</thead>
		<tbody>
			<%= rc.showRecruitmentList() %>
		</tbody>
	</table>
</body>
</html>
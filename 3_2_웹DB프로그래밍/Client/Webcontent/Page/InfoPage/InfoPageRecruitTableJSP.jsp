<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<jsp:useBean id="rc" class="HR_Manage.RecruitApply.RecruitApplyList" scope="request" />
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<table cellspacing="10px" style="padding: 5px; width: 80%">
		<thead style="font-size: 20px;">
			<tr style="background-color: #424242; color: #FFFFFF;">
				<th scope="col">#</th>
				<th scope="col">지원 공고</th>
				<th scope="col">마감일</th>
				<th scope="col">합격여부</th>
				<th scope="col"></th>
			</tr>
		</thead>
		<tbody>
			<%= rc.showMyRecruitmentList((String)session.getAttribute("userID")) %>
		</tbody>
	</table>
</body>
</html>
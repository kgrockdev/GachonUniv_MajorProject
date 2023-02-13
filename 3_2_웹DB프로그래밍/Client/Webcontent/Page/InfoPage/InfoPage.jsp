<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html style="height: 100%;">
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sunflower:wght@300&display=swap" rel="stylesheet">
<style>
body {
	background-color: #d5d7d7;
	background-size: cover;
	margin: 0px;
}
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
<body style="height: 100%;">
	<div style="background-color: #00bfcd; width: 100%;">
		<h3 style="text-align: center; margin: 0px; color: white; padding: 15px;">WDB 기업 채용 공고 사이트 [지원자 페이지]</h3>
	</div>
	<div>
		<jsp:include page="../MainPage/UserMain/UserInfoBarJSP.jsp" flush="true" />
	</div>
		<div style="text-align: center; height: 100%;">
		<div style="background-color: #FFFFFF; width: 70%; height: 100%; display: inline-block;">
			<div style="display: flex; flex-direction: row;">
				<div style="width: 100%;">
					<h2 style="text-align: center; font-family: 'Sunflower', sans-serif;">지원한 채용 공고 내역</h2>
					<center>
						<jsp:include page="./InfoPageRecruitTableJSP.jsp" flush="true" />
					</center>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
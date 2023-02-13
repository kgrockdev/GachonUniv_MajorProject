<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style>
body {
	background-image: url('../../Imgs/bg.png');
	background-repeat: no-repeat;
	background-size: cover;
	margin: 0px;
}
td {
	padding: 10px;
}
.form-label {
	padding-top: 10px;
}
.form-control {
	width: 100%;
	height: 30px;
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
  	width: 200px;
}
#info {
	color: #808080;
}
</style>
</head>
<body>
	<div style="background-color: #00bfcd; width: 100%;">
		<h3 style="text-align: center; margin: 0px; color: white; padding: 15px;">WDB 기업 채용 공고 사이트</h3>
		<hr />
	</div>
	<div style="display: flex; justify-content: center;">
		<div style="width: 50%;">
			<form action="./LoginJSP.jsp" method="POST">
				<div style="border: 1px solid; width: 100%; padding: 30px; background-color: white">
					<h3>로그인</h3>
					<hr/>
					<div id="info" style="text-align: center;">
						<p style="margin-bottom: 0px">WDB 입사 지원 사이트에 오신 여러분을 환영합니다.</p>
						<p style="margin-top: 0px">WDB 사이트의 계정 정보를 입력해주세요.</p>
						<p style="margin: 0px">아직 계정이 없으십니까?&nbsp;<a href="/WebDBTermProject/Authentication/Register/Register.jsp" style="color: #ccaa00">가입하기</a></p>
					</div>
					<div class="form-label">아이디</div>
					<input type="text" name="userID" class="form-control"><br/>
					<div class="form-label">비밀번호</div>
					<input type="password" name="userPW" class="form-control"><br/>
					<div style="display: flex; justify-content: space-around; margin-top: 30px;">
						<button type="submit" class="btnGroup">로그인</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</body>
</html>
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
			<form action="./RegisterJSP.jsp" method="POST">
				<div style="border: 1px solid; width: 100%; padding: 30px; background-color: white">
					<h3>회원가입</h3>
					<hr />
					<div id="info" style="text-align: center;">
						<p style="margin-bottom: 0px">WDB 입사 지원 사이트에 오신 여러분을 환영합니다.</p>
						<p style="margin-top: 0px">몇 가지 간단한 정보들만 입력하여 즉시 회원가입을 완료하세요.</p>
					</div>
					<div class="form-label">아이디</div>
					<input type="text" class="form-control" name="userID" />
					<div class="form-label">비밀번호</div>
					<input type="password" class="form-control" name="userPW" />
					<div class="form-label">이름</div>
					<input type="text" class="form-control" name="userName" />
					<div class="form-label">성별</div>
					<select class="form-control" name="userGender">
						<option selected></option>
						<option value="남성">남성</option>
						<option value="여성">여성</option>
					</select>
					<div class="form-label">본인 확인 이메일</div>
					<input type="email" class="form-control" name="userEmail" />


					<div
						style="display: flex; justify-content: space-around; margin-top: 30px;">
						<button type="button"
							onclick="location='/WebDBTermProject/Authentication/Login/Login.jsp'"
							class="btnGroup">취소</button>
						<button type="submit" class="btnGroup">확인</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</body>
</html>
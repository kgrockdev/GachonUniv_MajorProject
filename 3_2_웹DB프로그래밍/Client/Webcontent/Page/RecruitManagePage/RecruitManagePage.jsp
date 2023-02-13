<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<jsp:useBean id="rc" class="HR_Manage.RecruitApply.RecruitApplyList" scope="request" />
<jsp:useBean id="rm" class="HR_Manage.RecruitManage.RecruitManage" scope="request" />
<jsp:useBean id="rma" class="HR_Manage.RecruitManage.RecruitManageApplyList" scope="request" />
<!DOCTYPE html>
<html style="height: 100%">
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
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
#info {
	color: #808080;
}
P {
	margin: 0px;
}
</style>
</head>
<body style="height: 100%;">
<% 
	if (session.getAttribute("userID") == null) {
		out.print("<script>alert(\"���������� ������ �����߽��ϴ�.\"); location.href='/WebDBTermProject/Authentication/Login/Login.jsp'</script>");
	}
%>
<%
	request.setCharacterEncoding("UTF-8");
	int recruitNumber = Integer.parseInt(request.getParameter("recruitNumber"));
%>
	<div style="background-color: #00bfcd; width: 100%;">
		<h3 style="text-align: center; margin: 0px; color: white; padding: 15px;">WDB ��� ä�� ���� ����Ʈ [������ ������]</h3>
	</div>
	<div>
		<jsp:include page="../MainPage/ManagerMain/ManagerInfoBarJSP.jsp" flush="true" />
	</div>
	
	<div style="text-align: center; height: 100%;">
		<div style="background-color: #FFFFFF; width: 70%; height: 100%; display: inline-block;">
			<div style="display: flex; flex-direction: column;">
				<div style="width: 100%;">
					<div id="info" style="padding: 30px;">
						<p>�� �������� ä���ڸ� �����ϴ� ������ �������Դϴ�.
						<p>�ش� ���������� ����ڸ� �����ϰ� ä���� �ϴ� ������ ���� �����ֽñ� �ٶ��ϴ�.
						<p>����� �Ͼ�� �ݵ�� �����Ͽ� å���� ���ڽ��ϴ�.
					</div>
					<h2 style="text-align: center; font-family: 'Sunflower', sans-serif;">�������� ä�� ����</h2>
					<center>
						<%= rc.showRecruitAnnounceTable(recruitNumber) %>
					</center>
				</div>
				<div style="border-top: 1px solid gray; margin: 20px; "></div>
				<div>
					<center>
						<h3>[<%= rm.getRecruitmentName(recruitNumber) %>] ������ ���</h3>
						<table cellspacing="10px" style="padding: 5px; width: 60%; text-align: center;">
							<thead style="font-size: 20px;">
								<tr>
									<th scope="col">#</th>
									<th scope="col">������</th>
									<th scope="col">���� ����</th>
									<th scope="col">ä��</th>
								</tr>
							</thead>
							<tbody>
								<%= rma.showRecruitApplyList(recruitNumber) %>
							</tbody>
						</table>
					</center>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
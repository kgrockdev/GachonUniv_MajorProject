package HR_Manage.RecruitManage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import HR_Manage.Modules.*;

public class RecruitAdd {
	private String userID;
	private String recruitmentName;
	private String recruitmentDescription;
	private String postedDate;
	private String dueDate;
	
	public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	public String getRecruitmentName() {
		return recruitmentName;
	}
	public void setRecruitmentName(String recruitmentName) {
		this.recruitmentName = recruitmentName;
	}
	public String getRecruitmentDescription() {
		return recruitmentDescription;
	}
	public void setRecruitmentDescription(String recruitmentDescription) {
		this.recruitmentDescription = recruitmentDescription;
	}
	public String getPostedDate() {
		return postedDate;
	}
	public void setPostedDate(String postedDate) {
		this.postedDate = postedDate;
	}
	public String getDueDate() {
		return dueDate;
	}
	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}
	
	public String createRecruit () {
		SqlQuery sq = new SqlQuery();
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		
		String jdbc_driver = "com.mysql.cj.jdbc.Driver";
		String jdbc_url = "jdbc:mysql://localhost:3306/hrmanagedb?serverTimezone=Asia/Seoul";
		try {
			Class.forName(jdbc_driver);
			
			conn = DriverManager.getConnection(jdbc_url, "root", "root");
			
			String sql = "insert into recruitment (recruitmentName, recruitmentDescription, recruitmentTeam, postedDate, dueDate) values(?,?,?,?,?)";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, getRecruitmentName());
			pstmt.setString(2, getRecruitmentDescription());
			pstmt.setString(3, sq.accountToEmpDeptCode(getUserID()));
			pstmt.setString(4, getPostedDate());
			pstmt.setString(5, getDueDate());

			pstmt.executeUpdate();
				
			return "새로운 채용 공고를 추가하였습니다";

		}
		catch(Exception e) {
			return e.toString();
		}
	}
}

package HR_Manage.RecruitApply;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class RecruitApply {
	private String userID;
	private int recruitNumber;
	private String recruitReason;
	
	public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	public int getRecruitNumber() {
		return recruitNumber;
	}
	public void setRecruitNumber(int recruitNumber) {
		this.recruitNumber = recruitNumber;
	}
	public String getRecruitReason() {
		return recruitReason;
	}
	public void setRecruitReason(String recruitReason) {
		this.recruitReason = recruitReason;
	}
	
	public String insertToRecruit() {
		Connection conn = null;
		PreparedStatement pstmt = null;
		
		String jdbc_driver = "com.mysql.cj.jdbc.Driver";
		String jdbc_url = "jdbc:mysql://localhost:3306/hrmanagedb?serverTimezone=Asia/Seoul";
		try {
			Class.forName(jdbc_driver);
			
			conn = DriverManager.getConnection(jdbc_url, "root", "root");
			
			String sql = "insert into recruitapply (recruitNumber, account, recruitReason) values(?,?,?)";
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, getRecruitNumber());
			pstmt.setString(2, getUserID());
			pstmt.setString(3, getRecruitReason());
			
			if (getRecruitNumber() != -1 && getUserID() != null && getRecruitReason() != null) {
				setRecruitNumber(-1);
				setUserID(null);
				setRecruitReason(null);
				pstmt.executeUpdate();
				
				return "지원에 성공하였습니다";
			}
			else {
				return "지원에 실패하였습니다";
			}
		}
		catch(Exception e) {
			return e.toString();
		}
	}
}

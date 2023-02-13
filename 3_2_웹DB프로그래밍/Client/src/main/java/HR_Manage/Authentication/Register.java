package HR_Manage.Authentication;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class Register {
	private String userID;
	private String userPW;
	private String userName;
	private String userGender;
	private String userEmail;
	
	public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	public String getUserPW() {
		return userPW;
	}
	public void setUserPW(String userPW) {
		this.userPW = userPW;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserGender() {
		return userGender;
	}
	public void setUserGender(String userGender) {
		this.userGender = userGender;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	
	public String registerUserDB() {
		Connection conn = null;
		PreparedStatement pstmt = null;
		
		String jdbc_driver = "com.mysql.cj.jdbc.Driver";
		String jdbc_url = "jdbc:mysql://localhost:3306/hrmanagedb?serverTimezone=Asia/Seoul";
		try {
			Class.forName(jdbc_driver);
			
			conn = DriverManager.getConnection(jdbc_url, "root", "root");
			
			String sql = "insert into user (account, password, name, gender, email) values(?,?,?,?,?)";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, getUserID());
			pstmt.setString(2, getUserPW());
			pstmt.setString(3, getUserName());
			pstmt.setString(4, getUserGender());
			pstmt.setString(5, getUserEmail());
			
			if (getUserID() != null && getUserPW() != null && getUserName() != null && getUserGender() != null && getUserEmail() != null) {
				setUserID(null);
				setUserPW(null);
				setUserName(null);
				setUserGender(null);
				setUserEmail(null);
				pstmt.executeUpdate();
				return "회원가입에 성공하였습니다";
			}
			else {
				return "회원가입에 실패하였습니다";
			}
		}
		catch(Exception e) {
			return e.toString();
		}
	}
}

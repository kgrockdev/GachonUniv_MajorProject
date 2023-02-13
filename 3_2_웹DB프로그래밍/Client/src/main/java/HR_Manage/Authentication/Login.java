package HR_Manage.Authentication;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class Login {
	private String userID;
	private String userPW;
	private String userAuth;
	
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
	public String getUserAuth() {
		return userAuth;
	}
	public void setUserAuth(String userAuth) {
		this.userAuth = userAuth;
	}
	
	public boolean loginUserDB() {
		Connection conn = null;
		PreparedStatement pstmt = null;
		
		String jdbc_driver = "com.mysql.cj.jdbc.Driver";
		String jdbc_url = "jdbc:mysql://localhost:3306/hrmanagedb";
		try {
			Class.forName(jdbc_driver);
			
			conn = DriverManager.getConnection(jdbc_url, "root", "root");
			
			String sql = "select * from user where account=?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, getUserID());

			ResultSet rs = pstmt.executeQuery();
			rs.next();
			
			String rsPassWord = rs.getString("password");
			
			if (rsPassWord == null) {
				return false;
			}
			else {
					if (rsPassWord.equals(getUserPW())) {
						setUserAuth(rs.getString("auth"));
						return true;
					}
					else
						return false;
			}
		}
		catch(Exception e) {
			return false;
		}
	}
}

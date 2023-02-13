package HR_Manage.Modules;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class SqlQuery {
	String jdbc_driver = "com.mysql.cj.jdbc.Driver";
	String jdbc_url = "jdbc:mysql://localhost:3306/hrmanagedb";
	
	public String accountToName(String userID) {
		Connection conn = null;
		PreparedStatement pstmt = null;
		
		try {
			Class.forName(jdbc_driver);
			
			conn = DriverManager.getConnection(jdbc_url, "root", "root");
			
			String sql = "select name from user where account=?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userID);

			ResultSet rs = pstmt.executeQuery();
			rs.next();
			
			String name = rs.getString("name");
			
			return name;
		}
		catch(Exception e) {			
			return e.toString();
		}
	}
	
	public String accountToGender(String userID) {
		Connection conn = null;
		PreparedStatement pstmt = null;
		
		try {
			Class.forName(jdbc_driver);
			
			conn = DriverManager.getConnection(jdbc_url, "root", "root");
			
			String sql = "select gender from user where account=?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userID);

			ResultSet rs = pstmt.executeQuery();
			rs.next();
			
			String gender = rs.getString("gender");
			
			return gender;
		}
		catch(Exception e) {			
			return e.toString();
		}
	}
	
	public String accountToEmail(String userID) {
		Connection conn = null;
		PreparedStatement pstmt = null;
		
		try {
			Class.forName(jdbc_driver);
			
			conn = DriverManager.getConnection(jdbc_url, "root", "root");
			
			String sql = "select email from user where account=?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userID);

			ResultSet rs = pstmt.executeQuery();
			rs.next();
			
			String email = rs.getString("email");
			
			return email;
		}
		catch(Exception e) {			
			return e.toString();
		}
	}
	
	public String accountToEmpDeptCode(String userID) {
		Connection conn = null;
		PreparedStatement pstmt = null;
		
		try {
			Class.forName(jdbc_driver);
			
			conn = DriverManager.getConnection(jdbc_url, "root", "root");
			
			String sql = "select empDeptCode from employees where empUserID=?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userID);

			ResultSet rs = pstmt.executeQuery();
			rs.next();
			
			String email = rs.getString("empDeptCode");
			
			return email;
		}
		catch(Exception e) {			
			return e.toString();
		}
	}
}

package HR_Manage.RecruitManage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import HR_Manage.Modules.*;

public class RecruitManage {
	int recruitNumber;
	String userAccount;

	public int getRecruitNumber() {
		return recruitNumber;
	}

	public void setRecruitNumber(int recruitNumber) {
		this.recruitNumber = recruitNumber;
	}

	public String getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}

	public String Hire() {
		SqlQuery sq = new SqlQuery();
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		
		String jdbc_driver = "com.mysql.cj.jdbc.Driver";
		String jdbc_url = "jdbc:mysql://localhost:3306/hrmanagedb?serverTimezone=Asia/Seoul";
		try {
			int Team = getRecruitmentTeam(getRecruitNumber());
			
			Class.forName(jdbc_driver);
			
			conn = DriverManager.getConnection(jdbc_url, "root", "root");
			
			String sql = "insert into employees (empCode, empDeptCode, empName, empUserID) values(?,?,?,?)";
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, getEmployeeCode(Team));
			pstmt.setInt(2, Team);
			pstmt.setString(3, sq.accountToName(getUserAccount()));
			pstmt.setString(4, getUserAccount());

			pstmt.executeUpdate();
			
			closeRecruitment(recruitNumber);
				
			return "채용에 성공하였습니다";

		}
		catch(Exception e) {
			return e.toString();
		}
	}
	
	public int getRecruitmentTeam(int v) {
		SqlQuery sq = new SqlQuery();
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		
		String jdbc_driver = "com.mysql.cj.jdbc.Driver";
		String jdbc_url = "jdbc:mysql://localhost:3306/hrmanagedb?serverTimezone=Asia/Seoul";
		try {
			Class.forName(jdbc_driver);
			
			conn = DriverManager.getConnection(jdbc_url, "root", "root");
			
			String sql = "select * from recruitment where recruitNumber=?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, v);
			
			ResultSet rs = pstmt.executeQuery();
			
			rs.next();
			
			return rs.getInt("recruitmentTeam");
		}
		catch(Exception e) {
			return -1;
		}
	}
	
	public String getRecruitmentName(int v) {
		SqlQuery sq = new SqlQuery();
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		
		String jdbc_driver = "com.mysql.cj.jdbc.Driver";
		String jdbc_url = "jdbc:mysql://localhost:3306/hrmanagedb?serverTimezone=Asia/Seoul";
		try {
			Class.forName(jdbc_driver);
			
			conn = DriverManager.getConnection(jdbc_url, "root", "root");
			
			String sql = "select * from recruitment where recruitNumber=?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, v);
			
			ResultSet rs = pstmt.executeQuery();
			
			rs.next();
			
			return rs.getString("recruitmentName");
		}
		catch(Exception e) {
			return e.toString();
		}
	}
	
	public int getEmployeeCode(int Team) {
		SqlQuery sq = new SqlQuery();
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		
		String jdbc_driver = "com.mysql.cj.jdbc.Driver";
		String jdbc_url = "jdbc:mysql://localhost:3306/hrmanagedb?serverTimezone=Asia/Seoul";
		try {
			Class.forName(jdbc_driver);
			
			conn = DriverManager.getConnection(jdbc_url, "root", "root");
			
			String sql = "select max(empCode) from employees where empDeptCode=?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, Team);
			
			ResultSet rs = pstmt.executeQuery();
			
			rs.next();
			
			return (rs.getInt("max(empCode)") + 1);
		}
		catch(Exception e) {
			return -1;
		}
	}
	
	public void closeRecruitment(int recruitNumber) {
		Connection conn = null;
		PreparedStatement pstmt = null;
		
		String jdbc_driver = "com.mysql.cj.jdbc.Driver";
		String jdbc_url = "jdbc:mysql://localhost:3306/hrmanagedb?serverTimezone=Asia/Seoul";
		try {
			int Team = getRecruitmentTeam(getRecruitNumber());
			
			Class.forName(jdbc_driver);
			
			conn = DriverManager.getConnection(jdbc_url, "root", "root");
			
			String sql = "update recruitment set recruitClose = 1, recruitUser = ? where recruitNumber = ?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, getUserAccount());
			pstmt.setInt(2, recruitNumber);

			pstmt.executeUpdate();
		}
		catch(Exception e) {

		}
	}
}

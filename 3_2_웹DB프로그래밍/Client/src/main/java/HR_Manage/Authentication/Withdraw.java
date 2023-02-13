package HR_Manage.Authentication;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class Withdraw {
	public String wd(String v) {
		Connection conn = null;
		PreparedStatement pstmt = null;

		String jdbc_driver = "com.mysql.cj.jdbc.Driver";
		String jdbc_url = "jdbc:mysql://localhost:3306/hrmanagedb?serverTimezone=Asia/Seoul";
		try {
			Class.forName(jdbc_driver);

			conn = DriverManager.getConnection(jdbc_url, "root", "root");

			String sql = "delete from user where account = ?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, v);

			pstmt.executeUpdate();
			
			sql = "delete from recruitapply where account = ?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, v);

			pstmt.executeUpdate();
			
			return "회원탈퇴에 성공하였습니다";
		} catch (Exception e) {
			return e.toString();
		}
	}
}

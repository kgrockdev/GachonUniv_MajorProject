package HR_Manage.RecruitManage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class RecruitManageList {
	private String tableHTML;

	public String getTableHTML() {
		return tableHTML;
	}

	public void setTableHTML(String tableHTML) {
		this.tableHTML = tableHTML;
	}

	public String showRecruitmentList() {
		int rcNumber;
		String rcName;
		String rcTeam;
		String rcPD;
		String rcDD;

		Connection conn = null;
		PreparedStatement pstmt = null;

		String jdbc_driver = "com.mysql.cj.jdbc.Driver";
		String jdbc_url = "jdbc:mysql://localhost:3306/hrmanagedb";
		try {
			Class.forName(jdbc_driver);

			conn = DriverManager.getConnection(jdbc_url, "root", "root");

			String sql = "select * from recruitment";
			pstmt = conn.prepareStatement(sql);

			ResultSet rs = pstmt.executeQuery();

			String tableHTML = "";

			while (rs.next()) {
				if (!rs.getBoolean("recruitClose")) {
					rcNumber = rs.getInt("recruitNumber");
					rcName = rs.getString("recruitmentName");
					rcTeam = rs.getString("recruitmentTeam");
					rcPD = rs.getDate("postedDate").toString();
					rcDD = rs.getDate("dueDate").toString();
	
					tableHTML += "<tr><th scope=\"row\">" + rcNumber + "</th>";
					
					tableHTML += "<form action=\"/WebDBTermProject/Page/RecruitManagePage/RecruitManagePage.jsp\" method=\"Get\">";
					
					tableHTML += "<td>" + rcName + "</td>";
					tableHTML += "<td style=\"text-align: center;\">" + teamName(rcTeam) + "</td>";
					tableHTML += "<td style=\"text-align: center;\">" + rcPD + "</td>";
					tableHTML += "<td style=\"text-align: center;\">" + rcDD + "</td>";
					tableHTML += "<input type=\"hidden\" name=\"recruitNumber\" value=\"" + rcNumber + "\">";
					tableHTML += "<td style=\"text-align: center;\"><input type=\"submit\" value=\"채용하기\" style=\"padding: 5px; font-size: 16px;\" class=\"btnGroup\"/></td>";
					
					tableHTML +="</form>";
	
					tableHTML += "</tr>";
				}
			}
			
			return tableHTML;
		} catch (Exception e) {
			return e.toString();
		}
	}

	private String teamName(String v) {
		Connection conn = null;
		PreparedStatement pstmt = null;

		String jdbc_driver = "com.mysql.cj.jdbc.Driver";
		String jdbc_url = "jdbc:mysql://localhost:3306/hrmanagedb";
		try {
			Class.forName(jdbc_driver);

			conn = DriverManager.getConnection(jdbc_url, "root", "root");

			String sql = "select * from department where department.deptCode=?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, v);

			ResultSet rs = pstmt.executeQuery();
			rs.next();

			return rs.getString("deptName");
		} catch (Exception e) {
			return e.toString();
		}
	}
}

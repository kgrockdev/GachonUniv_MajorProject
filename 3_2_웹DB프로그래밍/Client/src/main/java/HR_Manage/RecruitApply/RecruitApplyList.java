package HR_Manage.RecruitApply;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class RecruitApplyList {
	private String rcName;
	private String tableHTML;

	public String getTableHTML() {
		return tableHTML;
	}

	public void setTableHTML(String tableHTML) {
		this.tableHTML = tableHTML;
	}

	public String getRcName() {
		return rcName;
	}

	public void setRcName(String rcName) {
		this.rcName = rcName;
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
					
					setRcName(rcName);
					
					tableHTML += "<tr class=\"colored\"><th scope=\"row\">" + rcNumber + "</th>";
					
					tableHTML += "<form action=\"/WebDBTermProject/Page/RecruitPage/RecruitPage.jsp\" method=\"Get\">";
					
					tableHTML += "<td>" + rcName + "</td>";
					tableHTML += "<td style=\"text-align: center;\">" + teamName(rcTeam) + "</td>";
					tableHTML += "<td style=\"text-align: center;\">" + rcPD + "</td>";
					tableHTML += "<td style=\"text-align: center;\">" + rcDD + "</td>";
					tableHTML += "<input type=\"hidden\" name=\"recruitNumber\" value=\"" + rcNumber + "\">";
					tableHTML += "<td style=\"text-align: center;\"><input type=\"submit\" value=\"지원하기\" style=\"padding: 5px; font-size: 16px; text-align: center;\" class=\"btnGroup\"/></td>";
					
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

	public String showRecruitAnnounceTable(int v) {
		String rcName;
		String rcDescription;
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

			String sql = "select * from recruitment where recruitNumber=?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, v);

			ResultSet rs = pstmt.executeQuery();
			rs.next();

			String tableHTML = "<table style=\"width: 60%; border: 1px solid; \">";

			rcName = rs.getString("recruitmentName");
			rcDescription = rs.getString("recruitmentDescription");
			rcTeam = rs.getString("recruitmentTeam");
			rcPD = rs.getDate("postedDate").toString();
			rcDD = rs.getDate("dueDate").toString();

			tableHTML += "<tr><td colspan=\"1\" style=\"text-align: center; background-color: #424242; color: #FFFFFF; font-weight: bold;\">공고명</td>";
			tableHTML += "<td colspan=\"3\">" + rcName + "</td></tr>";

			tableHTML += "<tr><td colspan=\"1\" style=\"text-align: center; background-color: #424242; color: #FFFFFF; font-weight: bold;\">담당</td>";
			tableHTML += "<td colspan=\"3\">" + teamName(rcTeam) + "</td></tr>";

			tableHTML += "<tr><td style=\"text-align: center; background-color: #424242; color: #FFFFFF; font-weight: bold;\">게시일</td>";
			tableHTML += "<td>" + rcPD + "</td>";
			tableHTML += "<td style=\"text-align: center; background-color: #424242; color: #FFFFFF; font-weight: bold;\">마감일</td>";
			tableHTML += "<td>" + rcDD + "</td></tr>";

			tableHTML += "<tr><td colspan=\"4\" style=\"text-align: center; background-color: #424242; color: #FFFFFF; font-weight: bold;\">공고 내용</td></tr>";
			tableHTML += "<tr><td colspan=\"4\">" + rcDescription + "</td></tr></table>";

			return tableHTML;
		} catch (Exception e) {
			return e.toString();
		}
	}
	
	public String showMyRecruitmentList(String v) {
		String rcName;
		int raNumber;
		String rcDD;
		String PFQuery;
		String PF;
		
		Connection conn = null;
		PreparedStatement pstmt = null;

		String jdbc_driver = "com.mysql.cj.jdbc.Driver";
		String jdbc_url = "jdbc:mysql://localhost:3306/hrmanagedb";
		try {
			Class.forName(jdbc_driver);

			conn = DriverManager.getConnection(jdbc_url, "root", "root");

			String sql = "select * from recruitment rc, recruitapply ra where rc.recruitNumber = ra.recruitNumber and account = ?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, v);

			ResultSet rs = pstmt.executeQuery();
			
			String tableHTML = "";

			while (rs.next()) {
				rcName = rs.getString("rc.recruitmentName");
				raNumber = rs.getInt("ra.recruitApplyNumber");
				rcDD = rs.getString("rc.dueDate");
				PFQuery = rs.getString("rc.recruitUser");
				
				if (PFQuery == null)
					PF = "-";
				else if (PFQuery.equals(v))
					PF = "합격";
				else
					PF = "불합격";

				tableHTML += "<tr><th scope=\"row\">" + raNumber + "</th>";
		
				tableHTML += "<td>" + rcName + "</td>";
				tableHTML += "<td>" + rcDD + "</td>";
				tableHTML += "<td style=\"text-align: center;\">" + PF + "</td>";

				tableHTML += "</tr>";
			}

			return tableHTML;
		} catch (Exception e) {
			return e.toString();
		}
	}
}

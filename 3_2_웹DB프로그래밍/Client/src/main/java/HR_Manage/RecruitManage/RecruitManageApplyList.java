package HR_Manage.RecruitManage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import HR_Manage.Modules.*;

public class RecruitManageApplyList {
	private String tableHTML;

	public String getTableHTML() {
		return tableHTML;
	}

	public void setTableHTML(String tableHTML) {
		this.tableHTML = tableHTML;
	}

	public String showRecruitApplyList(int v) {
		SqlQuery sq = new SqlQuery();
		tableHTML = "";
		
		String recruitNumber;
		String raNumber;
		String raAccount;
		String raReason;

		Connection conn = null;
		PreparedStatement pstmt = null;

		String jdbc_driver = "com.mysql.cj.jdbc.Driver";
		String jdbc_url = "jdbc:mysql://localhost:3306/hrmanagedb";
		try {
			Class.forName(jdbc_driver);

			conn = DriverManager.getConnection(jdbc_url, "root", "root");

			String sql = "select * from recruitapply where recruitNumber=?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, v);

			ResultSet rs = pstmt.executeQuery();

			while (rs.next()) {
				recruitNumber = rs.getString("recruitNumber");
				raNumber = rs.getString("recruitApplyNumber");
				raAccount = rs.getString("account");
				raReason = rs.getString("recruitReason");
				
				tableHTML += "<form action=\"/WebDBTermProject/Page/RecruitManagePage/RecruitManagePageJSP.jsp\" method=\"Get\">";
				
				tableHTML += "<td>" + raNumber + "</td>";
				tableHTML += "<td>" + sq.accountToName(raAccount) + "</td>";
				tableHTML += "<td style=\"width: 60%\">" + raReason + "</td>";
				tableHTML += "<input type=\"hidden\" name=\"recruitNumber\" value=\"" + recruitNumber + "\">";
				tableHTML += "<input type=\"hidden\" name=\"userAccount\" value=\"" + raAccount + "\">";
				tableHTML += "<td><input type=\"submit\" value=\"채용하기\" style=\"padding: 5px; font-size: 16px; \" class=\"btnGroup\"/></td>";
				
				tableHTML +="</form>";

				tableHTML += "</tr>";
			}
			
			return tableHTML;
		} catch (Exception e) {
			return e.toString();
		}
	}
}

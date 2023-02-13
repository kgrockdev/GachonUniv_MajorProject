import "./index.css";
import axios from "axios";
import React, { useEffect } from "react";
import useState from "react-usestateref";
import { Table, Button } from "antd";
import { deleteUser } from "../../API/deleteUser";
import { Link } from "react-router-dom";
require("dotenv");

function IndexPage() {
  const [totalPage, setTotalPage, totalPageRef] = useState(0);
  const [pageNum, setPageNum, pageNumRef] = useState(0);
  const [userList, setUserList, userListRef] = useState([]);

  function userPagenation() {
    axios
      .get(
        `${process.env.REACT_APP_Backend_Server_User}api/admin/user?page=${pageNumRef.current}`
      )
      .then(function (result) {
        console.log(result);
        var userMap = [];
        result.data.content.map(function (post, index) {
          userMap.push({
            key: index,
            idx: post.idx,
            name: post.name,
            email: post.email,
            birth: post.birth,
            iot: post.iot.toString(),
            dpScore: post.dpScore,
          });
        });

        console.log(userMap);
        setTotalPage(result.data.totalPages);
        setUserList(userMap);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  useEffect(userPagenation, []);

  //회원 정보 (컬럼)
  const columns_meminfo = [
    {
      title: "회원번호",
      dataIndex: "idx",
      key: "idx",
      align: "center",
    },
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "이메일",
      dataIndex: "email",
      key: "email",
      align: "center",
      render: (text) => <Link to={`/iotview?email=${text}`}>{text}</Link>,
    },
    {
      title: "생년월일",
      dataIndex: "birth",
      key: "birth",
      align: "center",
    },
    {
      title: "IOT 신청여부",
      dataIndex: "iot",
      key: "iot",
      align: "center",
    },
    {
      title: "우울증점수",
      dataIndex: "dpScore",
      key: "dpScore",
      align: "center",
      sorter: {
        compare: (a, b) => a.dpScore - b.dpScore,
      },
    },
  ];

  //체크박스가 있는 테이블
  class App extends React.Component {
    state = {
      selectedRowKeys: [], // Check here to configure the default column
    };

    //onClick시 회원 삭제하는 메서드
    delete = () => {
      Promise.allSettled(
        this.state.selectedRowKeys.map(function (item, index) {
          return deleteUser(userList[item].email);
        })
      )
        .then((res) => {
          console.log(res);
          alert(`정상적으로 삭제가 완료되었습니다.`);
          window.history.go(0);
        })
        .catch((err) => {
          console.log(err);
          alert("회원 삭제 진행 중 오류가 발생하였습니다.");
        });
    };

    onSelectChange = (selectedRowKeys) => {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.setState({ selectedRowKeys });
    };

    render() {
      const { selectedRowKeys } = this.state;
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
        selections: [
          Table.SELECTION_ALL,
          Table.SELECTION_INVERT,
          Table.SELECTION_NONE,
        ],
      };

      const hasSelected = selectedRowKeys.length > 0;

      return (
        <div>
          <div style={{ textAlign: "left", marginBottom: 16 }}>
            <Button
              type="primary"
              onClick={this.delete}
              disabled={!hasSelected}
            >
              선택 회원 삭제
            </Button>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
            </span>
          </div>
          <Table
            rowSelection={rowSelection}
            columns={columns_meminfo}
            dataSource={userList}
            pagination={{
              defaultCurrent: pageNum + 1,
              pageSize: 12,
              total: totalPage * 12,
              /*페이지네이션 */
              onChange: (page) => {
                setPageNum(page - 1);
                userPagenation();
                console.log(pageNumRef.current);
              },
            }}
          />
        </div>
      );
    }
  }

  //우울증 점수로 정렬(오름차순, 내림차순, 정렬취소)
  function onSort(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <div>
      {/* <!-- container --> */}
      <div className="container">
        <div className="mng-wrapper">
          <div id="mng-member-title">
            <p>회원 명단</p>
          </div>
          <div id="mng-member-table">
            {/*체크박스 테이블 */}
            <App onChange={onSort} />
            {/*게시글 관리 기능 있는 테이블 */}
            {/*   
            <NestedTable
              onChange={onSort}
            />
            */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndexPage;

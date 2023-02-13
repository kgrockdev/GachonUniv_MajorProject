import "./index.css";
import axios from "axios";
import SyncRequest from "sync-request";
import React, { useEffect } from "react";
import useState from "react-usestateref";
import ChatIn from "../../03_Bot/chat/chatIn";
import ChatOut from "../../03_Bot/chat/chatOut";
import { volunteerAccept, volunteerDeny } from "../../API/volunteerAD";
import convertMonth from "../../module/convertMonth";
import {
  Descriptions,
  Drawer,
  Image,
  Switch,
  List,
  Avatar,
  Menu,
  Dropdown,
  Radio,
  Modal,
  Button,
  Input,
  Form,
  DatePicker,
  Tag,
} from "antd";
import {
  MoreOutlined,
  CheckCircleOutlined,
  CarryOutOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

function MyPage() {
  const [postList, setPostList] = useState([]);

  const [mode, setMode, modeRef] = useState("ndlog");
  const [page, setPage, pageRef] = useState(1);
  const [totalPage, setTotalPage, totalPageRef] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");
  const [sex, setSex] = useState("");
  const [iot, setIot] = useState(false);
  const [siren, setSiren] = useState(false);
  const [disabled, setDisabled] = useState(true);

  // 요청 Visible
  const [visible, setVisible] = useState(false);
  const onClose = () => {
    setVisible(false);
    setBoardClose(-1);
  };

  // 지원 Visible
  const [visibleVol, setVisibleVol] = useState(false);
  const onCloseVol = () => {
    setVisibleVol(false);
    setBoardClose(-1);
  };

  function postSearch() {
    axios
      .get(
        `${
          process.env.REACT_APP_Backend_Server
        }mypage/log?userid=${sessionStorage.getItem("email")}&mode=${
          modeRef.current
        }&page=${pageRef.current}`
      )
      .then(function (result) {
        console.log(result.data);

        try {
          setTotalPage(result.data.totalnum);
        } catch (err) {
          setTotalPage(1);
          console.log(err);
        }

        var postMap = [];
        result.data.user.map(function (post, index) {
          postMap.push({
            id: post.board_id,
            gvId: post.board_gvid,
            href: `/read?id=${post.board_id}`, //해당 게시글(상세페이지)로 이동
            title: post.board_title,
            avatar: "https://joeschmoe.io/api/v1/random",
            description: post.createdAt,
            content: post.board_content,
            close: post.board_close,
            // board_writer: post.board_writer,
            // board_title: post.board_title,
            // board_content: post.board_content,
            // board_event_time: post.board_event_time,
            // board_start_date: post.board_start_date,
            // board_end_date: post.board_end_date,
            // board_category: post.board_category,
            // board_lat: post.board_lat,
            // board_lng: post.board_lng,
          });
        });

        setPostList(postMap);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const [boardEmail, setBoardEmail, boardEmailRef] = useState("");
  const [boardClose, setBoardClose, boardCloseRef] = useState(1);
  const [gvEmail, setGvEmail, gvEmailRef] = useState("");
  const [gvName, setGvName] = useState("");
  const [gvAddr, setGvAddr] = useState("");
  const [gvSex, setGvSex] = useState("");
  const [gvBirth, setGvBirth] = useState("");

  function volunteerSearch() {
    axios
      .get(
        `${process.env.REACT_APP_Backend_Server_User}api/user/fbe/${gvEmailRef.current}`
      )
      .then((res) => {
        console.log(res);
        try {
          setGvName(res.data.name);
          setGvAddr(res.data.addr);
          setGvSex(res.data.sex);
          setGvBirth(
            res.data.birth.split(" ")[3] +
              "/" +
              convertMonth(res.data.birth.split(" ")[1]) +
              "/" +
              res.data.birth.split(" ")[2]
          );
        } catch (err) {
          alert("지원자 정보를 불러오는 중 오류가 발생하였습니다.");
          console.error(err);
          setGvName("");
          setGvAddr("");
          setGvSex("");
          setGvBirth("");
        }
      })
      .catch((err) => {
        setGvName("-");
        setGvAddr("-");
        setGvSex("-");
        setGvBirth("-");
      });
  }

  useEffect(function () {
    postSearch();

    var res = SyncRequest(
      "GET",
      `${
        process.env.REACT_APP_Backend_Server_User
      }api/user/fbe/${sessionStorage.getItem("email")}`
    );

    console.log(JSON.parse(res.body));

    setName(JSON.parse(res.body).name);
    setEmail(JSON.parse(res.body).email);
    setSex(JSON.parse(res.body).sex);
    setIot(JSON.parse(res.body).iot);
    setSiren(JSON.parse(res.body).siren);
    setDisabled(!JSON.parse(res.body).iot);

    console.log(JSON.parse(res.body).birth.split(" "));
    setBirth(
      JSON.parse(res.body).birth.split(" ")[3] +
        "/" +
        convertMonth(JSON.parse(res.body).birth.split(" ")[1]) +
        "/" +
        JSON.parse(res.body).birth.split(" ")[2]
    );
  }, []);

  function onChange(checked) {
    console.log(checked);
    if (checked === false) {
      axios
        .put(
          `${process.env.REACT_APP_Backend_Server_User}api/admin/iot/onsiren/${email}`
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          alert("IOT 이상 탐지 On/Off 변환 중 에러가 발생하였습니다.");
          console.error(err);
        });
    } else if (checked === true) {
      axios
        .put(
          `${process.env.REACT_APP_Backend_Server_User}api/admin/iot/onsiren/${email}`
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          alert("IOT 이상 탐지 On/Off 변환 중 에러가 발생하였습니다.");
          console.error(err);
        });
    } else {
      alert("IOT 이상 탐지 On/Off 변환 중 에러가 발생하였습니다.");
    }
  }

  const toggle = () => {
    setDisabled(!disabled);
  };

  const options = [
    { label: "요청", value: "요청" },
    { label: "지원", value: "지원" },
  ];

  class RadioBtn extends React.Component {
    onRadioChange = (e) => {
      console.log("radio checked", e.target.value);

      if (e.target.value === "요청") {
        setMode("ndlog");
      } else if (e.target.value === "지원") {
        setMode("gvlog");
      } else {
      }

      postSearch();
    };

    render() {
      return (
        <Radio.Group
          options={options}
          onChange={this.onRadioChange}
          value={modeRef.current === "ndlog" ? "요청" : "지원"}
          optionType="button"
          buttonStyle="solid"
        />
      );
    }
  }

  class ProfileModify extends React.Component {
    state = {
      visible: false,
    };

    showModal = () => {
      this.setState({
        visible: true,
      });
    };

    handleCancel = () => {
      this.setState({ visible: false });
    };

    render() {
      const { visible } = this.state;

      //수정된 개인정보 db에 업데이트
      const onModify = (values) => {
        var data = {
          name: values.name,
          birth: values.birth._d.toString(),
          sex: values.sex,
        };
        axios
          .put(
            `${
              process.env.REACT_APP_Backend_Server_User
            }api/user/update/${sessionStorage.getItem("email")}`,
            data,
            {
              headers: { "Content-Type": `application/json` },
            }
          )
          .then(function (result) {
            alert("정상적으로 내 정보 저장이 완료되었습니다!");
            window.history.go(0);
          })
          .catch(function (error) {
            alert("정보 저장 중 오류가 발생하였습니다.");
            console.error(error);
          });
        console.log("Success:", values);
      };

      const onModifyFailed = (errorInfo) => {
        console.error("Failed:", errorInfo);
      };

      const menu = (
        <Menu onClick={this.showModal}>
          <Menu.Item key="1">내 정보 수정하기</Menu.Item>
        </Menu>
      );

      return (
        <>
          <Dropdown overlay={menu} placement="bottomRight">
            <a
              href={() => false}
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <MoreOutlined />
            </a>
          </Dropdown>
          <Modal
            visible={visible}
            title="내 정보 수정"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                취소
              </Button>,
            ]}
          >
            <Form
              name="myinfo"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              onFinish={onModify}
              onFinishFailed={onModifyFailed}
              style={{ marginTop: "30px" }}
              autoComplete="off"
            >
              <Form.Item
                label="이름 : "
                name="name"
                rules={[{ required: true, message: "이름을 입력해주세요!" }]}
              >
                <Input placeholder={name} />
              </Form.Item>

              <Form.Item
                label="생년월일 : "
                name="birth"
                rules={[
                  { required: true, message: "생년월일을 입력해주세요!" },
                ]}
              >
                <DatePicker placeholder={birth} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="성별 : "
                name="sex"
                rules={[{ required: true, message: "성별을 입력해주세요!" }]}
              >
                <Input placeholder={sex} />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  수정하기
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </>
      );
    }
  }

  function Profile() {
    return (
      <table id="profile-table">
        <tbody>
          <tr>
            <td colSpan="2" id="profile-table-img">
              {/*소셜 로그인의 프로필 사진*/}
              <Image
                width={"100%"}
                src={sessionStorage.getItem("profileImg")}
              />
            </td>
          </tr>
          <tr>
            <td id="profile-table-info-title">내 정보</td>
            <td id="profile-table-info-ddbutton">
              <ProfileModify />
            </td>
          </tr>
          <tr>
            <td colSpan="2" id="profile-table-info">
              {name}
            </td>
          </tr>
          <tr>
            <td colSpan="2" id="profile-table-info">
              {email}
            </td>
          </tr>
          <tr>
            <td colSpan="2" id="profile-table-info">
              {birth}
            </td>
          </tr>
          <tr>
            <td colSpan="2" id="profile-table-info">
              {sex}
            </td>
          </tr>
          <tr>
            <td id="profile-table-info-iot">IOT 신청여부 : {iot.toString()}</td>
            <td id="profile-table-info-bottom">
              <Switch
                disabled={disabled} //IOT 신청 안한 사람의 경우 disabled
                checkedChildren="IOT 켜짐"
                unCheckedChildren="IOT 꺼짐"
                defaultChecked={siren}
                onChange={onChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  const tag1 = (
    <Tag icon={<ClockCircleOutlined />} color="processing">
      모집중
    </Tag>
  );

  const tag2 = (
    <Tag icon={<ClockCircleOutlined />} color="gold">
      요청 대기중
    </Tag>
  );

  const tag3 = (
    <Tag icon={<CheckCircleOutlined />} color="default">
      모집완료
    </Tag>
  );

  const tag4 = (
    <Tag icon={<CarryOutOutlined />} color="success">
      지원 완료
    </Tag>
  );

  //도움 요청 리스트
  function NdHelpList() {
    return (
      <List
        style={{
          backgroundColor: "#fff",
          padding: "20px",
        }}
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (this_page) => {
            setPage(this_page);
            console.log(pageRef.current);
            postSearch();
          },
          defaultCurrent: pageRef.current,
          pageSize: 3,
          total: totalPageRef.current,
        }}
        dataSource={postList}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            extra={
              <>
                <img
                  width={"200px"}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
                <div id="volunteer-info-btn">
                  <Button
                    size="small"
                    onClick={() => {
                      setVisible(true);
                      setBoardEmail(item.id);
                      setBoardClose(item.close);
                      setGvEmail(item.gvId);
                      volunteerSearch();
                    }}
                  >
                    지원자 정보
                  </Button>
                </div>
              </>
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              //상태에 따라 다른 태그가 보임 (<PostTag />)
              title={
                <a href={item.href}>
                  {item.title}&nbsp;&nbsp;&nbsp;
                  {item.close === 1 ? tag1 : item.close === 2 ? tag2 : tag3}
                </a>
              }
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    );
  }

  //도움 지원 리스트
  function GvHelpList() {
    return (
      <List
        style={{
          backgroundColor: "#fff",
          padding: "20px",
        }}
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (this_page) => {
            setPage(this_page);
            console.log(pageRef.current);
            postSearch();
          },
          defaultCurrent: pageRef.current,
          pageSize: 3,
          total: totalPageRef.current,
        }}
        dataSource={postList}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            extra={
              <>
                <img
                  width={"200px"}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
                <div id="volunteer-info-btn">
                  {item.close === 3 ? (
                    <Button
                      size="small"
                      onClick={() => {
                        setVisibleVol(true);
                        setBoardEmail(item.id);
                        setBoardClose(item.close);
                        setGvEmail(item.gvId);
                      }}
                    >
                      채팅방 입장
                    </Button>
                  ) : (
                    <div></div>
                  )}
                </div>
              </>
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              //상태에 따라 다른 태그가 보임 (<PostTag />)
              title={
                <a href={item.href}>
                  {item.title}&nbsp;&nbsp;&nbsp;
                  {tag4}
                </a>
              }
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    );
  }

  // Chat_IN
  const ChatInFunc = () => {
    return (
      <Form>
        <ChatIn bId={boardEmailRef.current} />
      </Form>
    );
  };
  // Chat_Out
  const ChatOutFunc = () => {
    return (
      <Form>
        <ChatOut bId={boardEmailRef.current} />
      </Form>
    );
  };

  return (
    <div id="mypage-back-color">
      {/* <!-- container --> */}
      <div className="container">
        {/* 요청 Drawer */}
        <Drawer
          title="지원자 정보"
          placement={"right"}
          width={600}
          onClose={onClose}
          visible={visible}
        >
          {boardCloseRef.current === 3 ? <ChatInFunc /> : <div></div>}

          {boardCloseRef.current === 1 || boardCloseRef.current === 2 ? (
            <Descriptions title="상세 정보" layout="vertical" bordered>
              <Descriptions.Item label="이름" span={3}>
                {gvName}
              </Descriptions.Item>
              <Descriptions.Item label="주소" span={3}>
                {gvAddr}
              </Descriptions.Item>
              <Descriptions.Item label="성별" style={{ width: "49%" }}>
                {gvSex}
              </Descriptions.Item>
              <Descriptions.Item label="생일" style={{ width: "49%" }}>
                {gvBirth}
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <div></div>
          )}

          {boardCloseRef.current === 2 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "20px",
              }}
            >
              <Button
                size="large"
                onClick={() => volunteerDeny(boardEmailRef.current)}
                style={{ width: "100px" }}
              >
                거절
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={() => volunteerAccept(boardEmailRef.current)}
                style={{ width: "100px" }}
              >
                수락
              </Button>
            </div>
          ) : (
            <div></div>
          )}
        </Drawer>
        {/* 지원 Drawer */}
        <Drawer
          title="지원자 채팅"
          placement={"right"}
          width={600}
          onClose={onCloseVol}
          visible={visibleVol}
        >
          <ChatOutFunc />
        </Drawer>
        <div className="mypage-wrapper">
          <div id="mypage-layout-left">
            <Profile />
          </div>
          <div id="mypage-layout-right">
            <div id="mypost-div">
              <div id="mypost-radiobtn-div">
                <RadioBtn />
              </div>
              {modeRef.current === "ndlog" ? <NdHelpList /> : <GvHelpList />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;

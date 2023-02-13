// 반드시 Heroku Server WakeUp 한 뒤 진행
// 반드시 도로명 주소로 진행

import "./index.css";
import jsonp from "jsonp";
import axios from "axios";
import React, { useState, useEffect } from "react";
import DaumPostCode from "react-daum-postcode";
import {
  Drawer,
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { requireFieldCheck } from "../../../API/requireFieldCheckAPI";
import { googleIsLogin } from "../../../module/googleIsLogin";
import { kakaoIsLogin } from "../../../module/kakaoIsLogin";
const { Option } = Select;
const { TextArea } = Input;

function WritePage() {
  const { Kakao } = window;

  // 로그인이 되어있는지 여부에 대한 체크
  useEffect(() => {
    if (Kakao.Auth.getAccessToken()) {
      kakaoIsLogin()
        .then()
        .catch((err) => {
          alert("인증 정보가 유효하지 않습니다!");
          window.history.go(-1);
          return;
        });
    } else if (JSON.parse(sessionStorage.getItem("user"))) {
      googleIsLogin()
        .then()
        .catch((err) => {
          alert("인증 정보가 유효하지 않습니다!");
          window.history.go(-1);
          return;
        });
    } else {
      alert("로그인이 되어있지 않습니다!");
      window.history.go(-1);
      return;
    }

    // 사이트를 이용하기 위한 필수 Field들이 서버에 있는지 체크
    requireFieldCheck(sessionStorage.getItem("email"))
      .then((res) => {
        if (res === true) {
          return;
        } else if (res === false) {
          alert(
            "사이트를 이용하기 위한 필수 값이 입력 되어있지 않아 입력 페이지로 이동합니다."
          );
          window.location.href = "/require";
          return;
        }
      })
      .catch((err) => {
        alert("에러가 발생하였습니다.");
        console.log(err);
        window.location.href = "/";
        return;
      });
  });

  // Drawer 변수 관리할 state
  const [state, setState] = useState(false);

  // Addr 변수 관리할 state
  const [addr1, setAddr1] = useState("");

  // Addr Drawer 관리 함수
  const showDrawer = () => {
    setState(true);
  };
  const onClose = () => {
    setState(false);
  };

  // 게시글 등록 Submit 함수
  const onPostFinish = (values) => {
    if (addr1 !== "") {
      values.addr1 = addr1;

      jsonp(
        `http://api.vworld.kr/req/address?service=address&request=getcoord&address=${encodeURI(
          addr1
        )}&type=road&key=${process.env.REACT_APP_VWorld_API_KEY}`,
        {},
        function (err, data) {
          axios
            .post(
              `${process.env.REACT_APP_Backend_Server}ndhelp/write`,
              {
                board_writer: sessionStorage.getItem("name"),
                board_ndid: sessionStorage.getItem("email"),
                board_title: values.title,
                board_content: values.content,
                board_category: values.category,
                board_start_date: values.datepicker[0]._d,
                board_end_date: values.datepicker[1]._d,
                board_lat: data.response.result.point.y,
                board_lng: data.response.result.point.x,
                board_addr1: values.addr1,
                board_addr2: values.addr2,
                board_region1Depth: data.response.refined.structure.level1,
                board_region2Depth: data.response.refined.structure.level2,
              },
              {
                headers: { "Content-Type": `application/json` },
              }
            )
            .then(function (result) {
              console.log(result);
              alert("게시글이 정상적으로 등록되었습니다.");
              window.location.href = "/ndhelp";
              return;
            })
            .catch(function (error) {
              console.error(error);
              return;
            });
        }
      );
    } else {
      console.error("Error");
    }
  };

  // Drawer - Find PostCode
  const FindAddr = () => {
    // Addr Submit 함수
    const handleAddrFinish = (data) => {
      console.log(data.roadAddress);
      onClose();
      setAddr1(data.roadAddress);
    };

    const drawerStyle = {
      height: "800px",
    };

    return (
      <Form>
        <DaumPostCode onComplete={handleAddrFinish} style={drawerStyle} />
      </Form>
    );
  };

  return (
    <div className="container">
      <Drawer
        title="주소 검색"
        width={720}
        onClose={onClose}
        visible={state}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <FindAddr />
      </Drawer>
      <div id="layout">
        <Form onFinish={onPostFinish}>
          <Input.Group>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item name="name">
                  <Input
                    addonBefore="이름"
                    defaultValue={sessionStorage.getItem("name")}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="category">
                  <Select defaultValue="카테고리">
                    <Option value="노인">노인</Option>
                    <Option value="장애인">장애인</Option>
                    <Option value="아동">아동</Option>
                    <Option value="고독">고독</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Input.Group>
          <Input.Group>
            <Row gutter={8}>
              <Col span={12}>
                <Input.Group>
                  <Form.Item>
                    <div className="row" style={{ margin: "0 auto" }}>
                      <div
                        style={{
                          border: "1px solid #ced4da",
                          height: "32px",
                        }}
                      >
                        <div style={{ margin: "5px" }}>
                          <span onClick={showDrawer}>
                            {addr1 ? addr1 : `주소 검색  `}
                            {addr1 ? "" : <SearchOutlined />}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Form.Item>
                </Input.Group>
              </Col>
              <Col span={12}>
                <Form.Item name="addr2">
                  <Input
                    addonBefore="상세 주소"
                    placeholder="제목을 입력해주세요"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item name="datepicker">
                  <DatePicker.RangePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
          </Input.Group>
          <Form.Item name="title">
            <Input addonBefore="제목" placeholder="제목을 입력해주세요" />
          </Form.Item>
          <Form.Item name="content">
            <TextArea
              placeholder="내용을 입력해주세요"
              autoSize={{ minRows: 20, maxRows: 20 }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              글쓰기
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default WritePage;

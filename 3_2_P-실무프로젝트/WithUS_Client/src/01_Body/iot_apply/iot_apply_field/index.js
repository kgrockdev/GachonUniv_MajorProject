import "./index.css";
import axios from "axios";
import jsonp from "jsonp";
import React, { useState, useEffect } from "react";
import DaumPostCode from "react-daum-postcode";
import { SearchOutlined } from "@ant-design/icons";
import { Drawer, Form, Input, Checkbox, Button } from "antd";

function IotApplyFieldPage() {
  // Drawer 변수 관리할 state
  const [state, setState] = useState(false);
  // Addr 변수 관리할 state
  const [addr1, setAddr1] = useState("");

  // 게시글 등록 Submit 함수
  const onPostFinish = (values) => {
    if (addr1 !== "") {
      jsonp(
        `http://api.vworld.kr/req/address?service=address&request=getcoord&address=${encodeURI(
          addr1
        )}&type=road&key=${process.env.REACT_APP_VWorld_API_KEY}`,
        {},
        function (err, data) {
          const dataSet = {
            board_lat: data.response.result.point.y,
            board_lng: data.response.result.point.x,
            addr: addr1 + "/" + values.addr2,
            board_region1Depth: data.response.refined.structure.level1,
            board_region2Depth: data.response.refined.structure.level2,
          };

          axios
            .put(
              `${
                process.env.REACT_APP_Backend_Server_User
              }api/user/update/addr/${sessionStorage.getItem("email")}`,
              dataSet,
              {
                headers: { "Content-Type": `application/json` },
              }
            )
            .then(function (result) {
              alert("정상적으로 내 정보 저장이 완료되었습니다!");
              axios
                .put(
                  `${
                    process.env.REACT_APP_Backend_Server_User
                  }api/user/registIot/${sessionStorage.getItem("email")}`
                )
                .then(function (result) {
                  console.log(result);
                  alert("정상적으로 IOT 서비스 신청이 완료되었습니다!");
                  window.location.href = "/";
                })
                .catch(function (error) {
                  alert("IOT 서비스 신청 중 오류가 발생하였습니다.");
                  console.error(error);
                });
            })
            .catch(function (error) {
              alert("정보 저장 중 오류가 발생하였습니다.");
              console.error(error);
            });
        }
      );
    } else {
      alert("주소를 검색해주세요!");
      return;
    }
  };

  // Addr Drawer 관리 함수
  const showDrawer = () => {
    setState(true);
  };
  const onClose = () => {
    setState(false);
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
      <div id="form-wrapper">
        <div id="form-layout">
          <p id="form-p">※ 내 주소를 입력해주세요.</p>
          <Form
            onFinish={onPostFinish}
            style={{ marginTop: "20px" }}
            size={"large"}
          >
            <div className="row" style={{ margin: "0 auto" }}>
              <div
                className="col-xs-6 col-md-6"
                style={{ border: "1px solid #ced4da", margin: "15px" }}
              >
                <div style={{ padding: "10px" }}>
                  <span onClick={showDrawer}>
                    {addr1 ? addr1 : `주소 검색  `}
                    {addr1 ? "" : <SearchOutlined />}
                  </span>
                </div>
              </div>
              <div className="col-xs-5 col-md-5">
                <Form.Item
                  name="addr2"
                  rules={[
                    { required: true, message: "상세 주소를 입력해주세요!" },
                  ]}
                  style={{ margin: "15px" }}
                >
                  <Input placeholder="상세 주소" style={{ height: "42px" }} />
                </Form.Item>
              </div>
            </div>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("주소 수집에 동의해주세요")),
                },
              ]}
            >
              <Checkbox>주소를 수집하는 사항에 대해 동의합니다.</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default IotApplyFieldPage;

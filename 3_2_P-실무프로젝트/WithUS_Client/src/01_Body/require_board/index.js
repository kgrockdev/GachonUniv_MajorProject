import "./index.css";
import axios from "axios";
import React from "react";
import { Form, Input, Radio, DatePicker, Button } from "antd";

function RequireBoardPage() {
  // 게시글 등록 Submit 함수
  const onPostFinish = (values) => {
    const data = {
      name: values.username,
      birth: values.birth._d.toString(),
      sex: values.gender,
    };
    console.log(data);
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
        window.location.href = "/";
      })
      .catch(function (error) {
        alert("정보 저장 중 오류가 발생하였습니다.");
        console.error(error);
      });
  };

  return (
    <div className="container">
      <div id="form-wrapper">
        <div id="form-layout">
          <p id="form-p">※ 내 정보를 입력해주세요.</p>
          <Form
            onFinish={onPostFinish}
            style={{ marginTop: "20px" }}
            size={"large"}
          >
            <div className="row">
              <div className="col-xs-4 col-md-4">
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: "이름을 입력해주세요!" }]}
                  style={{ margin: "0px" }}
                >
                  <Input placeholder="이름" />
                </Form.Item>
              </div>
              <div className="col-xs-4 col-md-4">
                <Form.Item
                  name="birth"
                  rules={[{ required: true, message: "생일을 입력해주세요!" }]}
                >
                  <DatePicker placeholder="생일" style={{ width: "100%" }} />
                </Form.Item>
              </div>
              <div className="col-xs-4 col-md-4">
                <Form.Item
                  name="gender"
                  rules={[{ required: true, message: "성별을 입력해주세요!" }]}
                >
                  <Radio.Group>
                    <Radio.Button value="남">남성</Radio.Button>
                    <Radio.Button value="여">여성</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
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

export default RequireBoardPage;

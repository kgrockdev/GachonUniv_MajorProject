import "./index.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, Radio, Modal, Spin } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { API_URL } from "../config/constants.js";

function MainPage() {
  const { confirm } = Modal;
  // 동적인 값 관리하기 위한 useState
  const [loading, setLoading] = useState(null);
  let history = useHistory();

  const onFinish = function (values) {
    // 저작권 관련 방지 대책
    // 문의 받으면 개인 SNS별 코드를 발급받아 DB 일치시키기?
    if (values.Password !== "0000") {
      Modal.error({
        title: "인증키 불일치",
        content:
          "본 서비스는 인증키가 있을 경우만 사용 가능합니다. 관리자에게 문의해주시기 바랍니다.",
        centered: true,
      });
    } else {
      confirm({
        title: "약관동의",
        icon: <ExclamationCircleOutlined />,
        content: "본 서비스의 이용 약관에 동의하시겠습니까?",
        okText: "확인",
        cancelText: "취소",
        centered: true,
        onOk() {
          // 중복 입력을 막기 위한 로딩바 생성
          setLoading(true);
          // 서버에 post 해서 난수로 세션 키 값을 받아옴
          // 받아온 세션 값을 클라이언트에 저장함
          // result페이지로 넘김
          axios
            .post(`${API_URL}/`, {
              SNS: values.SNS,
              account: values.account,
              password: values.Password,
            })
            .then((result) => {
              setLoading(false);
              window.sessionStorage.setItem("SNS", result.data.SNS);
              window.sessionStorage.setItem("account", result.data.account);
              window.sessionStorage.setItem("auth", result.data.auth);
              history.push("/result");
            })
            .catch((error) => {
              setLoading(false);
              Modal.error({
                title: "ERROR",
                content: "예상하지 못한 에러가 발생하였습니다.",
              });
            });
        },
        onCancel() {
          setLoading(false);
          console.log("Cancel");
        },
      });
    }
  };

  return (
    <div>
      <div id="main-bg">
        <div id="main-header"></div>
        <div id="form-box">
          <Spin tip="Loading..." size="large" spinning={loading}>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <div id="form-box-header">Corona BLoom</div>
              <Form.Item
                label="SNS"
                name="SNS"
                rules={[
                  {
                    required: true,
                    message: "사용하시는 SNS 계정을 선택해주세요.",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio.Button value="Facebook">Facebook</Radio.Button>
                  <Radio.Button value="Twitter">Twitter</Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label="아이디"
                name="account"
                rules={[
                  {
                    required: true,
                    message: "사용하시는 SNS 계정을 입력해주세요.",
                  },
                ]}
              >
                <Input style={{ width: "70%" }} />
              </Form.Item>

              <Form.Item
                label="인증키"
                name="Password"
                rules={[{ required: true, message: "인증키를 입력해주세요." }]}
              >
                <Input.Password style={{ width: "70%" }} />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </div>
        <div id="main-footer"></div>
      </div>
    </div>
  );
}

export default MainPage;

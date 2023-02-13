import "./index.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Popover, Modal, Button } from "antd";
import { signUp } from "../../API/signUp";
import { isAdmin } from "../../API/isAdmin";
import { googleIsLogin } from "../../module/googleIsLogin";
import { kakaoIsLogin } from "../../module/kakaoIsLogin";
import { KakaoLogin, KakaoLogout } from "../../module/kakaoLoginOut";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import {
  UserOutlined,
  MehOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
require("dotenv");

function Header() {
  const { Kakao } = window;

  // Login State 관리
  const [isLogin, setIsLogin] = useState(false);
  // Admin State 관리
  const [isAd, setIsAd] = useState(false);

  useEffect(() => {
    // 카카오 로그인 유지 (자체 함수 Validation)
    if (Kakao.Auth.getAccessToken()) {
      kakaoIsLogin().then((res) => {
        setIsLogin(res);
        isAdmin(sessionStorage.getItem("email")).then((res) => setIsAd(res));
      });
    }
    // 구글 로그인 유지 (Sync 통신으로 Access Token Validation)
    else if (JSON.parse(sessionStorage.getItem("user"))) {
      googleIsLogin().then((res) => {
        setIsLogin(res);
        isAdmin(sessionStorage.getItem("email")).then((res) => setIsAd(res));
      });
    }
  });

  // Modal의 useState 관리
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSuccessGoogle = (auth) => {
    sessionStorage.setItem("user", JSON.stringify(auth));
    signUp()
      .then((res) => {
        console.log(res);
        window.history.go(0);
      })
      .catch((err) => console.error(err));
  };

  const onFailureGoogle = (err) => {
    console.error(err);
  };

  const onLogoutGoogle = (auth) => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "/";
  };

  // 각 SNS별 로그아웃 기능
  const googleLogout = (
    <div>
      <GoogleLogout
        clientId={process.env.REACT_APP_GOOGLE_API_KEY}
        render={(renderProps) => (
          <Button
            onClick={renderProps.onClick}
            icon={<LogoutOutlined />}
            size="large"
            style={{ width: "200px", marginTop: "10px" }}
          >
            로그아웃
          </Button>
        )}
        onLogoutSuccess={onLogoutGoogle}
      />
    </div>
  );
  const kakaoLogout = (
    <div>
      <Button
        onClick={KakaoLogout}
        icon={<LogoutOutlined />}
        size="large"
        style={{ width: "200px", marginTop: "10px" }}
      >
        로그아웃
      </Button>
    </div>
  );

  // 관리자를 위한 관리페이지 접속 버튼
  const mngMemberBtn = (
    <div>
      <Link to="/mngmember">
        <Button
          icon={<SettingOutlined />}
          size="large"
          style={{ width: "200px", marginTop: "10px" }}
        >
          관리페이지
        </Button>
      </Link>
    </div>
  );

  // Popover Text 관리
  const text = (
    <div style={{ textAlign: "center", fontFamily: "Jua", fontSize: "20px" }}>
      Info
    </div>
  );
  const content = (
    <div className="profileContainer">
      <div className="OuterBox">
        <div className="box">
          <img
            src={sessionStorage.getItem("profileImg")}
            className="profile"
            alt={"profile"}
          />
        </div>
        <div>
          <div className="email_name">{sessionStorage.getItem("name")}</div>
          <div className="email_name">{sessionStorage.getItem("email")}</div>
        </div>
      </div>
      <div id="myPage">
        <Link to="/mypage">
          <Button
            icon={<MehOutlined />}
            size="large"
            style={{ width: "200px", marginTop: "10px" }}
          >
            마이페이지
          </Button>
        </Link>
      </div>
      <div id="mngMember">{isAd === false ? "" : mngMemberBtn}</div>
      <div id="logout">
        {sessionStorage.getItem("auth") === "kakao"
          ? kakaoLogout
          : googleLogout}
      </div>
    </div>
  );

  // 비 로그인 상태의 로그인뷰
  const loginView_notLogin = (
    <div>
      <div className="col-md-9" id="account">
        <div className="header-account">
          <Button
            onClick={showModal}
            icon={<UserOutlined />}
            size="large"
            style={{
              backgroundColor: "#f4f4f4",
              color: "#012758",
              borderColor: "#f4f4f4",
            }}
          >
            로그인
          </Button>
          <Modal
            title={
              <img
                alt={"logo"}
                src="./logo_Login.png"
                width="192px"
                style={{
                  display: "block",
                  margin: "0px auto",
                }}
              />
            }
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={[]}
          >
            <p>
              {/* Google Login API */}
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_API_KEY}
                render={(renderProps) => (
                  <a href={() => false} onClick={renderProps.onClick}>
                    <img
                      alt={"google"}
                      width="300px"
                      height="70px"
                      src="./images/snsLogin/google.png"
                      style={{
                        display: "block",
                        margin: "0px auto",
                      }}
                    />
                  </a>
                )}
                onSuccess={onSuccessGoogle}
                onFailure={onFailureGoogle}
              />
            </p>
            <p>
              <KakaoLogin />
            </p>
            <p>
              <img
                alt={"naver"}
                src="./images/snsLogin/naver.png"
                width="300px"
                height="70px"
                style={{
                  display: "block",
                  margin: "0px auto",
                }}
              />
            </p>
          </Modal>
        </div>
      </div>
    </div>
  );

  // 로그인 상태의 로그인뷰
  const loginView_Login = (
    <div>
      <div className="col-md-9" id="account">
        <div className="header-account">
          <Popover
            placement="bottom"
            title={text}
            content={content}
            trigger="click"
          >
            <Button
              onClick={showModal}
              icon={<UserOutlined />}
              size="large"
              style={{
                backgroundColor: "#f4f4f4",
                color: "#012758",
                borderColor: "#f4f4f4",
              }}
            >
              내 정보
            </Button>
          </Popover>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* <!-- HEADER --> */}
      <header>
        {/* <!-- MAIN HEADER --> */}
        <div id="header">
          {/* <!-- container --> */}
          <div className="container">
            {/* <!-- row --> */}
            <div className="row" id="row">
              {/* <!-- LOGO --> */}
              <div className="col-md-3">
                <div className="header-logo">
                  <Link to="/" className="logo">
                    <img alt={"logo"} src="./logo.png" width="192px" />
                  </Link>
                </div>
              </div>
              {/* <!-- /LOGO --> */}

              {/* <!-- ACCOUNT --> */}
              {isLogin ? loginView_Login : loginView_notLogin}
              {/* <!-- ACCOUNT --> */}
            </div>
            {/* <!-- row --> */}
          </div>
          {/* <!-- container --> */}
        </div>
        {/* <!-- /MAIN HEADER --> */}
      </header>
      {/* <!-- /HEADER --> */}
    </div>
  );
}

export default Header;

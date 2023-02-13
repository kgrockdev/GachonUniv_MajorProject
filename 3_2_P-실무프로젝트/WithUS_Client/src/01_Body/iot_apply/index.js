import "./index.css";
import axios from "axios";
import { Button, Image } from "antd";
import React, { useEffect, useState } from "react";
import { googleIsLogin } from "../../module/googleIsLogin";
import { kakaoIsLogin } from "../../module/kakaoIsLogin";
import { requireFieldCheck } from "../../API/requireFieldCheckAPI";

function IotApplyPage() {
  const { Kakao } = window;

  const [iot, setIot] = useState(false);

  useEffect(function () {
    axios
      .get(
        `${
          process.env.REACT_APP_Backend_Server_User
        }api/user/fbe/${sessionStorage.getItem("email")}`
      )
      .then(function (result) {
        setIot(result.data.iot);
      })
      .catch(function (error) {
        alert("로그인이 되어있지 않아 타이틀 화면으로 돌아갑니다.");
        window.location.href = "/";
      });
  }, []);

  function iotApplyBtn() {
    if (Kakao.Auth.getAccessToken()) {
      kakaoIsLogin()
        .then()
        .catch((err) => {
          alert("인증 정보가 유효하지 않습니다!");
          window.location.href = `/apply`;
          return;
        });
    } else if (JSON.parse(sessionStorage.getItem("user"))) {
      googleIsLogin()
        .then()
        .catch((err) => {
          alert("인증 정보가 유효하지 않습니다!");
          window.location.href = `/apply`;
          return;
        });
    } else {
      alert("로그인이 되어있지 않습니다!");
      window.location.href = `/apply`;
      return;
    }

    // 사이트를 이용하기 위한 필수 Field들이 서버에 있는지 체크
    requireFieldCheck(sessionStorage.getItem("email"))
      .then((res) => {
        if (res === true) {
          window.location.href = `/applyField`;
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
  }

  function iotCancelBtn() {
    if (Kakao.Auth.getAccessToken()) {
      kakaoIsLogin()
        .then()
        .catch((err) => {
          alert("인증 정보가 유효하지 않습니다!");
          window.location.href = `/apply`;
          return;
        });
    } else if (JSON.parse(sessionStorage.getItem("user"))) {
      googleIsLogin()
        .then()
        .catch((err) => {
          alert("인증 정보가 유효하지 않습니다!");
          window.location.href = `/apply`;
          return;
        });
    } else {
      alert("로그인이 되어있지 않습니다!");
      window.location.href = `/apply`;
      return;
    }

    var bool = window.confirm("정말로 IOT 서비스를 중단하시겠습니까?");
    if (bool) {
      axios
        .put(
          `${
            process.env.REACT_APP_Backend_Server_User
          }api/user/unregistIot/${sessionStorage.getItem("email")}`
        )
        .then(function (result) {
          alert("IOT 서비스를 중단하였습니다.");
          window.location.href = "/";
        })
        .catch(function (error) {
          alert("IOT 서비스를 중단하는 중 오류가 발생하였습니다.");
        });
    }
  }

  return (
    <div>
      {/* <!-- container --> */}
      <div className="container">
        <div id="iot-title">
          <p>사용자 움직임 이상 감지 서비스</p>
        </div>
        <div id="iot-wrapper">
          <div id="iot-introduce">
            <div id="iot-introduce-left">
              <div id="iot-img">
                <Image width={"100%"} src="./images/iot_img/iot_img.png" />
              </div>
            </div>
            <div id="iot-introduce-right">
              <p id="iot-p">
                당신의 움직임을 iot 센서가 감지하여
                <br />
                정각마다 1시간 동안의 움직임 정보를
                <br />
                인공지능 서버에 전달합니다.
              </p>
              <p id="iot-p">
                인공지능 서버에서는 받아온 정보를 토대로
                <br />
                이상 탐지를 시행합니다.
              </p>
              <p id="iot-p">
                움직임 정보에 이상이 탐지되면
                <br />
                iot에서 사이렌이 울립니다.
              </p>
            </div>
          </div>
          <div id="iot-button">
            {iot ? (
              <Button type="danger" onClick={() => iotCancelBtn()} size="large">
                <span>취소하기</span>
              </Button>
            ) : (
              <Button type="primary" onClick={() => iotApplyBtn()} size="large">
                <span>신청하기</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IotApplyPage;

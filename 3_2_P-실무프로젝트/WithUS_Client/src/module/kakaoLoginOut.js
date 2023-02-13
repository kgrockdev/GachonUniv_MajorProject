import React from "react";
import { signUp } from "../API/signUp";

const { Kakao } = window;

// Login With KAKAO
const loginWithKakao = () => {
  try {
    return new Promise((resolve, reject) => {
      if (!Kakao) {
        reject("KAKAO 인스턴스를 찾을 수 없습니다.");
      }
      Kakao.Auth.login({
        success: (auth) => {
          sessionStorage.setItem("user", JSON.stringify(auth));
          signUp()
            .then((res) => {
              console.log(res);
              window.history.go(0);
            })
            .catch((err) => console.error(err));
        },
        fail: (error) => {
          console.error(error);
        },
      });
    });
  } catch (err) {
    console.error(err);
  }
};

const KakaoLogin = () => {
  // 비 로그인 상태에서 로그인 버튼을 클릭시 표시될 로고 스타일
  let login_view_logoStyle = {
    display: "block",
    margin: "0px auto",
  };

  return (
    <div>
      <a href="#!" id="custom-login-btn" onClick={loginWithKakao}>
        <img
          alt={"kakao"}
          src="./images/snsLogin/kakao.png"
          width="300px"
          height="70px"
          style={login_view_logoStyle}
        />
      </a>
    </div>
  );
};

// Logout With KAKAO
const KakaoLogout = () => {
  try {
    return new Promise((resolve, reject) => {
      if (!Kakao) {
        reject("KAKAO 인스턴스를 찾을 수 없습니다.");
      }
      Kakao.Auth.logout(() => {
        sessionStorage.clear();
        window.location.href = "/";
      });
    });
  } catch (err) {
    console.error(err);
  }
};

export { KakaoLogin, KakaoLogout };

import { KakaoLogout } from "./kakaoLoginOut";

const { Kakao } = window;

const kakaoIsLogin = () => {
  return new Promise(function (resolve, reject) {
    Kakao.API.request({
      url: "/v2/user/me",
      success: function (response) {
        // 서버에 저장할 항목
        console.log(response);
        // 프로필 사진
        sessionStorage.setItem(
          "profileImg",
          response["kakao_account"]["profile"]["profile_image_url"]
        );
        // 이메일
        sessionStorage.setItem("email", response["kakao_account"]["email"]);
        // 이름
        sessionStorage.setItem("name", response["properties"]["nickname"]);
        sessionStorage.setItem("auth", "kakao");
        resolve(true);
      },
      fail: function (error) {
        console.error(error);
        KakaoLogout();
        resolve(false);
      },
    });
  });
};

export { kakaoIsLogin };

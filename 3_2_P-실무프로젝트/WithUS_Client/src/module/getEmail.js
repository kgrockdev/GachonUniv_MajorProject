import SyncRequest from "sync-request";

const getEmailKakao = () => {
  const { Kakao } = window;

  return new Promise(function (resolve, reject) {
    Kakao.API.request({
      url: "/v2/user/me",
      success: function (response) {
        // 이메일
        resolve(response["kakao_account"]["email"]);
      },
      fail: function (error) {
        reject(error);
      },
    });
  });
};

const getEmailGoogle = () => {
  return new Promise(function (resolve, reject) {
    var res = SyncRequest(
      "POST",
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${
        JSON.parse(sessionStorage.getItem("user"))["accessToken"]
      }`
    );

    if (res.statusCode === 200) {
      console.log(res);
      // 이메일
      resolve(JSON.parse(res["body"])["email"]);
    } else {
      reject(res);
    }
  });
};

const getEmail = () => {
  const { Kakao } = window;

  return new Promise(function (resolve, reject) {
    if (Kakao.Auth.getAccessToken()) {
      getEmailKakao().then((res) => {
        resolve(res);
      });
    } else if (JSON.parse(sessionStorage.getItem("user"))) {
      getEmailGoogle().then((res) => {
        resolve(res);
      });
    } else {
      reject(false);
    }
  });
};

export { getEmail };

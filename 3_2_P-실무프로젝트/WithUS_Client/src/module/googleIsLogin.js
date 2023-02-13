import SyncRequest from "sync-request";

const googleIsLogin = () => {
  return new Promise(function (resolve, reject) {
    var res = SyncRequest(
      "POST",
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${
        JSON.parse(sessionStorage.getItem("user"))["accessToken"]
      }`
    );

    if (res.statusCode === 200) {
      // 서버에 저장할 항목
      console.log(res);
      // 프로필 사진
      sessionStorage.setItem("profileImg", JSON.parse(res["body"])["picture"]);
      // 이메일
      sessionStorage.setItem("email", JSON.parse(res["body"])["email"]);
      // 이름
      sessionStorage.setItem("name", JSON.parse(res["body"])["name"]);
      sessionStorage.setItem("auth", "google");
      resolve(true);
    } else {
      sessionStorage.clear();
      localStorage.clear();
      resolve(false);
    }
  });
};

export { googleIsLogin };

import axios from "axios";
import { googleIsLogin } from "./googleIsLogin";
import { kakaoIsLogin } from "./kakaoIsLogin";
import { requireFieldCheck } from "../API/requireFieldCheckAPI";

function matchingUser(bId, ndId, gvId, cls) {
  const { Kakao } = window;
  console.log(ndId, gvId);

  if (cls !== 1) {
    alert("현재 모집 중인 요청이 아닙니다!");
    return;
  }

  if (Kakao.Auth.getAccessToken()) {
    kakaoIsLogin()
      .then()
      .catch((err) => {
        alert("인증 정보가 유효하지 않습니다!");
        window.history.go(0);
        return;
      });
  } else if (JSON.parse(sessionStorage.getItem("user"))) {
    googleIsLogin()
      .then()
      .catch((err) => {
        alert("인증 정보가 유효하지 않습니다!");
        window.history.go(0);
        return;
      });
  } else {
    alert("로그인이 되어있지 않습니다!");
    window.history.go(0);
    return;
  }

  // 사이트를 이용하기 위한 필수 Field들이 서버에 있는지 체크
  requireFieldCheck(sessionStorage.getItem("email"))
    .then((res) => {
      if (res === true) {
        if (ndId === gvId) {
          alert("자기 자신에게는 도움을 줄 수 없습니다.");
          return;
        } else {
          axios
            .post(`${process.env.REACT_APP_Backend_Server}ndhelp/match`, {
              board_id: bId,
              board_gvid: gvId,
            })
            .then(function (result) {
              alert("지원에 성공하였습니다.");
              window.history.go(0);
              console.log(result);
            })
            .catch(function (error) {
              alert("지원에 실패하였습니다.");
              alert(error);
              console.error(error);
            });
        }
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

export default matchingUser;

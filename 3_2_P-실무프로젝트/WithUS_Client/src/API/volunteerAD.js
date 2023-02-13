import axios from "axios";

function volunteerAccept(bId) {
  axios
    .post(`${process.env.REACT_APP_Backend_Server}ndhelp/accept`, {
      board_id: bId,
    })
    .then(function (result) {
      console.log(result);
      alert("매칭에 성공하였습니다!");
      window.history.go(0);
      return;
    })
    .catch(function (error) {
      console.error(error);
      alert("오류가 발생하여 수락에 실패하였습니다.");
      return;
    });
}

function volunteerDeny(bId) {
  axios
    .post(`${process.env.REACT_APP_Backend_Server}ndhelp/deny`, {
      board_id: bId,
    })
    .then(function (result) {
      console.log(result);
      alert("지원자 거절에 성공하였습니다!");
      window.history.go(0);
      return;
    })
    .catch(function (error) {
      console.error(error);
      alert("오류가 발생하여 거절에 실패하였습니다.");
      return;
    });
}

export { volunteerAccept, volunteerDeny };

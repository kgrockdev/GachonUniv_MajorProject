import axios from "axios";
import { getEmail } from "../module/getEmail";
require("dotenv");

const signUp = () => {
  return new Promise(function (resolve, reject) {
    getEmail().then((email) => {
      axios
        .post(`${process.env.REACT_APP_Backend_Server_User}api/user/save`, {
          email,
          name: "",
          birth: "nu ll 00 0000",
          lat: "",
          lng: "",
          addr: "",
          region1Depth: "",
          region2Depth: "",
          sex: "",
        })
        .then(function (result) {
          // 결과의 포스트 리스트를 추출할 수 있는 변수
          console.log(result);
          resolve(result);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  });
};

export { signUp };

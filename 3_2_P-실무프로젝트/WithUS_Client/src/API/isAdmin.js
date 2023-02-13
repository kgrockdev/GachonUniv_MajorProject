import axios from "axios";
require("dotenv");

const isAdmin = (userEmail) => {
  return new Promise(function (resolve, reject) {
    axios
      .get(
        `${process.env.REACT_APP_Backend_Server_User}api/user/role/${userEmail}`
      )
      .then(function (result) {
        if (result.data === true) {
          resolve(true);
        } else if (result.data === false) {
          resolve(false);
        } else {
          reject(result);
        }
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

export { isAdmin };

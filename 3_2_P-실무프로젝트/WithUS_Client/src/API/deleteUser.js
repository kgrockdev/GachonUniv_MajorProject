import axios from "axios";
require("dotenv");

const deleteUser = (userEmail) => {
  return new Promise(function (resolve, reject) {
    axios
      .put(
        `${process.env.REACT_APP_Backend_Server_User}api/user/delete/${userEmail}`
      )
      .then(function (result) {
        resolve(result);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

export { deleteUser };

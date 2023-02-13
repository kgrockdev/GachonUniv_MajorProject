import SyncRequest from "sync-request";
require("dotenv");

const requireFieldCheck = (email) => {
  return new Promise(function (resolve, reject) {
    var res = SyncRequest(
      "GET",
      `${process.env.REACT_APP_Backend_Server_User}api/user/${email}`
    );

    console.log(res);

    if (res.statusCode === 200) {
      resolve(true);
    } else if (res.statusCode === 400) {
      resolve(false);
    } else {
      reject(res);
    }
  });
};

export { requireFieldCheck };

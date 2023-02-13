import "./index.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
var parse = require("url-parse");

function IotViewPage() {
  var [img, setImg] = useState("");

  useEffect(function () {
    console.log(parse(document.location.href).query.split("=")[1]);
    axios
      .post(`https://withus.p-e.kr:5000/info`, {
        user_email: parse(document.location.href).query.split("=")[1],
      })
      .then(function (res) {
        console.log(res.data);
        setImg(res.data);
      })
      .catch(function (error) {
        alert("해당 유저의 IOT 데이터가 없습니다. 이전 페이지로 돌아갑니다!");
        window.history.go(-1);
      });
  }, []);

  return (
    <div className="screen-share">
      <img src={`data:image/png;base64,${img}`} alt="Image Loading..." />
    </div>
  );
}

export default IotViewPage;

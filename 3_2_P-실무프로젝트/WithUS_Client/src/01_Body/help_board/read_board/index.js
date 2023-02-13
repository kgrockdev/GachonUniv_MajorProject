// http://localhost:3000/read?id=17

import "./index.css";
import axios from "axios";
import SyncRequest from "sync-request";
import React, { useEffect, useState } from "react";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";
import matchingUser from "../../../module/matchingUser";
import { Button, Avatar, Image, Dropdown, Menu, Breadcrumb } from "antd";
import { MoreOutlined } from "@ant-design/icons";
var parse = require("url-parse");

function IndexPage() {
  const [postDetail, setPostDetail] = useState({});

  useEffect(function () {
    axios
      .get(
        `${process.env.REACT_APP_Backend_Server}ndhelp/detail?board_id=${
          parse(document.location.href).query.split("=")[1]
        }`
      )
      .then(function (res) {
        setPostDetail(res.data.board);
      })
      .catch(function (error) {
        console.log(error);
        alert("잘못된 페이지입니다. 메인으로 이동합니다.");
      });
  }, []);

  function NaverMapAPI() {
    const navermaps = window.naver.maps;

    return (
      <NaverMap
        mapDivId={"maps-getting-started-uncontrolled"} // default: react-naver-map
        style={{
          width: "100%", // 네이버지도 가로 길이
          height: "300px", // 네이버지도 세로 길이
        }}
        defaultCenter={{
          lat: parseFloat(postDetail.board_lat),
          lng: parseFloat(postDetail.board_lng),
        }} // 도움 요청자가 지정한 위치
        defaultZoom={13} // 지도 초기 확대 배율
      >
        {[postDetail].map(function (mapData, index) {
          return (
            <Marker
              key={index}
              position={navermaps.LatLng(mapData.board_lat, mapData.board_lng)}
              animation={1}
            />
          );
        })}
      </NaverMap>
    );
  }

  function modifyPost() {
    if (postDetail.board_ndid === sessionStorage.getItem("email")) {
      if (postDetail.board_close === 1) {
        // 자신의 정보를 서버에서 불러옴
        var res = SyncRequest(
          "GET",
          `${process.env.REACT_APP_Backend_Server}ndhelp/detail?board_id=${
            parse(document.location.href).query.split("=")[1]
          }`
        );

        if (res.statusCode === 200) {
          sessionStorage.setItem("post", res.body);
          window.location.href = `/modify?id=${
            parse(document.location.href).query.split("=")[1]
          }`;
        } else {
          console.error(res);
        }
      } else {
        alert("이미 모집이 완료된 게시글은 수정할 수 없습니다.");
      }
    } else {
      alert("본인이 작성한 게시글만 수정이 가능합니다");
    }
  }

  function deletePost() {
    console.log(postDetail);

    if (postDetail.board_ndid === sessionStorage.getItem("email")) {
      if (postDetail.board_close === 1) {
        axios
          .post(`${process.env.REACT_APP_Backend_Server}ndhelp/delete`, {
            board_id: parse(document.location.href).query.split("=")[1],
          })
          .then(function (res) {
            alert("게시글이 정상적으로 삭제되었습니다.");
            window.location.href = "/";
            return;
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        alert("이미 모집이 완료된 게시글은 삭제할 수 없습니다.");
      }
    } else {
      alert("본인이 작성한 게시글만 삭제가 가능합니다");
    }
  }

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={modifyPost}>
        글 수정하기
      </Menu.Item>
      <Menu.Item key="2" onClick={deletePost}>
        글 삭제하기
      </Menu.Item>
    </Menu>
  );

  function PostDetail() {
    return (
      <div>
        <table id="post-detail-table">
          <tbody>
            <tr>
              <td colSpan="2" id="post-detail-table-breadcrumb">
                <Breadcrumb separator=">">
                  <Breadcrumb.Item
                    className={
                      parse()["pathname"] === "/ndhelp" ? "active" : ""
                    }
                    href="/ndhelp"
                  >
                    도움 요청 게시판
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="#">
                    {postDetail.board_category}
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>{postDetail.board_title}</Breadcrumb.Item>
                </Breadcrumb>
              </td>
              <td rowSpan="4" id="post-detail-table-map">
                <RenderAfterNavermapsLoaded
                  ncpClientId={process.env.REACT_APP_Naver_API_KEY} // 자신의 네이버 계정에서 발급받은 Client ID
                  error={<p>Maps Load Error</p>}
                  loading={<p>Maps Loading...</p>}
                >
                  <NaverMapAPI />
                </RenderAfterNavermapsLoaded>
                <br />
                {postDetail.board_start_date} ~ {postDetail.board_end_date}
                <Button
                  onClick={() => {
                    matchingUser(
                      postDetail.board_id,
                      postDetail.board_ndid,
                      sessionStorage.getItem("email"),
                      postDetail.board_close
                    );
                  }}
                  size="middle"
                  style={{ marginTop: "10px" }}
                >
                  <span>봉사 신청하기</span>
                </Button>
              </td>
            </tr>
            <tr>
              <td id="post-detail-table-header-left">
                <Avatar
                  style={{ marginRight: "15px" }}
                  src={
                    <Image
                      src="https://joeschmoe.io/api/v1/random"
                      style={{ width: 32 }}
                    />
                  }
                />
                {postDetail.board_writer}
              </td>
              <td id="post-detail-table-header-right">
                {postDetail.createdAt}
                <Dropdown overlay={menu} placement="bottomRight">
                  <a
                    href={() => false}
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <MoreOutlined
                      style={{
                        marginLeft: "15px",
                        fontSize: "22px",
                        fontWeight: "bolder",
                      }}
                    />
                  </a>
                </Dropdown>
              </td>
            </tr>
            <tr>
              <td colSpan="2" id="post-detail-table-title">
                {postDetail.board_title}
              </td>
            </tr>
            <tr>
              <td rowSpan="2" colSpan="2" id="post-detail-table-content">
                {postDetail.board_content}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div id="read_board-back-color">
      {/* <!-- container --> */}
      <div className="container">
        <div className="read_board-wrapper">
          <div id="read_board-layout">
            <PostDetail />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndexPage;

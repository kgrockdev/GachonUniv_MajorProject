import axios from "axios";
import React, { useState, useEffect } from "react";
import getLocation from "../../module/geolocation";
import { Drawer, Descriptions, Badge, Button } from "antd";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";
import matchingUser from "../../module/matchingUser";

// 전역으로 State 관리
var visible, setVisible;
var addr, setAddr;
var title, setTitle;
var startDate, setStartDate;
var endDate, setEndDate;
var category, setCategory;
var id, setId;
var cls, setCls;
var ndId, setNdId;

function NaverMapAPI() {
  // 서버에서 게시글 목록을 받아오는 비동기 useEffect 구문
  const [mapList, setMapList] = useState({ user: [] });
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  useEffect(function () {
    getLocation().then((res) => {
      setLat(res.latitude);
      setLng(res.longitude);
    });
    axios
      .get(`${process.env.REACT_APP_Backend_Server}gvhelp`)
      .then(function (result) {
        console.log(result);
        setMapList(result.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const navermaps = window.naver.maps;

  return (
    <NaverMap
      mapDivId={"maps-getting-started-uncontrolled"} // default: react-naver-map
      style={{
        width: "100%", // 네이버지도 가로 길이
        height: "85vh", // 네이버지도 세로 길이
      }}
      defaultCenter={{
        lat: 37.450387263909235,
        lng: 127.12967852927379,
      }} // 지도 초기 위치
      center={{ lat, lng }}
      defaultZoom={13} // 지도 초기 확대 배율
    >
      {mapList.user.map(function (mapData, index) {
        return (
          <Marker
            key={index}
            position={navermaps.LatLng(mapData.board_lat, mapData.board_lng)}
            // 0 움직임 X (종료), 1 통통튀기 (모집중), 2 내려찍기 (매칭중)
            animation={
              mapData.board_close === 1 ? 1 : mapData.board_close === 2 ? 2 : 0
            }
            onClick={() => {
              setId(mapData.board_id);
              setNdId(mapData.board_ndid);
              setVisible(true);
              setAddr(mapData.board_addr);
              setTitle(mapData.board_title);
              setCategory(mapData.board_category);
              setStartDate(mapData.board_start_date);
              setEndDate(mapData.board_end_date);
              setCls(mapData.board_close);
            }}
          />
        );
      })}
    </NaverMap>
  );
}

function GVHelpPage() {
  // 전역으로 State 관리
  [id, setId] = useState("");
  [ndId, setNdId] = useState("");
  [visible, setVisible] = useState(false);
  [addr, setAddr] = useState("");
  [title, setTitle] = useState("");
  [category, setCategory] = useState("");
  [startDate, setStartDate] = useState("");
  [endDate, setEndDate] = useState("");
  [cls, setCls] = useState("");

  // Drawer창의 Btn Click Event
  const onReadPostBtn = () => {
    window.location.href = `/read?id=${id}`;
  };

  const onApplyBtn = () => {
    matchingUser(id, ndId, sessionStorage.getItem("email"), cls);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="container">
      <Drawer
        placement={"right"}
        width={500}
        onClose={onClose}
        visible={visible}
      >
        <Descriptions title="상세 정보" layout="vertical" bordered>
          <Descriptions.Item label="상세 주소" span={3}>
            {addr}
          </Descriptions.Item>
          <Descriptions.Item label="제목" span={3}>
            {title}
          </Descriptions.Item>
          <Descriptions.Item label="카테고리" style={{ width: "33%" }}>
            {category}
          </Descriptions.Item>
          <Descriptions.Item label="시작 일시" style={{ width: "33%" }}>
            {startDate}
          </Descriptions.Item>
          <Descriptions.Item label="종료 일시" style={{ width: "33%" }}>
            {endDate}
          </Descriptions.Item>
          <Descriptions.Item label="상태">
            {cls === 1 ? (
              <Badge status="success" text="모집중" />
            ) : cls === 2 ? (
              <Badge status="processing" text="매칭중" />
            ) : (
              <Badge status="error" text="종료" />
            )}
          </Descriptions.Item>
        </Descriptions>

        {cls === 1 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "20px",
            }}
          >
            <Button size="large" onClick={onReadPostBtn}>
              게시글로
            </Button>
            <Button type="primary" size="large" onClick={onApplyBtn}>
              지원하기
            </Button>
          </div>
        ) : (
          <div></div>
        )}
      </Drawer>
      <RenderAfterNavermapsLoaded
        ncpClientId={process.env.REACT_APP_Naver_API_KEY} // 자신의 네이버 계정에서 발급받은 Client ID
        error={<p>Maps Load Error</p>}
        loading={<p>Maps Loading...</p>}
      >
        <NaverMapAPI />
      </RenderAfterNavermapsLoaded>
    </div>
  );
}

export default GVHelpPage;

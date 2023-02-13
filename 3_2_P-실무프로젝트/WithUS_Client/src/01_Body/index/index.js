import "./index.css";
import React from "react";
import { Link } from "react-router-dom";
import matchingUser from "../../module/matchingUser";
import axios from "axios";
import { Carousel } from "antd";
import { Card, Avatar } from "antd";
import { CheckOutlined, ReadOutlined } from "@ant-design/icons";
require("dotenv");
const { Meta } = Card;

function IndexPage() {
  const contentStyle = {
    height: "240px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  // 서버에서 게시글 목록을 받아오는 비동기 useEffect 구문
  const [postList, setPostList] = React.useState({ user: [] });
  React.useEffect(function () {
    axios
      .get(`${process.env.REACT_APP_Backend_Server}index`)
      .then(function (result) {
        // 결과의 포스트 리스트를 추출할 수 있는 변수
        setPostList(result.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {/* <!-- container --> */}
      <div className="container">
        <div id="carousel">
          <Carousel autoplay>
            <img
              src={
                process.env.PUBLIC_URL + "/images/banners/slider_give_board.png"
              }
            />
            <img
              src={
                process.env.PUBLIC_URL + "/images/banners/slider_help_board.png"
              }
            />
            <img
              src={
                process.env.PUBLIC_URL + "/images/banners/slider_iot_apply.png"
              }
            />
          </Carousel>
        </div>
        <div id="help-card">
          <div id="help-card-title">도움이 필요해요!</div>
          <div className="site-card-wrapper">
            {/* API URL에서 받은 데이터 부분으로 바꿔야 함 (CG) */}
            {postList.user.slice(0, 6).map(function (post, index) {
              return (
                <Card
                  key={index}
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                  actions={[
                    <Link to={`/read?id=${post.board_id}`}>
                      <ReadOutlined key="read" />
                    </Link>,
                    <CheckOutlined
                      onClick={() => {
                        matchingUser(
                          post.board_id,
                          post.board_ndid,
                          sessionStorage.getItem("email"),
                          post.board_close
                        );
                      }}
                      key="check"
                    />,
                  ]}
                  style={{
                    width: "30%",
                    display: "inline-block",
                    margin: "10px",
                  }}
                >
                  <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={post.board_title}
                    description={post.board_writer}
                  />
                </Card>
              );
            })}
          </div>
        </div>
        <div id="banner">
          {/* <!-- 우울증 극복 프로그램 연결 --> */}
          <div id="footer-banner" className="section">
            {/* <!-- container --> */}
            <div className="container">
              {/* <!-- row --> */}
              <div className="row">
                <div className="col-md-12">
                  <div className="footer-banner-content">
                    <h2 className="banner-txt1">
                      요즘 축축 처지고 의욕이 없어..
                    </h2>
                    <p className="banner-txt2">우울증이 의심되나요?</p>
                    <a
                      className="primary-btn cta-btn"
                      href="https://www.cyber1388.kr:447/"
                    >
                      사이버 상담센터 바로가기
                    </a>
                  </div>
                </div>
              </div>
              {/* <!-- /row --> */}
            </div>
            {/* <!-- /container --> */}
          </div>
          {/* <!-- /우울증 극복 프로그램 연결 --> */}
        </div>
      </div>
    </div>
  );
}

export default IndexPage;

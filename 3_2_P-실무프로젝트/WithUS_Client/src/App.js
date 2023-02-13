import "./App.css";
import "antd/dist/antd.css";
import Header from "./00_Header/header/index";
import Navigation from "./00_Header/navigation/index";
import IndexPage from "./01_Body/index/index";
import MyPage from "./01_Body/mypage/index";
import GVHelpPage from "./01_Body/give_board/index";
import HelpBoardPage from "./01_Body/help_board/index";
import WritePage from "./01_Body/help_board/write_board/index";
import ReadPage from "./01_Body/help_board/read_board/index";
import ModifyPage from "./01_Body/help_board/modify_board/index";
import IotApplyPage from "./01_Body/iot_apply/index";
import IotApplyFieldPage from "./01_Body/iot_apply/iot_apply_field/index";
import IotViewPage from "./01_Body/iot_view/index";
import RequireBoardPage from "./01_Body/require_board/index";
import ManagePage from "./01_Body/manage_board/index";
import Footer from "./02_Footer/footer/index";
import KoChatBot from "./03_Bot/KoChatBot/index";
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Affix, Button, Popover } from "antd";

function App() {
  const [bot, setBot] = useState(false);

  return (
    <div>
      <div id="header">
        {/* 헤더 (사이트 로고, 로그인) */}
        <Header />
      </div>
      <div id="navigation">
        {/* 메뉴 (도움요청 게시판, 헬프맵, iot 신청, 마이페이지) */}
        <Navigation />
      </div>
      <div id="body">
        <Switch>
          {/* 메인 페이지 */}
          <Route exact path={"/"}>
            <IndexPage />
          </Route>
          {/* 필수 정보 요구 페이지 */}
          <Route exact path={"/require"}>
            <RequireBoardPage />
          </Route>
          {/* 마이 페이지 */}
          <Route exact path={"/mypage"}>
            <MyPage />
          </Route>
          {/* 도움 요청 게시판 글쓰기 */}
          <Route exact path={"/write"}>
            <WritePage />
          </Route>
          {/* 도움 요청 게시판 글읽기 */}
          <Route exact path={"/read"}>
            <ReadPage />
          </Route>
          {/* 도움 요청 게시판 글읽기 */}
          <Route exact path={"/modify"}>
            <ModifyPage />
          </Route>
          {/* 도움 요청 게시판 */}
          <Route exact path={"/ndhelp"}>
            <HelpBoardPage />
          </Route>
          {/* 도움 주기 게시판 */}
          <Route exact path={"/gvhelp"}>
            <GVHelpPage />
          </Route>
          {/* iot 신청 */}
          <Route exact path={"/apply"}>
            <IotApplyPage />
          </Route>
          {/* iot 신청 주소 입력 */}
          <Route exact path={"/applyField"}>
            <IotApplyFieldPage />
          </Route>
          {/* iot 시각화 페이지 */}
          <Route exact path={"/iotview"}>
            <IotViewPage />
          </Route>
          {/* 회원 관리 페이지 */}
          <Route exact path={"/mngmember"}>
            <ManagePage />
          </Route>
        </Switch>
      </div>
      <Affix offsetBottom={10} style={{ position: "absolute", right: 10 }}>
        <Popover
          placement="topRight"
          trigger="click"
          content={
            <div style={{ width: "450px", height: "500px" }}>
              <KoChatBot />
            </div>
          }
        >
          <Button
            type="primary"
            onClick={() => {
              if (bot === false) {
                window.greet();
                setBot(true);
              }
            }}
          >
            TALKBOT
          </Button>
        </Popover>
      </Affix>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;

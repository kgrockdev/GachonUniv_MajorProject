import "./index.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Spin, Modal, Row, Col, Descriptions, Tree, Progress } from "antd";
import { API_URL } from "../config/constants.js";

var globalPredict, globalConv; // 서버에서 받아온 값 활용할 수 있는 Global 변수

// DB 연동해서 SNS ID / 세션키 값으로 DB 생성
// 매번 실행할때마다 DB 갱신
function ResultPage() {
  let history = useHistory();
  const { DirectoryTree } = Tree;

  const [treeNode, setTree] = useState([
    {
      title: "parent 1",
      key: "0-0",
      children: [
        {
          title: "parent 1-0",
          key: "0-0-0",
          children: [],
        },
      ],
    },
  ]);

  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("ID_PLACEHOLDER");
  const [nickname, setNickname] = useState("NICKNAME_PLACEHOLDER");
  const [date, setDate] = useState("DATE_PLACEHOLDER");
  const [day, setDay] = useState("DAY_PLACEHOLDER");
  const [content, setContent] = useState("CONTENT_PLACEHOLDER");
  const [percent, setPercent] = useState("0");

  const setTreeNode = (data, conv) => {
    var pKey = 0;
    const myTreeNode = new Array();

    for (var i in data) {
      var cKey = 0;
      const childNode = new Array();

      for (var j in conv["userConv"][i]) {
        childNode.push({
          title: j,
          key: `0-0-${pKey}-${cKey}`,
        });
        cKey++;
      }

      myTreeNode.push({
        title: i,
        key: `0-0-${pKey}`,
        children: [...childNode],
      });
      pKey++;
    }
    setTree(myTreeNode);
  };

  // 트리 목록 구성
  const treeData = treeNode;

  // Tree 구조 Select와 Expend 이벤트 처리
  const onSelect = (keys, info) => {
    var key = keys[0].split("-");
    var dates = info["node"]["title"].split(".");
    var date = dates[0] + "." + dates[1];
    var pct = globalPredict[date][0][key[3]] * 100;
    if (key.length == 3) {
      console.log("a");
      setId(globalConv["userID"]);
      setNickname(globalConv["userNickName"]);
      setDate(info["node"]["title"]);
      setDay("-");
      setContent("-");

      var len = info["node"]["children"].length;
      var pctMon = 0;
      for (var i = 0; i < len; i++) {
        pctMon += globalPredict[info["node"]["title"]][0][i] * 100;
      }
      pctMon = pctMon / len;
      setPercent(pctMon.toFixed(2));
    } else {
      setId(globalConv["userID"]);
      setNickname(globalConv["userNickName"]);
      setDate(date);
      setDay(info["node"]["title"]);
      setContent(globalConv["userConv"][date][info["node"]["title"]]);
      setPercent(pct.toFixed(2));
    }
  };
  const onExpand = () => {
    console.log("Trigger Expand");
  };

  React.useEffect(() => {
    axios
      .post(`${API_URL}/result`, {
        SNS: window.sessionStorage.getItem("SNS"),
        account: window.sessionStorage.getItem("account"),
        auth: window.sessionStorage.getItem("auth"),
      })
      .then((result) => {
        const { Code, Title, Message } = result.data;
        if (Code === (1, 2)) {
          // 방어코드 응답
          Modal.error({
            title: Title,
            content: Message,
          });
          window.sessionStorage.clear();
          history.push("/");
        } else {
          const { predict, conv } = result.data;
          setLoading(null);
          setTreeNode(predict, conv);
          globalPredict = predict;
          globalConv = conv;
        }
      })
      .catch((error) => {
        Modal.error({
          title: "ERROR",
          content: "예상하지 못한 에러가 발생하였습니다." + error,
        });
        window.sessionStorage.clear();
        history.push("/");
      });
  }, []);

  return (
    <div id="container">
      <Spin tip="Loading..." size="large" spinning={loading}>
        {/* 만약 정상적인 경로로 접근하지 않았다면 "올바르지 않은 접근입니다." 메세지 출력 후 root 페이지로 이동 */}
        {/* Server에서 Response 하는 것 응답 대기 */}

        {/* Response가 왔다면 출력 */}

        {/* 디스플레이 화면 구상 */}
        <Row justify="start">
          <Col span={4}>
            <DirectoryTree
              multiple
              defaultExpandAll
              onSelect={onSelect}
              onExpand={onExpand}
              treeData={treeData}
            />
          </Col>
          <Col span={18}>
            <Descriptions title="User Info" bordered>
              <Descriptions.Item label="사용자 아이디" span={1}>
                {id}
              </Descriptions.Item>
              <Descriptions.Item label="닉네임" span={2}>
                {nickname}
              </Descriptions.Item>
              <Descriptions.Item label="작성 날짜">{date}</Descriptions.Item>
              <Descriptions.Item label="작성 시간" span={2}>
                {day}
              </Descriptions.Item>
              <Descriptions.Item label="작성 내용" span={3}>
                {content}
              </Descriptions.Item>
              <Descriptions.Item label="감정 그래프" span={3}>
                <Progress
                  percent={percent}
                  status="active"
                  strokeColor="#81c147"
                  trailColor="#ff095a"
                />
              </Descriptions.Item>
              <Descriptions.Item label="결과" span={3}>
                {percent} % 확률로 긍정적인 내용입니다.
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Spin>
    </div>
  );
}

export default ResultPage;

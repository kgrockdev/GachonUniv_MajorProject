import { Pagination, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./boardList.scss";
import moment from "moment";

const Board = ({ category, board_id, title, username, date }) => {
  const navigate = useNavigate();
  return (
    <tr
      className="pinkline"
      onClick={() => {
        navigate(`/board/${board_id}`);
      }}
    >
      <td style={{ textAlign: "center", padding: "10px" }}>{board_id}</td>
      <td style={{ textAlign: "center" }}>{category}</td>
      <td>{title}</td>
      <td>{username}</td>
      <td>{date}</td>
    </tr>
  );
};

const BoardList = () => {
  const [pageCount, setPageCount] = useState(0);
  const [boardList, setBoardList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {  
    const getBoardList = async () => {
      const page_number = searchParams.get("page");
      const { data } = await axios.get(
        `${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/board/list?page_number=${Number(page_number)}`, {headers:{"ngrok-skip-browser-warning": "69420"}}
      );
      console.log(data);
      return data;
    };
    getBoardList().then((result) => setBoardList(result));
    const getTotalBoard = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/board/count`, {headers:{"ngrok-skip-browser-warning": "69420"}}
      );
      return Number(data.total);
    };
    getTotalBoard().then((result) => setPageCount(Math.ceil(result / 10)));
  }, []);

  const clickMe = () => {
    window.location.assign("board/add/");
  };
  //
  return (
    <div className="boardList-wrapper">
      <div className="boardList-header"></div>
      <div className="boardList-body">
        <table className="boardtable">
          <thead style={{ backgroundColor: "pink", color: "white" }}>
            <tr>
              <th style={{ width: "5%" }}>번호</th>
              <th style={{ width: "5%" }}>분류</th>
              <th style={{ width: "40%" }}>제목</th>
              <th style={{ width: "20%" }}>작성자</th>
              <th style={{ width: "10%" }}>작성일</th>
            </tr>
          </thead>
          <tbody>
          {boardList.map((item, index) => (
              <Board
                key={item.id}
                username={item.member.username}
                date={moment(item.created).format("YY/MM/DD HH:mm")}
                title={item.title}
                board_id={item.id}
                category={item.category}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="button">
        <Button onClick={clickMe} variant="outlined">
          글쓰기
        </Button>
      </div>
      <div className="boardList-footer">
        <Pagination
          shape="rounded"
          variant="outlined"
          color="secondary"
          page={Number(searchParams.get("page"))}
          count={pageCount}
          size="large"
          onChange={(e, value) => {
            window.location.href = `/board?page=${value}`;
          }}
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
};
export default BoardList;

import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { jwtUtils } from "module/utils/jwtUtils";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./MyPage.scss";
import moment from "moment";
import Calendar from 'react-calendar';

const Board = ({ category, board_id, title, date }) => {
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
      <td>{date}</td>
    </tr>
  );
};


const MyBoardList = () => {
  const [pageCount, setPageCount] = useState(0);
  const [boardList, setBoardList] = useState([]);
  const [memberInfo, setMemberInfo] = useState({});
  const [myData, setMyData] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, onChange] = useState(new Date());

  const [mark, setMark] = useState([]);
  const [mark2, setMark2] = useState([]);

  const token = useSelector((state) => state.Auth.token);

  useEffect(() => {

    const getMark = async () => {
      const member_id = jwtUtils.getId(token);
      const {data} = await axios.get(
        `${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/moreFour/${member_id}` , {headers:{"ngrok-skip-browser-warning": "69420"}}
      );
        return data;
    }
    getMark().then((result)=>setMark(result));

    const getMark2 = async () => {
      const member_id = jwtUtils.getId(token);
      const {data} = await axios.get(
        `${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/lessFour/${member_id}` , {headers:{"ngrok-skip-browser-warning": "69420"}}
      );
        return data;
    }
    getMark2().then((result)=>setMark2(result));

    const getMemberInfo = async () => {
      const member_id = jwtUtils.getId(token);
      const { data } = await axios.get(
        `${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/user/${member_id}` , {headers:{"ngrok-skip-browser-warning": "69420"}}
      );
      console.log(data);
      return data;
    };
    getMemberInfo().then((result) => setMemberInfo(result));

    const getBoardList = async () => {
      const page_number = searchParams.get("page");
      const member_id = jwtUtils.getId(token);
      const { data } = await axios.get(
        `${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/board/user/list?page_number=${Number(page_number)}&member_id=${member_id}` , {headers:{"ngrok-skip-browser-warning": "69420"}}
      );
      return data;
    };
    getBoardList().then((result) => setBoardList(result));

    const getTotalBoard = async () => {
      const member_id = jwtUtils.getId(token);
      const { data } = await axios.get(`${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/board/user/count/${member_id}` , {headers:{"ngrok-skip-browser-warning": "69420"}});
      setMyData(data.total);
      return data.total;
    };

    getTotalBoard().then((result) => setPageCount(Math.ceil(result / 10)));
  }, []);

  return (
    <div className="boardList-wrapper">
      <div className="myPage-wrapper">
        <div className="blank1"></div>
        <div className="imagename">
          <div className="defaultimage">
            <img className="default" src="/icon.png" />
          </div>
          <div className="username">
            {memberInfo.username}
          </div>
        </div>
        <div className="blank2"></div>
        <div className="information">
          <br />
          email
          <div>{memberInfo.email}
          </div>
          <br />
          <br />
          <br />
          <div>내 게시글 수 : {myData}</div>
        </div>
        <div className="blank3"></div>
        <div>
          <Calendar onChange={onChange} formatDay={(locale, date) => moment(date).format("DD")} value={value} tileContent={({ date, view }) => {
    if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
      return (
       <>
         <div className="flex justify-center items-center absoluteDiv">
           <div className="dot"></div>
         </div>
       </>
     );
    }
    if (mark2.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
      return (
       <>
         <div className="flex justify-center items-center absoluteDiv">
           <div className="dot2"></div>
         </div>
       </>
     );
    }
  }}/>
        </div>
      </div>
      <div className="boardList-header"></div>
      <div className="boardList-body">
        <table className="boardtable">
          <thead style={{ backgroundColor: "pink", color: "white" }}>
            <tr>
              <th style={{ width: "5%" }}>번호</th>
              <th style={{ width: "5%" }}>분류</th>
              <th style={{ width: "40%" }}>제목</th>
              <th style={{ width: "10%" }}>작성일</th>
            </tr>
          </thead>
          <tbody>
            {boardList.map((item, index) => (
              <Board
                key={item.id}
                date={moment(item.created).format("YY/MM/DD HH:mm")}
                title={item.title}
                board_id={item.id}
                category={item.category}
              />
            ))}
          </tbody>
        </table>
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
            window.location.href = `/mypage?page=${value}`;
          }}
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
};
export default MyBoardList;

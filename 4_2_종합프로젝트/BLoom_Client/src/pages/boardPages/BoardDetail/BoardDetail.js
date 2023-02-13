import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./boardDetail.scss";
import { jwtUtils } from "module/utils/jwtUtils";
import { Button, Dialog, DialogContent, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import api from "module/utils/api";
import moment from "moment";
import Comments from "components/Comments/Comments";

const Board = () => {
  const { board_id } = useParams();
  const [board, setBoard] = useState({});
  const [myData, setMyData] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const token = useSelector((state) => state.Auth.token);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const getMyData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/comment/count?board_id=${board_id}`, {headers:{"ngrok-skip-browser-warning": "69420"}}
      );
      setMyData(data.total);
      return data.total;
    };
    const getBoard = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/board/${board_id}` , {headers:{"ngrok-skip-browser-warning": "69420"}});
      return data;
    };
    getMyData();
    getBoard()
      .then((result) => setBoard(result))
      .then(() => setIsLoaded(true));
  }, []);

  return (
    <React.Fragment>
      {isLoaded && (
        <div className="board-wrapper">
          <div className="board-header">
            <div className="board-header-title">{board.title}</div>
            <div className="board-usernamedate">
              {board.member.username +
                " | " +
                moment(board.created).add(9, "hour").format("YYYY-MM-DD")}
            </div>
            <div className="board-comments">{"댓글 : " + myData + "개"}</div>
          </div>
          <div className="board-body">
            <div className="board-title-content">
              <div className="board-content">{board.content}</div>
            </div>
          </div>
          <hr />
          <div className="board-footer">
            <Comments board_id={board_id} />
          </div>
          {token &&
          jwtUtils.getId(token) === board.member.id && (
            <div className="edit-delete-button">
              <Button
                variant="outlined"
                color="error"
                className="delete-button"
                onClick={() => {
                  setShow(true);
                }}
              >
                삭제
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  navigate(`/board/edit/${board_id}`);
                }}
              >
                수정
              </Button>
            </div>
          )}
        </div>
      )}
      {/*modal*/}
      <Dialog open={show}>
        <DialogContent style={{ position: "relative" }}>
          <IconButton
            style={{ position: "absolute", top: "0", right: "0" }}
            onClick={() => setShow(false)}
          >
            <DisabledByDefaultOutlinedIcon />
          </IconButton>
          <div className="modal">
            <div className="modal-title"> 정말 삭제하시겠습니까 ?</div>
            <div className="modal-button">
              <Button
                variant="outlined"
                color="error"
                onClick={async () => {
                  setShow(false);
                  await axios.delete(`${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/board/${board_id}`);
                  alert("게시물이 삭제되었습니다.");
                  window.location.href = "/board";
                }}
              >
                예
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setShow(false);
                }}
              >
                아니오
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
export default Board;

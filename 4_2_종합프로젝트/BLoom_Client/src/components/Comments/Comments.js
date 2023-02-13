import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import { jwtUtils } from "module/utils/jwtUtils";
import api from "module/utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./comments.scss";

const Comments = ({ board_id }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [commentList, setCommentList] = useState([]);
  const [content, setContent] = useState("");
  const token = useSelector((state) => state.Auth.token);
  const [page_number, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const getCommentList = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/comment/list?board_id=${board_id}&page_number=${page_number}`, {headers:{"ngrok-skip-browser-warning": "69420"}}
      );
      return data;
    };
    // 기존 리스트에 계속 붙이기
    getCommentList().then((result) => setCommentList([...commentList, ...result])
    );
  }, [page_number]);

  useEffect(() => {
    const getTotalBoard = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/comment/count?board_id=${board_id}`, {headers:{"ngrok-skip-browser-warning": "69420"}}
      );
      return data.total;
    };
    getTotalBoard().then((result) => setPageCount(Math.ceil(result / 5)));
  }, []);

  const submit = useCallback(async () => {
    const comment = {
      board_id: board_id,
      content: content,
      member_id: jwtUtils.getId(token),
    };
    await axios.post(`${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/comment`, comment);
    alert("댓글 등록 완료");
    window.location.reload();
  }, [content]);

  const goLogin = () => {
    setShow(false);
    navigate(`/login?redirectUrl=${location.pathname}`);
  };
  const isLogin = () => {
    if (!token) {
      setShow(true);
    }
  };

  return (
    <div className="comments-wrapper">
      <div className="comments-header">
        <TextField
          className="comments-header-textarea"
          maxRows={3}
          onClick={isLogin}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          multiline
          placeholder="댓글을 입력해주세요"
        />
        {content !== "" ? (
          <Button variant="outlined" onClick={submit}>
            등록하기
          </Button>
        ) : (
          <Button variant="outlined" disabled={true}>
            등록하기
          </Button>
        )}
      </div>
      <div className="comments-body">
        {commentList.map((item, index) => (
          <div key={index} className="comments-comment">
            <div className="comment-username-date">
              <div className="comment-date">{moment(item.created).add(9, "hour").format('YYYY-MM-DD HH:mm:ss')}</div>
            </div>
            <div className="comment-content">{item.content}</div>
            <div className="comment-username">{item.member.username}</div>
            <hr/>
          </div>
        ))}
      </div>
      {page_number < pageCount && (
        <div
          className="comments-footer"
          onClick={() => {
            setPage(page_number + 1);
          }}
        >
          댓글 더보기
          <KeyboardArrowDownIcon />
        </div>
      )}

      {/*modal*/}
      <Dialog open={show}>
        <DialogContent style={{ position: "relative" }}>
          <IconButton
            style={{ position: "absolute", top: "0", right: "0" }}
            onClick={() => {
              setShow(false);
            }}
          >
            <DisabledByDefaultOutlinedIcon />
          </IconButton>
          <div className="modal">
            <div className="modal-title">로그인이 필요합니다</div>
            <div className="modal-content">
              로그인 페이지로 이동하시겠습니까?
            </div>
            <div className="modal-button">
              <Button variant="outlined" color="error" onClick={goLogin}>
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
    </div>
  );
};
export default Comments;

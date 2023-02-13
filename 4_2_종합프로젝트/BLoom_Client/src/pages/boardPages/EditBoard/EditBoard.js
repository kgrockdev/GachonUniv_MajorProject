import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {MenuItem, Select, Button} from "@mui/material";
import "pages/boardPages/AddBoard/addBoard.scss";
import axios from "axios";

const EditBoard = () => {
  const token = useSelector((state) => state.Auth.token);
  const { board_id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const getBoard = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/board/${board_id}` , {headers:{"ngrok-skip-browser-warning": "69420"}});
      return data;
    };
    getBoard().then((result) => {
      setTitle(result.title);
      setContent(result.content);
      setCategory(result.category);
    });
  }, []);

  const canSubmit = useCallback(() => {
    return category !== "" && content !== "" && title !== "";
  }, [category, title, content]);

  const handleSubmit = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("id", board_id);
      formData.append("category", category);
      await axios.put(`${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/board`, formData);
      window.alert("수정이 완료되었습니다");
      window.location.href = `/board/${board_id}`;
    } catch (e) {
      alert("오류가 발생했습니다.", {
        position: "top-center",
      });
    }
  }, [canSubmit]);

  return (
    <div className="addBoard-wrapper">
      <div className="addBoard-header">게시물 수정하기</div>
      <div className="addBoard-body">
      <div className="textArea-wrapper">
      <input
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className="title"
        placeholder="제목을 입력하세요"
        value={title}
      />
      <Select onChange={(e) => {
          setCategory(e.target.value);
        }} value={category}>
        <MenuItem value="">카테고리</MenuItem>
        <MenuItem value="일반">일반</MenuItem>
        <MenuItem value="상담">상담</MenuItem>
      </Select>
      <textarea
        onChange={(e) => {
          setContent(e.target.value);
        }}
        className="text"
        placeholder="내용을 입력하세요"
        value={content}
      />
    </div>
      </div>
      <div className="submitButton">
        {canSubmit() ? (
          <Button
            onClick={handleSubmit}
            className="success-button"
            variant="outlined"
          >
            수정하기
          </Button>
        ) : (
          <Button className="disable-button" variant="outlined" size="large">
            제목과 카테고리, 내용을 모두 작성해주세요.
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditBoard;

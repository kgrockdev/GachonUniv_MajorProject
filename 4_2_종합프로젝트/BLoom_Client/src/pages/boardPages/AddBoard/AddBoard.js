import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import api from "module/utils/api";
import { jwtUtils } from "module/utils/jwtUtils";
import {MenuItem, Select, Button} from "@mui/material";
import "./addBoard.scss";

const AddBoard = () => {
  const token = useSelector((state) => state.Auth.token);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const canSubmit = useCallback(() => {
    return category !== "" && content !== "" && title !== "";
  }, [category, title, content]);

  const handleSubmit = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("memberId", parseInt(jwtUtils.getId(token)));

      console.log(formData);

      await api.post(
        `${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/board/write`,
        formData
      );
      window.alert("등록이 완료되었습니다");
      navigate("/board");
    } catch (e) {
      console.log(e);
      alert("오류가 발생했습니다.", {
        position: "top-center",
      });
    }
  }, [canSubmit]);

  return (
    <div className="addBoard-wrapper">
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
            등록하기
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

export default AddBoard;

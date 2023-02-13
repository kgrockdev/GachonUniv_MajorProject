import { Box } from "@mui/material";

import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtUtils } from "module/utils/jwtUtils";
import { useEffect, useState } from "react";
import { setToken } from "module/redux/reducers/AuthReducer";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.Auth.token);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (jwtUtils.isAuth(token)) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);
  // 비동기로 처리!
  const logout = async () => {
    await dispatch(setToken(""));
    alert("로그아웃 되었습니다");
    navigate("/authentication/sign-in");
  };
  return (
    <Box>
      <div className="header-wrapper">
        <div className="header-title">
          <Link to="/">
            <span>BLOOM</span>
          </Link>
        </div>
        <div className="header-menu">
          <Link to="/board">커뮤니티</Link>
          {token ? (
            <>
              <Link to="/mypage">마이페이지</Link>
              <Link to="#" onClick={logout}>
                로그아웃
              </Link>
            </>
          ) : (
            <>
              <Link to="/authentication/sign-in">로그인</Link>
              <Link to="/authentication/sign-up">회원가입</Link>
            </>
          )}
          <Link to="/about">⠇</Link>
        </div>
      </div>
    </Box>
  );
};

export default Header;

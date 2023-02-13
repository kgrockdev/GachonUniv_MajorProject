import React from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

const PrivateRoute = (props) => { 
  const token = useSelector((state) => state.Auth.token);
  const {component: RouteComponent} = props;
  if (!token) {
    alert("로그인이 필요한 페이지입니다");
    return <Navigate to={`/index`}/>;
  }
  return <RouteComponent/>;
};

export default PrivateRoute;
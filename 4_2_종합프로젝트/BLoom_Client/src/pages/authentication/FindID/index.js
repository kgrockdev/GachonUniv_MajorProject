// react
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

// @mui
import { Container } from "@mui/system";
import {
  Box,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";

// Components
import {
  recoveryEmailField,
  verifyKeyField,
} from "pages/authentication/FindID/components/variable";
import { jwtUtils } from "module/utils/jwtUtils";

// Images
import bgImage from "assets/images/logos/BLoom.png";

import axios from "axios";

function FindIDPage() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.Auth.token);

  useEffect(() => {
    if (jwtUtils.isAuth(token)) {
      navigate("/index");
    }
  }, []);

  // useState를 사용하여 RecoveryEmail 값 받아오기
  const [recoveryEmail, setRecoveryEmail] = useState({
    recoveryEmail: "",
  });

  // RecoveryEmailField가 변할 경우 항상 최신화
  const onChangeRecoveryEmail = (event) => {
    setRecoveryEmail({
      ...recoveryEmail,
      [event.target.name]: event.target.value,
    });
  };

  // 인증번호 받기 Btn을 눌렀을 때
  const handleVerify = (event) => {
    event.preventDefault();

    console.log(recoveryEmail.recoveryEmail);

    if (!recoveryEmail.recoveryEmail) {
      alert("복구 이메일을 입력해주세요");
      return;
    }

    axios
      .post(
        `${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/mailConfirm`,
        `${recoveryEmail.recoveryEmail}`,
        {
          headers: { "Content-Type": "text/plain" },
        }
      )
      .then(function (result) {
        alert("메일을 확인해보세요");
        console.log(result);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    axios
      .post(
        `${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/mailVerify`,
        {
          email: data.get("recoveryEmail"),
          code: data.get("verifyKey"),
        }
      )
      .then(function (result) {
        alert("인증에 성공하였습니다");
        alert("아이디 : " + result.data);
        navigate("/authentication/sign-in");
        console.log(result);
      })
      .catch(function (error) {
        alert("에러가 발생하였습니다. Console 창을 참고해주세요.");
        console.error(error);
      });
  };

  return (
    <Container component="main" disableGutters>
      {/* Start BackGround Color */}
      <Box
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundColor: "rgba( 248, 241, 232, 0.7 )",
          backgroundSize: "cover",
        }}
      ></Box>
      {/* End BackGround Color */}

      <Box
        px={1}
        width="100%"
        height="100vh"
        mx="auto"
        position="relative"
        zIndex={2}
      >
        <Grid container columns={13} spacing={2} height="100vh">
          <Grid item xs={8}></Grid>
          <Grid
            item
            xs={5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Start FindIDBox UI */}
            <Box
              label="findid-box"
              sx={{
                width: "35em",
                backgroundColor: "#F8F1E8",
                border: 1,
                borderColor: "grey.300",
                borderRadius: "8px",
                padding: 5,
                paddingBottom: 10,
              }}
            >
              {/* Start Logo Box */}
              <Box
                top={0}
                left={0}
                zIndex={2}
                width="100%"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: 5,
                }}
              >
                <img src={bgImage} alt="BLoomLogo" />
              </Box>
              {/* End Logo Box */}

              {/* Start FindIDForm */}
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  width: 1,
                }}
              >
                <Typography
                  variant="h7"
                  sx={{
                    fontFamily: "Do Hyeon, sansSerif",
                    color: "gray",
                  }}
                >
                  복구 이메일
                </Typography>
                {/* Start Recovery Email Field */}
                <Box
                  sx={{
                    marginY: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {recoveryEmailField.map((value) => (
                    <TextField
                      id={value["id"]}
                      key={value["id"]}
                      name={value["name"]}
                      label={value["label"]}
                      type={value["type"]}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {value["icon"]}
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      size="small"
                      onChange={onChangeRecoveryEmail}
                    />
                  ))}

                  {/* Start Send Verify Email Button */}
                  <Button
                    variant="contained"
                    color="bloomColor"
                    sx={{
                      height: "2.655em",
                      fontFamily: "Do Hyeon, sansSerif",
                      fontSize: "0.9em",
                      padding: "0.5em",
                    }}
                    onClick={handleVerify}
                  >
                    인증번호 받기
                  </Button>
                </Box>
                {/* End Send Verify Email Button */}

                {/* End Recovery Email Field */}

                <Typography
                  variant="h7"
                  sx={{
                    fontFamily: "Do Hyeon, sansSerif",
                    color: "gray",
                  }}
                >
                  인증 번호
                </Typography>
                {/* Start Verify Key Field */}
                {verifyKeyField.map((value) => (
                  <Box sx={{ marginY: 2 }} key={value["id"]}>
                    <TextField
                      fullWidth
                      id={value["id"]}
                      name={value["name"]}
                      label={value["label"]}
                      type={value["type"]}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {value["icon"]}
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      size="small"
                    />
                  </Box>
                ))}
                {/* End Verify Key Field */}

                {/* Start FindID Button */}
                <Box
                  sx={{
                    margin: "1px",
                    marginTop: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    color="bloomColor"
                    type="submit"
                    fullWidth
                    sx={{
                      height: "2.5em",
                      fontFamily: "Do Hyeon, sansSerif",
                      fontSize: "1.2em",
                      marginBottom: 2, // Here
                    }}
                  >
                    아이디 찾기
                  </Button>
                </Box>
                {/* End FindID Button */}
              </Box>
              {/* End FindIDForm */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 0,
                }}
              >
                <Button
                  component={Link}
                  to="/authentication/sign-in"
                  sx={{ color: "grey.500" }}
                >
                  로그인으로
                </Button>
              </Box>
            </Box>
            {/* End FindIDBox UI */}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default FindIDPage;

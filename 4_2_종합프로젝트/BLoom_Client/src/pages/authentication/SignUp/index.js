// react
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

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
  nameField,
  loginField,
  recoveryEmailField,
} from "pages/authentication/SignUp/components/variable";

// Images
import bgImage from "assets/images/logos/BLoom.png";

import axios from "axios";

import { jwtUtils } from "module/utils/jwtUtils";

function SignUpPage() {
  const navigate = useNavigate();

  const token = useSelector((state) => state.Auth.token);

  useEffect(() => {
    if (jwtUtils.isAuth(token)) {
      navigate("/index");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const emailJoinData = {
      username: data.get("name"),
      userId: data.get("userID"),
      password: data.get("password"),
      email: data.get("recoveryEmail"),
    };

    console.log(emailJoinData);

    axios
      .post(
        `${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/member/signup`,
        {
          username: data.get("name"),
          userId: data.get("userID"),
          password: data.get("password"),
          email: data.get("recoveryEmail"),
        }
      )
      .then(function (result) {
        alert(result.data);
        navigate("/authentication/sign-in");
        console.log(result);
      })
      .catch(function (error) {
        alert(error.response.data);
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
            {/* Start RegisterBox UI */}
            <Box
              label="register-box"
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

              {/* Start RegisterForm */}
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
                  이름
                </Typography>
                {/* Start Name Field */}
                {nameField.map((value) => (
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
                {/* End Name Field */}

                <Typography
                  variant="h7"
                  sx={{
                    fontFamily: "Do Hyeon, sansSerif",
                    color: "gray",
                  }}
                >
                  계정 정보
                </Typography>
                {/* Start Email, Password Field */}
                {loginField.map((value) => (
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
                {/* End Email, Password Field */}

                <Typography
                  variant="h7"
                  sx={{
                    fontFamily: "Do Hyeon, sansSerif",
                    color: "gray",
                  }}
                >
                  복구 이메일
                </Typography>
                {/* Start Name Field */}
                {recoveryEmailField.map((value) => (
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
                {/* End Name Field */}

                {/* Start Register Button */}
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
                    계정 만들기
                  </Button>
                </Box>
                {/* End Register Button */}
              </Box>
              {/* End RegisterForm */}
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
            {/* End RegisterBox UI */}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default SignUpPage;

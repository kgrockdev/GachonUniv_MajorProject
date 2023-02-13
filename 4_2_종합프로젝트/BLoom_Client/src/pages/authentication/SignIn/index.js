// react
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// axios
import axios from "axios";

// @mui
import { Container } from "@mui/system";
import { Box, Grid, Button, TextField, InputAdornment } from "@mui/material";

// Components
import {
  loginField,
  socialLoginField,
  accountManageBtn,
} from "pages/authentication/SignIn/components/variable";

// Images
import bgImage from "assets/images/logos/BLoom.png";

import { setToken } from "module/redux/reducers/AuthReducer";
import { jwtUtils } from "module/utils/jwtUtils";

function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.Auth.token);

  useEffect(() => {
    if (jwtUtils.isAuth(token)) {
      navigate("/index");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const joinData = {
      userId: data.get("userID"),
      password: data.get("password"),
    };

    console.log(joinData);

    axios
      .post(
        `${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/login`,
        {
          userId: data.get("userID"),
          password: data.get("password"),
        }
      )
      .then(function (result) {
        console.log(result);
        alert(`환영합니다 ${result.data.username}님`);
        dispatch(setToken(result.data.token));
        navigate("/index");
      })
      .catch(function (error) {
        alert(error.response.data);
        console.error(error);
      });
  };

  return (
    <Container component="main" disableGutters>
      {/* Verify 인증 Modal (테스트용, 삭제) */}

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
            {/* Start LoginBox UI */}
            <Box
              label="login-box"
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

              {/* Start LoginForm */}
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  width: 1,
                }}
              >
                {/* Start Email, Password Field */}
                {loginField.map((value) => (
                  <Box sx={{ marginBottom: 2 }} key={value["id"]}>
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

                {/* Start Login Button */}
                <Box
                  sx={{
                    margin: "1px",
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
                    }}
                  >
                    로그인
                  </Button>
                </Box>
                {/* End Login Button */}

                {/* Start Account Manage Group */}
                <Grid container justifyContent="center" spacing={2}>
                  {accountManageBtn.map((value) => (
                    <Grid item key={value.key}>
                      <Button
                        component={Link}
                        to={value.link}
                        sx={{ color: "grey.500" }}
                      >
                        {value.text}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
                {/* End Account Manage Group */}
              </Box>
              {/* End LoginForm */}

              {/* Start Social Login Button */}
              <Box label="socialLogin">
                {socialLoginField.map((value) => (
                  <Button
                    id={value.color}
                    key={value.color}
                    variant="outlined"
                    color={value.color}
                    sx={{
                      width: 1,
                      height: "2.5em",
                      fontFamily: "Do Hyeon, sansSerif",
                      fontSize: "1.2em",
                      marginTop: 2,
                    }}
                    startIcon={value.icon}
                  >
                    {value.text}
                  </Button>
                ))}
              </Box>
              {/* End Social Login Button */}
            </Box>
            {/* End LoginBox UI */}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default SignInPage;

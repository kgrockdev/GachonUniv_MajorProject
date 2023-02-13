import { useNavigate } from "react-router-dom";

// @mui
import {
  Modal,
  Box,
  Button,
  Typography,
  FormControl,
  TextField,
  InputAdornment,
} from "@mui/material";

// @mui Icon
import SendIcon from "@mui/icons-material/Send";
import HttpsIcon from "@mui/icons-material/Https";

import axios from "axios";

export default function App(props) {
  const navigate = useNavigate();

  const sendRenewPasswordModal = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const joinData = {
      newPassword: data.get("newPassword"),
    };

    console.log(joinData);

    axios
      .post(
        `${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/changePassword`,
        {
          userId: props.userID,
          newPassword: data.get("newPassword"),
        }
      )
      .then(function (result) {
        console.log(result);
        alert(result.data);
        navigate("/authentication/sign-in");
      })
      .catch(function (error) {
        console.error(error);
        if (error.response.status === 400) {
          alert(error.response.data);
          return;
        }
      });
  };

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box
        sx={{
          backgroundSize: "cover",
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 650,
          border: 1,
          borderColor: "grey.300",
          borderRadius: "8px",
          backgroundColor: "rgb( 248, 241, 232 )",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          component="form"
          onSubmit={sendRenewPasswordModal}
          sx={{ width: "100%" }}
        >
          <Box
            sx={{
              color: "#FF7676",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Gothic A1, sansSerif",
                fontSize: "2.5em",
                fontWeight: "bold",
              }}
            >
              비밀번호 변경
            </Typography>
          </Box>
          <FormControl sx={{ width: "100%" }}>
            <Typography
              variant="h7"
              sx={{
                fontFamily: "Do Hyeon, sansSerif",
                color: "gray",
              }}
            >
              변경할 Password의 값을 입력해주세요
            </Typography>
            <Box
              sx={{
                marginTop: 1,
                marginBottom: 2,
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <TextField
                fullWidth
                name="newPassword"
                type="password"
                color="bloomColor"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HttpsIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: "100%",
                }}
                variant="outlined"
                size="small"
              />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <Button
                fullWidth
                variant="contained"
                endIcon={<SendIcon />}
                type="submit"
                color="bloomColor"
                sx={{ marginTop: 2 }}
              >
                변경하기
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Box>
    </Modal>
  );
}

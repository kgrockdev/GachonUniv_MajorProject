import useState from "react-usestateref";

// @mui
import {
  Modal,
  Box,
  Button,
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  InputAdornment,
} from "@mui/material";

// @mui Icon
import SendIcon from "@mui/icons-material/Send";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// axios
import axios from "axios";

export default function App(props) {
  const [mySNSUniqueID, setMySNSUniqueID, currentMySNSUniqueID] = useState("");

  const onChangeMySNSUniqueID = (event) => {
    setMySNSUniqueID({
      ...mySNSUniqueID,
      [event.target.name]: event.target.value,
    });
  };

  const getHashValue = () => {
    console.log(currentMySNSUniqueID.current);

    axios
      .post(
        `${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/hashcode`,
        `${currentMySNSUniqueID.current.uniqueID}`,
        {
          headers: { "Content-Type": "text/plain" },
        }
      )
      .then(function (result) {
        if (result.status === 200) {
          alert(result.data + "의 값을 SNS의 내 소개에 입력해주세요");
        }

        console.log(result);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const sendSNSVerifyModal = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const joinData = {
      sns: data.get("sns"),
      uniqueID: data.get("uniqueID"),
    };

    console.log(joinData);

    axios
      .post(
        `${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/check/hash`,
        {
          memberId: props.memberId,
          snsId: data.get("uniqueID"),
          sns: data.get("sns"),
          hashCode: 1272600521,
        }
      )
      .then(function (result) {
        if (result.status === 200) {
          alert(result.data);
          props.onClose();
        }
        console.log(result);
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          alert(error.response.data);
        }
        console.error(error);
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
          onSubmit={sendSNSVerifyModal}
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
              SNS 본인 인증
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
              인증 받을 SNS 선택
            </Typography>
            <Box sx={{ marginBottom: 1 }}>
              <RadioGroup row name="sns">
                <FormControlLabel
                  value="facebook"
                  control={<Radio color="bloomColor" />}
                  label={
                    <Typography
                      sx={{
                        fontFamily: "Gothic A1, sansSerif",
                        fontSize: "1em",
                        fontWeight: "bold",
                      }}
                    >
                      Facebook
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="twitter"
                  control={<Radio color="bloomColor" />}
                  label={
                    <Typography
                      sx={{
                        fontFamily: "Gothic A1, sansSerif",
                        fontSize: "1em",
                        fontWeight: "bold",
                      }}
                    >
                      Twitter
                    </Typography>
                  }
                />
              </RadioGroup>
            </Box>
            <Typography
              variant="h7"
              sx={{
                fontFamily: "Do Hyeon, sansSerif",
                color: "gray",
              }}
            >
              SNS의 고유 ID를 입력해주세요
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
                name="uniqueID"
                color="bloomColor"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: "70%",
                }}
                variant="outlined"
                size="small"
                onChange={onChangeMySNSUniqueID}
              />
              <Button
                variant="contained"
                color="bloomColor"
                sx={{
                  width: "10em",
                  height: "2.655em",
                  fontFamily: "Do Hyeon, sansSerif",
                  fontSize: "0.9em",
                  padding: "0.5em",
                }}
                onClick={getHashValue}
              >
                인증번호 받기
              </Button>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <Typography
                variant="h7"
                sx={{
                  fontFamily: "Do Hyeon, sansSerif",
                  color: "gray",
                }}
              >
                SNS의 인사말을 발급받은 값으로 변경하고 아래의 인증 버튼을
                눌러주세요
              </Typography>
              <Button
                fullWidth
                variant="contained"
                endIcon={<SendIcon />}
                type="submit"
                color="bloomColor"
                sx={{ marginTop: 2 }}
              >
                인증하기
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Box>
    </Modal>
  );
}

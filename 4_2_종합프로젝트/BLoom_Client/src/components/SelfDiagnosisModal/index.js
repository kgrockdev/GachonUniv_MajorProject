// @mui
import {
  Modal,
  Box,
  Grid,
  Button,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

// @mui Icon
import SendIcon from "@mui/icons-material/Send";

import axios from "axios";

export default function App(props) {
  const sendSelfDiagnosis = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const joinData = [
      data.get("eat"),
      data.get("sleep"),
      data.get("tomorrow"),
      data.get("confidence"),
      data.get("selfHarm"),
      data.get("guilty"),
      data.get("blankly"),
    ];

    console.log(joinData);

    var checkNum = 0;
    joinData.map((value) => {
      if (value) checkNum++;
    });

    console.log(checkNum);

    axios
      .post(
        `${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/popup`,
        {
          userId: props.userID,
          checkNum: checkNum,
        }
      )
      .then(function (result) {
        console.log(result);
        alert(result.data);
        props.onClose();
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
        <Box component="form" onSubmit={sendSelfDiagnosis}>
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
              우울증 자가진단 7문항
            </Typography>
          </Box>
          <FormGroup row>
            <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
              <Grid item xs={6}>
                <FormControlLabel
                  name="eat"
                  control={<Checkbox color="bloomColor" />}
                  label={
                    <Typography
                      sx={{
                        fontFamily: "Gothic A1, sansSerif",
                        fontSize: "1em",
                        fontWeight: "bold",
                      }}
                    >
                      오늘 식사는 잘 못하시진 않으셨나요?
                    </Typography>
                  }
                  labelPlacement="end"
                />
                <FormControlLabel
                  name="sleep"
                  control={<Checkbox color="bloomColor" />}
                  label={
                    <Typography
                      sx={{
                        fontFamily: "Gothic A1, sansSerif",
                        fontSize: "1em",
                        fontWeight: "bold",
                      }}
                    >
                      어제 잠에 잘 들지 못하신 않으셨나요?
                    </Typography>
                  }
                  labelPlacement="end"
                />
                <FormControlLabel
                  name="tomorrow"
                  control={<Checkbox color="bloomColor" />}
                  label={
                    <Typography
                      sx={{
                        fontFamily: "Gothic A1, sansSerif",
                        fontSize: "1em",
                        fontWeight: "bold",
                      }}
                    >
                      내일이 막막하신가요?
                    </Typography>
                  }
                  labelPlacement="end"
                />
                <FormControlLabel
                  name="confidence"
                  control={<Checkbox color="bloomColor" />}
                  label={
                    <Typography
                      sx={{
                        fontFamily: "Gothic A1, sansSerif",
                        fontSize: "1em",
                        fontWeight: "bold",
                      }}
                    >
                      나에 대한 자신감이 없나요?
                    </Typography>
                  }
                  labelPlacement="end"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  name="selfHarm"
                  control={<Checkbox color="bloomColor" />}
                  label={
                    <Typography
                      sx={{
                        fontFamily: "Gothic A1, sansSerif",
                        fontSize: "1em",
                        fontWeight: "bold",
                      }}
                    >
                      혹시 자해같은 생각을 하셨나요?
                    </Typography>
                  }
                  labelPlacement="end"
                />
                <FormControlLabel
                  name="guilty"
                  control={<Checkbox color="bloomColor" />}
                  label={
                    <Typography
                      sx={{
                        fontFamily: "Gothic A1, sansSerif",
                        fontSize: "1em",
                        fontWeight: "bold",
                      }}
                    >
                      무언가 죄책감을 가지시나요?
                    </Typography>
                  }
                  labelPlacement="end"
                />
                <FormControlLabel
                  name="blankly"
                  control={<Checkbox color="bloomColor" />}
                  label={
                    <Typography
                      sx={{
                        fontFamily: "Gothic A1, sansSerif",
                        fontSize: "1em",
                        fontWeight: "bold",
                      }}
                    >
                      멍하니 하루를 보내셨나요?
                    </Typography>
                  }
                  labelPlacement="end"
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              endIcon={<SendIcon />}
              type="submit"
              color="bloomColor"
              sx={{ marginX: "50px", marginBottom: "20px" }}
            >
              저장하기
            </Button>
          </FormGroup>
        </Box>
      </Box>
    </Modal>
  );
}

// React
import { Component } from "react";

// @mui
import { Box, Stack, Typography } from "@mui/material";

export default class App extends Component {
  render() {
    return (
      <Box sx={{ marginY: 2 }}>
        <Stack
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "1em",
              fontWeight: "bold",
              fontFamily: "Gothic A1, sansSerif",
            }}
          >
            SNS 분석 결과
          </Typography>
          <Typography
            sx={{
              fontSize: "1em",
              fontWeight: "bold",
              fontFamily: "Gothic A1, sansSerif",
            }}
          >
            {this.props.userName} 님의 우울증 점수는
          </Typography>
          <Typography
            sx={{
              fontSize: "3em",
              fontWeight: "bold",
              fontFamily: "Gothic A1, sansSerif",
            }}
          >
            {this.props.depressionScore} 점
          </Typography>
          <Typography
            sx={{
              fontSize: "1em",
              fontWeight: "bold",
              fontFamily: "Gothic A1, sansSerif",
            }}
          >
            {this.props.comment}
          </Typography>
        </Stack>
      </Box>
    );
  }
}

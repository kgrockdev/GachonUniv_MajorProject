// React
import { Component } from "react";

// @mui
import { Box } from "@mui/material";

// ApexCharts
import ApexCharts from "react-apexcharts";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box sx={{ marginY: 2 }}>
        <ApexCharts
          options={{
            chart: {
              zoom: {
                enabled: false,
              },
              toolbar: {
                show: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "straight",
            },
            title: {
              text: "최근 결과",
              align: "center",
              style: {
                fontSize: "20px",
                fontWeight: "bold",
              },
            },
            grid: {
              row: {
                colors: ["#f3f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5,
              },
            },
            xaxis: {
              categories: [
                this.props.recentDate.split(", ")[0],
                this.props.recentDate.split(", ")[1],
                this.props.recentDate.split(", ")[2],
                this.props.recentDate.split(", ")[3],
              ],
            },
          }}
          series={[
            {
              name: this.props.userName,
              data: [
                this.props.recentData.split(", ")[0],
                this.props.recentData.split(", ")[1],
                this.props.recentData.split(", ")[2],
                this.props.recentData.split(", ")[3],
              ],
            },
          ]}
          typs="line"
          width={500}
          height={300}
        />
      </Box>
    );
  }
}

import { Typography } from "antd";
import MyChartComponent from "./ReactApexChart";

const PieChart = ({ title, value, series, colors }) => {
  return (
    <div
      id="chart"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FCFCFC",
        gap: "2px",
        borderRadius: "15px",
        minHeight: "110px",
        width: "fit-content",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
      }}
      className="p-[20px]"
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography.Text
          style={{ fontSize: "14px", color: "#808191", whiteSpace: "nowrap" }}
        >
          {title}
        </Typography.Text>
        <Typography.Text
          style={{
            fontSize: "24px",
            color: "#11142D",
            fontWeight: 700,
            marginTop: "1px",
            whiteSpace: "nowrap",
          }}
        >
          {value}
        </Typography.Text>
      </div>

      <MyChartComponent
        options={{
          chart: { type: "donut" },
          colors,
          legend: { show: false },
          dataLabels: { enabled: false },
        }}
        series={series}
        type="donut"
        width="120px"
      />
    </div>
  );
};

export default PieChart;

import { ReactNode, useEffect, useState } from "react";
import dynamic from "next/dynamic";
const DynamicApexCharts = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const MyChartComponent = ({
  options,
  type,
  series,
  height,
  width,
  children,
}) => {
  const [chart, setChart] = useState < any > null;

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("apexcharts").then((ApexCharts) => {
        const chartInstance = new ApexCharts.default(
          document.createElement("div"),
          {
            ...options,
            series,
            type,
            height,
            width,
          }
        );

        setChart(chartInstance);

        return () => {
          chartInstance.destroy();
        };
      });
    }
  }, [options, series, type, height, width]);

  return (
    <div>
      {chart && (
        <div>
          <DynamicApexCharts
            options={options}
            series={series}
            type={type}
            height={height}
            width={width}
          />
        </div>
      )}
    </div>
  );
};

export default MyChartComponent;

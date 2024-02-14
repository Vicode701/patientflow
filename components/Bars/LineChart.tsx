'use client'

import Chart from "../../base-components/Chart/Chart";
import { ChartData, ChartOptions } from "chart.js/auto";
// import { getColor } from "../../utils/colors";
// import { selectColorScheme } from "../../stores/colorSchemeSlice";
// import { selectDarkMode } from "../../stores/darkModeSlice";
// import { useAppSelector } from "../../stores/hooks";
import { useMemo } from "react";

interface MainProps extends React.ComponentPropsWithoutRef<"canvas"> {
  width: number;
  height: number;
}

function LineChart(props: MainProps) {
//   const colorScheme = useAppSelector(selectColorScheme);
//   const darkMode = useAppSelector(selectDarkMode);

  const data: ChartData = useMemo(() => {
    return {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Tick Line data",
          data: [0, 200, 250, 200, 500, 450, 850, 1050, 950, 1100, 900, 1200],
          borderWidth: 2,
          borderColor: 'session',
          backgroundColor: "transparent",
          pointBorderColor: "transparent",
          tension: 0.4,
        },
        {
          label: "dotted line data",
          data: [0, 300, 400, 560, 320, 600, 720, 850, 690, 805, 1200, 1010],
          borderWidth: 2,
          borderDash: [2, 2],
          borderColor: "slate.400",
          backgroundColor: "transparent",
          pointBorderColor: "transparent",
          tension: 0.4,
        },
      ],
    };
  }, []);

  const options: ChartOptions = useMemo(() => {
    return {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color:"slate.500",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 12,
            },
            color: "slate/500",
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            font: {
              size: 12,
            },
            color: 'slate-299',
            callback: function (value) {
              return "$" + value;
            },
          },
          grid: {
            color: "slate.300",
            borderDash: [2, 2],
            drawBorder: false,
          },
        },
      },
    };
  }, []);

  return (
    <Chart
      type="line"
      width={props.width}
      height={props.height}
      data={data}
      options={options}
      className={props.className}
    />
  );
}

LineChart.defaultProps = {
  width: "auto",
  height: "auto",
  lineColor: "",
  className: "",
};

export default LineChart;

import {
  Chart as ChartJS,
  Decimation,
  DoughnutController,
  Filler,
  Legend,
  LinearScale,
  registerables,
  SubTitle,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import "./CasesGraph.css";

export default function CasesGraph(props) {
  ChartJS.register(
    DoughnutController,
    LinearScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle,
    ...registerables
  );

  const data = [];

  if (!props.isAllTime) {
    const allTodayCases =
      props.data.todayCases +
      props.data.todayRecovered +
      props.data.todayDeaths;
    data.cases = allTodayCases;
    data.activeCases = props.data.todayCases;
    data.recovered = props.data.todayRecovered;
    data.deaths = props.data.todayDeaths;
  }

  const labels = [];
  const colors = [];

  if (props.casesType === "active") {
    labels.push("Mild condition", "Critical condition");
    colors.push("#14a098", "#0f292f");

    if (props.isAllTime) {
      const mild = props.data.active - props.data.critical;
      data.push(mild, props.data.critical);
    }
    if (!props.isAllTime) {
      if (props.data.todayCases === 0) {
        data.push(1, 1);
        labels[0] = "Data not availible";
        labels[1] = "Data not availible";
      }
      const mild = props.data.todayCases - props.data.critical;
      data.push(mild, props.data.critical);
    }
  } else {
    labels.push("Recovered", "Deaths");
    colors.push("#cb2d6f", "#501f3a");

    if (props.isAllTime) {
      data.push(props.data.recovered, props.data.deaths);
    }
    if (!props.isAllTime) {
      if (props.data.todayCases === 0) {
        data.push(1, 1);
        labels[0] = "Data not availible";
        labels[1] = "Data not availible";
      }
      data.push(props.data.todayRecovered, props.data.todayDeaths);
    }
  }

  const state = {
    labels: [...labels],
    datasets: [
      {
        label: `${data[0] + data[1]}`,
        data: [...data],
        backgroundColor: [...colors],
        borderWidth: 0,
        width: "10px",
      },
    ],
    AnimationTimeline: "300ms",
  };

  return (
    <div className={`cases-graph`}>
      <Doughnut
        data={state}
        options={{
          cutout: "80%",
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                boxWidth: 15,
                font: { size: "16px", weight: 500 },
                padding: 25,
                color: "#555",
                textAlign: "center",
                boxHeight: 15,
              },
            },
          },
        }}
      />
    </div>
  );
}

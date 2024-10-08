import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { ChartColors, Font } from "../../../styling/Styles";

ChartJS.register(ArcElement, Tooltip, Legend);

const dataset = {
  label: ["Amazon", "Flipkart", "Myntra", "Snapdeal"],
  data: [3987, 3387, 2987, 1987],
};

export const data = {
  labels: dataset.label,
  datasets: [
    {
      label: "",
      data: dataset.data,
      backgroundColor: ChartColors,
      borderColor: ChartColors,
      hoverBackgroundColor: ChartColors,
      borderWidth: 0,
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const DonutAnalysis = () => {
  return <Doughnut data={data} options={options} />;
};

function Donut() {
  return (
    <>
      <div className="flex flex-row gap-8 w-full">
        <div className="coverage flex-1 gap-10">
          <div className="flex flex-row py-6 items-start w-full">
            <p className={`${Font.font} ${Font.subheadline} ${Font.medium}`}>
              No. of coverages (Monthly)
            </p>
          </div>
          <div className="h-48 w-48">
            <DonutAnalysis />
          </div>
          <div className="donut-data w-full">
            <div className="donut-data-col">
              <p className={`${Font.font} ${Font.body2} ${Font.regular}`}>
                Rank
              </p>
              {dataset.label.map((item, i) => (
                <div key={i} className="flex gap-4 flex-row">
                  <p
                    className="comp-mark"
                    style={{ backgroundColor: ChartColors[i] }}
                  />
                  <p className="rank">{i + 1}</p>
                </div>
              ))}
            </div>
            <div className="donut-data-col">
              <p className={`${Font.font} ${Font.body2} ${Font.regular}`}>
                Competitors
              </p>
              {dataset.label.map((item, i) => (
                <div key={i} className="flex gap-4 flex-row">
                  <p className="rank">{item}</p>
                </div>
              ))}
            </div>
            <div className="donut-data-col">
              <p className={`${Font.font} ${Font.body2} ${Font.regular}`}>
                Count
              </p>
              {dataset.data.map((item, i) => (
                <div key={i} className="flex gap-4 flex-row">
                  <p className="rank">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="coverage flex-1 gap-10">
          <div className="flex flex-row py-6 items-start w-full">
            <p className={`${Font.font} ${Font.subheadline} ${Font.medium}`}>
              No. of coverages (Monthly)
            </p>
          </div>
          <div className="h-48 w-48">
            <DonutAnalysis />
          </div>
          <div className="donut-data w-full">
            <div className="donut-data-col">
              <p className={`${Font.font} ${Font.body2} ${Font.regular}`}>
                Rank
              </p>
              {dataset.label.map((item, i) => (
                <div key={i} className="flex gap-4 flex-row">
                  <p
                    className="comp-mark"
                    style={{ backgroundColor: ChartColors[i] }}
                  />
                  <p className="rank">{i + 1}</p>
                </div>
              ))}
            </div>
            <div className="donut-data-col">
              <p className={`${Font.font} ${Font.body2} ${Font.regular}`}>
                Competitors
              </p>
              {dataset.label.map((item, i) => (
                <div key={i} className="flex gap-4 flex-row">
                  <p className="rank">{item}</p>
                </div>
              ))}
            </div>
            <div className="donut-data-col">
              <p className={`${Font.font} ${Font.body2} ${Font.regular}`}>
                Count
              </p>
              {dataset.data.map((item, i) => (
                <div key={i} className="flex gap-4 flex-row">
                  <p className="rank">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="coverage flex-1 gap-10">
        <div className="flex flex-row py-6 items-start w-full">
          <p className={`${Font.font} ${Font.subheadline} ${Font.medium}`}>
            No. of coverages (Monthly)
          </p>
        </div>
        <div className="flex flex-row w-full px-10 justify-between ">
          <div className="h-48 w-48 flex-1">
            <DonutAnalysis />
          </div>
          <div className="donut-data flex-1">
            <div className="donut-data-col">
              <p className={`${Font.font} ${Font.body2} ${Font.regular}`}>
                Rank
              </p>
              {dataset.label.map((item, i) => (
                <div key={i} className="flex gap-4 flex-row">
                  <p
                    className="comp-mark"
                    style={{ backgroundColor: ChartColors[i] }}
                  />
                  <p className="rank">{i + 1}</p>
                </div>
              ))}
            </div>
            <div className="donut-data-col">
              <p className={`${Font.font} ${Font.body2} ${Font.regular}`}>
                Competitors
              </p>
              {dataset.label.map((item, i) => (
                <div key={i} className="flex gap-4 flex-row">
                  <p className="rank">{item}</p>
                </div>
              ))}
            </div>
            <div className="donut-data-col">
              <p className={`${Font.font} ${Font.body2} ${Font.regular}`}>
                Count
              </p>
              {dataset.data.map((item, i) => (
                <div key={i} className="flex gap-4 flex-row">
                  <p className="rank">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Donut;

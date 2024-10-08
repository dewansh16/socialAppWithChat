import React from "react";
import { Button, Font } from "../../../styling/Styles";

function Calender(props) {
  const {
    startdate,
    datasetcom,
    Checkclick,
    setStartdate,
    setOpenCal,
    endDate,
    setEndDate,
    setR,
    changeHandler,
    ana,
  } = props;

  return (
    <div className="flex flex-col gap-4 p-6" style={{ width: 700 }}>
      <div className="flex flex-row gap-8 pb-2 w-full">
        <div className="inputborder">
          <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
            Start date
          </p>
          <input
            type="date"
            name=""
            id=""
            onChange={(e) => setStartdate(e.target.value)}
          />
        </div>
        <div className="inputborder">
          <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
            End date
          </p>
          <input
            type="date"
            onChange={(e) => setEndDate(e.target.value)}
            name=""
            id=""
          />
        </div>
      </div>
      {startdate && endDate && (
        <div
          className={`${Button.button} ${Button.medium} ${Button.primary}`}
          onClick={() => {
            console.log("ana from calender...", ana);
            ana ? Checkclick(datasetcom, 20) : changeHandler(ana, 20);
            setOpenCal(false);
            setR("20");
          }}>
          <p className={`${Font.font} ${Font.body1} ${Font.heading2}`}>
            See analysis
          </p>
        </div>
      )}
      {(!startdate || !endDate) && (
        <div className={`${Button.button} ${Button.medium} ${Button.primary}`}>
          <p className={`${Font.font} ${Font.body1} ${Font.heading2}`}>
            See analysis
          </p>
        </div>
      )}
    </div>
  );
}

export default Calender;

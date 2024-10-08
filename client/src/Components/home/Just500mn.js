import React from "react";
import { Font } from "../../styling/Styles";
import Newspaper from "../assets/images/noun-dollar-value-1329533 1.svg";
import NewspaperResp from "../assets/images/Dollar esp.png";
import "./Just500mn.css";

function Just500mn() {
  const className = `${Font.font} ${Font.heading2} ${Font.medium}`;

  return (
    <div className="just500">
      <div className="just500-inside">
        <div className="newspaper resp" style={{ textAlign: "left" }}>
          <img src={NewspaperResp} alt="" style={{ height: "65px" }} />
        </div>
        <div className="just500-text">
          <h1
            className={`${Font.font} ${Font.heading1} ${Font.medium} desktop`}
          >
            Uttertale has created
            <br />{" "}
            <b
              className={`colored ${Font.font} ${Font.heading1} ${Font.medium} desktop`}
            >
              Ad-value
            </b>{" "}
            of above{" "}
            <b
              className={`colored ${Font.font} ${Font.heading1} ${Font.medium} desktop`}
            >
              500 Mn
            </b>
          </h1>
          <h1
            className={`resp  ${className}`}
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 6,
              color: "white",
            }}
          >
            Uttertale has created an
            <p
              className={`colored ${Font.font} ${Font.heading1} ${Font.medium} `}
              style={{ fontSize: "20px", position: "relative", top: "-3.30px" }}
            >
              {" "}
              Ad-value
            </p>{" "}
            of above{" "}
            <p
              className={`colored ${Font.font} ${Font.heading1} ${Font.medium} `}
              style={{ fontSize: "20px", position: "relative", top: "-3.30px" }}
            >
              {" "}
              $ 500 Mn
            </p>
          </h1>
        </div>
        <div className="newspaper desktop" style={{ alignItems: "center" }}>
          <img src={Newspaper} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Just500mn;

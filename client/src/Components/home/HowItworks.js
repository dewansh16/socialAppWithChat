import React from "react";
import { Font } from "../../styling/Styles";
import Graphics from "../assets/images/Graphics.svg";
import HIW1 from "../assets/images/HIW3.png";
import HIW2 from "../assets/images/HIW2.png";
import HIW3 from "../assets/images/HIW1.png";

import HxIW1 from "../assets/images/1.png";
import HxIW2 from "../assets/images/2.png";
import HxIW3 from "../assets/images/3.png";
import Icon from "../assets/images/Icon.svg";
import IconDown from "../assets/images/Downward icon.svg";
import "./HowItworks.css";

function HowItworks() {
  const arr = [
    {
      imgLink: HIW1,
      bold: "Join Uttertale",
      text: "Sign Up for free to join our platform to get solutions to all your media needs",
    },
    {
      imgLink: HIW2,
      bold: "Access to Exclusive groups ",
      text: "Get access to exclusive groups, where you can find people from the same industry",
    },
    {
      imgLink: HIW3,
      bold: "Connect with people",
      text: "Find most relevant people for all your marketing and media needs, and work with them",
    },
  ];

  const Design = ({ num }) => {
    return (
      <div className="how-inside">
        <div className="how-img">
          <img src={arr[num].imgLink} className="how-img-box" alt="" />
        </div>

        <div className="howtext" style={{ marginLeft: "16px" }}>
          <h1
            className={`${Font.font} ${Font.heading2} ${Font.bold}`}
            style={{ fontSize: "20px", lineHeight: "28px" }}
          >
            {arr[num].bold}
          </h1>
          <p
            className={`${Font.font} ${Font.body2} ${Font.regular} pt-1`}
            style={{ color: "#424242", width: "80%" }}
          >
            {arr[num].text}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="Howitworks flex flex-col items-center justify-center my-20">
      <h1 className={`desktop ${Font.font} ${Font.bold} ${Font.display}`}>
        How It Works
      </h1>
      <h1 className={`${Font.font} ${Font.heading2} ${Font.bold} resp h-i-w-h`}>
        How It Works
      </h1>
      <div className="desktop how-works">
        <Design num={0} />
        <div style={{ paddingTop: "64px" }}>
          <img src={Icon} alt="icon" />
        </div>

        <Design num={1} />
        <div style={{ paddingTop: "64px" }}>
          <img src={Icon} alt="icon" />
        </div>
        <Design num={2} />
      </div>

      <div className="resp how-works">
        <div className="how-inside">
          <div className="how-img" style={{ paddingLeft: "10px" }}>
            <img src={HxIW1} className="how-img-box" alt="" />
          </div>

          <p className={`${Font.font} ${Font.body2} ${Font.bold}`}>
            Become a member
          </p>
        </div>
        <div>
          <img
            src={IconDown}
            alt="icon"
            style={{ maxHeight: "12px", margin: "auto", width: "50%" }}
          />
        </div>

        <div className="how-inside">
          <div className="how-img">
            <img src={HxIW2} className="how-img-box" alt="" />
          </div>
          <p className={`${Font.font} ${Font.body2} ${Font.bold}`}>
            Join Relevant Communities
          </p>
        </div>
        <div>
          <img
            src={IconDown}
            alt="icon"
            style={{ maxHeight: "12px", margin: "auto", width: "50%" }}
          />
        </div>
        <div className="how-inside">
          <div className="how-img">
            <img src={HxIW3} className="how-img-box" alt="" />
          </div>
          <p className={`${Font.font} ${Font.body2} ${Font.bold}`}>
            Connect & Collaborate
          </p>
        </div>
      </div>
    </div>
  );
}

export default HowItworks;

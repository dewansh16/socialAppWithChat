import React, { useState } from "react";
import Shape from "../assets/images/Shapesoflogo.svg";
import ellips361 from "../assets/images/Ellipse361.svg";
import "./Blackbox.css";
import { Button, Font } from "../../styling/Styles";
import { Dialog } from "@mui/material";
import Homepop from "./Homepop";

function Blackbox() {
  const [sign, setSign] = useState(false);

  return (
    <>
      <Dialog
        fullWidth={false}
        maxWidth="xl"
        open={sign}
        onClose={() => setSign(false)}
      >
        <Homepop setEditPop={setSign} />
      </Dialog>
      <div className="Bottom-black-box">
        <div className="bottom-black-box-text">
          <div className="flex flex-col only-text">
            <p
              className={` ${Font.font} ${Font.body1} ${Font.medium} desktop `}
              style={{ color: "#fff" }}
            >
              Be a part of the community that is
            </p>
            <p
              className={` ${Font.font} ${Font.body1} ${Font.medium} resp`}
              style={{ color: "#fff", fontSize: "12px" }}
            >
              Be a part of the community that is
            </p>
            <div className="bottom-black-box-text-bold ">
              <h1
                className={`desktop ${Font.font} ${Font.display} ${Font.bold}`}
                style={{ color: "#fff", paddingLeft: "0px" }}
              >
                Connected
              </h1>
              <h1
                className={`${Font.font} ${Font.medium} ${Font.heading2} resp`}
                style={{ color: "#fff", fontSize: "16px" }}
              >
                Connected
              </h1>
              <img src={ellips361} alt="" />
              <h1
                className={`desktop ${Font.font} ${Font.display} ${Font.bold}`}
                style={{ color: "#fff" }}
              >
                Collaborative
              </h1>
              <h1
                className={`${Font.font} ${Font.medium} ${Font.heading2} resp`}
                style={{ color: "#fff", fontSize: "16px" }}
              >
                Collaborative
              </h1>
              <img src={ellips361} alt="" />
              <h1
                className={`desktop ${Font.font} ${Font.display} ${Font.bold}`}
                style={{ color: "#fff" }}
              >
                Credible
              </h1>
              <h1
                className={`${Font.font} ${Font.medium} ${Font.heading3} resp`}
                style={{ color: "#fff", fontSize: "16px" }}
              >
                Credible
              </h1>
            </div>
          </div>
          <div
            onClick={() => setSign(true)}
            className={`${Button.button} ${Button.primary} ${Button.large} desktop`}
          >
            <p className={`${Font.font} ${Font.body1} ${Font.medium}`}>
              Join the community
            </p>
          </div>
          <div
            onClick={() => setSign(true)}
            className={`${Button.button} ${Button.primary} ${Button.medium} resp`}
          >
            <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
              Join the community
            </p>
          </div>
        </div>
        <div className="bottom-box-img desktop">
          <img src={Shape} alt="" />
        </div>
      </div>
    </>
  );
}

export default Blackbox;

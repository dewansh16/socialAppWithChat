import React from "react";
import { useState, useEffect } from "react";
import Shapecolon from "../../assets/images/Shapecolon.svg";
import Logo from "../../assets/images/Logo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Font } from "../../../styling/Styles";

function Ppage3() {
  const Common = () => {
    return (
      <>
        <div className="signup-progress">
          <div className="signup-bar">
            <a href="/">
              <img src={Logo} alt="" />
            </a>
          </div>
        </div>
        <div className="signup-text">
          <div>
            <h2 className={`${Font.font} ${Font.heading2} ${Font.medium}`}>
              Congratulation
            </h2>
          </div>
          <p
            className={`${Font.font} ${Font.body1} ${Font.regular}`}
            style={{ color: "#424242" }}
          >
            Your password has been successfully changes.
          </p>
        </div>
        <div className="next-back-buttons">
          <div>
            <button
              type="submit"
              className={`${Button.button} ${Button.primary} ${Button.medium}`}
            >
              <a href="/sign-in">
                <h5
                  className={`${Font.body2} ${Font.medium} ${Font.font}`}
                  style={{ color: "#fff" }}
                >
                  {" "}
                  Go Back to Sign In
                </h5>
              </a>
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="signup-input">
        <Common />
      </div>
    </>
  );
}

export default Ppage3;

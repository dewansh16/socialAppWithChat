import React, { useContext, Fragment, useState } from "react";
import Shapecolon from "../assets/images/Shapecolon.svg";
import Logo from "../assets/images/Logo.svg";
import "./signup.css";
import "./style.css";
import { Button, Font } from "../../styling/Styles";
import { UserContext } from "../Navigation";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/signup-logo.png";

function DetailsReceived() {
  const {
    selectedChat,
    setSelectedChat,
    user,
    chats,
    setChats,
    token,
    fetchAgain,
    setFetchAgain,
  } = useContext(UserContext);

  const [n, setN] = useState(0);

  const navigate = useNavigate();

  const ProgressBar = ({ num }) => {
    return (
      <div
        style={{
          width: 85.6,
          backgroundColor: num <= n ? "#242424" : "#C7C7C7",
        }}
        className="pbar"
      ></div>
    );
  };

  const Common = ({ index, inputs }) => {
    return (
      <>
        <div className="signup-progress ">
          <div className="signup-bar">
            <a href="/">
              <img src={Logo} alt="" />
            </a>
          </div>
          {/* <div className="flex flex-row gap-2">
            <h3 className={`${Font.font} ${Font.body1} ${Font.regular} mt-2`}>
              Already have an account?
            </h3>
            <a
              href=""
              className={`${Font.font} ${Font.body1} ${Font.regular} mt-2`}
              style={{ color: "#FF3520" }}
            >
              {" "}
              Log In
            </a>
          </div> */}
        </div>

        <div className="signup-text">
          <div>
            <h2 className={`${Font.font} ${Font.heading2} ${Font.medium}`}>
              Details has been received.
            </h2>
            <p
              className={`${Font.font} ${Font.body1} ${Font.regular}`}
              style={{
                marginTop: 3,
              }}
            >
              Please allow us 2-3 business days to verify your profile. Once
              status updated, you will notify via mail. Thank you
            </p>
            <button
              className={`${Button.button} ${Button.secondary} ${Button.medium}`}
              style={{ marginTop: 32 }}
              onClick={() => navigate("/")}
            >
              <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                Back to Homepage
              </p>
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="sign-up desktop">
        <div className="signup-input">
          <Common index={n} />
        </div>

        <div className="signup-pic">
          <div className="signup-pic-container">
            <div className="text-sidebar">
              <>
                <p className={`${Font.font} ${Font.heading2} ${Font.medium}`}>
                  10K+ coverage enabled for Uttertale-associate entrepreneurs
                  and businesses worth over INR 500 Cr!
                </p>
              </>
            </div>
            <div className="big-colon-logo">
              <img src={Shapecolon} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="sign-up resp">
        <div className="signup-header">
          <div className="signup-header-logo">
            <img src={logo} alt="logo" />
          </div>

          <div className="signup-header-text">
            <a href="/sign-in">Log in</a>
          </div>
        </div>
        <div className="signup-input">
          <div className="signup-text">
            <div>
              <h2 className={`${Font.font} ${Font.heading2} ${Font.medium}`}>
                Details has been received.
              </h2>
              <p
                className={`${Font.font} ${Font.body1} ${Font.regular}`}
                style={{
                  marginTop: 3,
                }}
              >
                Please allow us 2-3 business days to verify your profile. Once
                status updated, you will notify via mail. Thank you
              </p>
              <button
                className={`${Button.button} ${Button.secondary} ${Button.medium}`}
                style={{ marginTop: 32 }}
                onClick={() => navigate("/")}
              >
                <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                  Back to Homepage
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsReceived;

import React, { useContext } from "react";

import Shapecolon from "../assets/images/Shapecolon.svg";
import Logo from "../assets/images/Logo.svg";
import "./signup.css";
import "./style.css";

import { Button, Font } from "../../styling/Styles";
import { useNavigate } from "react-router-dom";
import SocialMediaIcon, { MediaImage } from "../assets/SocialMediaIcon";
function Middleauth(props) {
  const Common = () => {
    return (
      <>
        <div className="signup-progress ">
          <div className="signup-bar">
            <a href="/">
              <img src={Logo} alt="" />
            </a>
          </div>
        </div>

        <div className="signup-text">
          <div>
            <h2 className={`${Font.font} ${Font.heading2} ${Font.medium}`}>
              Check your email inbox!
            </h2>
            <p className={`${Font.font} ${Font.body1} ${Font.regular}`}>
              Message has been sent to {props.email} with a link to verify your
              email.
            </p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="sign-up">
        <div className="signup-input">
          <Common />
          <div className="sign-up-inputs" style={{ flexDirection: "row" }}>
            <a
              href="https://mail.google.com"
              target="_blank"
              className={`${Button.button} ${Button.secondary} ${Button.medium}`}
              rel="noreferrer"
            >
              <MediaImage link={SocialMediaIcon.email} width={16} height={16} />
              <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                Open Gmail
              </p>
            </a>
            <a
              href="https://outlook.office365.com"
              target="_blank"
              className={`${Button.button} ${Button.secondary} ${Button.medium}`}
              rel="noreferrer"
            >
              <MediaImage
                link={SocialMediaIcon.reddit}
                width={16}
                height={16}
              />
              <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                Open Outlook
              </p>
            </a>
          </div>
          <div className="flex flex-col pt-8 gap-8">
            <div className="flex flex-col p-0 gap-1">
              <p className={`${Font.font} ${Font.body1} ${Font.medium}`}>
                Didn’t received an email? Check your spam folder!
              </p>

              <p
                className={`${Font.font} ${Font.body1} ${Font.medium}`}
                style={{ color: "#138DEC", cursor: "pointer" }}
                onClick={() => props.fn()}
              >
                Re-enter information and try again
              </p>
            </div>
          </div>
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
    </div>
  );
}

export default Middleauth;

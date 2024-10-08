import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Shapecolon from "../../assets/images/Shapecolon.svg";
import Logo from "../../assets/images/Logo.svg";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Font } from "../../../styling/Styles";
import { UserContext } from "../../Navigation";

function Ppage2() {
  const history = useNavigate();
  const navigate = useNavigate();

  const [isEmail, setIsEmail] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const {
    selectedChat,
    setSelectedChat,
    user,
    setUser,
    chats,
    setChats,
    token,
    fetchAgain,
    setFetchAgain,
    setPasswordUrl,
    passwordUrl,
  } = useContext(UserContext);
  const location = useLocation();
  const ltoken = location.pathname;
  const [conPassword, setConPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [length, setlength] = useState();

  const clickHandler_e = async (e) => {
    setEmail(e.target.value);
  };

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("userInfo"));

  //   if (user) history("/Profile/own");
  // });

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
              Reset your password
            </h2>
          </div>
          <p
            className={`${Font.font} ${Font.body1} ${Font.regular}`}
            style={{ color: "#424242" }}
          >
            Please enter your password and confirm it.
          </p>
        </div>
      </>
    );
  };

  const checkPassword = (val) => {
    if (val !== newPassword) {
      setError(true);
    } else if (val === newPassword) {
      setError(false);
    }
    console.log(val.length);
    setConPassword(val);
  };

  const submitPassword = async (e) => {
    e.preventDefault();
    console.log("entered");
    console.log(conPassword);
    try {
      await axios
        .post(`${ltoken}`, {
          newPassword: newPassword,
          conPassword: conPassword,
        })
        .then((res) => {
          console.log(res.data);
        });
      navigate("/password-changed");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div className="sign-up">
          <div className="signup-input">
            <Common />
            <form>
              {error && (
                <div
                  className={`${Font.font} ${Font.label} ${Font.regular} mb-4`}
                  style={{ color: "#FF0000" }}
                >
                  Password is not similar
                </div>
              )}
              <div className="sign-up-inputs">
                <div className="inputborder">
                  <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
                    New Password{" "}
                  </p>
                  <input
                    type="email"
                    name=""
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    id="email"
                    placeholder="Create password"
                  />
                </div>
                <div className="inputborder">
                  <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
                    Confirm Password{" "}
                  </p>
                  <input
                    type="email"
                    name=""
                    value={conPassword}
                    onChange={(e) => checkPassword(e.target.value)}
                    id="email"
                    placeholder="Create password"
                  />
                </div>
                <div className="next-back-buttons">
                  <div>
                    <button
                      type="submit"
                      onClick={(e) => submitPassword(e)}
                      className={`${Button.button} ${Button.primary} ${Button.medium}`}
                    >
                      <h5
                        className={`${Font.body2} ${Font.medium} ${Font.font}`}
                        style={{ color: "#fff" }}
                      >
                        {" "}
                        Reset Password
                      </h5>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="signup-pic">
            <div className="signup-pic-container">
              <div className="text-sidebar">
                <p className={`${Font.font} ${Font.heading2} ${Font.medium}`}>
                  One-stop solution for creating and nurturing your brand’s
                  credibility, visibility, publicity and more!
                </p>
              </div>
              <div className="big-colon-logo">
                <img src={Shapecolon} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ppage2;

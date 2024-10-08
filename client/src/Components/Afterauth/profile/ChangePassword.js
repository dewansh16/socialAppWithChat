import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Shapecolon from "../../assets/images/Shapecolon.svg";
import Logo from "../../assets/images/Logo.svg";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Font } from "../../../styling/Styles";
import { UserContext } from "../../Navigation";
import logo from "../../assets/images/signup-logo.png";
function ChangePassword() {
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
    setToken,
    fetchAgain,
    setFetchAgain,
    setPasswordUrl,
    passwordUrl,
  } = useContext(UserContext);
  const location = useLocation();
  const ltoken = "/resetPassword" + location.pathname.substring(15);
  console.log("token", ltoken);
  const [newPassword, setNewPassword] = useState();
  const [currPassword, setCurrPassword] = useState();
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
        <div className="signup-progress desktop">
          <div className="signup-bar">
            <a href="/">
              <img src={Logo} alt="" />
            </a>
          </div>
        </div>
        <div className="signup-text">
          <div>
            <h2 className={`${Font.font} ${Font.heading2} ${Font.medium}`}>
              Change your password
            </h2>
          </div>
          <p
            className={`${Font.font} ${Font.body1} ${Font.regular}`}
            style={{ color: "#424242" }}
          >
            Change the password for your account
          </p>
        </div>
      </>
    );
  };

  const submitPassword = async (e) => {
    e.preventDefault();
    console.log(user._id, newPassword, currPassword, token);

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (currPassword === newPassword) {
      setError("Please choose a new password");
    } else {
      try {
        await axios
          .post(
            `/changePassword`,
            {
              userId: user._id,
              currPassword: currPassword,
              newPassword: newPassword,
            },
            config
          )
          .then((res) => {
            console.log(res.data);
          });

        setToken("");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("userToken");
        localStorage.removeItem("selectedChatInfo");

        navigate("/password-changed");
      } catch (error) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div>
        <div className="sign-up desktop">
          <div className="signup-input">
            <Common />
            <form>
              {error && (
                <div
                  className={`${Font.font} ${Font.label} ${Font.regular} mb-4`}
                  style={{ color: "#FF0000" }}
                >
                  {error}
                </div>
              )}
              <div className="sign-up-inputs">
                <div className="inputborder">
                  <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
                    Current Password
                  </p>
                  <input
                    type="text"
                    name=""
                    value={currPassword}
                    onChange={(e) => {
                      setCurrPassword(e.target.value);
                      setError("");
                    }}
                    id="password"
                    placeholder="Enter current password"
                  />
                </div>
                <div className="inputborder">
                  <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
                    New Password
                  </p>
                  <input
                    type="text"
                    name=""
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setError("");
                    }}
                    id="password"
                    placeholder="Enter new password"
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
                        Change Password
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

      <div>
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
            {error && (
              <div
                className={`${Font.font} ${Font.label} ${Font.regular} mb-4`}
                style={{ color: "#FF0000" }}
              >
                {error}
              </div>
            )}
            <div>
              <h2
                className={`${Font.font} ${Font.heading2} ${Font.medium}`}
                style={{ fontSize: "24px" }}
              >
                Change your password
              </h2>
            </div>
            <p
              className={`${Font.font} ${Font.body1} ${Font.regular}`}
              style={{ color: "#424242" }}
            >
              Change the password for your account
            </p>

            <form style={{ margin: "40px 0px" }}>
              {error && (
                <div
                  className={`${Font.font} ${Font.label} ${Font.regular} mb-4`}
                  style={{ color: "#FF0000" }}
                ></div>
              )}
              <div className="sign-up-inputs">
                <div className="inputborder">
                  <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
                    Current Password
                  </p>
                  <input
                    type="text"
                    name=""
                    value={currPassword}
                    onChange={(e) => setCurrPassword(e.target.value)}
                    id="password"
                    placeholder="Enter current password"
                  />
                </div>
                <div className="inputborder">
                  <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
                    New Password
                  </p>
                  <input
                    type="text"
                    name=""
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    id="password"
                    placeholder="Enter new password"
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
                        Change Password
                      </h5>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;

import React from "react";
import { useState, useEffect, useContext } from "react";
import Shapecolon from "../assets/images/Shapecolon.svg";
import Logo from "../assets/images/Logo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Navigation.js";
import { Button, Font } from "../../styling/Styles";
import longLogo from "../assets/images/signin-logo.png";

function Signin() {
  const history = useNavigate();
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
  } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history("/Profile/own");
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function clickHandler_e(e) {
    setEmail(e.target.value);
  }

  function clickHandler_p(e) {
    setPassword(e.target.value);
  }

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);

      setUser(data.user);
      setToken(data.accessToken);

      localStorage.setItem("userInfo", JSON.stringify(data.user));
      localStorage.setItem("userToken", JSON.stringify(data.accessToken));
      navigate("/Profile/own");
    } catch (error) {
      setError("Invalid email or password");
      console.log(error);
    }
  };

  const Common = () => {
    return (
      <>
        <div className="signup-progress">
          <div className="signup-bar desktop">
            <a href="/">
              <img src={Logo} alt="" />
            </a>
          </div>
        </div>
        <div className="signup-text">
          <div>
            <h2
              className={`${Font.font} ${Font.heading2} ${Font.medium} desktop`}
            >
              Welcome back,
            </h2>
          </div>
          <p
            className={`${Font.font} ${Font.body1} ${Font.regular}`}
            style={{ color: "#424242" }}
          >
            We are happy to see you again. Please enter your details
          </p>
        </div>
      </>
    );
  };

  const error_css = {
    color: "red",
  };

  return (
    <>
      <div>
        <div className="sign-up desktop">
          <div className="signup-input">
            <Common />
            <form onSubmit={submitHandler}>
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
                    Email{" "}
                  </p>
                  <input
                    type="email"
                    name=""
                    value={email}
                    onChange={clickHandler_e}
                    id="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="inputborder">
                  <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
                    Password
                  </p>
                  <input
                    type="password"
                    name=""
                    value={password}
                    onChange={clickHandler_p}
                    id="pass"
                    placeholder="Enter password"
                  />
                  <a
                    className={`${Font.font}  ${Font.label} ${Font.regular}`}
                    style={{ color: "#FF0000" }}
                    href="/Forgot-Password"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="next-back-buttons">
                  <div>
                    <button
                      type="submit"
                      className={`${Button.button} ${Button.primary} ${Button.medium}`}
                    >
                      <h5
                        className={`${Font.body2} ${Font.medium} ${Font.font}`}
                        style={{ color: "#fff" }}
                      >
                        {" "}
                        Sign In
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
                  Experience the power of impactful and meaningful story-sharing
                  via cutting-edge tech{" "}
                </p>
              </div>
              <div className="big-colon-logo">
                <img src={Shapecolon} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="sign-up resp">
          <div className="signup-header">
            <div className="signup-header-logo" onClick={() => history("/")}>
              <img src={longLogo} alt="logo" />
            </div>
          </div>
          <div className="signup-input">
            <div className="signup-text">
              <div>
                <h2
                  className={`${Font.font} ${Font.heading2} ${Font.medium} resp`}
                  style={{ fontSize: "24px" }}
                >
                  Welcome back,
                </h2>
              </div>
              <p
                className={`${Font.font} ${Font.body1} ${Font.regular}`}
                style={{ color: "#424242" }}
              >
                We are happy to see you again. Please enter your details
              </p>
            </div>
            <form onSubmit={submitHandler}>
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
                    Email{" "}
                  </p>
                  <input
                    type="email"
                    name=""
                    value={email}
                    onChange={clickHandler_e}
                    id="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="inputborder">
                  <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
                    Password
                  </p>
                  <input
                    type="password"
                    name=""
                    value={password}
                    onChange={clickHandler_p}
                    id="pass"
                    placeholder="Enter password"
                  />
                  <a
                    className={`${Font.font}  ${Font.label} ${Font.regular}`}
                    style={{ color: "#FF0000" }}
                    href="/Forgot-Password"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="next-back-buttons">
                  <div>
                    <button
                      type="submit"
                      className={`${Button.button} ${Button.primary} ${Button.medium}`}
                    >
                      <h5
                        className={`${Font.body2} ${Font.medium} ${Font.font}`}
                        style={{ color: "#fff" }}
                      >
                        {" "}
                        Sign In
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

export default Signin;

import React, { useContext } from "react";
import { useState } from "react";
import Shapecolon from "../../assets/images/Shapecolon.svg";
import Logo from "../../assets/images/Logo.svg";
import "../signup.css";
import "../style.css";
import axios from "axios";
import { Button, Font } from "../../../styling/Styles";
import filled from "../../assets/images/progress2.svg";
import logo from "../../assets/images/signup-logo.png";
import CreatableSelect from "react-select/creatable";

import { UserContext } from "../../Navigation";
import DetailsReceived from "../DetailsRecieved";
import { useNavigate } from "react-router-dom";

function ISignup(props) {
  const { token } = useContext(UserContext);

  const [otherlink, setotherlink] = useState("");
  const [sminstagram, setsminstagram] = useState("");
  const [smlinkedin, setsmlinkedin] = useState("");
  const [smtwitter, setsmtwitter] = useState("");
  const [youtube, setyoutube] = useState("");
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [val, setVal] = useState([]);
  const [bDomain, setbDomain] = useState([]);
  const history = useNavigate();

  // /(https?)?:?(\/\/)?(([w]{3}||\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  const validateLinkedIn = (link) => {
    const regex =
      /(https?)?:?(\/\/)?(([w]{3}||\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regex.test(link);
  };

  const validateYoutube = (link) => {
    const regex = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/;
    return regex.test(link);
  };

  const validateTwitter = (link) => {
    const regex = /^@?(\w){1,15}$/;
    return regex.test(link);
  };

  const submitHandler = async (event) => {
    if (
      sminstagram === "" &&
      smlinkedin === "" &&
      smtwitter === "" &&
      youtube === ""
    ) {
      setError("Fill any one of the 4 fields");
      return;
    }
    // if (smlinkedin !== "" && !validateLinkedIn(smlinkedin)) {
    //   setError("Invalid LinkedIn account");
    //   return;
    // }
    // if (smtwitter !== "" && !validateTwitter(smtwitter)) {
    //   setError("Invalid Twitter handle");
    //   return;
    // }
    // if (youtube !== "" && !validateYoutube(youtube)) {
    //   setError("Invalid Youtube Channel");
    //   return;
    // }
    if (bDomain === []) {
      setError("Fill Business Domain");
      return;
    }
    setError("");

    console.log("see", {
      ...props.user,
      youtube,
      instagram: sminstagram,
      linkedin: smlinkedin,
      twitter: smtwitter,
      others: otherlink,
    });

    // if (validateLinkedIn(smlinkedin)) {
    //   console.log("validated linkedin");
    // }

    try {
      console.log("clicked");
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/register",
        {
          ...props.user,
          youtube,
          instagram: sminstagram,
          linkedin: smlinkedin,
          twitter: smtwitter,
          others: otherlink,
          bdomain: bDomain,
        },
        config
      );

      setIsRegistered(true);

      const featureLinksData = await axios.put(
        "/featuredlink/fetchFeaturedLink",
        {
          ...props.user,
          id: data.id,
          experience: [],
          bdomain: bDomain,
        },
        config
      );

      console.log("axios", data, " featureLinksData = ", featureLinksData);
    } catch (error) {
      console.log(error);
    }
  };

  const data = [
    {
      name: "Agriculture",
      id: 1,
    },
    {
      name: "Chemical",
      id: 2,
    },
    {
      name: "Construction",
      id: 3,
    },
    {
      name: "Defense",
      id: 4,
    },
    {
      name: "Education",
      id: 5,
    },
    {
      name: "Energy & Power",
      id: 6,
    },
    {
      name: "Entertainment",
      id: 7,
    },
    {
      name: "Banking & Finance",
      id: 8,
    },
    {
      name: "Food & Beverages",
      id: 9,
    },
    {
      name: "Healthcare",
      id: 10,
    },
    {
      name: "Hospitality",
      id: 11,
    },
    {
      name: "Manufacturing",
      id: 12,
    },
    {
      name: "Telecommunications",
      id: 13,
    },
    {
      name: "Transport",
      id: 14,
    },
    {
      name: "Interior",
      id: 15,
    },
    {
      name: "Electric Vehicles",
      id: 16,
    },
    {
      name: "Mining ",
      id: 17,
    },
    {
      name: "Automobile",
      id: 18,
    },
    {
      name: "Agri-tech",
      id: 19,
    },
    {
      name: "Environment",
      id: 20,
    },
    {
      name: "Biotechnology",
      id: 21,
    },
    {
      name: "Sustainability",
      id: 22,
    },
    {
      name: "Infrastructure & Development",
      id: 23,
    },
    {
      name: "Lifestyle",
      id: 24,
    },
    {
      name: "Logistics",
      id: 25,
    },
    {
      name: "Cryptocurrency",
      id: 25,
    },
    {
      name: "Textile",
      id: 25,
    },
    {
      name: "Art & Culture",
      id: 26,
    },
    {
      name: "HR",
      id: 27,
    },
    {
      name: "Gaming",
      id: 28,
    },
    {
      name: "Hydrogreens",
      id: 29,
    },
    {
      name: "Technology",
      id: 30,
    },
    {
      name: "Startups",
      id: 29,
    },
    {
      name: "E-commerce & Retail",
      id: 30,
    },
    {
      name: "Web3.0",
      id: 31,
    },
    {
      name: "Advertising",
      id: 32,
    },
    {
      name: "Media & Publishing",
      id: 33,
    },
    {
      name: "Real estate",
      id: 34,
    },
    {
      name: "Recycling and Waste Management",
      id: 34,
    },
  ];

  const option = data.map((item) => {
    return {
      label: item.name,
      value: item.id,
      ...item,
    };
  });

  const Domain = () => {
    return (
      <div className="w-full">
        <p className={`${Font.font} ${Font.label} ${Font.medium} color mb-2`}>
          Domain of the Business/ Industry of operation (you can choose multiple
          domain)
        </p>
        <CreatableSelect
          isMulti
          menuPlacement="top"
          options={option}
          value={val}
          className="w-full"
          classNamePrefix="mySelect"
          theme={(theme) => ({
            ...theme,
            borderRadius: 10,
            colors: {
              ...theme.colors,
              primary: "#2E65E5",
            },
          })}
          styles={{
            control: (base) => ({
              ...base,
              boxShadow: "none",
            }),
            option: (styles, { isFocused, isSelected }) => {
              return {
                ...styles,
                // backgroundColor: isDisabled?'blueviolet':'red',
                backgroundColor: isSelected
                  ? "#F5F5F5"
                  : isFocused
                  ? "#F5F5F5"
                  : undefined,
                color: "#242424",
              };
            },
          }}
          placeholder="Select"
          onChange={(value) => {
            setVal(value);
            const nameArr = value.map((item) => item.label);
            setbDomain(nameArr);
          }}
        />
      </div>
    );
  };

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
            <h2
              className={`${Font.font} ${Font.heading2} ${Font.medium} desktop`}>
              Hi {props.user.name}, connect your social accounts
            </h2>

            <h2
              className={`${Font.font} ${Font.heading2} ${Font.medium} resp py-2`}
              style={{ lineHeight: "24px" }}>
              Hi {props.user.name}, connect your social accounts
            </h2>

            <p className={`${Font.font} ${Font.body1} ${Font.regular}`}>
              Please provide at least one or all four social media account link
              to help us verify your profile more efficiently.
            </p>
          </div>
        </div>
      </>
    );
  };
  const social = (
    <>
      <div className="sign-up desktop">
        <div className="signup-input">
          <Common />
          {error && (
            <p
              className={`${Font.font} ${Font.label} ${Font.medium}`}
              style={{ color: "#FF3520" }}>
              {`${error}`}
            </p>
          )}
          <div className="sign-up-inputs">
            <div className="inputborder">
              <div className="flex flex-row justify-between w-full">
                <div
                  className="flex flex-col "
                  style={{ gap: 6, width: "45%" }}>
                  <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
                    Instagram
                  </p>
                  <input
                    type="text"
                    value={sminstagram}
                    onChange={(e) => setsminstagram(e.target.value)}
                    placeholder="Paste link here"
                  />
                </div>
                <div className="flex flex-col" style={{ gap: 6, width: "45%" }}>
                  <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
                    LinkedIn
                  </p>
                  <input
                    type="text"
                    value={smlinkedin}
                    onChange={(e) => setsmlinkedin(e.target.value)}
                    placeholder="Paste link here"
                  />
                </div>
              </div>
            </div>
            <div className="inputborder">
              <div className="flex flex-row justify-between w-full">
                <div
                  className="flex flex-col "
                  style={{ gap: 6, width: "45%" }}>
                  <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
                    YouTube channel
                  </p>
                  <input
                    type="text"
                    value={youtube}
                    onChange={(e) => setyoutube(e.target.value)}
                    placeholder="Paste link here"
                  />
                </div>
                <div className="flex flex-col" style={{ gap: 6, width: "45%" }}>
                  <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
                    Twitter
                  </p>
                  <input
                    type="text"
                    value={smtwitter}
                    onChange={(e) => setsmtwitter(e.target.value)}
                    placeholder="Paste link here"
                  />
                </div>
              </div>
            </div>

            <div className="inputborder">
              <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
                Other link
              </p>
              <input
                type="text"
                value={otherlink}
                onChange={(e) => setotherlink(e.target.value)}
                placeholder="Paste link here"
              />
            </div>

            <div className="inputborder">
              <Domain />
            </div>

            <div
              className={`${Button.button} ${Button.medium} ${Button.primary}`}
              onClick={() => submitHandler()}>
              <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                Submit
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

      <div className="sign-up resp">
        <div className="signup-header">
          <div className="signup-header-logo" onClick={() => history("/")}>
            <img src={logo} alt="logo" />
          </div>

          <div className="signup-header-text">
            <a href="/sign-in">Log in</a>
          </div>
        </div>
        {/* <div className="mobile-progress">
          <div className="signup-progress-text">
            <p>Step 3 of 3</p>
          </div>
          <div className="signup-progress-bars">
            <img src={filled} alt="progress bar" />
            <img src={filled} alt="progress bar" />
            <img src={filled} alt="progress bar" />
          </div>
        </div> */}
        <div className="signup-input">
          <Common />
          {error && (
            <p
              className={`${Font.font} ${Font.label} ${Font.medium}`}
              style={{ color: "#FF3520" }}>
              {`${error}`}
            </p>
          )}
          <div className="sign-up-inputs">
            <div className="inputborder">
              <div className="flex flex-row justify-between w-full">
                <div
                  className="flex flex-col "
                  style={{ gap: 6, width: "45%" }}>
                  <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
                    Instagram
                  </p>
                  <input
                    type="text"
                    value={sminstagram}
                    onChange={(e) => setsminstagram(e.target.value)}
                    placeholder="Paste link here"
                  />
                </div>
                <div className="flex flex-col" style={{ gap: 6, width: "45%" }}>
                  <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
                    LinkedIn
                  </p>
                  <input
                    type="text"
                    value={smlinkedin}
                    onChange={(e) => setsmlinkedin(e.target.value)}
                    placeholder="Paste link here"
                  />
                </div>
              </div>
            </div>
            <div className="inputborder">
              <div className="flex flex-row justify-between w-full">
                <div
                  className="flex flex-col "
                  style={{ gap: 6, width: "45%" }}>
                  <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
                    YouTube channel
                  </p>
                  <input
                    type="text"
                    value={youtube}
                    onChange={(e) => setyoutube(e.target.value)}
                    placeholder="Paste link here"
                  />
                </div>
                <div className="flex flex-col" style={{ gap: 6, width: "45%" }}>
                  <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
                    Twitter
                  </p>
                  <input
                    type="text"
                    value={smtwitter}
                    onChange={(e) => setsmtwitter(e.target.value)}
                    placeholder="Paste link here"
                  />
                </div>
              </div>
            </div>

            <div className="inputborder">
              <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
                Other link
              </p>
              <input
                type="text"
                value={otherlink}
                onChange={(e) => setotherlink(e.target.value)}
                placeholder="Paste link here"
              />
            </div>

            <div
              className={`${Button.button} ${Button.medium} ${Button.primary}`}
              onClick={() => submitHandler()}>
              <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                Submit
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  return <div>{!isRegistered ? social : <DetailsReceived />}</div>;
}

export default ISignup;

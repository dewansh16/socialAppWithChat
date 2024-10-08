import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Shapecolon from "../assets/images/Shapecolon.svg";
import Logo from "../assets/images/Logo.svg";
import empty from "../assets/images/progress1.svg";
import filled from "../assets/images/progress2.svg";
import logo from "../assets/images/signup-logo.png";
import "./signup.css";
import "./style.css";

import { Button, Font } from "../../styling/Styles";
import ReactSelect from "react-select";
import axios from "axios";
import { UserContext } from "../Navigation";
import { useNavigate } from "react-router-dom";
import Middleauth from "./Middleauth";
import SocialMedia from "./SocialMedia";
import CreatableSelect from "react-select/creatable";

function Signup() {
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
    profile,
    setProfile,
    isregistered,
    setIsRegistered,
    isVerified,
    setIsVerified,
  } = useContext(UserContext);

  const [role, setRole] = useState("");

  //common details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  //individuals specific detail
  const [businessName, setBusinessName] = useState("");

  //business specific details
  const [foundersName, setFoundersName] = useState([]);
  const [bdVal, setbdVal] = useState(null);
  const [bType, setbType] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [stepOne, setStepOne] = useState(true);

  const validateEmail = (mail) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(mail);
  };

  const history = useNavigate();

  const submitHandler = async () => {
    console.log({ email, name, role });
    if (stepOne) {
      if (role !== "") {
        setStepOne(false);
      }
      return;
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const { data } = await axios.post("/findUserData", { email }, config);

        if (!email || !name || !role) {
          setError("Fill all the details");
          setSuccess(false);
        } else if (data.message === "User Found") {
          setError("Email in use");
          setSuccess(false);
        } else if (!validateEmail(email)) {
          setError("Invalid Email");
          setSuccess(false);
        } else setSuccess(true);
        console.log("search", data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const Common = () => {
    return (
      <>
        <div className="signup-progress ">
          <div className="signup-bar">
            <a href="/">
              <img src={Logo} alt="" />
            </a>
          </div>
          <div className="flex flex-row gap-2">
            <h3 className={`${Font.font} ${Font.body1} ${Font.regular} mt-2`}>
              Already have an account?
            </h3>
            <a
              href="/sign-in"
              className={`${Font.font} ${Font.body1} ${Font.regular} mt-2`}
              style={{ color: "#FF3520" }}>
              {" "}
              Log In
            </a>
          </div>
        </div>

        <div className="signup-text">
          <div>
            <h2 className={`${Font.font} ${Font.heading2} ${Font.medium}`}>
              Sign Up
            </h2>
            {error && (
              <p
                className={`${Font.font} ${Font.label} ${Font.medium} mt-5`}
                style={{ color: "#FF3520" }}>
                {`${error}`}
              </p>
            )}
            {/* <p className={`${Font.font} ${Font.body1} ${Font.regular}`}>
              This information would be used to verify you as an
              organisation/business
            </p> */}
          </div>
        </div>
      </>
    );
  };
  //
  const [val, setVal] = useState(null);
  const data = [
    { name: "Content Creator", id: 1 },
    { name: "Entrepreneur", id: 2 },
    { name: "Business", id: 3 },
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
          Profile
        </p>
        <ReactSelect
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
          placeholder="Select Profile"
          onChange={(value) => {
            setVal(value);
            setRole(value.name);
            setError("");
          }}
        />
      </div>
    );
  };

  const individualInputs = (
    <>
      <div className="inputborder">
        <p className={`${Font.font} ${Font.label} ${Font.medium}`}>Name</p>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          placeholder="Enter your name"
        />
      </div>
      <div className="inputborder">
        <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
          Company / Business Name
        </p>
        <input
          type="text"
          onChange={(e) => {
            setBusinessName(e.target.value);
            setError("");
          }}
          placeholder="Enter your business name"
        />
      </div>
      <div className="inputborder">
        <p className={`${Font.font} ${Font.label} ${Font.medium}`}>Email</p>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="Enter your email"
        />
      </div>
    </>
  );
  //

  const bDomaindata = [
    {
      name: "Individual",
      id: 1,
    },
    {
      name: "Proprietorship",
      id: 2,
    },
    {
      name: "Partnership",
      id: 3,
    },
    {
      name: "Private Limited Company",
      id: 4,
    },
    {
      name: "Public Limited Company",
      id: 5,
    },
    {
      name: "One Person Company",
      id: 6,
    },
    {
      name: "Public Sector Undertaking",
      id: 7,
    },
    {
      name: "Limited Liability Partnership",
      id: 8,
    },
    {
      name: "Government Department",
      id: 9,
    },
    {
      name: "Local Authority",
      id: 10,
    },
    {
      name: "Statutory Body",
      id: 11,
    },
    {
      name: "Foreign Limited Liability Partnership",
      id: 12,
    },
    {
      name: "Foreign Company Registered (in India)",
      id: 13,
    },
  ];

  const bDomainOption = bDomaindata.map((item) => {
    return {
      label: item.name,
      value: item.id,
      ...item,
    };
  });

  const BusinessDomain = () => {
    return (
      <div className="w-full">
        <p className={`${Font.font} ${Font.label} ${Font.medium} color mb-2`}>
          Business Type
        </p>
        <ReactSelect
          menuPlacement="top"
          options={bDomainOption}
          value={bdVal}
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
            setbdVal(value);
            setbType(value.name);
          }}
        />
      </div>
    );
  };

  const [inputValue, setInputValue] = useState("");
  const [founderNameVal, setFounderNameVal] = useState([]);

  const components = {
    DropdownIndicator: null,
  };

  const createOption = (label) => ({
    label,
    value: label,
  });

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setFounderNameVal((prev) => [...prev, createOption(inputValue)]);
        setInputValue("");
        event.preventDefault();
    }
  };

  useEffect(() => {
    const nameArr = founderNameVal.map((item) => item.label);
    setFoundersName(nameArr);
  }, [founderNameVal]);

  // console.log("founders Name = ", foundersName);

  const businessInputs = (
    <>
      <div className="inputborder">
        <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
          Business Name
        </p>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          placeholder="Enter your business name"
        />
      </div>
      <div className="inputborder">
        <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
          Founders Name
        </p>
        <CreatableSelect
          components={components}
          inputValue={inputValue}
          isClearable
          isMulti
          menuIsOpen={false}
          className="w-full"
          classNamePrefix="mySelect"
          onChange={(newValue) => {
            setFounderNameVal(newValue);
          }}
          onInputChange={(newValue) => setInputValue(newValue)}
          onKeyDown={handleKeyDown}
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
          placeholder="Type name and press enter"
          value={founderNameVal}
        />
        {
          // <input
          // type="text"
          // onChange={(e) => {
          //   setFoundersName([e.target.value]);
          //   setError("");
          // }}
          // placeholder="Enter your founders name"
          // />
        }
      </div>
      <div className="inputborder">
        <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
          Business Email
        </p>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="Enter your business email"
        />
      </div>
      <div className="inputborder">
        <BusinessDomain />
      </div>
    </>
  );
  //

  const signup = (
    <>
      <div className="sign-up desktop">
        <div className="signup-input">
          <Common />
          <div className="sign-up-inputs">
            {stepOne ? (
              <div className="inputborder">
                <Domain />
              </div>
            ) : role === "Business" ? (
              businessInputs
            ) : (
              individualInputs
            )}
            <div
              className={`${Button.button} ${Button.medium} ${Button.primary}`}
              onClick={() => submitHandler()}>
              <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                Next
              </p>
            </div>
          </div>
        </div>

        <div className="signup-pic ">
          <div className="signup-pic-container">
            <div className="text-sidebar">
              <>
                <p className="inside-sidebar-text">
                  One-stop solution for creating and nurturing your brand’s
                  credibility, visibility, publicity and more!
                </p>
              </>
            </div>
            <div className="big-colon-logo">
              <img src={Shapecolon} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="sign-up resp ">
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
            <p>{stepOne ? "Step 1 of 3" : "Step 2 of 3"}</p>
          </div>
          <div className="signup-progress-bars">
            <img src={filled} alt="progress bar" />
            {stepOne ? (
              <img src={empty} alt="progress bar" />
            ) : (
              <img src={filled} alt="progress bar" />
            )}
            <img src={empty} alt="progress bar" />
          </div>
        </div> */}

        <div></div>
        <div className="signup-input">
          <div className="signup-text">
            <div>
              <h2
                className={`${Font.font} ${Font.heading2} ${Font.medium}`}
                style={{ fontSize: "20px" }}>
                Sign Up
              </h2>
              {error && (
                <p
                  className={`${Font.font} ${Font.label} ${Font.medium} mt-5`}
                  style={{ color: "#FF3520" }}>
                  {`${error}`}
                </p>
              )}
              {/* <p className={`${Font.font} ${Font.body1} ${Font.regular}`}>
              This information would be used to verify you as an
              organisation/business
            </p> */}
            </div>
          </div>
          <div className="sign-up-inputs">
            {stepOne ? (
              <div className="inputborder">
                <Domain />
              </div>
            ) : role === "Business" ? (
              businessInputs
            ) : (
              individualInputs
            )}
            <div
              className={`${Button.button} ${Button.medium} ${Button.primary}`}
              onClick={() => submitHandler()}>
              <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                Next
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div>
      {!success ? (
        signup
      ) : (
        <SocialMedia
          user={{
            email,
            name,
            role,
            btype: bType,
            foundername: foundersName,
            businessname: businessName,
          }}
        />
      )}
    </div>
  );
}

export default Signup;

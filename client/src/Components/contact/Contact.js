import React, { useState } from "react";
import "./contact.css";
import Postbox from "../assets/images/postBox.svg";
import Ractangle from "../assets/images/rectangallogo.svg";
import CpageLogo from "../assets/images/CpageLogo.svg";
import { Font, Options, Themes } from "../../styling/Styles";
import axios from "axios";
import ReactSelect from "react-select";

function Contact() {
  const [fullname, setName] = useState("");
  const [email, setWorkEmail] = useState("");
  const [pnumber, setMobileNum] = useState("");
  const [role, setRole] = useState("");
  const [writetous, setWritetous] = useState("");
  const [isAccepted, setIsAccepted] = useState(null);
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (isAccepted && fullname && email && pnumber && role && writetous) {
      e.preventDefault();
      console.log("here");
      axios
        .post(`/contact/contact`, {
          fullname: fullname,
          email: email,
          pnumber: pnumber,
          role: role,
          writetous: writetous,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });

      setName("");
      setWorkEmail("");
      setMobileNum("");
      setRole("");
      setWritetous("");
      setIsAccepted(null);
    } else {
      if (!fullname || !email || !pnumber || !role || !writetous) {
        setError("Fill all the details");
      } else {
        setError("Accept the terms and conditions");
      }
    }
  };

  const Dropdown = (props) => {
    let a = false;
    if (props.val === null || props.val === "") {
      a = true;
    }
    const [val, setVal] = useState(a ? "" : { label: props.val, value: null });
    const options = props.options;

    const option = options.map((item, i) => {
      return {
        label: item,
        value: i,
        ...item,
      };
    });

    const onChange = (value) => {
      const a = value.label;
      props.setvalue(a);
    };

    return (
      <ReactSelect
        options={option}
        value={val}
        className="w-full contactdrop"
        classNamePrefix="mySelect"
        theme={(theme) => Themes(theme)}
        styles={Options}
        placeholder={props.placeholder}
        onChange={(value) => {
          {
            setVal(value);
            onChange(value);
          }
        }}
        isDisabled={props.disable}
      />
    );
  };

  return (
    <>
      <div className="Container contacts flex flex-col desktop">
        <div className="container-heading">
          <h1 className={`desktop ${Font.display} ${Font.bold} ${Font.font}`}>
            Contact Us
          </h1>
          {/* <img src={CpageLogo} alt="" /> */}
          <img src={Ractangle} className="desktop" alt="" />
        </div>
        <div className="border" sstyle={{ marginTop: "40px" }}></div>
        <form className="main-contact">
          <div className="input-contact">
            {/* <div className="written">
              <h2>Make connections and market your brand like never before.</h2>
              <p>Reach out to our team experts for business queries.</p>
            </div> */}
            <div className="inputs">
              {/* {iBar.map((item, i) => ( */}
              <div className="input-box">
                <h2 className={`${Font.label} ${Font.medium} ${Font.font}`}>
                  {iBar[0].head}
                </h2>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={fullname}
                  type="text"
                  placeholder={iBar[0].placeholder}
                />
              </div>
              <div className="input-box">
                <h2 className={`${Font.label} ${Font.medium} ${Font.font}`}>
                  {iBar[1].head}
                </h2>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setWorkEmail(e.target.value)}
                  placeholder={iBar[1].placeholder}
                />
              </div>
              <div className="input-box">
                <h2 className={`${Font.label} ${Font.medium} ${Font.font}`}>
                  {iBar[2].head}
                </h2>
                <input
                  type="text"
                  value={pnumber}
                  onChange={(e) => setMobileNum(e.target.value)}
                  placeholder={iBar[2].placeholder}
                />
              </div>
              <div className="input-box">
                <h2 className={`${Font.label} ${Font.medium} ${Font.font}`}>
                  {iBar[3].head}
                </h2>
                {/* <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder={iBar[3].placeholder}
                /> */}
                <Dropdown
                  placeholder={iBar[3].placeholder}
                  val={role}
                  options={["Entrepreneur", "Content creator", "Business"]}
                  setvalue={setRole}
                />
              </div>
              {/* ))} */}
            </div>
            <div className="w-t-us ">
              <h2 className={`${Font.label} ${Font.medium} ${Font.font}`}>
                Write to us
              </h2>
              <textarea
                name=""
                id=""
                value={writetous}
                onChange={(e) => setWritetous(e.target.value)}
                cols="30"
                rows="10"
                placeholder="Write here..."
              ></textarea>
            </div>
            {error && (
              <p
                className={`${Font.label} ${Font.label} ${Font.font}`}
                style={{ color: "red" }}
              >
                {error}
              </p>
            )}
            <br />
            <div className="check-box items-center">
              <input
                type="checkbox"
                onChange={() => {
                  if (isAccepted === null || !isAccepted) setIsAccepted(true);
                  else if (isAccepted) setIsAccepted(false);
                }}
              />
              <p className={`${Font.font} ${Font.label} ${Font.regular}`}>
                I accept the{" "}
                <a href="term-service">
                  <span
                    className={`${Font.font} ${Font.label} ${Font.regular}`}
                    style={{ color: "#ff3520" }}
                  >
                    terms & conditions
                  </span>
                </a>{" "}
                {/* and <span>privacy policy</span> */}
                and privacy policy
                {!isAccepted && isAccepted !== null && (
                  <span style={{ fontSize: 16 }}>*</span>
                )}
              </p>
            </div>
            <div className="contact-button">
              <div
                className="home-button"
                type="submit"
                onClick={submitHandler}
              >
                <a href="">Let’s talk</a>
              </div>
            </div>
          </div>
          <div className="contact-img">
            <img src={Postbox} alt="" style={{ width: 456, height: 347 }} />
          </div>
        </form>
      </div>

      <div className="container resp" style={{ marginBottom: "40px" }}>
        <div className="container-heading">
          <p className="container-heading-contact">Contact Us</p>
          <img src={Ractangle} className="" alt="" />
        </div>
        <form className="main-contact">
          <div className="input-box">
            <h2 className={`${Font.label} ${Font.medium} ${Font.font}`}>
              {iBar[0].head}
            </h2>
            <input
              onChange={(e) => setName(e.target.value)}
              value={fullname}
              type="text"
              placeholder={iBar[0].placeholder}
            />
          </div>
          <div className="input-box">
            <h2 className={`${Font.label} ${Font.medium} ${Font.font}`}>
              {iBar[1].head}
            </h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setWorkEmail(e.target.value)}
              placeholder={iBar[1].placeholder}
            />
          </div>
          <div className="input-box">
            <h2 className={`${Font.label} ${Font.medium} ${Font.font}`}>
              {iBar[2].head}
            </h2>
            <input
              type="text"
              value={pnumber}
              onChange={(e) => setMobileNum(e.target.value)}
              placeholder={iBar[2].placeholder}
            />
          </div>
          <div className="input-box">
            <h2 className={`${Font.label} ${Font.medium} ${Font.font}`}>
              {iBar[3].head}
            </h2>
            {/* <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder={iBar[3].placeholder}
                /> */}
            <Dropdown
              placeholder={iBar[3].placeholder}
              val={role}
              options={["Entrepreneur", "Content creator", "Business"]}
              setvalue={setRole}
            />
          </div>

          <div className="w-t-us ">
            <h2 className={`${Font.label} ${Font.medium} ${Font.font}`}>
              Write to us
            </h2>
            <textarea
              name=""
              id=""
              value={writetous}
              onChange={(e) => setWritetous(e.target.value)}
              cols="30"
              rows="10"
              placeholder="Write here..."
            ></textarea>

            <div className="check-box ">
              <input
                type="checkbox"
                onChange={() => {
                  if (isAccepted === null || !isAccepted) setIsAccepted(true);
                  else if (isAccepted) setIsAccepted(false);
                }}
                name=""
                id=""
              />
              <p className={`${Font.font} ${Font.label} ${Font.regular}`}>
                I accept the{" "}
                <a href="term-service">
                  <span
                    className={`${Font.font} ${Font.label} ${Font.regular}`}
                    style={{ color: "#ff3520" }}
                  >
                    terms & conditions
                  </span>
                </a>{" "}
                {/* and <span>privacy policy</span> */}
                and privacy policy
                {!isAccepted && isAccepted !== null && (
                  <span style={{ fontSize: 16 }}>*</span>
                )}
              </p>
            </div>
          </div>
          {error && (
            <p
              className={`${Font.label} ${Font.label} ${Font.font}`}
              style={{ color: "red" }}
            >
              {error}
            </p>
          )}

          <div className="contact-button">
            <div className="home-button" type="submit" onClick={submitHandler}>
              <a href="">Let’s talk</a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
const iBar = [
  { head: "Name", placeholder: "Enter your full name" },
  { head: "Work Email ID", placeholder: "Enter your work email" },
  { head: "Mobile Number", placeholder: "Enter your full name" },
  { head: "Profile", placeholder: "Select your profile" },
];

export default Contact;

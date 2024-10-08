import React, { useState } from "react";
import ReactSelect from "react-select";
import { Button, Font, Options, Themes } from "../../../styling/Styles";
import { Plus, X } from "../../assets/Icons";
import "./editSelf.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditSelf(props) {
  const user = props.user;
  const token = props.token;
  const [name, setName] = useState(user.name);
  const [about, setAbout] = useState(user.about);
  const [education, setEducation] = useState(user.education);
  const [location, setLocation] = useState(user.location);
  const [website, setWebsite] = useState(user.website_link);
  const [instagram, setInstagram] = useState(user.instagram);
  const [twitter, setTwitter] = useState(user.twitter);
  const [youtube, setYoutube] = useState(user.youtube);
  const [facebook, setFacebook] = useState(user.facebook);
  const [linkedin, setLinkedin] = useState(user.linkedin);
  const [canSubmit, setCanSubmit] = useState(true);

  const [openaddnewexp, setOpenAddnewexp] = useState(false);
  const [experience, setExperience] = useState([...user?.experience]);

  const [error, setError] = useState(false);
  let exp = [...experience];

  const Experience = (props) => {
    const { experience, setExperience, show, item, i } = props;
    const [isWorking, setIsWorking] = useState(item.isWorking);
    const [compName, setCompName] = useState(item.comName);
    const [startDateM, setstartDateM] = useState(item.start?.month || "");
    const [startDateY, setstartDateY] = useState(item.start?.year || "");
    const [endDateM, setendDateM] = useState(item.end?.month || "");
    const [endDateY, setendDateY] = useState(item.end?.year || "");
    // comName: "",
    // start: { month: "", year: "" },
    // end: { month: "", year: "" },

    const handleChangeExp = (val, type) => {
      let comN = compName;
      let stM = startDateM;
      let stY = startDateY;
      let edM = endDateM;
      let edY = endDateY;
      let working = isWorking;
      switch (type) {
        case "compName":
          setCompName(val);
          comN = val;
          break;
        case "startDateM":
          setstartDateM(val);
          stM = val;
          break;
        case "startDateY":
          setstartDateY(val);
          stY = val;
          break;
        case "endDateM":
          setendDateM(val);
          edM = val;
          break;
        case "endDateY":
          setendDateY(val);
          edY = val;
          break;
        case "isWorking":
          setendDateM("");
          setendDateY("");
          edM = "";
          edY = "";
          setIsWorking(val);
          working = val;
          break;
        default:
          break;
      }
      let obj = {
        comName: comN,
        start: { month: stM, year: stY },
        end: { month: edM, year: edY },
        isWorking: working,
      };
      exp[i] = obj;
      console.log(exp);
    };

    const ClickAddHandler = () => {
      let edM = endDateM;
      let edY = endDateY;
      if (isWorking) {
        edM = "";
        edY = "";
      }
      const expob = [
        {
          comName: compName,
          start: { month: startDateM, year: startDateY },
          end: { month: edM, year: edY },
          isWorking: isWorking,
        },
      ];
      if (compName !== "" && startDateM !== "" && startDateY !== "") {
        console.log("added");
        let a = [];
        a = [...experience, ...expob];
        // setExperience([...experience, ...expob]);
        setOpenAddnewexp(false);
        exp = [...a];
        setExperience([...a]);
      }
    };

    return (
      <>
        <div className="edit-experience flex flex-col p-0 gap-6 w-full">
          <div className="flex flex-row justify-between items-center py-4 px-0 ">
            <p className={`${Font.font} ${Font.subheadline} ${Font.medium}`}>
              Experience {`${i + 1}`}
            </p>
            {/* On click below button experience remove the experiece from backend data */}
            <div
              onClick={() => deleteExp(item)}
              className={`${Button.button} ${Button.tertiary} ${Button.large}`}>
              <p
                className={`${Font.font} ${Font.body1} ${Font.medium}`}
                style={{ color: "#FF3520" }}>
                Remove
              </p>
            </div>
          </div>
          <div
            className="flex flex-col p-0 edit-name-box"
            style={{ width: "100%" }}>
            <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
              Company Name
            </p>
            <label
              htmlFor="editcomp"
              className={`input ${false && "error"} ${false && "disable"}`}>
              <input
                type="text"
                id="editcomp"
                value={compName}
                onChange={(e) => handleChangeExp(e.target.value, "compName")}
                placeholder="Hindustan Times"
              />
            </label>
          </div>
          <div
            className="flex flex-col p-0 edit-name-box inputborder"
            style={{ width: "100%" }}>
            <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
              Start Date
            </p>
            <div className="w-full flex flex-row justify-between">
              <div style={{ width: 423 }}>
                <Dropdown
                  placeholder="Month"
                  onChange={(e) => console.log(e)}
                  val={startDateM}
                  type={"startDateM"}
                  options={month}
                  setvalue={handleChangeExp}
                />
              </div>
              <div style={{ width: 423 }}>
                <Dropdown
                  placeholder="Year"
                  options={years}
                  type={"startDateY"}
                  val={startDateY}
                  setvalue={handleChangeExp}
                />
              </div>
            </div>
          </div>
          <div
            className="flex flex-col p-0 edit-name-box inputborder"
            style={{ width: "100%" }}>
            <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
              End Date
            </p>
            <div className="w-full flex flex-row justify-between">
              <div style={{ width: 423 }}>
                <Dropdown
                  placeholder="Month"
                  disable={isWorking}
                  type={"endDateM"}
                  val={endDateM}
                  options={month}
                  setvalue={handleChangeExp}
                />
              </div>
              <div style={{ width: 423 }}>
                <Dropdown
                  placeholder="Year"
                  disable={isWorking}
                  type={"endDateY"}
                  val={endDateY}
                  options={years}
                  setvalue={handleChangeExp}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row p-1 gap-3 h-6">
            <input
              type="checkbox"
              id=""
              checked={isWorking}
              style={{ width: 16, height: 16 }}
              onChange={(e) => {
                handleChangeExp(e.target.checked, "isWorking");
              }}
            />
            <p
              className={`${Font.font} ${Font.label} ${Font.regular} text-end`}
              style={{ marginTop: 2 }}>
              I am currently working in this role
            </p>
          </div>
        </div>
        {openaddnewexp && show && (
          <div className="w-full flex">
            <div
              className={`${Button.button} ${Button.secondary} ${Button.medium}`}
              onClick={() => {
                ClickAddHandler();
                // console.log(experience);s
              }}>
              <p
                className={`${Font.font} ${Font.body2} ${Font.medium}`}
                style={{ color: "#242424" }}>
                Add
              </p>
            </div>
          </div>
        )}
      </>
    );
  };
  //
  var currentYear = new Date().getFullYear();
  var years = [];

  for (let i = currentYear; i >= 1980; i--) {
    years.push(i);
  }

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const navigate = useNavigate();

  const isValidUrl = (urlString) => {
    var inputElement = document.createElement("input");
    inputElement.type = "url";
    inputElement.value = urlString;

    if (!inputElement.checkValidity()) {
      return false;
    } else {
      return true;
    }
  };

  const Dropdown = (props) => {
    const [val, setVal] = useState(
      props.val === "" ? "" : { label: props.val, value: null }
    );
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
      props.setvalue(a, props.type);
    };

    return (
      <ReactSelect
        options={option}
        value={val}
        className="w-full"
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

  const deleteExp = (val) => {
    if (val.comName !== "") {
      let arr = [];
      arr = [...arr, ...experience];
      arr = arr.filter(function (item) {
        return item !== val;
      });
      setExperience([...arr]);
    } else setOpenAddnewexp(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("clicked");

      const sendData = {
        userid: user._id,
        name: name,
        about: about,
        education: education,
        location: location,
        website_link: website,
        social_media: {
          instagram: instagram,
          twitter: twitter,
          facebook: facebook,
          youtube: youtube,
          linkedin: linkedin,
        },
        experience: [...exp],
      };
      console.log("here", sendData);

      console.log("experience..", exp);
      const { data } = await axios
        .put("/update", { ...sendData }, config)
        .catch((err) => console.log(err));

      //to update experience and fetch featured links
      // let flag = false;
      // let expData;
      // console.log("exp..", exp, exp.length);
      // if (exp.length > 0) {
      //   flag = true;
      //   const expPayload = {
      //     id: user._id,
      //     name: name,
      //     experience: [...exp],
      //   };
      //   expData = await axios
      //     .put("/updateFeaturedLink", { ...expPayload }, config)
      //     .catch((err) => console.log(err));
      // }
      // console.log("expData..", expData);

      props.setEditPop(false);

      // if (flag) {
      //   if (expData) {
      //     localStorage.setItem("userInfo", JSON.stringify(expData.data));
      //     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      //     props.setUser(userInfo);
      //   }
      // } else {
      if (data) {
        console.log("ballerleradf....", data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        props.setUser(userInfo);
      }
      // }
      // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      // props.setUser(userInfo);

      props.setEditPop(!props.editPop);
    } catch (error) {
      setError("Invalid user");
      console.log("error");
    }
  };

  const expnew = {
    comName: "",
    start: { month: "", year: "" },
    end: { month: "", year: "" },
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="edit-box">
        <div className="edit-container flex flex-col justify-center pt-4 pb-8 ">
          <div className="edit-head">
            <p className={`${Font.font} ${Font.heading1} ${Font.medium}`}>
              Edit Profile
            </p>
            <div
              onClick={() => props.setEditPop(false)}
              style={{ cursor: "pointer" }}>
              <X height="24" width="24" color="#101828" />
            </div>
          </div>
          <div className="edit-over edit-overflow ">
            <div className="flex flex-col items-center p-7 gap-6 w-full">
              <div className="flex flex-row p-0 justify-between gap-8 w-full">
                <div className="flex flex-col p-0 edit-name-box w-full">
                  <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
                    Name
                  </p>
                  <label
                    htmlFor="editname"
                    className={`input ${false && "error"} ${
                      false && "disable"
                    }`}>
                    <input
                      type="text"
                      id="editname"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-col justify-center p-0 edit-name-box w-full">
                <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
                  About
                </p>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  id="aboutComp"
                  maxLength={400}
                  cols={6}
                  className={`${Font.font} ${Font.body1} ${Font.regular} edit-prof-about`}
                  style={{ height: 153, width: "100%" }}
                />
              </div>
              <div className="flex flex-row p-0 justify-between gap-8 w-full">
                {user.role !== "Business" && (
                  <div
                    className="flex flex-col p-0 edit-name-box"
                    style={{ width: 423 }}>
                    <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
                      Education
                    </p>
                    <label
                      htmlFor="editEducation"
                      className={`input ${false && "error"} ${
                        false && "disable"
                      }`}>
                      <input
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        type="text"
                        id="editEducation"
                        placeholder="Education"
                      />
                    </label>
                  </div>
                )}
                <div
                  className="flex flex-col p-0 edit-name-box"
                  style={{ width: 423 }}>
                  <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
                    Location
                  </p>
                  <label
                    htmlFor="editLocation"
                    className={`input ${false && "error"} ${
                      false && "disable"
                    }`}>
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      type="text"
                      id="editLocation"
                      placeholder="Location"
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-row p-0 justify-between gap-8 w-full">
                <div
                  className="flex flex-col p-0 edit-name-box"
                  style={{ width: 423 }}>
                  <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
                    Website Link
                  </p>
                  <label
                    htmlFor="editEducation"
                    className={`input ${false && "error"} ${
                      false && "disable"
                    }`}>
                    <input
                      value={website}
                      onChange={(e) => {
                        if (isValidUrl(e.target.value)) {
                          setCanSubmit(true);
                          setError("");
                        } else {
                          // setCanSubmit(false);
                          // setError("Enter a valid link");
                        }
                        setWebsite(e.target.value);
                      }}
                      type="text"
                      id="editEducation"
                      placeholder="Paste website link here"
                    />
                  </label>
                </div>
                <div
                  className="flex flex-col p-0 edit-name-box"
                  style={{ width: 423 }}>
                  <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
                    Instagram
                  </p>
                  <label
                    htmlFor="editLocation"
                    className={`input ${false && "error"} ${
                      false && "disable"
                    }`}>
                    <input
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      type="text"
                      id="editLocation"
                      placeholder="Instagram"
                    />
                  </label>
                  {/* <p className={`${Font.font} ${Font.regular} ${Font.label}`} style={{color:'#616161'}} >You can add multiple links here</p> */}
                </div>
              </div>
              <div className="flex flex-row p-0 justify-between gap-8 w-full">
                <div
                  className="flex flex-col p-0 edit-name-box"
                  style={{ width: 423 }}>
                  <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
                    Twitter
                  </p>
                  <label
                    htmlFor="editLocation"
                    className={`input ${false && "error"} ${
                      false && "disable"
                    }`}>
                    <input
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                      type="text"
                      id="editLocation"
                      placeholder="Twitter"
                    />
                  </label>
                  {/* <p className={`${Font.font} ${Font.regular} ${Font.label}`} style={{color:'#616161'}} >You can add multiple links here</p> */}
                </div>
                <div
                  className="flex flex-col p-0 edit-name-box"
                  style={{ width: 423 }}>
                  <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
                    Youtube
                  </p>
                  <label
                    htmlFor="editLocation"
                    className={`input ${false && "error"} ${
                      false && "disable"
                    }`}>
                    <input
                      value={youtube}
                      onChange={(e) => setYoutube(e.target.value)}
                      type="text"
                      id="editLocation"
                      placeholder="Youtube"
                    />
                  </label>
                  {/* <p className={`${Font.font} ${Font.regular} ${Font.label}`} style={{color:'#616161'}} >You can add multiple links here</p> */}
                </div>
              </div>
              <div className="flex flex-row p-0 justify-between gap-8 w-full">
                <div
                  className="flex flex-col p-0 edit-name-box"
                  style={{ width: 423 }}>
                  <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
                    LinkedIn
                  </p>
                  <label
                    htmlFor="editLocation"
                    className={`input ${false && "error"} ${
                      false && "disable"
                    }`}>
                    <input
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      type="text"
                      id="editLocation"
                      placeholder="LinkedIn"
                    />
                  </label>
                  {/* <p className={`${Font.font} ${Font.regular} ${Font.label}`} style={{color:'#616161'}} >You can add multiple links here</p> */}
                </div>
                <div
                  className="flex flex-col p-0 edit-name-box"
                  style={{ width: 423 }}>
                  <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
                    Facebook
                  </p>
                  <label
                    htmlFor="editLocation"
                    className={`input ${false && "error"} ${
                      false && "disable"
                    }`}>
                    <input
                      value={facebook}
                      onChange={(e) => setFacebook(e.target.value)}
                      type="text"
                      id="editLocation"
                      placeholder="Facebook"
                    />
                  </label>
                  {/* <p className={`${Font.font} ${Font.regular} ${Font.label}`} style={{color:'#616161'}} >You can add multiple links here</p> */}
                </div>
              </div>
              {experience.map((item, i) => (
                <Experience
                  setExperience={setExperience}
                  experience={experience}
                  show={false}
                  key={i}
                  item={item}
                  i={i}
                />
              ))}
              {openaddnewexp && (
                <Experience
                  setExperience={setExperience}
                  experience={experience}
                  show={true}
                  item={expnew}
                  i={experience.length}
                />
              )}
              {!openaddnewexp && user.role !== "Business" && (
                <div className="w-full flex">
                  <div
                    className={`${Button.button} ${Button.secondary} ${Button.medium}`}
                    onClick={() => setOpenAddnewexp(true)}>
                    <Plus color="#242424" width={16} height={16} />
                    <p
                      className={`${Font.font} ${Font.body2} ${Font.medium}`}
                      style={{ color: "#242424" }}>
                      Add New Experience
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-row items-center pt-4 gap-1 px-8">
            <div className="flex flex-row items-start p-0 gap-4">
              {error && (
                <p
                  className={`${Font.font} ${Font.label} ${Font.medium}`}
                  style={{ color: "#FF3520" }}>
                  {`${error}`}
                </p>
              )}
              {canSubmit ? (
                <button
                  type="submit"
                  className={`${Button.button} ${Button.primary} ${Button.large}`}>
                  <p className={`${Font.font} ${Font.body1} ${Font.medium}`}>
                    Save Changes
                  </p>
                </button>
              ) : (
                <button
                  type="submit"
                  className={`${Button.button} ${Button.secondary} ${Button.large}`}
                  disabled
                  style={{ backgroundColor: "lightgrey" }}>
                  <p className={`${Font.font} ${Font.body1} ${Font.medium}`}>
                    Save Changes
                  </p>
                </button>
              )}
              <div
                className={`${Button.button} ${Button.secondary} ${Button.large}`}
                onClick={() => props.setEditPop(false)}>
                <p className={`${Font.font} ${Font.body1} ${Font.medium}`}>
                  Cancel
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditSelf;

import { Dialog } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import Tooltip from "react-power-tooltip";
import Compressor from "compressorjs";
import { Avtar, Button, Font } from "../../../styling/Styles";
import {
  AlertTriangle,
  Edit2,
  LogOut,
  MoreVertical,
  Plus,
  Share2,
  Delete,
  ChevronRight,
} from "../../assets/Icons";
import SocialMediaIcon, { MediaImage } from "../../assets/SocialMediaIcon";
import EditSelf from "./EditSelf";
import "./profile.css";
import { UserContext } from "../../Navigation";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import { formatDate } from "../../../utils/configDate";
import { trimText } from "../../../utils/trimText";

function ProfileSelf() {
  const navigate = useNavigate();

  const [profilepop, setProfilepop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [noticeProg, setNoticeProg] = useState(true);

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

  const [imageUrl, setImageUrl] = useState(user.pic);
  // console.log("imageUrl = ", imageUrl);
  const fetchImageUrl = async () => {
    try {
      const config = {
        headers: {
          ContentType: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        "/getProfilePic",
        {
          userId: `${user._id}`,
        },
        config
      );
      setImageUrl(data.imageUrl);

      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      userInfo.pic = data.imageUrl;
      // console.log("userInfo = ", userInfo);
      setUser(userInfo);
      // console.log("imageUrl = ", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImageUrl();
  }, [user.pic]);
  //
  const groupNames = chats.filter((chatData) => chatData.isGroupChat);
  // console.log("GroupName...", groupNames);

  const [sharepop, setSharepop] = useState(false);

  // console.log(user.pic);
  const handleLogout = () => {
    navigate("/");
    setToken("");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userToken");
    localStorage.removeItem("selectedChatInfo");
  };
  const PopupIN = () => {
    return (
      <>
        <Tooltip
          show={profilepop}
          position="bottom left"
          textBoxWidth="320px"
          padding="12px 16px"
          hoverBackground="#F5F5F5"
          backgroundColor="#fff"
          moveRight="-255px"
          flat={true}>
          <div className="prof-pop">
            <Share2 color="#616161" />
            <p className={`${Font.body2} ${Font.medium} ${Font.font} `}>
              Share profile
            </p>
          </div>
          <div onClick={handleLogout} className="prof-pop">
            <LogOut color="#616161" />
            <p className={`${Font.body2} ${Font.medium} ${Font.font} `}>
              Logout
            </p>
          </div>
        </Tooltip>
      </>
    );
  };
  // /
  const [linkpoparr, setLinkpoparr] = useState([false, false, false]);
  const [achievmentpoparr, setAchievmentpoparr] = useState([
    false,
    false,
    false,
  ]);
  const [allLinks, setAllLinks] = useState([]);
  const [allAchive, setAllAchive] = useState(user.achivement || []);
  const [link, setLink] = useState();
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [achive, setAchive] = useState(false);

  const fetchFeaturedLinks = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `/featuredlink/${user._id}/getFeaturedLinksByUserId?limit=${3}&page=${1}`,
      config
    );

    setAllLinks(data.featuredLinks);
  };

  useEffect(() => {
    fetchFeaturedLinks();
  }, []);

  const [file, setFile] = useState(user.pic);
  function handleChange(e) {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
    uploadImage(e);
  }

  const uploadImage = async (e) => {
    console.log(token);
    e.preventDefault();
    try {
      const config = {
        headers: {
          ContentType: "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const formData = new FormData();

      // formData.append("userid", user._id);
      // formData.append("profilePic", e.target.files[0]);

      await new Compressor(e.target.files[0], {
        quality: 0.6,
        success: async (result) => {
          // compressedResult has the compressed file.
          // Use the compressed file to upload the images to your server.

          formData.append("userid", user._id);
          formData.append("profilePic", result);

          const { data } = await axios.post("/uploadPic", formData, config);

          console.log("image = ", data);

          localStorage.setItem("userInfo", JSON.stringify(data));
          const userInfo = JSON.parse(localStorage.getItem("userInfo"));
          setUser(userInfo);
        },
        error(err) {
          console.log(err.message);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFeatureLink = async (featureLinkData) => {
    console.log("function ran...", featureLinkData);

    const { data } = await axios.delete("/featuredlink/removeFeaturedLink", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        Id: `${featureLinkData._id}`,
      },
    });
    fetchFeaturedLinks();

    console.log("Feature link deleted...", data);
  };

  const deleteAchievementLink = async (ind) => {
    console.log("function ran...", ind);

    const { data } = await axios.delete("/removeAchievement", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        userId: `${user._id}`,
        index: `${ind}`,
      },
    });

    setAllAchive(data.achivement);
    localStorage.setItem("userInfo", JSON.stringify(data));
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    console.log("Feature link after delete...", data);
  };

  const Links = ({ type, val, i, data }) => {
    const Share = () => {
      return (
        <>
          <Tooltip
            show={val === "link" ? linkpoparr[i] : achievmentpoparr[i]}
            position="top left"
            textBoxWidth="100px"
            padding="8px 0px"
            hoverBackground="#fff"
            backgroundColor="#fff"
            moveRight="15px"
            flat={true}>
            <div className="prof-pop">
              <Share2 color="#616161" />
              <p className={`${Font.body2} ${Font.medium} ${Font.font} `}>
                Share
              </p>
            </div>
            <div
              className="prof-pop"
              onClick={() => {
                val === "link"
                  ? deleteFeatureLink(data)
                  : deleteAchievementLink(i);
              }}>
              <Delete color="#616161" />
              <p className={`${Font.body2} ${Font.medium} ${Font.font} `}>
                Remove
              </p>
            </div>
          </Tooltip>
        </>
      );
    };
    // /
    //change the array size with the number of links used in APIS with initialize with value false

    const handleClickSharepop = (type, i) => {
      if (type === "link") {
        let arr = [];
        for (let i = 0; i < linkpoparr.length; i++) {
          arr.push(false);
        }
        arr[i] = !linkpoparr[i];
        setLinkpoparr([...arr]);
      } else if (type === "achie") {
        let arr = [];
        for (let i = 0; i < achievmentpoparr.length; i++) {
          arr.push(false);
        }
        arr[i] = !achievmentpoparr[i];
        setAchievmentpoparr([...arr]);
      }
    };

    return (
      <>
        <div className="desktop link-box">
          <div className="flex flex-row justify-between items-start py-3 px-4 w-full">
            <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
              {type}
            </p>
            <div
              className="share-pop"
              onClick={() => handleClickSharepop(val, i)}
              style={{ position: "relative", cursor: "pointer" }}>
              <Share />
              <MoreVertical color="#101828" />
            </div>
          </div>
          <div className="p-2 w-full">
            <a href={data.link}>
              {!data.image && <img src="" alt="" className="p-link-img" />}
              {data.image && (
                <>
                  {
                    // <div className="profile-dummy-link">
                    // <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
                    //   Fetched Image
                    // </p>
                    // </div>
                  }
                  <div className="featured-link-image-div">
                    <img src={`${data.image}`} alt="" className="p-link-img" />
                  </div>
                </>
              )}
            </a>
          </div>
          <div className="flex flex-col items-start py-3 px-4 gap-3 w-full">
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className={`${Font.font} ${Font.label} ${Font.regular}`}>
                {formatDate(data.date)}
              </p>
              <a
                href={data.link}
                className={`${Font.font} ${Font.body1} ${Font.medium}`}
                style={{ color: "#242424" }}>
                {trimText(data.title, 50)}
              </a>
            </div>
          </div>
        </div>

        <div className="resp">
          <div className="link-box">
            <div
              className="flex flex-row justify-between"
              style={{ padding: "12px 16px" }}>
              <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
                {type}
              </p>
              <div
                className="share-pop"
                onClick={() => handleClickSharepop(val, i)}
                style={{ position: "relative", cursor: "pointer" }}>
                <Share />
                <MoreVertical color="#101828" />
              </div>
            </div>

            <div className="p-2 w-full">
              <a href={data.link}>
                {!data.image && <img src="" alt="" className="p-link-img" />}
                {data.image && (
                  <>
                    <div className="featured-link-image-div">
                      <img
                        src={`${data.image}`}
                        alt=""
                        className="p-link-img"
                      />
                    </div>
                  </>
                )}
              </a>
            </div>

            <div className="link-box-details">
              <p className={`${Font.font} ${Font.label} ${Font.regular}`}>
                {formatDate(data.date)}
              </p>

              <a
                href={data.link}
                className={`${Font.font} ${Font.body1} ${Font.medium}`}>
                {trimText(data.title, 30)}
              </a>
            </div>
          </div>
          {/* <div className="flex flex-row justify-between items-start py-3 px-4 w-full">
            
          </div>
          
          <div className="flex flex-col items-start py-3 px-4 gap-3 w-full">
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              
              <a
                href={data.link}
                className={`${Font.font} ${Font.body1} ${Font.medium}`}
                style={{ color: "#242424" }}
              >
                {trimText(data.title, 70)}
              </a>
            </div>
          </div> */}
        </div>
      </>
    );
  };
  const [addlinkpop, setAddlinkpop] = useState(false);

  // console.log("user... = ", user, "file ...= ", file, typeof file === "string");

  return (
    <>
      <Dialog
        fullWidth={false}
        maxWidth="xl"
        open={editPop}
        onClose={() => setEditPop(false)}>
        <EditSelf
          editPop={editPop}
          user={user}
          setUser={setUser}
          setEditPop={setEditPop}
          token={token}
        />
      </Dialog>
      <Dialog
        fullWidth={false}
        maxWidth="xl"
        open={addlinkpop}
        onClose={() => setAddlinkpop(false)}>
        <div className="addlinkpop">
          <label htmlFor="thislink" className="inputborder">
            <p>Fill the link</p>
            <input
              required
              onChange={(e) => setLink(e.target.value)}
              type="url"
              name=""
              id="thislink"
            />
          </label>
          <label htmlFor="heading" className="inputborder">
            <p>Heading</p>
            <input
              required
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name=""
              id="heading"
            />
          </label>
          <label htmlFor="date" className="inputborder">
            <p>Date of publish</p>
            <input
              required
              onChange={(e) => setDate(e.target.value)}
              type="date"
              name=""
              id="date"
            />
          </label>
          <div
            onClick={async (e) => {
              e.preventDefault();
              try {
                const config = {
                  headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                };

                const newf = { link, title, date };
                if (!link || !title || !date) return;

                let newAllLinks = allLinks;
                let newAllAchive = allAchive;

                if (!achive) {
                  if (allLinks) {
                    newAllLinks = [...allLinks, newf];
                  } else {
                    newAllLinks = [newf];
                  }
                } else {
                  if (allAchive) {
                    newAllAchive = [...allAchive, newf];
                  } else {
                    newAllAchive = [newf];
                  }
                }
                // userId, date, link, title
                // setAllAchive(...allAchive,{link,title,date})
                let data;
                if (!achive) {
                  await axios.put(
                    "/featuredlink/addFeaturedLinks",
                    {
                      userId: user._id,
                      ...newf,
                    },
                    config
                  );
                  fetchFeaturedLinks();
                } else {
                  data = await axios.put(
                    "/updateAchievement",
                    {
                      userId: user._id,
                      achievementLinks: newAllAchive,
                    },
                    config
                  );
                }

                // const featureLinksData = await axios.get(
                //   `/featuredlink/${
                //     user._id
                //   }/getFeaturedLinksByUserId?limit=${3}&page=${1}`,
                //   config
                // );

                const reqData = data.data;
                // setAllLinks(featureLinksData.data.featuredLinks);
                setAllAchive(reqData?.achivement || []);
                setLink();
                setTitle();
                setDate();

                if (reqData) {
                  localStorage.setItem("userInfo", JSON.stringify(reqData));
                  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

                  setUser(userInfo);
                }
                setAddlinkpop(false);
              } catch (error) {
                setAddlinkpop(false);
              }
            }}
            className={`${Button.button} ${Button.primary} ${Button.medium}`}>
            <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>Save</p>
          </div>
        </div>
      </Dialog>

      <>
        <div className="desktop profile-name-box">
          <label htmlFor="image-upload">
            {!user.pic && (
              <div className={`p-n-b-avtar ${Avtar["avtar-3"]} ${Avtar.avtar}`}>
                <img
                  className={`${Avtar.avtar} ${Avtar["avtar-3"]}`}
                  src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                  alt=""
                />
              </div>
            )}

            {user.pic && (
              <img
                className={`${Avtar.avtar} ${Avtar["avtar-3"]}`}
                src={`${imageUrl}`}
                alt=""
              />
            )}
          </label>
          <input
            // hidden
            type="file"
            id="image-upload"
            name="profileimg"
            accept="image/*"
            onChange={handleChange}
            style={{ display: "none" }}
          />
          <div className="p-n-b-container">
            <div className="member-info-top">
              <div className="m-i-t-left">
                <p className={`${Font.heading2} ${Font.medium} ${Font.font}`}>
                  {user.name}
                </p>
                <p className={`${Font.body1} ${Font.regular} ${Font.font}`}>
                  {user.role}
                </p>
              </div>
              <div className="m-i-t-right">
                <div
                  onClick={() => setEditPop(true)}
                  className={`${Button.button} ${Button.secondary} ${Button.medium}`}>
                  <h1>
                    <Edit2 height="16" width="16" color={"#242424"} />
                  </h1>
                  <p className={`${Font.body2} ${Font.medium} ${Font.font}`}>
                    Edit
                  </p>
                </div>

                <div
                  style={{ position: "relative" }}
                  className={`profile-pop ${Button.button} ${Button.secondary} ${Button.iconmedium}`}
                  onClick={() => setProfilepop(!profilepop)}>
                  <MoreVertical color={"#242424"} />
                  <PopupIN />
                </div>
              </div>
            </div>
            <div className="member-info-bottom">
              <p
                className={`${Font.font} ${Font.label} ${Font.medium}`}
                style={{ color: "#B3B3B3" }}>
                Groups:
              </p>
              <div className="bottom-bottom">
                {
                  //   <p className="tag">Prime Reporter</p>
                  // <p className="tag">International Media</p>
                  // <p className="tag">Sports Journamlism</p>
                }
                {groupNames &&
                  groupNames.slice(0, 5).map((group, index) => {
                    return (
                      <p key={`self${index}`} className="tag">
                        {group.chatName}
                      </p>
                    );
                  })}
                {groupNames.length > 5 ? (
                  <p
                    className={`pt-1 ${Font.font} ${Font.body2} ${Font.regular}`}>
                    {`..... and ${groupNames.length - 5} more`}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="resp profile-name-box">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}>
            <label htmlFor="image-upload">
              {!user.pic && (
                <div
                  className={`p-n-b-avtar ${Avtar["avtar-1"]} ${Avtar.avtar}`}>
                  <img
                    className={`${Avtar.avtar} ${Avtar["avtar-1"]}`}
                    src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                    alt=""
                  />
                </div>
              )}

              {user.pic && (
                <img
                  className={`${Avtar.avtar} ${Avtar["avtar-1"]}`}
                  src={`${imageUrl}`}
                  alt=""
                />
              )}
            </label>
            <input
              // hidden
              type="file"
              id="image-upload"
              name="profileimg"
              accept="image/*"
              onChange={handleChange}
              style={{ display: "none" }}
            />

            <div className="m-i-t-right">
              <div
                onClick={() => setEditPop(true)}
                className={`${Button.button} ${Button.secondary} ${Button.medium}`}
                style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                <h1>
                  <Edit2 height="20" width="20" color={"#242424"} />
                </h1>
                <p className={`${Font.body2} ${Font.medium} ${Font.font}`}>
                  Edit
                </p>
              </div>

              <div
                style={{ position: "relative", padding: "12px" }}
                className={`profile-pop ${Button.button} ${Button.secondary} ${Button.iconmedium}`}
                onClick={() => setProfilepop(!profilepop)}>
                <MoreVertical color={"#242424"} />
                <PopupIN />
              </div>
            </div>
          </div>

          <div className="m-i-t-left">
            <p className={`${Font.heading2} ${Font.medium} ${Font.font}`}>
              {user.name}
            </p>
            <p className={`${Font.body1} ${Font.regular} ${Font.font}`}>
              {user.role}
            </p>
          </div>

          <div className="member-info-bottom">
            <p
              className={`${Font.font} ${Font.label} ${Font.medium}`}
              style={{ color: "#B3B3B3" }}>
              Groups:
            </p>
            <div className="bottom-bottom">
              {
                //   <p className="tag">Prime Reporter</p>
                // <p className="tag">International Media</p>
                // <p className="tag">Sports Journamlism</p>
              }
              {groupNames &&
                groupNames.slice(0, 5).map((group, index) => {
                  return (
                    <p key={`self${index}`} className="tag">
                      {group.chatName}
                    </p>
                  );
                })}
              {groupNames.length > 5 ? (
                <p
                  className={`pt-1 ${Font.font} ${Font.body2} ${Font.regular}`}>
                  {`..... and ${groupNames.length - 5} more`}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div className="desktop profile-about w-full box-border flex flex-col items-start py-6 px-10 mb-10">
          <div className="profile-about-des flex flex-col items-start py-6">
            <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
              About
            </p>
            <p
              className={`${Font.font} ${Font.body2} ${Font.regular} text-left`}
              style={{ maxWidth: 600, color: "#616161" }}>
              {user.about || (
                <span
                  className={`${Font.body2} ${Font.regular} ${Font.font}`}
                  style={{ color: "#138DEC", cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setEditPop(true);
                  }}>
                  Write about yourself
                </span>
              )}
            </p>
          </div>
          {user.role !== "Business" && (
            <div className="flex flex-col items-start py-6 gap-4">
              <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
                Experience
              </p>
              <div className={`flex flex-col items-start p-0 gap-4`}>
                <div className={`flex flex-col items-start gap-1 p-0`}>
                  {user.experience &&
                    user.experience.map((item, i) => (
                      <>
                        <p
                          className={`${Font.subheadline} ${Font.medium} ${Font.font}`}>
                          {item.comName}
                        </p>
                        <p
                          className={`${Font.body2} ${Font.regular} ${Font.font}`}
                          style={{ color: "#616161", marginBottom: "1rem" }}>
                          {item.start?.month.substr(0, 3)}{" "}
                          {item.start?.year % 100} -{" "}
                          {(item.isWorking && "present") ||
                            item.end?.month.substr(0, 3) +
                              " " +
                              (item.end?.year % 100)}
                        </p>
                      </>
                    ))}
                  {user.experience?.length === 0 && (
                    <span
                      className={`${Font.body2} ${Font.regular} ${Font.font}`}
                      style={{ color: "#138DEC", cursor: "pointer" }}
                      onClick={(e) => {
                        e.preventDefault();
                        setEditPop(true);
                      }}>
                      Add your experience
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className={`flex flex-row items-start py-6 gap-6 w-full`}>
            {user.role !== "Business" && (
              <div
                className={`flex flex-col items-start p-0 profile-about-des w-1/2`}>
                <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
                  Education
                </p>
                <p
                  className={`${Font.body2} ${Font.regular} ${Font.font}`}
                  style={{ color: "#616161" }}>
                  {user.education || (
                    <span
                      className={`${Font.body2} ${Font.regular} ${Font.font}`}
                      style={{ color: "#138DEC", cursor: "pointer" }}
                      onClick={(e) => {
                        e.preventDefault();
                        setEditPop(true);
                      }}>
                      Add your education
                    </span>
                  )}
                </p>
              </div>
            )}
            <div
              className={`flex flex-col items-start p-0 profile-about-des w-1/2`}>
              <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
                Location
              </p>
              <p
                className={`${Font.body2} ${Font.regular} ${Font.font}`}
                style={{ color: "#616161" }}>
                {user.location || (
                  <span
                    className={`${Font.body2} ${Font.regular} ${Font.font}`}
                    style={{ color: "#138DEC", cursor: "pointer" }}
                    onClick={(e) => {
                      e.preventDefault();
                      setEditPop(true);
                    }}>
                    Add your location
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className={`flex flex-row items-start py-6 gap-6 w-full`}>
            <div
              className={`flex flex-col items-start p-0 profile-about-des w-1/2`}>
              <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
                Website
              </p>
              <a
                href={`${user.website_link}`}
                className={`${Font.body2} ${Font.regular} ${Font.font}`}
                style={{ color: "#616161" }}>
                {user.website_link || (
                  <span
                    className={`${Font.body2} ${Font.regular} ${Font.font}`}
                    style={{ color: "#138DEC", cursor: "pointer" }}
                    onClick={(e) => {
                      e.preventDefault();
                      setEditPop(true);
                    }}>
                    Add your website
                  </span>
                )}
              </a>
            </div>
            <div
              className={`flex flex-col items-start p-0 profile-about-des w-1/2`}>
              <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
                Social Handles
              </p>
              <div className="flex flex-column items-start p-0">
                {user.twitter && (
                  <a href={user.twitter} target="_blank" rel="noreferrer">
                    {" "}
                    <MediaImage
                      link={SocialMediaIcon.twitter}
                      height={40}
                      width={40}
                    />
                  </a>
                )}
                {user.instagram && (
                  <a href={user.instagram} target="_blank" rel="noreferrer">
                    {" "}
                    <MediaImage
                      link={SocialMediaIcon.instagram}
                      height={40}
                      width={40}
                    />
                  </a>
                )}
                {user.linkedin && (
                  <a href={user.linkedin} target="_blank" rel="noreferrer">
                    {" "}
                    <MediaImage
                      link={SocialMediaIcon.linkedin}
                      height={40}
                      width={40}
                    />
                  </a>
                )}
                {user.youtube && (
                  <a href={user.youtube} target="_blank" rel="noreferrer">
                    {" "}
                    <MediaImage
                      link={SocialMediaIcon.youTube}
                      height={40}
                      width={40}
                    />
                  </a>
                )}
                {user.facebook && (
                  <a href={user.facebook} target="_blank" rel="noreferrer">
                    {" "}
                    <MediaImage
                      link={SocialMediaIcon.facebook}
                      height={40}
                      width={40}
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="resp profile-about w-full box-border flex flex-col items-start py-6 px-10 mb-10">
          <div className="profile-about-item">
            <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
              About
            </p>
            <p
              className={`${Font.font} ${Font.body2} ${Font.regular} text-left`}
              style={{ maxWidth: 600, color: "#616161" }}>
              {user.about || (
                <span
                  className={`${Font.body2} ${Font.regular} ${Font.font}`}
                  style={{ color: "#138DEC", cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setEditPop(true);
                  }}>
                  Write about yourself
                </span>
              )}
            </p>
          </div>

          {user.role !== "Business" && (
            <div className="profile-about-item">
              <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
                Experience
              </p>
              <div className={`flex flex-col items-start p-0 gap-4`}>
                <div className={`flex flex-col items-start gap-1 p-0`}>
                  {user.experience &&
                    user.experience.map((item, i) => (
                      <>
                        <p
                          className={`${Font.body2} ${Font.medium} ${Font.font}`}>
                          {item.comName}
                        </p>
                        <p
                          className={`${Font.body2} ${Font.regular} ${Font.font}`}
                          style={{ color: "#616161" }}>
                          {item.start?.month.substr(0, 3)}{" "}
                          {item.start?.year % 100} -{" "}
                          {(item.isWorking && "present") ||
                            item.end?.month.substr(0, 3) +
                              " " +
                              (item.end?.year % 100)}
                        </p>
                      </>
                    ))}
                  {user.experience?.length === 0 && (
                    <span
                      className={`${Font.body2} ${Font.regular} ${Font.font}`}
                      style={{ color: "#138DEC", cursor: "pointer" }}
                      onClick={(e) => {
                        e.preventDefault();
                        setEditPop(true);
                      }}>
                      Add your experience
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {user.role !== "Business" && (
            <div className="profile-about-item">
              <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
                Education
              </p>
              <p
                className={`${Font.body2} ${Font.regular} ${Font.font}`}
                style={{ color: "#616161" }}>
                {user.education || (
                  <span
                    className={`${Font.body2} ${Font.regular} ${Font.font}`}
                    style={{ color: "#138DEC", cursor: "pointer" }}
                    onClick={(e) => {
                      e.preventDefault();
                      setEditPop(true);
                    }}>
                    Add your education
                  </span>
                )}
              </p>
            </div>
          )}
          <div className="profile-about-item">
            <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
              Location
            </p>
            <p
              className={`${Font.body2} ${Font.regular} ${Font.font}`}
              style={{ color: "#616161" }}>
              {user.location || (
                <span
                  className={`${Font.body2} ${Font.regular} ${Font.font}`}
                  style={{ color: "#138DEC", cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setEditPop(true);
                  }}>
                  Add your location
                </span>
              )}
            </p>
          </div>

          <div className="profile-about-item">
            {" "}
            <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
              Website
            </p>
            <a
              href={`${user.website_link}`}
              className={`${Font.body2} ${Font.regular} ${Font.font}`}
              style={{ color: "#616161" }}>
              {`${trimText(user.website_link, 42) + "..."}` || (
                <span
                  className={`${Font.body2} ${Font.regular} ${Font.font}`}
                  style={{ color: "#138DEC", cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setEditPop(true);
                  }}>
                  Add your website
                </span>
              )}
            </a>
          </div>

          <div className="profile-about-item">
            <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
              Social Handles
            </p>
            <div className="flex flex-row items-start p-0">
              {user.twitter && (
                <a href={user.twitter} target="_blank" rel="noreferrer">
                  {" "}
                  <MediaImage
                    link={SocialMediaIcon.twitter}
                    height={40}
                    width={40}
                  />
                </a>
              )}
              {user.instagram && (
                <a href={user.instagram} target="_blank" rel="noreferrer">
                  {" "}
                  <MediaImage
                    link={SocialMediaIcon.instagram}
                    height={40}
                    width={40}
                  />
                </a>
              )}
              {user.linkedin && (
                <a href={user.linkedin} target="_blank" rel="noreferrer">
                  {" "}
                  <MediaImage
                    link={SocialMediaIcon.linkedin}
                    height={40}
                    width={40}
                  />
                </a>
              )}
              {user.youtube && (
                <a href={user.youtube} target="_blank" rel="noreferrer">
                  {" "}
                  <MediaImage
                    link={SocialMediaIcon.youTube}
                    height={40}
                    width={40}
                  />
                </a>
              )}
              {user.facebook && (
                <a href={user.facebook} target="_blank" rel="noreferrer">
                  {" "}
                  <MediaImage
                    link={SocialMediaIcon.facebook}
                    height={40}
                    width={40}
                  />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="desktop profile-link flex flex-col items-start p-0 gap-5 w-full mb-8">
          <div className="flex flex-row py-2 justify-between w-full">
            <div
              onClick={() => {
                navigate("/Profile/FeaturedLinks", { state: user._id });
              }}
              style={{ display: "flex", alignItems: "center" }}>
              <p
                style={{ marginRight: "10px" }}
                className={`${Font.heading3} ${Font.medium} ${Font.font} `}>
                Featured Links
              </p>
              <ChevronRight width={25} height={25} color="#101828" />
            </div>
            <button
              className={`${Button.button} ${Button.secondary} ${Button.medium}`}
              onClick={() => {
                setAddlinkpop(true);
                setAchive(false);
              }}>
              <Plus color="#242424" />
              <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>ADD</p>
            </button>
          </div>
          <div className="flex flex-wrap items-start p-0  w-full gap-4">
            {allLinks &&
              allLinks.map((item, i) => (
                <Links data={item} key={i} type="Link" val="link" i={i} />
              ))}
          </div>
        </div>

        <div className="resp profile-link">
          <div className="profile-link-header">
            <div
              onClick={() => {
                navigate("/Profile/FeaturedLinks", { state: user._id });
              }}
              className="pl-2 ">
              <p
                className={`${Font.heading3} ${Font.medium} ${Font.font} mt-2`}>
                Featured Links
              </p>
            </div>
            <button
              className={`${Button.button} ${Button.secondary} ${Button.medium}`}
              onClick={() => {
                setAddlinkpop(true);
                setAchive(false);
              }}>
              <Plus color="#242424" />
              <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>ADD</p>
            </button>
          </div>

          <div className="all-links">
            {allLinks &&
              allLinks.map((item, i) => (
                <Links data={item} key={i} type="Link" val="link" i={i} />
              ))}
          </div>
        </div>

        <div className="desktop profile-link flex flex-col items-start p-0 gap-5 w-full mb-8">
          <div className="flex flex-row py-2 justify-between w-full">
            <p className={`${Font.heading3} ${Font.medium} ${Font.font} `}>
              Achievements
            </p>
            <button
              className={`${Button.button} ${Button.secondary} ${Button.medium}`}
              onClick={() => {
                setAddlinkpop(true);
                setAchive(true);
              }}>
              <Plus color="#242424" />
              <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>ADD</p>
            </button>
          </div>
          <div className="flex flex-wrap items-start p-0 w-full gap-4">
            {allAchive &&
              allAchive.map((item, i) => (
                <Links
                  data={item}
                  key={i}
                  type="Achievements"
                  val="achie"
                  i={i}
                />
              ))}
            {/* <Links type='Award' val='achie' i={0} />
          <Links type='Achievements' val='achie' i={1} />
          <Links type='Achievements' val='achie' i={2} /> */}
          </div>
        </div>

        <div className="resp profile-link">
          <div className="profile-link-header">
            <div className="pl-2">
              <p
                className={`${Font.heading3} ${Font.medium} ${Font.font} mt-2`}>
                Achievements
              </p>
            </div>
            <button
              className={`${Button.button} ${Button.secondary} ${Button.medium}`}
              onClick={() => {
                setAddlinkpop(true);
                setAchive(false);
              }}>
              <Plus color="#242424" />
              <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>ADD</p>
            </button>
          </div>

          <div className="all-links">
            {allAchive &&
              allAchive.map((item, i) => (
                <Links
                  data={item}
                  key={i}
                  type="Achievements"
                  val="achie"
                  i={i}
                />
              ))}
          </div>
        </div>

        <div style={{ minHeight: "100px" }}></div>
      </>
    </>
  );
}

export default ProfileSelf;

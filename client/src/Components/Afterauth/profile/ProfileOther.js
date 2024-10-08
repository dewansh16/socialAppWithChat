import React, { useState } from "react";
import Tooltip from "react-power-tooltip";
import { Avtar, Button, Font } from "../../../styling/Styles";
import {
  AlertOctagon,
  MoreVertical,
  Share2,
  TV,
  UserCheck,
  UserPlus,
  UserX,
  ChevronRight,
} from "../../assets/Icons";
import SocialMediaIcon, { MediaImage } from "../../assets/SocialMediaIcon";
import "./profile.css";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../Navigation";
import { useContext, useEffect } from "react";
import axios from "axios";
import { NavLink, Outlet } from "react-router-dom";
import { formatDate } from "../../../utils/configDate";
import { trimText } from "../../../utils/trimText";

function ProfileOther(props) {
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
  } = useContext(UserContext);

  const { state } = useLocation();

  const [puser, setPuser] = useState({});
  const [allLinks, setAllLinks] = useState(puser.featured_link);
  const [allAchive, setAllAchive] = useState(puser.achivement);
  const [requested, setRequest] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [received, setReceived] = useState(false);
  const [groupNames, setGroupNames] = useState([]);

  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState(puser.pic);
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
          userId: `${state}`,
        },
        config
      );
      setImageUrl(data.imageUrl);
    } catch (error) {}
  };

  const [profilepop, setProfilepop] = useState(false);

  const fetchUser = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`/getuser/${id}`, config);
      // console.log("data", data);
      setPuser(data);
      // fetchFeaturedLink(data);
      setAllAchive(data.achivement);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFeaturedLinks = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `/featuredlink/${
        puser._id
      }/getFeaturedLinksByUserId?limit=${3}&page=${1}`,
      config
    );

    setAllLinks(data.featuredLinks);
  };

  useEffect(() => {
    fetchFeaturedLinks();
  }, [puser]);

  const checkConnectionStatus = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        "/connections/checkConnectionStatus/",
        { friendid: state },
        config
      );
      setRequest(data.requestsent);
      setAccepted(data.connectionstatus);
      setReceived(data.requestreceive);
    } catch (error) {
      console.log(error);
    }
  };

  const removeConnectionHandler = async () => {
    console.log("check here", state);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `/connections/removeFriend`,
        {
          friendId: state,
        },
        config
      );

      console.log(data);
      checkConnectionStatus();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRequestHandler = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `/unsendActiveConnectionRequest`,
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGroupsList = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`/message/user/${state}`, config);
      const newGroupNames = data.filter((groups) => groups.isGroupChat);
      setGroupNames(newGroupNames);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (state) {
      setAllLinks([]);
      fetchUser(state);
      checkConnectionStatus();
      fetchGroupsList();
      fetchImageUrl();
    }
  }, [state]);

  const PopupIN = () => {
    return (
      <>
        <Tooltip
          show={profilepop}
          position="bottom left"
          textBoxWidth="320px"
          padding="10px 16px"
          hoverBackground="#F5F5F5"
          backgroundColor="#fff"
          // moveUp="-70px"
          moveRight="-255px"
          flat={true}>
          <div className="prof-pop">
            <UserX color="#616161" />
            <p
              className={`${Font.body2} ${Font.medium} ${Font.font} `}
              onClick={removeConnectionHandler}>
              Remove from connections
            </p>
          </div>
          <div className="prof-pop">
            <Share2 color="#616161" />
            <p
              className={`${Font.body2} ${Font.medium} ${Font.font} `}
              onClick={() => {
                console.log(`https://uttertale.com//Profile/:${puser["name"]}`);
                console.log("user");
              }}>
              Share profile
            </p>
          </div>
          {
            // <div className="prof-pop">
            //   <AlertOctagon color="#616161" />
            //   <p className={`${Font.body2} ${Font.medium} ${Font.font} `}>
            //     Report this user
            //   </p>
            // </div>
          }
        </Tooltip>
      </>
    );
  };
  // /
  //change the array size with the number of links used in APIS with initialize with value false
  const [linkpoparr, setLinkpoparr] = useState([false, false, false]);
  const [achievmentpoparr, setAchievmentpoparr] = useState([
    false,
    false,
    false,
  ]);

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
          </Tooltip>
        </>
      );
    };
    // /
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
        arr[i] = true;
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
              <div className="p-2 w-full">
                {!data.image && (
                  <div className="profile-dummy-link">
                    <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
                      Image
                    </p>
                  </div>
                )}
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
              </div>
            </a>
          </div>
          <div className="flex flex-col items-start py-3 px-4 gap-3 w-full">
            <div className="flex flex-col items-start p-0 gap-1 w-full ">
              <p className={`${Font.font} ${Font.label} ${Font.regular}`}>
                {formatDate(data.date)}
              </p>
              <a
                href={data.link}
                className={`${Font.font} ${Font.body1} ${Font.medium} `}
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
        </div>
      </>
    );
  };

  const messageHandle = async (puser) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      // console.log(puser._id)
      const { data } = await axios.post(`/chat`, { userId: puser._id }, config);
      setSelectedChat(data);
      localStorage.setItem("selectedChatInfo", JSON.stringify(data));
      navigate("/chat-box-member");
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };
  //     const senddata = {
  //       friendid: puser._id,
  //     };
  //     const {data} = await axios.post('/connections/sendConnectionRequest',{...senddata},config)
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  const SubmitRequest = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const senddata = {
        userid: puser._id,
      };
      const { data } = await axios.post(
        "/connections/sendConnectionRequest/",
        { id: senddata.userid },
        config
      );

      if (data.message === "Connection request sent successfully") {
        setRequest(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const acceptHandler = async (userid) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const senddata = {
        userid: puser._id,
      };

      const data = await axios.post(
        "/connections/addConnection",
        { friendid: senddata.userid },
        config
      );
      setFetchAgain(!fetchAgain);

      checkConnectionStatus();
    } catch (error) {}
  };

  return (
    <>
      <div className="desktop profile-name-box">
        {!puser.pic && (
          <div
            className={`p-n-b-avtar ${Avtar["avtar-3"]} ${Avtar.avtar}`}></div>
        )}
        {puser.pic && (
          <img
            className={`${Avtar.avtar} ${Avtar["avtar-3"]}`}
            src={imageUrl}
            alt=""
          />
        )}
        <div className="p-n-b-container">
          <div className="member-info-top">
            <div className="m-i-t-left">
              <p className={`${Font.heading2} ${Font.medium} ${Font.font}`}>
                {puser.name}{" "}
              </p>
              <p className={`${Font.body1} ${Font.regular} ${Font.font}`}>
                {puser.role}
              </p>
            </div>
            <div className="m-i-t-right">
              {!accepted ? (
                <>
                  {received ? (
                    <div
                      className={`${Button.button} ${Button.secondary} ${Button.medium}`}>
                      {/* <NavLink to="/chat-box-member"> */}
                      <h1>
                        <UserPlus color={"black"} />
                      </h1>
                      <p
                        onClick={() => acceptHandler()}
                        className={`${Font.body2} ${Font.medium} ${Font.font}`}>
                        Accept Request
                      </p>
                      {/* </NavLink> */}
                    </div>
                  ) : !requested ? (
                    <div
                      onClick={SubmitRequest}
                      className={`${Button.button} ${Button.primary} ${Button.medium}`}>
                      <h1>
                        <UserPlus color={"#fff"} />
                      </h1>
                      <p
                        className={`${Font.body2} ${Font.medium} ${Font.font}`}>
                        Connect
                      </p>
                    </div>
                  ) : (
                    <div
                      className={`${Button.button} ${Button.secondary} ${Button.medium}`}>
                      {/* <NavLink to="/chat-box-member"> */}
                      <h1>
                        <UserPlus color={"black"} />
                      </h1>
                      <p
                        onClick={() => acceptHandler()}
                        className={`${Font.body2} ${Font.medium} ${Font.font}`}>
                        Accept Request
                      </p>
                      {/* </NavLink> */}
                    </div>
                  )}
                </>
              ) : (
                <div
                  className={`${Button.button} ${Button.secondary} ${Button.medium}`}>
                  {/* <NavLink to="/chat-box-member"> */}
                  <p
                    onClick={() => messageHandle(puser)}
                    className={`${Font.body2} ${Font.medium} ${Font.font}`}>
                    Message
                  </p>
                  {/* </NavLink> */}
                </div>
              )}

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
            {!puser.pic && (
              <div
                className={`p-n-b-avtar ${Avtar["avtar-1"]} ${Avtar.avtar}`}></div>
            )}
            {puser.pic && (
              <img
                className={`${Avtar.avtar} ${Avtar["avtar-1"]}`}
                src={imageUrl}
                alt=""
              />
            )}
          </label>

          <div className="m-i-t-right">
            {!accepted ? (
              <>
                {received ? (
                  <div
                    className={`${Button.button} ${Button.secondary} ${Button.medium}`}>
                    {/* <NavLink to="/chat-box-member"> */}
                    <h1>
                      <UserPlus color={"black"} />
                    </h1>
                    <p
                      onClick={() => acceptHandler()}
                      className={`${Font.body2} ${Font.medium} ${Font.font}`}>
                      Accept
                    </p>
                    {/* </NavLink> */}
                  </div>
                ) : !requested ? (
                  <div
                    onClick={SubmitRequest}
                    className={`${Button.button} ${Button.primary} ${Button.medium}`}>
                    <h1>
                      <UserPlus color={"#fff"} />
                    </h1>
                    <p className={`${Font.body2} ${Font.medium} ${Font.font}`}>
                      Connect
                    </p>
                  </div>
                ) : (
                  <div
                    className={`${Button.button} ${Button.secondary} ${Button.medium}`}>
                    {/* <NavLink to="/chat-box-member"> */}
                    <h1>
                      <UserPlus color={"black"} />
                    </h1>
                    <p
                      onClick={() => acceptHandler()}
                      className={`${Font.body2} ${Font.medium} ${Font.font}`}>
                      Accept
                    </p>
                    {/* </NavLink> */}
                  </div>
                )}
              </>
            ) : (
              <div
                className={`${Button.button} ${Button.secondary} ${Button.medium}`}>
                {/* <NavLink to="/chat-box-member"> */}
                <p
                  onClick={() => messageHandle(puser)}
                  className={`${Font.body2} ${Font.medium} ${Font.font}`}>
                  Message
                </p>
                {/* </NavLink> */}
              </div>
            )}

            <div
              style={{ position: "relative", padding: "10px" }}
              className={`profile-pop ${Button.button} ${Button.secondary} ${Button.iconmedium}`}
              onClick={() => setProfilepop(!profilepop)}>
              <MoreVertical color={"#242424"} />
              <PopupIN />
            </div>
          </div>
        </div>

        <div className="m-i-t-left">
          <p className={`${Font.heading2} ${Font.medium} ${Font.font}`}>
            {puser.name}{" "}
          </p>
          <p className={`${Font.body1} ${Font.regular} ${Font.font}`}>
            {puser.role}
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
              <p className={`pt-1 ${Font.font} ${Font.body2} ${Font.regular}`}>
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
            {puser.about ? puser.about : "N/A"}
          </p>
        </div>

        {puser.role !== "Business" && (
          <div className="flex flex-col items-start py-6 gap-4">
            <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
              Experience
            </p>
            <div className={`flex flex-col items-start p-0 gap-4`}>
              <div className={`flex flex-col items-start gap-1 p-0`}>
                {puser.experience
                  ? puser.experience.map((item, i) => (
                      <>
                        <p
                          className={`${Font.subheadline} ${Font.medium} ${Font.font}`}>
                          {item.comName}
                        </p>
                        <p
                          className={`${Font.body2} ${Font.regular} ${Font.font}`}
                          style={{ color: "#616161", marginBottom: "1rem" }}>
                          {item.start?.month?.substr(0, 3)}{" "}
                          {item.start?.year % 100} -{" "}
                          {(item.isWorking && "present") ||
                            item.end?.month.substr(0, 3) +
                              " " +
                              (item.end?.year % 100)}
                        </p>
                      </>
                    ))
                  : "N/A"}
              </div>
            </div>
          </div>
        )}

        <div className={`flex flex-row items-start py-6 gap-6 w-full`}>
          {puser.role !== "Business" && (
            <div
              className={`flex flex-col items-start p-0 profile-about-des w-1/2`}>
              <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
                Education
              </p>
              <p
                className={`${Font.body2} ${Font.regular} ${Font.font}`}
                style={{ color: "#616161" }}>
                {puser.education ? puser.education : "N/A"}
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
              {puser.location ? puser.location : "N/A"}
            </p>
          </div>
        </div>
        <div className={`flex flex-row items-start py-6 gap-6 w-full`}>
          <div
            className={`flex flex-col items-start p-0 profile-about-des w-1/2`}>
            <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
              Website
            </p>
            <p
              className={`${Font.body2} ${Font.regular} ${Font.font}`}
              style={{ color: "#616161" }}>
              {puser.website_link ? puser.website_link : "N/A"}
            </p>
          </div>
          <div
            className={`flex flex-col items-start p-0 profile-about-des w-1/2`}>
            <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
              Social Handles
            </p>
            <div className="flex flex-row items-start p-0">
              {puser.twitter && (
                <a href={puser.twitter}>
                  {" "}
                  <MediaImage
                    link={SocialMediaIcon.twitter}
                    height={40}
                    width={40}
                  />
                </a>
              )}
              {puser.instagram && (
                <a href={puser.instagram}>
                  {" "}
                  <MediaImage
                    link={SocialMediaIcon.instagram}
                    height={40}
                    width={40}
                  />
                </a>
              )}
              {puser.linkedin && (
                <a href={puser.linkedin}>
                  {" "}
                  <MediaImage
                    link={SocialMediaIcon.linkedin}
                    height={40}
                    width={40}
                  />
                </a>
              )}
              {puser.youtube && (
                <a href={puser.youtube}>
                  {" "}
                  <MediaImage
                    link={SocialMediaIcon.youTube}
                    height={40}
                    width={40}
                  />
                </a>
              )}
              {puser.facebook && (
                <a href={puser.facebook}>
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
            {puser.about ? puser.about : "N/A"}
          </p>
        </div>

        {puser.role !== "Business" && (
          <div className="profile-about-item">
            <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
              Experience
            </p>
            <div className={`flex flex-col items-start p-0 gap-4`}>
              <div className={`flex flex-col items-start gap-1 p-0`}>
                {puser.experience
                  ? puser.experience.map((item, i) => (
                      <>
                        <p
                          className={`${Font.subheadline} ${Font.medium} ${Font.font}`}>
                          {item.comName}
                        </p>
                        <p
                          className={`${Font.body2} ${Font.regular} ${Font.font}`}
                          style={{ color: "#616161", marginBottom: "1rem" }}>
                          {item.start?.month?.substr(0, 3)}{" "}
                          {item.start?.year % 100} -{" "}
                          {(item.isWorking && "present") ||
                            item.end?.month.substr(0, 3) +
                              " " +
                              (item.end?.year % 100)}
                        </p>
                      </>
                    ))
                  : "N/A"}
              </div>
            </div>
          </div>
        )}

        {puser.role !== "Business" && (
          <div className="profile-about-item">
            <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
              Education
            </p>
            <p
              className={`${Font.body2} ${Font.regular} ${Font.font}`}
              style={{ color: "#616161" }}>
              {puser.education ? puser.education : "N/A"}
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
            {puser.location ? puser.location : "N/A"}
          </p>
        </div>

        <div className="profile-about-item">
          <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
            Website
          </p>
          <a
            className={`${Font.body2} ${Font.regular} ${Font.font}`}
            style={{ color: "#616161" }}
            href={`${puser.website_link}`}>
            {puser.website_link
              ? `${trimText(puser.website_link, 42) + "..."}`
              : "N/A"}
          </a>
        </div>

        <div className="profile-about-item">
          <p className={`${Font.heading3} ${Font.medium} ${Font.font}`}>
            Social Handles
          </p>
          <div className="flex flex-row items-start p-0">
            {puser.twitter && (
              <a href={puser.twitter}>
                {" "}
                <MediaImage
                  link={SocialMediaIcon.twitter}
                  height={40}
                  width={40}
                />
              </a>
            )}
            {puser.instagram && (
              <a href={puser.instagram}>
                {" "}
                <MediaImage
                  link={SocialMediaIcon.instagram}
                  height={40}
                  width={40}
                />
              </a>
            )}
            {puser.linkedin && (
              <a href={puser.linkedin}>
                {" "}
                <MediaImage
                  link={SocialMediaIcon.linkedin}
                  height={40}
                  width={40}
                />
              </a>
            )}
            {puser.youtube && (
              <a href={puser.youtube}>
                {" "}
                <MediaImage
                  link={SocialMediaIcon.youTube}
                  height={40}
                  width={40}
                />
              </a>
            )}
            {puser.facebook && (
              <a href={puser.facebook}>
                {" "}
                <MediaImage
                  link={SocialMediaIcon.facebook}
                  height={40}
                  width={40}
                />
              </a>
            )}

            {!puser.facebook &&
              !puser.youtube &&
              !puser.linkedin &&
              !puser.instagram &&
              !puser.twitter &&
              "N/A"}
          </div>
        </div>
      </div>

      <div className="desktop profile-link flex flex-col items-start p-0 gap-6 w-full mb-8">
        <div className="flex flex-row py-2 px-3 justify-between w-full">
          <div
            onClick={() => {
              navigate("/Profile/FeaturedLinks", { state: puser._id });
            }}
            style={{ display: "flex", alignItems: "center" }}>
            <p
              style={{ marginRight: "10px" }}
              className={`${Font.heading3} ${Font.medium} ${Font.font} `}>
              Featured Links
            </p>
            <ChevronRight width={25} height={25} color="#101828" />
          </div>
        </div>
        <div className="flex flex-wrap items-start p-0  w-full gap-4">
          {allLinks &&
            allLinks.map((item, i) => (
              <Links data={item} key={i} type="Link" val="link" i={i} />
            ))}
          {/* <Links type='Link' val='link' i={0} /> */}
          {/* <Links type='Link' val='link' i={1} />
    <Links type='Link' val='link' i={2} /> */}
        </div>
      </div>

      <div className="desktop profile-link flex flex-col items-start p-0 gap-5 w-full mb-8">
        <div className="flex flex-row py-2 px-3 justify-between w-full">
          <p className={`${Font.heading3} ${Font.medium} ${Font.font} `}>
            Achievements
          </p>
        </div>
        <div className="flex flex-wrap justify-between items-start p-0  w-full gap-4">
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

      <div className="resp profile-link">
        <div className="profile-link-header">
          <div
            onClick={() => {
              navigate("/Profile/FeaturedLinks", { state: puser._id });
            }}
            style={{ display: "flex", alignItems: "center" }}>
            <p
              style={{ marginRight: "10px" }}
              className={`${Font.heading3} ${Font.medium} ${Font.font} `}>
              Featured Links
            </p>
            <ChevronRight width={25} height={25} color="#101828" />
          </div>
        </div>

        <div className="all-links">
          {allLinks &&
            allLinks.map((item, i) => (
              <Links data={item} key={i} type="Link" val="link" i={i} />
            ))}
        </div>
      </div>

      <div className="resp profile-link ">
        <div className="profile-link-header">
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className={`${Font.heading3} ${Font.medium} ${Font.font} `}>
              Achievements
            </p>
          </div>
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
  );
}

export default ProfileOther;

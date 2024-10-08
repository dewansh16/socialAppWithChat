import React, { useState, useContext, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Font } from "../../styling/Styles";
import { Images, ImgHome } from "./assets/Assets";
import "./sidenavbar.css";
import { UserContext } from "../Navigation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  BarChart2,
  ChevronDown,
  ChevronUP,
  Home,
  Link,
  Users,
  RedEvents,
  BlackEvents,
} from "../assets/Icons";

function Sidenavbar() {
  const [loggedUser, setLoggedUser] = useState();

  const {
    selectedChat,
    setSelectedChat,
    user,
    chats,
    setChats,
    token,
    fetchAgain,
    setFetchAgain,
  } = useContext(UserContext);

  const navigate = useNavigate();
  const url = window.location.href;
  const [showgroups, setShowgroups] = useState(false);
  const [showcon, setShowcon] = useState(false);
  const [connections, setConnections] = useState([]);

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
      // console.log("yoy....", data);
      setSelectedChat(data);
      localStorage.setItem("selectedChatInfo", JSON.stringify(data));
      navigate("/chat-box-member");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get("/chat", config);
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchConnections = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `/connections/getConnectionlistbyId/${user._id}/connections`,
        config
      );
      setConnections([
        ...data.entrepreneur,
        ...data.contentcreator,
        ...data.business,
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchChats();
    fetchConnections();
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
  }, []);

  const color = "#616161";
  const activeColor = "#FF3520";

  const [hac, setHac] = useState(true);
  const [Aac, setAac] = useState(false);
  const [eac, setEac] = useState(false);

  return (
    <>
      <div className="desktop groupchat flex flex-row w-full">
        <div className="group-chat-side h-screen">
          <div className="py-4 px-6">
            <a href="/Profile/own">
              <img src={Images.logo} alt="" />
            </a>
          </div>
          <div className="sidebar-nav ">
            <NavLink
              to="/Profile/own"
              className={`sidebar-nav-item `}
              onClick={() => {
                setHac(true);
                setAac(false);
                setEac(false);
              }}>
              <Home color={hac ? activeColor : color} />
              <p
                style={{ color: hac ? activeColor : color, marginTop: 4 }}
                className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                Home
              </p>
            </NavLink>
            <NavLink
              to="/Profile/Events"
              className={`sidebar-nav-item `}
              onClick={() => {
                setAac(false);
                setHac(false);
                setEac(true);
              }}>
              {eac ? <RedEvents /> : <BlackEvents />}
              <p
                className={`${Font.font} ${Font.body2} ${Font.medium}`}
                style={{ marginTop: 4, paddingLeft: "2px" }}>
                Events
              </p>
            </NavLink>
            {
              // <NavLink
              // to="/Profile/Competitor-Analysis"
              // className={`sidebar-nav-item `}
              // onClick={() => {
              //   setAac(true);
              //   setHac(false);
              //   setEac(false);
              // }}>
              // <BarChart2 color={Aac ? activeColor : color} />
              // <p
              //   className={`${Font.font} ${Font.body2} ${Font.medium}`}
              //   style={{ marginTop: 4 }}>
              //   Analysis
              // </p>
              // </NavLink>
            }
          </div>
          <div className="my-network ">
            <h4
              className={`${Font.label} ${Font.medium} ${Font.font} py-2 px-4`}>
              My Networks
            </h4>
            <div className="sidebar-groups">
              <div
                className="sidebar-nav-item"
                onClick={() => setShowgroups(!showgroups)}>
                {/* <img src={Images.down} alt="" /> */}
                <Users color="#616161" />
                <div className="flex justify-between w-full">
                  <p
                    className={` ${Font.body2} ${Font.medium} ${Font.font} `}
                    style={{ marginTop: 4 }}>
                    Groups
                  </p>
                  {/* <img src={Images.down} alt="" /> */}
                  {showgroups && <ChevronUP color="#616161" />}
                  {!showgroups && <ChevronDown color="#616161" />}
                </div>
              </div>
              {showgroups && (
                <div
                  className="sidebar-group-point"
                  style={{
                    maxHeight: "200px",
                    overflowY: "scroll",
                    maxWidth: "80%",
                    overflowX: "hidden",
                  }}>
                  {chats &&
                    chats.map((chat, index) => (
                      <NavLink
                        key={index}
                        to="/chat-box"
                        onClick={() => {
                          setAac(false);
                          setHac(false);
                        }}>
                        <div
                          className={
                            chat._id === selectedChat?._id ? "myactive" : ""
                          }>
                          {chat.isGroupChat && (
                            <p
                              onClick={() => {
                                setSelectedChat(chat);
                                localStorage.setItem(
                                  "selectedChatInfo",
                                  JSON.stringify(chat)
                                );
                              }}
                              className={`limit-line ${Font.body2} ${Font.medium} ${Font.font}`}
                              key={chat._id}
                              style={{ textAlign: "left" }}>
                              {chat.chatName}
                            </p>
                          )}
                        </div>
                      </NavLink>
                    ))}
                  {/* <p className={` ${Font.body2} ${Font.medium} ${Font.font} `} >Crypto</p> */}
                </div>
              )}
            </div>
            <div className="sidebar-groups">
              <div
                className="sidebar-nav-item"
                onClick={() => setShowcon(!showcon)}>
                {/* <img src={Images.down} alt="" /> */}
                <Link color="#616161" />
                <div className="flex justify-between w-full">
                  <p
                    className={` ${Font.body2} ${Font.medium} ${Font.font} `}
                    style={{ color: "#616161", marginTop: 4 }}>
                    Connections
                  </p>
                  {/* <img src={Images.down} alt="" /> */}
                  {showcon && <ChevronUP color="#616161" />}
                  {!showcon && <ChevronDown color="#616161" />}
                </div>
              </div>
              {showcon && (
                <div
                  className="sidebar-group-point"
                  style={{
                    maxHeight: "200px",
                    overflowY: "scroll",
                    maxWidth: "80%",
                    overflowX: "hidden",
                    textAlign: "left",
                  }}>
                  {connections &&
                    connections.map((chat) => (
                      <NavLink
                        key={chat._id}
                        to="/chat-box-member"
                        // className={`${!chat.isGroupChat && "myactive"}`}
                        onClick={() => {
                          setAac(false);
                          setHac(false);
                        }}>
                        <div>
                          <p
                            onClick={() => {
                              messageHandle(chat);
                            }}
                            className={`limit-line ${Font.body2} ${Font.medium} ${Font.font} `}
                            key={chat._id}
                            style={{ textAlign: "left" }}>
                            {chat.name}
                          </p>
                        </div>
                      </NavLink>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <Outlet />
      </div>

      <div className="resp">
        <div className="sidenavbar">
          <div className="sidebar-nav">
            <NavLink
              to="/Profile/own"
              className={`sidebar-nav-item `}
              onClick={() => {
                setHac(true);
                setAac(false);
                setEac(false);
              }}>
              <Home color={hac ? activeColor : color} />
              <p
                style={{ color: hac ? activeColor : color, marginTop: 4 }}
                className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                Home
              </p>
            </NavLink>
            <NavLink
              to="/Profile/Events"
              className={`sidebar-nav-item `}
              onClick={() => {
                setAac(false);
                setHac(false);
                setEac(true);
              }}>
              {eac ? <RedEvents /> : <BlackEvents />}
              <p
                className={`${Font.font} ${Font.body2} ${Font.medium}`}
                style={{ marginTop: 4, paddingLeft: "2px" }}>
                Events
              </p>
            </NavLink>
            <NavLink
              to="/Profile/Network"
              className={`sidebar-nav-item`}
              onClick={() => {
                setAac(true);
                setHac(false);
                setEac(false);
              }}>
              <BarChart2 color={Aac ? activeColor : color} />
              <p
                className={`${Font.font} ${Font.body2} ${Font.medium}`}
                style={{ marginTop: 4 }}>
                Network
              </p>
            </NavLink>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Sidenavbar;

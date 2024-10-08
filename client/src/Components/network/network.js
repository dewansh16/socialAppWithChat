import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../Navigation";
import { Font } from "../../styling/Styles";
import { NavLink, useNavigate } from "react-router-dom";
import "./network.css";

function Network() {
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
  const [groupActive, setGroupActive] = useState(true);
  const [connectionActive, setConnectionActive] = useState(false);
  const [connections, setConnections] = useState([]);

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
  }, []);

  const selecttype = {
    fontWeight: "700",
    color: "#138DEC",
    borderBottom: "2px solid #138DEC",
  };

  return (
    <div>
      <div style={{ marginTop: "20px" }} className="events-type">
        <p
          style={groupActive ? selecttype : { fontWeight: "500" }}
          onClick={() => {
            setGroupActive(true);
            setConnectionActive(false);
          }}>
          Groups
        </p>
        <p
          style={connectionActive ? selecttype : { fontWeight: "500" }}
          onClick={() => {
            setGroupActive(false);
            setConnectionActive(true);
          }}>
          Connections
        </p>
      </div>
      {groupActive && (
        <div>
          {chats &&
            chats.map((chat, index) => (
              <NavLink key={index} to="/chat-box">
                <div
                  className={chat._id === selectedChat?._id ? "myactive" : ""}>
                  {chat.isGroupChat && (
                    <div className="network-links-div">
                      <p
                        onClick={() => {
                          setSelectedChat(chat);
                          localStorage.setItem(
                            "selectedChatInfo",
                            JSON.stringify(chat)
                          );
                        }}
                        className={`limit-line ${Font.body1} ${Font.large} ${Font.font}`}
                        key={chat._id}
                        style={{ textAlign: "left", fontWeight: "500" }}>
                        {chat.chatName}
                      </p>
                    </div>
                  )}
                </div>
              </NavLink>
            ))}
        </div>
      )}
      {connectionActive && (
        <div>
          {connections &&
            connections.map((chat) => (
              <NavLink key={chat._id} to="/chat-box-member">
                <div className="network-links-div">
                  <p
                    onClick={() => {
                      messageHandle(chat);
                    }}
                    className={`limit-line ${Font.body1} ${Font.medium} ${Font.font} `}
                    key={chat._id}
                    style={{ textAlign: "left" }}>
                    {chat.name}
                  </p>
                </div>
              </NavLink>
            ))}
          {/* <p className={` ${Font.body2} ${Font.medium} ${Font.font} `} >Shubham</p>
            <p className={` ${Font.body2} ${Font.medium} ${Font.font} `} >Nitin</p> */}
        </div>
      )}
    </div>
  );
}

export default Network;

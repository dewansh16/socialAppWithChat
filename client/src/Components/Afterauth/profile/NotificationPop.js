import React, { useContext, useEffect, useState } from "react";
import { Button, Font } from "../../../styling/Styles";
import "./NotificationPop.css";
import { UserContext } from "../../Navigation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NotificationPop(props) {
  const {
    selectedChat,
    setSelectedChat,
    user,
    token,
    fetchAgain,
    setFetchAgain,
    notifi,
    setNotifi,
    chats,
  } = useContext(UserContext);
  const [notifiData, setNotifiData] = useState([]);

  const navigate = useNavigate();

  const messageHandle = async (chatId, senderId) => {
    // console.log(chats, chatId);
    let reqChat = null;
    for (let i = 0; i < chats.length; i++) {
      if (chats[i]._id === chatId) {
        reqChat = chats[i];
      }
    }
    // console.log("reqChat = ", reqChat);
    try {
      if (reqChat) {
        if (reqChat.isGroupChat) {
          setSelectedChat(reqChat);
          localStorage.setItem("selectedChatInfo", JSON.stringify(reqChat));
          navigate("/chat-box");
        } else {
          const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          // console.log(puser._id)
          const { data } = await axios.post(
            `/chat`,
            { userId: senderId },
            config
          );
          // console.log("yoy....", data);
          setSelectedChat(data);
          localStorage.setItem("selectedChatInfo", JSON.stringify(data));
          navigate("/chat-box-member");
        }
      } else {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        // console.log(puser._id)
        const { data } = await axios.post(
          `/chat`,
          { userId: senderId },
          config
        );
        // console.log("yoy....", data);
        setSelectedChat(data);
        localStorage.setItem("selectedChatInfo", JSON.stringify(data));
        navigate("/chat-box-member");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      // console.log(token);

      const { data } = await axios.get(
        "/connections/connection/notifications",
        config
      );
      // console.log("notifications", data);
      console.log(data.notifications);
      setNotifiData(data.notifications || []);

      await axios.post(
        "/connections/connection/markNotificationsAsSeen",
        {},
        config
      );
      setNotifi(false);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptHandler = async (userid) => {
    console.log(userid, token);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = await axios.post(
        "/connections/addConnection",
        { friendid: userid },
        config
      );
      setFetchAgain(!fetchAgain);
      console.log("accept", data);
    } catch (error) {
      console.log("axios-error", error, error.message);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // console.log(props);

  return (
    <div className="notificationpop">
      <div className="flex items-center py-2 px-4 hedingnot">
        <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
          Notifications
        </p>
      </div>
      {notifiData.map(
        (item, i) =>
          !item.state && (
            <div className="noti-content">
              <div className="notleft">
                <img
                  src={item.pic}
                  alt=""
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                />
                {item.type === "connection" && (
                  <div className="notdetailbox">
                    <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                      Connection Request
                    </p>
                    <p className={`${Font.font} ${Font.body2} ${Font.regular}`}>
                      {item.message}
                    </p>
                  </div>
                )}

                {item.type === "like" && (
                  <div className="notdetailbox">
                    <p className={`${Font.font} ${Font.body2} ${Font.regular}`}>
                      {item.message}
                    </p>
                  </div>
                )}

                {item.type === "message" && (
                  <div className="notdetailbox">
                    <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                      New Message
                    </p>
                    <p className={`${Font.font} ${Font.body2} ${Font.regular}`}>
                      {item.message}
                    </p>
                  </div>
                )}
              </div>
              {item.type === "connection" && (
                <div className="notfright">
                  <div
                    className={`${Button.button} ${Button.secondary} ${Button.medium}`}>
                    {!item.message?.includes(
                      "has added you as a connection."
                    ) ? (
                      <p
                        className={`${Font.font} ${Font.body2} ${Font.medium}`}
                        onClick={() =>
                          navigate(`/Profile/:${item.name}`, {
                            state: item.sender?._id,
                          })
                        }>
                        View
                      </p>
                    ) : (
                      <p
                        className={`${Font.font} ${Font.body2} ${Font.medium}`}
                        onClick={() =>
                          navigate(`/Profile/:${item.name}`, {
                            state: item.sender?._id,
                          })
                        }>
                        View
                      </p>
                    )}
                  </div>
                  {!item.message?.includes(
                    "has added you as a connection."
                  ) && (
                    <div
                      className={`${Button.button} ${Button.primary} ${Button.medium}`}>
                      <p
                        className={`${Font.font} ${Font.body2} ${Font.medium}`}
                        onClick={() => {
                          props.setNotifPop(false);
                          acceptHandler(item.sender?._id);
                        }}>
                        Accept
                      </p>
                    </div>
                  )}
                </div>
              )}

              {(item.type === "like" || item.type === "message") && (
                <div className="notfright">
                  <div
                    className={`${Button.button} ${Button.secondary} ${Button.medium}`}>
                    <p
                      className={`${Font.font} ${Font.body2} ${Font.medium}`}
                      onClick={() => {
                        messageHandle(item.chatId, item.sender?._id);
                        // navigate(`/Profile/:${item.name}`, {
                        //   state: item.sender?._id,
                        // });
                      }}>
                      View
                    </p>
                  </div>
                </div>
              )}
            </div>
          )
      )}
    </div>
  );
}

export default NotificationPop;

// dataNot.map((item, i) => (
//   <>
//     <div key={i} className="noti-content">
//       <div className="notleft">
//         <img
//           src={item.imgLink}
//           alt=""
//           style={{ width: 40, height: 40, borderRadius: "50%" }}
//         />
//         <div className="notdetailbox">
//           <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
//             {item["notType"]}
//           </p>
//           <p className={`${Font.font} ${Font.body2} ${Font.regular}`}>
//             {item["group"]}
//           </p>
//         </div>
//       </div>
//       <div
//         className={`${Button.button} ${Button.secondary} ${Button.medium}`}>
//         <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
//           View
//         </p>
//       </div>
//     </div>
//   </>
// ))
// const dataNot = [
//   {
//     imgLink: "",
//     notType: "Nitin Sharma has mentioned you",
//     group: "Group name",
//   },
//   {
//     imgLink: "",
//     notType: "Nitin Sharma has replied to your post",
//     group: "Group name",
//   },
//   {
//     imgLink: "",
//     notType: "Nitin Sharma has liked to your post",
//     group: "Group name",
//   },
// ];

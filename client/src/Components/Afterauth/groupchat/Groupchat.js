import React, { useState, useEffect, useContext } from "react";
import { BottomCenter, BottomLeft } from "../../assets/Popup";
import { Images } from "../assets/Assets";
import Group from "./Group";
import "./groupchat.css";
import axios from "axios";
import { UserContext } from "../../Navigation";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { MinusCircle, X, ChevronLeft } from "../../assets/Icons";
import { Popover } from "react-tiny-popover";
import Atpop from "./Atpop";
import { Button, Font } from "../../../styling/Styles";

import { FilePond } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";

function Groupchat() {
  const [memb, setMembe] = useState(true);
  const [star, setStar] = useState(false);
  const [starf, setStarf] = useState(false);
  const [showStarpop, setShowStarpop] = useState(false);
  const [showMemberpop, setShowMemberpop] = useState(false);
  const [newmessage, setNewMessage] = useState();
  const [messages, setMessages] = useState([]);
  const [onRefresh, setOnRefresh] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [pop, setPop] = useState(false);
  const [showatratpop, setShowatRatpop] = useState(false);
  const [chatName, setChatName] = useState("");

  let pond = null;
  const [file, setFile] = useState([]);
  const [n, setN] = useState(0);
  const [fileName, setFileName] = useState(null);

  const [replyState, setReplyState] = useState(false);
  const [toReplyMessaegeData, setToReplyMessageData] = useState({});

  const navigate = useNavigate();

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
  if (!selectedChat) navigate("/Profile/own");

  const [users, setUsers] = useState([]);
  const [searchSort, setSearchSort] = useState(users);

  useEffect(() => {
    const usersData = selectedChat?.users.map((user) => {
      // console.log(user);
      return {
        name: user.name,
        id: user._id,
      };
    });

    setUsers(usersData);
    setSearchSort(usersData);
  }, [selectedChat]);

  // console.log("users from group chat..", users);

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get("/chat", config);
      setChats(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [starred, setStarred] = useState([]);

  const fetchStarredMessages = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = await axios.get(`/message/starred`, config);
      //   setAllMessages(data);
      setStarred(data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   console.log("refresh hya");
  // fetchStarredMessages()
  // const selectedChatInfo = JSON.parse(localStorage.getItem("selectedChatInfo"));
  // if(selectedChatInfo)
  //   setSelectedChat(selectedChatInfo)

  // console.log(selectedChatInfo)
  // }, [onRefresh]);

  useEffect(() => {
    // console.log("useeffect run hua")
    // if(!selectedChat)
    //   console.log("no selectedchat state")

    // setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    fetchMessages();
    fetchStarredMessages();
    // console.log(fetchAgain," changed ")
    // eslint-disable-next-line
  }, [selectedChat, fetchAgain, star, onRefresh]);

  // function clickHandler(e) {
  //   setNewMessage(e.target.value);
  // }

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`/message/${selectedChat._id}`, config);
      setMessages(data);
      // console.log("messages data..", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFileName(file[0]?.file?.name);
  }, [file]);
  // console.log("file = ", file[0]?.file);
  const sendMessage = async (filterPayload) => {
    const formData = new FormData();
    if (file && fileName) formData.append("myFile", file[0].file, fileName);
    formData.append("content", newmessage || "");
    formData.append("chatId", selectedChat._id);
    if (filterPayload) {
      formData.append("toBusiness", filterPayload.toAllBusiness | false);
      formData.append("toEntre", filterPayload.toAllEntre | false);
      formData.append(
        "toContentCreator",
        filterPayload.toAllContentCreator | false
      );
    }
    console.log(" file && fileName ", file && fileName, file, fileName);

    if (replyState) {
      let toReplyMessageId = toReplyMessaegeData.messageId;
      if (newmessage || fileName) {
        try {
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          };
          setNewMessage("");
          const { data } = await axios.post(
            `/message/${toReplyMessageId}/reply`,
            formData,
            config
          );
          setMessages([...messages, data]);
          if (mentionList.length > 0) {
            sendMentionReq(data._id);
          }
          setFetchAgain(!fetchAgain);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      if (newmessage || fileName) {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          setNewMessage("");
          const { data } = await axios.post("/message", formData, config);
          setMessages([...messages, data]);
          if (mentionList.length > 0) {
            sendMentionReq(data._id);
          }
          setFetchAgain(!fetchAgain);
        } catch (error) {
          console.log(error);
        }
      }
    }
    setReplyState(false);
    setToReplyMessageData({});
    setFile([]);
    setFileName(null);
    setN(n - 1);
  };

  const sendMentionReq = async (messageId) => {
    for (let i = 0; i < mentionList.length; i++) {
      let payload = {
        mentionedUserId: mentionList[i].id,
      };
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          `/message/${messageId}/mention`,
          payload,
          config
        );
        console.log("mention message data in response..", data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [mentionNameStartIdx, setMentionNameStartIdx] = useState(null);
  const [mentionList, setMentionList] = useState([]);

  function clickHandler(e) {
    setNewMessage(e.target.value);
    let a = [];
    const k = e.target.value;
    a = [...k];
    let bool = false;

    // console.log("inside clickhandler... ", e.target.value, a);

    //code to update mentioned person list
    let newMentionList = [];
    for (let i = 0; i < k.length; i++) {
      if (k[i] === "@") {
        for (let j = 0; j < mentionList.length; j++) {
          let mentionedPersonName = mentionList[j].name;
          // console.log(
          //   "name inside from for loop...",
          //   k.slice(i + 1, i + 1 + mentionedPersonName.length),
          //   mentionedPersonName
          // );
          let reqStr = k.slice(i + 1, i + 1 + mentionedPersonName.length);

          if (reqStr === mentionedPersonName) {
            newMentionList.push(mentionList[j]);
          }
        }
      }
    }
    // console.log("new Mention list...", newMentionList);
    setMentionList(newMentionList);

    //code to add mentioned person
    if (a[a.length - 1] === "@") {
      setShowatRatpop(true);
      setMentionNameStartIdx(a.length - 1);
      // console.log("@ found wala ran....");
    } else if (
      (a[a.length - 1] === " " && a[a.length - 2] === "@") ||
      a.length === 0 ||
      (mentionNameStartIdx !== null && a[mentionNameStartIdx] !== "@")
    ) {
      setShowatRatpop(false);
      // console.log("@ removed");
    }
    if (showatratpop || a[a.length - 1] === "@") {
      let arr = [];
      const word = e.target.value.slice(mentionNameStartIdx + 1);
      // console.log("word..", word);
      for (let i = 0; i < users.length; i++) {
        const letter = "@" + users[i].name;
        let check = letter.toLowerCase().includes(word.toLowerCase());
        if (mentionNameStartIdx === null) check = true;
        // console.log(check);
        if (check) {
          arr.push(users[i]);
          bool = true;
        }
        setSearchSort([...arr]);
      }
    }
    if (!bool && mentionNameStartIdx !== null) {
      // console.log("!bool wala ran");
      setShowatRatpop(false);
      setMentionNameStartIdx(null);
    }
  }

  // console.log(
  //   "showatratpop...",
  //   showatratpop,
  //   mentionNameStartIdx,
  //   searchSort,
  //   mentionList
  // );

  const onMentionSelect = (mentionedUserData) => {
    // console.log("mention clicked", mentionedUserData);
    // mentionedUserData = {
    //   ...mentionedUserData,
    //   startIndex: mentionNameStartIdx,
    // };
    const newMentionList = mentionList;
    newMentionList.push(mentionedUserData);
    setMentionList(newMentionList);
    let name = mentionedUserData.name;
    let newMessageString = newmessage.slice(0, mentionNameStartIdx + 1) + name;
    // console.log("newMessageString...", newMessageString);
    setNewMessage(newMessageString);
    setShowatRatpop(false);
    setMentionNameStartIdx(null);
  };

  const ComPopover = () => {
    const [showfirst, setShowfirst] = useState(false);

    const FirstPop = () => {
      // const [typeaudience, setTypeaudience] = useState("");
      const [toAllEntre, setToAllEntre] = useState(false);
      const [toAllBusiness, setToAllBusiness] = useState(false);
      const [toAllContentCreator, setToAllContentCreator] = useState(false);

      return (
        <>
          <form className="firstpopup flex flex-col p-8 gap-8">
            <div className="fphead flex flex-col px-1">
              <h1
                className={`${Font.heading3} ${Font.font} ${Font.medium}`}
                style={{ color: "black" }}>
                Select audience
              </h1>
              <p className={`${Font.body2} ${Font.regular} ${Font.font}`}>
                Select audience who can view this message
              </p>
            </div>
            <div className="fptype flex flex-col p-0">
              <div className="flex flex-row items-center py-3 px-4 gap-3">
                <input
                  type="checkbox"
                  name="business"
                  id=""
                  value={toAllBusiness}
                  onChange={(e) => {
                    const { value, checked } = e.target;
                    // console.log(e, checked);
                    setToAllBusiness(checked);
                  }}
                  style={{ width: 20, height: 20, marginBottom: 4 }}
                />
                <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                  Only Businesses
                </p>
              </div>
              <div className="flex flex-row items-center py-3 px-4 gap-3">
                <input
                  type="checkbox"
                  name="entrepreneur"
                  id=""
                  value={toAllEntre}
                  onChange={(e) => {
                    const { value, checked } = e.target;
                    // console.log(e, checked);
                    setToAllEntre(checked);
                  }}
                  style={{ width: 20, height: 20, marginBottom: 4 }}
                />
                <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                  Only Entrepreneurs
                </p>
              </div>
              <div className="flex flex-row items-center py-3 px-4 gap-3">
                <input
                  type="checkbox"
                  name="contentCreator"
                  id=""
                  value={toAllContentCreator}
                  onChange={(e) => {
                    const { value, checked } = e.target;
                    // console.log(e, checked);
                    setToAllContentCreator(checked);
                  }}
                  style={{ width: 20, height: 20, marginBottom: 4 }}
                />
                <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                  Only Content creators
                </p>
              </div>
            </div>
            <div
              onClick={() => {
                setShowfirst(false);
                sendMessage({ toAllBusiness, toAllContentCreator, toAllEntre });
              }}
              className={`${Button.button} ${Button.primary} ${Button.medium}`}>
              <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                Continue
              </p>
            </div>
          </form>
        </>
      );
    };
    // /
    return (
      <Popover
        isOpen={showfirst && selectedChat?.isGroupChat && !replyState}
        positions={["top", "left"]}
        content={<FirstPop />}>
        <div onClick={() => setShowfirst(!showfirst)}>
          <button
            className="postbutton"
            onClick={() => {
              if (!selectedChat?.isGroupChat) {
                sendMessage({
                  toAllBusiness: true,
                  toAllContentCreator: true,
                  toAllEntre: true,
                });
              } else if (replyState) {
                sendMessage({
                  toAllBusiness: false,
                  toAllContentCreator: false,
                  toAllEntre: false,
                });
              }
            }}>
            <img src={Images.arrUpRight} alt="" />
          </button>
        </div>
      </Popover>
    );
  };
  // /
  const [searchPop, setSearchPop] = useState(false);

  const handlePops = (prop) => {
    if (prop === "star") {
      setStar(!star);
      setPop(false);
      setShowTooltip(false);
      setMembe(!memb);
      setSearchPop(false);
    }
    // else if(prop === 'memb'){
    //   setStar(false);
    //   setPop(false);
    //   setShowTooltip(false);
    //   setMembe(!memb);
    //   setSearchPop(false);
    // }
    else if (prop === "search") {
      setStar(false);
      setPop(false);
      setShowTooltip(false);
      setMembe(false);
      setSearchPop(!searchPop);
    }
  };

  const removeHandler = (val) => {
    let remainingFile = file.filter((e) => e !== val);
    setFile([...remainingFile]);
    setFileName(null);
    setN(n - 1);
  };
  const changeUploadhandler = (evnt) => {
    if (evnt.target.files.length >= 0) {
      setN(n + 1);
      // const selectedFIles = [];
      // const targetFiles = evnt.target.files;
      // const targetFilesObject = [...targetFiles];
      console.log("event.target..", evnt.target.files[0]);
      // targetFilesObject.map((file) => {
      //   return selectedFIles.push(URL.createObjectURL(file));
      // });
      // setFile([...file, selectedFIles]);
      // setFileName(evnt.target.files[0].name);
      setFile(evnt.target.files[0]);
      setFileName(evnt.target.files[0].name);
    }
  };

  useEffect(() => {
    // console.log("selectedChat....", selectedChat);
    const tempchatname =
      selectedChat?.users[0]?.name === user.name
        ? selectedChat?.users[1]?.name
        : selectedChat?.users[0]?.name;

    setChatName(tempchatname);
  }, [selectedChat]);
  // const chatname =
  //   selectedChat?.users[0]?.name === user.name
  //     ? selectedChat?.users[1]?.name
  //     : selectedChat?.users[0]?.name;

  return (
    <>
      <div className="group-chat-container">
        <div className="group-chat-header">
          <div className="g-c-h-container">
            <div className="g-c-h-left">
              <div
                onClick={() => {
                  navigate(-1);
                }}>
                <ChevronLeft width={25} height={25} color="#101828" />
              </div>
              <img
                onClick={() => {
                  if (selectedChat?.isGroupChat) {
                    navigate("/chat-box-memberList");
                  }
                }}
                src={Images.profile}
                alt=""
              />
              <h2
                onClick={() => {
                  if (selectedChat?.isGroupChat) {
                    navigate("/chat-box-memberList");
                  }
                }}
                className={`${Font.font} ${Font.heading1} ${Font.medium}`}>
                {selectedChat?.isGroupChat ? selectedChat?.chatName : chatName}
              </h2>
            </div>
            <div className="g-c-h-right">
              {/* <Search searchPop={searchPop} setSearchPop={setSearchPop} /> */}

              <button
                onMouseOver={() => setShowStarpop(true)}
                onMouseLeave={() => setShowStarpop(false)}
                style={{ position: "relative", width: "fit-content" }}
                className="popup bottom h-center"
                onClick={() => handlePops("star")}
                type="submit">
                {!star && <img src={Images.star} alt="" />}
                {star && <img src={Images.activestar} alt="" />}
                <BottomCenter show={showStarpop} text={"Starred Messages"} />
              </button>

              {/* {selectedChat?.isGroupChat && (
                <button
                  onMouseOver={() => setShowMemberpop(true)}
                  onMouseLeave={() => setShowMemberpop(false)}
                  style={{ position: "relative", width: "fit-content" }}
                  className="popup bottom "
                  onClick={() => handlePops("memb")}
                >
                  {!memb && <img src={Images.doubleman} alt="" />}
                  {memb && <img src={Images.Doublemanb} alt="" />}
                  <BottomLeft show={showMemberpop} text={"Group Members"} />
                </button>
              )} */}
            </div>
          </div>
        </div>
        <div className="group-chat-box-container w-full">
          <Group
            searchPop={searchPop}
            handlePops={handlePops}
            pop={pop}
            setPop={setPop}
            showTooltip={showTooltip}
            setShowTooltip={setShowTooltip}
            memb={memb}
            allMessages={messages}
            starredMess={starred}
            setMembe={setMembe}
            star={star}
            starf={starf}
            setStar={setStar}
            setOnRefresh={setOnRefresh}
            onRefresh={onRefresh}
            replyState={replyState}
            setReplyState={setReplyState}
            toReplyMessaegeData={toReplyMessaegeData}
            setToReplyMessageData={setToReplyMessageData}
          />
        </div>

        <div
          style={{ display: `${file.length == 0 ? "none" : ""}` }}
          className="upload-Box">
          <FilePond
            ref={(ref) => {
              pond = ref;
            }}
            files={file}
            allowReorder={true}
            // allowMultiple={true}
            onupdatefiles={setFile}
            maxFiles={1}
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          />
        </div>
        <div
          className={`announc-container ${memb && "myactive"}`}
          style={{ maxWidth: selectedChat?.isGroupChat ? 600 : "100%" }}>
          {replyState ? (
            <div className="reply-message-info-box">
              <div style={{ marginLeft: "2px" }}>
                Replying to <b>{toReplyMessaegeData.name}</b>
              </div>
              <div
                style={{ marginRight: "9%" }}
                onClick={() => {
                  setReplyState(false);
                }}>
                <X color="#424242" height="16px" width="16px" />{" "}
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="message-main-input-box">
            <Popover
              isOpen={showatratpop && selectedChat?.isGroupChat}
              positions={["top", "left"]}
              content={
                <Atpop
                  setShowatRatpop={setShowatRatpop}
                  showatratpop={showatratpop}
                  onMentionSelect={onMentionSelect}
                  searchSort={searchSort}
                />
              }>
              <label className="chat-post w-11/12" htmlFor="makepost">
                <div
                  onClick={() => {
                    pond.browse();
                  }}
                  className={`${Button.button} ${Button.tertiary} ${Button.small}`}>
                  <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                    <img src={Images.pluscircle} alt="" />
                  </p>
                </div>
                {
                  // n <= 0 && (
                  // <label
                  //   className="uploadmore flex flex-row gap-3 py-3"
                  //   htmlFor="cupload">
                  //   <input
                  //     style={{ display: "none" }}
                  //     id="cupload"
                  //     type="file"
                  //     onChange={changeUploadhandler}
                  //   />
                  //   <img src={Images.pluscircle} alt="" />
                  // </label>
                  // )
                }
                {
                  //   n > 0 && (
                  //   <div onClick={() => removeHandler(file[0])}>
                  //     <MinusCircle />
                  //   </div>
                  // )
                }
                <input
                  id="makepost"
                  type="text"
                  value={newmessage}
                  onChange={clickHandler}
                  placeholder={`${n <= 0 ? "Create Announcment" : fileName}`}
                />
              </label>
            </Popover>
            <ComPopover />
          </div>
        </div>
      </div>
    </>
  );
}

export default Groupchat;

// const allComp = [
//   { name: "Cameron Williamson", id: "0", check: false },
//   { name: "Guy Hawkins", id: "1", check: false },
//   { name: "Jenny Wilson", id: "2", check: false },
//   { name: "Ronald Richards", id: "3", check: false },
//   { name: "Rishu", id: "4", check: false },
//   { name: "Shubham", id: "5", check: false },
//   { name: "Pranit", id: "6", check: false },
//   { name: "Rahul", id: "7", check: false },
//   { name: "Cameron Williamson", id: "8", check: false },
//   { name: "Guy Hawkins", id: "9", check: false },
//   { name: "Jenny Wilson", id: "10", check: false },
//   { name: "Ronald Richards", id: "11", check: false },
//   { name: "Rishu", id: "12", check: false },
//   { name: "Shubham", id: "13", check: false },
//   { name: "Pranit", id: "14", check: false },
//   { name: "Rahul", id: "15", check: false },
//   { name: "Cameron Williamson", id: "16", check: false },
//   { name: "Guy Hawkins", id: "17", check: false },
//   { name: "Jenny Wilson", id: "18", check: false },
//   { name: "Ronald Richards", id: "19", check: false },
//   { name: "Rishu", id: "20", check: false },
//   { name: "Shubham", id: "21", check: false },
//   { name: "Pranit", id: "22", check: false },
//   { name: "Rahul", id: "23", check: false },
//   { name: "Cameron Williamson", id: "24", check: false },
//   { name: "Guy Hawkins", id: "25", check: false },
//   { name: "Jenny Wilson", id: "26", check: false },
//   { name: "Ronald Richards", id: "27", check: false },
//   { name: "Rishu", id: "28", check: false },
//   { name: "Shubham", id: "29", check: false },
//   { name: "Pranit", id: "30", check: false },
//   { name: "Rahul", id: "31", check: false },
//   { name: "Cameron Williamson", id: "32", check: false },
//   { name: "Guy Hawkins", id: "33", check: false },
//   { name: "Jenny Wilson", id: "34", check: false },
//   { name: "Ronald Richards", id: "35", check: false },
//   { name: "Rishu", id: "36", check: false },
//   { name: "Shubham", id: "37", check: false },
//   { name: "Pranit", id: "38", check: false },
//   { name: "Rahul", id: "39", check: false },
//   { name: "Nitin", id: "40", check: false },
// ];

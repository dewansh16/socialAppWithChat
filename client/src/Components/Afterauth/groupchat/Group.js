import { useState, useEffect, useContext, useRef } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
import Tooltip from "react-power-tooltip";
import { Images } from "../assets/Assets";
import axios from "axios";
import { UserContext } from "../../Navigation";
import { Link, useNavigate } from "react-router-dom";
import ProfileOther from "../profile/ProfileOther";
import ScrollableFeed from "react-scrollable-feed";
import { Avtar, Button, Font } from "../../../styling/Styles";
import { formatDate, formatAMPM } from "../../../utils/configDate";
import { ChevronDown, ChevronUP } from "../../assets/Icons";

function Group(props) {
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
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo._id;

  const userData = JSON.parse(localStorage.getItem("userInfo"));

  const messagesEndRef = useRef(null);
  // const [allMessages, setAllMessages] = useState(false);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  // console.log(props.onRefresh, fetchAgain, selectedChat);
  useEffect(() => {
    scrollToBottom({ behavior: "smooth" });
  }, [props.onRefresh, fetchAgain, selectedChat, props.allMessages]);

  const findRoleRelatedFilter = () => {
    // console.log("userData.role..", userData.role);
    if (userData.role === "Entrepreneur") return "EntrepreneurAccess";
    else if (userData.role === "Content Creator") return "contentCreatorAccess";
    else return "businessAccess";
  };

  // console.log(props.star)

  let a = [];

  const onMouseOver = (i, a) => {
    if (!props.star && !props.searchPop) props.setShowTooltip(true);
    a[i] = true;
    if (!arr[i]) setArr([...a]);
    // console.log(i)
    // console.log(arr[i]);
  };
  const onMouseLeave = (i, a) => {
    props.setShowTooltip(false);
    a[i] = false;
    if (arr[i]) setArr([...a]);
    // console.log(i)
    props.setPop(false);
  };

  const [arr, setArr] = useState([false, false, false]);

  const [starredArr, setStarredArr] = useState([]);

  const fetchStarredMessages = async () => {
    let starredMessageData;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = await axios.get(`/message/starred`, config);
      //   setAllMessages(data);
      starredMessageData = data.data?.starred_chat;
      setStarredArr(data);
    } catch (error) {
      console.log(error);
    }
    // console.log("starredMessageData...", starredMessageData);
  };

  useEffect(() => {
    fetchStarredMessages();
  }, []);

  const activateReplyState = (data) => {
    console.log("data from func...", data);
    props.setReplyState(true);
    props.setToReplyMessageData(data);
  };

  const Popup = ({ i, data }) => {
    // data.likesArr.includes(userId)
    // console.log("from popIn..", data.likesArr.includes(userId));
    // console.log(data.likesArr, userId);
    return (
      <>
        <Tooltip
          show={props.showTooltip && arr[i]}
          // animation="fade"
          position="top right"
          textBoxWidth="124px"
          padding=" 8px 8px"
          hoverBackground="#fff"
          background="#fff"
          moveUp="-70px"
          moveRight="-70px"
          // flat={true}
        >
          <img
            onClick={() => {
              if (!data.likesArr?.includes(userId)) {
                likeMessage(i);
              } else {
                unlikeMessage(i);
              }
            }}
            src={
              data.likesArr?.includes(userId) ? Images.redheart : Images.heart
            }
            alt=""
          />
          <img
            onClick={() => {
              activateReplyState(data);
            }}
            src={Images.cul}
            alt=""
          />
          <div
            className="popupsbutoon"
            onClick={() => props.setPop(!props.pop)}>
            <PopupIN i={i} data={data} />
            <img src={Images.horizontal} alt="" />
          </div>
        </Tooltip>
      </>
    );
  };
  // /
  const PopupIN = ({ i, data }) => {
    return (
      <>
        <Tooltip
          show={props.pop && arr[i]}
          // animation="fade"
          position="bottom right"
          textBoxWidth="146px"
          padding=" 8px 8px"
          hoverBackground="#F5F5F5"
          background="#fff"
          // moveUp="-70px"
          moveRight="-94px"
          // flat={true}
        >
          <p
            onClick={() => {
              navigate(`/Profile/:${data.name}`, { state: data.id });
            }}>
            {" "}
            <span style={{ width: 10 }}></span> View Profile
          </p>
          {/* in place of false write !(datamessage[i]['isStared']) when you change the APIs */}
          <p
            className={`${false && "star-text-dis"}`}
            onClick={() => starMessage(i)}>
            {" "}
            <span style={{ width: 10 }}></span> Star Message
          </p>
          {/* in place of false write (datamessage[i]['isStared']) when you change the APIs */}
          <p className={`${true && "star-text-dis"}`} onClick={() => unStar(i)}>
            {" "}
            <span style={{ width: 10 }}></span> Unstar Message
          </p>
        </Tooltip>
      </>
    );
  };
  // /
  const allMembers = selectedChat?.users || [];
  let bussinessMembers = [];
  let entreMembers = [];
  let contentMembers = [];
  // console.log("selectedChatMembers...", allMembers);

  for (let i = 0; i < allMembers.length; i++) {
    if (allMembers[i].role === "Content Creator") {
      contentMembers.push({
        imglink: allMembers[i].pic,
        // name: allMembers[i].firstname + " " + allMembers[i].lastname,
        name: allMembers[i].name,
        data: allMembers[i],
      });
    } else if (allMembers[i].role === "Entrepreneur") {
      entreMembers.push({
        imglink: allMembers[i].pic,
        // name: allMembers[i].firstname + " " + allMembers[i].lastname,
        name: allMembers[i].name,
        data: allMembers[i],
      });
    } else {
      bussinessMembers.push({
        imglink: allMembers[i].pic,
        // name: allMembers[i].firstname + " " + allMembers[i].lastname,
        name: allMembers[i].name,
        data: allMembers[i],
      });
    }
  }
  const [showBus, setShowBus] = useState(false);
  const [showEntre, setShowEntre] = useState(false);
  const [showCon, setShowCon] = useState(false);
  let members = [];
  if (bussinessMembers.length > 0) {
    members.push({
      type: "Businesses",
      member: bussinessMembers,
    });
  }
  if (entreMembers.length > 0) {
    members.push({
      type: "Entrepreneurs",
      member: entreMembers,
    });
  }
  if (contentMembers.length > 0) {
    members.push({
      type: "Content Creators",
      member: contentMembers,
    });
  }

  const starMessage = async (i) => {
    console.log("datamessage[i]....", datamessage[i]);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `/message/starred/${datamessage[i].messageId}`,
        config
      );
      if (props.setOnRefresh) {
        props.setOnRefresh(!props.onRefresh);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const likeMessage = async (i) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `/message/${datamessage[i].messageId}/like`,
        {},
        config
      );
      if (props.setOnRefresh) {
        props.setOnRefresh(!props.onRefresh);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const unlikeMessage = async (i) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `/message/${datamessage[i].messageId}/unlike`,
        config
      );
      if (props.setOnRefresh) {
        props.setOnRefresh(!props.onRefresh);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let allMessages = props.allMessages;
  let allStarred = [];

  try {
    allStarred = props.starredMess.data.starred_chat;
  } catch (error) {
    console.log(error);
  }

  useEffect(() => {}, [starredArr]);

  let datamessage = [];
  let targetTag = findRoleRelatedFilter();
  // console.log("targetTag....", targetTag);
  for (let i = 0; i < allMessages.length; i++) {
    if (
      allMessages[i][targetTag] ||
      allMessages[i].sender?._id === userData._id ||
      allMessages[i].replies?.sender?._id === userData._id
    ) {
      let message = {
        name: allMessages[i].sender?.name,
        pic: allMessages[i].sender?.pic,
        date: allMessages[i].createdAt
          ? formatDate(allMessages[i].createdAt)
          : "",
        time: allMessages[i].createdAt
          ? formatAMPM(allMessages[i].createdAt)
          : "",
        text: allMessages[i].content || "",
        id: allMessages[i].sender?._id,
        messageId: allMessages[i]._id,
        likes: allMessages[i].likes?.length,
        likesArr: allMessages[i].likes || [],
        replied: allMessages[i].replies,
        repliedMessageSender: allMessages[i].replies?.sender,
        post: allMessages[i].post,
        postName: allMessages[i].postName,
        isStarred: allMessages[i].isStarred,
        // 'isStared':true,
        // 'check':false,
      };
      datamessage.push(message);
      a.push(false);
    }
  }
  // console.log("allMessages.....", allMessages);

  const trimReplyData = (contentString) => {
    if (contentString.length > 30) {
      return contentString.slice(0, 30) + "...";
    } else return contentString;
  };

  const trimFileName = (postFileName) => {
    if (postFileName.length > 30) {
      return "..." + postFileName.slice(-30);
    } else return postFileName;
  };

  // useEffect(() => {}, [starredArr]);

  // console.log("dataMessage...", datamessage);

  let staredChat = [];

  for (let i = 0; i < allStarred.length; i++) {
    let schat = {
      name: allStarred[i].name,
      date: allStarred[i].createdAt ? formatDate(allStarred[i].createdAt) : "",
      time: allStarred[i].createdAt ? formatAMPM(allStarred[i].createdAt) : "",
      text: allStarred[i].content,
      likes: allStarred[i].likes?.length,
      isStared: true,
      // check: false,
      id: allStarred[i]._id,
      pic: allStarred[i].sender.pic,
    };
    staredChat.push(schat);
  }
  // console.log(staredChat, datamessage, "osdnwod");

  const unStar = async (input) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `/message/unstarred/${staredChat[input].id}`,
        config
      );
      // console.log(data)
      // props.setStar(!props.star)
    } catch (error) {
      console.log(error);
    }
    // props.setStar(true);
  };

  // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  //   setPageNumber(1);
  // }

  return (
    <>
      {props.star && (
        <div className="stared-chat " style={{ minWidth: "40%" }}>
          <div className="s-c-heading">
            <h2>Starred Messages</h2>
          </div>
          <div className="group-chat-box">
            {staredChat.length > 0
              ? staredChat.map((input, i) => (
                  <div key={i} className={`posted-chat }`}>
                    <img
                      className={`${Avtar.avtar} ${Avtar["large"]}`}
                      src={input.pic}
                      alt=""
                    />
                    <div className="chat-text">
                      <div className="persional-info">
                        <h3>{input.name}</h3>
                        <p>
                          <span>{input.date}</span>
                          <span>{input.time}</span>{" "}
                        </p>
                      </div>
                      <div className="g-c-text">
                        <p>{input.text}</p>
                        {input.check && (
                          <p className="mt-5">
                            <a href="">https://forms.gle/AR3xiKDidVCVh2X77</a>
                          </p>
                        )}
                      </div>
                      {input.check && (
                        <button className="link-image">
                          <div className="link-image-text">
                            <p>Google Docs</p>
                            <h1>User Research Survey</h1>
                          </div>
                          <img src={Images.imglink} alt="" />
                        </button>
                      )}
                      <div className="like-star">
                        {input.likes > 0 && (
                          <button className="like-star-box">
                            <p>{input.likes}</p>
                            <img src={Images.redheart} alt="" />
                          </button>
                        )}
                        {input.isStared && (
                          <button
                            onClick={() => unStar(i)}
                            className="like-star-box">
                            <img src={Images.stared} alt="" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              : "No messages starred"}
          </div>
        </div>
      )}
      <div className="group-chat-box">
        {/* {(pop)&&<div className="hoverpop">
            
        </div> } */}
        {props.memb && selectedChat?.isGroupChat && (
          <div className="group-member">
            {/* <button onClick={() => props.setMembe(false)}>
              <img src={Images.cross} alt="" />
            </button> */}

            <div className="flex flex-row w-full justify-between py-2 px-3 gap-2">
              <p
                className={`${Font.font} ${Font.body2} ${Font.medium}`}
                style={{ color: "#242424" }}>
                Group Members
              </p>
            </div>

            {members
              .filter((e) => e.type === "Businesses")
              .map((input, i) => (
                <div key={i} className="g-m-box">
                  <div
                    className="flex justify-between w-full"
                    onClick={() => setShowBus(!showBus)}>
                    <p
                      className={`${Font.font} ${Font.body2} ${Font.medium}`}
                      style={{
                        color: "#616161",
                        padding: "0 0.75rem",
                        marginRight: "9.2rem",
                      }}>
                      Businesses
                    </p>

                    {!showBus && <ChevronUP color="#616161" />}
                    {showBus && <ChevronDown color="#616161" />}
                    {/* <img src={Images.down} alt="" /> */}
                  </div>
                  {!showBus &&
                    input["member"].map((member, i) => (
                      <Link
                        to={`/Profile/${member.name}`}
                        state={member.data._id}>
                        {" "}
                        <div key={i} className="g-m-indiv">
                          <img
                            src={member.imglink}
                            alt=""
                            className={`${Avtar.large} ${Avtar.avtar}`}
                          />
                          <p
                            className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                            {member.name}
                          </p>
                        </div>
                      </Link>
                    ))}
                </div>
              ))}

            {members
              .filter((e) => e.type === "Entrepreneurs")
              .map((input, i) => (
                <div key={i} className="g-m-box">
                  <div
                    className="flex justify-between w-full"
                    onClick={() => setShowEntre(!showEntre)}>
                    <p
                      className={`${Font.font} ${Font.body2} ${Font.medium}`}
                      style={{
                        color: "#616161",
                        padding: "0 0.75rem",
                        marginRight: "7.8rem",
                      }}>
                      Entrepreneurs
                    </p>

                    {!showEntre && <ChevronUP color="#616161" />}
                    {showEntre && <ChevronDown color="#616161" />}
                    {/* <img src={Images.down} alt="" /> */}
                  </div>
                  {!showEntre &&
                    input["member"].map((member, i) => (
                      <Link
                        to={`/Profile/${member.name}`}
                        state={member.data._id}>
                        <div key={i} className="g-m-indiv">
                          <img
                            src={member.imglink}
                            alt=""
                            className={`${Avtar.large} ${Avtar.avtar}`}
                          />
                          <p
                            className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                            {member.name}
                          </p>
                        </div>
                      </Link>
                    ))}
                </div>
              ))}
            {members
              .filter((e) => e.type === "Content Creators")
              .map((input, i) => (
                <div key={i} className="g-m-box">
                  <div
                    className="flex justify-between w-full"
                    onClick={() => setShowCon(!showCon)}>
                    <p
                      className={`${Font.font} ${Font.body2} ${Font.medium}`}
                      style={{
                        color: "#616161",
                        padding: "0 0.75rem",
                        marginRight: "6.5rem",
                      }}>
                      Content Creators
                    </p>

                    {!showCon && <ChevronUP color="#616161" />}
                    {showCon && <ChevronDown color="#616161" />}
                    {/* <img src={Images.down} alt="" /> */}
                  </div>
                  {!showCon &&
                    input["member"].map((member, i) => (
                      <Link
                        to={`/Profile/${member.name}`}
                        state={member.data._id}>
                        {" "}
                        <div key={i} className="g-m-indiv">
                          <img
                            src={member.imglink}
                            alt=""
                            className={`${Avtar.large} ${Avtar.avtar}`}
                          />
                          <p
                            className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                            {member.name}
                          </p>
                        </div>
                      </Link>
                    ))}
                </div>
              ))}
          </div>
        )}

        <>
          {datamessage.map((input, i) => (
            <>
              <div key={i} className="chat-message-box">
                {input.replied ? (
                  <div className="replied-message-heading">
                    <div>- {input.repliedMessageSender.name}</div>
                    <div>{trimReplyData(input.replied.content)}</div>
                  </div>
                ) : (
                  ""
                )}
                <div
                  className={`posted-chat ${
                    props.showTooltip && arr[i] && "myactive"
                  }`}>
                  <img
                    className={`${Avtar.avtar} ${Avtar["large"]}`}
                    src={input.pic}
                    alt=""
                  />
                  {
                    // <img src={Images.profileImage} alt="" />
                  }
                  <div
                    onMouseOver={() => onMouseOver(i, a)}
                    onMouseLeave={() => onMouseLeave(i, a)}
                    className="chat-text">
                    <Popup i={i} data={input} />
                    <div className="persional-info">
                      <h3>{input.name}</h3>
                      <p>
                        <span>{input.date}</span>
                        <span>{input.time}</span>{" "}
                      </p>
                    </div>
                    <div className="g-c-text">
                      {input.postName && (
                        <>
                          {input.postName?.match(/\.(jpg|jpeg|png|gif)$/) ? (
                            <img src={`${input.post}`} alt="no_image" />
                          ) : (
                            <div className="message-for-download-div">
                              <div
                                style={{
                                  width: "60%",
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  alignItems: "center",
                                }}>
                                {trimFileName(input.postName)}
                              </div>
                              <div
                                style={{
                                  width: "40%",
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  alignItems: "center",
                                }}>
                                <a
                                  className={`${Button.button} ${Button.secondary} `}
                                  href={`${input.post}`}
                                  target="_blank"
                                  download>
                                  <div>
                                    <p>download</p>
                                  </div>
                                </a>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                      <p>{input.text}</p>
                    </div>
                    {input.check && (
                      <button className="link-image">
                        <div className="link-image-text">
                          <p>{input["image"].type}</p>
                          <h1>{input["image"].heading}</h1>
                        </div>
                        <img src={Images.imglink} alt="" />
                      </button>
                    )}
                    {/* below commented code is for star and likes uncomment and use it when you chenge the APIs*/}
                    {
                      <div className="like-star">
                        {input.likes > 0 && (
                          <button className="like-star-box">
                            <p>{input.likes}</p>
                            <img src={Images.redheart} alt="" />
                          </button>
                        )}
                        {staredChat.filter((e) => e.id === input.messageId)
                          .length > 0 && (
                          <button
                            onClick={() => unStar(i)}
                            className="like-star-box">
                            <img src={Images.stared} alt="" />
                          </button>
                        )}
                      </div>
                    }
                  </div>
                </div>
              </div>
              {/* if there is a reply feature */}
              {/* <div className="reply">
                <div key={i} className={`posted-chat `}>
                  <img src={Images.profileImage} alt="" />
                  <div
                    // onMouseOver={() => onMouseOver(i, a)}
                    // onMouseLeave={() => onMouseLeave(i, a)}
                    className="chat-text"
                  >
                    <div className="persional-info">
                      <h3>{input.name}</h3>
                      <p>
                        <span>{input.date}</span>
                        <span>09:50 PM</span>{" "}
                      </p>
                    </div>
                    <div className="g-c-text">
                      <p>{input.text}</p>
                    </div>
                    {input.check && (
                      <button className="link-image">
                        <div className="link-image-text">
                          <p>{input["image"].type}</p>
                          <h1>{input["image"].heading}</h1>
                        </div>
                        <img src={Images.imglink} alt="" />
                      </button>
                    )} */}
              {/* below commented code is for star and likes uncomment and use it when you chenge the APIs*/}
              {/* <div className="like-star">
                    {(input.likes > 0) &&<button className="like-star-box">
                        <p>{input.likes}</p>
                        <img src={Images.redheart} alt="" />
                    </button>}
                    {(input.isStared)&& <button onClick={()=>unStar(i)} className="like-star-box">
                        <img src={Images.stared} alt="" />
                    </button>}
                </div> */}
              {/* </div>
                </div>
              </div> */}
            </>
          ))}
          <div ref={messagesEndRef} />
        </>
      </div>
    </>
  );
}

// const members = [
// {
//     'type':'Bussinesses',
//     'member':[
//         {'imglink':'','name':'Kathryn Murphy'},
//         {'imglink':'','name':'Darrell Steward'},
//         {'imglink':'','name':'Theresa Webb'},
//         {'imglink':'','name':'Cameron Williamson'},
//     ]
// },
//     {
//         'type':'Entrepreneurs',
//         'member':[
//             {'imglink':'','name':'Arlene McCoy'},
//             {'imglink':'','name':'Marvin McKinney'},
//             {'imglink':'','name':'Jacob Jones'},
//             {'imglink':'','name':'Cameron Williamson'},
//         ]
//     },
//     {
//         'type':'ContentCreators',
//         'member':[
//             {'imglink':'','name':'Arlene McCoy'},
//             {'imglink':'','name':'Marvin McKinney'},
//             {'imglink':'','name':'Jacob Jones'},
//             {'imglink':'','name':'Cameron Williamson'},
//         ]
//     },
// ]

// const staredChat = [
//     {
//         'name':'Pooja Niwasan',
//         'date':'12/11/2017',
//         'time':'09:01 PM',
//         'text':"I have started front end part yesterday. And today  I will continue that as Nitin complete that ui part.",
//         'likes':409,
//         'isStared':true,
//         'check':false,
//     },
//     {
//         'name':'Robert Fox',
//         'date':'12/11/2017',
//         'time':'09:01 PM',
//         'text':"I have started front end part yesterday. And today  I will continue that as Nitin complete that ui part.",
//         'likes':33,
//         'isStared':true,
//         'check':false,
//     },
//     {
//         'name':'Darrell Steward',
//         'date':'12/11/2017',
//         'time':'09:01 PM',
//         'text':"I have started front end part yesterday. And today I will continue that as Nitin complete that ui part.",
//         'likes':0,
//         'isStared':true,
//         'check':false,
//     },
//     {
//         'name':'Eleanor Pena',
//         'date':'12/11/2017',
//         'time':'09:01 PM',
//         'text':"I have started front end part yesterday. And today  I will continue that as Nitin complete that ui part.",
//         'likes':99,
//         'isStared':true,
//         'check':false,
//     },
// ]

// const datamessage = [
//     {
//         'name':'Nitin.S',
//         'date':'12/11/2017',
//         'time':'09:01 PM',
//         'text':"Hey everyone. I'm working on a productivity app. And need to know more about usage habits of a user. Please fill the survey. It will only take 5 minutes of your time. Thank you",
//         'link':'https://forms.gle/AR3xiKDidVCVh2X77',
//         'image':{
//             'type':'Google Docs',
//             'heading':'User Research Survey',
//             'imglink':Images.imglink
//         },
//         'likes':78,
//         'isStared':true,
//         'check':true,
//     },
//     {
//         'name':'Pooja Niwasan',
//         'date':'12/11/2017',
//         'time':'09:01 PM',
//         'text':'I have started front end part yesterday. And today  I will continue that as Nitin complete that ui part.',
//         'likes':78,
//         'isStared':true,
//         'check':false,
//     },
//     {
//         'name':'Shubham.C',
//         'date':'12/11/2017',
//         'time':'09:01 PM',
//         'text':"Hey everyone. I'm working on a productivity app. And need to know more about usage habits of a user. Please fill the survey. It will only take 5 minutes of your time. Thank you",
//         'likes':78,
//         'isStared':true,
//         'check':false,
//     }
// ]

// {
//code to render pdf files using react-pdf
// <Document
// className="pdf-display-box"
// file={`http://localhost/chatData/images/${input.post} `}
// onLoadSuccess={onDocumentLoadSuccess}>
// <Page pageNumber={1} />
// </Document>
// }

export default Group;

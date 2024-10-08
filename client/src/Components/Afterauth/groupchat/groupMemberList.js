import { useContext, useState, useEffect } from "react";
import { Avtar, Font } from "../../../styling/Styles";
import { Images } from "../assets/Assets";
import { ChevronLeft, ChevronUP, ChevronDown } from "../../assets/Icons";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Navigation";
import "./groupMemberList.css";

function GroupMemberList() {
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
  const [chatName, setChatName] = useState("");
  const [showBus, setShowBus] = useState(false);
  const [showEntre, setShowEntre] = useState(false);
  const [showCon, setShowCon] = useState(false);

  useEffect(() => {
    console.log("selectedChat....", selectedChat);
    const tempchatname =
      selectedChat?.users[0]?.name === user.name
        ? selectedChat?.users[1]?.name
        : selectedChat?.users[0]?.name;

    setChatName(tempchatname);
  }, [selectedChat]);

  const allMembers = selectedChat?.users || [];
  let bussinessMembers = [];
  let entreMembers = [];
  let contentMembers = [];

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

  return (
    <div className="group-members-container-page">
      <div style={{ height: "80px" }} className="group-chat-header">
        <div className="g-c-h-container">
          <div className="g-c-h-left-mobile">
            <div
              onClick={() => {
                navigate(-1);
              }}>
              <ChevronLeft width={25} height={25} color="#101828" />
            </div>
            <img src={Images.profile} alt="" />
            <h2 className={`${Font.font} ${Font.heading3} ${Font.medium}`}>
              Group Members
            </h2>
          </div>
          <div
            style={{ color: "#138DEC" }}
            className="g-c-h-right">{`(${allMembers.length})`}</div>
        </div>
      </div>
      {selectedChat?.isGroupChat && (
        <div className="group-members-container-mobile">
          {members
            .filter((e) => e.type === "Businesses")
            .map((input, i) => (
              <div key={i} className="g-m-box-mobile">
                <div
                  className="flex justify-between w-full"
                  onClick={() => setShowBus(!showBus)}>
                  <p
                    className={`${Font.font} ${Font.body1} ${Font.medium}`}
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
              <div key={i} className="g-m-box-mobile">
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
              <div key={i} className="g-m-box-mobile">
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
    </div>
  );
}

export default GroupMemberList;

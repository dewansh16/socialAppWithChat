import React from "react";
import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
import {
  Avtar,
  Font,
  OptionSearch,
  ThemeSearch,
} from "../../../styling/Styles";
import { Bell, BellActive, Search, TV } from "../../assets/Icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../Navigation";
import { useState, useContext, useEffect } from "react";
import { Dialog } from "@mui/material";
import NotificationPop from "./NotificationPop";
import ProfilePop from "./ProfilePop";
import ReactSelect from "react-select";
import { Popover } from "react-tiny-popover";
import Tooltip from "react-power-tooltip";
import { Images, ImgHome } from "../assets/Assets";

function Profile() {
  const navigate = useNavigate();

  // console.log(location);
  // const [error, setError] = useState(false);
  // const [searchData, setSearchData] = useState([]);
  const [notifPop, setNotifPop] = useState(false);
  const [allMembers, setAllMembers] = useState([]);
  const [val, setVal] = useState("");

  const [window, setWindow] = useState(false);

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
    notifi,
    setNotifi,
  } = useContext(UserContext);

  // const fetchUsers = async () => {
  //   try {
  //     var { data } = await axios.get(`/allUsers`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     setAllMembers([...data]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  const fetchNotifications = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        "/connections/connection/notifications",
        config
      );
      let notifications = data.notifications || [];
      let flag = false;
      notifications.map((item) => {
        if (!item.seen) flag = true;
      });

      console.log("inside nevbar fn call flag = ", flag);
      if (flag) setNotifi(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchUsersonLetters = async (letters) => {
    if (letters) {
      console.log("letters = ", letters);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(`/allUsers?search=${letters}`, config);
        console.log("fetchusersfromLetters = ", data);
        setAllMembers([...data]);
      } catch (error) {
        console.log(error);
      }
    } else {
      setAllMembers([]);
    }
  };

  const allMembersName = [];

  for (let i = 0; i < allMembers.length; i++) {
    allMembersName.push({
      name: allMembers[i].name,
      id: allMembers[i]._id,
      imglink: "",
      data: allMembers[i],
    });
  }

  const option = allMembersName.map((item, i) => {
    return {
      label: item.name,
      value: item.id,
      ...item,
    };
  });

  const handleSearch = (member) => {
    console.log(member);
    navigate(`/Profile/:${member["name"]}`, { state: member.id });
  };

  return (
    <>
      {/* <Dialog
        fullWidth={false}
        maxWidth="xl"
        open={notifPop}
        onClose={() => setNotifPop(false)}
      >
        <NotificationPop notifPop={notifPop} setNotifPop={setNotifPop} />
      </Dialog> */}
      <div className="desktop profile px-10 w-full pt-4 ">
        <div className="profile-navbar mb-10">
          <label htmlFor="searching" className="memberSearch">
            {/* <input onChange={(e)=>handleSearch(e)} id='searching' type="text" placeholder='Search Influencers, Entrepreneurs & Start-ups...'  /> */}
            <ReactSelect
              options={option}
              value={val}
              className="w-full search-drop"
              classNamePrefix="mySelect"
              theme={(theme) => ThemeSearch(theme)}
              styles={OptionSearch}
              placeholder="Search Influencers, Entrepreneurs & Start-ups..."
              onInputChange={(value) => {
                fetchUsersonLetters(value);
                // console.log(value);
              }}
              onChange={(value) => {
                handleSearch(value);
                setVal("");
              }}
              // isDisabled={props.disable}
            />
            <Search color={"#242424"} />
          </label>
          <div className="profile-right-nav">
            {
              // <button
              // className={`button secondary large`}
              // onClick={() => navigate("/contact")}>
              // <TV color="#242424" />
              // <p className={`${Font.font} ${Font.body1} ${Font.medium}`}>
              //   Get Demo
              // </p>
              // </button>
            }
            {/* Remove both bell icon by replacing globel true from globle boolean same as used in group chat to check and pass message data of perticualar candidate or group */}
            {/* I have used that globel variable to remove member list icon in chat box you may check there */}
            <Popover
              isOpen={notifPop}
              positions={["bottom", "left"]}
              content={
                <NotificationPop
                  setNotifPop={setNotifPop}
                  notifPop={notifPop}
                />
              }>
              {/* {notifi && true && (
                <button className="button secondary iconlarge">
                </button>
              )} */}
              {true && (
                <button
                  style={notifi ? { border: "1px solid red" } : {}}
                  className="button secondary iconlarge"
                  onClick={() => {
                    setNotifPop(!notifPop);
                    setWindow(false);
                  }}>
                  {/* when there is a notification */}
                  {notifi && <Bell color="red" />}
                  {!notifi && <Bell color="#242424" />}
                </button>
              )}
            </Popover>

            <Popover
              isOpen={window}
              positions={["bottom", "left"]}
              content={<ProfilePop />}>
              {true && (
                <button
                  onClick={() => {
                    setWindow(!window);
                    setNotifPop(false);
                  }}>
                  <img
                    className={`${Avtar.large} ${Avtar.avtar}`}
                    src={user.pic}
                    alt=""
                  />
                </button>
              )}
            </Popover>

            {/* <button onClick={handleLogout} className={`${Avtar.large} ${Avtar.avtar}`} ><p>Logout</p></button> */}
          </div>
        </div>

        <Outlet />
      </div>

      <div className="resp">
        <div className=" profile w-full pt-4 ">
          <div className="profile_navbar">
            <img
              onClick={() => navigate("/Profile/own")}
              src={Images.redlogo}
              alt="logo"
            />

            <div className="profile_navbar_items">
              <button onClick={() => navigate("/MobSearch")}>
                <Search color={"#242424"} />
              </button>
              <button onClick={() => navigate("/Notifications")}>
                {notifi && <Bell color="red" />}
                {!notifi && <Bell color="#242424" />}
              </button>

              <img
                className={`${Avtar.small} ${Avtar.avtar}`}
                src={user.pic}
                alt=""
              />
            </div>
          </div>

          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Profile;

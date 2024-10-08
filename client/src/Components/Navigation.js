import React from "react";
import Home from "./home/Home";
import Navbar from "./home/Navbar";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import About from "./about us/About";
import Contact from "./contact/Contact";
import Terms from "./bottom-contacts/Terms";
import Blogs from "./blogs/Blogs";
import Signin from "./signin/Signin";
import Groupchat from "./Afterauth/groupchat/Groupchat";
import ProfileOther from "./Afterauth/profile/ProfileOther";
import Sidenavbar from "./Afterauth/Sidenavbar";
import ProfileSelf from "./Afterauth/profile/ProfileSelf";
import Analysis from "./Afterauth/profile/Analysis";
import Forgot from "./signin/ForgotPassword/Forgot";
import Profile from "./Afterauth/profile/Profile";
import Ppage2 from "./signin/ForgotPassword/Ppage2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ESignup from "./signup/SocialMedia/ESignup";
import DetailsReceived from "./signup/DetailsRecieved";
import { createContext, useContext, useEffect, useState } from "react";
import Barchar from "./Afterauth/profile/Bar";
import Ppage3 from "./signin/ForgotPassword/Ppage3";
import Middleauth from "./signup/Middleauth";
import SocialMedia from "./signup/SocialMedia";
import Signup from "./signup/Signup";
import CreatePassword from "./signin/CreatePassword/Page1";
import FeaturedLinks from "./Afterauth/profile/featuredLinks";
import Events from "./Afterauth/profile/Events";
import ChangePassword from "./Afterauth/profile/ChangePassword";
import Network from "./network/network";
import NotificationMob from "./Afterauth/profile/NotificationMob";
import MobSearch from "./mobSearch/mobSearch";
import GroupMemberList from "./Afterauth/groupchat/groupMemberList";

// import ChatState from '../Context/ChatProvider'
export const UserContext = React.createContext(null);

function Navigation() {
  const [selectedChat, setSelectedChat] = useState();
  const [allUsers, setAllUsers] = useState();
  const [passwordUrl, setPasswordUrl] = useState("/");
  const [allUserAna, setAllUserAna] = useState();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [chats, setChats] = useState([]);
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("userToken"))
  );
  const [fetchAgain, setFetchAgain] = useState(false);
  const [notifi, setNotifi] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    let a = [];
    setAllUserAna(a);
    var data = axios
      .get(`/allUsers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAllUserAna([...res.data]);
      });
  }, []);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    setUser(userInfo);
    setToken(userToken);
    // if (!userInfo || !userToken) navigate("/sign-in");

    const selectedChatInfo = JSON.parse(
      localStorage.getItem("selectedChatInfo")
    );
    if (selectedChatInfo) setSelectedChat(selectedChatInfo);

    setFetchAgain(!fetchAgain);
    // fetchChats();
  }, []);

  const location = useLocation();
  // console.log(location);
  let ltoken = "";
  let ctoken = "";

  if (location.pathname.substring(1, 14) === "resetPassword")
    ltoken = location.pathname;
  else if (location.pathname.substring(1, 15) === "createPassword")
    ctoken = location.pathname;

  // console.log("token", ltoken, ctoken);
  // console.log(ltoken.substring(0, 14));
  // if(ltoken.substring(0, 14)==='/')

  return (
    <div className="uttertale items-center w-full flex flex-col">
      <UserContext.Provider
        value={{
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
          setPasswordUrl,
          passwordUrl,
          allUserAna,
          setAllUserAna,
          notifi,
          setNotifi,
        }}>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/term-service" element={<Terms />} />
            <Route path="/blog" element={<Blogs />} />
          </Route>

          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up/" element={<Signup />} />
          <Route path="/sign-up/email-verify" element={<Middleauth />} />
          <Route path="/sign-up/social-details" element={<SocialMedia />} />
          <Route
            path="/sign-up/details-received"
            element={<DetailsReceived />}
          />

          <Route path="/" element={<Sidenavbar />}>
            <Route path="chat-box" element={<Groupchat />} />
            <Route path="chat-box-member" element={<Groupchat />} />
            <Route path="chat-box-memberList" element={<GroupMemberList />} />
            <Route path="Notifications" element={<NotificationMob />} />
            <Route path="MobSearch" element={<MobSearch />} />
            <Route path="Profile" element={<Profile />}>
              <Route path=":name" element={<ProfileOther />} />
              <Route path="Own" element={<ProfileSelf />} />
              <Route path="FeaturedLinks" element={<FeaturedLinks />} />
              <Route path="Events" element={<Events />} />
              <Route path="Network" element={<Network />} />
            </Route>
          </Route>

          {ctoken !== "" && (
            <Route path={`${ctoken}`} element={<CreatePassword />} />
          )}
          <Route path="/Forgot-Password" element={<Forgot />} />
          <Route path={`/password-changed`} element={<Ppage3 />} />
          {ltoken !== "" && <Route path={`${ltoken}`} element={<Ppage2 />} />}
          <Route path="/bar" element={<Barchar />} />
          <Route path="/ChangePassword/:id" element={<ChangePassword />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default Navigation;

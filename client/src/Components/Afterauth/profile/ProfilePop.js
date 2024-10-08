import React, { useContext, useEffect, useState } from "react";
import { Button, Font } from "../../../styling/Styles";
import "./NotificationPop.css";
import { UserContext } from "../../Navigation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePop = () => {
  const { user, token, setToken, fetchAgain, setFetchAgain } =
    useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    setToken("");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userToken");
    localStorage.removeItem("selectedChatInfo");
  };

  return (
    <div
      className="notificationpop "
      style={{
        width: "max-content",
        alignItems: "flex-end",
        marginRight: "40px",
        paddingTop: "20px",
      }}
    >
      <div className="flex items-center  px-2 hedingnot">
        <p
          className={`${Font.font} ${Font.body2} ${Font.medium}`}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/ChangePassword/${token}`)}
        >
          Change Password
        </p>
      </div>

      <div className="flex items-center  px-2 hedingnot">
        <p
          className={`${Font.font} ${Font.body2} ${Font.medium}`}
          style={{ cursor: "pointer" }}
          onClick={handleLogout}
        >
          Logout
        </p>
      </div>
    </div>
  );
};

export default ProfilePop;

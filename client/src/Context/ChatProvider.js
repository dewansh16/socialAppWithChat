import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [chats, setChats] = useState();
  const [token, setToken] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    setUser(userInfo);
    setToken(userToken);

    if (!userInfo || !userToken) navigate("/sign-in");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        chats,
        setChats,
        token,
        setToken,
      }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "../assets/Icons";
import { Font, Button, OptionSearch, ThemeSearch } from "../../styling/Styles";
import { UserContext } from "../Navigation";
import ReactSelect from "react-select";
import axios from "axios";
import "./mobSearch.css";

function MobSearch() {
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
  } = useContext(UserContext);
  const navigate = useNavigate();
  const [allMembers, setAllMembers] = useState([]);
  const [val, setVal] = useState("");

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

  const handleSearch = (member) => {
    console.log(member);
    navigate(`/Profile/:${member["name"]}`, { state: member.id });
  };

  const goBackToPreviousPage = () => {
    navigate(-1);
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

  return (
    <div style={{ width: "100%" }}>
      <div
        className="flex flex-row gap-2 hedingnot"
        style={{
          borderBottom: "1px solid var(--fill-border, #D1D1D1)",
          padding: "16px",
        }}>
        <button onClick={goBackToPreviousPage}>
          <ArrowLeft color="#242424" />
        </button>
        <p
          style={{
            width: "100%",
          }}
          className={`${Font.font} ${Font.body2} ${Font.medium} mt-1`}>
          Search
        </p>
      </div>
      <div className="mobsearch-profile-navbar">
        <label htmlFor="searching" className="memberSearch">
          <ReactSelect
            options={option}
            value={val}
            className="w-full search-drop"
            classNamePrefix="mySelect"
            theme={(theme) => ThemeSearch(theme)}
            styles={OptionSearch}
            placeholder="Search Users"
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
      </div>
    </div>
  );
}

export default MobSearch;

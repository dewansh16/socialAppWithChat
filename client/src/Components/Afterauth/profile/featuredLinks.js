import React, { useState, useEffect, useContext } from "react";
import { Dialog } from "@mui/material";
import axios from "axios";
import Tooltip from "react-power-tooltip";
import ReactPaginate from "react-paginate";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Font, Button } from "../../../styling/Styles";
import { UserContext } from "../../Navigation";
import {
  Share2,
  Delete,
  MoreVertical,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Plus,
} from "../../assets/Icons";
import { formatDate } from "../../../utils/configDate";
import { trimText } from "../../../utils/trimText";

function FeaturedLinks() {
  const navigate = useNavigate();
  const {
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
  } = useContext(UserContext);

  const { state } = useLocation();
  // console.log("state in featuredLink = ", state);

  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(10);
  const [featuredLinks, setFeaturedLinks] = useState([]);
  const [linkpoparr, setLinkpoparr] = useState([false, false, false]);
  const [achievmentpoparr, setAchievmentpoparr] = useState([
    false,
    false,
    false,
  ]);
  const [addlinkpop, setAddlinkpop] = useState(false);
  const [link, setLink] = useState();
  const [title, setTitle] = useState();
  const [date, setDate] = useState();

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setPage(selectedPage + 1);
  };

  const fetchFeaturedLinks = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `/featuredlink/${state}/getFeaturedLinksByUserId?limit=${limit}&page=${page}`,
      config
    );

    setFeaturedLinks(data.featuredLinks);
    const pages = Math.ceil(data.countTotal / limit);
    setPageCount(pages);
  };

  useEffect(() => {
    fetchFeaturedLinks();
  }, [state, page]);

  const deleteFeatureLink = async (featureLinkData) => {
    console.log("deleteFeatureLink ran...", featureLinkData);

    const { data } = await axios.delete("/featuredlink/removeFeaturedLink", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        Id: `${featureLinkData._id}`,
      },
    });
    fetchFeaturedLinks();
    console.log("after deleting = ", data);
    // setAllLinks(data.featured_link);
  };

  const Links = ({ type, val, i, data }) => {
    const Share = () => {
      return (
        <>
          <Tooltip
            show={val === "link" ? linkpoparr[i] : achievmentpoparr[i]}
            position="top left"
            textBoxWidth="100px"
            padding="8px 0px"
            hoverBackground="#fff"
            backgroundColor="#fff"
            moveRight="15px"
            flat={true}>
            <div className="prof-pop">
              <Share2 color="#616161" />
              <p className={`${Font.body2} ${Font.medium} ${Font.font} `}>
                Share
              </p>
            </div>
            {user?._id === state ? (
              <div
                className="prof-pop"
                onClick={() => {
                  deleteFeatureLink(data);
                }}>
                <Delete color="#616161" />
                <p className={`${Font.body2} ${Font.medium} ${Font.font} `}>
                  Remove
                </p>
              </div>
            ) : (
              <></>
            )}
          </Tooltip>
        </>
      );
    };
    // /
    //change the array size with the number of links used in APIS with initialize with value false

    const handleClickSharepop = (type, i) => {
      if (type === "link") {
        let arr = [];
        for (let i = 0; i < linkpoparr.length; i++) {
          arr.push(false);
        }
        arr[i] = !linkpoparr[i];
        setLinkpoparr([...arr]);
      } else if (type === "achie") {
        let arr = [];
        for (let i = 0; i < achievmentpoparr.length; i++) {
          arr.push(false);
        }
        arr[i] = !achievmentpoparr[i];
        setAchievmentpoparr([...arr]);
      }
    };

    return (
      <>
        <div className="link-box ">
          <div className="flex flex-row justify-between items-start py-3 px-4 w-full">
            <p className={`${Font.font} ${Font.medium} ${Font.label}`}>
              {type}
            </p>
            <div
              className="share-pop"
              onClick={() => handleClickSharepop(val, i)}
              style={{ position: "relative", cursor: "pointer" }}>
              <Share />
              <MoreVertical color="#101828" />
            </div>
          </div>
          <div className="p-2 w-full">
            <a href={data.link}>
              {!data.image && <img src="" alt="" className="p-link-img" />}
              {data.image && (
                <>
                  {
                    // <div className="profile-dummy-link">
                    // <p className={`${Font.font} ${Font.label} ${Font.medium}`}>
                    //   Fetched Image
                    // </p>
                    // </div>
                  }
                  <div className="featured-link-image-div">
                    <img src={`${data.image}`} alt="" className="p-link-img" />
                  </div>
                </>
              )}
            </a>
          </div>
          <div className="flex flex-col items-start py-3 px-4 gap-3 w-full">
            <div className="flex flex-col items-start p-0 gap-1 w-full">
              <p className={`${Font.font} ${Font.label} ${Font.regular}`}>
                {formatDate(data.date)}
              </p>
              <a
                href={data.link}
                className={`${Font.font} ${Font.body1} ${Font.medium}`}
                style={{ color: "#242424" }}>
                {trimText(data.title, 50)}
              </a>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Dialog
        fullWidth={false}
        maxWidth="xl"
        open={addlinkpop}
        onClose={() => setAddlinkpop(false)}>
        <div className="addlinkpop">
          <label htmlFor="thislink" className="inputborder">
            <p>Fill the link</p>
            <input
              required
              onChange={(e) => setLink(e.target.value)}
              type="url"
              name=""
              id="thislink"
            />
          </label>
          <label htmlFor="heading" className="inputborder">
            <p>Heading</p>
            <input
              required
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name=""
              id="heading"
            />
          </label>
          <label htmlFor="date" className="inputborder">
            <p>Date of publish</p>
            <input
              required
              onChange={(e) => setDate(e.target.value)}
              type="date"
              name=""
              id="date"
            />
          </label>
          <div
            onClick={async (e) => {
              e.preventDefault();
              try {
                const config = {
                  headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                };

                const newf = { link, title, date };
                if (!link || !title || !date) return;

                await axios.put(
                  "/featuredlink/addFeaturedLinks",
                  {
                    userId: user._id,
                    ...newf,
                  },
                  config
                );
                fetchFeaturedLinks();

                setLink();
                setTitle();
                setDate();

                setAddlinkpop(false);
              } catch (error) {
                setAddlinkpop(false);
              }
            }}
            className={`${Button.button} ${Button.primary} ${Button.medium}`}>
            <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>Save</p>
          </div>
        </div>
      </Dialog>

      <div className="profile-link flex flex-col items-start p-0 gap-5 w-full mb-8">
        <div
          style={{ alignItems: "center" }}
          className="flex flex-row py-2 px-3 justify-between w-full">
          <div
            onClick={() => {
              navigate(-1);
            }}
            style={{ alignItems: "center" }}
            className="flex flex-row">
            <ChevronLeft width={25} height={25} color="#101828" />
            <p
              style={{ marginLeft: "10px" }}
              className={`${Font.heading3} ${Font.medium} ${Font.font} `}>
              Featured Links
            </p>
          </div>
          <button
            style={{ display: `${user._id !== state ? "none" : ""}` }}
            className={`${Button.button} ${Button.secondary} ${Button.medium}`}
            onClick={() => {
              setAddlinkpop(true);
            }}>
            <Plus color="#242424" />
            <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>ADD</p>
          </button>
        </div>
        <div className="flex flex-wrap items-start p-0  w-full gap-4">
          {featuredLinks &&
            featuredLinks.map((item, i) => (
              <Links data={item} key={i} type="Link" val="link" i={i} />
            ))}
        </div>

        <ReactPaginate
          previousLabel={<ChevronsLeft color="#101828" />}
          nextLabel={<ChevronsRight color="#101828" />}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
}

export default FeaturedLinks;

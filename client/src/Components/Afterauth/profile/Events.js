import React, { useContext, useEffect, useState } from "react";
import { Font } from "../../../styling/Styles";
import "./Events.css";
import axios from "axios";
import {
  ChevronDown,
  EventBookmark,
  EventBookmarkSelected,
  Share2,
  InterestedIcon,
  WhiteDot,
} from "../../assets/Icons";
import { UserContext } from "../../Navigation";

const Events = () => {
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

  const domainToTags = new Map([
    ["Food and Beverage", ["Food and Beverage"]],
    ["Cryptocurrency", ["Cryptocurrency", "Technology", "Startup"]],
    [
      "Technology",
      [
        "Technology",
        "E-commerce & Retail",
        "Web3.0",
        "Cryptocurrency",
        "Automobile",
        "Electric Vehicles",
      ],
    ],
    ["Blockchain Technology", ["Technology", "Startup"]],
    ["Agriculture", ["Agriculture", "Agri-tech", "Sustainability"]],
    ["Gaming", ["Gaming", "Technology", "startups"]],
    ["Virtual Reality", ["Technology", "startups"]],
    ["Financial Technology", ["Banking & Finance", "Technology", "startups"]],
    ["Internet of Things", []],
    ["Luxury Goods", []],
    [
      "Real Estate",
      [
        "Real estate",
        "Infrastructure & Development",
        "Construction",
        "Interior",
      ],
    ],
    ["Energy", ["Energy & Power", "Technology", "Environment"]],
    ["Interior Design", []],
    ["Education", ["Education", "Technology", "startups"]],
    ["Healthcare", ["Healthcare", "Technology", "Biotechnology"]],
    ["E-commerce Platforms", ["E-commerce & Retail", "Logistics"]],

    [
      "Environmental",
      [
        "Environment",
        "Agriculture",
        "Chemical",
        "Technology",
        "startups",
        "Energy & Power",
        "Electric Vehicles",
        "Recycling and Waste Management",
        "Sustainability",
        "Automobile",
      ],
    ],
    ["Web 3.O", ["Web3.0", "Technology", "startups"]],

    ["Automobile", ["Automobile", "Technology", "Energy & Power"]],
    ["Startup", ["startups"]],
  ]);

  // const data = [
  //   "Aerospace",
  //   "Agriculture",
  //   "Chemical",
  //   "Computers",
  //   "Construction",
  //   "Defense",
  //   "Education",
  //   "Energy",
  //   "Entertainment",
  //   "Financial",
  //   "Food",
  //   "Health Care",
  //   "Hospitality",
  //   "Information",
  //   "Manufacturing",
  //   "Mass Media",
  //   "Telecommunications",
  //   "Transport",
  //   "Water",
  // ];

  //types
  const [aac, setAac] = useState(true);
  const [iac, setIac] = useState(false);
  const [pac, setPac] = useState(false);

  //filters
  const [tac, setTac] = useState(true);
  const [rac, setRac] = useState(false);

  // Filtered Events
  const [allEvents, setAllEvents] = useState([]);
  const [dateSortedEvents, setDateSortedEvents] = useState([]);
  const [interestedSortedEvents, setInterestedSortedEvents] = useState([]);

  const [userInterestedEvents, setUserInterestedEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  // Date
  const [selectDate, setSelectDate] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));

  const selecttype = {
    fontWeight: "700",
    color: "#138DEC",
    borderBottom: "2px solid #138DEC",
  };

  const selectfilter = {
    fontWeight: "700",
    color: "#138DEC",
    border: "1px solid #138DEC",
  };

  const fetchEvents = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const tags = [];

    // Iterate over the map entries
    console.log(user.bdomain);
    for (let i = 0; i < user.bdomain.length; i++) {
      const userDomain = user.bdomain[i];

      for (const [key, value] of domainToTags.entries()) {
        const hasSubstring = value.some((item) => item === userDomain);

        if (hasSubstring) {
          tags.push(key);
        }
      }
    }

    console.log(tags);

    try {
      const response = await axios.get("/events/events/getAllEvents", config);

      // All Events
      let allEventsData = response.data.events;

      allEventsData = allEventsData.filter((e) =>
        e.tags.some((tag) => tags.includes(tag))
      );

      console.log("allEventsData", allEventsData);
      // console.log(allEventsData[0].startDate);

      // // Date Sorted Events
      // let dateSortEventsData = allEventsData;

      // // Filtering Past and Present Events
      // const today = new Date();
      // let presentEventsData = allEventsData;

      // presentEventsData = presentEventsData.sort((a, b) => {
      //   const dateA = new Date(a.startDate);
      //   const dateB = new Date(b.startDate);

      //   return dateA - dateB;
      // });

      // setDateSortedEvents(presentEventsData);

      // // User Interested Events
      let userInterestedEventsData = allEventsData.filter(
        (e) => e.interestedPeople.filter((e) => e._id === user._id).length > 0
      );

      let interestedEventsSortedData = allEventsData.sort(
        (a, b) => b.interestedPeople.length - a.interestedPeople.length
      );

      setAllEvents(allEventsData);
      setInterestedSortedEvents(interestedEventsSortedData);
      setUserInterestedEvents(userInterestedEventsData);
    } catch (error) {
      console.log(error);
    }
  };

  const selectInterested = async (eventId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        `/events/events/${eventId}/increaseInterestedCount`,
        {
          userId: user._id,
        },
        config
      );

      fetchEvents();
    } catch (error) {
      console.log(error.message);
    }
  };

  const selectDisinterested = async (eventId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(eventId);
    try {
      const response = await axios.post(
        `/events/events/${eventId}/decreaseInterestedCount`,
        {
          userId: user._id,
        },
        config
      );
      console.log(response);

      fetchEvents();
    } catch (error) {
      console.log(error.message);
    }
  };

  const dateChangeHandler = (e) => {
    const date = e.target.value;
    setDate(date);
  };

  // function formatDate(date) {
  //   const daysOfWeek = [
  //     "Sunday",
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //   ];
  //   const months = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];
  //   const year = date.getFullYear();
  //   const day = daysOfWeek[date.getUTCDay()];
  //   const dayOfMonth = date.getUTCDate();
  //   const month = months[date.getUTCMonth()];
  //   let hours = date.getUTCHours();
  //   const minutes = date.getUTCMinutes();
  //   const ampm = hours >= 12 ? "pm" : "am";

  //   // Convert to 12-hour format
  //   hours = hours % 12;
  //   hours = hours ? hours : 12;

  //   const formattedDate = `${day}, ${dayOfMonth} ${month}, ${year}, ${hours}:${minutes
  //     .toString()
  //     .padStart(2, "0")} ${ampm}`;
  //   return formattedDate;
  // }

  // function convertToCustomFormat(inputDate) {
  //   const dateObj = new Date(inputDate);
  //   if (isNaN(dateObj)) {
  //     return "Invalid date";
  //   }

  //   return formatDate(dateObj);
  // }

  // function getEventStatus(event) {
  //   const currentDate = new Date();
  //   const startDate = new Date(event.startDate);
  //   const endDate = event.endDate ? new Date(event.endDate) : startDate;

  //   if (endDate < currentDate) {
  //     return [3, "Ended"];
  //   }

  //   if (startDate <= currentDate && currentDate <= endDate) {
  //     return [0, "Live"];
  //   }

  //   if (startDate > currentDate) {
  //     const timeDiff = startDate.getTime() - currentDate.getTime();
  //     const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  //     if (daysRemaining === 1) {
  //       return [1, "tomorrow"];
  //     }

  //     if (daysRemaining > 30) {
  //       const monthsRemaining = Math.floor(daysRemaining / 30);
  //       return [
  //         2,
  //         `In ${monthsRemaining} month${monthsRemaining > 1 ? "s" : ""}`,
  //       ];
  //     } else {
  //       return [2, `In ${daysRemaining} day${daysRemaining > 1 ? "s" : ""}`];
  //     }
  //   }
  // }

  const EventCard = (props) => {
    const event = props.event;

    // To check for interested
    const findUser = (id) => {
      return user._id === id;
    };

    // To open links
    const handleClick = () => {
      window.open(event.link, "_blank");
    };

    // Interested Text
    let interestedText;
    if (event.interestedPeople.length === 1) {
      interestedText = "person has";
    } else {
      interestedText = "people have";
    }

    const isSelected =
      event.interestedPeople.filter((e) => e._id === user._id).length > 0;

    // Status Text
    // let [id, status] = getEventStatus(event);

    return (
      <div className="event-card">
        <div className="event-redirect" onClick={handleClick}>
          <div className="event-card-image">
            <img
              src={event.imageSrc}
              alt="event"
              width="318px"
              height="172px"
            />

            {/* <div class="event-card-image-box"> */}
            {/* {id === 0 && (
                <p className="live">
                  <span
                    style={{ display: "inline-block", paddingRight: "4px" }}
                  >
                    <WhiteDot />
                  </span>
                  {status}
                </p>
              )}

              {id === 1 && <p className="tomorrow">{status}</p>}

              {id === 2 && <p className="many-days">{status}</p>}

              {id === 3 && <p className="ended">{status}</p>}
            </div> */}
          </div>
          <div className="event-card-text">
            <p className="event-card-text-date">{event.startDate}</p>
            <p className="event-card-text-heading">{event.title}</p>
            <p className="event-card-text-data">
              <span
                style={{ display: "inline-block", paddingRight: "10.85px" }}
              >
                <InterestedIcon />
              </span>
              {event.interestedPeople.length} {interestedText} shown interest
            </p>
          </div>
        </div>

        <div className="event-card-buttons">
          {isSelected ? (
            <p
              className="event-card-button-selected"
              style={{
                color: "#138DEC",
                backgroundColor: "#F5FBFF",
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={() => selectDisinterested(event._id)}
            >
              <span style={{ marginTop: "5px" }}>
                <EventBookmarkSelected />
              </span>
              Interested
            </p>
          ) : (
            <p
              className="event-card-button"
              onClick={() => selectInterested(event._id)}
            >
              <span style={{ marginTop: "4px" }}>
                <EventBookmark />
              </span>
              Interested
            </p>
          )}
          <p className="event-card-button">
            <span style={{ marginTop: "2px" }}>
              <Share2 color="black" />
            </span>
            Share
          </p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    fetchEvents();
  }, [date]);

  return (
    <div>
      <div>
        <p className="events-text">Events</p>
      </div>
      <div className="events-type">
        <p
          style={aac ? selecttype : { fontWeight: "500" }}
          onClick={() => {
            setAac(true);
            setIac(false);
            setPac(false);
          }}
        >
          All Events
        </p>
        <p
          style={iac ? selecttype : { fontWeight: "500" }}
          onClick={() => {
            setAac(false);
            setIac(true);
            setPac(false);
          }}
        >
          Interested
        </p>
        {/* <p
          style={pac ? selecttype : { fontWeight: "500" }}
          onClick={() => {
            setAac(false);
            setIac(false);
            setPac(true);
          }}
        >
          Past
        </p> */}
      </div>

      {aac && (
        <>
          <div className="events-filters">
            {/* <p
              style={tac ? selectfilter : { fontWeight: "500" }}
              // onClick={() => {
              //   setTac(true);
              //   setRac(false);
              //   console.log(tac, rac);
              // }}
            >
              Top Events
            </p> */}

            {/* <p
              style={rac ? selectfilter : { fontWeight: "500" }}
              onClick={() => {
                setTac(false);
                setRac(true);
              }}
            >
              Recommended Events
            </p> */}
            {/* <div
              style={{
                borderLeft: "2px solid #d1d1d1",
                height: "48px",
                margin: "0 24px",
              }}
            ></div>

            {selectDate ? (
              <p>
                <input type="date" onChange={dateChangeHandler} value={date} />
              </p>
            ) : (
              <p
                style={{ display: "flex", flexDirection: "row", gap: "17px" }}
                onClick={() => {
                  setSelectDate(true);
                }}
              >
                Date <ChevronDown color="#616161" />
              </p>
            )} */}
          </div>

          <p className="events-text mt-5">Top Events</p>
          {tac ? (
            <>
              <div className="event-cards">
                {interestedSortedEvents.slice(0, 6).map((event) => (
                  <EventCard event={event} />
                ))}
              </div>

              {interestedSortedEvents.length > 6 && (
                <div className="more-events">
                  <div className="event-rows">
                    <div>
                      <p className="events-text">More Events</p>
                    </div>

                    <div className="event-cards">
                      {interestedSortedEvents.slice(6).map((event) => (
                        <EventCard event={event} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="event-rows">
                <div className="event-cards">
                  {dateSortedEvents.map((event) => (
                    <EventCard event={event} />
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}

      {iac && (
        <div className="event-cards">
          {userInterestedEvents.map((event) => (
            <EventCard event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;

import React, { useContext, useEffect, useState } from "react";
import "./analysis.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  Button,
  Font,
  Options,
  Themes,
  ChartColors,
} from "../../../styling/Styles";
import ReactSelect from "react-select";
import {
  ChevronDown,
  Plus,
  Search,
  X,
  EditOutlined,
  ArrowLeft,
} from "../../assets/Icons";
import Donut from "./Doughnut";
import axios from "axios";
import { Images } from "../assets/Assets";
import { Popover } from "react-tiny-popover";
import { Dialog } from "@mui/material";
import Calender from "./Calender";
import Barchar from "./Bar";
import { UserContext } from "../../Navigation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Analysis() {
  const {
    selectedChat,
    setSelectedChat,
    user,
    chats,
    setChats,
    token,
    fetchAgain,
    setFetchAgain,
    allUserAna,
    setAllUserAna,
  } = useContext(UserContext);

  const [showComp, setShowComp] = useState(false);
  const [allcomparr, setAllcompArr] = useState([]);
  useEffect(() => {
    allUserAna &&
      setAllcompArr(
        allUserAna.map((userAna) => ({
          name: userAna.name,
          id: userAna._id,
          check: false,
          img: userAna.pic,
        }))
      );
  }, [allUserAna]);
  const [showdupop, setShowduPop] = useState(false);
  const [showfirst, setShowfirst] = useState(false);
  const [ana, setAna] = useState(true);
  const [openCal, setOpenCal] = useState(false);
  const [r, setR] = useState("1");
  const [startdate, setStartdate] = useState("g");
  const [endDate, setEndDate] = useState("g");

  const colors = ["#FA943E", "#89FAF4", "#3EC5FA", "#FFE28C"];
  const [competitor, setCompetitors] = useState([]);
  const [editStateActive, setEditStateActive] = useState(false);

  const [datasetcom, setDatasetcom] = useState([]);

  const [datas, setData] = useState([]);
  const [selfdata, setSelfdata] = useState([]);

  const handleSideCheckbox = (currcomp) => {
    let selcom = [];
    for (let i = 0; i < currcomp.length; i++) {
      const obj = {
        name: currcomp[i].name,
        id: currcomp[i].id,
        check: false,
      };
      selcom.push(obj);
    }
    // console.log(currcomp);
    // console.log(selcom);

    setCompetitors([...selcom]);
    setShowComp(!showComp);
    let arr = [];
    arr = [...currcomp];
    let allarr = [];
    allarr = [...allcomparr];
    for (let i = 0; i < allcomparr.length; i++) {
      const bool = arr.filter((e) => e.id === allcomparr[i].id).length === 0;
      // console.log("i = ", i, " bool = ", bool);
      let obj = {
        name: allcomparr[i].name,
        id: allcomparr[i].id,
        check: !bool,
        img: allcomparr[i].img,
      };
      allarr[i] = obj;
    }
    // console.log("allArr...", allarr);
    // console.log("arr..", arr);
    setAllcompArr([...allarr]);
  };
  const username = user.name;

  const changeHandler = async (bool, durationKey) => {
    setAna(bool);
    setR(`${durationKey}`);
    let sDate = durationKey === 20 ? startdate : "g";
    let eDate = durationKey === 20 ? endDate : "g";
    try {
      const { data } = await axios.get(
        `/scrapper/${durationKey}/${user._id}/${sDate}/${eDate}`
      );
      console.log("selfData....", [data]);
      setSelfdata([data]);
    } catch (error) {
      console.log(error);
    }
  };

  const Checkclick = async (checkanarr, durationKey) => {
    setR(`${durationKey}`);
    let sDate = durationKey === 20 ? startdate : "g";
    let eDate = durationKey === 20 ? endDate : "g";

    let a = [];
    let arr = [];
    console.log("checkanarr....", checkanarr);
    a = [...checkanarr];
    setDatasetcom([...a]);
    if (a.length > 0)
      for (let i = 0; i < a.length; i++) {
        try {
          const { data } = await axios.get(
            `/scrapper/${durationKey || 1}/${a[i].id}/${sDate}/${eDate}`
          );
          arr.push(data);
        } catch (error) {
          console.log(error);
        }
      }
    console.log(arr);
    setData([...arr]);
  };

  const ComPopover = () => {
    const Myfunc = () => {
      const handleRemoveCom = (value) => {
        let arr = [];
        arr = [...competitor];

        arr = arr.filter((e) => e !== value);
        console.log(value, arr);
        let allarr = [];
        allarr = [...allcomparr];
        for (let i = 0; i < allcomparr.length; i++) {
          const bool =
            arr.filter((e) => e.id === allcomparr[i].id).length === 0;
          let obj = {
            name: allcomparr[i].name,
            id: allcomparr[i].id,
            check: !bool,
            img: allcomparr[i].img,
          };
          allarr[i] = obj;
        }
        let a = [];
        a = [...datasetcom];
        a = a.filter((e) => e.id !== value.id);
        setDatasetcom([...a]);
        setCompetitors([...arr]);
        setAllcompArr([...allarr]);
        // console.log(arr);
      };

      const [checkanarr, setCheckanarr] = useState([...datasetcom]);
      const handlecheckchange = (e, i) => {
        const { value, checked } = e.target;
        console.log(value, checked);
        let a = [];
        if (checked) {
          if (checkanarr.length < 4) {
            a = [...checkanarr, competitor[i]];
          } else {
            a = [...checkanarr];
          }
        } else {
          a = [...checkanarr];
          a = a.filter((e) => e.id !== value);
        }
        setCheckanarr([...a]);
      };

      const checkInCheckanarr = (item) => {
        let searchedArr = checkanarr.filter((e) => e.id === item.id);
        if (searchedArr.length === 0) return false;
        return true;
      };

      console.log(
        editStateActive,
        "competitor = ",
        competitor,
        " datasetCom = ",
        datasetcom,
        " checkanArr = ",
        checkanarr
      );
      return (
        <>
          <div className="com-checkbox">
            <div className="flex flex-row w-full" style={{ height: "56px" }}>
              {editStateActive ? (
                <>
                  <div
                    className={`flex items-center justify-end`}
                    style={{ width: "10%" }}>
                    <div
                      onClick={() => {
                        setEditStateActive(false);
                      }}>
                      <ArrowLeft color="#424242" height="20px" width="20px" />{" "}
                    </div>
                  </div>
                  <div
                    className="flex justify-start items-center py-3 pl-2 pr-6"
                    style={{ width: "90%" }}>
                    <p className={`${Font.medium} ${Font.body1} ${Font.font}`}>
                      Edit Competitors list
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className={`flex flex-col items-start py-3 px-6 w-4/5`}>
                    <p
                      className={`${Font.font} ${Font.body2} ${Font.medium}`}
                      style={{ color: "#424242" }}>
                      {competitor.length} competitors
                    </p>
                    {competitor.length > 4 && (
                      <p
                        className={`${Font.label} ${Font.font} ${Font.regular}`}
                        style={{ color: "#616161" }}>
                        You can choose max. of 4 competitors at once
                      </p>
                    )}
                  </div>
                  <div className="flex justify-center items-center w-1/5">
                    <div
                      style={{ marginTop: "0.5rem" }}
                      onClick={() => {
                        setEditStateActive(true);
                      }}>
                      <EditOutlined
                        color="#424242"
                        height="20px"
                        width="20px"
                      />{" "}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="com-checkbox-list-container">
              {competitor.map((item, i) => (
                <div key={i} className="checkbox-competitors">
                  <div className="flex w-full justify-between items-center">
                    <div className="flex flex-row gap-3 items-center">
                      {editStateActive ? (
                        ""
                      ) : (
                        <input
                          type="checkbox"
                          name=""
                          checked={checkInCheckanarr(item)}
                          value={item.id}
                          id="addcomp"
                          className="checkbo"
                          onChange={(e) => {
                            handlecheckchange(e, i);
                          }}
                        />
                      )}
                      <p
                        className={`${Font.medium} ${Font.body2} ${Font.font}`}
                        style={{ marginTop: 5 }}>
                        {item.name}
                      </p>
                    </div>
                    {editStateActive ? (
                      <div
                        onClick={() => {
                          handleRemoveCom(item);
                          setShowfirst(true);
                        }}>
                        <X color="#424242" height="16px" width="16px" />{" "}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="comp-buttom-container">
              <button
                className={`${Button.button} ${Button.tertiary} ${
                  Button.large
                } ${Button.disable && competitor.length === 0}`}
                onClick={() => {
                  setShowfirst(false);
                  setShowComp(true);
                }}>
                <Plus color="#242424" />
                <p className={`${Font.font} ${Font.body1} ${Font.medium}`}>
                  Add New
                </p>
              </button>
              <button
                disabled={competitor.length === 0}
                className={`${Button.button} ${Button.primary} ${
                  Button.large
                } ${Button.disable && competitor.length === 0}`}
                onClick={() => {
                  {
                    Checkclick(checkanarr, r);
                    setShowfirst(false);
                  }
                }}>
                <p className={`${Font.font} ${Font.body1} ${Font.medium} `}>
                  See Analysis
                </p>
              </button>
            </div>
          </div>
        </>
      );
    };
    // /
    return (
      <Popover
        isOpen={showfirst}
        positions={["bottom", "right"]}
        content={<Myfunc />}>
        <div
          onClick={() => {
            setShowfirst(!showfirst);
            setShowComp(false);
          }}>
          <label
            htmlFor="editSocial"
            className={`input ${false && "error"} ${
              false && "disable"
            } flex justify-between`}
            // onClick={()=>setShowPopInput(!showPopInput)}
          >
            <p
              className={`${Font.font} ${Font.body1} ${Font.regular}`}
              style={{ color: "#969393" }}>
              Select Competitors
            </p>
            <ChevronDown color="#C7C7C7" />
          </label>
        </div>
      </Popover>
    );
  };

  const AddCompetitors = () => {
    const Popup = (props) => {
      const [val, setVal] = useState("");
      let harr = [...allcomparr];
      // console.log("harr...", harr);
      const [searchSort, setSearchSort] = useState([...harr]);
      // const [isPresent, setIspresent] = useState(true);

      const handleChangesideSearch = (e) => {
        let a = [];
        let bool = false;
        const word = e.target.value;
        for (let i = 0; i < allcomparr.length; i++) {
          const check = allcomparr[i].name
            .toLowerCase()
            .includes(word.toLowerCase());
          // console.log(check);
          if (check) {
            a.push(allcomparr[i]);
            bool = check;
          }
          // setIspresent(check);
          setSearchSort([...a]);
        }
        // console.log(bool);
        // setIspresent(bool);
        setVal(e.target.value);
      };

      const [currcomp, setCurrcomp] = useState([...competitor]);

      const handleChangesideCheckbox = (e, i) => {
        const { value, checked } = e.target;
        let checkarr = [...searchSort];

        let obj = null;
        if (checked) {
          let arr = [];
          arr = [...harr];
          let carr = [];
          carr = [...competitor];
          carr = carr.filter((e) => e.id === value);
          // console.log("carr...", carr);
          if (carr.length === 0) {
            arr = arr.filter((e) => e.id === value);
          } else arr = [];
          setCurrcomp([...currcomp, ...arr]);
          // console.log(arr);
          // console.log(value);
        } else {
          let arr = [];
          arr = [...currcomp];
          arr = arr.filter((e) => e.id !== value);
          setCurrcomp([...arr]);
          // console.log(arr);
        }
        obj = {
          name: searchSort[i].name,
          id: searchSort[i].id,
          check: checked,
          img: searchSort[i].img,
        };
        checkarr[i] = obj;
        setSearchSort([...checkarr]);
        harr = [...checkarr];
      };

      // const searchClick = async () => {
      //   console.log(val);
      //   try {
      //     const { data } = await axios.get(`/scrapper/4/${val}/null/null`);
      //     console.log(data);
      //     if (data == "0" || data === 0) {
      //       console.log("Not present");
      //     } else {
      //       const obj = {
      //         name: val,
      //         id: "a" + Math.random() + "b",
      //         check: false,
      //         img: "",
      //       };
      //       // console.log(obj);
      //       // console.log(allcomparr);
      //       setAllcompArr([...allcomparr, obj]);
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   }
      // };
      // console.log("searchSort....", searchSort);
      return (
        <div className="addCom-container">
          <label
            htmlFor=""
            className="addcom-searchbar flex flex-row justify-between"
            style={{ width: 500 }}>
            <input
              type="text"
              placeholder="Search competitors"
              style={{ marginLeft: 8, width: "70%" }}
              onChange={(e) => handleChangesideSearch(e)}
              value={val}
            />
            {
              //   <div
              //   className={`${Button.button} ${Button.tertiary} ${Button.medium}`}
              //   onClick={() => searchClick()}
              // >
              //   <Search color="#616161" />
              //   add global
              //   </div>
            }
          </label>
          <div className="competitor-list flex flex-col items-start py-4 ">
            {searchSort.map((item, i) => (
              <div
                key={i}
                className="flex flex-row justify-between items-start py-3 px-4 w-full">
                <div className="flex flex-row items-end gap-3">
                  <img
                    // src={item.image}
                    src={item.img}
                    style={{ width: 24, height: 24, borderRadius: "50%" }}
                    alt=""
                  />
                  <p
                    className={`${Font.font} ${Font.body2} ${Font.medium}`}
                    style={{ color: "#242424" }}>
                    {item.name}
                  </p>
                </div>
                <input
                  type="checkbox"
                  name=""
                  checked={item.check}
                  id="addcompany"
                  onChange={(e) => handleChangesideCheckbox(e, i)}
                  value={item.id}
                  className="checkbo"
                />
              </div>
            ))}
          </div>
          <div className="addCom-button-container">
            <div
              className={`${Button.button} ${Button.primary} ${Button.large}`}
              onClick={() => {
                handleSideCheckbox(currcomp);
              }}>
              <p className={`${Font.font} ${Font.body1} ${Font.medium}`}>
                Save Changes
              </p>
            </div>
            <div
              className={`${Button.button} ${Button.secondary} ${Button.large}`}
              onClick={() => setShowComp(false)}>
              <p className={`${Font.font} ${Font.body1} ${Font.medium}`}>
                Cancel
              </p>
            </div>
          </div>
        </div>
      );
    };

    return (
      <>
        <Popover
          isOpen={showComp}
          positions={["bottom", "right"]}
          content={<Popup />}>
          <div
            className={`${Button.button} ${Button.secondary} ${Button.large}`}
            onClick={() => {
              setShowComp(!showComp);
              setShowfirst(false);
            }}>
            <Plus color="#242424" />
            <p className={`${Font.font} ${Font.body1} ${Font.medium}`}>
              Add Competitors
            </p>
          </div>
        </Popover>
      </>
    );
  };
  // /
  const Duration = () => {
    const Popup = () => {
      return (
        <>
          <div className="duration-container">
            <div
              className="flex items-center py-3 px-4 "
              onClick={() => {
                ana ? Checkclick(datasetcom, 1) : changeHandler(ana, 1);
                setShowduPop(false);
              }}>
              <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                Last 24 hours
              </p>
            </div>
            <div
              className="flex items-center py-3 px-4 "
              onClick={() => {
                ana ? Checkclick(datasetcom, 2) : changeHandler(ana, 2);
                setShowduPop(false);
              }}>
              <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                Last 1 week
              </p>
            </div>
            <div
              className="flex items-center py-3 px-4 "
              onClick={() => {
                ana ? Checkclick(datasetcom, 3) : changeHandler(ana, 3);
                setShowduPop(false);
              }}>
              <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                Last 1 month
              </p>
            </div>
            <div
              className="flex items-center py-3 px-4 "
              onClick={() => {
                ana ? Checkclick(datasetcom, 4) : changeHandler(ana, 4);
                setShowduPop(false);
              }}>
              <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                Last 1 year
              </p>
            </div>
            <div
              className="flex items-center py-3 px-4 "
              onClick={() => {
                setShowduPop(false);
                setOpenCal(true);
              }}>
              <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                Custom date range
              </p>
            </div>
          </div>
        </>
      );
    };
    // /
    return (
      <Popover
        isOpen={showdupop}
        positions={["bottom", "right"]}
        content={<Popup />}>
        <div
          onClick={() => {
            setShowduPop(!showdupop);
            setShowfirst(false);
            setShowComp(false);
          }}>
          <label
            htmlFor="editSocial"
            className={`input ${false && "error"} ${
              false && "disable"
            } flex justify-between`}
            // onClick={()=>setShowPopInput(!showPopInput)}
          >
            <p
              className={`${Font.font} ${Font.body1} ${Font.regular}`}
              style={{ color: "#969393" }}>
              {r === "1" && (
                <p style={{ paddingBottom: "7px" }}>Last 24 hours</p>
              )}
              {r === "2" && <p style={{ paddingBottom: "7px" }}>Last 1 week</p>}
              {r === "3" && (
                <p style={{ paddingBottom: "7px" }}>Last 1 month</p>
              )}
              {r === "4" && <p style={{ paddingBottom: "7px" }}>Last 1 year</p>}
              {r === "20" && (
                <p style={{ paddingBottom: "7px" }}>Custom date Range</p>
              )}
            </p>
            <ChevronDown color="#C7C7C7" />
          </label>
        </div>
      </Popover>
    );
  };

  return (
    <>
      <Dialog
        fullWidth={false}
        maxWidth="xl"
        open={openCal}
        onClose={() => setOpenCal(false)}>
        <Calender
          endDate={endDate}
          setEndDate={setEndDate}
          setStartdate={setStartdate}
          startdate={startdate}
          setOpenCal={setOpenCal}
          setR={setR}
          datasetcom={datasetcom}
          Checkclick={Checkclick}
          changeHandler={changeHandler}
          ana={ana}
        />
      </Dialog>
      <div className="analysis">
        <div className="flex flex-col gap-8 pb-14">
          <p className={`${Font.font} ${Font.heading3} ${Font.bold}`}>
            Analysis
          </p>
          <div className="analysis-nav">
            <p
              onClick={() => {
                setR("1");
                changeHandler(false, 1);
              }}
              className={`${Font.font} ${Font.body1} ${Font.medium} ${
                !ana && "myactive"
              }`}>
              My Coverage
            </p>
            <p
              onClick={() => {
                setR("1");
                Checkclick(datasetcom, 1);
                setAna(true);
              }}
              className={`${Font.font} ${Font.body1} ${Font.medium} ${
                ana && "myactive"
              }`}>
              Competitor Analysis
            </p>
          </div>
          {ana && (
            <div className="flex flex-row w-full justify-between">
              <div className="drop-add ">
                <Duration />
                <div className="competitor">
                  <ComPopover />
                </div>
              </div>
              <AddCompetitors />
            </div>
          )}
          <div className="chart-box">
            <div className="flex flex-row justify-between mb-14 items-center">
              {r === "1" && (
                <p
                  className={`${Font.font} ${Font.subheadline} ${Font.medium}`}>
                  Last 24 hours
                </p>
              )}
              {r === "2" && (
                <p
                  className={`${Font.font} ${Font.subheadline} ${Font.medium}`}>
                  Last 1 week
                </p>
              )}
              {r === "3" && (
                <p
                  className={`${Font.font} ${Font.subheadline} ${Font.medium}`}>
                  Last 1 month
                </p>
              )}
              {r === "4" && (
                <p
                  className={`${Font.font} ${Font.subheadline} ${Font.medium}`}>
                  Last 1 year
                </p>
              )}
              {r === "20" && (
                <p
                  className={`${Font.font} ${Font.subheadline} ${Font.medium}`}>
                  Custom date Range
                </p>
              )}
              {!ana && <Duration />}
            </div>
            <Barchar
              data={ana ? datas : selfdata}
              datasetcom={ana ? datasetcom : [{ name: `${user.name}` }]}
            />
            {ana && (
              <div className="flex flex-row py-2 gap-6 w-full justify-center items-center mt-6">
                {datasetcom.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-row gap-1 items-center justify-between">
                    <p
                      className="comp-mark"
                      style={{ backgroundColor: colors[i] }}></p>
                    <p className={`${Font.font} ${Font.label} ${Font.regular}`}>
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Analysis;

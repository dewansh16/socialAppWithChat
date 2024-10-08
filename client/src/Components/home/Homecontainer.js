import React, { useState } from "react";
import "./homecontainer.css";
import ImgHome from "../assets/images/Home-Business.svg";
import ImgMan from "../assets/images/Home-Entrepreneurs.svg";
import ImgPC from "../assets/images/Home-ContentCreators.svg";
import { Button, Font } from "../../styling/Styles";
import Homepop from "./Homepop";
import { Dialog } from "@mui/material";
import { Hexagon, ShapeOfLogo } from "../assets/Icons";
import { useNavigate } from "react-router-dom";
import background from "../assets/images/Bg-Image.png";
import Hero from "../assets/images/Hero.svg";

function Homecontainer() {
  const arrimg = [ImgHome, ImgMan, ImgPC];
  const navigate = useNavigate();
  const [sign, setSign] = useState(false);

  const Datastyle = ({ num, Name, imgLink }) => {
    var FlexDirection = "row";
    if (Name === "Entrepreneurs") {
      FlexDirection = "row-reverse";
    }
    return (
      <>
        <div className="data-box flex flex-row items-center justify-start desktop">
          <div style={{ margin: "32px 0px 32px 32px " }}>
            <img src={arrimg[imgLink]} alt="" height="60px" width="60px" />
          </div>
          <div
            className="data-box-text"
            style={{ margin: "32px 32px 32px 0px" }}
          >
            <p>{Name}</p>
          </div>
        </div>
        <div
          className="data-box flex  justify-start resp"
          style={{ padding: "32px 16px", gap: "0px" }}
        >
          <div>
            <img src={arrimg[imgLink]} alt="" height="60px" width="60px" />
          </div>
          <div className="data-box-text">
            <p>{Name}</p>
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
        open={sign}
        onClose={() => setSign(false)}
      >
        <Homepop setEditPop={setSign} />
      </Dialog>
      <div className="flex flex-col w-full ">
        <div className="container-home-container">
          <header className="homecontainer flex flex-col">
            <div className="home-text flex flex-col justify-between">
              <div className="hc-two-text flex justify-between flex-col gap-4">
                <div className="home-bold-text flex justify-center flex-col  ">
                  <h1
                    className={`text-size ${Font.bold} ${Font.display} ${Font.font} desktop`}
                  >
                    Building a{" "}
                    <span
                      className={`text-size ${Font.bold} ${Font.display} ${Font.font} desktop`}
                      style={{ color: "#FF3520" }}
                    >
                      community
                    </span>{" "}
                    of Businesses,
                  </h1>
                  <h1
                    className={`${Font.bold} ${Font.display} ${Font.font} desktop`}
                  >
                    Entrepreneurs and Content Creators
                  </h1>
                  <h1
                    className={`${Font.bold} ${Font.heading2} ${Font.font} resp`}
                    style={{ fontSize: "24px" }}
                  >
                    Building a
                    <span
                      style={{
                        color: "#FF3520",
                        position: "relative",
                        top: "-3px",
                        left: "6px",
                      }}
                    >
                      {"  "} community
                    </span>
                  </h1>
                  <h1
                    className={`${Font.bold} ${Font.heading2} ${Font.font} resp`}
                    style={{ fontSize: "24px" }}
                  >
                    of Businesses,
                  </h1>
                  <h1
                    className={`${Font.bold} ${Font.heading2} ${Font.font} resp`}
                    style={{ fontSize: "24px" }}
                  >
                    Entrepreneurs and
                  </h1>
                  <h1
                    className={`${Font.bold} ${Font.heading2} ${Font.font} resp`}
                    style={{ fontSize: "24px" }}
                  >
                    Content Creators
                  </h1>
                </div>
                <div className="home-light-text flex flex-col ">
                  <p
                    className={`${Font.regular} ${Font.heading2} ${Font.font}  desktop`}
                  >
                    Get solutions to all your market and media
                  </p>
                  <p
                    className={`${Font.regular} ${Font.heading2} ${Font.font} desktop`}
                  >
                    needs at one place.
                  </p>
                  <p
                    className={`${Font.font} ${Font.regular} ${Font.body1} resp`}
                  >
                    Get solutions to all your market
                  </p>
                  <p
                    className={`${Font.font} ${Font.regular} ${Font.body1} resp`}
                  >
                    and media needs at one place.
                  </p>
                </div>
              </div>

              <div
                className="desktop"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                <div
                  onClick={() => navigate("/sign-up/")}
                  className={`${Button.button} ${Button.primary} ${Button.large} desktop`}
                  style={{ marginTop: "56px" }}
                >
                  <p className={`${Font.font} ${Font.body1} ${Font.medium}`}>
                    Join the community
                  </p>
                </div>
              </div>

              <div
                className="resp"
                style={{
                  display: "flex",
                  maxHeight: "36px",
                  position: "relative",
                  top: "-20px",
                }}
              >
                <div
                  onClick={() => navigate("/sign-up/")}
                  className={`${Button.button} ${Button.primary} ${Button.medium} resp`}
                  style={{ maxWidth: "173px" }}
                >
                  <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                    Join the community
                  </p>
                </div>
              </div>
            </div>
          </header>
          <div className="hero-image-container desktop">
            <img src={Hero} alt="hero" className="hero-image" />
          </div>

          <div
            className="hero-image-container resp "
            style={{
              position: "relative",
              top: "-20px",
              marginLeft: "2%",
            }}
          >
            <img src={Hero} alt="hero" className="hero-image" />
          </div>
        </div>
        <div className="black-box flex items-center justify-center w-full ">
          <div className="black-box-container flex flex-col items-center pb-12 desktop">
            <p
              className={`${Font.font} ${Font.heading1} ${Font.bold}`}
              style={{ color: "#fff" }}
            >
              Trusted by
            </p>
            <div className="data flex w-full flex-row justify-between">
              <Datastyle num={500} Name={"Businesses"} imgLink={0} />
              <Datastyle num={1000} Name={"Entrepreneurs"} imgLink={1} />
              <Datastyle num={200} Name={"Content Creators"} imgLink={2} />
            </div>
          </div>
          <div className="black-box-container flex flex-col items-center resp ">
            <div className="trusted box-border flex items-center justify-center">
              <p
                className={`${Font.font} ${Font.subheadline} ${Font.bold}`}
                style={{ color: "#fff", fontSize: "20px" }}
              >
                Trusted by
              </p>
            </div>
            <div className="data flex w-full flex-col p-1 gap-4 justify-between">
              <Datastyle num={500} Name={"Businesses"} imgLink={0} />
              <Datastyle num={1000} Name={"Entrepreneurs"} imgLink={1} />
              <Datastyle num={200} Name={"Content creators"} imgLink={2} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homecontainer;

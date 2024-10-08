import React from "react";
import ImgMic from "../assets/images/Journalist.svg";
import ImgPhone from "../assets/images/Group 2198260.svg";
import ImgPaper from "../assets/images/Influencers.svg";
import ImgLaptop from "../assets/images/Group 2198261.svg";
import LastImage from "../assets/images/Group 2198263.svg";

import img1 from "../assets/images/whylogo1.svg";
import img2 from "../assets/images/whylogo2.svg";
import "./WhyUttertale.css";
import { Font } from "../../styling/Styles";

function WhyUttertale() {
  const arr = [
    {
      heading: "Discover Experienced Journalists",
      text: "Effortlessly connect with verified, industry-specific journalists you can trust to produce exceptional news coverage.",
      imgLink: ImgMic,
      resimgLink: img1,
    },
    {
      heading: "Leverage the Power of Influencers",
      text: "Create engaging and meaningful content and elevate your social media game with strategic influencer partnerships",
      imgLink: ImgPhone,
      resimgLink: img2,
    },
    {
      heading: "Strengthen Your Media Presence",
      text: "Reach a wider audience through exceptional media coverage to drive engagement and improve brand awareness",
      imgLink: ImgPaper,
      resimgLink: img1,
    },
    {
      heading: "Unleash the Power of Data",
      text: "Gain valuable insights and transform your business with in-house visualization tools to better understand your customers, market and competitors",
      imgLink: ImgLaptop,
      resimgLink: img2,
    },
    {
      heading: "Collaborate with Industry Leaders",
      text: "Partner with the experts and unlock best practices and insights to gain a competitive edge and drive innovation in your business",
      imgLink: LastImage,
      resimgLink: img1,
    },
  ];

  const WhyText = ({ num, bg }) => {
    var Flexdirection = "row-reverse";
    var Margin = "0 0 0 auto";
    if (num % 2 === 0) {
      Flexdirection = "row";
      var Margin = "0 auto 0 0";
    }

    return (
      <>
        <div
          className="text-and-img desktop"
          style={{
            flexDirection: Flexdirection,
          }}
        >
          <div className="w-1/2">
            <div
              className="why-img desktop"
              style={{ flex: 1, display: "flex", margin: "auto" }}
            >
              <img
                src={arr[num].imgLink}
                alt=""
                style={{ margin: `${Margin}` }}
              />
            </div>
          </div>
          <div
            style={{ flexDirection: Flexdirection }}
            className="w-1/2 flex pt-20"
          >
            <div className="why-text" style={{ flex: 1 }}>
              <h1
                className={`${Font.font} ${Font.heading1} ${Font.bold}`}
                style={{ color: "#242424" }}
              >
                {arr[num].heading}
              </h1>
              <p className={`${Font.font} ${Font.heading3} ${Font.large}`}>
                {arr[num].text}
              </p>
              {/* <a href="">Read More</a> */}
            </div>
          </div>
        </div>
        <div
          className="text-and-img resp "
          style={{ backgroundColor: `${bg}`, borderRadius: "7px" }}
        >
          <div className="why-img">
            <img src={arr[num].resimgLink} alt="" className="why-img-img" />
          </div>
          <div className="why-text px-3">
            <h1
              className={`${Font.font} ${Font.heading3} ${Font.medium}`}
              style={{ color: "#242424", fontWeight: "700", fontSize: "24px" }}
            >
              {arr[num].heading}
            </h1>
            <p
              className={`${Font.font} ${Font.body2} ${Font.regular}`}
              style={{
                color: "#242424",
                fontWeight: "400",
                fontSize: "16px",
                letterSpacing: "0.015em ",
              }}
            >
              {arr[num].text}
            </p>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="why-bold items-center justify-center my-20 desktop flex">
        <h1 className={`${Font.font} ${Font.bold} ${Font.display}`}>
          Why Uttertale?
        </h1>
      </div>
      <div className="why-bold items-center justify-center resp">
        <h1 className={`${Font.font} ${Font.heading2} ${Font.bold} resp`}>
          Why?
        </h1>
      </div>
      <div className="flex flex-col items-center w-full gap-6">
        <WhyText num={0} bg={"#F5F5F5"} />

        <WhyText num={1} bg={"#FFF"} />

        <WhyText num={2} bg={"#F5F5F5"} />

        <WhyText num={3} bg={"#FFF"} />

        <WhyText num={4} bg={"#F5F5F5"} />
        {/* <WhyText num={4} /> */}
      </div>
    </>
  );
}

export default WhyUttertale;

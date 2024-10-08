import React from "react";
import Ractangle from "../assets/images/rectangallogo.svg";
import Ractangleblack from "../assets/images/Ractangleblack.svg";
import Updown from "../assets/images/updown.svg";
import "./About.css";
import Downarrow from "../assets/images/downarrow.svg";
import Uparrow from "../assets/images/uparrow.svg";
import { useState } from "react";
import { ChevronDown, ChevronUP } from "../assets/Icons";
import { Font } from "../../styling/Styles";
function About() {
  // const Dropdown = ({btext,imgLink}) =>{
  //     return(
  //         <div className="dropdown-bar">
  //             <h3>{btext}</h3>
  //             <img src={imgLink} alt="" />
  //         </div>
  //     )
  // }
  const [clicked, setClick] = useState([false, false, false]);

  const toggle = (i) => {
    if (i === 0) {
      var a = [!clicked[0], clicked[1], clicked[2]];
      setClick([...a]);
    } else if (i === 1) {
      var a = [clicked[0], !clicked[1], clicked[2]];
      setClick([...a]);
    } else if (i === 2) {
      var a = [clicked[0], clicked[1], !clicked[2]];
      setClick([...a]);
    }
  };

  return (
    <div className="Container flex flex-col pt-20">
      <div className="container-heading">
        <h1 className={`desktop ${Font.display} ${Font.bold} ${Font.font}`}>
          About Us
        </h1>
        <h1 className={`resp ${Font.font} ${Font.heading2} ${Font.bold}`}>
          About Us
        </h1>
        <img src={Ractangle} className="desktop" alt="" />
        <img
          src={Ractangleblack}
          className="resp"
          alt=""
          style={{ width: 32 }}
        />
      </div>
      <div className="border desktop"></div>
      {/* <img
        src={Ractangleblack}
        className="desktop"
        alt=""
        style={{ width: 42, height: 36, marginTop: 40, marginBottom: 40 }}
      /> */}
      {/* <div className="text">
        <h3></h3>
        <p>Uttertale was co-founded in 2018 by Rishu Singh, ex-IITian and Shalu Jha, a veteran media and comms professional. With a background and expertise across diverse domains such as Media Strategy, Media Relations, Image Management, Tech & Product Development, Engineering, et al, the two co-founders ventured into building their own start-up that shall help other fellow entrepreneurs in telling their own startup/business stories. Undoubtedly, ‘value-addition’ in entrepreneurial pursuits and storytelling has always been our NUMBER ONE PRIORITY - the NORTH STAR of our existence - from Day One itself! And from then to now, we have helped over 500 brands and their respective founders/entrepreneurs to come to the limelight to successfully and optimally showcase their stories in the media and content sphere in the best manner possible.</p>
      </div> */}
      <div className={`dropdown ${(clicked[0] || clicked[1]) && "clicked"}`}>
        {data.map((item, i) => (
          <>
            <div className="item-container desktop">
              <div key={i} className="item">
                <div className="title" onClick={() => toggle(i)}>
                  <div>
                    {!clicked[i] && <ChevronDown color="#101828" />}
                    {clicked[i] && <ChevronUP color="#101828" />}
                  </div>
                  <h2
                    className={`${Font.font} ${Font.heading2} ${Font.medium}`}>
                    {item.bold}
                  </h2>
                </div>
                {clicked[i] && (
                  <div
                    className={`dropdown-content ${Font.font} ${Font.body2} ${Font.regular}`}>
                    {item.text} <br /> <br />
                    {item.text2}{" "}
                  </div>
                )}
              </div>
            </div>
            <div className="item-container resp">
              <div key={i} className="item">
                <div className="title" onClick={() => toggle(i)}>
                  <div>
                    {!clicked[i] && <ChevronDown color="#101828" />}
                    {clicked[i] && <ChevronUP color="#101828" />}
                  </div>
                  <h2 className="desktop">{item.bold}</h2>
                  <h2
                    className={`resp ${Font.font} ${Font.heading3} ${Font.medium}`}
                    style={{ color: "#242424" }}>
                    {item["bold"].substring(0, 76)}...
                  </h2>
                </div>
                {clicked[i] && (
                  <div
                    className={`dropdown-content ${Font.font} ${Font.body2} ${Font.regular}`}>
                    {item.text} <br /> <br />
                    {item.text2}{" "}
                  </div>
                )}
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

const data = [
  {
    class: "first",
    bold: "Uttertale is a first-of-its-kind futuristic platform engineered to transform the media-and-content ecosystem for today’s brands, startups and entrepreneurs.",
    text: "Uttertale was co-founded in 2022 by Rishu Singh, ex-IITian and Shalu Jha, a veteran media and comms professional. With a background and expertise across diverse domains such as Media Strategy, Media Relations, Image Management, Tech & Product Development, Engineering, et al, the two co-founders ventured into building their own start-up that shall help other fellow entrepreneurs in telling their own startup/business stories. Undoubtedly, ‘value-addition’ in entrepreneurial pursuits and storytelling has always been our NUMBER ONE PRIORITY – the NORTH STAR of our existence – from Day One itself! And from then to now, we have helped over 500 brands and their respective founders/entrepreneurs to come to the limelight to successfully and optimally showcase their stories in the media and content sphere in the best manner possible.",
    text2: "",
  },
  {
    class: "second",
    bold: "Reason behind building Uttertale",
    text: "Throughout our exciting entrepreneurial journey, as we delved deeper into the nitty-gritties of the ever-changing media-and-content universe, we noticed there is often a connectivity gap for modern-day brands, startups and companies when it comes to media visibility and publicity. And also, they also have a lack of credible and effective news and media analytics. Furthermore, it was shocking and unfortunate to find out that at various stages of and within the media-content ecosystem, no standardization is seen in systems and processes as well as overdependence on traditional means of doing things. Additionally, existing social media platforms today are only showing irrelevant information and content feeds that are not at all useful for journalists, media professionals and content creators.",
    text2:
      "“Why can’t we help entrepreneurs and other stakeholders in the ecosystem to overcome these issues?” We questioned ourselves. In the quest of answering that question, Uttertale (the platform) was born. And of course, cutting-edge TECH become our only ‘guiding light’ and enabler, as we started building something that is now all set to disrupt the media, content and media-tech spaces forever, for the better!",
  },
  {
    class: "third",
    bold: "Overview of Uttertale as a product",
    text: "Uttertale has been designed as a one-stop, next-gen social and professional utility network and community that caters to all kinds of media and content publishing purposes that an individual or business might have. Besides helping out journalists, writers and content creators connect directly to a pool of verified business owners and representatives based on their specific areas of interest and expertise, through our integrated web app, Uttertale is additionally offering a curated platform for business owners, business leaders and entrepreneurs to stay connected to journalists, content creators and key stakeholders in the content-media ecosystem in more efficient, smart, and cost-effective ways. Essentially, we are building a win-win-win for all stakeholders in the ecosystem, while solving problems and simultaneously telling UtterlyTalecious stories.",
    text2: "",
  },
];

export default About;

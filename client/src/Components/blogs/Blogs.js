import React from "react";
import CpageLogo from "../assets/images/CpageLogo.svg";
import Ractangle from "../assets/images/rectangallogo.svg";
import "./blogs.css";
import Arrowupright from "../assets/images/arrow-up-right.svg";
import Image1 from "../assets/images/image57.svg";
import Image2 from "../assets/images/image572.svg";
import Image3 from "../assets/images/image58.svg";
import Image4 from "../assets/images/image59.svg";
import Image5 from "../assets/images/image60.svg";
import { Font } from "../../styling/Styles";

function Blogs() {
  return (
    <>
      <div className="container flex flex-col">
        <div className="desktop container-heading">
          <h1 className={`${Font.display} ${Font.bold} ${Font.font}`}>Blogs</h1>

          <img src={Ractangle} className="" alt="" />
        </div>

        <div className="resp container-heading">
          <h1 className="container-heading-blog">Blogs</h1>
          <img src={Ractangle} className="" alt="" />
        </div>
        <div className="desktop border"></div>
        <div className="desktop blogs">
          {blogsarr.map((item, i) => (
            <>
              <div key={i} className="blogs-content">
                {/* {console.log(`i: ${i} , text: ${item["text"]}`)} */}
                {/* {console.log(`i: ${i} , text: ${item["text"].length}`)} */}
                <div className="blog-text" style={{ flex: 1 }}>
                  <div className="blog-light">
                    <p className={`${Font.font} ${Font.label} ${Font.regular}`}>
                      {item.date}
                    </p>
                    <img src="" alt="" />
                    <p className={`${Font.font} ${Font.label} ${Font.regular}`}>
                      {item.read}
                    </p>
                  </div>
                  {item["bold"].length < 71 && (
                    <h1
                      className={`${Font.font} ${Font.heading2} ${Font.medium}`}>
                      {item.bold}
                    </h1>
                  )}
                  {item["bold"].length >= 71 && (
                    <h1
                      className={`${Font.font} ${Font.heading2} ${Font.medium}`}>
                      {item["bold"].substring(0, 71)}...
                    </h1>
                  )}
                  {item["text"].length < 130 && <p>{item.text}</p>}
                  {item["text"].length >= 130 && (
                    <p>{item["text"].substring(0, 130)}...</p>
                  )}
                  <button className="b-read">
                    <a href={item.link} target="_blank">
                      <h5>Read article here </h5>
                    </a>
                    <img src={Arrowupright} alt="" />
                  </button>
                </div>
                <div className="blog-img" style={{ flex: 1 }}>
                  {/* <div> */}
                  <img src={item.img} alt="" />
                  {/* </div> */}
                </div>
              </div>
            </>
          ))}
        </div>

        <div className="mobile-blogs">
          {blogsarr.map((item, i) => (
            <>
              <div key={i} className="mobile-blogs-content">
                <div className="blog-text">
                  <div className="blog-img">
                    <img src={item.img} alt="" />
                  </div>
                  <div className="blog-light">
                    <p className={`${Font.font} ${Font.label} ${Font.regular}`}>
                      {item.date}
                    </p>
                    <img src="" alt="" />
                    <p className={`${Font.font} ${Font.label} ${Font.regular}`}>
                      {item.read}
                    </p>
                  </div>

                  <p
                    className="bold-text"
                    style={{
                      fontFamily: "elza",
                      fontSize: "20px",
                      fontWeight: "500",
                      lineHeight: "28px",
                      letterSpacing: "0.015em",
                      textAlign: "left",
                    }}>
                    {item["bold"]}
                  </p>

                  <p
                    className="blog-para-text"
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "20px",
                      letterSpacing: "0.015em",
                      textAlign: "left",
                    }}>
                    {item.text}
                  </p>

                  <button className="b-read">
                    <a href={item.link} target="_blank" rel="noreferrer">
                      <h5>Read article here </h5>
                    </a>
                    <img src={Arrowupright} alt="" />
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

const blogsarr = [
  {
    date: "17 October, 2018",
    read: "9 min read",
    bold: "Defining Your Box to Think Out of The Box in PR",
    text: "Gone are the days when PRs used to reach out to the journalists with the press kit containing the news materials, here are the new ways of doing the same nff",
    img: Image1,
    link: "https://www.entrepreneur.com/en-in/marketing/the-changed-face-of-the-modern-pr-industry/321872",
  },
  {
    date: "24 September, 2018",
    read: "9 min read",
    bold: "How technology is bridging the gaps between modern-day content publishers and business stakeholders",
    text: "Today, we are undeniably living in an era where innovation, speed and scale are the name of ‘game-change’ for businesses. And for optimally achieving all three and much more, and for standing out amid cut-throat competition in the market, technology is certainly playing a pivotal role across various industry sectors.",
    img: Image2,
    link: "https://timesofindia.indiatimes.com/blogs/voices/how-technology-is-bridging-the-gaps-between-modern-day-content-publishers-and-business-stakeholders/",
  },
  {
    date: "24 September, 2018",
    read: "9 min read",
    bold: "PRandit: A B2B Tech-Based PR Company Helping Startups in Outreach and Image Management",
    text: "PR and digital marketing have seen a huge dynamic shift over the past few decades. Beating the conventional ways, where only limited audience was available at a stretch, PR agencies today use various media management tools and marketing techniques to help their clients gain a wider approach. Similarly, PRandit Solution Pvt. Limited offers services that add value and build a positive brand image and perception for its clients.",
    img: Image3,
    link: "https://enterprise-services.siliconindia.com/vendor/prandit-a-b2b-techbased-pr-company-helping-startups-in-outreach-and-image-management-cid-14872.html",
  },
  {
    date: "24 September, 2018",
    read: "9 min read",
    bold: "World Engineer’s Day 2022 : Insights from Experts",
    text: "According to a 2019 NASSCOM survey, India generates 15 lakh engineering graduates yearly, but only 2.5 lakh are hired in the core engineering business. According to another Aspiring Minds poll, 80 percent of Indian engineers were unemployed in 2019. The demand for emerging technologies and technical improvements every day makes engineering a viable and ever-changing job. Technical employees will be expected to accomplish considerably more in the future, which implies that the demand for all sorts of engineers will rise. This is because people will become more conscious of the function that engineers play in society. Furthermore, there will be more options for engineers to find work and earn a livelihood.Read more at: https://www.cxotoday.com/news-analysis/world-engineers-day-2022-insights-from-experts/",
    img: Image4,
    link: "https://www.cxotoday.com/news-analysis/world-engineers-day-2022-insights-from-experts/",
  },

  {
    date: "June 9, 2023",
    read: "5 min read",
    bold: "India’s rural and suburban women entrepreneurs contribute towards achieving ‘Atmanirbhar Bharat’",
    text: "When I recently went back to my alma mater to give a guest lecture on women’s entrepreneurship, I was pleasantly surprised to find out how the young high school graduates and would-be college graduates from tier-2 city like Patna and other neighboring towns and cities are not just taking interest in entrepreneurship, but also actively implementing their novel innovations and ventures at the ground level. This is a testimony to the fact that today almost every part of India, including the smaller cities, towns, suburbs, and rural areas, has been experiencing an overwhelming spike of entrepreneurial interest.",
    img: Image3,
    link: "https://timesofindia.indiatimes.com/blogs/voices/indias-rural-and-suburban-women-entrepreneurs-contribute-towards-achieving-atmanirbhar-bharat/",
  },

  {
    date: "Mar 24, 2023",
    read: "7 min read",
    bold: "Women's Day Special: 20 बिज़नेस वुमन जिनका स्ट्रगल और सक्सेस स्टोरी हैं इंस्पिरेशनल",
    text: "महिला दिवस, महिलाओं के महत्व और उनकी अहमियत को बताने का दिन यानी कि महिला दिवस हर साल 8 मार्च को मनाया जाता है। इस दिन को खासतौर पर महिलाओं को ही डेडिकेट किया जाता है। एक वक्त था जब महिलाओं को केवल चूल्हा- चौका करने के लिए जाना जाता था। लेकिन आज वो वक्त है कि महिलाएं हर क्षेत्र में डंके की चोट पर आगे बढ़ रही हैं। एक समय पर महिलाओं को केवल नौकरी पेशा ही बताया जाता रहा था। लेकिन आज वो समय है कि महिलाएं एक सफल उद्यमी भी बन रही हैं। चाहे फूड का बिज़नेस हो, फैशन, ब्यूटी के अलावा हेल्थकेयर और अन्य सभी बिज़नेस के साथ ही कई बड़ी पोस्ट्स पर भी अब महिलाएं ही नज़र आ रही हैं।",
    img: Image5,
    link: "https://timesofindia.indiatimes.com/blogs/voices/indias-rural-and-suburban-women-entrepreneurs-contribute-towards-achieving-atmanirbhar-bharat/",
  },
];

export default Blogs;

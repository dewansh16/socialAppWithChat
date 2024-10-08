import React from "react";
import { Font } from "../../styling/Styles";
import Ractangle from "../assets/images/rectangallogo.svg";
import "./terms.css";

function Terms() {
  return (
    <>
      <div className="Container flex flex-col">
        <div className="container-heading">
          <h1 className={`${Font.font} ${Font.display} ${Font.bold}`}>
            Terms of service
          </h1>
          <img src={Ractangle} alt="" />
        </div>
        <div className="border"></div>

        <div className="terms-policies">
          {allterm.map((item, i) => (
            <>
              <div key={i} className="terms-container flex flex-col  mb-20">
                <h2
                  className={`${Font.font} ${Font.heading3} ${Font.medium}`}
                  style={{ color: "#242424" }}
                >
                  {item.bold}
                </h2>
                <p className={`${Font.font} ${Font.body2} ${Font.regular}`}>
                  {item.text}
                </p>
              </div>
            </>
          ))}
          <div className="terms-container flex flex-col gap-4 mb-20">
            <h2
              className={`${Font.font} ${Font.heading3} ${Font.medium}`}
              style={{ color: "#242424" }}
            >
              Rules
            </h2>
            {rules.map((item, i) => (
              <>
                <p
                  className={`${Font.font} ${Font.body2} ${Font.regular}`}
                  key={i}
                >
                  {item}
                </p>
              </>
            ))}
          </div>
          <div className="terms-container flex flex-col gap-4 mb-20">
            <h2
              className={`${Font.font} ${Font.heading3} ${Font.medium}`}
              style={{ color: "#242424" }}
            >
              Instructions & Guidelines
            </h2>
            {instructions.map((item, i) => (
              <>
                <li
                  className={`${Font.font} ${Font.body2} ${Font.regular}`}
                  key={i}
                >
                  {item}
                </li>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const instructions = [
  "Kindly refrain from posting promotional/salesy posts and marketing/sales conservations",
  "Do not reach out the same journalist/mediaperson too frequently. Try to keep a gap of at least 6-7 days or more while reaching out to the same journalist.",
  "Repeating the same posts multiple (more than one) times will not be entertained in the group.",
  "Don't reach out to a journalist/mediaperson directly through voice or video call, try to gather a response on text/Whatsapp first, ask for his/her permission and then proceed.",
  "Try your best to strictly follow the deadline given by the journalist; however, in case of urgencies or challenges in meeting the given timeline, you can request them once in a while to extend the deadline (but please don't make it a habit)",
  "Don't keep pestering the journalists after sharing your byte to incorporate your brand. It's totally their editorial call and right whether or not they would like to incorporate your inputs in the story.",
  "Don't reach out individual publications with your post. You can reach out to them personally, not in this community",
  "Don’t share any forwarded post/messages in the",
  "Please do not share your past coverage with the journalists. Instead, please share a well-documented file about the development or information you wish to share.",
  "For any correction in coverage, please reach out to the concerned journalist/mediaperson personally not in the community",
];

const rules = [
  "1. Only posts and comments related to getting featured in the media-and-content ecosystem will be entertained in the group",
  "2. No personal conversations, no marketing/promotional/sales material and no disrespectful or hateful posts, comments or images shall be allowed in the group",
  "3. No surveys or business development activities, conversation or posts to be allowed in the group",
  "4. The timings for posting/having conversations in the group is between 7AM to 11PM",
  "5. The group admin holds the rights to mute you and remove you from the group, as and when the need arises.",
];

const allterm = [
  {
    bold: "ACCEPTANCE OF TERMS",
    text: "This Agreement contains the complete terms and conditions that apply to your participation in our site. If you wish to use the site including its tools and services please read these terms of use carefully. By accessing this site or using any part of the site or any content or services hereof, you agree to become bound by these terms and conditions. If you do not agree to all the terms and conditions, then you may not access the site or use the content or any services on the site.",
  },
  {
    bold: "MODIFICATIONS OF TERMS OF USE",
    text: "Amendments to this agreement can be made and effected by us from time to time without specific notice to your end. The agreement posted on the Site reflects the latest agreement and you should carefully review the same before you use our site.",
  },
  {
    bold: "USE OF THE SITE",
    text: "The Site allows you to post new developments, connect with creators and publish for your brand. However, you are prohibited to do the following acts, to wit: (a) use our sites, including its services and or tools if you are not able to form legally binding contracts, are under the age of 18, or are temporarily or indefinitely suspended from using our sites, services, or tools (b) posting of items in inappropriate groups or areas on our sites and services; (c) collecting information about users’ personal information; (d) interfere with other user's posts; (f) post false, inaccurate, misleading, defamatory, or libelous content; (g) take any action that may damage the rating system. Registration Information For you to complete the sign-up process on our site, you must provide your full legal name, current address, valid email address, member name, and any other information needed to complete the sign-up process. You must qualify that you are 18 years or older and must be responsible for keeping your password secure and be responsible for all activities and contents that are uploaded under your account. You must not transmit any worms or viruses or any code of a destructive nature. Any information provided by you or gathered by the site or third parties during any visit to the site shall be subject to the terms of Uttertale.com’s Privacy Policy. Term This Agreement will remain in full force and effect while you use the Website. You may terminate your membership at any time for any reason by following the instructions on the “TERMINATION OF ACCOUNT” on the setting page. We may terminate your membership for any reason at any time. If you are using a paid version of the Service and we terminate your membership because you have breached this Agreement, you will not be entitled to any refund of unused subscription fees. Even after your membership is terminated, certain sections of this Agreement will remain in effect.",
  },
  {
    bold: "Registration Information",
    text: "For you to complete the sign-up process on our site, you must provide your full legal name, current address, valid email address, member name, and all other information needed to complete the sign-up process. You must qualify that you are 18 years or older and must be responsible for keeping your password secure and be responsible for all activities and contents that are uploaded under your account. You must not transmit any worms or viruses or any code of a destructive nature. Any information provided by you or gathered by the site or third parties during any visit to the site shall be subject to the terms of Uttertale.com’s Privacy Policy.",
  },
  {
    bold: "Term",
    text: "This Agreement will remain in full force and effect while you use the Website. You may terminate your membership at any time for any reason by following the instructions on the “TERMINATION OF ACCOUNT” on the setting page. We may terminate your membership for any reason at any time. If you are using a paid version of the Service and we terminate your membership because you have breached this Agreement, you will not be entitled to any refund of unused subscription fees. Even after your membership is terminated, certain sections of this Agreement will remain in effect.",
  },
  {
    bold: "NON-COMMERCIAL USE BY MEMBERS",
    text: "Members of this networking platform are prohibited to use the services of the website in connection with any commercial endeavors or ventures. This includes providing links to other websites, whether deemed competitive to this website or not. Juridical persons or entities including but not limited to organizations, companies, and/or businesses may not become Members of Uttertale.com and should not use the site for any purpose.",
  },
  {
    bold: "LINKS & FRAMINGS",
    text: "Illegal and/or unauthorized uses of the Services, including unauthorized framing of or linking to the Sites will be investigated, and appropriate legal action may be taken. Some links, however, are welcome to the site and you are allowed to establish hyperlinks to appropriate parts within the site provided that: (i) you post your link only within the forum, chat, or message board section; (ii) you do not remove or obscure any advertisements, copyright notices or other notices on the placed at the site; (iii) the link does not state or imply any sponsorship or endorsement of your site and (iv) you immediately stop providing any links to the site on written notice from us. However, you must check the copyright notice on the homepage to which you wish to link to make sure that one of our content providers does not have its own policies regarding direct links to their content on our sites.",
  },
  {
    bold: "INTELLECTUAL PROPERTY RIGHTS",
    text: "You hereby acknowledge that all rights, titles, and interests, including but not limited to rights covered by the Intellectual Property Rights, in and to the site, and that You will not acquire any right, title, or interest in or to the site except as expressly set forth in this Agreement. You will not modify, adapt, translate, prepare derivative works from, decompile, reverse engineer, disassemble or otherwise attempt to derive source code from any of our services, software, or documentation, or create or attempt to create a substitute or similar service or product through the use of or access to the Program or proprietary information related thereto. Confidentiality You agree not to disclose information you obtain from us and or our clients, advertisers, suppliers, and forum members. All information submitted by an end-user customer according to a Program is proprietary information of Uttertale.com. Such customer information is confidential and may not be disclosed. Publisher agrees not to reproduce, disseminate, sell, distribute or commercially exploit any such proprietary information in any manner.",
  },
  {
    bold: "CONFIDENTIALITY",
    text: "You agree not to disclose information you obtain from us and or our clients, advertisers, suppliers, and forum members. All information submitted by an end-user customer according to a Program is proprietary information of Uttertale.com. Such customer information is confidential and may not be disclosed. Publisher agrees not to reproduce, disseminate, sell, distribute or commercially exploit any such proprietary information in same manner.",
  },
  {
    bold: "NON-ASSIGNMENT OF RIGHTS",
    text: "Your rights of whatever nature cannot be assigned nor transferred to anybody, and any such attempt may result in the termination of this Agreement, without liability to us. However, we may assign this Agreement to any person at any time without notice.",
  },
  {
    bold: "Severability of Terms",
    text: "In the event that any provision of these Terms and Conditions is found invalid or unenforceable according to any judicial decree or decision, such provision shall be deemed to apply only to the maximum extent permitted by law, and the remainder of these Terms and Conditions shall remain valid and enforceable according to its terms.",
  },
  {
    bold: "Entire Agreement",
    text: "This Agreement shall be governed by and construed by the substantive laws of New Delhi, without any reference to conflict-of-laws principles. The Agreement describes and encompasses the entire agreement between you and us, and supersedes all prior or contemporaneous agreements, representations, warranties, and understandings concerning the Site, the contents and materials provided by or through the Site, and the subject matter of this Agreement.",
  },
  {
    bold: "Choice of Law; Jurisdiction; Forum",
    text: "Any dispute, controversy, or difference which may arise between the parties out of, about or in connection with this Agreement is at this moment irrevocably submitted to the exclusive jurisdiction of the courts of New Delhi, to the exclusion of any other courts without giving effect to its conflict of laws provisions or your actual state or country of residence.",
  },
  {
    bold: "Refund Policy",
    text: "There are no refunds. In the rare circumstance that no coverage is attained we automatically issue full refunds to premium users.",
  },
];

export default Terms;

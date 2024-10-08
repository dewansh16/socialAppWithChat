import React from "react";

const SocialMediaIcon = {
  twitter: require("./socialMediaicon/Property 1=Twitter.png"),
  instagram: require("./socialMediaicon/Property 1=Instagram.png"),
  linkedin: require("./socialMediaicon/Property 1=Linkedin.png"),
  youTube: require("./socialMediaicon/Property 1=Youtube.png"),
  facebook: require("./socialMediaicon/Property 1=Facebook.png"),
  email: require("./socialMediaicon/Property 1=Gmail.png"),
  reddit: require("./socialMediaicon/Property 1=Reddit.png"),
};

export default SocialMediaIcon;

export const MediaImage = (props) => {
  return (
    <img
      src={props.link}
      style={{
        width: props.width !== undefined ? props.width : 90,
        height: props.height !== undefined ? props.height : 90,
      }}
      alt=""
    />
  );
};

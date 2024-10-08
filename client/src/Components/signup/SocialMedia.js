import React from "react";
import ESignup from "./SocialMedia/ESignup";
import ISignup from "./SocialMedia/ISignup";

const SocialMedia = (props) => {
  console.log("social", props);
  const user = props.user;
  return (
    <div>
      {user.role === "Business" ? (
        <ESignup user={user} />
      ) : (
        <ISignup user={user} />
      )}
    </div>
  );
};

export default SocialMedia;

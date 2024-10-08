import React, { useState } from "react";
import Blackbox from "./Blackbox";
import Homecontainer from "./Homecontainer";
import HowItworks from "./HowItworks";
import Just500mn from "./Just500mn";
import WhyUttertale from "./WhyUttertale";

function Home() {
  const MainHOmepage = () => {
    return (
      <>
        <Homecontainer />
        <div className="flex flex-col w-full items-center landing-respo mb-5">
          <WhyUttertale />
        </div>
        <Just500mn />
        <div className="flex flex-col w-full items-center landing-respo">
          <HowItworks />
        </div>
        <div className="flex flex-col w-full items-center landing-respo">
          <Blackbox />
        </div>
      </>
    );
  };

  return <MainHOmepage />;
}

export default Home;

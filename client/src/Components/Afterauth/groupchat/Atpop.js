import React, { useState } from "react";
import { Popover } from "react-tiny-popover";
import { Button, Font } from "../../../styling/Styles";
import { Images } from "../assets/Assets";

function Atpop(props) {
  const { setShowatRatpop, showatratpop, searchSort, onMentionSelect } = props;
  const searchSortarr = [...searchSort];
  const FirstPop = () => {
    const [typeaudience, setTypeaudience] = useState("");
    return (
      <>
        {searchSortarr.length !== 0 && (
          <div className="secondpop-box duration-container">
            <form className="secondpop  flex flex-col p-2 gap-2">
              {searchSortarr.map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    onMentionSelect(item);
                  }}
                  className="flex items-center py-3 px-4 ">
                  <p className={`${Font.font} ${Font.body2} ${Font.medium}`}>
                    {item.name}
                  </p>
                </div>
              ))}
            </form>
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      <FirstPop />
    </div>
  );
}

export default Atpop;

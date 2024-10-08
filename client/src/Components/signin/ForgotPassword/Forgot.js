import React from "react";
import { useState, useEffect } from "react";
import Shapecolon from "../../assets/images/Shapecolon.svg";
import Logo from "../../assets/images/Logo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Font } from "../../../styling/Styles";

import Ppage1 from "./Ppage1";
import Ppage2 from "./Ppage2";
import Ppage3 from "./Ppage3";

function Forgot() {
  const [n, setN] = useState(0);

  return (
    <>
      <div>
        <div className="sign-up desktop">
          {n === 0 && <Ppage1 setN={setN} n={n} />}
          {/* {n === 1 && <Ppage2 setN={setN} n={n} />}
          {n === 2 && <Ppage3 setN={setN} n={n} />} */}
          <div className="signup-pic">
            <div className="signup-pic-container">
              <div className="text-sidebar">
                <p className={`${Font.font} ${Font.heading2} ${Font.medium}`}>
                  One-stop solution for creating and nurturing your brand’s
                  credibility, visibility, publicity and more!
                </p>
              </div>
              <div className="big-colon-logo">
                <img src={Shapecolon} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="sign-up resp">
          {n === 0 && <Ppage1 setN={setN} n={n} />}
          {/* {n === 1 && <Ppage2 setN={setN} n={n} />}
          {n === 2 && <Ppage3 setN={setN} n={n} />} */}
        </div>
      </div>
    </>
  );
}

export default Forgot;

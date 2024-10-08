import React, { useEffect, useState } from "react";
import "./navbar.css";
import Logo from "../assets/images/Logo.svg";
import { Link, NavLink, Outlet } from "react-router-dom";
import ContactBottom from "./ContactBottom";
import { Button, Font } from "../../styling/Styles";
import { AlignJustify, Logores, X } from "../assets/Icons";

// function useWindowSize() {
//   const [size, setSize] = useState([window.innerHeight,window.innerWidth])
//   useEffect(() => {
//     const handleResize = () =>{
//       setSize([window.innerHeight, window.innerWidth]);
//     };
//     window.addEventListener("resize",handleResize);
//   },[] );
//   return size;
// }

function Navbar() {
  const [openNav, setOpenNav] = useState(false);
  const handleClickbar = (e) => {
    setOpenNav(!openNav);
  };
  return (
    <>
      <div className="nav-parent w-full">
        <div className="flex justify-center w-full nav-rectangle">
          <div className="navbar flex justify-between flex-row items-center p-4">
            <div className="resp-logo">
              <div onClick={handleClickbar}>
                {openNav ? (
                  <X color="#242424" />
                ) : (
                  <AlignJustify color="#242424" />
                )}
              </div>
              <Link to="/" className="logo">
                <Logores />
              </Link>
            </div>
            <Link to="/" className="logo">
              <img src={Logo} alt="" />
            </Link>

            <div className="tabs flex flex-row items-start justify-center gap-2 px-2">
              <NavLink to="/about">
                <p
                  className={`${Font.subheadline} ${Font.medium} ${Font.font}`}
                >
                  About Us
                </p>
              </NavLink>
              <NavLink to="/blog">
                <p
                  className={`${Font.subheadline} ${Font.medium} ${Font.font}`}
                >
                  Blog
                </p>
              </NavLink>
              <NavLink to="/contact">
                <p
                  className={`${Font.subheadline} ${Font.medium} ${Font.font}`}
                >
                  Contact Us
                </p>
              </NavLink>
            </div>
            <a className="" href="/sign-in">
              <button
                className={`${Button.button} ${Button.secondary} ${Button.medium} resp`}
              >
                <p
                  className={`${Font.font} ${Font.body2} ${Font.medium}`}
                  style={{ color: "#242424" }}
                >
                  Sign In
                </p>
              </button>
              <button
                className={`${Button.button} ${Button.secondary} ${Button.large} desktop`}
              >
                <p
                  className={`${Font.font} ${Font.body1} ${Font.medium}`}
                  style={{ color: "#242424" }}
                >
                  Sign In
                </p>
              </button>
            </a>
          </div>
        </div>
        {openNav && (
          <div
            className="flex flex-col resp"
            style={{ gap: "24px", margin: "24px 16px" }}
          >
            <NavLink to="/about" onClick={handleClickbar}>
              <p className={`${Font.subheadline} ${Font.body2} ${Font.font}`}>
                About Us
              </p>
            </NavLink>
            <NavLink to="/blog" onClick={handleClickbar}>
              <p className={`${Font.subheadline} ${Font.body2} ${Font.font}`}>
                Blog
              </p>
            </NavLink>
            <NavLink to="/contact" onClick={handleClickbar}>
              <p className={`${Font.subheadline} ${Font.body2} ${Font.font}`}>
                Contact Us
              </p>
            </NavLink>
          </div>
        )}
      </div>

      <Outlet />

      <ContactBottom />
    </>
  );
}

export default Navbar;

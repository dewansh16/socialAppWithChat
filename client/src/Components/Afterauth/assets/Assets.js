import Home from "./home.svg";
import Logo from "./Logo.svg";
import Analyst from "./bar-chart-01.svg";
import Profile from "./ProfileIcon.svg";
import Trending from "./trending-up.svg";
import Down from "./chevron-down.svg";
import Search from "./search.svg";
import Star from "./star.svg";
import Doubleman from "./doubleman.svg";
import ProfileImage from "./profileImage.svg";
import imglink from "./imglink.svg";
import cicleplus from "./plus-circle.svg";
import arrup from "./arrow-up-right.png";
import horin from "./more-horizontal.svg";
import cul from "./corner-up-left.svg";
import heart from "./heart.svg";
import cross from "./x.svg";
import Doublemanb from "./doublemanb.svg";
import stared from "./stared.svg";
import redheart from "./heartred.svg";
import activestar from "./staractive.svg";
import RedLogo from "./RedLogo.svg";

export const Images = {
  home: Home,
  logo: Logo,
  analyst: Analyst,
  profile: Profile,
  trending: Trending,
  down: Down,
  search: Search,
  star: Star,
  doubleman: Doubleman,
  profileImage: ProfileImage,
  imglink: imglink,
  pluscircle: cicleplus,
  arrUpRight: arrup,
  horizontal: horin,
  cul: cul,
  heart: heart,
  cross: cross,
  Doublemanb: Doublemanb,
  stared: stared,
  redheart: redheart,
  activestar: activestar,
  redlogo: RedLogo,
};

export const ImgHome = ({ color }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 18.3346V10.0013H12.5V18.3346M2.5 7.5013L10 1.66797L17.5 7.5013V16.668C17.5 17.11 17.3244 17.5339 17.0118 17.8465C16.6993 18.159 16.2754 18.3346 15.8333 18.3346H4.16667C3.72464 18.3346 3.30072 18.159 2.98816 17.8465C2.67559 17.5339 2.5 17.11 2.5 16.668V7.5013Z"
        stroke={color !== undefined ? color : "#616161"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

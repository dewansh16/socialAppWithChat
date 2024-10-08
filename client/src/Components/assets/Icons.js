export const Layers2 = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 14.5L12 19.5L22 14.5M12 4.5L2 9.5L12 14.5L22 9.5L12 4.5Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const MinusCircle = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        stroke={props.color === undefined ? "#101828" : props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Layers3 = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 17L12 22L22 17M2 12L12 17L22 12M12 2L2 7L12 12L22 7L12 2Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Activity = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 12H18L15 21L9 3L6 12H2"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Airplay = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 17H4C3.46957 17 2.96086 16.7893 2.58579 16.4142C2.21071 16.0391 2 15.5304 2 15V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H20C20.5304 3 21.0391 3.21071 21.4142 3.58579C21.7893 3.96086 22 4.46957 22 5V15C22 15.5304 21.7893 16.0391 21.4142 16.4142C21.0391 16.7893 20.5304 17 20 17H19M12 15L17 21H7L12 15Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const AlertCircle = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const AlertOctagon = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 8V12M12 16H12.01M7.86 2H16.14L22 7.86V16.14L16.14 22H7.86L2 16.14V7.86L7.86 2Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const AlertTriangle = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.9988 8.00021V12.0002M11.9988 16.0002H12.0088M10.2888 2.8602L1.8188 17.0002C1.64417 17.3026 1.55177 17.6455 1.55079 17.9947C1.54981 18.3439 1.64029 18.6873 1.81323 18.9907C1.98616 19.2941 2.23553 19.547 2.53651 19.7241C2.83749 19.9012 3.1796 19.9964 3.5288 20.0002H20.4688C20.818 19.9964 21.1601 19.9012 21.4611 19.7241C21.7621 19.547 22.0114 19.2941 22.1844 18.9907C22.3573 18.6873 22.4478 18.3439 22.4468 17.9947C22.4458 17.6455 22.3534 17.3026 22.1788 17.0002L13.7088 2.8602C13.5305 2.56631 13.2795 2.32332 12.98 2.15469C12.6805 1.98605 12.3425 1.89746 11.9988 1.89746C11.6551 1.89746 11.3171 1.98605 11.0176 2.15469C10.7181 2.32332 10.4671 2.56631 10.2888 2.8602Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const AlignCenter = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 10H6M21 6H3M21 14H3M18 18H6"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const AlignJustify = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 10H3M21 6H3M21 14H3M21 18H3"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const AlignLeft = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 10H3M21 6H3M21 14H3M17 18H3"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const AlignRight = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 10H7M21 6H3M21 14H3M21 18H7"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Anchor = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 8C13.6569 8 15 6.65685 15 5C15 3.34315 13.6569 2 12 2C10.3431 2 9 3.34315 9 5C9 6.65685 10.3431 8 12 8ZM12 8V22M12 22C9.34784 22 6.8043 20.9464 4.92893 19.0711C3.05357 17.1957 2 14.6522 2 12H5M12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12H19"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Aperture = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 8C13.6569 8 15 6.65685 15 5C15 3.34315 13.6569 2 12 2C10.3431 2 9 3.34315 9 5C9 6.65685 10.3431 8 12 8ZM12 8V22M12 22C9.34784 22 6.8043 20.9464 4.92893 19.0711C3.05357 17.1957 2 14.6522 2 12H5M12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12H19"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Archive = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 8V21H3V8M10 12H14M1 3H23V8H1V3Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ArrowDownCircle = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 12L12 16M12 16L16 12M12 16V8M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ArrowDownLeft = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 7L7 17M7 17H17M7 17V7"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ArrowDownRight = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 7L17 17M17 17V7M17 17H7"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ArrowDown = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5V19M12 19L19 12M12 19L5 12"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ArrowLeftCircle = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 8L8 12M8 12L12 16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ArrowLeft = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 12H5M5 12L12 19M5 12L12 5"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ArrowRightCircle = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 16L16 12M16 12L12 8M16 12H8M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ArrowRight = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12H19M19 12L12 5M19 12L12 19"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ArrowUpCircle = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 12L12 8M12 8L8 12M12 8V16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ArrowUpleft = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 17L7 7M7 7V17M7 7H17"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ArrowUpRight = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 17L17 7M17 7H7M17 7V17"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ArrowUp = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 17L17 7M17 7H7M17 7V17"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const AtSign = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 7.99987V12.9999C16 13.7955 16.3161 14.5586 16.8787 15.1212C17.4413 15.6838 18.2044 15.9999 19 15.9999C19.7957 15.9999 20.5587 15.6838 21.1213 15.1212C21.6839 14.5586 22 13.7955 22 12.9999V11.9999C21.9999 9.7429 21.2362 7.55235 19.8333 5.7844C18.4303 4.01645 16.4706 2.77509 14.2726 2.26217C12.0747 1.74924 9.76794 1.99491 7.72736 2.95923C5.68677 3.92356 4.03241 5.54982 3.03327 7.57359C2.03413 9.59736 1.74898 11.8996 2.22418 14.106C2.69938 16.3124 3.90699 18.2931 5.65064 19.7261C7.39429 21.1592 9.57144 21.9602 11.8281 21.999C14.0847 22.0378 16.2881 21.3121 18.08 19.9399M16 11.9999C16 14.209 14.2092 15.9999 12 15.9999C9.79087 15.9999 8.00001 14.209 8.00001 11.9999C8.00001 9.79073 9.79087 7.99987 12 7.99987C14.2092 7.99987 16 9.79073 16 11.9999Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Award = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88M19 8C19 11.866 15.866 15 12 15C8.13401 15 5 11.866 5 8C5 4.13401 8.13401 1 12 1C15.866 1 19 4.13401 19 8Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const BarChart2 = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 20V10M12 20V4M6 20V14"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const BarChart = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 20V10M18 20V4M6 20V16"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const BatteryCharging = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 18H3C2.46957 18 1.96086 17.7893 1.58579 17.4142C1.21071 17.0391 1 16.5304 1 16V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H6.19M15 6H17C17.5304 6 18.0391 6.21071 18.4142 6.58579C18.7893 6.96086 19 7.46957 19 8V16C19 16.5304 18.7893 17.0391 18.4142 17.4142C18.0391 17.7893 17.5304 18 17 18H13.81M23 13V11M11 6L7 12H13L9 18"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Battery = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23 13V11M3 6H17C18.1046 6 19 6.89543 19 8V16C19 17.1046 18.1046 18 17 18H3C1.89543 18 1 17.1046 1 16V8C1 6.89543 1.89543 6 3 6Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const BellOff = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1941_9090)">
        <path
          d="M13.73 21C13.5542 21.3031 13.3018 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21M18.63 13C18.1851 11.3714 17.973 9.68804 18 8C18.0016 6.91306 17.7079 5.84611 17.1503 4.91309C16.5927 3.98008 15.7922 3.21606 14.8341 2.70264C13.8761 2.18922 12.7966 1.94569 11.7109 1.99807C10.6252 2.05044 9.57417 2.39675 8.67 3M6.26 6.26C6.08627 6.82361 5.99861 7.41022 6 8C6 15 3 17 3 17H17M1 1L23 23"
          stroke={props.color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1941_9090">
          <rect
            width={props.width === undefined ? "20" : props.width}
            height={props.height === undefined ? "20" : props.height}
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Bell = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.73 21C13.5542 21.3031 13.3018 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const BellActive = (props) => {
  <svg
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="43" height="43" rx="7.5" fill="red" />
    <path
      d="M23.4417 29.4998C23.2952 29.7524 23.0849 29.962 22.8319 30.1078C22.5788 30.2535 22.292 30.3302 22 30.3302C21.708 30.3302 21.4212 30.2535 21.1681 30.1078C20.9151 29.962 20.7048 29.7524 20.5583 29.4998M27 18.6665C27 17.3404 26.4732 16.0687 25.5355 15.131C24.5979 14.1933 23.3261 13.6665 22 13.6665C20.6739 13.6665 19.4021 14.1933 18.4645 15.131C17.5268 16.0687 17 17.3404 17 18.6665C17 24.4998 14.5 26.1665 14.5 26.1665H29.5C29.5 26.1665 27 24.4998 27 18.6665Z"
      stroke="#242424"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="0.5"
      y="0.5"
      width="43"
      height="43"
      rx="7.5"
      stroke={props.color === undefined ? "#D1D1D1" : props.color}
    />
  </svg>;
};

export const ChevronDown = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ChevronLeft = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 18L9 12L15 6"
        stroke={props.color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const ChevronUP = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 15L12 9L6 15"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ChevronRight = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 18L15 12L9 6"
        stroke={props.color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const ChevronsRight = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 17L18 12L13 7M6 17L11 12L6 7"
        stroke={props.color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const ChevronsLeft = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 17L6 12L11 7M18 17L13 12L18 7"
        stroke={props.color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const Edit2 = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 2.99981C17.2626 2.73717 17.5744 2.52883 17.9176 2.38669C18.2608 2.24455 18.6286 2.17139 19 2.17139C19.3714 2.17139 19.7392 2.24455 20.0824 2.38669C20.4256 2.52883 20.7374 2.73717 21 2.99981C21.2626 3.26246 21.471 3.57426 21.6131 3.91742C21.7553 4.26058 21.8284 4.62838 21.8284 4.99981C21.8284 5.37125 21.7553 5.73905 21.6131 6.08221C21.471 6.42537 21.2626 6.73717 21 6.99981L7.5 20.4998L2 21.9998L3.5 16.4998L17 2.99981Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Search = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const TV = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 2L12 7L7 2M4 7H20C21.1046 7 22 7.89543 22 9V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V9C2 7.89543 2.89543 7 4 7Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const UserPlus = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M20 8V14M23 11H17M12.5 7C12.5 9.20914 10.7091 11 8.5 11C6.29086 11 4.5 9.20914 4.5 7C4.5 4.79086 6.29086 3 8.5 3C10.7091 3 12.5 4.79086 12.5 7Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const UserCheck = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M17 11L19 13L23 9M12.5 7C12.5 9.20914 10.7091 11 8.5 11C6.29086 11 4.5 9.20914 4.5 7C4.5 4.79086 6.29086 3 8.5 3C10.7091 3 12.5 4.79086 12.5 7Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const MoreVertical = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Share2 = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49M21 5C21 6.65685 19.6569 8 18 8C16.3431 8 15 6.65685 15 5C15 3.34315 16.3431 2 18 2C19.6569 2 21 3.34315 21 5ZM9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12ZM21 19C21 20.6569 19.6569 22 18 22C16.3431 22 15 20.6569 15 19C15 17.3431 16.3431 16 18 16C19.6569 16 21 17.3431 21 19Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const UserX = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M18 8L23 13M23 8L18 13M12.5 7C12.5 9.20914 10.7091 11 8.5 11C6.29086 11 4.5 9.20914 4.5 7C4.5 4.79086 6.29086 3 8.5 3C10.7091 3 12.5 4.79086 12.5 7Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const User = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Users = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
        stroke={props.color === undefined ? "#101828" : props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const X = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Plus = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5V19M5 12H19"
        stroke={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Trash = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6H5M5 6H21M5 6V20C5 20.5304 5.21071 21.0391 5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20V6H5ZM8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6"
        stroke={props.color === undefined ? "#101828" : props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Trash2 = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6H5M5 6H21M5 6V20C5 20.5304 5.21071 21.0391 5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20V6H5ZM8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M10 11V17M14 11V17"
        stroke={props.color === undefined ? "#101828" : props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Logores = (props) => {
  return (
    <svg
      width={props.width === undefined ? "91" : props.width}
      height={props.height === undefined ? "32" : props.height}
      viewBox="0 0 91 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.9173 22.3996C15.2616 22.3996 17.4063 20.6335 17.4063 17.5746V10.2369H14.7709V17.4653C14.7709 19.104 13.6622 19.9234 12.0809 19.9234C10.4996 19.9234 9.39094 19.104 9.39094 17.4653V10.2369H6.41016V17.5746C6.41016 20.6335 8.57304 22.3996 11.9173 22.3996Z"
        fill={props.color === undefined ? "#242424" : props.color}
      />
      <path
        d="M23.3956 22.3632C24.1408 22.3632 24.9041 22.2175 25.1404 22.1629V20.069C24.8314 20.1419 24.268 20.1965 23.8863 20.1965C22.7958 20.1965 22.3596 19.9052 22.3596 18.9766V15.3714H25.2313V13.2229H22.3596V11.1837H20.0876L19.9604 12.44C19.9059 12.9862 19.7605 13.2229 19.3424 13.2229H18.2701V15.3714H19.5969V19.1222C19.5969 21.1251 20.5965 22.3632 23.3956 22.3632Z"
        fill={props.color === undefined ? "#242424" : props.color}
      />
      <path
        d="M31.0456 22.3632C31.7908 22.3632 32.5542 22.2175 32.7904 22.1629V20.069C32.4815 20.1419 31.918 20.1965 31.5363 20.1965C30.4458 20.1965 30.0096 19.9052 30.0096 18.9766V15.3714H32.8813V13.2229H30.0096V11.1837H27.7377L27.6104 12.44C27.5559 12.9862 27.4105 13.2229 26.9925 13.2229H25.9201V15.3714H27.2469V19.1222C27.2469 21.1251 28.2466 22.3632 31.0456 22.3632Z"
        fill={props.color === undefined ? "#242424" : props.color}
      />
      <path
        d="M42.6512 17.4653C42.6512 14.5157 40.8882 13.0773 38.38 13.0773C35.3447 13.0773 33.4908 14.8434 33.4908 17.8113C33.4908 20.6699 35.3447 22.3632 38.3254 22.3632C40.8882 22.3632 42.5967 21.1615 42.6512 19.104H40.2157C40.143 19.978 39.4523 20.3603 38.38 20.3603C37.144 20.3603 36.3988 19.7231 36.2716 18.2483H42.6512V17.4653ZM40.2157 16.7734H36.3443C36.5624 15.5899 37.2167 15.0801 38.38 15.0801C39.525 15.0801 40.2157 15.6081 40.2157 16.6278V16.7734Z"
        fill={props.color === undefined ? "#242424" : props.color}
      />
      <path
        d="M43.8603 22.2175H46.623V18.3393C46.623 16.3365 47.4409 15.3714 48.6223 15.3714C49.4947 15.3714 50.0218 15.8995 50.0218 17.2104C50.0218 17.4835 50.0036 17.9387 49.9673 18.3757H52.4755C52.5118 17.9023 52.5664 17.1012 52.5664 16.5914C52.5664 14.2608 51.494 13.0773 49.6583 13.0773C47.8953 13.0773 46.932 14.0787 46.5503 15.7902H46.5139L46.623 13.2229H43.8603V22.2175Z"
        fill={props.color === undefined ? "#242424" : props.color}
      />
      <path
        d="M58.3088 22.3632C59.054 22.3632 59.8174 22.2175 60.0537 22.1629V20.069C59.7447 20.1419 59.1812 20.1965 58.7996 20.1965C57.709 20.1965 57.2728 19.9052 57.2728 18.9766V15.3714H60.1445V13.2229H57.2728V11.1837H55.0009L54.8737 12.44C54.8191 12.9862 54.6737 13.2229 54.2557 13.2229H53.1833V15.3714H54.5101V19.1222C54.5101 21.1251 55.5098 22.3632 58.3088 22.3632Z"
        fill={props.color === undefined ? "#242424" : props.color}
      />
      <path
        d="M64.4947 22.3632C66.1305 22.3632 67.1483 21.6713 67.421 20.3968H67.4392C67.4392 20.943 67.3665 21.7623 67.3119 22.2175H70.0746V16.7552C70.0746 14.3518 68.4025 13.0773 65.5489 13.0773C62.8226 13.0773 61.2231 14.1515 61.2231 15.9723C61.2231 16.1544 61.2413 16.3547 61.2595 16.5003H63.8041C63.7859 16.3182 63.7859 16.1726 63.7859 16.118C63.7859 15.3897 64.3857 14.9527 65.4217 14.9527C66.694 14.9527 67.3119 15.3897 67.3119 16.4821V17.083H64.3857C62.0047 17.083 60.9505 18.1572 60.9505 19.632C60.9505 21.4528 62.4045 22.3632 64.4947 22.3632ZM65.04 20.4878C64.0403 20.4878 63.4406 20.1236 63.4406 19.4318C63.4406 18.9219 63.8949 18.576 64.6401 18.576H67.3119V18.7581C67.3119 19.8505 66.4759 20.4878 65.04 20.4878Z"
        fill={props.color === undefined ? "#242424" : props.color}
      />
      <path
        d="M71.4084 22.2175H74.171V9.59961H71.4084V22.2175Z"
        fill={props.color === undefined ? "#242424" : props.color}
      />
      <path
        d="M84.5933 17.4653C84.5933 14.5157 82.8302 13.0773 80.322 13.0773C77.2867 13.0773 75.4328 14.8434 75.4328 17.8113C75.4328 20.6699 77.2867 22.3632 80.2675 22.3632C82.8302 22.3632 84.5387 21.1615 84.5933 19.104H82.1578C82.0851 19.978 81.3944 20.3603 80.322 20.3603C79.0861 20.3603 78.3409 19.7231 78.2137 18.2483H84.5933V17.4653ZM82.1578 16.7734H78.2864C78.5045 15.5899 79.1588 15.0801 80.322 15.0801C81.4671 15.0801 82.1578 15.6081 82.1578 16.6278V16.7734Z"
        fill={props.color === undefined ? "#242424" : props.color}
      />
    </svg>
  );
};

export const ShapeOfLogo = (props) => {
  return (
    <svg
      width={props.width === undefined ? "32" : props.width}
      height={props.height === undefined ? "32" : props.height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0L0 16H16V32H32V16H16L16 0H0Z"
        fill={props.color === undefined ? "#FF9670" : props.color}
      />
    </svg>
  );
};

export const RedEvents = (props) => {
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.3333 1.66602V4.99935M5.66667 1.66602V4.99935M1.5 8.33268H16.5M3.16667 3.33268H14.8333C15.7538 3.33268 16.5 4.07887 16.5 4.99935V16.666C16.5 17.5865 15.7538 18.3327 14.8333 18.3327H3.16667C2.24619 18.3327 1.5 17.5865 1.5 16.666V4.99935C1.5 4.07887 2.24619 3.33268 3.16667 3.33268Z"
        stroke="#FF3520"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const BlackEvents = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
    >
      <path
        d="M12.3333 1.66602V4.99935M5.66667 1.66602V4.99935M1.5 8.33268H16.5M3.16667 3.33268H14.8333C15.7538 3.33268 16.5 4.07887 16.5 4.99935V16.666C16.5 17.5865 15.7538 18.3327 14.8333 18.3327H3.16667C2.24619 18.3327 1.5 17.5865 1.5 16.666V4.99935C1.5 4.07887 2.24619 3.33268 3.16667 3.33268Z"
        stroke="#757575"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="#ffffff"
      />
    </svg>
  );
};

export const Hexagon = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 15.9999V7.9999C20.9996 7.64918 20.9071 7.30471 20.7315 7.00106C20.556 6.69742 20.3037 6.44526 20 6.2699L13 2.2699C12.696 2.09437 12.3511 2.00195 12 2.00195C11.6489 2.00195 11.304 2.09437 11 2.2699L4 6.2699C3.69626 6.44526 3.44398 6.69742 3.26846 7.00106C3.09294 7.30471 3.00036 7.64918 3 7.9999V15.9999C3.00036 16.3506 3.09294 16.6951 3.26846 16.9987C3.44398 17.3024 3.69626 17.5545 4 17.7299L11 21.7299C11.304 21.9054 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9054 13 21.7299L20 17.7299C20.3037 17.5545 20.556 17.3024 20.7315 16.9987C20.9071 16.6951 20.9996 16.3506 21 15.9999Z"
        stroke={props.color === undefined ? "#101828" : props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Link = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.99825 13C10.4277 13.5741 10.9756 14.0491 11.6048 14.3929C12.234 14.7367 12.9298 14.9411 13.6449 14.9923C14.36 15.0435 15.0778 14.9403 15.7496 14.6897C16.4214 14.4392 17.0314 14.047 17.5382 13.54L20.5382 10.54C21.449 9.59695 21.953 8.33394 21.9416 7.02296C21.9302 5.71198 21.4044 4.45791 20.4773 3.53087C19.5503 2.60383 18.2962 2.07799 16.9853 2.0666C15.6743 2.0552 14.4113 2.55918 13.4682 3.46997L11.7482 5.17997M13.9982 11C13.5688 10.4258 13.0209 9.95078 12.3917 9.60703C11.7625 9.26327 11.0667 9.05885 10.3516 9.00763C9.63645 8.95641 8.91866 9.0596 8.2469 9.31018C7.57514 9.56077 6.96513 9.9529 6.45825 10.46L3.45825 13.46C2.54746 14.403 2.04348 15.666 2.05488 16.977C2.06627 18.288 2.59211 19.542 3.51915 20.4691C4.44619 21.3961 5.70026 21.9219 7.01124 21.9333C8.32222 21.9447 9.58524 21.4408 10.5282 20.53L12.2382 18.82"
        stroke={props.color === undefined ? "#101828" : props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Home = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 22V12H15V22M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
        stroke={props.color === undefined ? "#101828" : props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Delete = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 9L12 15M12 9L18 15M21 4H8L1 12L8 20H21C21.5304 20 22.0391 19.7893 22.4142 19.4142C22.7893 19.0391 23 18.5304 23 18V6C23 5.46957 22.7893 4.96086 22.4142 4.58579C22.0391 4.21071 21.5304 4 21 4Z"
        stroke={props.color === undefined ? "#101828" : props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const LogOut = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9"
        stroke={props.color === undefined ? "#101828" : props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const EditOutlined = (props) => {
  return (
    <svg
      width={props.width === undefined ? "20" : props.width}
      height={props.height === undefined ? "20" : props.height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.16699 3.33417H3.33366C2.89163 3.33417 2.46771 3.50977 2.15515 3.82233C1.84259 4.13489 1.66699 4.55881 1.66699 5.00084V16.6675C1.66699 17.1095 1.84259 17.5335 2.15515 17.846C2.46771 18.1586 2.89163 18.3342 3.33366 18.3342H15.0003C15.4424 18.3342 15.8663 18.1586 16.1788 17.846C16.4914 17.5335 16.667 17.1095 16.667 16.6675V10.8342M15.417 2.08417C15.7485 1.75265 16.1982 1.56641 16.667 1.56641C17.1358 1.56641 17.5855 1.75265 17.917 2.08417C18.2485 2.41569 18.4348 2.86533 18.4348 3.33417C18.4348 3.80301 18.2485 4.25265 17.917 4.58417L10.0003 12.5008L6.66699 13.3342L7.50033 10.0008L15.417 2.08417Z"
        stroke="#616161"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const Bookmark = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
        stroke="#101828"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const Share = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12M16 6L12 2M12 2L8 6M12 2V15"
        stroke="#101828"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const EventBookmark = (props) => {
  return (
    <svg
      width="15"
      height="18"
      viewBox="0 0 15 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3327 16.5L7.49935 12.3333L1.66602 16.5V3.16667C1.66602 2.72464 1.84161 2.30072 2.15417 1.98816C2.46673 1.67559 2.89065 1.5 3.33268 1.5H11.666C12.108 1.5 12.532 1.67559 12.8445 1.98816C13.1571 2.30072 13.3327 2.72464 13.3327 3.16667V16.5Z"
        stroke="#242424"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const EventBookmarkSelected = (props) => {
  return (
    <svg
      width="13"
      height="16"
      viewBox="0 0 13 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.3327 15.5L6.49935 11.3333L0.666016 15.5V2.16667C0.666016 1.72464 0.84161 1.30072 1.15417 0.988155C1.46673 0.675595 1.89065 0.5 2.33268 0.5H10.666C11.108 0.5 11.532 0.675595 11.8445 0.988155C12.1571 1.30072 12.3327 1.72464 12.3327 2.16667V15.5Z"
        fill="#138DEC"
      />
    </svg>
  );
};

export const InterestedIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="12"
      viewBox="0 0 20 12"
      fill="none"
    >
      <path
        d="M19.1673 1L11.2507 8.91667L7.08398 4.75L0.833984 11M19.1673 1H14.1673M19.1673 1V6"
        stroke="#242424"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const WhiteDot = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
    >
      <circle cx="3" cy="3" r="3" fill="white" />
    </svg>
  );
};

export const Driving1 = () => {
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="43"
    height="44"
    viewBox="0 0 43 44"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 0.601562L0 36.2677H18.3426V43.4009L42.7993 43.4009L42.7993 7.73478L24.4568 7.73479V0.601565L0 0.601562ZM18.3426 7.73478L6.11419 7.73478L6.11419 29.1344L24.4568 29.1344L24.4568 36.2677H36.6851L36.6851 14.868L18.3426 14.868L18.3426 7.73478Z"
      fill="white"
    />
  </svg>;
};

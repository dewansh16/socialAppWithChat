export const Font = {
  components: "components",
  font: "font",
  bold: "bold",
  medium: "medium",
  regular: "regular",
  display: "display",
  heading1: "heading1",
  heading2: "heading2",
  heading3: "heading3",
  subheadline: "subheadline",
  body1: "body1",
  body2: "body2",
  label: "caption",
};

export const OptionSearch = {
  control: (base, state) => ({
    ...base,
    boxShadow: "none",
    borderColor: state.isFocused ? "#F5F5F5" : "#F5F5F5",
    borderColor: state.isFocused ? "#F5F5F5" : "#F5F5F5",
    background: state.isFocused ? "#F5F5F5" : "#F5F5F5",
  }),
  option: (styles, { isFocused, isSelected }) => {
    return {
      ...styles,
      // backgroundColor: isDisabled?'blueviolet':'red',
      backgroundColor: isSelected
        ? "#F5F5F5"
        : isFocused
        ? "#F5F5F5"
        : undefined,
      color: "#242424",
      ":active": {
        ...styles[":active"],
        backgroundColor: "#F5F5F5",
      },
    };
  },
  menuList: (base) => ({
    ...base,

    "::-webkit-scrollbar": {
      width: "4px",
      borderRadius: "8px",
    },
    "::-webkit-scrollbar-track": {
      background: "#fff",
      marginTop: "10px",
      marginBottom: "10px",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#D9D9D9",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#D9D9D9",
    },
  }),
};

export const ThemeSearch = (theme) => ({
  ...theme,
  borderRadius: 10,
  colors: {
    ...theme.colors,
    primary: "#F5F5F5",
  },
});

export const Avtar = {
  avtar: "avtar",
  "avtar-1": "avtar-1",
  "avtar-2": "avtar-2",
  "avtar-3": "avtar-3",
  "x-small": "x-small",
  small: "small",
  medium: "medium",
  large: "large",
  "x-large": "x-large",
};

export const Button = {
  button: "button",
  large: "large",
  medium: "medium",
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary",
  disable: "disable",
  iconlarge: "iconlarge",
  iconmedium: "iconmedium",
};

export const Input = (props) => {
  return (
    <div
      className="inputcontainer"
      style={{ width: props.width === undefined ? 464 : props.width }}
    >
      <p>{props.name}</p>
      <label
        htmlFor={props.id}
        className={`input ${
          props.isErr !== undefined && props.isErr ? "error" : ""
        } ${props.isDis !== undefined && props.isDis ? "disable" : ""}`}
      >
        <input
          type={props.type}
          id={props.id}
          placeholder={props.placeholder}
          disabled={props.isDis !== undefined && props.isDis ? true : false}
        />
      </label>
      {props.isErr !== undefined && props.isErr && (
        <span>
          {props.errMessage !== undefined && props.isErr
            ? props.errMessage
            : ""}
        </span>
      )}
    </div>
  );
};

export const Options = {
  control: (base) => ({
    ...base,
    boxShadow: "none",
  }),
  option: (styles, { isFocused, isSelected }) => {
    return {
      ...styles,
      // backgroundColor: isDisabled?'blueviolet':'red',
      backgroundColor: isSelected
        ? "#F5F5F5"
        : isFocused
        ? "#F5F5F5"
        : undefined,
      color: "#242424",
      ":active": {
        ...styles[":active"],
        backgroundColor: "#F5F5F5",
      },
    };
  },
  menuList: (base) => ({
    ...base,

    "::-webkit-scrollbar": {
      width: "4px",
      borderRadius: "8px",
    },
    "::-webkit-scrollbar-track": {
      background: "#fff",
      marginTop: "10px",
      marginBottom: "10px",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#D9D9D9",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#D9D9D9",
    },
  }),
};

export const Themes = (theme) => ({
  ...theme,
  borderRadius: 10,
  colors: {
    ...theme.colors,
    primary: "#2E65E5",
  },
});

export const ChartColors = [
  "#FA943E",
  "#89FAF4",
  "#3EC5FA",
  "#FFE28C",
  "#336699",
  "#99CCFF",
  "#999933",
  "#666699",
  "#CC9933",
  "#006666",
  "#3399FF",
  "#993300",
  "#CCCC99",
  "#666666",
  "#FFCC66",
  "#6699CC",
  "#663366",
  "#9999CC",
  "#CCCCCC",
  "#669999",
  "#CCCC66",
  "#CC6600",
  "#9999FF",
  "#0066CC",
  "#99CCCC",
  "#999999",
  "#FFCC00",
  "#009999",
  "#99CC33",
  "#FF9900",
  "#999966",
  "#66CCCC",
  "#339966",
  "#CCCC33",
  "#003f5c",
  "#665191",
  "#a05195",
  "#d45087",
  "#2f4b7c",
  "#f95d6a",
  "#ff7c43",
  "#ffa600",
  "#EF6F6C",
  "#465775",
  "#56E39F",
  "#59C9A5",
  "#5B6C5D",
  "#0A2342",
  "#2CA58D",
  "#84BC9C",
  "#CBA328",
  "#F46197",
  "#DBCFB0",
  "#545775",
];

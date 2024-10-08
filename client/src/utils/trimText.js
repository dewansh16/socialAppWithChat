function trimText(str, len) {
  if (str.length > 60) return str.slice(0, len) + "..";
  else return str.slice(0, len);
}

export { trimText };

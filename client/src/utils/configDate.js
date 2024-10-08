function formatDate(datetag) {
  //   console.log("inputDate... ", datetag);
  let inputDate = new Date(datetag);
  if (!inputDate) return "";
  let date, month, year;

  date = inputDate.getDate();
  month = inputDate.getMonth() + 1;
  year = inputDate.getFullYear();

  date = date.toString().padStart(2, "0");

  month = month.toString().padStart(2, "0");

  return `${date}/${month}/${year}`;
  //   return "";
}

function formatAMPM(datetag) {
  //   console.log("inputDate... ", datetag);
  let date = new Date(datetag);
  if (!date) return "";
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

export { formatDate, formatAMPM };

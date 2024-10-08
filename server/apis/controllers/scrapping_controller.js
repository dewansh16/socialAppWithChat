const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

const FeaturedLink = require("../models/featuredLink");

const AXIOS_OPTIONS = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:108.0) Gecko/20100101 Firefox/108.0",
  },
};

function getNewsInfo24(searchString) {
  return axios
    .get(
      `https://www.google.com/search?q=${searchString}&tbm=nws&source=lnt&tbs=qdr:d&sa=X&ved=2ahUKEwirz5a_lK79AhVt8DgGHS5jBEQQpwV6BAgBEBY&biw=1440&bih=821&dpr=1`,
      AXIOS_OPTIONS
    )
    .then(function ({ data }) {
      return data.match(/About .{1,} results/g);
    });
}

function getNewsInfo1m(searchString) {
  return axios
    .get(
      `https://www.google.com/search?q=${searchString}&tbm=nws&source=lnt&tbs=qdr:m&sa=X&ved=2ahUKEwjRk7OOlK79AhUEumMGHakKDoYQpwV6BAgBEBg&biw=1440&bih=821&dpr=1`,
      AXIOS_OPTIONS
    )
    .then(function ({ data }) {
      return data.match(/About .{1,} results/g);
    });
}

function getNewsInfo1y(searchString) {
  return axios
    .get(
      `https://www.google.com/search?q=${searchString}&tbm=nws&source=lnt&tbs=qdr:y&sa=X&ved=2ahUKEwiqqJTHk679AhWA8jgGHaMqDv4QpwV6BAgBEBk&biw=1440&bih=821&dpr=1`,
      AXIOS_OPTIONS
    )
    .then(function ({ data }) {
      return data.match(/About .{1,} results/g);
    });
}

function getNewsInfo1w(searchString) {
  return axios
    .get(
      `https://www.google.com/search?q=${searchString}&tbs=qdr:w&tbm=nws&source=lnt&sa=X&ved=2ahUKEwjSmPOVkq79AhX28zgGHQINBvYQpwV6BAgBEBc&biw=1440&bih=821&dpr=1`,
      AXIOS_OPTIONS
    )
    .then(function ({ data }) {
      return data.match(/About .{1,} results/g);
    });
}

function getNewsInfoC(searchString, fromdate, todate) {
  return axios
    .get(
      `https://www.google.com/search?q=${searchString}&biw=1440&bih=821&source=lnt&tbs=cdr%3A1%2Ccd_min%3A${fromdate[0]}%2F${fromdate[1]}%2F${fromdate[2]}%2Ccd_max%3A${todate[0]}%2F${todate[1]}%2F${todate[2]}&tbm=nws`,
      AXIOS_OPTIONS
    )
    .then(function ({ data }) {
      return data.match(/About .{1,} results/g);
    });
}

exports.scrapper = async (req, res) => {
  const id = req.params.id;
  const r = req.params.r;
  const start = req.params.start.split(",");
  const end = req.params.end.split(",");
  let featuredLink = [];

  try {
    featuredLink = (await FeaturedLink.find({ userId: id })) || [];
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to retrieve featured links" });
  }
  try {
    if (r === "1") {
      //done
      // const data = await getNewsInfo24(searchString);
      // let result = data[0].split(" ")[1].replace(/,/g, "");
      // if (isNumeric(result)) return res.send(result);
      const newArray = featuredLink.filter((data) => {
        const date = new Date(data.date);
        return date > new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
      });
      return res.send(`${newArray.length}`);
    } else if (r === "2") {
      //done
      // const data = await getNewsInfo1w(searchString);
      // let result = data[0].split(" ")[1].replace(/,/g, "");
      // if (isNumeric(result)) return res.send(result);
      const newArray = featuredLink.filter((data) => {
        const date = new Date(data.date);
        return date > new Date(new Date().getTime() - 168 * 60 * 60 * 1000);
      });
      return res.send(`${newArray.length}`);
    } else if (r === "3") {
      //done
      // const data = await getNewsInfo1m(searchString);
      // let result = data[0].split(" ")[1].replace(/,/g, "");
      // if (isNumeric(result)) return res.send(result);
      const newArray = featuredLink.filter((data) => {
        const date = new Date(data.date);
        return date > new Date(new Date().getTime() - 480 * 60 * 60 * 1000);
      });
      return res.send(`${newArray.length}`);
    } else if (r === "4") {
      //done
      // console.log(searchString);
      // const data = await getNewsInfo1y(searchString);
      // let result = data[0].split(" ")[1].replace(/,/g, "");
      // if (isNumeric(result)) return res.send(result);
      const newArray = featuredLink.filter((data) => {
        const date = new Date(data.date);
        return date > new Date(new Date().getTime() - 8760 * 60 * 60 * 1000);
      });
      return res.send(`${newArray.length}`);
    } else {
      //done
      // const data = await getNewsInfoC(searchString, start, end);
      // let result = data[0].split(" ")[1].replace(/,/g, "");
      // if (isNumeric(result)) return res.send(result);
      const newArray = featuredLink.filter((data) => {
        const date = new Date(data.date);
        return date > new Date(start) && date < new Date(end);
      });
      return res.send(`${newArray.length}`);
    }
  } catch (error) {
    return res.send("0");
  }
};

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

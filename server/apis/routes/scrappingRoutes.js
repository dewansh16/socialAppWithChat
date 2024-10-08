const express = require("express");
const cheerio = require("cheerio");
const router = express.Router();
const axios = require("axios");
const ScrappingController = require("../controllers/scrapping_controller.js");
router.get("/:r/:id/:start/:end", ScrappingController.scrapper);

router.get("/news/images", (req, res) => {
  const searchString = req.body.searchString;
  const encodedString = encodeURI(searchString);

  const AXIOS_OPTIONS = {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36",
    },
    params: {
      q: encodedString,
      tbm: "nws",
      hl: "en",
      gl: "in",
    },
  };

  axios
    .get(`http://google.co.in/search`, AXIOS_OPTIONS)
    .then(function ({ data }) {
      let $ = cheerio.load(data);

      const pattern = /s='(?<img>[^']+)';\w+\s\w+=\['(?<id>\w+_\d+)'];/gm;
      const images = [...data.matchAll(pattern)].map(({ groups }) => ({
        id: groups.id,
        img: groups.img.replace("\\x3d", ""),
      }));

      const allNewsInfo = Array.from($(".WlydOe")).map((el) => {
        const link = $(el).attr("href");
        const id = $(el).find(".uhHOwf img").attr("id");
        const image =
          images.find(({ id: imgId }) => imgId === id)?.img || "No image";

        return {
          link,
          image,
        };
      });

      const allImages = allNewsInfo.map(({ image }) => image);
      res.json(allImages);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error fetching news images");
    });
});

module.exports = router;

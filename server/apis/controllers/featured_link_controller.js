const Joi = require("joi");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const FeaturedLink = require("../models/featuredLink");
const User = require("../models/user.js");

const cheerio = require("cheerio");
const axios = require("axios");
const { getPagination } = require("../services/query");

exports.addFeaturedLinks = async (req, res) => {
  const { userId, date, link, title } = req.body;

  try {
    if (!link) {
      return res.status(400).json({ message: "Invalid featured links" });
    }

    const response = await axios.get(link);
    const $ = cheerio.load(response.data);

    const fetchedTitle =
      $('meta[property="og:title"]').attr("content") || $("title").text();
    const image =
      $('meta[property="og:image"]').attr("content") ||
      $('a[href="#"] img').attr("src") ||
      "";
    const fetchedDate =
      $('meta[property="article:published_time"]').attr("content") || "";
    const description =
      $('meta[property="og:description"]').attr("content") || "";

    const isValidObjectId = mongoose.Types.ObjectId.isValid(userId);
    if (!isValidObjectId) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // create a new featuredLink
    const newFeaturedLink = new FeaturedLink({
      userId,
      link,
      title: fetchedTitle,
      date: fetchedDate,
      image,
      description,
    });
    await newFeaturedLink.save();
    return res.json(newFeaturedLink);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update featured links" });
  }
};

exports.getFeaturedLinksByFeatureLinkId = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid feature_link ID" });
  }

  try {
    const featuredLink = await FeaturedLink.findById(id);

    if (!featuredLink) {
      return res.status(404).json({ message: "Featured links not found" });
    }

    res.json(featuredLink.featuredLinks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve featured links" });
  }
};

exports.getAllFeaturedLinks = async (req, res) => {
  try {
    const featuredLinks = await FeaturedLink.find();
    res.json(featuredLinks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve featured links" });
  }
};

exports.filterbyDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Construct the date range query
    const dateQuery = {};
    if (startDate && endDate) {
      dateQuery.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    } else if (startDate) {
      dateQuery.date = {
        $gte: new Date(startDate),
      };
    } else if (endDate) {
      dateQuery.date = {
        $lte: new Date(endDate),
      };
    }

    // Fetch the featured links with the date filter applied
    const featuredLinks = await FeaturedLink.find(dateQuery);

    res.json(featuredLinks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve featured links" });
  }
};

exports.getFeaturedLinksByUserId = async (req, res) => {
  const { userId } = req.params;
  const { skip, limit } = getPagination(req.query);

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const featuredLinks = await FeaturedLink.find({ userId }, { __v: 0 })
      .sort("-date")
      .skip(skip)
      .limit(limit);

    const countTotal = await FeaturedLink.find(
      { userId },
      { _id: 0, __v: 0 }
    ).count();

    if (!featuredLinks || featuredLinks.length === 0) {
      return res.status(404).json({ message: "Featured links not found" });
    }

    // console.log("links length = ", featuredLinks.length);
    res.json({ featuredLinks, countTotal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve featured links" });
  }
};

exports.addFeaturedLinksManual = async (req, res) => {
  const { userId, featuredLinks } = req.body;

  const updatedLinks = featuredLinks.map((linkObj) => {
    return {
      ...linkObj,
      title: linkObj.title || "",
      date: linkObj.date || "",
      image: linkObj.image || "",
    };
  });

  try {
    if (!featuredLinks) {
      return res.status(400).json({ message: "Invalid featured links" });
    }

    const isValidObjectId = mongoose.Types.ObjectId.isValid(userId);
    if (!isValidObjectId) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    let featuredLink = await FeaturedLink.findById(userId);

    if (!featuredLink) {
      // Create a new document for the user if it does not exist
      featuredLink = new FeaturedLink({
        _id: userId,
        featuredLinks: updatedLinks,
      });
    } else {
      // Add the new set of featured links to the existing array
      featuredLink.featuredLinks.push(...updatedLinks);
    }

    await featuredLink.save();

    res.json(featuredLink.featuredLinks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update featured links" });
  }
};

exports.UpdateFeaturedLink = async (linkObj) => {
  try {
    const response = await axios.get(linkObj.link);
    const $ = cheerio.load(response.data);

    const updatedLink = {
      ...linkObj,
      title:
        $('meta[property="og:title"]').attr("content") || $("title").text(),
      date: $('meta[property="article:published_time"]').attr("content") || "",
      image:
        $('meta[property="og:image"]').attr("content") ||
        $('a[href="#"] img').attr("src") ||
        "",
    };

    return updatedLink;
  } catch (error) {
    console.error(error);
    return linkObj;
  }
};

exports.updateFeaturedLinks = async (req, res) => {
  const { userId, index, link } = req.body;

  try {
    const featuredLink = await FeaturedLink.findById(userId);
    if (!featuredLink) {
      return res.status(404).json({ message: "FeaturedLink not found" });
    }

    if (featuredLink.featuredLinks[index]) {
      featuredLink.featuredLinks[index].link =
        link || featuredLink.featuredLinks[index].link;

      const updatedLink = await exports.UpdateFeaturedLink(
        featuredLink.featuredLinks[index]
      );

      featuredLink.featuredLinks[index] = updatedLink;

      const updatedFeaturedLink = await featuredLink.save();
      res.json(updatedFeaturedLink.featuredLinks);
    } else {
      res.status(404).json({ message: "Featured link not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update featured link" });
  }
};

exports.removeFeaturedLink = async (req, res) => {
  const { Id } = req.body;

  try {
    const featuredLink = await FeaturedLink.findById(Id);
    if (!featuredLink) {
      return res.status(404).json({ message: "FeaturedLink not found" });
    }

    const response = await FeaturedLink.deleteOne({ _id: Id });
    // const featuredLink = await featuredLink.save();
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to remove featured link" });
  }
};

exports.fetchFeaturedLink = async (req, res) => {
  const { id, name, experience, btype, bdomain, foundername } = req.body;
  const userId = id;

  console.log("first time wala ran");
  console.log("res.fromRefreshAll = ", !res.fromRefreshAll);

  try {
    let searchQueries = [];
    const user = await User.findById(userId);

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "Business") {
      if (!name || !btype || !bdomain || bdomain.some((val) => !val.trim())) {
        console.log(
          "Name, business type, and non-empty array of business domains are required"
        );
        return res.status(400).json({
          message:
            "Name, business type, and non-empty array of business domains are required",
        });
      }

      // create multiple search queries with name and each bdomain element
      searchQueries.push(name);
      for (let i = 0; i < bdomain.length; i++) {
        const query = `${name} ${bdomain[i].trim()}`;
        searchQueries.push(query);
      }
      for (let j = 0; j < foundername.length; j++) {
        const query = `${name} ${foundername[j].trim()}`;
        searchQueries.push(query);
      }
    } else if (
      user.role === "Entrepreneur" ||
      user.role === "Content Creator"
    ) {
      if (experience && experience[0]?.comName) {
        // return res.status(400).json({
        //   message: "Name and experience with business name are required",
        // });
        const expName = experience[0].comName;

        // create a single search query with name and businessName
        const query1 = `${name} ${expName}`;
        searchQueries.push(query1);
      }

      const businessName = user.businessname;

      // create a single search query with name and businessName
      const query2 = `${name} ${businessName}`;
      searchQueries.push(query2);
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }

    console.log("searchQueries.. = ", searchQueries);
    const countryCode = "IN";
    let scrapedLinks = [];

    // perform a separate search for each query and combine the results
    for (let i = 0; i < searchQueries.length; i++) {
      const query = searchQueries[i];
      const response = await axios.get(
        `https://news.google.com/search?q=${query}&hl=en-${countryCode}&gl=${countryCode}&ceid=${countryCode}%3Aen`
      );
      const html = response.data;
      const $ = cheerio.load(html);

      $("article").each((index, element) => {
        const relativeLink = $(element).find("a").attr("href");
        const link = `https://news.google.com/${relativeLink}`;
        const title = $(element).find("h3").text().trim();
        const date = $(element).find("time").attr("datetime");
        const image = $(element).find("img").attr("src");
        const description =
          $('meta[property="og:description"]').attr("content") || "";

        let searchKey1, searchKey2;

        if (user.role === "Business") {
          if (
            !name ||
            !btype.trim() ||
            !bdomain ||
            bdomain.some((val) => !val.trim())
          ) {
            return res.status(400).json({
              message:
                "Name, business type, and non-empty array of business domains are required",
            });
          }
          searchKey1 = name.toLowerCase();
          searchKey2 = bdomain.map((val) => val.trim().toLowerCase());
        } else if (
          user.role === "Entrepreneur" ||
          user.role === "Content Creator"
        ) {
          // if (!name || !experience || !experience[0]?.comName) {
          //   return res.status(400).json({
          //     message: "Name and experience with business name are required",
          //   });
          // }
          const businessName = user.businessname;
          searchKey1 = name.toLowerCase();
          searchKey2 = businessName.toLowerCase();
        }

        const currentDate = new Date().toISOString().split("T")[0];

        // check if the article matches the search keys
        if (
          (searchKey1 &&
            (title.toLowerCase().includes(searchKey1) ||
              description.toLowerCase().includes(searchKey1))) ||
          (searchKey2 instanceof Array
            ? searchKey2.some(
                (val) =>
                  title.toLowerCase().includes(val) ||
                  description.toLowerCase().includes(val)
              )
            : title.toLowerCase().includes(searchKey2) ||
              description.toLowerCase().includes(searchKey2)) ||
          title.toLowerCase().includes("startup") ||
          title.toLowerCase().includes("business") ||
          title.toLowerCase().includes("new startup") ||
          title.toLowerCase().includes("new business")
        ) {
          // Article matches the search keys and additional conditions
          scrapedLinks.push({
            userId: id,
            link,
            title,
            date,
            image,
            description,
          });
        }
      });
    }
    if (scrapedLinks.length === 0) {
      return res.status(400).json({ message: "No links found" });
    }
    console.log("scrapedLinks length = ", scrapedLinks.length);

    // Declare a new array
    let newArray = [];

    // Declare an empty object
    let uniqueObject = {};

    // Loop for the array elements
    for (let i in scrapedLinks) {
      // Extract the title
      objLink = scrapedLinks[i]["link"];

      // Use the title as the index
      uniqueObject[objLink] = scrapedLinks[i];
    }

    // Loop to push unique object into array
    for (i in uniqueObject) {
      newArray.push(uniqueObject[i]);
    }

    console.log("unique Links = ", newArray.length);

    if (!res.fromRefreshAll) {
      FeaturedLink.insertMany(newArray)
        .then(function () {
          console.log("scraped links inserted in db from fetchFirst"); // Success
        })
        .catch(function (error) {
          console.log(error); // Failure
        });
      const featuredLink = await FeaturedLink.findById(userId);
    }

    res.status(200).json({
      message: "Featured links scraped successfully",
      featuredLinks: newArray,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.fetchFeaturedLinkcurrent = async (req, res) => {
  const { id, name, experience, btype, bdomain, foundername } = req.body;
  const userId = id;

  console.log("currrent wala ran ...");

  try {
    let searchQueries = [];
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "Business") {
      if (!name || !btype || !bdomain || bdomain.some((val) => !val.trim())) {
        return res.status(400).json({
          message:
            "Name, business type, and non-empty array of business domains are required",
        });
      }

      // create multiple search queries with name and each bdomain element
      searchQueries.push(name);
      for (let i = 0; i < bdomain.length; i++) {
        const query = `${name} ${bdomain[i].trim()}`;
        searchQueries.push(query);
      }
      for (let j = 0; j < foundername.length; j++) {
        const query = `${name} ${foundername[j].trim()}`;
        searchQueries.push(query);
      }
    } else if (
      user.role === "Entrepreneur" ||
      user.role === "Content Creator"
    ) {
      if (experience && experience[0]?.comName) {
        // return res.status(400).json({
        //   message: "Name and experience with business name are required",
        // });
        const expName = experience[0].comName;

        // create a single search query with name and businessName
        const query1 = `${name} ${expName}`;
        searchQueries.push(query1);
      }

      const businessName = user.businessname;

      // create a single search query with name and businessName
      const query2 = `${name} ${businessName}`;
      searchQueries.push(query2);
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }

    console.log(searchQueries);
    const countryCode = "IN";
    let scrapedLinks = [];

    // perform a separate search for each query and combine the results
    for (let i = 0; i < searchQueries.length; i++) {
      const query = searchQueries[i];
      const response = await axios.get(
        `https://news.google.com/search?q=${query}&hl=en-${countryCode}&gl=${countryCode}&ceid=${countryCode}%3Aen`
      );
      const html = response.data;
      const $ = cheerio.load(html);

      $("article").each((index, element) => {
        const relativeLink = $(element).find("a").attr("href");
        const link = `https://news.google.com/${relativeLink}`;
        const title = $(element).find("h3").text().trim();
        const date = $(element).find("time").attr("datetime");
        const image = $(element).find("img").attr("src");
        const description =
          $('meta[property="og:description"]').attr("content") || "";

        let searchKey1, searchKey2;

        if (user.role === "Business") {
          if (
            !name ||
            !btype.trim() ||
            !bdomain ||
            bdomain.some((val) => !val.trim())
          ) {
            return res.status(400).json({
              message:
                "Name, business type, and non-empty array of business domains are required",
            });
          }
          searchKey1 = name.toLowerCase();
          searchKey2 = bdomain.map((val) => val.trim().toLowerCase());
        } else if (
          user.role === "Entrepreneur" ||
          user.role === "Content Creator"
        ) {
          // if (!name || !experience || !experience[0]?.comName) {
          //   return res.status(400).json({
          //     message: "Name and experience with business name are required",
          //   });
          // }
          const businessName = user.businessname;
          searchKey1 = name.toLowerCase();
          searchKey2 = businessName.toLowerCase();
        }

        const currentDate = new Date().toISOString().split("T")[0];

        // check if the article matches the search keys and is from the current date
        if (
          (searchKey1 &&
            (title.toLowerCase().includes(searchKey1) ||
              description.toLowerCase().includes(searchKey1))) ||
          (searchKey2 instanceof Array
            ? searchKey2.some(
                (val) =>
                  title.toLowerCase().includes(val) ||
                  description.toLowerCase().includes(val)
              )
            : title.toLowerCase().includes(searchKey2) ||
              description.toLowerCase().includes(searchKey2)) ||
          title.toLowerCase().includes("startup") ||
          title.toLowerCase().includes("business") ||
          title.toLowerCase().includes("new startup") ||
          title.toLowerCase().includes("new business")
        ) {
          // check if the article is from the current date
          if (date && date.split("T")[0] === currentDate) {
            // Article matches the search keys, is from the current date, and additional conditions
            scrapedLinks.push({
              userId: id,
              link,
              title,
              date,
              image,
              description,
            });
          }
        }
      });
    }

    if (scrapedLinks.length === 0) {
      return res.status(400).json({
        message: "No links found",
      });
    }

    // Declare a new array
    let newArray = [];

    // Declare an empty object
    let uniqueObject = {};

    // Loop for the array elements
    for (let i in scrapedLinks) {
      // Extract the title
      objLink = scrapedLinks[i]["link"];

      // Use the title as the index
      uniqueObject[objLink] = scrapedLinks[i];
    }

    // Loop to push unique object into array
    for (i in uniqueObject) {
      newArray.push(uniqueObject[i]);
    }

    console.log("unique Links = ", newArray.length);

    // const featuredLink = await FeaturedLink.findById(userId);

    // if (!featuredLink) {
    //   // create a new document for the user if it does not exist
    //   const newFeaturedLink = new FeaturedLink({
    //     _id: userId,
    //     featuredLinks: scrapedLinks,
    //   });
    //   await newFeaturedLink.save();
    //   return res.json(newFeaturedLink.featuredLinks);
    // }

    res.status(200).json({
      message: "Featured links updated successfully",
      featuredLinks: newArray,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.refreshAllFeaturedLinks = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "Admin" } }); // Find all FeaturedLink documents
    console.log(`Found ${users.length} users`);

    let updatedUsers = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      console.log(`Processing user ${user._id}...`);
      console.log(`User ID: ${user._id}`);
      console.log(`User name: ${user.name}`);

      const { id, name, experience, btype, bdomain, foundername } = user;
      const reqBody = { id, name, experience, btype, bdomain, foundername };
      const req = { body: reqBody };
      const response = {
        fromRefreshAll: true,
        status: function (status) {
          this.statusCode = status;
          return this;
        },
        json: function (data) {
          this.body = data;
          return this;
        },
      };

      const usersFeaturedLinks = await FeaturedLink.find({ userId: user._id });
      // console.log("usersFeaturedLinks = ", usersFeaturedLinks);
      if (usersFeaturedLinks.length === 0) {
        await exports.fetchFeaturedLink(req, response);
      } else {
        await exports.fetchFeaturedLinkcurrent(req, response);
      }

      if (response.statusCode === 200) {
        const updatedFeaturedLinks = response.body.featuredLinks;

        // Save the updated featuredLinks for the user
        FeaturedLink.insertMany(updatedFeaturedLinks)
          .then(function () {
            console.log("scraped links inserted in db from refreshAll"); // Success
          })
          .catch(function (error) {
            console.log(error); // Failure
          });

        updatedUsers.push({
          _id: user.userId,
          featuredLink: updatedFeaturedLinks,
        });
      } else {
        console.log(
          "response.statuscode = ",
          response.statusCode,
          " response.body = ",
          response.body
        );
      }
    }

    res.status(200).json({
      message: "All featured links updated successfully",
      updatedUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

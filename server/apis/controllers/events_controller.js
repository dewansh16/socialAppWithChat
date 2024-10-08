const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const moment = require("moment");
const Event = require("../models/Events.js");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.js");

// exports.eventEventyco = async (req, res) => {
//   const url = "https://www.eventyco.com/events/conferences";

//   try {
//     const response = await axios.get(url);
//     const html = response.data;
//     const $ = cheerio.load(html);

//     const events = [];

//     $(".card").each((index, element) => {
//       const title = $(element).find(".card-title").text().trim();
//       const dateAndTime = $(element)
//         .find(".card-body div:first-child")
//         .text()
//         .trim();
//       const link =
//         "https://www.eventyco.com" +
//         $(element).find(".card-title a").attr("href");
//       const imageSrc = $(element).find(".card-img-top").attr("src");

//       const [startDateStr, endDateStr] = dateAndTime.split(" - ");
//       const startDate = moment(startDateStr, "MMM DD, YYYY").toISOString();
//       const endDate = moment(endDateStr, "MMM DD, YYYY").toISOString();
//       const eventId = uuidv4();

//       const event = {
//         eventId: eventId,
//         title: title,
//         startDate: startDate,
//         endDate: endDate,
//         link: link,
//         imageSrc: imageSrc,
//       };

//       events.push(event);
//     });

//     const existingTitles = await Event.distinct("title");
//     const newEvents = events.filter(
//       (event) => !existingTitles.includes(event.title)
//     );

//     if (newEvents.length === 0) {
//       return res.json({ message: "No new events found." });
//     }

//     const savedEvents = await Event.insertMany(newEvents);
//     res.json(savedEvents);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.increaseInterestedCount = async (req, res) => {
  const { eventId } = req.params;
  const { userId } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { interestedEvents: eventId } },
      { new: true }
    );

    const event = await Event.findByIdAndUpdate(
      eventId,
      { $addToSet: { interestedPeople: userId } },
      { new: true }
    );
    const interestedPeopleCount = event.interestedPeople.length;
    res.json({ event, interestedPeopleCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.decreaseInterestedCount = async (req, res) => {
  const { eventId } = req.params;
  const { userId } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { interestedEvents: eventId } },
      { new: true }
    );

    const event = await Event.findByIdAndUpdate(
      eventId,
      { $pull: { interestedPeople: userId } },
      { new: true }
    );

    const interestedPeopleCount = event.interestedPeople.length;
    res.json({ event, interestedPeopleCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.interestedPeopleCount = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const interestedPeopleCount = event.interestedPeople.length;

    res.json({ interestedPeopleCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.topEvents = async (req, res) => {
  try {
    const events = await Event.aggregate([
      {
        $project: {
          _id: 1,
          eventId: 1,
          title: 1,
          startDate: 1,
          endDate: 1,
          link: 1,
          imageSrc: 1,
          interestedPeople: 1,
          interestedPeopleCount: { $size: "$interestedPeople" },
        },
      },
      {
        $sort: { interestedPeopleCount: -1 },
      },
      {
        $lookup: {
          from: "users",
          localField: "interestedPeople",
          foreignField: "_id",
          as: "interestedPeople",
        },
      },
    ]);

    res.json({ events });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sortByStartDate = async (req, res) => {
  try {
    const events = await Event.aggregate([
      {
        $project: {
          _id: 1,
          eventId: 1,
          title: 1,
          startDate: 1,
          endDate: 1,
          link: 1,
          imageSrc: 1,
          interestedPeople: 1,
        },
      },
      {
        $sort: { startDate: 1 },
      },
      {
        $lookup: {
          from: "users",
          localField: "interestedPeople",
          foreignField: "_id",
          as: "interestedPeople",
        },
      },
    ]);

    res.json({ events });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("interestedPeople");
    res.json({ events });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const defaultImageSrc =
  "https://www.financialexpress.com/wp-content/themes/ie-network-theme/assets/src/img/logo/financialexpress.svg";

// exports.financialEvents = async (req, res) => {
//   const url = "https://www.financialexpress.com/events/health/all";

//   try {
//     const response = await axios.get(url);
//     const html = response.data;
//     const $ = cheerio.load(html);

//     const events = [];

//     $(".event-card").each(async (index, element) => {
//       const title = $(element)
//         .find('.event-info .event-title span[itemprop="name"]')
//         .text()
//         .trim();
//       const dateAndTime = $(element)
//         .find(".event-info .event-date-info")
//         .text()
//         .trim();
//       const link = $(element)
//         .find('.event-info .event-title a[itemprop="url"]')
//         .attr("href");
//       const imageSrc = $(element)
//         .find('.event-info .event-thumbnail img[itemprop="image"]')
//         .attr("src");

//       const [startDateStr, endDateStr] = dateAndTime.split(" - ");
//       const startDate = moment(startDateStr, "MMM DD, YYYY").toISOString();
//       const endDate = moment(endDateStr, "MMM DD, YYYY").toISOString();
//       const eventId = uuidv4();

//       const event = {
//         eventId: eventId,
//         title: title,
//         startDate: startDate,
//         endDate: endDate,
//         link: link,
//         imageSrc: imageSrc || defaultImageSrc,
//       };

//       events.push(event);
//     });

//     const existingTitles = await Event.distinct("title");
//     const newEvents = events.filter(
//       (event) => !existingTitles.includes(event.title)
//     );

//     if (newEvents.length === 0) {
//       return res.json({ message: "No new events found." });
//     }

//     const savedEvents = await Event.insertMany(newEvents);
//     res.json(savedEvents); // Return saved events as JSON response
//   } catch (error) {
//     res.status(500).json({ error: error.message }); // Return error as JSON response
//   }
// };

exports.financialTechnologyEvents = async (req, res) => {
  const baseUrl =
    "https://www.eventbrite.com/d/india/financial-technology/?page=";
  const totalPages = 15;
  const events = [];
  const existingTitles = await Event.distinct("title");

  try {
    for (let page = 1; page <= totalPages; page++) {
      const url = baseUrl + page;
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);

      $(".event-card-details").each((index, element) => {
        const title = $(element).find("h2").text().trim();
        const date = $(element).find("p:nth-child(2)").text().trim();
        const imageUrl = $(element)
          .prev()
          .find(".event-card-image")
          .attr("src");
        const eventLink = $(element).prev().find("a").attr("href");

        // Only proceed if all necessary information is present and event is not a duplicate
        if (
          title &&
          date &&
          imageUrl &&
          eventLink &&
          !existingTitles.includes(title)
        ) {
          const event = {
            eventId: uuidv4(),
            title: title,
            startDate: date,
            endDate: date,
            link: eventLink,
            imageSrc: imageUrl,
            tags: ["Financial Technology"],
            interestedPeople: [],
          };

          events.push(event);
          existingTitles.push(title); // Add the title to the existing titles array to prevent duplicates
        }
      });
    }

    if (events.length === 0) {
      return res.json({ message: "No new events found." });
    }

    const savedEvents = await Event.insertMany(events);
    res.json(savedEvents); // Return saved events as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
};

exports.vesrtualReakity = async (req, res) => {
  const url = "https://www.eventbrite.com/d/india/virtual-reality/?page=1";

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const events = [];
    const existingTitles = await Event.distinct("title");

    $(".event-card-details").each((index, element) => {
      const title = $(element).find("h2").text().trim();
      const date = $(element).find("p:nth-child(2)").text().trim();
      const imageUrl = $(element).prev().find(".event-card-image").attr("src");
      const eventLink = $(element).prev().find("a").attr("href");

      // Only proceed if all necessary information is present and event is not a duplicate
      if (
        title &&
        date &&
        imageUrl &&
        eventLink &&
        !existingTitles.includes(title)
      ) {
        const event = {
          eventId: uuidv4(),
          title: title,
          startDate: date,
          endDate: date,
          link: eventLink,
          imageSrc: imageUrl,
          tags: ["Virtual Reality"],
          interestedPeople: [],
        };

        events.push(event);
        existingTitles.push(title); // Add the title to the existing titles array to prevent duplicates
      }
    });

    if (events.length === 0) {
      return res.json({ message: "No new events found." });
    }

    const savedEvents = await Event.insertMany(events);
    res.json(savedEvents); // Return saved events as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
};
exports.gamingEvents = async (req, res) => {
  const url = "https://www.eventbrite.com/d/india/gaming/?page=1";

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const events = [];
    const existingTitles = await Event.distinct("title");

    $(".event-card-details").each((index, element) => {
      const title = $(element).find("h2").text().trim();
      const date = $(element).find("p:nth-child(2)").text().trim();
      const imageUrl = $(element).prev().find(".event-card-image").attr("src");
      const eventLink = $(element).prev().find("a").attr("href");

      // Only proceed if all necessary information is present and event is not a duplicate
      if (
        title &&
        date &&
        imageUrl &&
        eventLink &&
        !existingTitles.includes(title)
      ) {
        const event = {
          eventId: uuidv4(),
          title: title,
          startDate: date,
          endDate: date,
          link: eventLink,
          imageSrc: imageUrl,
          tags: ["Gaming"],
          interestedPeople: [],
        };

        events.push(event);
        existingTitles.push(title); // Add the title to the existing titles array to prevent duplicates
      }
    });

    if (events.length === 0) {
      return res.json({ message: "No new events found." });
    }

    const savedEvents = await Event.insertMany(events);
    res.json(savedEvents); // Return saved events as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
};
exports.agriculterEvents = async (req, res) => {
  const url = "https://www.eventbrite.com/d/india/agriculture/?page=1";

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const events = [];
    const existingTitles = await Event.distinct("title");

    $(".event-card-details").each((index, element) => {
      const title = $(element).find("h2").text().trim();
      const date = $(element).find("p:nth-child(2)").text().trim();
      const imageUrl = $(element).prev().find(".event-card-image").attr("src");
      const eventLink = $(element).prev().find("a").attr("href");

      // Only proceed if all necessary information is present and event is not a duplicate
      if (
        title &&
        date &&
        imageUrl &&
        eventLink &&
        !existingTitles.includes(title)
      ) {
        const event = {
          eventId: uuidv4(),
          title: title,
          startDate: date,
          endDate: date,
          link: eventLink,
          imageSrc: imageUrl,
          tags: ["Agriculture"],
          interestedPeople: [],
        };

        events.push(event);
        existingTitles.push(title); // Add the title to the existing titles array to prevent duplicates
      }
    });

    if (events.length === 0) {
      return res.json({ message: "No new events found." });
    }

    const savedEvents = await Event.insertMany(events);
    res.json(savedEvents); // Return saved events as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
};
exports.blockChain = async (req, res) => {
  const url =
    "https://www.eventbrite.com/d/india/blockchain-technology/?page=1";

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const events = [];
    const existingTitles = await Event.distinct("title");

    $(".event-card-details").each((index, element) => {
      const title = $(element).find("h2").text().trim();
      const date = $(element).find("p:nth-child(2)").text().trim();
      const imageUrl = $(element).prev().find(".event-card-image").attr("src");
      const eventLink = $(element).prev().find("a").attr("href");

      // Only proceed if all necessary information is present and event is not a duplicate
      if (
        title &&
        date &&
        imageUrl &&
        eventLink &&
        !existingTitles.includes(title)
      ) {
        const event = {
          eventId: uuidv4(),
          title: title,
          startDate: date,
          endDate: date,
          link: eventLink,
          imageSrc: imageUrl,
          tags: ["Blockchain Technology"],
          interestedPeople: [],
        };

        events.push(event);
        existingTitles.push(title); // Add the title to the existing titles array to prevent duplicates
      }
    });

    if (events.length === 0) {
      return res.json({ message: "No new events found." });
    }

    const savedEvents = await Event.insertMany(events);
    res.json(savedEvents); // Return saved events as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
};

exports.technologyEvents = async (req, res) => {
  const baseUrl = "https://www.eventbrite.com/d/india/technology/?page=";
  const totalPages = 11;

  try {
    const events = [];
    const existingTitles = await Event.distinct("title");

    for (let page = 1; page <= totalPages; page++) {
      const url = baseUrl + page;
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);

      $(".event-card-details").each((index, element) => {
        const title = $(element).find("h2").text().trim();
        const date = $(element).find("p:nth-child(2)").text().trim();
        const imageUrl = $(element)
          .prev()
          .find(".event-card-image")
          .attr("src");
        const eventLink = $(element).prev().find("a").attr("href");

        // Only proceed if all necessary information is present and event is not a duplicate
        if (
          title &&
          date &&
          imageUrl &&
          eventLink &&
          !existingTitles.includes(title)
        ) {
          const event = {
            eventId: uuidv4(),
            title: title,
            startDate: date,
            endDate: date,
            link: eventLink,
            imageSrc: imageUrl,
            tags: ["Technology"],
            interestedPeople: [],
          };

          events.push(event);
          existingTitles.push(title); // Add the title to the existing titles array to prevent duplicates
        }
      });
    }

    if (events.length === 0) {
      return res.json({ message: "No new events found." });
    }

    const savedEvents = await Event.insertMany(events);
    res.json(savedEvents); // Return saved events as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
};

const scrapeEvents = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://10times.com/india/technology/conferences");

  let previousHeight = await page.evaluate("document.body.scrollHeight");

  while (true) {
    await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
    await page.waitForTimeout(2000); // Wait for the content to load, adjust the time as needed

    const newHeight = await page.evaluate("document.body.scrollHeight");

    if (newHeight === previousHeight) {
      break;
    }

    previousHeight = newHeight;
  }

  // Fetch the data from the scrolled page
  const events = await page.$$eval("tr.event-card", (elements) => {
    return elements.map((element) => {
      const title = element
        .querySelector(".col-12.text-break.show-related h2 a")
        .textContent.trim();
      const dateAndTime = element
        .querySelector(
          '.col-12.text-dark .small.fw-500[data-date-format="default"]'
        )
        .textContent.trim();
      const link = element
        .querySelector(".col-12.text-break.show-related h2 a")
        .getAttribute("href");

      return {
        title,
        dateAndTime,
        link,
      };
    });
  });

  await browser.close();

  try {
    const eventsToSave = [];
    const existingTitles = await Event.distinct("title");

    for (const event of events) {
      const { title, dateAndTime, link } = event;

      // Only proceed if all necessary information is present and event is not a duplicate
      if (title && dateAndTime && link && !existingTitles.includes(title)) {
        const eventToSave = {
          eventId: uuidv4(),
          title: title,
          startDate: dateAndTime,
          endDate: dateAndTime,
          link: link,
          imageSrc:
            "https://www.financialexpress.com/wp-content/themes/ie-network-theme/assets/src/img/logo/financialexpress.svg",
          tags: ["Technology"],
          interestedPeople: [],
        };

        eventsToSave.push(eventToSave);
        existingTitles.push(title);
      }
    }

    if (eventsToSave.length === 0) {
      return { message: "No new events found." };
    }

    const savedEvents = await Event.insertMany(eventsToSave);
    return savedEvents;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.technology10timesEvents = async (req, res) => {
  try {
    const savedEvents = await scrapeEvents();
    res.json(savedEvents); // Return saved events as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
};

const scrapestartupEvents = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://10times.com/india/startups/conferences");

  let previousHeight = await page.evaluate("document.body.scrollHeight");

  while (true) {
    await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
    await page.waitForTimeout(2000); // Wait for the content to load, adjust the time as needed

    const newHeight = await page.evaluate("document.body.scrollHeight");

    if (newHeight === previousHeight) {
      break;
    }

    previousHeight = newHeight;
  }

  // Fetch the data from the scrolled page
  const events = await page.$$eval("tr.event-card", (elements) => {
    return elements.map((element) => {
      const title = element
        .querySelector(".col-12.text-break.show-related h2 a")
        .textContent.trim();
      const dateAndTime = element
        .querySelector(
          '.col-12.text-dark .small.fw-500[data-date-format="default"]'
        )
        .textContent.trim();
      const link = element
        .querySelector(".col-12.text-break.show-related h2 a")
        .getAttribute("href");

      return {
        title,
        dateAndTime,
        link,
      };
    });
  });

  await browser.close();

  try {
    const eventsToSave = [];
    const existingTitles = await Event.distinct("title");

    for (const event of events) {
      const { title, dateAndTime, link } = event;

      // Only proceed if all necessary information is present and event is not a duplicate
      if (title && dateAndTime && link && !existingTitles.includes(title)) {
        const eventToSave = {
          eventId: uuidv4(),
          title: title,
          startDate: dateAndTime,
          endDate: dateAndTime,
          link: link,
          imageSrc:
            "https://www.financialexpress.com/wp-content/themes/ie-network-theme/assets/src/img/logo/financialexpress.svg",
          tags: ["Startup"],
          interestedPeople: [],
        };

        eventsToSave.push(eventToSave);
        existingTitles.push(title);
      }
    }

    if (eventsToSave.length === 0) {
      return { message: "No new events found." };
    }

    const savedEvents = await Event.insertMany(eventsToSave);
    return savedEvents;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.startup10timesEvents = async (req, res) => {
  try {
    const savedEvents = await scrapestartupEvents();
    res.json(savedEvents); // Return saved events as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
};

exports.foodandBeverage = async (req, res) => {
  const url = "https://www.eventbrite.com/d/india/food-and-beverage/?page=1";

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const events = [];
    const existingTitles = await Event.distinct("title");

    $(".event-card-details").each((index, element) => {
      const title = $(element).find("h2").text().trim();
      const date = $(element).find("p:nth-child(2)").text().trim();
      const imageUrl = $(element).prev().find(".event-card-image").attr("src");
      const eventLink = $(element).prev().find("a").attr("href");

      // Only proceed if all necessary information is present and event is not a duplicate
      if (
        title &&
        date &&
        imageUrl &&
        eventLink &&
        !existingTitles.includes(title)
      ) {
        const event = {
          eventId: uuidv4(),
          title: title,
          startDate: date,
          endDate: date,
          link: eventLink,
          imageSrc: imageUrl,
          tags: ["Food and Beverage"],
          interestedPeople: [],
        };

        events.push(event);
        existingTitles.push(title); // Add the title to the existing titles array to prevent duplicates
      }
    });

    if (events.length === 0) {
      return res.json({ message: "No new events found." });
    }

    const savedEvents = await Event.insertMany(events);
    res.json(savedEvents); // Return saved events as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
};
exports.iotEvents = async (req, res) => {
  const url = "https://www.eventbrite.com/d/india/internet-of-things/?page=1";

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const events = [];
    const existingTitles = await Event.distinct("title");

    $(".event-card-details").each((index, element) => {
      const title = $(element).find("h2").text().trim();
      const date = $(element).find("p:nth-child(2)").text().trim();
      const imageUrl = $(element).prev().find(".event-card-image").attr("src");
      const eventLink = $(element).prev().find("a").attr("href");

      // Only proceed if all necessary information is present and event is not a duplicate
      if (
        title &&
        date &&
        imageUrl &&
        eventLink &&
        !existingTitles.includes(title)
      ) {
        const event = {
          eventId: uuidv4(),
          title: title,
          startDate: date,
          endDate: date,
          link: eventLink,
          imageSrc: imageUrl,
          tags: ["Internet of Things (IoT)"],
          interestedPeople: [],
        };

        events.push(event);
        existingTitles.push(title); // Add the title to the existing titles array to prevent duplicates
      }
    });

    if (events.length === 0) {
      return res.json({ message: "No new events found." });
    }

    const savedEvents = await Event.insertMany(events);
    res.json(savedEvents); // Return saved events as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
};
exports.luxuryandGoods = async (req, res) => {
  const url = "https://www.eventbrite.com/d/india/luxury-goods/?page=1";

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const events = [];
    const existingTitles = await Event.distinct("title");

    $(".event-card-details").each((index, element) => {
      const title = $(element).find("h2").text().trim();
      const date = $(element).find("p:nth-child(2)").text().trim();
      const imageUrl = $(element).prev().find(".event-card-image").attr("src");
      const eventLink = $(element).prev().find("a").attr("href");

      // Only proceed if all necessary information is present and event is not a duplicate
      if (
        title &&
        date &&
        imageUrl &&
        eventLink &&
        !existingTitles.includes(title)
      ) {
        const event = {
          eventId: uuidv4(),
          title: title,
          startDate: date,
          endDate: date,
          link: eventLink,
          imageSrc: imageUrl,
          tags: ["Luxury Goods"],
          interestedPeople: [],
        };

        events.push(event);
        existingTitles.push(title); // Add the title to the existing titles array to prevent duplicates
      }
    });

    if (events.length === 0) {
      return res.json({ message: "No new events found." });
    }

    const savedEvents = await Event.insertMany(events);
    res.json(savedEvents); // Return saved events as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
};
exports.realEstate = async (req, res) => {
  const url = "https://www.eventbrite.com/d/india/real-estate/?page=1";

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const events = [];
    const existingTitles = await Event.distinct("title");

    $(".event-card-details").each((index, element) => {
      const title = $(element).find("h2").text().trim();
      const date = $(element).find("p:nth-child(2)").text().trim();
      const imageUrl = $(element).prev().find(".event-card-image").attr("src");
      const eventLink = $(element).prev().find("a").attr("href");

      // Only proceed if all necessary information is present and event is not a duplicate
      if (
        title &&
        date &&
        imageUrl &&
        eventLink &&
        !existingTitles.includes(title)
      ) {
        const event = {
          eventId: uuidv4(),
          title: title,
          startDate: date,
          endDate: date,
          link: eventLink,
          imageSrc: imageUrl,
          tags: ["Real Estate"],
          interestedPeople: [],
        };

        events.push(event);
        existingTitles.push(title); // Add the title to the existing titles array to prevent duplicates
      }
    });

    if (events.length === 0) {
      return res.json({ message: "No new events found." });
    }

    const savedEvents = await Event.insertMany(events);
    res.json(savedEvents); // Return saved events as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
};
exports.energyEvents = async (req, res) => {
  const url =
    "https://www.eventbrite.com/d/india/energy-and-technology/?page=1";

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const events = [];
    const existingTitles = await Event.distinct("title");

    $(".event-card-details").each((index, element) => {
      const title = $(element).find("h2").text().trim();
      const date = $(element).find("p:nth-child(2)").text().trim();
      const imageUrl = $(element).prev().find(".event-card-image").attr("src");
      const eventLink = $(element).prev().find("a").attr("href");

      // Only proceed if all necessary information is present and event is not a duplicate
      if (
        title &&
        date &&
        imageUrl &&
        eventLink &&
        !existingTitles.includes(title)
      ) {
        const event = {
          eventId: uuidv4(),
          title: title,
          startDate: date,
          endDate: date,
          link: eventLink,
          imageSrc: imageUrl,
          tags: ["Energy"],
          interestedPeople: [],
        };

        events.push(event);
        existingTitles.push(title); // Add the title to the existing titles array to prevent duplicates
      }
    });

    if (events.length === 0) {
      return res.json({ message: "No new events found." });
    }

    const savedEvents = await Event.insertMany(events);
    res.json(savedEvents); // Return saved events as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
};
exports.interiorDesign = async (req, res) => {
  const url = "https://www.eventbrite.com/d/india/interior-design/?page=1";

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const events = [];
    const existingTitles = await Event.distinct("title");

    $(".event-card-details").each((index, element) => {
      const title = $(element).find("h2").text().trim();
      const date = $(element).find("p:nth-child(2)").text().trim();
      const imageUrl = $(element).prev().find(".event-card-image").attr("src");
      const eventLink = $(element).prev().find("a").attr("href");

      // Only proceed if all necessary information is present and event is not a duplicate
      if (
        title &&
        date &&
        imageUrl &&
        eventLink &&
        !existingTitles.includes(title)
      ) {
        const event = {
          eventId: uuidv4(),
          title: title,
          startDate: date,
          endDate: date,
          link: eventLink,
          imageSrc: imageUrl,
          tags: ["Interior Design"],
          interestedPeople: [],
        };

        events.push(event);
        existingTitles.push(title); // Add the title to the existing titles array to prevent duplicates
      }
    });

    if (events.length === 0) {
      return res.json({ message: "No new events found." });
    }

    const savedEvents = await Event.insertMany(events);
    res.json(savedEvents); // Return saved events as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
};
exports.educationEvents = async (req, res) => {
  const url = "https://www.eventbrite.com/d/india/education/?page=1";

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const events = [];
    const existingTitles = await Event.distinct("title");

    $(".event-card-details").each((index, element) => {
      const title = $(element).find("h2").text().trim();
      const date = $(element).find("p:nth-child(2)").text().trim();
      const imageUrl = $(element).prev().find(".event-card-image").attr("src");
      const eventLink = $(element).prev().find("a").attr("href");

      // Only proceed if all necessary information is present and event is not a duplicate
      if (
        title &&
        date &&
        imageUrl &&
        eventLink &&
        !existingTitles.includes(title)
      ) {
        const event = {
          eventId: uuidv4(),
          title: title,
          startDate: date,
          endDate: date,
          link: eventLink,
          imageSrc: imageUrl,
          tags: ["Education"],
          interestedPeople: [],
        };

        events.push(event);
        existingTitles.push(title); // Add the title to the existing titles array to prevent duplicates
      }
    });

    if (events.length === 0) {
      return res.json({ message: "No new events found." });
    }

    const savedEvents = await Event.insertMany(events);
    res.json(savedEvents); // Return saved events as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
};
exports.healthcareEvents = async (req, res) => {
  const url = "https://www.eventbrite.com/d/india/healthcare/?page=1";

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const events = [];
    const existingTitles = await Event.distinct("title");

    $(".event-card-details").each((index, element) => {
      const title = $(element).find("h2").text().trim();
      const date = $(element).find("p:nth-child(2)").text().trim();
      const imageUrl = $(element).prev().find(".event-card-image").attr("src");
      const eventLink = $(element).prev().find("a").attr("href");

      // Only proceed if all necessary information is present and event is not a duplicate
      if (
        title &&
        date &&
        imageUrl &&
        eventLink &&
        !existingTitles.includes(title)
      ) {
        const event = {
          eventId: uuidv4(),
          title: title,
          startDate: date,
          endDate: date,
          link: eventLink,
          imageSrc: imageUrl,
          tags: ["Healthcare"],
          interestedPeople: [],
        };

        events.push(event);
        existingTitles.push(title); // Add the title to the existing titles array to prevent duplicates
      }
    });

    if (events.length === 0) {
      return res.json({ message: "No new events found." });
    }

    const savedEvents = await Event.insertMany(events);
    res.json(savedEvents); // Return saved events as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
};
exports.eCommerceEvents = async (req, res) => {
  const url = "https://www.eventbrite.com/d/india/e-commerce-platforms/?page=1";

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const events = [];
    const existingTitles = await Event.distinct("title");

    $(".event-card-details").each((index, element) => {
      const title = $(element).find("h2").text().trim();
      const date = $(element).find("p:nth-child(2)").text().trim();
      const imageUrl = $(element).prev().find(".event-card-image").attr("src");
      const eventLink = $(element).prev().find("a").attr("href");

      // Only proceed if all necessary information is present and event is not a duplicate
      if (
        title &&
        date &&
        imageUrl &&
        eventLink &&
        !existingTitles.includes(title)
      ) {
        const event = {
          eventId: uuidv4(),
          title: title,
          startDate: date,
          endDate: date,
          link: eventLink,
          imageSrc: imageUrl,
          tags: ["E-commerce Platforms"],
          interestedPeople: [],
        };

        events.push(event);
        existingTitles.push(title); // Add the title to the existing titles array to prevent duplicates
      }
    });

    if (events.length === 0) {
      return res.json({ message: "No new events found." });
    }

    const savedEvents = await Event.insertMany(events);
    res.json(savedEvents); // Return saved events as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
};
// exports.environmentalEvents = async (req, res) => {
//   const url = "https://www.eventbrite.com/d/india/environmental/?page=1";

//   try {
//     const response = await axios.get(url);
//     const html = response.data;
//     const $ = cheerio.load(html);

//     const events = [];
//     const existingTitles = await Event.distinct("title");

//     $(".event-card-details").each((index, element) => {
//       const title = $(element).find("h2").text().trim();
//       const date = $(element).find("p:nth-child(2)").text().trim();
//       const imageUrl = $(element).prev().find(".event-card-image").attr("src");
//       const eventLink = $(element).prev().find("a").attr("href");

//       // Only proceed if all necessary information is present and event is not a duplicate
//       if (
//         title &&
//         date &&
//         imageUrl &&
//         eventLink &&
//         !existingTitles.includes(title)
//       ) {
//         const event = {
//           eventId: uuidv4(),
//           title: title,
//           startDate: date,
//           endDate: date,
//           link: eventLink,
//           imageSrc: imageUrl,
//           tags: ["Environmental"],
//           interestedPeople: [],
//         };

//         events.push(event);
//         existingTitles.push(title); // Add the title to the existing titles array to prevent duplicates
//       }
//     });

//     if (events.length === 0) {
//       return res.json({ message: "No new events found." });
//     }

//     const savedEvents = await Event.insertMany(events);
//     res.json(savedEvents); // Return saved events as JSON response
//   } catch (error) {
//     res.status(500).json({ error: error.message }); // Return error as JSON response
//   }
// };
exports.wrb3oEvents = async (req, res) => {
  const url = "https://www.eventbrite.com/d/india/web-3o/?page=1";

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const events = [];
    const existingTitles = await Event.distinct("title");

    $(".event-card-details").each((index, element) => {
      const title = $(element).find("h2").text().trim();
      const date = $(element).find("p:nth-child(2)").text().trim();
      const imageUrl = $(element).prev().find(".event-card-image").attr("src");
      const eventLink = $(element).prev().find("a").attr("href");

      // Only proceed if all necessary information is present and event is not a duplicate
      if (
        title &&
        date &&
        imageUrl &&
        eventLink &&
        !existingTitles.includes(title)
      ) {
        const event = {
          eventId: uuidv4(),
          title: title,
          startDate: date,
          endDate: date,
          link: eventLink,
          imageSrc: imageUrl,
          tags: ["Web 3.O"],
          interestedPeople: [],
        };

        events.push(event);
        existingTitles.push(title); // Add the title to the existing titles array to prevent duplicates
      }
    });

    if (events.length === 0) {
      return res.json({ message: "No new events found." });
    }

    const savedEvents = await Event.insertMany(events);
    res.json(savedEvents); // Return saved events as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
};
// exports.automobileEvents = async (req, res) => {
//   const url = "https://www.eventbrite.com/d/india/automobile/?page=1";

//   try {
//     const response = await axios.get(url);
//     const html = response.data;
//     const $ = cheerio.load(html);

//     const events = [];
//     const existingTitles = await Event.distinct("title");

//     $(".event-card-details").each((index, element) => {
//       const title = $(element).find("h2").text().trim();
//       const date = $(element).find("p:nth-child(2)").text().trim();
//       const imageUrl = $(element).prev().find(".event-card-image").attr("src");
//       const eventLink = $(element).prev().find("a").attr("href");

//       // Only proceed if all necessary information is present and event is not a duplicate
//       if (
//         title &&
//         date &&
//         imageUrl &&
//         eventLink &&
//         !existingTitles.includes(title)
//       ) {
//         const event = {
//           eventId: uuidv4(),
//           title: title,
//           startDate: date,
//           endDate: date,
//           link: eventLink,
//           imageSrc: imageUrl,
//           tags: ["Automobile"],
//           interestedPeople: [],
//         };

//         events.push(event);
//         existingTitles.push(title); // Add the title to the existing titles array to prevent duplicates
//       }
//     });

//     if (events.length === 0) {
//       return res.json({ message: "No new events found." });
//     }

//     const savedEvents = await Event.insertMany(events);
//     res.json(savedEvents); // Return saved events as JSON response
//   } catch (error) {
//     res.status(500).json({ error: error.message }); // Return error as JSON response
//   }
// };
exports.startupEvents = async (req, res) => {
  const baseUrl = "https://www.eventbrite.com/d/india/startup/?p=";
  const totalPages = 9;

  try {
    const events = [];
    const existingTitles = await Event.distinct("title");

    for (let page = 1; page <= totalPages; page++) {
      const url = baseUrl + page;
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);

      $(".event-card-details").each((index, element) => {
        const title = $(element).find("h2").text().trim();
        const date = $(element).find("p:nth-child(2)").text().trim();
        const imageUrl = $(element)
          .prev()
          .find(".event-card-image")
          .attr("src");
        const eventLink = $(element).prev().find("a").attr("href");

        // Only proceed if all necessary information is present and event is not a duplicate
        if (
          title &&
          date &&
          imageUrl &&
          eventLink &&
          !existingTitles.includes(title)
        ) {
          const event = {
            eventId: uuidv4(),
            title: title,
            startDate: date,
            endDate: date,
            link: eventLink,
            imageSrc: imageUrl,
            tags: ["Startup"],
            interestedPeople: [],
          };

          events.push(event);
          existingTitles.push(title); // Add the title to the existing titles array to prevent duplicates
        }
      });
    }

    if (events.length === 0) {
      return res.json({ message: "No new events found." });
    }

    const savedEvents = await Event.insertMany(events);
    res.json(savedEvents); // Return saved events as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
};
exports.cryptocurrencyEvents = async (req, res) => {
  const url = "https://www.eventbrite.com/d/india/cryptocurrency/?page=1";

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const events = [];
    const existingTitles = await Event.distinct("title");

    $(".event-card-details").each((index, element) => {
      const title = $(element).find("h2").text().trim();
      const date = $(element).find("p:nth-child(2)").text().trim();
      const imageUrl = $(element).prev().find(".event-card-image").attr("src");
      const eventLink = $(element).prev().find("a").attr("href");

      // Only proceed if all necessary information is present and event is not a duplicate
      if (
        title &&
        date &&
        imageUrl &&
        eventLink &&
        !existingTitles.includes(title)
      ) {
        const event = {
          eventId: uuidv4(),
          title: title,
          startDate: date,
          endDate: date,
          link: eventLink,
          imageSrc: imageUrl,
          tags: ["Cryptocurrency"],
          interestedPeople: [],
        };

        events.push(event);
        existingTitles.push(title); // Add the title to the existing titles array to prevent duplicates
      }
    });

    if (events.length === 0) {
      return res.json({ message: "No new events found." });
    }

    const savedEvents = await Event.insertMany(events);
    res.json(savedEvents); // Return saved events as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
};
exports.automobileEvents = async (req, res) => {
  const baseUrl = "https://www.eventbrite.com/d/india/automobile/?p=1&page=";
  const totalPages = 11;

  try {
    const events = [];
    const existingTitles = await Event.distinct("title");

    for (let page = 1; page <= totalPages; page++) {
      const url = baseUrl + page;
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);

      $(".event-card-details").each((index, element) => {
        const title = $(element).find("h2").text().trim();
        const date = $(element).find("p:nth-child(2)").text().trim();
        const imageUrl = $(element)
          .prev()
          .find(".event-card-image")
          .attr("src");
        const eventLink = $(element).prev().find("a").attr("href");

        // Only proceed if all necessary information is present and event is not a duplicate
        if (
          title &&
          date &&
          imageUrl &&
          eventLink &&
          !existingTitles.includes(title)
        ) {
          const event = {
            eventId: uuidv4(),
            title: title,
            startDate: date,
            endDate: date,
            link: eventLink,
            imageSrc: imageUrl,
            tags: ["Automobile"],
            interestedPeople: [],
          };

          events.push(event);
          existingTitles.push(title); // Add the title to the existing titles array to prevent duplicates
        }
      });
    }

    if (events.length === 0) {
      return res.json({ message: "No new events found." });
    }

    const savedEvents = await Event.insertMany(events);
    res.json(savedEvents); // Return saved events as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
};
exports.environmentalEvents = async (req, res) => {
  const baseUrl = "https://www.eventbrite.com/d/india/environmental/?page=";
  const totalPages = 11;

  try {
    const events = [];
    const existingTitles = await Event.distinct("title");

    for (let page = 1; page <= totalPages; page++) {
      const url = baseUrl + page;
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);

      $(".event-card-details").each((index, element) => {
        const title = $(element).find("h2").text().trim();
        const date = $(element).find("p:nth-child(2)").text().trim();
        const imageUrl = $(element)
          .prev()
          .find(".event-card-image")
          .attr("src");
        const eventLink = $(element).prev().find("a").attr("href");

        // Only proceed if all necessary information is present and event is not a duplicate
        if (
          title &&
          date &&
          imageUrl &&
          eventLink &&
          !existingTitles.includes(title)
        ) {
          const event = {
            eventId: uuidv4(),
            title: title,
            startDate: date,
            endDate: date,
            link: eventLink,
            imageSrc: imageUrl,
            tags: ["Environmental"],
            interestedPeople: [],
          };

          events.push(event);
          existingTitles.push(title); // Add the title to the existing titles array to prevent duplicates
        }
      });
    }

    if (events.length === 0) {
      return res.json({ message: "No new events found." });
    }

    const savedEvents = await Event.insertMany(events);
    res.json(savedEvents); // Return saved events as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
};
exports.sustainabilityEvents = async (req, res) => {
  const baseUrl =
    "https://www.eventbrite.com/d/india/sustainability/?p=1&page=";
  const totalPages = 11;

  try {
    const events = [];
    const existingTitles = await Event.distinct("title");

    for (let page = 1; page <= totalPages; page++) {
      const url = baseUrl + page;
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);

      $(".event-card-details").each((index, element) => {
        const title = $(element).find("h2").text().trim();
        const date = $(element).find("p:nth-child(2)").text().trim();
        const imageUrl = $(element)
          .prev()
          .find(".event-card-image")
          .attr("src");
        const eventLink = $(element).prev().find("a").attr("href");

        // Only proceed if all necessary information is present and event is not a duplicate
        if (
          title &&
          date &&
          imageUrl &&
          eventLink &&
          !existingTitles.includes(title)
        ) {
          const event = {
            eventId: uuidv4(),
            title: title,
            startDate: date,
            endDate: date,
            link: eventLink,
            imageSrc: imageUrl,
            tags: ["Sustainability"],
            interestedPeople: [],
          };

          events.push(event);
          existingTitles.push(title); // Add the title to the existing titles array to prevent duplicates
        }
      });
    }

    if (events.length === 0) {
      return res.json({ message: "No new events found." });
    }

    const savedEvents = await Event.insertMany(events);
    res.json(savedEvents); // Return saved events as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error as JSON response
  }
};

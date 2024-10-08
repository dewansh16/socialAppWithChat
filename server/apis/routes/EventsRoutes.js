const express = require("express");
const router = express.Router();
const {
  sustainabilityEvents,
  increaseInterestedCount,
  interestedPeopleCount,
  topEvents,
  getAllEvents,
  sortByStartDate,
  financialTechnologyEvents,
  vesrtualReakity,
  gamingEvents,
  agriculterEvents,
  blockChain,
  technologyEvents,
  foodandBeverage,
  iotEvents,
  luxuryandGoods,
  realEstate,
  energyEvents,
  interiorDesign,
  educationEvents,
  healthcareEvents,
  eCommerceEvents,
  environmentalEvents,
  wrb3oEvents,
  automobileEvents,
  startupEvents,
  cryptocurrencyEvents,
  decreaseInterestedCount,
  technology10timesEvents,
  startup10timesEvents,
} = require("../controllers/events_controller.js");
router.get("/sustainabilityEvents", sustainabilityEvents);
router.get("/financialTechnologyEvents", financialTechnologyEvents);
router.get("/vesrtualReakity", vesrtualReakity);
router.get("/gamingEvents", gamingEvents);
router.get("/agriculterEvents", agriculterEvents);
router.get("/blockChain", blockChain);
router.get("/technologyEvents", technologyEvents);
router.get("/technology10timesEvents", technology10timesEvents);
router.get("/foodandBeverage", foodandBeverage);
router.get("/iotEvents", iotEvents);
router.get("/luxuryandGoods", luxuryandGoods);
router.get("/realEstate", realEstate);
router.get("/energyEvents", energyEvents);
router.get("/interiorDesign", interiorDesign);
router.get("/educationEvents", educationEvents);
router.get("/healthcareEvents", healthcareEvents);
router.get("/eCommerceEvents", eCommerceEvents);
router.get("/environmentalEvents", environmentalEvents);
router.get("/wrb3oEvents", wrb3oEvents);
router.get("/automobileEvents", automobileEvents);
router.get("/startupEvents", startupEvents);
router.get("/startup10timesEvents", startup10timesEvents);
router.get("/cryptocurrencyEvents", cryptocurrencyEvents);
router.post(
  "/events/:eventId/increaseInterestedCount",
  increaseInterestedCount
);
router.post(
  "/events/:eventId/decreaseInterestedCount",
  decreaseInterestedCount
);
router.get("/events/:eventId/interestedPeopleCount", interestedPeopleCount);
router.get("/events/topEvents", topEvents);
router.get("/events/sortByStartDate", sortByStartDate);
router.get("/events/getAllEvents", getAllEvents);

module.exports = router;

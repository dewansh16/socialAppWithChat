const Joi = require("joi");
const User = require("../models/user.js");
const sgMail = require("@sendgrid/mail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createTokens } = require("../auth/JWT.js");
const { verify } = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const cheerio = require("cheerio");
const axios = require("axios");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
SENDGRID_API_KEY =
  "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";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.home = (req, res) => {
  res.send("Welcome to Uttertale");
};

exports.update = async (req, res) => {
  const {
    userid,
    name,
    about,
    education,
    location,
    website_link,
    experience,
    social_media,
    // featured_link,
    // achivement,
  } = req.body;

  // Scrape each link and add title, date, and image to featured_link array
  // const updatedLinks = await Promise.all(
  //   featured_link.map(async (linkObj) => {
  //     try {
  //       const response = await axios.get(linkObj.link);
  //       const $ = cheerio.load(response.data);

  //       const title = $('meta[property="og:title"]').attr('content') || $('title').text();
  //       const date = $('meta[property="article:published_time"]').attr('content') || '';
  //       const image = $('meta[property="og:image"]').attr('content') || $('a[href="#"] img').attr('src') || '';

  //       return {
  //         ...linkObj,
  //         title,
  //         date,
  //         image,
  //       };
  //     } catch (error) {
  //       console.error(error);
  //       return linkObj;
  //     }
  //   })
  // );

  // // Scrape each link and add title, date, and image to achievement array
  // let updatedAchievements = [];
  // if (achivement) {
  //   updatedAchievements = await Promise.all(
  //     achivement.map(async (achieveObj) => {
  //       try {
  //         const response = await axios.get(achieveObj.link);
  //         const $ = cheerio.load(response.data);

  //         const title =
  //           $('meta[property="og:title"]').attr("content") || $("title").text();
  //         const date =
  //           $('meta[property="article:published_time"]').attr("content") || "";
  //         const image =
  //           $('meta[property="og:image"]').attr("content") ||
  //           $('a[href="#"] img').attr("src") ||
  //           "";

  //         return {
  //           ...achieveObj,
  //           title,
  //           date,
  //           image,
  //         };
  //       } catch (error) {
  //         console.error(error);
  //         return achieveObj;
  //       }
  //     })
  //   );
  // }

  // Update user document with new featured_link and achievement arrays
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userid,
      {
        name,
        about,
        education,
        location,
        website_link,
        experience,
        social_media,
        // featured_link: updatedLinks,
        // achivement: updatedAchievements,
      },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

exports.updateAchievements = async (req, res) => {
  const { userId, achievementLinks } = req.body;

  try {
    const updatedAchievements = await Promise.all(
      achievementLinks.map(async ({ link }) => {
        const response = await axios.get(link);
        const $ = cheerio.load(response.data);

        const title =
          $('meta[property="og:title"]').attr("content") || $("title").text();
        const date =
          $('meta[property="article:published_time"]').attr("content") || "";
        const image =
          $('meta[property="og:image"]').attr("content") ||
          $('a[href="#"] img').attr("src") ||
          "";

        return {
          link,
          title,
          date,
          image,
        };
      })
    );

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        achivement: updatedAchievements,
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update achievements" });
  }
};

exports.addFeaturedLinks = async (req, res) => {
  const { userId, featuredLinks } = req.body;

  try {
    const updatedFeaturedLinks = await Promise.all(
      featuredLinks.map(async ({ link }) => {
        const response = await axios.get(link);
        const $ = cheerio.load(response.data);

        const title =
          $('meta[property="og:title"]').attr("content") || $("title").text();
        const date =
          $('meta[property="article:published_time"]').attr("content") || "";
        const image =
          $('meta[property="og:image"]').attr("content") ||
          $('a[href="#"] img').attr("src") ||
          "";

        return {
          link,
          title,
          date,
          image,
        };
      })
    );

    console.log("updatedUSer = ", updatedFeaturedLinks);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        featured_link: updatedFeaturedLinks,
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update featured links" });
  }
};

exports.removeAchievement = async (req, res) => {
  const { userId, index } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.achivement[index]) {
      user.achivement.splice(index, 1);

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "Achievement not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to remove achievement" });
  }
};

exports.updateFeaturedLinksManual = async (req, res) => {
  const { userid, featured_link } = req.body;

  const updatedLinks = featured_link.map((linkObj) => {
    return {
      ...linkObj,
      title: linkObj.title || "",
      date: linkObj.date || "",
      image: linkObj.image || "",
    };
  });

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userid,
      { featured_link: updatedLinks },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

//add a new featured link
exports.UpdateFeaturedLink = async (linkObj) => {
  try {
    const response = await axios.get(linkObj.link);
    const $ = cheerio.load(response.data);

    const title =
      $('meta[property="og:title"]').attr("content") || $("title").text();
    const date =
      $('meta[property="article:published_time"]').attr("content") || "";
    const image =
      $('meta[property="og:image"]').attr("content") ||
      $('a[href="#"] img').attr("src") ||
      "";

    return {
      ...linkObj,
      title,
      date,
      image,
    };
  } catch (error) {
    console.error(error);
    return linkObj;
  }
};

//update a particular feature link
exports.updateFeaturedLinks = async (req, res) => {
  const { userId, index, link } = req.body;

  // Fetch the user document from the database
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the specified featured_link element
    if (user.featured_link[index]) {
      user.featured_link[index].link = link || user.featured_link[index].link;
      const updatedLink = await exports.UpdateFeaturedLink(
        user.featured_link[index]
      );
      user.featured_link[index] = updatedLink;

      // Save the updated user document
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "Featured link not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update featured link" });
  }
};

//remove featured link
exports.removeFeaturedLink = async (req, res) => {
  const { userId, index } = req.body;

  console.log("userId...", userId, req.body);
  // Fetch the user document from the database
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the specified featured_link element
    if (user.featured_link[index]) {
      user.featured_link.splice(index, 1);

      // Save the updated user document
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "Featured link not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to remove featured link" });
  }
};

const isMatch = (text) => {
  const keywords = ["startup", "business", "new startup", "new business"];
  const regex = new RegExp(keywords.join("|"), "gi");
  return regex.test(text);
};

exports.fetchFeaturedLink = async (req, res) => {
  const { id, name, experience, btype, bdomain, foundername } = req.body;
  const userId = id;

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
      if (!name || !experience || !experience[0]?.comName) {
        return res.status(400).json({
          message: "Name and experience with business name are required",
        });
      }
      const businessName = experience[0].comName;

      // create a single search query with name and businessName
      const query = `${name} ${businessName}`;
      searchQueries.push(query);
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
          searchKey2 = bdomain.map((val) => val.trim().toLowerCase);
        } else if (
          user.role === "Entrepreneur" ||
          user.role === "Content Creator"
        ) {
          if (!name || !experience || !experience[0]?.comName) {
            return res.status(400).json({
              message: "Name and experience with business name are required",
            });
          }
          const businessName = experience[0].comName;
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
            link,
            title,
            date,
            image,
            description,
          });
        }
      });
    }

    // if (scrapedLinks.length === 0) {
    //   return res.status(400).json({
    //     message: "No links found",
    //   });
    // }

    sortedScrapedLinks = scrapedLinks.sort(
      (a, b) => -a.date.localeCompare(b.date)
    );
    console.log("scrapedLinks length = ", sortedScrapedLinks.length);
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { featured_link: sortedScrapedLinks },
      { new: true }
    );
    user.featured_link = scrapedLinks;

    res.status(200).json({
      message: "Featured links updated successfully",
      featured_link: updatedUser.featured_link,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getuser = asyncHandler(async (req, res) => {
  const userid = req.params.userid;
  console.log(userid);
  const user = await User.findById(userid);
  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }
  res.json(user);
});

exports.register = async (req, res) => {
  try {
    const {
      email,
      name,
      role,
      instagram,
      twitter,
      youtube,
      linkedin,
      others,
      websitelink,
      gstin,
      pan,
      bdomain,
      foundername,
      businessname,
      btype,
    } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().min(5),
      name: Joi.string(),
      role: Joi.string(),
      instagram: Joi.string().allow(""),
      twitter: Joi.string().allow(""),
      youtube: Joi.string().allow(""),
      linkedin: Joi.string().allow(""),
      websitelink: Joi.string().allow(""),
      others: Joi.string().allow(""),
      gstin: Joi.string(),
      pan: Joi.string(),
      bdomain: Joi.array().items(Joi.string()).allow(""),
      foundername: Joi.array().items(Joi.string()).allow(""),
      businessname: Joi.string().allow(""),
      btype: Joi.string().allow(""),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      console.log("Joi error");
      console.log(error.details[0].message);
      return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({ email: email });
    if (user) {
      console.log("user already exist");
      res.status(400).json({ error: "User Already Exist" });
      return;
    }

    const newUser = new User({
      email,
      name,
      password: "12345678",
      role,
      instagram,
      twitter,
      youtube,
      linkedin,
      websitelink,
      others,
      gstin,
      pan,
      bdomain,
      foundername,
      businessname,
      btype,
    });

    const newUserData = await newUser.save();
    const msg = {
      to: "rishu@prandit.com",
      from: process.env.EMAIL,
      subject: "New User Registration",
      html: `
        <h1>New User Registration</h1>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Instagram:</strong> ${instagram}</p>
        <p><strong>Twitter:</strong> ${twitter}</p>
        <p><strong>YouTube:</strong> ${youtube}</p>
        <p><strong>LinkedIn:</strong> ${linkedin}</p>
        <p><strong>Website Link:</strong> ${websitelink}</p>
        <p><strong>Others:</strong> ${others}</p>
        <p><strong>GSTIN:</strong> ${gstin}</p>
        <p><strong>PAN:</strong> ${pan}</p>
        <p><strong>Business Domain:</strong> ${bdomain}</p>
        <p><strong>Founder Name:</strong> ${foundername}</p>
        <p><strong>Business Name:</strong> ${businessname}</p>
        <p><strong>Business Type:</strong> ${btype}</p>
      `,
    };
    await sgMail.send(msg);
    console.log("User saved successfully");
    return res.status(200).json({
      id: newUserData._id,
      message: "User registered successfully",
    });
  } catch (err) {
    console.log("Mongoose error");
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

exports.findUserData = async (req, res) => {
  const email = req.body.email;
  try {
    const userData = await User.findOne({ email: email });
    if (!userData) {
      message = "User Not Found";
    } else {
      message = "User Found";
    }

    res.json({
      message: message,
      data: userData,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(400).json({ error: "User Doesn't Exist" });
    return;
  }

  if (!user.isVerified) {
    res.status(400).json({
      error:
        "We are currently verifying your account. Please wait for a while before attempting to log in again. Thank you for your patience.",
    });
    return;
  }

  const dbPassword = user.password;

  bcrypt.compare(password, dbPassword).then((match) => {
    if (!match) {
      res
        .status(400)
        .json({ error: "Wrong Username and Password Combination!" });
    } else {
      const accessToken = createTokens(user);

      res.cookie("access-token", accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        sameSite: "strict",
        httpOnly: true,
      });

      return res.status(200).json({ user, accessToken });
    }
  });
};

exports.verifyEmail = async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  if (!email) {
    return res.status(422).send({
      message: "Missing email",
    });
  }

  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(404).send({
        message: "User does not exist",
      });
    }

    // Update user verification status to true
    user.isVerified = true;
    await user.save();

    // Send reset password link via email
    const resetToken = user.generatePasswordResetToken();
    const msg = {
      to: email,
      from: process.env.EMAIL,
      subject: "Welcome to our service",
      html: `<!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Welcome to our service</title>
          </head>
          <body>
            <p>Dear ${user.name},</p>
            <p>Thank you for registering with our service. In order to ensure the security of your account, we need to verify your email address and create a strong password for your account.</p>
            </p><p>To proceed with the create password process, please click on the following link:  <a href="${process.env.FR_SERVER}/createPassword/${resetToken}">here</a>
            <p>Once you have clicked on the link, you will be redirected to a page where you can create a password for your account. Please ensure that your password is at least 8 characters long, includes both uppercase and lowercase letters, and contains at least one number and one special character.</p>
            <p>If you have any trouble creating your password or verifying your email address, please do not hesitate to contact our support team.</p>
            <p>Thank you for choosing our service, and we look forward to providing you with a great user experience.</p>
            <p>Best regards,<br />Team Uttertale</p>
          </body>
        </html>`,
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
        return res.status(200).json({
          success: true,
          message:
            "Your email address is verified and a password reset link has been sent",
        });
      })
      .catch((error) => {
        console.error(error.body);
        return res
          .status(500)
          .json({ message: "Server error, something went wrong" });
      });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

exports.getResetPasswordLink = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    let token = user.generatePasswordResetToken();

    // const url = `http://localhost:3000/createNewPassword/${token}`;    //localhost
    const url = `${process.env.FR_SERVER}/resetPassword/${token}`;

    const emailSent = await sgMail.send({
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Password",
      text: "Reset your password for Uttertale.",
      html: `<p>Please click this link to reset password. <a href="${url}">click here</a></p>`,
    });
    if (emailSent) {
      return res.status(201).json({
        status: "Password reset email sent.",
        message: `Password reset link was sent to ${email}.`,
      });
    } else {
      console.error(error.body);
      return res
        .status(403)
        .json({ message: "Password reset failed, Email sending failed!" });
    }
  } else {
    console.error(error.body);
    return res
      .status(403)
      .json({ message: "There is no account associated with this email!" });
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { userId, currPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(currPassword, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { id } = verify(
      req.params.token,
      process.env.USER_VERIFICATION_TOKEN_SECRET
    );
    if (!id) {
      return res.status(404).send({ message: "User not found!" });
    }
    const schema = Joi.object({
      newPassword: Joi.string()
        .min(8)
        .pattern(
          new RegExp(
            "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
          )
        ),
      conPassword: Joi.ref("newPassword"),
    }).with("newPassword", "conPassword");
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const { newPassword, conPassword } = value;
    const updatedUser = await User.findById(id);
    if (!updatedUser) {
      return res.status(404).send({ message: "Password reset failed!" });
    }
    const hash = newPassword;
    updatedUser.password = hash;
    await updatedUser.save();
    return res.status(200).json({ status: "Password reset successfully!" });
  } catch (error) {
    return next(error);
  }
};

exports.createPassword = async (req, res, next) => {
  try {
    const { id } = verify(
      req.params.token,
      process.env.USER_VERIFICATION_TOKEN_SECRET
    );
    if (!id) {
      return res.status(404).send({ message: "User not found!" });
    }
    const schema = Joi.object({
      newPassword: Joi.string()
        .min(8)
        .pattern(
          new RegExp(
            "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
          )
        ),
      conPassword: Joi.ref("newPassword"),
    }).with("newPassword", "conPassword");
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const { newPassword, conPassword } = value;
    const updatedUser = await User.findById(id);
    if (!updatedUser) {
      return res.status(404).send({ message: "Password create failed!" });
    }
    const hash = newPassword;
    updatedUser.password = hash;
    await updatedUser.save();
    return res.status(200).json({ status: "Password create successfully!" });
  } catch (error) {
    return next(error);
  }
};


exports.allUsers = async (req, res) => {
  try {
    const keyword = req.query.search
      ? { name: { $regex: `^${req.query.search}`, $options: "i" } }
      : {};
    // console.log(req.user._id)
    //   const users = await User.find(keyword);

    const users = await User.find(keyword).find({
      email: { $ne: req.user.email },
    });
    res.send(users);
  } catch (error) {
    console.log(error);
  }
};

exports.letterRecommendation = function (req, res) {
  const letter = req.params.letter;

  User.find(
    { name: { $regex: `^${letter}`, $options: "i" } },
    "name",
    function (err, users) {
      if (err) {
        console.error("Error querying the database:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        const names = users;
        res.json(names);
      }
    }
  );
};
// exports.sendConnect = asyncHandler(async (req, res) => {
//   try {
//     const tuserid = req.params.userid;
//     const currUserid = req.user._id;
//     console.log(tuserid);
//     const user = await User.findById(currUserid);
//     console.log("Current User", user);
//     user.requests.push({ userid: tuserid, state: "1" });
//     user.save();
//     const tuser = await User.findById(tuserid);
//     tuser.notifications.push({ userid: currUserid, name: user.name });
//     tuser.save();

//     // Retrieve the signed-in user's notifications array
//     const signedInUser = await User.findById(req.user.id);
//     const notifications = signedInUser.notifications;

//     return res.json(notifications);
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// });

// exports.acceptRequest = asyncHandler(async (req, res) => {
//   try {
//     const tuserid = req.params.userid;
//     const currUserid = req.user._id;
//     console.log(tuserid);
//     const user = await User.findById(tuserid);
//     for (let i = 0; i < user.requests.length; i++) {
//       if (String(user.requests[i].userid) === String(currUserid)) {
//         user.requests[i].state = "2";
//       }
//     }

//     user.save();

//     const curruser = await User.findById(currUserid);
//     for (let i = 0; i < curruser.notifications.length; i++) {
//       if (String(curruser.notifications[i].userid) === String(tuserid)) {
//         curruser.notifications[i].state = true;
//       }
//     }
//     console.log(curruser);
//     curruser.save();

//     // Retrieve the signed-in user's notifications array
//     const signedInUser = await User.findById(req.user.id);
//     const notifications = signedInUser.notifications;

//     return res.json(notifications);
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// });

exports.activeConnectionRequests = async (req, res) => {
  try {
    const currUserid = req.user._id;
    const user = await User.findById(currUserid)
      .select("requests")
      .populate("requests.userid", "name");
    let activeRequests = [];
    user.requests.forEach((request) => {
      if (request.state === "1") {
        activeRequests.push(request);
      }
    });
    return res.send(activeRequests);
  } catch (error) {
    return res.send(error);
  }
};
exports.friendsList = async (req, res) => {
  try {
    const currUserid = req.user._id;
    const user = await User.findById(currUserid);
    const friendsList = user.requests.filter(
      (request) => request.state === "2"
    );
    const friendIds = friendsList.map((friend) => friend.userid);
    const friends = await User.find({ _id: { $in: friendIds } });
    return res.send(friends);
  } catch (error) {
    return res.send(error);
  }
};
exports.writetous = async (req, res) => {
  const { fullname, email, pnumber, role, writetous } = req.body;
  const emailSent = await sgMail.send({
    from: process.env.EMAIL,
    to: email,
    subject: "User contacted through Contact Page",
    text: "Reset your password for Uttertale.",
    html: `<p>${writetous}<br/><br/>Name : ${fullname}<br/>Email : ${email}<br/>Mobile No. : ${pnumber}<br/>Profile : ${role}</p>`,
  });
  if (emailSent) {
    return res.status(201).json({
      status: "Password reset email sent.",
      message: `Password reset link was sent to ${email}.`,
    });
  } else {
    // console.error(error.body);
    return res
      .status(403)
      .json({ message: "Password reset failed, Email sending failed!" });
  }
};

exports.featuredlinks = async (req, res) => {
  const searchString = req.params.searchString;
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

  function getNewsInfo() {
    return axios
      .get(`http://google.co.in/search`, AXIOS_OPTIONS)
      .then(function ({ data }) {
        let $ = cheerio.load(data);

        const pattern = /s='(?<img>[^']+)';\w+\s\w+=\['(?<id>\w+_\d+)'];/gm;
        const images = [...data.matchAll(pattern)].map(({ groups }) => ({
          id: groups.id,
          img: groups.img.replace("\\x3d", ""),
        }));

        const allNewsInfo = Array.from($(".WlydOe")).map((el) => {
          return {
            link: $(el).attr("href"),
            source: $(el).find(".CEMjEf span").text().trim(),
            title: $(el).find(".mCBkyc").text().trim().replace("\n", ""),
            snippet: $(el).find(".GI74Re").text().trim().replace("\n", ""),
            image:
              images.find(
                ({ id, img }) => id === $(el).find(".uhHOwf img").attr("id")
              )?.img || "No image",
            date: $(el).find(".ZE0LJd span").text(),
          };
        });

        return allNewsInfo;
      });
  }

  getNewsInfo()
    .then((newsInfo) => {
      res.json(newsInfo);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
};

exports.fetchFeaturedLinkcurrent = async (req, res) => {
  const { id, name, experience, btype, bdomain, foundername } = req.body;
  const userId = id;

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
      if (!name || !experience || !experience[0]?.comName) {
        return res.status(400).json({
          message: "Name and experience with business name are required",
        });
      }
      const businessName = experience[0].comName;

      // create a single search query with name and businessName
      const query = `${name} ${businessName}`;
      searchQueries.push(query);
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
          if (!name || !experience || !experience[0]?.comName) {
            return res.status(400).json({
              message: "Name and experience with business name are required",
            });
          }
          const businessName = experience[0].comName;
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

    console.log("scrapedLinks length = ", scrapedLinks.length);

    // Append the new scraped links to the existing user.featured_link array
    const updatedFeaturedLinks = [
      ...user.featured_link,
      ...scrapedLinks.slice(0, 6),
    ];

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { featured_link: updatedFeaturedLinks },
      { new: true }
    );

    res.status(200).json({
      message: "Featured links updated successfully",
      featured_link: updatedUser.featured_link,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.refreshAllFeaturedLinks = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "Admin" } });
    console.log(`Found ${users.length} users with role other than Admin`);

    let updatedUsers = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      console.log(`Processing user ${user._id}...`);
      console.log(`User name: ${user.name}`);

      const { id, name, experience, btype, bdomain, foundername } = user;
      const reqBody = { id, name, experience, btype, bdomain, foundername };
      const req = { body: reqBody };
      const res = {
        status: function (status) {
          this.statusCode = status;
          return this;
        },
        json: function (data) {
          this.body = data;
          return this;
        },
      };

      await exports.fetchFeaturedLinkcurrent(req, res);

      if (res.statusCode === 200) {
        updatedUsers.push({
          userId: user._id,
          featuredLink: res.body.featured_link,
        });
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

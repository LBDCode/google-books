require("dotenv").config();


module.exports.Config = {
  nexmoKey: process.env.API_KEY,
  nexmoSecret: process.env.API_SECRET,
  nexmoNumber: process.env.NUM,
  nexmoAPP_ID: process.env.APP_ID,
  nexmoPrivate: process.env.PRIVATE_KEY,
  nodemailerHost: process.env.NODEMAILER_HOST,
  nodemailerUser: process.env.NODEMAILER_USER,
  nodemailerPW: process.env.NODEMAILER_PASSWORD
};


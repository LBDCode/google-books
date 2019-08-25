const db = require("../models");
const axios= require("axios")
const Nexmo = require("nexmo");
const nodemailer = require("nodemailer");
const config = require("../config");

// Defining methods for the booksController
module.exports = {
  //find books
  searchBooks: function(req, res) {
    axios.get(req.body.search + config.Config.googleKey)
    .then(results => {
      res.json({results: results.data.items})      
    })
    .catch(err => res.status(422).json(err));  
  },
  //return all info for a user
  findAll: function(req, res) {
    db.Schema.User.findOne({ email: req.params.email })
      .then(dbModel => {
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  ///return all books saved by a user
  findById: function(req, res) {
    db.Schema.User.find(
      {"email": req.params.email}, 
      {"favorites" : { $elemMatch: {"googleID": req.params.book}}})
      .then(dbModel => {
        res.json(dbModel[0].favorites);
      })
      .catch(err => res.status(422).json(err));
  },
  //create a new user
  createUser: function(req, res) {
    db.Schema.User.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  googleID: {type: String, required: true},
  imageURL: String,
  previewURL: String,
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: String,
  date: { type: Date, default: Date.now },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  //add/remove favorites for a user
  manageUserBook: function(req, res) {
    db.Schema.User.findOne(
      {"email": req.params.email, "favorites.googleID": req.params.book }
    ).then(found => {
      if (found) {
        db.Schema.User.update(
          { "email": req.body.email, "favorites.googleID": req.params.book },
          { $set: { "favorites.$": 
            {"googleID": req.body.bookData.googleID, 
            rating: req.body.bookData.rating,
            imageURL: req.body.bookData.imageURL,
            previewURL: req.body.bookData.previewURL,
            title: req.body.bookData.title,
            author: req.body.bookData.author,
            description: req.body.bookData.description             
            }
        }}
        )
          .then(dbModel => {
            res.json(dbModel);
          })
          .catch(err => res.status(422).json(err));
      } else {
        db.Schema.User.findOneAndUpdate(
          { email: req.body.email },
          { $addToSet: { favorites: req.body.bookData} }
        )
          .then(dbModel => {
            res.json(dbModel);
          })
          .catch(err => res.status(422).json(err));
      }
    });
  },
  // update: function(req, res) {
  //   db.Schema.Book.findOneAndUpdate({ _id: req.params.id }, req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  //delete a book from favorites
  remove: function(req, res) {
    var email = req.params.email;
    var book = req.params.book;
    db.Schema.User.update(
      { "email": email, "favorites.googleID": book },
      { $pull: { favorites: {googleID: book}}},
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  sendSMS: function(req, res) {
    const nexmo = new Nexmo({
      apiKey: config.Config.nexmoKey,
      apiSecret: config.Config.nexmoSecret
    });

    res.send(req.body)
    // const user = req.body.user;
    const number = "1" + req.body.number;
    const message = req.body.message;

    nexmo.message.sendSms(config.Config.nexmoNumber, number, message, {type: 'unicode'},
    (err, resp) => {
      if (err) {
        console.log(err);
      } 
    });
  },
  sendEmail: function(req, res) {
    let email = req.body.email.trim();
    const transporter = nodemailer.createTransport({
      host: config.Config.nodemailerHost,
      port: 465,
      secure: true,
      auth: {
        user: config.Config.nodemailerUser,
        pass: config.Config.nodemailerPW
      }
    });
    let mailOptions = {
      from: config.Config.nodemailerUser,
      to: email,
      subject: "Someone shared a book with you!",
      text: req.body.text.trim()
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        res.json(info.response);
      }
    });
  },
};

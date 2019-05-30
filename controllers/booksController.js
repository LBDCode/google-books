const db = require("../models");

// Defining methods for the booksController
module.exports = {
  //working
  findAll: function(req, res) {
    db.Schema.User.findOne({ email: req.params.email })
      .then(dbModel => {
        console.log("result: " + dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Schema.User.find({
      "email": req.body.email,
      "favorites.googleID": req.body.id
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Schema.Book.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //working
  createUser: function(req, res) {
    // console.log(req.body);
    db.Schema.User.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //allows duplcation, doesn't search by googleID
  manageUserBook: function(req, res) {
    db.Schema.User.findOne({
      email: req.body.email,
      favorites: { $in: req.body.book}
    }).then(found => {
      if (found) {
        db.Schema.User.findOneAndUpdate(
          { email: req.body.email },
          { $pull: { favorites: req.body.book} }
        )
          .then(dbModel => {
            res.json(dbModel);
            console.log("removed: " + dbModel);
          })
          .catch(err => res.status(422).json(err));
      } else {
        db.Schema.User.findOneAndUpdate(
          { email: req.body.email },
          { $addToSet: { favorites: req.body.book} }
        )
          .then(dbModel => {
            res.json(dbModel);
            console.log("added: " + dbModel);
          })
          .catch(err => res.status(422).json(err));
      }
    });
  },
  update: function(req, res) {
    db.Schema.Book.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //working
  remove: function(req, res) {
    var email = req.body.user;
    var book = req.body.book;
    db.Schema.User.update(
      { "email": email, "favorites.googleID": book },
      { $pull: { favorites: {googleID: book}}},
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

const db = require("../models");

// Defining methods for the booksController
module.exports = {
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
    console.log(req.body);
    db.Schema.User.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //add/remove favorites for a user
  manageUserBook: function(req, res) {
    console.log(req.body.email, req.body.book);
    db.Schema.User.findOne(
      {"email": req.params.email, "favorites.googleID": req.params.book }
    ).then(found => {
      if (found) {
        console.log("found: " + req.params.book);
        db.Schema.User.update(
          { "email": email, "favorites.googleID": book },
          { $set: { favorites: {googleID: book}}}
        )
          .then(dbModel => {
            res.json(dbModel);
            console.log("removed: " + dbModel);
          })
          .catch(err => res.status(422).json(err));
      } else {
        console.log("update: " + req.params.book);
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
    res.send(req.body)
    console.log(req.body);
  }
};

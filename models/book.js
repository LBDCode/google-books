const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  googleID: {type: String, required: true},
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: String,
  date: { type: Date, default: Date.now },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  notes: String,
});

const userSchema = new Schema({
  email: {type: String, required: true},
  favorites: [bookSchema],
});

const Book = mongoose.model("Book", bookSchema);
const User =  mongoose.model("User", userSchema);
module.exports = {Book, User}

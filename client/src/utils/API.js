import axios from "axios";

export default {

  //gets user books - working
  getUserBooks: function(email) {
    return axios.get("/api/books/user/" + email);
  },
  //search for books - working
  searchBooks: function(q) {
    const apiURL = "https://www.googleapis.com/books/v1/volumes?";
    const apiKey = "&key=AIzaSyALT3IQvbkQs5TifbVM8LfyjCKQIgpA9Ns";
    let query = "q=" + q;
    return axios.get(apiURL + query + apiKey);
  },
  // Gets the book with the given id
  getBook: function(user, bookID) {
    console.log(user, bookID);
    return axios.get("/api/books/user/" + user + "/" + bookID);
  },
  // Deletes the book with the given id - working
  deleteBook: function(user, bookID) {
    return axios.delete("/api/books/user/" + user + "/" + bookID);
  },
  // Saves a book to the user - working
  saveUserBook: function(user, bookID, bookData) {
    return axios.put("/api/books/user/" + user + "/" + bookID, {"email": user, "bookData": bookData});
  },
  //creates a user - working
  createUser: function(userData) {
    return axios.post("/api/books/users", userData)
  }
};

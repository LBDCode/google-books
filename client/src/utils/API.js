import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  //search for books
  searchBooks: function(q) {
    const apiURL = "https://www.googleapis.com/books/v1/volumes?";
    const apiKey = "&key=AIzaSyALT3IQvbkQs5TifbVM8LfyjCKQIgpA9Ns";
    let query = "q=" + q;
    return axios.get(apiURL + query + apiKey);
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};

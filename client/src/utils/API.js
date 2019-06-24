import axios from "axios";

export default {

  //gets user books - working
  getUserBooks: function(email) {
    return axios.get("/api/books/users/" + email);
  },
  searchBooks: function(q, f) {
    const apiURL = "https://www.googleapis.com/books/v1/volumes?";
    const query = "q=" + q;
    const filter = "&filter=" + f;
    if (f === ""|| f === "none") {
      const midstring = apiURL + query; 
      return axios.post("api/books/search", {search: midstring});
    } else {
      const midstring = apiURL + query + filter;
      return axios.post("api/books/search", {search: midstring});
    }
  },
  // Gets the book with the given id
  getBook: function(user, bookID) {
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
  },
  //send a text
  sendText: function(user, number, bookInfo) {
    let message = `Check out this book!  ${bookInfo.title} by ${bookInfo.author}. --${user} via Bibliofile \n ${bookInfo.link}`
    return axios.post("/api/books/messages", {user: user, number: number, message: message});
  },
  sendEmail: function(user, email, bookInfo) {
    let text = `Bibiofile user ${user} found a book you might like! ${bookInfo.title} by ${bookInfo.author} \n ${bookInfo.link} `;
    return axios.post("/api/books/emails", {user: user, email: email, text: text});
  }
};

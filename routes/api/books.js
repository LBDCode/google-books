const router = require("express").Router();
const booksController = require("../../controllers/booksController");
const userController = require("../../controllers/booksController");



router
  .route("/user/:email/:book")
  .get(booksController.findById)
  .delete(booksController.remove) 
  .put(booksController.manageUserBook)


router
  .route("/users/:email")
  .get(booksController.findAll)  


router
  .route("/users")
  .post(booksController.createUser); 

// Matches with "/api/books"
// router
//   .route("/")
//   .get(booksController.findAll)
  // .post(booksController.create);

// Matches with "/api/books/:id"
// router
//   .route("/book/:id")  
//   .put(booksController.update)

module.exports = router;

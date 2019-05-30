const router = require("express").Router();
const booksController = require("../../controllers/booksController");
const userController = require("../../controllers/booksController");

// Matches with "/api/books"
router
  .route("/")
  // .get(booksController.findAll)
  .post(booksController.create);

// Matches with "/api/books/:id"
router
  .route("/book/:id")
  .get(booksController.findById)
  .put(booksController.update)

router
  .route("/users")
  .post(booksController.createUser); 

router
.route("/remove")
  .put(booksController.remove);

router
  .route("/user/:email")
  .get(booksController.findAll)  
  .put(booksController.manageUserBook)

module.exports = router;

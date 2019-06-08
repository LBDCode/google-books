const router = require("express").Router();
const booksController = require("../../controllers/booksController");


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

module.exports = router;

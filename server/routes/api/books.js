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

router
  .route("/messages")
  .post(booksController.sendSMS);

router
  .route("/search")
  .post(booksController.searchBooks); 
  
router
  .route("/emails")
  .post(booksController.sendEmail);   

module.exports = router;

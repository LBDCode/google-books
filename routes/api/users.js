const router = require("express").Router();
const userController = require("../../controllers/userContoller");

router
  .route("/create")
  .post(userController.create);


router
  .route("/:email")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;  

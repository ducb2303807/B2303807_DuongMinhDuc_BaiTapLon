const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staff.controller");

router
  .route("/")
  .get(staffController.findAll)
  .post(staffController.create)
  .delete(staffController.deleteAll);

router.route("/login").post(staffController.login);
router.route("/check-username").get(staffController.findUsername);
router
  .route("/:id")
  .get(staffController.findOne)
  .put(staffController.update)
  .delete(staffController.delete);

module.exports = router;

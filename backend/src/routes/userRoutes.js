const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const controller = require("../controllers/userController");

const router = express.Router();

router.get("/profile", auth, controller.getProfile);
router.put("/profile", auth, controller.updateProfile);
router.put("/change-password", auth, controller.changePassword);

router.get("/", auth, admin, controller.getAllUsers);
router.patch("/:id/activate", auth, admin, controller.activateUser);
router.patch("/:id/deactivate", auth, admin, controller.deactivateUser);

module.exports = router;

const express = require("express");
const slotController = require("../controllers/slotController");
const adminAuth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/join", slotController.joinSlot);
router.get("/", slotController.getSlots);
router.post("/reset", adminAuth, slotController.resetSlots);
router.get("/participants", slotController.getParticipants);

module.exports = router;

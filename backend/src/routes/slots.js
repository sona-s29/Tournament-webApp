const express = require("express");
const router = express.Router();
const slotController = require("../controllers/slotController");
const adminAuth = require("../middleware/authMiddleware"); // keep if you use admin auth

router.post("/join", slotController.joinSlot);
router.get("/", slotController.getSlots);
router.post("/reset", adminAuth, slotController.resetSlots);
router.get("/participants", slotController.getParticipants);

module.exports = router;

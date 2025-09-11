// src/controllers/slotController.js
const db = require("../config/firebase"); 
const tournaments = require("../models/tournaments"); // ✅ contains groupLink per tournament

// Join slot: server auto-assigns first empty slot for given tournament
exports.joinSlot = async (req, res) => {
  try {
    const { userIds, tournamentName } = req.body;
    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ message: "userIds must be a non-empty array" });
    }
    if (!tournamentName) return res.status(400).json({ message: "tournamentName required" });

    // Find tournament config
    const tournamentConfig = tournaments.find(t => t.name === tournamentName);
    if (!tournamentConfig) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    // Transaction to avoid race conditions
    const slotsRef = db.collection("slots")
      .where("tournamentName", "==", tournamentName)
      .orderBy("slotNumber");

    const result = await db.runTransaction(async (tx) => {
      const snap = await tx.get(slotsRef);

      if (snap.empty) {
        return { ok: false, status: 404, message: "No slots available for this tournament" };
      }

      // Prevent duplicate joins
      for (const doc of snap.docs) {
        const s = doc.data();
        if (s.userIds && s.userIds.some(id => userIds.includes(id))) {
          return { ok: false, status: 400, message: "One or more users already joined a slot" };
        }
      }

      // Find first empty slot
      let slotDoc = null;
      for (const doc of snap.docs) {
        const slot = doc.data();
        if (!slot.userIds || slot.userIds.length === 0) {
          slotDoc = doc;
          break;
        }
      }

      if (!slotDoc) {
        return { ok: false, status: 400, message: "All slots are full" };
      }

      // Update slot
      tx.update(slotDoc.ref, { userIds });
      return { ok: true, slotNumber: slotDoc.data().slotNumber };
    });

    if (!result.ok) {
      return res.status(result.status || 400).json({ message: result.message });
    }

    return res.json({
      success: true,
      message: "Slot joined successfully",
      slotNumber: result.slotNumber,
      whatsappLink: tournamentConfig.groupLink // ✅ send WhatsApp group link
    });
  } catch (err) {
    console.error("Error in joinSlot:", err);
    return res.status(500).json({ message: err.message });
  }
};

// Get slots (array)
exports.getSlots = async (req, res) => {
  try {
    const { tournamentName } = req.query;
    let query = db.collection("slots").orderBy("slotNumber");
    if (tournamentName) {
      query = db.collection("slots")
        .where("tournamentName", "==", tournamentName)
        .orderBy("slotNumber");
    }

    const snap = await query.get();
    if (snap.empty) return res.json([]);

    const slots = snap.docs.map(doc => {
      const d = doc.data();
      return {
        slotNumber: d.slotNumber,
        userIds: d.userIds || [],
        tournamentName: d.tournamentName || null,
      };
    });

    return res.json(slots);
  } catch (err) {
    console.error("Error in getSlots:", err);
    return res.status(500).json({ message: err.message });
  }
};

// Reset slots
exports.resetSlots = async (req, res) => {
  try {
    const { tournamentName } = req.query;
    const query = tournamentName
      ? db.collection("slots").where("tournamentName", "==", tournamentName)
      : db.collection("slots");

    const snap = await query.get();
    if (snap.empty) return res.json({ message: "No slots to reset" });

    const batch = db.batch();
    snap.forEach(doc => batch.update(doc.ref, { userIds: [] }));
    await batch.commit();

    return res.json({
      message: tournamentName
        ? `Slots reset for ${tournamentName}`
        : "All slots reset"
    });
  } catch (err) {
    console.error("Error in resetSlots:", err);
    return res.status(500).json({ message: err.message });
  }
};

// Get participants
exports.getParticipants = async (req, res) => {
  try {
    const { tournamentName } = req.query;
    if (!tournamentName) return res.status(400).json({ message: "tournamentName required" });

    const snap = await db.collection("slots").where("tournamentName", "==", tournamentName).get();
    if (snap.empty) return res.json([]);

    const participants = [];
    snap.forEach(doc => {
      const d = doc.data();
      if (d.userIds && d.userIds.length > 0) participants.push(...d.userIds);
    });

    return res.json(participants);
  } catch (err) {
    console.error("Error in getParticipants:", err);
    return res.status(500).json({ message: err.message });
  }
};

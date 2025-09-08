const db = require("../config/firebase");
const tournaments = require("../models/tournaments");

// Join a slot
exports.joinSlot = async (req, res) => {
  try {
    const { userIds, slotNumber, tournamentName } = req.body;

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ message: "userIds must be a non-empty array" });
    }

    // Find tournament config
    const tournament = tournaments.find((t) => t.name === tournamentName);
    if (!tournament) return res.status(400).json({ message: "Invalid tournament" });
    if (userIds.length !== tournament.teamSize) {
      return res
        .status(400)
        .json({ message: `This tournament requires a team of ${tournament.teamSize}` });
    }

    // Check if any user already in a slot
    const slotsSnap = await db.collection("slots").where("tournamentName", "==", tournamentName).get();
    for (let slotDoc of slotsSnap.docs) {
      const slot = slotDoc.data();
      if (slot.userIds && slot.userIds.some((id) => userIds.includes(id))) {
        return res.status(400).json({ message: "One or more users already joined a slot" });
      }
    }

    // Find slot
    const slotQuery = await db
      .collection("slots")
      .where("slotNumber", "==", slotNumber)
      .where("tournamentName", "==", tournamentName)
      .limit(1)
      .get();

    if (slotQuery.empty) return res.status(404).json({ message: "Slot not found" });

    const slotDoc = slotQuery.docs[0];
    if (slotDoc.data().userIds && slotDoc.data().userIds.length > 0) {
      return res.status(400).json({ message: "Slot already taken" });
    }

    await slotDoc.ref.update({ userIds });
    res.json({ message: "Slot joined successfully" });
  } catch (err) {
    console.error("Error in joinSlot:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get all slots
exports.getSlots = async (req, res) => {
  try {
    const { tournamentName } = req.query;
    const slotsSnap = tournamentName
      ? await db.collection("slots").where("tournamentName", "==", tournamentName).orderBy("slotNumber").get()
      : await db.collection("slots").orderBy("slotNumber").get();

    const slots = slotsSnap.docs.map((doc) => {
      const slot = doc.data();
      return {
        slotNumber: slot.slotNumber,
        userIds: slot.userIds || [],
        tournamentName: slot.tournamentName || null,
      };
    });

    res.json(slots);
  } catch (err) {
    console.error("Error in getSlots:", err);
    res.status(500).json({ message: err.message });
  }
};

// Reset slots
exports.resetSlots = async (req, res) => {
  try {
    const { tournamentName } = req.query;
    const slotsSnap = tournamentName
      ? await db.collection("slots").where("tournamentName", "==", tournamentName).get()
      : await db.collection("slots").get();

    const batch = db.batch();
    slotsSnap.forEach((doc) => batch.update(doc.ref, { userIds: [] }));
    await batch.commit();

    res.json({ message: tournamentName ? `Slots reset for ${tournamentName}` : "All slots reset" });
  } catch (err) {
    console.error("Error in resetSlots:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get participants
exports.getParticipants = async (req, res) => {
  try {
    const { tournamentName } = req.query;
    const slotsSnap = await db.collection("slots").where("tournamentName", "==", tournamentName).get();

    let participants = [];
    slotsSnap.forEach((doc) => {
      const slot = doc.data();
      if (slot.userIds && slot.userIds.length > 0) {
        participants.push(...slot.userIds);
      }
    });

    res.json(participants);
  } catch (err) {
    console.error("Error in getParticipants:", err);
    res.status(500).json({ message: err.message });
  }
};

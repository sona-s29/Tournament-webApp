const db = require("../src/config/firebase");
const tournaments = require("../src/models/tournaments");

async function seedSlots() {
  try {
    // Clear old slots
    const slotsSnap = await db.collection("slots").get();
    const batch = db.batch();
    slotsSnap.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    // Add fresh slots
    for (const tournament of tournaments) {
      let slotCount = 12;
      if (tournament.name === "CLASH SQUAD") slotCount = 4;
      if (tournament.name === "SOLO") slotCount = 2;

      for (let i = 1; i <= slotCount; i++) {
        await db.collection("slots").add({
          slotNumber: i,
          userIds: [],
          tournamentName: tournament.name,
        });
      }
    }
    console.log("Slots seeding complete.");
    process.exit();
  } catch (err) {
    console.error("Error seeding slots:", err);
    process.exit(1);
  }
}

seedSlots();

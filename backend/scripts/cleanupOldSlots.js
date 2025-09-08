const db = require("../src/config/firebase");
const admin = require("firebase-admin");

async function cleanupOldSlots() {
  try {
    const slotsSnap = await db.collection("slots").get();
    let updateCount = 0;

    for (const doc of slotsSnap.docs) {
      const data = doc.data();
      if ("userId" in data) {
        await doc.ref.update({ userId: admin.firestore.FieldValue.delete() });
        console.log(`Removed old userId field from slot: ${doc.id}`);
        updateCount++;
      }
    }

    console.log(`Cleanup complete. ${updateCount} slots updated.`);
    process.exit();
  } catch (err) {
    console.error("Cleanup failed:", err);
    process.exit(1);
  }
}

cleanupOldSlots();

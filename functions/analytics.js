const functions = require("firebase-functions");
const admin = require("firebase-admin");

const db = admin.firestore();

exports.process = functions.firestore
  .document("analytics/{id}")
  .onCreate(async (snapshot) => {
    const { userId, linkId, timestamp, type } = snapshot.data();

    if (type === "profileView") {
      db.collection("private")
        .doc(userId)
        .collection("analytics")
        .doc("profile")
        .collection("views")
        .add({
          type,
          timestamp,
        });
    }
    if (type === "linkClick") {
      db.collection("private")
        .doc(userId)
        .collection("analytics")
        .doc("links")
        .collection("clicks")
        .add({
          linkId,
          timestamp,
        });
    }
    const olderThan = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const oldClicksRef = db
      .collection("private")
      .doc(userId)
      .collection("analytics")
      .doc("links")
      .collection("clicks")
      .where("timestamp", "<", olderThan);

    const oldViewsRef = db
      .collection("private")
      .doc(userId)
      .collection("analytics")
      .doc("profile")
      .collection("views")
      .where("timestamp", "<", olderThan);

    const oldViewsSnapshot = await oldViewsRef.get();
    const oldClicksSnapshot = await oldClicksRef.get();

    oldViewsSnapshot.forEach(async (doc) => {
      await doc.ref.delete();
    });
    oldClicksSnapshot.forEach(async (doc) => {
      await doc.ref.delete();
    });
  });

const functions = require("firebase-functions");
const admin = require("firebase-admin");

const db = admin.firestore();

exports.add = functions.firestore
  .document("private/{user}/saved/{link}")
  .onCreate(async (snapshot, context) => {
    const { username } = (
      await db.collection("private").doc(context.params.user).get()
    ).data();

    const userRef = db.collection("public").doc(username);

    await userRef.set(
      {
        profileInfo: {
          saved: admin.firestore.FieldValue.increment(1),
        },
      },
      { merge: true }
    );

    const { savedUser } = snapshot.data();

    const { userId } = (
      await db.collection("public").doc(savedUser).get()
    ).data();

    await db.collection("private").doc(userId).collection("notifications").add({
      notificationFrom: username,
      notificationType: "saved",
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
  });

exports.remove = functions.firestore
  .document("private/{user}/saved/{link}")
  .onDelete(async (_, context) => {
    const { username } = (
      await db.collection("private").doc(context.params.user).get()
    ).data();

    const userRef = db.collection("public").doc(username);

    await userRef.set(
      {
        profileInfo: {
          saved: admin.firestore.FieldValue.increment(-1),
        },
      },
      { merge: true }
    );
  });

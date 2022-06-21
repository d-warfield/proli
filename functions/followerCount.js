const functions = require("firebase-functions");
const admin = require("firebase-admin");

const db = admin.firestore();

exports.add = functions.firestore
  .document("private/{user}/following/{followUser}")
  .onCreate(async (snapshot, context) => {
    const { username } = snapshot.data();
    const userRef = db.collection("public").doc(username);

    userRef.set(
      {
        profileInfo: {
          subscribers: admin.firestore.FieldValue.increment(1),
        },
      },
      { merge: true }
    );

    const { userId } = (
      await db.collection("public").doc(username).get()
    ).data();

    const { username: subscriber } = (
      await db.collection("private").doc(context.params.user).get()
    ).data();

    db.collection("private").doc(userId).collection("notifications").add({
      notificationType: "follower",
      notificationFrom: subscriber,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
  });

exports.remove = functions.firestore
  .document("private/{user}/following/{followUser}")
  .onDelete(async (snapshot) => {
    const { username } = snapshot.data();
    const userRef = db.collection("public").doc(username);

    userRef.set(
      {
        profileInfo: {
          subscribers: admin.firestore.FieldValue.increment(-1),
        },
      },
      { merge: true }
    );
  });

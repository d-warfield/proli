const functions = require("firebase-functions");
const admin = require("firebase-admin");

const db = admin.firestore();

exports.register = functions.https.onCall(async (data) => {
  const { email, username, password } = data;

  const existingUser = await db.collection("public").doc(username).get();
  if (existingUser.data()) {
    return {
      success: false,
      message: "This username is already taken.",
    };
  }

  try {
    const user = await admin.auth().createUser({
      email: email,
      emailVerified: false,
      password: password,
    });
    await db.collection("private").doc(user.uid).set({
      username: username,
    });
    await db
      .collection("public")
      .doc(username)
      .set({
        userId: user.uid,
        profileInfo: {
          imageUrl: "",
          displayName: username,
          bio: "",
          location: "",
        },
        theme: {
          background: {
            backgroundColor: "",
            backgroundImage:
              "https://dev-resources.pro.li/themes/default/gradient/gradient-2.webp",
          },
          button: {
            buttonBackgroundColor: "rgba(255, 255, 255, 0.473)",
            buttonBackgroundImage: "",
            buttonBorder: "",
            buttonBorderColor: "",
            buttonBorderRadius: "18px",
            buttonBoxShadow: "",
            buttonBoxShadowColor: "0px 3px 8px #00000027",
            buttonOutline: "none",
            buttonTextColor: "rgba(0, 0, 0, 0.842)",
            buttonBackdropFilter: "blur(25px)",
          },
          font: {
            fontFamily: "Poppins",
            fontStyle: "regular",
          },
          profile: {
            profileBackgroundColor: "rgba(255, 255, 255, 0.473)",
            profileTextColor: "rgba(0, 0, 0, 0.842)",
            profileBorder: "none",
          },
        },
      });
    await db
      .collection("public")
      .doc(username)
      .collection("links")
      .doc()
      .set({
        position: 0,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        linkType: "default",
        linkInfo: {
          linkTitle: "Enter Title",
          linkUrl: "",
        },
        linkMedia: {
          imageUrl: "",
        },
        linkControl: {
          active: true,
          isLocked: false,
        },
      });
    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
});

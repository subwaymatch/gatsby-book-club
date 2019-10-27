const functions = require("firebase-functions")
const admin = require("firebase-admin")

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
admin.initializeApp()

exports.createAuthor = functions.https.onCall(async (data, context) => {
  checkAuthentication(context, true)

  validateData(data, {
    authorName: "string",
  })

  const author = await admin
    .firestore()
    .collection("authors")
    .where("name", "==", data.authorName)
    .limit(1)
    .get()

  if (!author.empty) {
    throw new functions.https.HttpsError(
      "already-exists",
      "This author already exists"
    )
  }

  return admin
    .firestore()
    .collection("authors")
    .add({
      name: data.authorName,
    })
})

exports.createPublicProfile = functions.https.onCall(async (data, context) => {
  checkAuthentication(context)
  validateData(data, {
    username: "string",
  })

  const userProfile = await admin
    .firestore()
    .collection("publicProfiles")
    .where("userId", "==", context.auth.uid)
    .limit(1)
    .get()

  if (!userProfile.empty) {
    throw new functions.https.HttpsError(
      "already-exists",
      "This user already has a public profile"
    )
  }

  const user = await admin.auth().getUser(context.auth.uid)

  if (user.email === functions.config().accounts.admin) {
    await admin.auth().setCustomUserClaims(context.auth.uid, {
      isAdmin: true,
    })
  }

  const publicProfile = await admin
    .firestore()
    .collection("publicProfiles")
    .doc(data.username)
    .get()

  if (publicProfile.exists) {
    throw new functions.https.HttpsError(
      "already-exists",
      "This username already belongs to an existing user"
    )
  }

  return admin
    .firestore()
    .collection("publicProfiles")
    .doc(data.username)
    .set({
      userId: context.auth.uid,
    })
})

exports.postComment = functions.https.onCall((data, context) => {
  checkAuthentication(context)
  validateData(data, {
    bookId: "string",
    text: "string",
  })

  const db = admin.firestore()
  return db
    .collection("publicProfiles")
    .where("userId", "==", context.auth.uid)
    .limit(1)
    .get()
    .then(snapshot => {
      return db.collection("comments").add({
        text: data.text,
        username: snapshot.docs[0].id,
        dateCreated: new Date(),
        book: db.collection("books").doc(data.bookId),
      })
    })
})

function validateData(data, validKeys) {
  if (Object.keys(data).length !== Object.keys(validKeys).length) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Data object contains invalid number of properties"
    )
  } else {
    for (let key in data) {
      if (!validKeys[key] || typeof data[key] !== validKeys[key]) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "Data object contains invalid data type"
        )
      }
    }
  }
}

function checkAuthentication(context, isAdmin = false) {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be signed in to use this feature"
    )
  } else if (!context.auth.token.isAdmin && isAdmin) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "You must be an admin to use this feature"
    )
  }
}

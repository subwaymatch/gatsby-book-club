const functions = require("firebase-functions")
const admin = require("firebase-admin")

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.postComment = functions.https.onCall((data, context) => {
  const db = admin.firestore()
  return db
    .collection("publicProfiles")
    .where("userId", "==", context.auth.uid)
    .limit(1)
    .get()
    .then(snapshot => {
      return db.collection("comments").add({
        text: data.text,
        username: snapshot.docs[0].ref,
        dateCreated: new Date(),
        book: db.collection("books").doc(data.bookId),
      })
    })
})

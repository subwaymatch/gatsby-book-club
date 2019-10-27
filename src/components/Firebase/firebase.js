import firebaseConfig from "./config"
import axios from "axios"

class Firebase {
  constructor(app) {
    if (!firebaseInstance) {
      app.initializeApp(firebaseConfig)

      this.auth = app.auth()
      this.db = app.firestore()
      this.functions = app.functions()
      this.storage = app.storage()
    }
  }

  getUserProfile({ userId, onSnapshot }) {
    return this.db
      .collection("publicProfiles")
      .where("userId", "==", userId)
      .limit(1)
      .onSnapshot(onSnapshot)
  }

  subscribeToBookComments({ bookId, onSnapshot }) {
    const bookRef = this.db.collection("books").doc(bookId)
    return this.db
      .collection("comments")
      .where("book", "==", bookRef)
      .orderBy("dateCreated", "desc")
      .onSnapshot(onSnapshot)
  }

  async postComment({ text, bookId }) {
    const postCommentCallable = this.functions.httpsCallable("postComment")

    return postCommentCallable({
      text,
      bookId,
    })
  }

  async createAuthor({ authorName }) {
    const createAuthorCallable = this.functions.httpsCallable("createAuthor")
    return createAuthorCallable({
      authorName,
    })
  }

  async getAuthors() {
    return this.db.collection("authors").get()
  }

  async createBook({ bookName, authorId, bookCover, summary }) {
    const createBookCallable = this.functions.httpsCallable("createBook")
    return createBookCallable({
      bookName,
      authorId,
      bookCover,
      summary,
    })
  }

  async register({ username, email, password }) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    )

    const createProfileCallable = this.functions.httpsCallable(
      "createPublicProfile"
    )

    return createProfileCallable({
      username,
    })
  }

  async login({ email, password }) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  async logout() {
    await this.auth.signOut()
  }
}

let firebaseInstance

function getFirebaseInstance(app) {
  if (!firebaseInstance && app) {
    firebaseInstance = new Firebase(app)
    return firebaseInstance
  } else if (firebaseInstance) {
    return firebaseInstance
  } else {
    return null
  }
}

export default getFirebaseInstance

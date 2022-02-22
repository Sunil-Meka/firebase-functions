const { firestore } = require("firebase-admin");
const { db, admin } = require("../../utils/admin");
const { merge } = require("./controller");
const UTILS = require("./utils");

class Model {
  constructor(user) {
    this.actionperformer = user;
    this.servertimestamp = firestore.FieldValue.serverTimestamp();
  }

  async _create(inputs) {
    const docId = await db.collection("TODO").doc();
    return docId
      .set({
        ...inputs,
        createdAt: this.servertimestamp,
        uid: this.actionperformer.uid,
        isExists: true,
        isCompleted: false,
        updatedAt: this.servertimestamp,
        docId: docId.id,
      })
      .catch((err) => {
        throw err;
      });
  }

  async _update(inputs, docId) {
    //const docRef = await db.collection("TODO").doc(docId).get();
    return UTILS._checkUser(this.actionperformer.uid, docId)
      .then((doc) => {
        return db
          .collection("TODO")
          .doc(docId)
          .update({
            ...inputs,
            updatedAt: this.servertimestamp,
          });
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = Model;

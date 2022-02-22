const { db } = require("../../utils/admin");

class UTILS {
  static async _checkUser(uid, docId) {
    console.log(uid, docId);
    return db
      .collection("TODO")
      .where("uid", "==", uid)
      .where("docId", "==", docId)
      .get()
      .then((snapshot) => {
        if (snapshot.size < 1) {
          throw new Error("document not found");
        }
        return snapshot.docs[0];
      });
  }
}

module.exports = UTILS;

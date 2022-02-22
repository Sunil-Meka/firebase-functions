const functions = require("firebase-functions");
const app = require("express")()
const { admin, db } = require("./utils/admin")

app.use("/auth",require("./services/Authenication/controller"))
app.use("/todo",require("./services/todo/controller"))

exports.app = functions.https.onRequest(app);
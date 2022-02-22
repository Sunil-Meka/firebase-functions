const res = require("express/lib/response");
const { object } = require("firebase-functions/v1/storage");
const { db, admin } = require("../../utils/admin");
const UTILS = require("./utils");

class Model{
	constructor(user){
		this.actionperformer = user
		this.serverTimestamp = admin.firestore.FieldValue.serverTimestamp()
	}

	async _createUser(inputs){
		return admin
		.auth()
		.createUser({ email: inputs.email, password: inputs.password }).then((user) => {
		  const userinfo = {}
		  const userRef = db.collection("USERS").doc(user.uid)
		  Object.entries(inputs).forEach(([key,value])=>{
			  if(key!=="password"){
				userinfo[key]=value;
			  }
		  })
		  return userRef.set({
			...userinfo,
			isExists: true,
			createdAt: this.serverTimestamp,
			uid: user.uid,
			role: "user"
		  });
		})
		.catch((err) => {
			throw err
		});
	}
	
	async _updateUser(uid,inputs){
		return admin.auth().updateUser(uid, {
			email: inputs.email
	}).then((user)=> {
		return db.collection('USERS').doc(user.uid).update({
			email: inputs.email,
			phoneNumber: inputs.phoneNumber
	})}).catch((err)=>{
	throw err
	})
	}

	async _getUser(uid){
		let userinfo = {};
		return UTILS.checkUserExists(uid).then((user)=>{
		return admin.auth().getUser(user.uid)}).then((user)=>{
		 userinfo = {...user,...userinfo};
		return db.collection('USERS').doc(user.uid).get().then((doc)=>{
			userinfo = {...userinfo,...doc.data()}
		return userinfo
		})
	}).catch((err)=>{
		throw err
	})
	}

	async _deleteUser(uid){
		return UTILS.checkUserDeleted(uid).then((user)=>{
		 return admin.auth().updateUser(user.uid,{ disabled: true})
		}).then((user)=> {
			return db.collection('USERS').doc(user.uid).update({
				isExists: false
			})
		}).catch((err)=>{
			throw err
		})
	}

	async _enableUser(uid){
		return UTILS.checkUserEnabled(uid).then((user)=>{
		return admin.auth().updateUser(user.uid,{disabled: false}).then((user)=>{
			return db.collection('USERS').doc(user.uid).update({
				isExists: true
			})}).catch((err)=>{
				throw err
			})
		}	)
	}

}

module.exports = Model
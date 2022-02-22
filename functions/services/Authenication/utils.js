const { db } = require("../../utils/admin");

class UTILS{
	static async checkUserExists(uid){
		return db.collection("USERS").where("uid","==",uid).where("isExists","==",true).get().then((querySnapshot)=>{
			if(querySnapshot.size<1){
				throw new Error("User not found");
			}
			return querySnapshot.docs[0].data();
		}).catch((err)=>{
			throw err
		})
	}

	static async checkUserDeleted(uid){
		return db.collection("USERS").where("uid","==",uid).where("isExists","==",false).get().then((querySnapshot)=>{
			if(querySnapshot.size<1){
				return db.collection("USERS").where("uid","==",uid).where("isExists","==",true).get().then((querySnapshot)=>{
					if(querySnapshot.size<1){
						throw new Error("User not found");
					}
					return querySnapshot.docs[0].data();
				})
			}
			throw new Error("User already deleted");
		}).catch((err)=>{
			throw err
		})
	}

	static async checkUserEnabled(uid){
		return db.collection("USERS").where("uid","==",uid).where("isExists","==",false).get().then((querySnapshot)=>{
			if(querySnapshot.size<1){
				throw new Error("User not found, user may enabled already");
			}
			return querySnapshot.docs[0].data();
		}).catch((err)=>{
			throw err
		})
	}
}

module.exports = UTILS;
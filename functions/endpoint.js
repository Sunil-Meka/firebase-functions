const {admin} = require("./utils/admin")

const closedend = (req,res,next) => {
	if(req.headers.authorization){
		const token = req.headers.authorization.split(" ").pop();
		return admin.auth().verifyIdToken(token).then((decodedtoken)=>{
			const { uid } = decodedtoken
			return admin.firestore().collection('USERS').doc(uid).get()
		}).then((documentSnapshot) => {
			if (!documentSnapshot.exists) throw new Error('no-user-found')
			req.user = documentSnapshot.data()
			console.log(req.user)
			return next()
		}).catch((err) => {
			console.error(err)
			return res.status(500).json({message:`invalid token`})
		})
	}
	else{
		return res.status(403).json({message:`unauthorized`})
	}
}

module.exports = closedend
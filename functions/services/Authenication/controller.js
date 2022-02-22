const router = require('express').Router();
const closedend = require('../../endpoint');
const Model = require('./model');

router.post("/createUser", (req, res) => {
	  const inputs = req.body;
	  const obj = new Model();
	  return obj._createUser(inputs).then(() => {
		return res.status(201).json({message: `User created successfully`})
	  }).catch((err)=>{
		  console.log(err);
		  return res.status(500).json({message: `Something went wrong`})
	  })
})

router.patch("/updateUser",closedend, (req, res) => {
	const inputs = req.body;
	const {uid} = req.query;
	const obj = new Model(req.user);
	return obj._updateUser(uid, inputs).then(()=>{
		return res.status(200).json({message: `User updated successfully`})
	}).catch((err)=>{
		console.log(err);
		return res.status(500).json({message: `Something went wrong`})
	})
})

router.get("/getUser",closedend, (req, res) => {
	const {uid} = req.query;
	const obj = new Model(req.user);
	return obj._getUser(uid).then((userinfo)=>{
		return res.status(201).json({message: userinfo})
	}).catch((err)=>{
		console.log(err);
		return res.status(500).json({message: `Something went wrong`})
	})
})

router.delete("/deleteUser",closedend, (req, res) => {
	const {uid}= req.query;
	const obj = new Model(req.user);
	return obj._deleteUser(uid).then(()=>{
		return res.status(200).json({message: `User deleted successfully`})
	}).catch((err)=>{
		console.log(err);
		return res.status(500).json({message: `Something went wrong`})
	})
})

router.put("/enableUser", (req, res) => {
	const {uid} = req.query;
	const obj = new Model(req.user);
	return obj._enableUser(uid).then(()=>{
		return res.status(200).json({message: `User enabled successfully`})
	}).catch((err)=>{
		return res.status(500).json({message: `Something went wrong`})
	})
})



module.exports = router;	
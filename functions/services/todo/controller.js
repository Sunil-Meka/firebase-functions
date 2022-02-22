const router = require("express").Router();
const closedend = require("../../endpoint");
const Model = require("./model");

router.post("/create", closedend, (req, res) => {
  const inputs = req.body;
  const obj = new Model(req.user);
  return obj
    ._create(inputs)
    .then(() => {
      return res.status(201).json({ message: `Todo created successfully` });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: `Something went wrong` });
    });
});

router.patch("/update", closedend, (req, res) => {
  const inputs = req.body;
  const { docId } = req.query;
  const obj = new Model(req.user);
  return obj
    ._update(inputs, docId)
    .then(() => {
      return res.status(201).json({ message: `todo updated successfully` });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: `something went wrong` });
    });
});

module.exports = router;

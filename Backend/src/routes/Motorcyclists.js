const express = require("express");
const router = express.Router();
const motorcyclist = require("..//models/Motorcyclist");

router.get("/", (req, res) => {
  motorcyclist
    .find({})
    .then((data) => {
      console.log("validd", data);
      res.status(200).json(data);
    })
    .catch((err) => {
      res.json({ error: err });
      console.log("Invalid", err);
    });
});

router.get("/available", (req, res) => {
  motorcyclist
    .find({ taken: false })
    .then((resp) => {
      res.status(201).json(resp);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
      console.log(err);
    });
});

router.get("/select", (req, res) => {
  motorcyclist
    .findOne({ taken: false })
    .then((resp) => {
      resp != null
        ? res.status(200).json({ id: resp._id })
        : res.status(404).json({ message: "No available services now" });
    })
    .catch((err) => {
      console.log(err);
    });
});

// router.post("/", (req, res) => {
//   motorcyclist
//     .insertMany([
//       { taken: false, takenBy: null },
//       { taken: false, takenBy: null },
//       { taken: false, takenBy: null },
//       { taken: false, takenBy: null },
//       { taken: false, takenBy: null },
//       { taken: false, takenBy: null },
//       { taken: false, takenBy: null },
//       { taken: false, takenBy: null },
//     ])
//     .then((data) => {
//       console.log("Valid", data);
//     })
//     .catch((err) => {
//       console.log("Invalid", err);
//     });
// });

router.put("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    var obj = await motorcyclist.findById(req.params.id);
    var isTaken = obj.taken;
    var updatedMotoService;

    console.log("TAKEN", isTaken);

    if (isTaken) {
      updatedMotoService = await motorcyclist.updateOne(
        { _id: req.params.id },
        { $set: { taken: !isTaken, takenBy: null } }
      );
      res.status(200).json(updatedMotoService);

      console.log(updatedMotoService);
    } else {
      updatedMotoService = await motorcyclist.updateOne(
        { _id: req.params.id },
        { $set: { takenBy: req.body.userId, taken: !isTaken } }
      );
      console.log(req.body.userId);
      res.status(200).json(updatedMotoService);
    }
  } catch (err) {
    console.log("ERR", err);
    res.status(400).json({ error: err });
  }
});
module.exports = router;

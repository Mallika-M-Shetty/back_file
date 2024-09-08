const express = require("express");
const router = express.Router();

//@route GET api/team/
//@des get all the team members data
//@access Public
router.get("/", (req, res) => res.json({ msg: "Services Work" }));

//@route GET api/services/
//@des get all the services
//@access Public

// router.get("/", function (req, res) {
//   User.find({}, function (err, users) {
//     var userMap = {};

//     users.forEach(function (user) {
//       userMap[user._id] = user;
//     });

//     res.send(userMap);
//   });
// });

module.exports = router;

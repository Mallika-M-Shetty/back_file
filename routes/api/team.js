const express = require("express");
const router = express.Router();
const Team = require("../../models/Team");
const passport = require("passport");
const validateTeamInput = require("../../validation/team");
const validateServiceInput = require("../../validation/services");
const team = require("../../validation/team");

//@route Post api/team/
//@des Create Team
//@access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTeamInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const teamfileds = {};
    if (req.body.name) teamfileds.name = req.body.name;
    if (req.body.title) teamfileds.title = req.body.title;
    if (req.body.email) teamfileds.email = req.body.email;
    if (req.body.phone) teamfileds.phone = req.body.phone;
    if (req.body.shortBio) teamfileds.shortBio = req.body.shortBio;
    if (req.body.fullBio) teamfileds.fullBio = req.body.fullBio;
    if (req.body.status) teamfileds.status = req.body.status;

    teamfileds.social = {};
    if (req.body.twitter) teamfileds.social.twitter = req.body.twitter;
    if (req.body.facebook) teamfileds.social.facebook = req.body.facebook;
    if (req.body.linkedin) teamfileds.social.linkedin = req.body.linkedin;

    Team.findById(req.body.id).then((team) => {
      if (team) {
        console.log("update:");
        Team.findOneAndUpdate(
          {
            _id: req.body.id,
          },
          {
            $set: teamfileds,
          },
          { new: true }
        ).then((team) => res.json(team));
      } else {
        console.log("insert");
        new Team(teamfileds).save().then((newTeam) => res.json(newTeam));
      }
    });
  }
);

//@route GET api/team/
//@des get all the team members data
//@access Public

router.get("/all", (req, res) => {
  const errors = {};

  Team.find({})
    .then((team) => {
      if (!team) {
        errors.noteam = "There is no team in database";
        return res.status(404).json(errors);
      }
      res.json(team);
    })
    .catch((err) => res.status(404).json(err));
});

//@route GET api/team/services
//@des insert team services
//@access Public

router.post(
  "/services",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateServiceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    Team.findById(req.body.id)
      .then((team) => {
        if (team) {
          const newService = {
            title: req.body.title,
            summary: req.body.summary,
          };
          team.services.unshift(newService);
          team.save().then((team) => res.json(team));
          console.log("success in services:");
          Team.findOneAndUpdate(
            {
              _id: req.body.id,
            },
            {
              $set: teamfileds,
            },
            { new: true }
          ).then((team) => res.json(team));
        } else {
          console.log("error in insert services");
          // new Team(teamfileds).save().then((newTeam) => res.json(newTeam));
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

//@route GET api/team/delete
//@des delete  team members by id
//@access Private

router.delete(
  "/services/:service_ID/:docID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    console.log("Document ID:", req.params.docID);
    console.log("service ID:", req.params.service_ID);
    Team.findById(req.params.docID)
      .then((teamProfile) => {
        console.log("Find ID WORKS:");
        const removeIndex = teamProfile.services
          .map((item) => item.id)
          .indexOf(req.params.service_ID);

        teamProfile.services.splice(removeIndex, 1);
        teamProfile.save().then((team) => res.json(team));
      })
      .catch((err) => {
        errors.noTeam = "Something wrong in delete services";
        return res.status(404).json(errors);
      });
  }
);

//@route GET api/teamMember
//@des delete  team members by id
//@access Private

router.delete(
  "/:docID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    console.log("Document ID:", req.params.docID);
    console.log("service ID:", req.params.service_ID);
    Team.findOneAndRemove(req.params.docID)
      .then(() => {
        console.log("Delete Team Works");
        res.json({ success: true });
      })
      .catch((err) => {
        errors.DeleteProfile = "Something wrong in delete Profile";
        return res.status(404).json(errors);
      });
  }
);

//@route GET api/team/:byID
//@des get  team members by id
//@access Public

router.get("/:byID", (req, res) => {
  const errors = {};

  Team.findById(req.params.byID)
    .then((teamProfile) => {
      if (!teamProfile) {
        errors.noTeam = "There is no team member on this id";
        return res.status(404).json(errors);
      }
      res.json(teamProfile);
    })
    .catch((err) => {
      errors.noTeam = "There is no team member on this id";
      return res.status(404).json(errors);
    });
});

module.exports = router;

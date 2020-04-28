const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

////

//// User Authentication Routes

// Login Form

router.get("/login", (req, res) => {
  res.render("./users/login");
});

// Login Logic
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/user/login",
  }),
  (req, res) => {}
);

// Logout Logic

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

////

// INDEX
router.get("/", (req, res) => {
  let allUser;
  User.find({}, (err, data) => {
    allUser = data;
    res.render("./users/index", { allUser: allUser });
  });
});
// NEW
router.get("/new", (req, res) => {
  res.render("./users/new");
});
// CREATE
router.post("/", (req, res) => {
  User.find({ name: req.body.name }, (err, oldUser) => {
    if (oldUser.length > 0) {
      console.log("A user with the given name is already existed");
      res.redirect("/user/new");
    } else {
      let newUser = {
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
        description: req.body.description,
      };
      User.register(newUser, req.body.password, (err, user) => {
        if (err) {
          console.log(err);
          return res.redirect("/new");
        }
        passport.authenticate("local")(req, res, () => {
          res.redirect("/");
        });
      });
    }
  });
});
// SHOW - not owner
router.get("/:name", (req, res) => {
  let userName = req.params.name;
  User.find({ name: userName }, (err, data) => {
    res.render("./users/show", { data: data });
  });
});

// SHOW - owner
router.get("/:name/profile", (req, res) => {
  let userName = req.params.name;
  User.find({ name: userName }, (err, data) => {
    res.render("./users/profile", { data: data });
  });
});
// EDIT
router.post("/:id/edit", (req, res) => {
  res.send("Hello from edit");
});
// UPDATE
router.put("/:id", (req, res) => {
  res.send("Hello from update");
});
// DESTROY
router.delete("/:id", (req, res) => {
  res.send("Hello from destroy");
});
////

module.exports = router;

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const User = require("./models/user");
const methodOverride = require("method-override");

const app = express();

// set MongoDB database

let port = process.env.PORT || 3000;
let url = process.env.DATABASE_URL;

// connecting the database

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// drop all collections

// story.collection.drop();
// user.collection.drop();
// storyId.collection.drop();

// set view engine to ejs
app.set("view engine", "ejs");

// set directory path

app.use(express.static(__dirname + "/public"));
app.set("views", "./views");

// set express

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// setup PASSPORT JS
app.use(
  session({
    secret: "Cat is good",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// add middleware to pass current user info to every template
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// routers

const userRoutes = require("./routes/users");
const storyRoutes = require("./routes/stories");
app.use("/user", userRoutes);
app.use("/story", storyRoutes);

// INDEX

app.get("/", (req, res) => {
  res.render("./pages/home");
});

///

app.listen(port, () => console.log("Server is listening on port 3000!"));

const Story = require("../models/story");
const Comment = require("../models/comment");
const User = require("../models/user");

const middlewareObj = {};

middlewareObj.isLoggedin = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/user/login");
};

middlewareObj.checkStoryOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Story.findOne({ storyCount: req.params.id }, (err, story) => {
      if (err || !story) {
        console.log(err);
        res.redirect("back");
      } else {
        // check ownership
        if (story.author.id.equals(req.user._id)) {
          req.story = story;
          next();
        } else {
          console.log(err);
          res.redirect("/story/" + req.params.id);
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

middlewareObj.checkCommentOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, comment) => {
      if (err || !comment) {
        console.log(err);
        res.redirect("/story");
      } else {
        // check comment ownership
        if (comment.author.id.equals(req.user._id)) {
          req.comment = comment;
          next();
        } else {
          console.log(err);
          res.redirect("/story/" + req.params.id);
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

middlewareObj.checkUserOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    User.findOne({ name: req.params.name }, (err, user) => {
      if (err || !user) {
        console.log(err);
        res.redirect("back");
      } else {
        // check ownership
        if (user._id.equals(req.user._id)) {
          req.user = user;
          next();
        } else {
          console.log(err);
          res.redirect("/user/" + req.params.name);
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

module.exports = middlewareObj;

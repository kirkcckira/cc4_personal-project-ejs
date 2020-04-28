const express = require("express");
const router = express.Router();
const moment = require("moment");

const Story = require("../models/story");
const StoryCount = require("../models/storyCount");
const Comment = require("../models/comment");
const middleware = require("../middleware/middleware");

// SEED
let dummy = new Story({
  title: "ไก่ป่ากับสุนัขจิ้งจอก",
  body: `กาลครั้งหนึ่งนานมาแล้ว กลางป่าใหญ่อันอุดมสมบูรณ์มีสัตว์น้อยใหญ่ชนิดต่าง ๆ อาศัยอยู่ด้วยกันมากมาย โดยทุกเช้าพวกสัตว์เหล่านี้จะได้รับการปลุกให้ตื่นขึ้นมาหาอาหารหรือวิ่งเล่นอย่างสำราญใจโดยเจ้าไก่ป่า และในเช้าวันนี้ไก่ป่าก็ทำหน้าที่แบบไม่มีขาดตกบกพร่องเช่นเดิม  "เอก อี้ เอ้ก เอ้ก !" เสียงไก่ป่าขันบนปลายต้นไม้ใหญ่ เป็นสัญญาณเตือนว่าพระอาทิตย์ได้ขึ้นมาส่องแสงแล้ว

    "เอก อี้ เอ้ก เอ้ก !" เจ้าไก่ป่าขันซ้ำก่อนจะก้มลงมองไปด้านล่างต้นไม้ เพื่อที่มันจะได้ออกหาอาหารต่อไป แต่ใต้ต้นไม้วันนี้ไม่เหมือนวันที่ผ่าน ๆ มา เพราะไก่ป่ามองเห็นแววตาอันน่ากลัวของสุนัขจิ้งจอก ที่จ้องมองมันราวกับหวังจะได้กินเหยื่อให้อิ่มท้อง

    "สวัสดีสุนัขจิ้งจอก เธอมีธุระอะไรหรือเปล่า" ไก่ป่าเอ่ยถามด้วยน้ำเสียงเรียบเฉย ทั้ง ๆ ที่ในใจของมันรู้สึกหวาดหวั่น แต่ก็ต้องสยบอารมณ์นั้นเอาไว้ "อ่อ สวัสดีไก่ป่า ที่ฉันมาในวันนี้เพราะมีข่าวดีมาบอก" สุนัขจิ้งจอกตอบพร้อมรอยยิ้มเจ้าเล่ห์

    "ข่าวดีอะไรหรือ ?" ตอนนี้ไก่ป่าถามกลับด้วยความสงสัยปนไม่สบายใจ ด้วยกลัวว่าจะมีภัยมาถึงตัว

    "เธอคงยังไม่รู้สินะ ที่ป่าของเราเพิ่งจะมีข้อตกลงว่าสัตว์ทุกตัวจะไม่ทำร้ายกัน สัตว์ทุกตัวจะกลายเป็นพี่น้องกันแล้ว" สุนัขจิ้งจอกกล่าว "พอได้ยินแบบนี้ฉันก็ดีใจมากจริง ๆ เอาอย่างนี้ เธอลงมาข้างล่างเถอะ ฉันอยากสวมกอดเธอสักครั้ง ให้สมกับที่เรากลายมาเป็นพี่น้องกันยังไงล่ะ"
    ได้ยินอย่างนั้นแล้วไก่ป่ากลับยิ่งสงสัย แต่ด้วยความฉลาดของมัน จึงแกล้งออกอุบาย "โอ้ ดูนั่นสิ สิงโตกำลังผ่านมาทางนี้ พอดีเลยเรา 3 ตัวจะได้ทักทายสวมกอดแบบพี่น้องกันสักที" ไก่ป่าแสร้งพูดแม้ว่าตรงบริเวณนั้นยังไม่มีสิงโตโผล่มาก็ตาม

          "ว่ายังไงนะ สิงโตมางั้นเหรอ ?!" สุนัขจิ้งจอกอุทานด้วยความตกใจ

          "ใช่แล้ว ถ้าอย่างนั้นพวกเรารอสิงโตเดินมาทางนี้ก่อนแล้วกันนะ" ไก่ป่าที่หวาดกลัวในใจยังข่มอารมณ์ได้อยู่
          "เออ แต่เหมือนฉันมีธุระต้องทำ เห็นทีคงอยู่ต่อไม่ได้แล้ว ขอตัวก่อนล่ะกันนะ" พูดจบแล้วสุนัขจิ้งจอกก็วิ่งหนีหายไปอย่างรวดเร็ว

          "โธ่ จะรีบไปไหน รอสิงโตพี่น้องของเราก่อนสิ" ไก่ป่าตะโกนถามด้วยน้ำเสียงของผู้ชนะ เพราะมันรู้ว่าเรื่องทั้งหมดเป็นแค่คำหลอกลวงที่สุนัขจิ้งจอกพูด เพื่อให้ไก่ป่าลงไปเป็นเหยื่ออย่างง่ายดายก็เท่านั้น

          "เฮ้อ ขอฉันนอนพักก่อนสักนิดแล้วกันนะ เจอเรื่องน่าตื่นเต้นแต่เช้าเลยเรา" ไก่ป่าบ่นพึมพำก่อนนอนพักอย่างสบายใจ ด้วยรู้แน่แล้วว่าสติของมันทำให้รอดเรื่องเลวร้ายครั้งนี้ไปได้
          นิทานเรื่องนี้สอนให้รู้ว่า : ไม่ว่าจะเกิดปัญหาร้ายแรงแค่ไหนขึ้นก็ตาม เราควรรักษาสติไว้ให้ดี พร้อมกับคิดหาทางออกอย่างชาญฉลาด เพียงเท่านี้เราก็จะผ่านพ้นอุปสรรคและปัญหาต่าง ๆ ไปได้`,
  createdDate: moment(),
  image: ["https://img.kapook.com/u/2020/jutharat/qq1/zv40.jpg"],
  id: 1,
});

///

// INDEX
router.get("/", (req, res) => {
  Story.find({})
    .sort({ _id: -1 })
    .exec((req, data) => {
      let date = [];
      data.forEach((item) => {
        date.push(moment(item.createdDate).format("YYYY-MMM-DD"));
      });
      res.render("./stories/index", {
        allStory: data,
        date: date,
      });
    });
});
// NEW
router.get("/new", middleware.isLoggedin, (req, res) => {
  res.render("./stories/new");
});

// CREATE
router.post("/", middleware.isLoggedin, (req, res) => {
  let currentId;
  let img;
  let date = moment().format("YYYY-MMM-DD");
  StoryCount.findOne({}, (err, foundData) => {
    if (err) {
      console.log(err);
    } else {
      currentId = foundData.lastId + 1;
      StoryCount.updateOne({}, { lastId: currentId }, (err, countData) => {
        if (err) {
          console.log(err);
        } else {
          if (req.body.image != "") {
            img = req.body.image.replace(" ", "");
            img = img.split(",");
          } else {
            img = null;
          }
          let tag = req.body.tag.replace(" ", "");
          tag = tag.split(",");
          let title = req.body.title;
          let body = req.body.body;
          let newStory = {
            title: title,
            image: img,
            tag: tag,
            body: body,
            storyCount: currentId,
            createdDate: date,
            author: {
              id: req.user._id,
              name: req.user.name,
            },
          };
          Story.create(newStory, (err, data) => {
            if (err) {
              console.log(err);
            } else {
              res.redirect("/story");
            }
          });
        }
      });
    }
  });
});
// SHOW
router.get("/:id", (req, res) => {
  Story.findOne({ storyCount: req.params.id })
    .populate("comments")
    .exec((err, story) => {
      if (err) {
        console.log(err);
        res.redirect("back");
      } else {
        res.render("./stories/show", { story: story });
      }
    });
});
// EDIT
router.get(
  "/:id/edit",
  middleware.isLoggedin,
  middleware.checkStoryOwnership,
  (req, res) => {
    res.render("./stories/edit", { story: req.story });
  }
);
// EDIT PUT request
router.put("/:id", middleware.checkStoryOwnership, (req, res) => {
  let img;
  if (req.body.image != "") {
    img = req.body.image.replace(" ", "");
    img = img.split(",");
  } else {
    img = null;
  }
  let tag = req.body.tag.replace(" ", "");
  tag = tag.split(",");
  let updatedStory = {
    title: req.body.title,
    body: req.body.body,
    image: img,
    tag: tag,
  };
  Story.findOneAndUpdate(
    { storyCount: req.params.id },
    updatedStory,
    (err, story) => {
      if (err) {
        console.log(err);
        res.redirect("/story");
      } else {
        res.redirect("/story/" + req.params.id);
      }
    }
  );
});
// DESTROY
router.delete("/:id", middleware.checkStoryOwnership, (req, res) => {
  Story.findOneAndRemove(
    { storyCount: req.params.id },
    { useFindAndModify: false },
    (err, story) => {
      if (err) {
        console.log(err);
        res.redirect("back");
      } else {
        res.redirect("/story/");
      }
    }
  );
});

///

/// COMMENT ROUTES

// NEW
router.get("/:id/comments/new", (req, res) => {
  Story.findOne({ storyCount: req.params.id }, (err, story) => {
    if (err) {
      console.log(err);
    } else {
      res.render("./comments/new", { story: story });
    }
  });
});
// CREATE
router.post("/:id/comments/", (req, res) => {
  Story.findOne({ storyCount: req.params.id }, (err, story) => {
    if (err) {
      console.log(err);
    } else {
      let newComment = {
        comment: req.body.comment,
      };
      if (req.body.commentator) {
        newComment.commentator = req.body.commentator;
        Comment.create(newComment, (err, createdComment) => {
          if (err) {
            console.log(err);
          } else {
            // add new comment to the story
            story.comments.push(createdComment);
            story.save();
            res.redirect("/story/" + req.params.id);
          }
        });
      } else {
        Comment.create(newComment, (err, createdComment) => {
          if (err) {
            console.log(err);
          } else {
            // add logged in user to the comment
            createdComment.author.id = req.user._id;
            createdComment.author.name = req.user.name;
            createdComment.save();
            // add new comment to the story
            story.comments.push(createdComment);
            story.save();
            res.redirect("/story/" + req.params.id);
          }
        });
      }
    }
  });
});
// EDIT
router.get(
  "/:id/comments/:comment_id/edit",
  middleware.isLoggedin,
  middleware.checkCommentOwnership,
  (req, res) => {
    res.render("./comments/edit", {
      storyCount: req.params.id,
      comment: req.comment,
    });
  }
);
// EDIT PUT request
router.put(
  "/:id/comments/:comment_id",
  middleware.isLoggedin,
  middleware.checkCommentOwnership,
  (req, res) => {
    let updatedComment = {
      comment: req.body.comment,
    };
    Comment.findByIdAndUpdate(
      req.params.comment_id,
      updatedComment,
      (err, comment) => {
        if (err) {
          console.log(err);
          res.redirect("back");
        } else {
          res.redirect("/story/" + req.params.id);
        }
      }
    );
  }
);
// EDIT DESTROY
router.delete(
  "/:id/comments/:comment_id",
  middleware.checkCommentOwnership,
  (req, res) => {
    Comment.findByIdAndRemove(
      req.params.comment_id,
      { useFindAndModify: false },
      (err, comment) => {
        if (err) {
          console.log(err);
          res.redirect("back");
        } else {
          res.redirect("/story/" + req.params.id);
        }
      }
    );
  }
);

///

/// SEARCH ROUTES

// SEARCH - from navbar
router.post("/search/", (req, res) => {
  let regex = new RegExp(req.body.query, "i");
  Story.find({ $or: [{ body: regex }, { tag: regex }, { title: regex }] })
    .sort({ _id: -1 })
    .exec((err, story) => {
      let date = moment(story.createdDate).format("YYYY-MMM-DD");
      res.render("./stories/search", {
        story: story,
        query: req.body.query,
        date: date,
        tag: undefined,
      });
    });
});
// SEARCH - from tag
router.get("/tag/:tag", (req, res) => {
  let regex = new RegExp(req.params.tag, "i");
  Story.find({ $or: [{ tag: regex }] })
    .sort({ _id: -1 })
    .exec((err, story) => {
      let date = moment(story.createdDate).format("YYYY-MMM-DD");
      res.render("./stories/search", {
        story: story,
        tag: req.params.tag,
        date: date,
      });
    });
});

///

module.exports = router;

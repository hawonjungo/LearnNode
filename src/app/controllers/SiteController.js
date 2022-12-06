const Course = require("../models/Course");

class SiteController {
  //GET
  index(req, res) {
    Course.find({}, function (err, courses) {
      if (!err) {
        res.json(courses);
      } else {
        res.status(400).json({ err: "ERR!!" });
      }
    });
    // res.render("home");
  }
  search(req, res) {
    res.render("search");
  }
}
module.exports = new SiteController();

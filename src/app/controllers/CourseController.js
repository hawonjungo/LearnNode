const Course = require("../models/Course");

// the utility to handle the handlebars problem with "this"
const { mongooseToObject } = require("../../util/mongoose");

class CourseController {
  //GET /courses/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      // the course on render is the way data transfer to view. And convert course to object so the code in view can use.
      .then((course) =>
        res.render("courses/show", { course: mongooseToObject(course) })
      )
      .catch(next);
  }
}
module.exports = new CourseController();

const Course = require("../models/Course");

// the utility to handle the handlebars problem with "this"
const { multipleMongooseToObject } = require("../../util/mongoose");

class MeController {
  //GET /me/stored/courses
  storedCourses(req, res, next) {
    let CourseQuery = Course.find({});
    if (req.query.hasOwnProperty("_sort")) {
      CourseQuery = CourseQuery.sort({
        // get attributes from query url ex: column=name&type=asc
        // name: "asc", the [""] to set attr in object
        [req.query.column]: req.query.type,
      });
    }

    // combine 2 promises and distructuring return value as courses and deletedCount
    Promise.all([CourseQuery, Course.countDocumentsDeleted()])
      .then(([courses, deletedCount]) => {
        res.render("me/stored-courses", {
          // transfer data to View ( as meController can send data to other dir in /me)
          // deletedCount:deletedCount, use shortcut
          deletedCount,
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);

    // Course.countDocumentsDeleted()
    //   .then((deletedCount) => {
    //     console.log(deletedCount);
    //   })
    //   .catch(() => {});

    // Course.find({})
    //   .then((courses) =>
    //     res.render("me/stored-courses", {
    //       courses: multipleMongooseToObject(courses),
    //     })
    //   )
    //   .catch(next);
  }

  //GET /me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then((courses) =>
        res.render("me/trash-courses", {
          courses: multipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }
}
module.exports = new MeController();

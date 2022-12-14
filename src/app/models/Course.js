const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");
const Schema = mongoose.Schema;

const Course = new Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, maxLength: 600 },
    img: { type: String },
    videoId: { type: String, require: true },
    cute: { type: String },
    // generator slug from name
    slug: { type: String, slug: "name", unique: true },
  },
  { timestamps: true }
);

// Add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model("Course", Course);

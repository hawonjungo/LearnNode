const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const Schema = mongoose.Schema;

mongoose.plugin(slug);

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

module.exports = mongoose.model("Course", Course);

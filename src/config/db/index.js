const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
async function connect() {
  try {
    await mongoose.connect("mongodb://0.0.0.0:27017/NodeLearning_dev", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" Connect successfully");
  } catch (err) {
    console.log(" Connect failure!!");
  }
}

module.exports = { connect };

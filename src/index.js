const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
var methodOverride = require("method-override");
const app = express();
const port = 3000;

const route = require("./routes");
const db = require("./config/db");

//connect to db
db.connect();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//override method on action( express)
app.use(methodOverride("_method"));

app.use(morgan("combined"));

//template engine
app.engine(
  ".hbs",
  handlebars.engine({
    extname: ".hbs",
    // creating helper function for hbs
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources", "views"));

//Routes initial
route(app);

app.listen(port, () => console.log(`App listening at port ${port}`));

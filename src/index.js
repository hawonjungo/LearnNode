const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const methodOverride = require("method-override");
const SortMiddleware = require("./app/middlewares/SortMiddleware");
const app = express();
const port = 3000;

const route = require("./routes");
const db = require("./config/db");

//connect to db
db.connect();

app.use(express.static(path.join(__dirname, "public")));

// structure data into an object, ex: req.body
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

//override method on action( express)
app.use(methodOverride("_method"));

// custom middleware
app.use(SortMiddleware);

app.use(morgan("combined"));

//template engine + helper
app.engine(
  ".hbs",
  handlebars.engine({
    extname: ".hbs",
    // creating helper function for hbs / middleware
    helpers: {
      sum: (a, b) => a + b,
      //field -> column
      sortable: (field, sort) => {
        // current click sortype, sort.type change value for field
        const sortType = field === sort.column ? sort.type : "default";

        const icons = {
          default: "bi bi-funnel-fill",
          asc: "bi bi-sort-up",
          desc: "bi bi-sort-down",
        };
        const types = {
          default: "desc",
          asc: "desc",
          desc: "asc",
        };
        // send soft type to find out value
        const icon = icons[sortType];
        const type = types[sortType];
        return ` <a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i></a>`;
      },
    },
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources", "views"));

//Routes initial
route(app);

app.listen(port, () => console.log(`App listening at port ${port}`));

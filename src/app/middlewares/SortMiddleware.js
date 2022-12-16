module.exports = function SortMiddleware(req, res, next) {
  res.locals._sort = {
    enabled: false,
    type: "default",
  };
  if (req.query.hasOwnProperty("_sort")) {
    // has _sort -> enable
    // res.locals._sort.enabled = true;
    //type = type, column = name on URL
    // res.locals._sort.type = req.query.type;
    // res.locals._sort.column = req.query.column;

    //combine 2 object to 1
    Object.assign(res.locals._sort, {
      enabled: true,
      type: req.query.type,
      column: req.query.column,
    });
  }

  next();
};

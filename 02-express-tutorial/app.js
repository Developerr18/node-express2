const express = require("express");
const app = express();

const middleware = (req, res, next) => {
  console.log(req.method);
  next();
};

app.get("/", middleware, (req, res) => {
  res.send("response");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000...");
});

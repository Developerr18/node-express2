const express = require("express");
const app = express();
const morgan = require("morgan");
const logger = require("./logger");
const authorize = require("./authorize");

app.use((req, res, next) => {
  // If request starts with /.well-known, just ignore logging
  if (req.url.startsWith("/.well-known")) {
    return res.status(404).end();
  }
  next();
});

// app.use("/api", [logger, authorize]);

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.get("/about", (req, res) => {
  // console.log(req.user); // undefined
  res.send("About page");
});

app.get("/api/products", (req, res) => {
  console.log(req.user);
  res.send("Products");
});

app.get("/api/users", [logger, authorize], (req, res) => {
  console.log(req.user); // { name: 'john', id: 3 }
  res.send("Users List");
});

app.listen(5000, () => {
  console.log("Server is running on PORT 5000");
});

const express = require("express");
const app = express();
const logger = require("./logger");
const authorize = require("./authorize");

app.use((req, res, next) => {
  // If request starts with /.well-known, just ignore logging
  if (req.url.startsWith("/.well-known")) {
    return res.status(404).end();
  }
  next();
});

app.use("/api", [logger, authorize]);

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.get("/api/products", (req, res) => {
  res.send("Products");
});

app.get("/api/items", (req, res) => {
  res.send("Items");
});

app.listen(5000, () => {
  console.log("Server is running on PORT 5000");
});

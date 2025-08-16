const express = require("express");
const app = express();

const peopleRoutes = require("./routes/people");
const authRoute = require("./routes/auth");

// static assets
app.use(express.static("./methods-public"));

// parse form data
app.use(express.urlencoded({ extended: false }));

// parse json
app.use(express.json());

app.use("/api/people", peopleRoutes);
app.use("/login", authRoute);

app.listen(5000, () => {
  console.log("Server is running on port 5000...");
});

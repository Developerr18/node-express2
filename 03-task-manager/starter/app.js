const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const tasksRoutes = require("./routes/tasks");
require("dotenv").config();

// parse json
app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Task Manager App!");
});

// use tasks routes
app.use("/api/v1/tasks", tasksRoutes);

const PORT = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server is running on PORT ${PORT}...`));
  } catch (err) {
    console.log(err);
  }
};

start();

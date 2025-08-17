const express = require("express");
const app = express();

const tasksRoutes = require("./routes/tasks");

// parse json
app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Task Manager App!");
});

// use tasks routes
app.use("/api/v1/tasks", tasksRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});

const express = require("express");
const app = express();

const productRoutes = require("./products");
const PORT = 4000;

app.use(express.json());
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send(`
    <a href="/api/products">Get products data</a>
  `);
});

app.listen(4000, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

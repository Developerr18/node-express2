const express = require("express");
const { products } = require("./data");
const app = express();

app.get("/", (req, res) => {
  // res.json(products);
  res.send(`
    <h1>Home page</h1>
    <a href="/api/products">Products</a>
  `);
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
});

app.get("/api/products/:productId", (req, res) => {
  // console.log(req.params);
  const { productId } = req.params;
  const singleProduct = products.find(
    (product) => product.id === Number(productId)
  );

  if (!singleProduct) {
    return res.status(404).send("Product does not exist!");
  }
  res.json(singleProduct);
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;
  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }

  if (sortedProducts.length < 1) {
    // res.status(200).send("No products matched!");
    return res.status(200).json({ success: true, data: [] });
  }

  res.status(200).json(sortedProducts);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000...");
});

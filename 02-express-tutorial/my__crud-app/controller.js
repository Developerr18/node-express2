const products = require("./data");
let nextId = 11;

const getProducts = (req, res) => {
  const { category, inStock } = req.query;
  let filteredProducts = products;
  if (category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }
  if (inStock) {
    const inStockBool = inStock.toLowerCase() === "true";
    filteredProducts = filteredProducts.filter(
      (p) => p.inStock === inStockBool
    );
  }
  res.json({ success: true, data: filteredProducts });
};

const getSingleProduct = (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) {
    return res.json({ success: false, msg: `No product with id ${id}` });
  }
  res.json({ success: true, data: product });
};

const createProduct = (req, res) => {
  const { name, price, category, inStock } = req.body;
  if (
    !name ||
    typeof price !== "number" ||
    !category ||
    typeof inStock !== "boolean"
  ) {
    return res.status(400).json({
      success: false,
      msg: "Please provide valid name, price (number), category, and inStock (boolean)",
    });
  }
  const newProduct = {
    id: nextId++,
    name,
    price,
    category,
    inStock,
  };
  products.push(newProduct);
  return res.status(201).json({ success: true, data: newProduct });
};

const updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);
  // if not found product
  if (productIndex === -1) {
    return res
      .status(404)
      .json({ success: false, msg: `No product found with ID: ${id}` });
  }
  // update product
  const { name, price, category, inStock } = req.body;
  const updatedProduct = { ...products[productIndex] };
  if (name) {
    updatedProduct.name = name;
  }
  if (typeof price === "number") {
    updatedProduct.price = price;
  }
  if (category) {
    updatedProduct.category = category;
  }
  if (typeof inStock === "boolean") {
    updatedProduct.inStock = inStock;
  }
  products[productIndex] = updatedProduct;
  return res.status(200).json({ success: true, data: products[productIndex] });
};

const deleteProduct = (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return res
      .status(404)
      .json({ success: false, msg: `No product found with ID: ${id}` });
  }
  products.splice(index, 1);
  res.json({ success: true, data: products });
};

module.exports = {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

// index.js
import express from "express";
import cors from "cors";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./src/utils/useUserRepository.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/products", async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products." });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    await addProduct(req.body);
    res.status(201).json({ message: "Product added successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to add product." });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    await updateProduct(req.params.id, req.body);
    res.json({ message: "Product updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to update product." });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

require("dotenv").config();

console.log("DB_HOST =", process.env.DB_HOST);
console.log("PORT =", process.env.PORT);

const express = require("express");
const db = require("./db");

const app = express();

app.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS test");

    res.json({
      success: true,
      message: "Database connected successfully",
      data: rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.get("/products", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const category = req.query.category;
    const cursor = req.query.cursor;

    let query = `
      SELECT *
      FROM products
      WHERE 1=1
    `;

    const params = [];

    if (category) {
      query += ` AND category = ? `;
      params.push(category);
    }

    if (cursor) {
      query += ` AND id < ? `;
      params.push(Number(cursor));
    }

    query += `
      ORDER BY id DESC
      LIMIT ?
    `;

    params.push(limit);

    const [products] = await db.query(query, params);

    const nextCursor =
      products.length > 0
        ? products[products.length - 1].id
        : null;

    res.json({
      count: products.length,
      nextCursor,
      products,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
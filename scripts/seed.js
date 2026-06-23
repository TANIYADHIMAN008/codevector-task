require("dotenv").config();
const mysql = require("mysql2/promise");

const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Sports",
  "Furniture",
  "Beauty",
  "Toys",
  "Food"
];

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const batchSize = 5000;
  const totalProducts = 200000;

  console.log("Starting seed...");

  for (let i = 0; i < totalProducts; i += batchSize) {
    const values = [];

    for (let j = 0; j < batchSize; j++) {
      const productNumber = i + j + 1;

      const name = `Product ${productNumber}`;

      const category =
        categories[Math.floor(Math.random() * categories.length)];

      const price = (Math.random() * 10000).toFixed(2);

      const date = new Date();

      values.push([
        name,
        category,
        price,
        date,
        date
      ]);
    }

    await connection.query(
      `
      INSERT INTO products
      (name, category, price, created_at, updated_at)
      VALUES ?
      `,
      [values]
    );

    console.log(
      `Inserted ${Math.min(i + batchSize, totalProducts)} products`
    );
  }

  console.log("Seed complete!");

  await connection.end();
}

seed().catch(console.error);
# CodeVector Backend Task

## Tech Stack

* Node.js
* Express.js
* MySQL

## Features

* Browse 200,000 products
* Category filtering
* Cursor-based pagination
* Indexed queries for performance

## Setup

Install dependencies:

npm install

Run server:

npm run dev

Seed database:

npm run seed

## API Endpoints

Get products:

GET /products

Get products with limit:

GET /products?limit=20

Filter by category:

GET /products?category=Books

Cursor pagination:

GET /products?limit=20&cursor=199981

## Design Decisions

* Used MySQL for reliable relational storage.
* Used cursor-based pagination to avoid duplicate or missing products when new data is inserted.
* Added indexes on `(updated_at, id)` and `(category, id)` for faster queries.

"use strict";

const express = require("express");
const pg = require("pg");
const pool = require("../pg-connection-pool");
const cartItemsRouter = express.Router();


// Get Method
cartItemsRouter.get("/cart-items", (request, response) => {
  pool.query("SELECT * FROM shoppingcart ORDER BY id").then((result) => {
    response.send(result.rows);
  });
});

// Post method
cartItemsRouter.post("/cart-items", (request, response) => {
  pool.query("INSERT INTO shoppingcart (product, price, quantity) VALUES ($1::text, $2::money, $3::int)", [request.body.product, request.body.price, request.body.quantity]).then(() => {
    pool.query("SELECT * FROM shoppingcart ORDER BY id").then((result) => {
      response.send(result.rows);
    });
  });
});

// Create four separate routes, one for each method
cartItemsRouter.delete("/cart-items/:id", (request, response) => {
  pool.query("DELETE FROM shoppingcart WHERE id=$1::int", [request.params.id]).then(() => {
    pool.query("SELECT * FROM shoppingcart ORDER BY id").then((result) => {
      response.send(result.rows);
    });
  });
});

// Create four separate routes, one for each method
cartItemsRouter.put("/cart-items/:id", (request, response) => {
  pool.query("UPDATE shoppingcart SET product=$1::text, price=$2::money, quantity=$3::int WHERE id=$4::int", [request.body.product, request.body.price, request.body.quantity, request.params.id]).then(() => {
    pool.query("SELECT * FROM shoppingcart ORDER BY id").then((result) => {
      response.send(result.rows);
    });
  });
});

// Export the Router object
module.exports = cartItemsRouter
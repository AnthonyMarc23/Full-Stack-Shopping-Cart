"use strict";

const express = require("express");
const cartItemsRouter = express.Router();

const cartItems = [
  {
    product: "Grand Circus Mug",
    price: "5.00",
    quantity: 10,
    id: 0
  },
  {
    product: "Grand Circus Duck",
    price: "1.00",
    quantity: 5000,
    id: 1
  }, 
  {
    product: "Adam Bobblehead",
    price: "8.00",
    quantity: 5,
    id: 2
  },  
  {
    product: "Fans",
    price: "25.00",
    quantity: 2,
    id: 3
  },
];

let idCount = 4;

// Get Method
cartItemsRouter.get("/cart-items", (request, response) => {
  response.send(cartItems);
});

// Post method
cartItemsRouter.post("/cart-items", (request, response) => {
  cartItems.push({
    product: request.body.product,
    price: request.body.price,
    quantity: request.body.quantity,
    id: idCount++
  })
  response.send(cartItems);
});

// Create four separate routes, one for each method
cartItemsRouter.delete("/cart-items/:id", (request, response) => {
  for (let item of cartItems) {
    if (item.id == request.params.id) {
      cartItems.splice(cartItems.indexOf(item), 1);
    }  
  }
  response.send(cartItems);
});

// Create four separate routes, one for each method
cartItemsRouter.put("/cart-items/:id", (request, response) => {
  for (let item of cartItems) {
    if (item.id == request.params.id) {
      cartItems.splice(cartItems.indexOf(item), 1, {
        product: request.body.product,
        price: request.body.price,
        quantity: request.body.quantity,
        id: item.id
      });
    }  
  }
  response.send(cartItems);
});

// Export the Router object
module.exports = cartItemsRouter
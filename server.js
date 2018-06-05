"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cartItems = require("./routes/cart-items");


app.use(bodyParser.json());
app.use("/portal", cartItems);


app.use(express.static(__dirname + "/public"));

let port = 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
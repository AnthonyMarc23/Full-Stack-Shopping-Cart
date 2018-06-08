"use strict";

const pg = require("pg");

const pool = new pg.Pool({
  user: "postgres",
  password: "password",
  host: "localhost",
  port: 9999,
  database: "ExpressShopDB",
  ssl: false
});

module.exports = pool;
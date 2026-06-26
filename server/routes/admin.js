const express = require('express');
const router = express.Router();
const db = require('../db');

// Dashboard stats
router.get('/stats', (req, res) => {
  const stats = {};

  db.query('SELECT COUNT(*) AS users FROM users', (e, r) => {
    stats.users = r[0].users;

    db.query('SELECT COUNT(*) AS products FROM products', (e, r) => {
      stats.products = r[0].products;

      db.query('SELECT SUM(total_price) AS sales FROM orders', (e, r) => {
        stats.sales = r[0].sales || 0;
        res.json(stats);
      });
    });
  });
});

// Get all products
router.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, result) => {
    res.json(result);
  });
});

module.exports = router;

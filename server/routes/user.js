const express = require('express');
const router = express.Router();
const db = require('../db');

// Get products for homepage
router.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, result) => {
    res.json(result);
  });
});

module.exports = router;

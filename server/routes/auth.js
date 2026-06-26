const express = require('express');
const router = express.Router();
const db = require('../db'); // if you separate db later

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      res.json({
        success: true,
        role: result[0].role,
        user: result[0]
      });
    } else {
      res.json({ success: false });
    }
  });
});

module.exports = router;

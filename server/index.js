const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
});

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});


// =========================
// REGISTER
// =========================

app.post("/register", (req, res) => {
  

  const {username,email,password,role} = req.body;

  const sql =
  "INSERT INTO users (username,email,password,role) VALUES (?,?,?,?)";

  db.query(
    sql,
    [username,email,password,role || "user"],
    (err,result)=>{

      if(err){
        console.log(err);
        return res.json({
          success:false,
          message:"Email already used"
        });
      }

      res.json({
        success:true,
        message:"Register successful"
      });

    }
  );

});


// =========================
// LOGIN
// =========================

app.post("/login", (req, res) => {
  console.log("LOGIN ROUTE HIT");
  console.log(req.body);

  const { email, password } = req.body;

  const sql =
    "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {

    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);
    console.log("RESULT:", result);

    if (err) {
      console.log(err);
      return res.json({
        success: false,
        message: "Database error",
      });
    }

    if (result.length > 0) {
      return res.json({
        success: true,
        role: result[0].role,
        user: result[0],
      });
    }

    return res.json({
      success: false,
      message: "Invalid email or password",
    });
  });
});


// =========================
// USERS
// =========================

app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM users WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "User deleted"
      });
    }
  );
});


// =========================
// CATEGORIES
// =========================

// GET
app.get("/api/categories", (req, res) => {
  db.query("SELECT * FROM categories", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

// ADD
app.post("/api/categories", (req, res) => {
  const { category_name } = req.body;

  db.query(
    "INSERT INTO categories (category_name) VALUES (?)",
    [category_name],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "Category added",
      });
    }
  );
});

// UPDATE
app.put("/api/categories/:id", (req, res) => {
  const { id } = req.params;
  const { category_name } = req.body;

  db.query(
    "UPDATE categories SET category_name=? WHERE id=?",
    [category_name, id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "Category updated",
      });
    }
  );
});

// DELETE
app.delete("/api/categories/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM categories WHERE id=?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "Category deleted",
      });
    }
  );
});


// =========================
// PRODUCTS
// =========================

// GET
app.get("/api/products", (req, res) => {
  const sql = `
    SELECT p.*, c.category_name
    FROM products p
    LEFT JOIN categories c
    ON p.category_id = c.id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

// ADD
app.post("/api/products", (req, res) => {
  const {
    name,
    price,
    image,
    description,
    category_id,
    stock,
  } = req.body;

  const sql = `
    INSERT INTO products
    (name, price, image, description, category_id, stock)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      name,
      price,
      image,
      description,
      category_id,
      stock,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "Product added successfully",
      });
    }
  );
});

// UPDATE
app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;

  const {
    name,
    price,
    image,
    description,
    category_id,
    stock,
  } = req.body;

  const sql = `
    UPDATE products
    SET
      name = ?,
      price = ?,
      image = ?,
      description = ?,
      category_id = ?,
      stock = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      name,
      price,
      image,
      description,
      category_id,
      stock,
      id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "Product updated",
      });
    }
  );
});

// DELETE
app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM products WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "Product deleted",
      });
    }
  );
});

app.get("/api/dashboard", (req, res) => {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM products) AS totalProducts,
      (SELECT COUNT(*) FROM categories) AS totalCategories,
      (SELECT COUNT(*) FROM users) AS totalUsers,
      (SELECT COUNT(*) FROM products WHERE stock < 10) AS lowStockProducts
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(result[0]);
  });
});

app.post("/api/users", (req, res) => {
  const { username, email, password, role } = req.body;

  db.query(
    "INSERT INTO users (username,email,password,role) VALUES (?,?,?,?)",
    [username, email, password, role],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "User added"
      });
    }
  );
});

app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;

  const {
    username,
    email,
    password,
    role
  } = req.body;

  db.query(
    `UPDATE users
     SET username=?, email=?, password=?, role=?
     WHERE id=?`,
    [username, email, password, role, id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "User updated"
      });
    }
  );
});

app.delete("/api/users/:id", (req, res) => {

  const { id } = req.params;

  db.query(
    "DELETE FROM users WHERE id=?",
    [id],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "User deleted"
      });

    }
  );

});

app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;

  const {
    username,
    email,
    role
  } = req.body;

  db.query(
    "UPDATE users SET username=?, email=?, role=? WHERE id=?",
    [username, email, role, id],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "User updated"
      });

    }
  );
});

app.get("/api/orders", (req, res) => {
  db.query(
    `
    SELECT
orders.id,
orders.total_price,
orders.status,
orders.order_date,
orders.receipt,
users.username
FROM orders
JOIN users
ON orders.user_id = users.id
ORDER BY orders.id DESC
    `,
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
});

app.post("/api/checkout", upload.single("receipt"), (req, res) => {

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const user_id = req.body.user_id;
    const total_price = req.body.total_price;
    const receipt = req.file ? req.file.filename : null;

    db.query(
        "INSERT INTO orders (user_id, total_price, receipt, status) VALUES (?, ?, ?, ?)",
        [user_id, total_price, receipt, "pending"],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    error: err,
                });
            }

            res.json({
                success: true,
                message: "Order created",
            });

        }
    );

});

app.put("/api/orders/:id/status", (req, res) => {
  console.log("ID:", req.params.id);
  console.log("BODY:", req.body);

  const id = req.params.id;
  const status = req.body.status;

  db.query(
    "UPDATE orders SET status=? WHERE id=?",
    [status, id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      console.log(result);

      res.json({
        success: true,
        message: "Status updated",
      });
    }
  );
});
// =========================
// GET MY ORDERS
// =========================
app.get("/api/my-orders/:userId", (req, res) => {

  const userId = req.params.userId;

  const sql = `
    SELECT *
    FROM orders
    WHERE user_id = ?
    ORDER BY id DESC
  `;

  db.query(sql, [userId], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(result);

  });

});
// ===========================
// GET ALL ORDERS
// ===========================
app.get("/api/orders", (req, res) => {

  const sql = `
    SELECT
      orders.id,
      users.username,
      users.email,
      orders.total_price,
      orders.status,
      orders.receipt_image,
      orders.created_at
    FROM orders
    JOIN users
      ON orders.user_id = users.id
    ORDER BY orders.created_at DESC
  `;

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);

      return res.json({
        success: false,
        message: "Database error"
      });
    }

    res.json({
      success: true,
      orders: result
    });

  });

});
// =============================
// UPDATE ORDER STATUS
// =============================
app.put("/api/orders/:id/status", (req, res) => {

  const id = req.params.id;
  const { status } = req.body;

  const sql = `
    UPDATE orders
    SET status = ?
    WHERE id = ?
  `;

  db.query(sql, [status, id], (err, result) => {

    if (err) {
      console.log(err);

      return res.json({
        success: false,
        message: "Database error",
      });
    }

    res.json({
      success: true,
      message: "Order updated",
    });

  });

});
// =========================
// START SERVER
// =========================

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
const express = require("express");
const path = require("path");
// const pool = require("./db"); // PostgreSQL connection
const { db } = require('./src/db/index')
const { usersTable, vendorsTable } = require('./src/db/schema')
const { eq }= require("drizzle-orm");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:3000", // Allow frontend to access backend
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json()); // Middleware to parse JSON requests

// ✅ Serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html")); // Ensure index.html is in the same directory
});

// ✅ Fetch all users
// app.get("/user", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM user");
//     res.json(result.rows);
//   } catch (err) {
//     console.error("Error fetching users:", err.message);
//     res.status(500).send("Server error");
//   }
// });

// Save a user to the database
app.post("/vendors", async (req, res) => {
  try {
    const { date, vendorName, reason, amount, vendorSignature, status } = req.body;

    // Check if required fields are present
    if (!date || !vendorName || !reason || !amount || !vendorSignature || !status) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    // Insert vendor data into the database
    const newVendor = await db.insert(vendorsTable).values({
      date,
      vendorName,
      reason,
      amount,
      vendorSignature,
      status,
    }).returning();

    res.status(201).json({ message: "Vendor added successfully", vendor: newVendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// ✅ Fetch all admins
// app.get("/admin", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM admin");
//     res.json(result.rows);
//   } catch (err) {
//     console.error("Error fetching admins:", err.message);
//     res.status(500).send("Server error");
//   }
// });

// ✅ Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
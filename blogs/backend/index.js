const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const { dbConnect } = require("./config/database");
const { seedAdmin } = require("./controllers/authController");

// Middleware
app.use(cors());
app.use(express.json());

// Main Routes
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/categories");
const blogRoutes = require("./routes/blogs");

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/blogs", blogRoutes);

// Static Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
    res.send("<h1>Blog Platform Backend Running</h1>");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Connect to DB and Seed Admin
dbConnect();
// Seed admin a bit after DB connection to be safe, or just call it (it handles logic inside)
setTimeout(() => {
    seedAdmin();
}, 2000); // Simple delay to ensure DB connected

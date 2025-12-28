const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middleware/auth");
const { createCategory, getAllCategories, updateCategory, deleteCategory } = require("../controllers/categoryController");

// Public
router.get("/", getAllCategories);

// Protected (Admin only)
router.post("/", auth, isAdmin, createCategory);
router.put("/:id", auth, isAdmin, updateCategory);
router.delete("/:id", auth, isAdmin, deleteCategory);

module.exports = router;

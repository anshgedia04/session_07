const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { auth, isAdmin } = require("../middleware/auth");
const { createBlog, getAllBlogs, getBlogBySlug, updateBlog, deleteBlog, searchBlogs } = require("../controllers/blogController");

// Multer Config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });

// Public
router.get("/", getAllBlogs);
router.get("/search", searchBlogs); 
router.get("/:slug", getBlogBySlug);

// Protected (Admin)
router.post("/", auth, isAdmin, upload.single('thumbnail'), createBlog);
router.put("/:id", auth, isAdmin, upload.single('thumbnail'), updateBlog);
router.delete("/:id", auth, isAdmin, deleteBlog);

module.exports = router;

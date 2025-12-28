const Blog = require("../model/Blog");
const slugify = require("slugify");
const fs = require("fs");
const path = require("path");

exports.createBlog = async (req, res) => {
    try {
        const { title, category, description, featured } = req.body;

        if (!title || !category || !description) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Handle File
        let thumbnail = "";
        if (req.file) {
            thumbnail = "/uploads/" + req.file.filename;
        }

        const blog = await Blog.create({
            title,
            slug: slugify(title, { lower: true, strict: true }) + "-" + Date.now(),
            category,
            description,
            thumbnail,
            featured: featured === 'true'
        });

        res.status(201).json({ success: true, data: blog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error creating blog" });
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("category", "name").sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getBlogBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const blog = await Blog.findOne({ slug }).populate("category", "name");
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, description, featured } = req.body;

        let updateData = { title, category, description, featured: featured === 'true' };

        // Update slug if title changed (optional, usually keep slug same for SEO)
        // if(title) updateData.slug = slugify(title, { lower: true, strict: true }) + "-" + Date.now();

        if (req.file) {
            updateData.thumbnail = "/uploads/" + req.file.filename;
            // Optionally delete old image here
        }

        const blog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        // Optionally delete image file here
        await Blog.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Blog deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.searchBlogs = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(200).json({ success: true, data: [] });

        const blogs = await Blog.find({
            title: { $regex: q, $options: "i" }
        }).populate("category", "name");

        res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import api from '../../api/axios';

const BlogForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [existingThumbnail, setExistingThumbnail] = useState('');
    const [featured, setFeatured] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get('/categories');
                setCategories(res.data.data);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };
        fetchCategories();

        if (id) {
            const fetchBlog = async () => {
                try {
                    const res = await api.get(`/blogs/${id}`); 
                    const allBlogsRes = await api.get('/blogs');
                    const foundBlog = allBlogsRes.data.data.find(b => b._id === id);
                    if (foundBlog) {
                        setTitle(foundBlog.title);
                        setCategory(foundBlog.category._id || foundBlog.category);
                        setDescription(foundBlog.description);
                        setExistingThumbnail(foundBlog.thumbnail);
                        setFeatured(foundBlog.featured);
                    }
                } catch (error) {
                    console.error("Error fetching blog", error);
                }
            };
            fetchBlog();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('featured', featured);
        if (thumbnail) {
            formData.append('thumbnail', thumbnail);
        }

        try {
            if (id) {
                await api.put(`/blogs/${id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/blogs', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            navigate('/admin/blogs');
        } catch (error) {
            alert(error.response?.data?.message || "Error saving blog");
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">{id ? 'Edit Blog' : 'Add New Blog'}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded h-64"
                        placeholder="Enter blog content here..."
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Thumbnail</label>
                    <input
                        type="file"
                        onChange={(e) => setThumbnail(e.target.files[0])}
                        className="w-full p-2 border rounded"
                    />
                    {existingThumbnail && (
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">Current Image:</p>
                            <img src={`http://localhost:5000${existingThumbnail}`} alt="Current" className="h-20 w-auto object-cover border" />
                        </div>
                    )}
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="featured"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="mr-2"
                    />
                    <label htmlFor="featured" className="text-gray-700">Featured</label>
                </div>

                <div className="flex gap-4 pt-4">
                    <button type="submit" disabled={loading} className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400">
                        {loading ? 'Saving...' : 'Save Blog'}
                    </button>
                    <button type="button" onClick={() => navigate('/admin/blogs')} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BlogForm;

import React, { useState } from 'react';
import api from '../api/axios';

const TodoForm = ({ setTodos }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!title || !desc) {
            setError('Title and Description are required');
            return;
        }

        try {
            const response = await api.post('/createTodos', { title, desc });
            // The backend returns { success: true, data: { ... } }
            if (response.data.success) {
                setTodos((prev) => [...prev, response.data.data]);
                setTitle('');
                setDesc('');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to create todo');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Todo</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter title"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <input
                    type="text"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter description"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
                Add Todo
            </button>
        </form>
    );
};

export default TodoForm;

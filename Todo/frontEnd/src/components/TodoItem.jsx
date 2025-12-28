import React from 'react';
import api from '../api/axios';

const TodoItem = ({ todo, onDelete }) => {

    const handleDelete = async () => {
        try {
            await api.delete(`/deleteTodos/${todo._id}`);
            onDelete(todo._id);
        } catch (err) {
            console.error("Failed to delete", err);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center hover:shadow-lg transition-shadow duration-200">
            <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">{todo.title}</h3>
                <p className="text-gray-600">{todo.desc}</p>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TodoItem;

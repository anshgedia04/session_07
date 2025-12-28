import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import api from './api/axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const response = await api.get('/getTodos');
      if (response.data.success) {
        setTodos(response.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch todos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);


  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          My Todo App
        </h1>

        <TodoForm setTodos={setTodos} />

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <TodoList
            todos={todos}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

export default App;

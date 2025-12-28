import React, { useEffect } from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onDelete }) => {

    if (!todos || todos.length === 0) {
        return <p className="text-center text-gray-500 mt-4">No todos yet. Add one above!</p>;
    }

    return (
        <div className="w-full">
            {todos.map((todo) => (
                <TodoItem
                    key={todo._id}
                    todo={todo}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default TodoList;

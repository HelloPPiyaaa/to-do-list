import React, { useEffect, useState } from "react";
import { Todo } from "../components/Type";
import { fetchTodos, deleteTodo, updateTodo } from "../services/todoApi";
import TodoItem from "../components/TodoItem";
import { FiBell } from "react-icons/fi";

const Pending = () => {
  const [pendingTodos, setPendingTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = 1;

  useEffect(() => {
    fetchTodos().then((res) => {
      const userPendingTodos = res.data.filter(
        (todo: Todo) => todo.userId === userId && todo.done === false
      );
      setPendingTodos(userPendingTodos);
      setLoading(false);
    });
  }, []);

  const handleToggleDone = (id: number) => {
    const todo = pendingTodos.find((t) => t.id === id);
    if (!todo) return;

    const updated = { ...todo, done: !todo.done };
    updateTodo(id, updated).then(() => {
      setPendingTodos((prev) => prev.filter((t) => t.id !== id));
    });
  };

  const handleDelete = (id: number) => {
    deleteTodo(id).then(() => {
      setPendingTodos((prev) => prev.filter((t) => t.id !== id));
    });
  };

  const handleEdit = (todo: Todo) => {
    const newText = prompt("Edit todo", todo.text);
    if (newText) {
      const updated = { ...todo, text: newText };
      updateTodo(todo.id, updated).then((res) => {
        setPendingTodos((prev) =>
          prev.map((t) => (t.id === todo.id ? res.data : t))
        );
      });
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>Pending</h1>
        <div className="dashboard__controls">
          <button className="notif-button">
            <FiBell />
          </button>
          <input type="text" placeholder="Search" className="search-input" />
        </div>
      </div>

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : pendingTodos.length > 0 ? (
          pendingTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleDelete={handleDelete}
              handleToggleDone={handleToggleDone}
              handleEdit={handleEdit}
            />
          ))
        ) : (
          <p>No completed todos.</p>
        )}
      </div>
    </div>
  );
};

export default Pending;

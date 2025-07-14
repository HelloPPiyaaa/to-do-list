import React, { useEffect, useState } from "react";
import { Todo } from "../components/Type";
import { fetchTodos, deleteTodo, updateTodo } from "../services/todoApi";
import TodoItem from "../components/TodoItem";
import { FiBell } from "react-icons/fi";

const Complete = () => {
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = 1;

  useEffect(() => {
    fetchTodos().then((res) => {
      const userCompletedTodos = res.data.filter(
        (todo: Todo) => todo.userId === userId && todo.done === true
      );
      setCompletedTodos(userCompletedTodos);
      setLoading(false);
    });
  }, []);

  const handleToggleDone = (id: number) => {
    const todo = completedTodos.find((t) => t.id === id);
    if (!todo) return;

    const updated = { ...todo, done: !todo.done };
    updateTodo(id, updated).then(() => {
      setCompletedTodos((prev) => prev.filter((t) => t.id !== id));
    });
  };

  const handleDelete = (id: number) => {
    deleteTodo(id).then(() => {
      setCompletedTodos((prev) => prev.filter((t) => t.id !== id));
    });
  };

  const handleEdit = (todo: Todo) => {
    const newText = prompt("Edit todo", todo.text);
    if (newText) {
      const updated = { ...todo, text: newText };
      updateTodo(todo.id, updated).then((res) => {
        setCompletedTodos((prev) =>
          prev.map((t) => (t.id === todo.id ? res.data : t))
        );
      });
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>Completed</h1>
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
        ) : completedTodos.length > 0 ? (
          completedTodos.map((todo) => (
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

export default Complete;

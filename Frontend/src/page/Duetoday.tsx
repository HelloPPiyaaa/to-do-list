import React, { useEffect, useState } from "react";
import { FiBell } from "react-icons/fi";
import { fetchTodos, updateTodo, deleteTodo } from "../services/todoApi";
import { Todo } from "../components/Type";
import TodoItem from "../components/TodoItem";

function Duetoday() {
  const [todosToday, setTodosToday] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = 1;

  useEffect(() => {
    const todayDate = new Date().toISOString().split("T")[0];
    fetchTodos().then((res) => {
      const filtered = res.data.filter(
        (todo: Todo) => todo.userId === userId && todo.date === todayDate
      );
      setTodosToday(filtered);
      setLoading(false);
    });
  }, []);

  const handleToggleDone = (id: number) => {
    const todo = todosToday.find((t) => t.id === id);
    if (!todo) return;

    const updated = { ...todo, done: !todo.done };
    updateTodo(id, updated).then((res) => {
      setTodosToday((prev) => prev.map((t) => (t.id === id ? res.data : t)));
    });
  };

  const handleDelete = (id: number) => {
    deleteTodo(id).then(() => {
      setTodosToday((prev) => prev.filter((t) => t.id !== id));
    });
  };

  const handleEdit = (todo: Todo) => {
    console.log("Edit", todo);
  };

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>Due Today</h1>
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
        ) : todosToday.length > 0 ? (
          todosToday.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleDelete={handleDelete}
              handleToggleDone={handleToggleDone}
              handleEdit={handleEdit}
            />
          ))
        ) : (
          <p>No todos due today.</p>
        )}
      </div>
    </div>
  );
}

export default Duetoday;

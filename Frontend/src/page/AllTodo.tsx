import React, { useEffect, useState } from "react";
import { FiBell } from "react-icons/fi";
import "../misc/Alltodo.css";
import TodoForm from "../components/TodoForm";
import { Todo } from "../components/Type";
import {
  addTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from "../services/todoApi";
import TodoItem from "../components/TodoItem";

function AllTodo() {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const userId = 1;

  useEffect(() => {
    fetchTodos().then((res) => {
      const userTodos = res.data.filter((todo: Todo) => todo.userId === userId);
      setTodos(userTodos);
    });
  }, []);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleAddTodo = (todo: Omit<Todo, "id">) => {
    addTodo(todo).then((res) => setTodos((prev) => [...prev, res.data]));
    setShowModal(false);
  };

  const handleToggleDone = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const updatedTodo = { ...todo, done: !todo.done };

    console.log("Updating todo id:", id, "with data:", updatedTodo);

    updateTodo(id, updatedTodo)
      .then((res) => {
        setTodos((prev) => prev.map((t) => (t.id === id ? res.data : t)));
      })
      .catch((err) => console.error("Failed to update todo", err));
  };

  const handleDelete = (id: number) => {
    deleteTodo(id).then(() => {
      setTodos((prev) => prev.filter((t) => t.id !== id));
      setMenuOpenId(null);
    });
  };

  const handleEdit = (todo: Todo) => {
    setEditTodo(todo);
    setShowModal(true);
    setMenuOpenId(null);
  };

  const handleUpdate = (updated: Todo) => {
    updateTodo(updated.id, updated).then((res) => {
      setTodos((prev) => prev.map((t) => (t.id === updated.id ? res.data : t)));
      setEditTodo(null);
      setShowModal(false);
    });
  };

  return (
    <div className="alltodo">
      <div className="alltodo__header">
        <div className="day">
          <h1 style={{ marginBottom: 0 }}>All Todo</h1>
          <p className="alltodo__subheader" style={{ margin: 0 }}>
            Today, {formattedDate}
          </p>
        </div>

        <div className="alltodo__controls">
          <button className="notif-button">
            <FiBell />
          </button>
          <input type="text" placeholder="Search" className="search-input" />
          <button className="create-button" onClick={() => setShowModal(true)}>
            + Create New
          </button>
        </div>
      </div>

      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleToggleDone={handleToggleDone}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setShowModal(false)}>
              ×
            </button>
            <TodoForm
              addTodo={handleAddTodo}
              updateTodo={handleUpdate}
              editTodo={editTodo}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AllTodo;

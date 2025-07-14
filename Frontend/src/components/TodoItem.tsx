import React, { useState } from "react";
import { Todo } from "./Type";
import "../misc/TodoItem.css";

interface TodoItemProps {
  todo: Todo;
  handleDelete: (id: number) => void;
  handleToggleDone: (id: number) => void;
  handleEdit: (todo: Todo) => void;
}

function TodoItem({
  todo,
  handleDelete,
  handleToggleDone,
  handleEdit,
}: TodoItemProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="todo-item">
      <div className="todo-main">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => handleToggleDone(todo.id)}
        />
        <span className={todo.done ? "done" : ""}>{todo.text}</span>
      </div>

      <div className="todo-actions">
        <button onClick={() => handleEdit(todo)}>Edit</button>
        <button onClick={() => setShowConfirm(true)}>Delete</button>
      </div>

      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>Are you sure you want to delete this todo?</p>
            <button
              onClick={() => {
                handleDelete(todo.id);
                setShowConfirm(false);
              }}
            >
              Yes, delete
            </button>
            <button onClick={() => setShowConfirm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoItem;

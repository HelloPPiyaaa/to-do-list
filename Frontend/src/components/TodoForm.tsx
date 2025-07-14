import React, { useEffect, useState } from "react";
import "../misc/TodoForm.css";
import { Todo } from "./Type";

interface TodoFormProps {
  addTodo: (todo: Omit<Todo, "id">) => void;
  updateTodo: (updated: Todo) => void;
  editTodo?: Todo | null;
  onClose: () => void;
}

function TodoForm({ addTodo, updateTodo, editTodo, onClose }: TodoFormProps) {
  const [text, setText] = useState(editTodo?.text || "");
  const [date, setDate] = useState(editTodo?.date || "");
  const [startTime, setStartTime] = useState(editTodo?.startTime || "");
  const [endTime, setEndTime] = useState(editTodo?.endTime || "");

  useEffect(() => {
    if (editTodo) {
      setText(editTodo.text);
      setDate(editTodo.date);
      setStartTime(editTodo.startTime);
      setEndTime(editTodo.endTime);
    }
  }, [editTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === "") return;

    if (editTodo) {
      updateTodo({
        id: editTodo.id,
        text,
        date,
        startTime,
        endTime,
        done: editTodo.done,
        userId: editTodo.userId,
      });
    } else {
      const newTodo: Omit<Todo, "id"> = {
        text,
        date,
        startTime,
        endTime,
        done: false,
        userId: 1,
      };
      addTodo(newTodo);
    }

    onClose();
    setText("");
    setDate("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Add a task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="todo-input"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="todo-date"
      />
      <div className="time-group">
        <label>
          Start Time:
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="todo-time"
          />
        </label>
        <label>
          End Time:
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="todo-time"
          />
        </label>
      </div>
      <button type="submit" className="todo-button">
        Add
      </button>
    </form>
  );
}

export default TodoForm;

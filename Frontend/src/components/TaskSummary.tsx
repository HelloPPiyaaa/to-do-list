import React, { useEffect, useState } from "react";
import { fetchTodos } from "../services/todoApi";
import { Todo } from "../components/Type";

const TaskSummary = () => {
  const [completed, setCompleted] = useState(0);
  const [todoCount, setTodoCount] = useState(0);
  const [ongoing, setOngoing] = useState(0);

  const userId = 1;

  useEffect(() => {
    fetchTodos().then((res) => {
      const data: Todo[] = res.data;

      const userTodos = data.filter((t) => t.userId === userId);

      setCompleted(userTodos.filter((t) => t.done).length);
      setTodoCount(userTodos.filter((t) => t).length);

      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const today = now.toISOString().split("T")[0];

      const ongoingTasks = userTodos.filter((t) => {
        if (t.done || t.date !== today) return false;

        const [sh, sm] = t.startTime.split(":").map(Number);
        const [eh, em] = t.endTime.split(":").map(Number);
        const startMin = sh * 60 + sm;
        const endMin = eh * 60 + em;

        return startMin <= currentMinutes && currentMinutes <= endMin;
      });

      setOngoing(ongoingTasks.length);
    });
  }, []);

  return (
    <div className="dashboard__summary">
      <div className="task-summary completed">
        <p className="count">{completed}</p>
        <p>Task completed</p>
      </div>
      <div className="task-summary todo">
        <p className="count">{todoCount}</p>
        <p>To-do tasks</p>
      </div>
      <div className="task-summary ongoing">
        <p className="count">{ongoing}</p>
        <p>Ongoing tasks</p>
      </div>
    </div>
  );
};

export default TaskSummary;

import React, { useEffect, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import "../misc/TimelineCalendar.css";
import { fetchTodos } from "../services/todoApi";

type Todo = {
  id: number | string;
  text: string;
  startTime: string;
  endTime: string;
  date: string;
  color?: string;
  done: boolean;
  userId: number;
};

type Event = Todo & { row: number; color: string };

const timeToMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const isOverlap = (
  aStart: number,
  aEnd: number,
  bStart: number,
  bEnd: number
) => aStart < bEnd && bStart < aEnd;

const assignRows = (todos: Todo[]): Event[] => {
  const result: Event[] = [];
  const defaultColors = ["#fbeff4", "#dcdafe", "#edf5f2", "#fbdbe1", "#e6f8f0"];

  for (const todo of todos) {
    const start = timeToMinutes(todo.startTime);
    const end = timeToMinutes(todo.endTime);

    let row = 0;
    while (
      result.some(
        (e) =>
          e.row === row &&
          isOverlap(
            start,
            end,
            timeToMinutes(e.startTime),
            timeToMinutes(e.endTime)
          )
      )
    ) {
      row++;
    }

    result.push({
      ...todo,
      row,
      color: defaultColors[row % defaultColors.length],
    });
  }

  return result;
};

const TimelineCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });
  const userId = 1;

  useEffect(() => {
    fetchTodos().then((res) => {
      const filtered = res.data.filter(
        (todo: Todo) => todo.date === selectedDate && todo.userId === userId
      );
      setEvents(assignRows(filtered));
    });
  }, [selectedDate]);

  const startMinutesList = events.map((e) => timeToMinutes(e.startTime));
  const endMinutesList = events.map((e) => timeToMinutes(e.endTime));

  const earliestStart = Math.min(...startMinutesList, 8 * 60);
  const latestEnd = Math.max(...endMinutesList, 17 * 60);

  const timelineStart = Math.floor(earliestStart / 30) * 30;
  const timelineEnd = Math.ceil(latestEnd / 30) * 30;
  const timelineDuration = timelineEnd - timelineStart;

  const hours = [];
  for (let t = timelineStart; t <= timelineEnd; t += 60) {
    const hour = Math.floor(t / 60);
    hours.push(`${hour.toString().padStart(2, "0")}:00`);
  }

  const rowHeight = 100;
  const totalHeight =
    (Math.max(0, ...events.map((e) => e.row)) + 1) * rowHeight;

  return (
    <div className="timeline-calendar">
      <header className="timeline-header">
        <div>
          <h2>Schedule Timeline</h2>
          <div className="breadcrumbs">Schedule / Timeline</div>
        </div>
        <div className="header-right">
          <div className="date-picker">
            <FiCalendar />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-input"
            />
          </div>
        </div>
      </header>

      <div className="timeline-hours">
        {hours.map((hour) => (
          <div key={hour} className="time-label">
            {hour}
          </div>
        ))}
      </div>

      <div className="timeline-content" style={{ height: `${totalHeight}px` }}>
        {events.map(({ id, text, startTime, endTime, color, row }) => {
          const startMinutes = timeToMinutes(startTime);
          const endMinutes = timeToMinutes(endTime);
          const leftPercent =
            ((startMinutes - timelineStart) / timelineDuration) * 100;
          const widthPercent =
            ((endMinutes - startMinutes) / timelineDuration) * 100;
          const topPx = row * rowHeight + 10;

          return (
            <div
              key={id}
              className="schedule-block"
              style={{
                left: `${leftPercent}%`,
                width: `${widthPercent}%`,
                top: `${topPx}px`,
                backgroundColor: color,
              }}
            >
              <div className="schedule-title">{text}</div>
              <div className="schedule-time">
                {startTime} - {endTime}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineCalendar;

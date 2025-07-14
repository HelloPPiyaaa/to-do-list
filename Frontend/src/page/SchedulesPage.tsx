import React from "react";
import { FiBell } from "react-icons/fi";
import TimelineCalendar from "../components/TimelineCalendar";

function SchedulesPage() {
  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>Scheduales</h1>
        <div className="dashboard__controls">
          <button className="notif-button">
            <FiBell />
          </button>
          <input type="text" placeholder="Search" className="search-input" />
        </div>
      </div>

      <div>
        <TimelineCalendar />
      </div>
    </div>
  );
}

export default SchedulesPage;

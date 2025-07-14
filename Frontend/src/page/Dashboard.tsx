import React from "react";
import { FiBell } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import "../misc/Dashboard.css";
import TimelineCalendar from "../components/TimelineCalendar";
import TaskSummary from "../components/TaskSummary";

const UpgradeBanner = () => (
  <div
    className="upgrade-banner"
    style={{
      backgroundImage:
        "url('https://cdn.dribbble.com/userupload/15974095/file/original-e775194f924af286cb5bf70b02e2f803.png?resize=1504x1128&vertical=center')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "#fff",
      padding: "2rem",
      borderRadius: "1rem",
    }}
  >
    <div
      style={{
        maxWidth: "400px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: "1rem",
        borderRadius: "0.5rem",
      }}
    >
      <h2>Try all features!</h2>
      <p>Discover a more organized life through our activity dashboard.</p>
      <button
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          border: "none",
          background: "#fff",
          color: "#000",
        }}
      >
        Upgrade plan
      </button>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>Dashboard activity</h1>
        <div className="dashboard__controls">
          <button className="notif-button">
            <FiBell />
          </button>
          <input type="text" placeholder="Search" className="search-input" />
        </div>
      </div>

      <div className="dashboard__main">
        <div className="dashboard__left">
          <UpgradeBanner />

          <TaskSummary />
        </div>

        <TimelineCalendar />
      </div>
    </div>
  );
};

export default Dashboard;

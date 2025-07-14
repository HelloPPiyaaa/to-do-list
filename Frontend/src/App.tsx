import React from "react";
import Sidebar from "./components/sidebar";
import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./page/Dashboard";
import SchedulesPage from "./page/SchedulesPage";
import AllTodo from "./page/AllTodo";
import Complete from "./page/Complete";
import Pending from "./page/Pending";
import Duetoday from "./page/Duetoday";

function SidebarLayout() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="scrollable-content">
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<SidebarLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/schedules" element={<SchedulesPage />} />
        <Route path="/alltodo" element={<AllTodo />} />
        <Route path="/completed" element={<Complete />} />
        <Route path="/pending" element={<Pending />} />
        <Route path="/duetoday" element={<Duetoday />} />
      </Route>
    </Routes>
  );
}

export default App;

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../misc/Sidebar.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiDashboardFill } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaHourglassHalf } from "react-icons/fa";
import { MdToday } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { RiSettings4Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";

interface NavItemProps {
  to: string;
  label: string;
  badge?: string;
  icon: React.ReactNode;
}

function Sidebar() {
  const NavItem: React.FC<NavItemProps> = ({ to, label, badge, icon }) => {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `sidebar__nav-item${isActive ? " active" : ""}`
        }
      >
        <span
          className="sidebar__icon"
          style={{ paddingRight: "12px", color: "#aaa" }}
        >
          {icon}
        </span>
        <span>{label}</span>
        {badge && <span className="sidebar__badge">{badge}</span>}
      </NavLink>
    );
  };

  const [isOpen, setIsopen] = useState(false);

  return (
    <>
      <button onClick={() => setIsopen(!isOpen)} className="hamburger-btn ">
        <RxHamburgerMenu />
      </button>
      <aside className="sidebar">
        <div className="sidebar__header">
          <div className="sidebar__avatar">O</div>
          <div className="sidebar__user-info">
            <h2>Piyarat Upacheewa</h2>
            <p>Free Plan • 10 Members</p>
          </div>
        </div>

        <div className="sidebar__section">
          <p className="sidebar__section-title">MENU</p>
          <NavItem to="/" label="Dashboard" icon={<RiDashboardFill />} />
          <NavItem to="/alltodo" label="All Todos" icon={<FaTasks />} />
        </div>

        <div className="sidebar__section">
          <p className="sidebar__section-title">TASK VIEWS</p>
          <NavItem to="/completed" label="Completed" icon={<FaCheckCircle />} />
          <NavItem to="/pending" label="Pending" icon={<FaHourglassHalf />} />
          <NavItem to="/duetoday" label="Due Today" icon={<MdToday />} />
          <NavItem
            to="/schedules"
            label="Scheduales"
            icon={<FaRegCalendarAlt />}
          />
        </div>

        <div className="sidebar__section">
          <p className="sidebar__section-title">ACCOUNT</p>
          <NavItem to="/profile" label="Profile" icon={<FaUser />} />
          <NavItem to="/settings" label="Settings" icon={<RiSettings4Fill />} />
          <NavItem to="/logout" label="Log Out" icon={<FiLogOut />} />
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

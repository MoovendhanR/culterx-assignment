import React from "react";
import "./Sidebar.css";
import navbarItems from "./NavbarItem";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ isopen, toggle }) => {
  let opacityClasses = ["sidebar-container"];
  if (isopen) {
    opacityClasses.push("opacity-on");
  } else {
    opacityClasses.push("opacity-off");
  }

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <div
      className={opacityClasses.join(" ")}
      isopen={isopen.toString()}
      onClick={toggle}
    >
      <div className="icon">
        <FaTimes className="close-icon" onClick={toggle} />
      </div>
      <div className="sidebar-wrapper">
        <div className="sidebar-menu">
        {navbarItems.map((item, index) => (
        item.title.toLowerCase() === "logout" ? (
          <span
            className="link"
            onClick={handleLogout}
            key={index}
            style={{ cursor: "pointer", color: "red" }} 
          >
            {item.title}
          </span>
        ) : (
          <Link className="link" to={item.link} key={index}>
            {item.title}
          </Link>
        )
      ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
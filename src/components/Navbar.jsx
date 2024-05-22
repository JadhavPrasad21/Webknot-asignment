import React from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import search_light from "../assets/search-w.png";
import search_dark from "../assets/search-b.png";
import toggle_light from "../assets/day.png";
import toggle_dark from "../assets/night.png";

const Navbar = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    <nav className={`nav-container ${theme}`}>
      <img src={logo} alt="logo" className="logo" />
      <ul>
        <li>Assigment</li>
      </ul>
      <div className="search-box">
        <input type="text" placeholder="Search" />
        <img src={theme === "light" ? search_light : search_dark} alt="" />
      </div>
      <img
        src={theme === "light" ? toggle_light : toggle_dark}
        alt=""
        className="toggle-icon"
        onClick={() => {
          toggleTheme();
        }}
      />
    </nav>
  );
};

export default Navbar;

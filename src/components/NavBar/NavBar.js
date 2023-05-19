import React from "react";
import "./NavBar.css";
import { MdOutlineCoronavirus, MdInfoOutline } from "react-icons/md";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navigation">
      <div className="logo">
        <MdOutlineCoronavirus />
      </div>
      <ul className="links-list">
        <li className="link">
          <Link to="/info">
            <MdInfoOutline />
          </Link>
        </li>
      </ul>
    </div>
  );
}

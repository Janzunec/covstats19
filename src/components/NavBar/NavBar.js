import React from "react";
import "./NavBar.css";
import { MdOutlineCoronavirus, MdInfoOutline } from "react-icons/md";
import { RiGithubLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navigation">
      <div className="logo">
        <Link to="/">
          <MdOutlineCoronavirus />
        </Link>
      </div>
      <ul className="links-list">
        <li className="link">
          <Link to="/info">
            <MdInfoOutline />
          </Link>
        </li>
        <li className="link">
          <a target="blank" href="https://github.com/Janzunec/covstats19">
            <RiGithubLine />
          </a>
        </li>
      </ul>
    </div>
  );
}

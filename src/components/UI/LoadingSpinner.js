import React from "react";
import "./LoadingSpinner.css";

export default function LoadingSpinner(props) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="circleSvg"
      style={{ stroke: props.color }}
    >
      <circle cx="50" cy="50" r="46" />
    </svg>
  );
}

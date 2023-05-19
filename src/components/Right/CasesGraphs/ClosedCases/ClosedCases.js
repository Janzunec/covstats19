import React from "react";
import CasesGraph from "../CasesGraph";
import "../Graphs.css";

export default function ClosedCases(props) {
  return (
    <div className="closed-graph">
      <h3>CLOSED CASES</h3>
      <CasesGraph
        casesType="closed"
        data={props.data}
        isAllTime={props.isAllTime}
      />
    </div>
  );
}

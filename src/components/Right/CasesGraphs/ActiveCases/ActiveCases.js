import React from "react";
import CasesGraph from "../CasesGraph";
import "../Graphs.css";

export default function ActiveCases(props) {
  return (
    <div className="active-graph">
      <h3>ACTIVE CASES</h3>
      <CasesGraph
        casesType="active"
        data={props.data}
        isAllTime={props.isAllTime}
      />
    </div>
  );
}

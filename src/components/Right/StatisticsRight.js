import React, { Suspense } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";

import ActiveCases from "./CasesGraphs/ActiveCases/ActiveCases";
import ClosedCases from "./CasesGraphs/ClosedCases/ClosedCases";
import CasesTable from "./CasesTable/CasesTable";
import "./StatisticsRight.css";

import TotalCases from "../../components/Right/TotalCases/TotalCases";

export default function StatisticsRight(props) {
  return (
    <div className="statistics-right">
      <h1 className="title">
        <b>COVID 19</b>&nbsp;<span>({props.selectedCountry})</span>
      </h1>

      <TotalCases
        isAllTime={props.isAllTime}
        updateDays={props.updateDays}
        countriesArr={props.countriesArr}
        selectedCountry={props.selectedCountry}
        data={props.data}
      />
      <div className="statistics-right__graphs">
        <ActiveCases data={props.data} isAllTime={props.isAllTime} />
        <ClosedCases data={props.data} isAllTime={props.isAllTime} />
      </div>
      <div className="statistics-right__table">
        <CasesTable tableData={props.tableData}></CasesTable>
      </div>
    </div>
  );
}

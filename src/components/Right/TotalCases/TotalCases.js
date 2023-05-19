import React from "react";
import { FaSquare } from "react-icons/fa";
import DaysDropdown from "../DaysDropdown/DaysDropdown";
import "./TotalCases.css";

export default function TotalCases(props) {
  // const [dayValue, setDayValue] = useState(props.isAllTime);

  const data = {
    cases: props.data.cases,
    activeCases: props.data.active,
    recovered: props.data.recovered,
    deaths: props.data.deaths,
  };

  if (props.isAllTime) {
    data.cases = props.data.cases;
    data.activeCases = props.data.active;
    data.recovered = props.data.recovered;
    data.deaths = props.data.deaths;
  }
  if (!props.isAllTime) {
    const allTodayCases =
      props.data.todayCases +
      props.data.todayRecovered +
      props.data.todayDeaths;
    data.cases = allTodayCases;
    data.activeCases = props.data.todayCases;
    data.recovered = props.data.todayRecovered;
    data.deaths = props.data.todayDeaths;

    if (allTodayCases === 0) {
      const customError = "Data not availible";
      data.cases = customError;
      data.activeCases = customError;
      data.recovered = customError;
      data.deaths = customError;
    }
  }

  const calculatePercentage = () => {
    const percentage = {
      activePercentage: 0,
      recoveredPercentage: 0,
      fatalPercentage: 0,
      activeRadiusRight: 0,
      activeRadiusLeft: 0,
    };

    percentage.activePercentage =
      Math.trunc((data.activeCases * 100) / data.cases) + "%";
    percentage.recoveredPercentage =
      Math.trunc((data.recovered * 100) / data.cases) + "%";
    percentage.fatalPercentage =
      Math.ceil((data.deaths * 100) / data.cases) + "%";

    if (percentage.fatalPercentage === "0%")
      percentage.activeRadiusRight = "20px";

    if (percentage.recoveredPercentage === "0%")
      percentage.activeRadiusLeft = "20px";

    return percentage;
  };

  const graphPercentage = calculatePercentage();

  const onDayChangeHandler = (newValue) => {
    // setDayValue(newValue);
    props.updateDays(newValue);
  };

  return (
    <div className="total-cases">
      <div className="total-cases-heading">
        <h3>TOTAL CONFIRMED CASES</h3>
        <DaysDropdown
          isAllTime={props.isAllTime}
          onDayChange={onDayChangeHandler}
        />
      </div>
      <div className="cases-num">
        {typeof data.cases === "string"
          ? data.cases
          : Intl.NumberFormat("en-UK").format(data.cases)}
      </div>
      <div className="cases-bar">
        <div
          className="recovered-bar"
          style={{ width: graphPercentage.recoveredPercentage }}
        ></div>
        <div
          className="active-bar"
          style={{
            width: graphPercentage.activePercentage,
            borderTopRightRadius: graphPercentage.activeRadiusRight,
            borderBottomRightRadius: graphPercentage.activeRadiusRight,
            borderTopLeftRadius: graphPercentage.activeRadiusLeft,
            borderBottomLeftRadius: graphPercentage.activeRadiusLeft,
          }}
        ></div>
        <div
          className="fatal-bar"
          style={{ width: graphPercentage.fatalPercentage }}
        ></div>
      </div>
      <ul className="total-list">
        <li className="list-case">
          <div>
            <span className="total-legend__recovered">
              <FaSquare />
            </span>
            &nbsp; Recovered cases
          </div>
          <div>
            {typeof data.cases === "string"
              ? data.cases
              : Intl.NumberFormat("en-UK").format(data.recovered)}
          </div>
        </li>
        <li className="list-case">
          <div>
            <span className="total-legend__active">
              <FaSquare />
            </span>
            &nbsp; Active cases
          </div>
          <div>
            {typeof data.cases === "string"
              ? data.cases
              : Intl.NumberFormat("en-UK").format(data.activeCases)}
          </div>
        </li>
        <li className="list-case">
          <div>
            <span className="total-legend__fatal">
              <FaSquare />
            </span>
            &nbsp; Fatal cases
          </div>
          <div>
            {typeof data.cases === "string"
              ? data.cases
              : Intl.NumberFormat("en-UK").format(data.deaths)}
          </div>
        </li>
      </ul>
    </div>
  );
}

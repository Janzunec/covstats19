import "leaflet/dist/leaflet.css";
import React, { Suspense, useEffect, useState } from "react";
import CountriesDropdown from "../../components/Left/CountriesDropdown/CountriesDropdown";
import "./Statistics.css";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const Map = React.lazy(() => import("../../components/Left/Map/Map"));

const StatisticsRight = React.lazy(() =>
  import("../../components/Right/StatisticsRight")
);

export default function Statistcs() {
  const [countries, setCountries] = useState([]);
  const [countryData, setCountryData] = useState({});
  const [country, setCountry] = useState("WorldWide");
  const [isAllTime, setIsAllTime] = useState(true);
  const [sortedData, setSortedData] = useState([]);

  useEffect(async () => {
    const resp = await fetch("https://disease.sh/v3/covid-19/countries/");
    const data = await resp.json();

    const countries = data.map((val) => {
      return val.country;
    });

    const dataToSort = data;
    dataToSort.sort((a, b) => {
      if (a.cases > b.cases) return -1;
      return 1;
    });

    setSortedData(dataToSort);
    setCountries(countries);
  }, []);

  useEffect(async () => {
    const resp = await fetch("https://disease.sh/v3/covid-19/all");
    const data = await resp.json();

    setCountryData(data);
  }, []);

  //HandlerFuntions
  const countryChangeHandler = async (parsedCountry) => {
    let resp, data;
    let selectedCountry;

    if (parsedCountry === null || parsedCountry === "WorldWide") {
      resp = await fetch(`https://disease.sh/v3/covid-19/all`);
      selectedCountry = "WorldWide";
    } else {
      resp = await fetch(
        `https://disease.sh/v3/covid-19/countries/${parsedCountry}`
      );
      selectedCountry = parsedCountry;
    }

    data = await resp.json();

    setCountryData(data);
    setCountry(selectedCountry);
  };
  //Driller fucntion
  const updateDays = (e) => {
    setIsAllTime(e);
  };

  return (
    <div className="statistics">
      <div className="statistics-left">
        <CountriesDropdown
          countriesArr={countries}
          selectedCountry={country}
          onChangeCountry={countryChangeHandler}
        />
        <Suspense fallback={<LoadingSpinner color={"#CB2D6F"} />}>
          <Map
            countryData={countryData}
            country={country}
            sortedMapData={sortedData}
          ></Map>
        </Suspense>
      </div>
      {/* <div className="statistics-right"> */}
      <Suspense fallback={<LoadingSpinner color={"#14A098"} />}>
        <StatisticsRight
          updateDays={updateDays}
          isAllTime={isAllTime}
          countriesArr={countries}
          selectedCountry={country}
          data={countryData}
          tableData={sortedData}
        />
      </Suspense>
      {/* </div> */}
    </div>
  );
}

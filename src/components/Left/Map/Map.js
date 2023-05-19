import Leaflet from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./Map.css";
import { popupCases, popupContent } from "./popupStyles";

export default function Map({ countryData, country, sortedMapData }) {
  const [center, setCenter] = useState({
    lat: 50.80746,
    lng: 10.4796,
  });
  const [currCountry, setCurrCountry] = useState("WorldWide");
  const [position, setPosition] = useState([50, 0]);
  const [mapCenter, setMapCenter] = useState(center);
  const [countryIsSelected, setCountryIsSelected] = useState(false);

  const zoom = {
    maxZoom: 10,
    minZoom: 3,
    currZoom: 3,
  };

  const topCasesCountries = [...sortedMapData];

  topCasesCountries.splice(10);

  let defaultIcon = Leaflet.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [28, 46],
    iconAnchor: [17, 46],
  });

  const [map, setMap] = useState(null);

  const displayMap = (
    <MapContainer
      center={mapCenter}
      zoom={zoom.currZoom}
      minZoom={zoom.minZoom}
      maxZoom={zoom.maxZoom}
      whenCreated={setMap}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {countryIsSelected && (
        <Marker position={position}>
          <Popup>
            <div style={popupContent}>
              <div>{currCountry}:</div>
              <div style={popupCases}>
                {Intl.NumberFormat("en-UK").format(countryData.cases)}
              </div>
            </div>
          </Popup>
        </Marker>
      )}
      {!countryIsSelected && (
        <>
          {topCasesCountries.map((val) => (
            <Marker
              position={[val.countryInfo.lat, val.countryInfo.long]}
              key={val.countryInfo._id}
            >
              <Popup>
                <div style={popupContent}>
                  <div>{val.country}:</div>
                  <div style={popupCases}>
                    {Intl.NumberFormat("en-UK").format(val.cases)}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </>
      )}
    </MapContainer>
  );

  if (countryData.country !== undefined && country !== currCountry) {
    const latLng = [countryData.countryInfo.lat, countryData.countryInfo.long];
    setCurrCountry(countryData.country);
    setPosition(latLng);
    setMapCenter(latLng);
    setCountryIsSelected(true);

    zoom.currZoom = 5;

    map.setView(latLng, zoom.currZoom, {
      Animation: true,
      AnimationTimeline: 500,
    });
  }
  if (country === "WorldWide" && country !== currCountry) {
    setCurrCountry(country);
    setPosition(center);
    setMapCenter(center);
    setCountryIsSelected(false);
    zoom.currZoom = 3;
  }

  Leaflet.Popup.prototype.options.offset = [-1, -39];
  Leaflet.Marker.prototype.options.icon = defaultIcon;

  return <div className="map">{displayMap}</div>;
}

import React from "react";
import "./App.css";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

function App() {
  // const geoUrl = "./world-110m.json";
  // const geoUrl = "https://observablehq.com/@d3/world-map-svg";

  // const geoUrl =
  //   "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
  const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

  console.log(geoUrl);

  return (
    <>
      <p>Conflict Map</p>
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 170,
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
      </ComposableMap>
    </>
  );
}

export default App;

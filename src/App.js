import React from "react";
import "./App.css";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import conflictsData from "./data/ucdp.json";

function App() {
  const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

  const groupObjectByProperty = (objArray, property) => {
    return objArray.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
        return {
          ...acc,
          [key]: {
            conflicts: 1,
            fatalities: obj.best,
            countryName: obj.country,
            type: obj.type_of_violence,
          },
        };
      }

      return {
        ...acc,
        [key]: {
          ...acc[key],
          conflicts: acc[key].conflicts + 1,
        },
      };
    }, {});
  };

  // const conflictsByCountry = groupObjectByProperty(conflictsData, "country");
  // console.log(conflictsByCountry);

  const colorScale = scaleLinear()
    .domain([0, 100])
    .range(["#FFF", "#06F"]);

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
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: "#EEE",
                  },
                  hover: {
                    fill: "#F53",
                  },
                  pressed: {
                    fill: "#E42",
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </>
  );
}

export default App;

import React, { useState, useEffect } from "react";

import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import conflictsData from "../data/ucdp.json";
import countryCode from "country-code-lookup";

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

// const formatConflicts = (data, property = "countryCode") => {
//   return data?.map((item) => {
//     const countryName = countryCode.getName(item[property]);
//     const country = countryCode.getCountry(countryName);
//     return {
//       ...item,
//       country: countryName,
//       countryCode: country.iso3,
//     };
//   });
// };
// const data = conflictsData.Result;
console.log("conflcitsData", conflictsData);
const formatConflicts = (data, property = "countryCode") => {
  const conflicts =
    // data !== undefined ||
    // (data.length > 0 &&
    data?.map((item) => ({
      ...item,
      countryCode: countryCode.byCountry(item.country)?.iso3 || [],
    }));
  // .filter((item) => item.countryCode !== undefined));
  const groupedData = groupObjectByProperty(conflicts, "countryCode");
  console.log("groupedData", groupedData);
  // const formattedData(maxConflicts)
  const maxConflicts = Object.keys(groupedData).reduce((max, country) =>
    max > groupedData[country].conflicts ? max : groupedData[country].conflicts
  );

  return { conflicts: groupedData, maxConflicts };
};
//   reduce(callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string): string
// A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
// Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

const data = formatConflicts(conflictsData.Result);
console.log("data", data);

console.log("formatConflicts.Result", formatConflicts(conflictsData.Result));
const MapChart = ({ setTooltipContent }) => {
  const [data, setdata] = useState([]);
  const [maxConflicts, setMaxConflicts] = useState(0);

  useEffect(() => {
    setdata(formatConflicts(conflictsData.Result));
    setMaxConflicts(data.maxConflicts);
  }, []);

  const colorScale = scaleLinear().domain([0, 100]).range(["#FFF", "#06F"]);

  return (
    <>
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 170,
        }}
      >
        <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
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
};
export default MapChart;

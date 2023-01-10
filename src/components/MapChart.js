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
import { formatConflicts } from "../components/FormatData";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";
// const geoUrl =
//   "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

const MapChart = ({ setTooltipContent }) => {
  const [data, setData] = useState([]);
  const [maxConflicts, setMaxConflicts] = useState(0);
  const [param, setParam] = useState("conflicts");

  useEffect(() => {
    const { conflicts, maxConflicts } = formatConflicts(conflictsData.Result);
    setData(conflicts);
    setMaxConflicts(maxConflicts);
  }, []);

  const colorScale = scaleLinear()
    .domain([0, maxConflicts])
    .range(["#ffedea", "#ff5233"]);
  // .range(["#FFF", "#06F"]);

  const changeType = (e) => {
    const type = Number(e.target.value);
    const data = type
      ? conflictsData.Result.filter(
          (conflict) => conflict.type_of_violence === type
        )
      : conflictsData.Result;

    const { conflicts, maxConflicts } = formatConflicts(data);
    setData(conflicts);
    setMaxConflicts(maxConflicts);
  };

  const changeParam = (e) => {
    setParam(e.target.value);
  };

  //   console.log(
  //     "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json"
  //   );
  return (
    <>
      <select name="type" onChange={changeType}>
        <option value="">all types</option>
        <option value="1">state-based</option>
        <option value="2">non-state</option>
        <option value="3">one-sided</option>
      </select>
      <select name="type" onChange={changeParam}>
        <option value="conflicts">conflicts</option>
        <option value="fatalities">fatalities</option>
      </select>
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 170,
        }}
        data-tip=""
        width={1400}
        height={500}
      >
        <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryCode = geo.id || geo.properties.ISO_A3;
              const d = data[countryCode];

              //   console.log("countryCode", geo.id);
              //   console.log("d", d);
              //   console.log("param", param);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={d ? colorScale(d[param]) : "#F5F4F6"}
                  onMouseEnter={() => {
                    const stats = geo.properties?.name;

                    try {
                      setTooltipContent(`${stats} - ${d[param]}`);
                      setTooltipContent(
                        `${stats} - events: ${d.conflicts || 0} - fatalities: ${
                          d.fatalities || 0
                        }`
                      );
                    } catch {
                      setTooltipContent("");
                    }
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </>
  );
};
export default MapChart;

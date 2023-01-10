import { useState } from "react";
import "./App.css";
import MapChart from "./components/MapChart";
import { Tooltip as Reacttooltip } from "react-tooltip";

function App() {
  const [content, setContent] = useState("");

  return (
    <>
      <p>Conflict Map</p>
      <MapChart setTooltipContent={setContent} />
      <Reacttooltip>{content}</Reacttooltip>
    </>
  );
}

export default App;

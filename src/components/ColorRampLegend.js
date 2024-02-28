import "../App.css";
const ColorRampLegend = ({ colorScale, min, max, title }) => {
  // Generate gradient stops for the SVG
  const gradientStops = colorScale.ticks(10).map((value) => ({
    offset: `${(100 * (value - min)) / (max - min)}%`,
    color: colorScale(value),
  }));

  return (
    <div className="color-ramp-legend">
      <span>Number of Conflicts</span>
      <svg width="100%" height="40">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            {gradientStops.map((stop, i) => (
              <stop key={i} offset={stop.offset} stopColor={stop.color} />
            ))}
          </linearGradient>
        </defs>
        <rect x="0" y="10" width="100%" height="20" fill="url(#gradient)" />
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
  //   return (
  //     <div className="color-ramp-legend">
  //       <div className="legend-title">{title}</div>
  //       <svg width="100%" height="40">
  //         <defs>
  //           <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
  //             {gradientStops.map((stop, i) => (
  //               <stop key={i} offset={stop.offset} stopColor={stop.color} />
  //             ))}
  //           </linearGradient>
  //         </defs>
  //         <rect x="0" y="10" width="100%" height="20" fill="url(#gradient)" />
  //       </svg>
  //       <div style={{ display: "flex", justifyContent: "space-between" }}>
  //         <span>{min}</span>
  //         <span>{max}</span>
  //       </div>
  //     </div>
  //   );
};

export default ColorRampLegend;

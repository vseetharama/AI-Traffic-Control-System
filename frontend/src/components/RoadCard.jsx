// RoadCard.jsx → SINGLE ROAD DISPLAY CARD

import tokens from "../styles/tokens";
import SignalLight from "./SignalLight";

function RoadCard({ road }) {

  return (
    <div style={{
      background: tokens.card,
      border: `0.5px solid ${tokens.border}`,
      borderRadius: "16px",
      padding: "20px",
      textAlign: "center"
    }}>

      {/* ROAD NAME */}
      <h3>{road.name}</h3>

      {/* SIGNAL COMPONENT */}
      <SignalLight signal={road.signal} />

      {/* SIGNAL TEXT */}
      <h4 style={{
        color: road.signal === "GREEN"
          ? tokens.green
          : tokens.red
      }}>
        {road.signal}
      </h4>

      {/* TIMER */}
      <p>⏱ Timer: {road.timer} sec</p>

      {/* PREDICTION */}
      <p>📊 {road.prediction}</p>

    </div>
  );
}

export default RoadCard;
// Dashboard.jsx → MAIN TRAFFIC DISPLAY PAGE

import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import RoadCard from "../components/RoadCard";

function Dashboard() {

  // STATE → stores data for 4 roads
  const [roads, setRoads] = useState([
    { name: "Road 1", signal: "GREEN", timer: 10, prediction: "Peak soon" },
    { name: "Road 2", signal: "RED", timer: 10, prediction: "Normal" },
    { name: "Road 3", signal: "RED", timer: 10, prediction: "Low traffic" },
    { name: "Road 4", signal: "RED", timer: 10, prediction: "Normal" }
  ]);

  // Tracks which road is currently GREEN
  const [activeIndex, setActiveIndex] = useState(0);

  // TIMER LOGIC → runs every second
  useEffect(() => {
    const interval = setInterval(() => {

      setRoads(prev => {
        let updated = [...prev];

        // Decrease timer of active road
        updated[activeIndex].timer--;

        // When timer reaches 0 → switch signal
        if (updated[activeIndex].timer <= 0) {

          // Current road becomes RED
          updated[activeIndex].signal = "RED";
          updated[activeIndex].timer = 10;

          // Move to next road (circular)
          let next = (activeIndex + 1) % 4;

          // Next road becomes GREEN
          updated[next].signal = "GREEN";

          setActiveIndex(next);
        }

        return updated;
      });

    }, 1000);

    // Cleanup interval
    return () => clearInterval(interval);

  }, [activeIndex]);

  return (

    // Layout → provides background + styling
    <Layout>

      {/* TITLE */}
      <h1 style={{ textAlign: "center" }}>
        🚦 AI Traffic Control System
      </h1>

      {/* GRID → 2x2 layout for roads */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        marginTop: "20px"
      }}>

        {/* LOOP → renders 4 road cards */}
        {roads.map((road, i) => (
          <RoadCard key={i} road={road} />
        ))}

      </div>

    </Layout>
  );
}

export default Dashboard;
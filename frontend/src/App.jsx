import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

function App() {

  const [roads, setRoads] = useState([
    { name: "Road 1", signal: "GREEN", timer: 10, prediction: "Peak soon" },
    { name: "Road 2", signal: "RED", timer: 10, prediction: "Normal" },
    { name: "Road 3", signal: "RED", timer: 10, prediction: "Low traffic" },
    { name: "Road 4", signal: "RED", timer: 10, prediction: "Normal" }
  ]);

  const [activeIndex, setActiveIndex] = useState(0);

  const predictionsList = [
    "Peak in next 10 min",
    "Rush expected at 8:30 AM",
    "Heavy congestion expected",
    "Traffic normal",
    "Low traffic"
  ];

  useEffect(() => {
    const interval = setInterval(() => {

      setRoads(prevRoads => {
        let updated = [...prevRoads];

        // Decrease timer of active road
        updated[activeIndex].timer -= 1;

        if (updated[activeIndex].timer <= 0) {

          updated[activeIndex].signal = "RED";
          updated[activeIndex].timer = 10;

          let nextIndex = (activeIndex + 1) % 4;

          updated[nextIndex].signal = "GREEN";

          // Random prediction
          updated[nextIndex].prediction =
            predictionsList[Math.floor(Math.random() * predictionsList.length)];

          setActiveIndex(nextIndex);
        }

        return updated;
      });

    }, 1000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div
      className="container text-center mt-4 p-4"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0f7fa, #e1bee7)",
        borderRadius: "20px"
      }}
    >

      <h1 style={{ fontWeight: "bold", color: "#222", letterSpacing: "1px" }}>
        AI Traffic Control System
      </h1>

      <div className="row mt-4">
        {roads.map((road, index) => (
          <div className="col-md-6 mb-3" key={index}>

            <div
              className="card p-4 shadow border-0"
              style={{
                borderRadius: "15px",
                backgroundColor: "#ffffffcc",
                backdropFilter: "blur(5px)"
              }}
            >

              <h3>{road.name}</h3>

              {/* Signal Light */}
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  margin: "10px auto",
                  backgroundColor: road.signal === "GREEN" ? "#28a745" : "#dc3545",
                  boxShadow: road.signal === "GREEN"
                    ? "0 0 20px #28a745"
                    : "0 0 20px #dc3545"
                }}
              ></div>

              <h5 className={
                road.signal === "GREEN" ? "text-success" : "text-danger"
              }>
                {road.signal}
              </h5>

              <p><strong>Timer:</strong> {road.timer} sec</p>
              <p><strong>Prediction:</strong> {road.prediction}</p>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
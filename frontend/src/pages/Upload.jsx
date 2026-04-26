// Upload.jsx → VIDEO INPUT PAGE

import { useState } from "react";
import Layout from "../components/Layout";
import UploadBox from "../components/UploadBox";

function Upload() {

  // STATE → stores uploaded videos
  const [videos, setVideos] = useState({});

  // HANDLE DRAG & DROP
  const handleDrop = (e, road) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    // Save video for that road
    setVideos(prev => ({ ...prev, [road]: file }));
  };

  // HANDLE FILE SELECT
  const handleChange = (e, road) => {
    const file = e.target.files[0];

    setVideos(prev => ({ ...prev, [road]: file }));
  };

  return (

    // Layout → same background as dashboard
    <Layout>

      {/* TITLE */}
      <h2 style={{ textAlign: "center" }}>
        📂 Upload Traffic Videos
      </h2>

      {/* GRID → 4 upload boxes */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        marginTop: "20px"
      }}>

        {/* LOOP → renders upload boxes */}
        {["road1","road2","road3","road4"].map(r => (
          <UploadBox
            key={r}
            road={r}
            onDrop={handleDrop}
            onChange={handleChange}
            file={videos[r]}
          />
        ))}

      </div>

    </Layout>
  );
}

export default Upload;
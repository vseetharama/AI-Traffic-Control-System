// Upload.jsx → VIDEO INPUT PAGE

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import UploadBox from "../components/UploadBox";

function Upload() {

  // STATE → stores uploaded videos
  const [videos, setVideos] = useState({});
  const [uploading, setUploading] = useState(false);
  const [processed, setProcessed] = useState(false);
  const navigate = useNavigate();

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

  // HANDLE UPLOAD
  const handleUpload = async () => {
    // Check if at least one file is selected
    if (!videos.road1 && !videos.road2 && !videos.road3 && !videos.road4) {
      alert("Please select at least one video");
      return;
    }

    try {
      setUploading(true);
      console.log("Starting upload...", videos);

      // Create FormData
      const formData = new FormData();

      // Append all files
      if (videos.road1) formData.append("road1", videos.road1);
      if (videos.road2) formData.append("road2", videos.road2);
      if (videos.road3) formData.append("road3", videos.road3);
      if (videos.road4) formData.append("road4", videos.road4);

      // Send POST request to backend
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Upload successful:", responseData);
        alert("✅ Videos uploaded successfully!");
        setVideos({}); // Clear files after successful upload
        setProcessed(true); // Show View Results button
      } else {
        console.error("Upload failed:", responseData);
        alert(`❌ Upload failed: ${responseData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(`❌ Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (

    // Layout → same background as dashboard
    <Layout>

      {/* CENTER CONTAINER */}
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">

        {/* HEADER SECTION */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-3">
          📂 Upload Traffic Videos
        </h1>
        <p className="text-gray-400 text-lg mb-12">
          Upload road footage for AI-based traffic analysis and optimization
        </p>

        {/* GLOW BACKGROUND */}
        <div className="absolute -top-40 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-500/20 blur-3xl -z-10"></div>

        {/* GRID → 4 upload cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">

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

        {/* ACTION BUTTON */}
        <button 
          onClick={handleUpload}
          disabled={uploading}
          className="mt-12 px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg shadow-purple-500/40 hover:scale-105 hover:shadow-purple-500/60 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? "Uploading..." : "Process Traffic Data"}
        </button>

        {/* VIEW RESULTS BUTTON - ONLY AFTER UPLOAD SUCCESS */}
        {processed && !uploading && (
          <button
            onClick={() => navigate("/results/road1")}
            className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:scale-105 transition shadow-lg shadow-purple-500/40"
          >
            📊 View Results
          </button>
        )}

      </div>

    </Layout>
  );
}

export default Upload;
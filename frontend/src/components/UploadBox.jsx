// UploadBox.jsx → DRAG & DROP VIDEO INPUT COMPONENT

import tokens from "../styles/tokens";

function UploadBox({ road, onDrop, onChange, file }) {

  return (
    <div
      // Drag events
      onDrop={(e) => onDrop(e, road)}
      onDragOver={(e) => e.preventDefault()}

      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-lg shadow-purple-500/20 hover:scale-105 hover:shadow-purple-500/40 transition"
    >

      {/* ROAD LABEL */}
      <h3 className="text-2xl font-semibold text-white mb-2">
        {road === "road1" && "🚗"}
        {road === "road2" && "🚗"}
        {road === "road3" && "🚗"}
        {road === "road4" && "🚗"} {road.toUpperCase()}
      </h3>

      <p className="text-gray-400 mb-6">Drag & Drop Video</p>

      {/* FILE INPUT - HIDDEN */}
      <input
        type="file"
        accept="video/*"
        onChange={(e) => onChange(e, road)}
        id={`file-${road}`}
        className="hidden"
      />

      {/* STYLED BUTTON */}
      <label
        htmlFor={`file-${road}`}
        className="inline-block px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium cursor-pointer transition"
      >
        Select Video
      </label>

      {/* SHOW FILE NAME */}
      {file && (
        <p className="text-green-400 mt-4 font-semibold">
          ✅ {file.name}
        </p>
      )}

    </div>
  );
}

export default UploadBox;
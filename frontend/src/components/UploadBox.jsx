// UploadBox.jsx → DRAG & DROP VIDEO INPUT COMPONENT

import tokens from "../styles/tokens";

function UploadBox({ road, onDrop, onChange, file }) {

  return (
    <div
      // Drag events
      onDrop={(e) => onDrop(e, road)}
      onDragOver={(e) => e.preventDefault()}

      style={{
        background: tokens.card,
        border: `2px dashed ${tokens.border}`,
        borderRadius: "16px",
        padding: "30px",
        textAlign: "center"
      }}
    >

      {/* ROAD LABEL */}
      <h4>{road.toUpperCase()}</h4>

      <p>Drag & Drop Video</p>

      {/* FILE INPUT */}
      <input
        type="file"
        accept="video/*"
        onChange={(e) => onChange(e, road)}
      />

      {/* SHOW FILE NAME */}
      {file && (
        <p style={{ color: tokens.green }}>
          {file.name}
        </p>
      )}

    </div>
  );
}

export default UploadBox;
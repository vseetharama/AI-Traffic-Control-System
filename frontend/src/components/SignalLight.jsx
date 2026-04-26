// SignalLight.jsx → TRAFFIC SIGNAL CIRCLE

import tokens from "../styles/tokens";

function SignalLight({ signal }) {

  return (
    <div style={{
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      margin: "15px auto",

      // Color based on signal
      backgroundColor: signal === "GREEN"
        ? tokens.green
        : tokens.red,

      // Glow effect
      boxShadow: signal === "GREEN"
        ? `0 0 20px ${tokens.green}`
        : `0 0 20px ${tokens.red}`
    }} />
  );
}

export default SignalLight;
// Layout.jsx → COMMON PAGE WRAPPER (BACKGROUND + GRID)

import tokens from "../styles/tokens";

function Layout({ children }) {

  return (

    // MAIN CONTAINER → applied to all pages
    <div style={{
      minHeight: "100vh",

      // Dark background
      backgroundColor: tokens.bg,

      // GRID BACKGROUND (futuristic look)
      backgroundImage: `
        linear-gradient(${tokens.border} 1px, transparent 1px),
        linear-gradient(90deg, ${tokens.border} 1px, transparent 1px)
      `,
      backgroundSize: "50px 50px",

      color: tokens.text,
      padding: "30px"
    }}>

      {/* CHILDREN → page content */}
      {children}

    </div>
  );
}

export default Layout;
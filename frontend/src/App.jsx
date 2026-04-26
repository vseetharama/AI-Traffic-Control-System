// App.jsx → Routing configuration

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";

function App() {
  return (
    <BrowserRouter>

      {/* ROUTES → Defines pages */}
      <Routes>

        {/* Dashboard Page (Main UI) */}
        <Route path="/" element={<Dashboard />} />

        {/* Upload Page (Video Input) */}
        <Route path="/upload" element={<Upload />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
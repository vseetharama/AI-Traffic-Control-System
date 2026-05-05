import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Members from "./pages/Members";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Results from "./pages/Results";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Members />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/results/:road" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
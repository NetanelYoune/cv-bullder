import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import EditorPage from "./pages/EditorPage";
import PreviewPage from "./pages/PreviewPage";

export default function App() {
  return (
    <div className="app-shell">
      <div className="app-container">
        <div className="main-title">Resume</div>
        <div className="subtle">CV Builder — Editor & Preview</div>

        <Navbar />

        <Routes>
          <Route path="/" element={<Navigate to="/editor" replace />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </div>
    </div>
  );
}
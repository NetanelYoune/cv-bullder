import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import EditorPage from "./pages/EditorPage.jsx";
import PreviewPage from "./pages/PreviewPage.jsx";

function Topbar() {
  const { pathname } = useLocation();

  return (
    <div className="topbar">
      <div className="topbar-inner">
        <div className="brand">
          <div className="brand-badge" />
          <div>
            CV Builder
            <div className="small">React + Express</div>
          </div>
        </div>

        <div className="nav">
          <Link
            to="/editor"
            style={{
              color: pathname === "/editor" ? "var(--text)" : undefined,
            }}
          >
            Editor
          </Link>
          <Link
            to="/preview"
            style={{
              color: pathname === "/preview" ? "var(--text)" : undefined,
            }}
          >
            Preview
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Topbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/editor" replace />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="*" element={<Navigate to="/editor" replace />} />
        </Routes>
      </div>
    </>
  );
}
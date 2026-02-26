import { useContext } from "react";
import { CvContext } from "../context/CvContext.jsx";

export default function PreviewPage() {
  const { cv } = useContext(CvContext);

  return (
    <div className="card">
      <div className="card-title">
        <h1 className="h1">Resume Preview</h1>
        <span className="badge">Professional layout</span>
      </div>

      <div className="cv">
        <div className="cv-header">
          <h2 className="cv-name">{cv.fullName || "Your Name"}</h2>
          <p className="cv-contact">
            {(cv.email || "email")} · {(cv.phone || "phone")}
          </p>
        </div>

        <div className="section-title">Summary</div>
        <p className="p">{cv.summary || "Write a short professional summary in the editor."}</p>

        <div className="section-title">Experience</div>
        {Array.isArray(cv.experiences) && cv.experiences.length > 0 ? (
          <div className="grid" style={{ gap: 10 }}>
            {cv.experiences.map((exp, idx) => (
              <div key={idx} className="card" style={{ padding: 14, background: "rgba(255,255,255,0.04)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <div style={{ fontWeight: 800 }}>{exp.title || "Title"}</div>
                  <div className="small">{exp.years || exp.period || ""}</div>
                </div>
                <div className="small" style={{ marginTop: 4 }}>{exp.company || ""}</div>
                <p className="p" style={{ marginTop: 8 }}>{exp.description || ""}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="p" style={{ color: "var(--muted)" }}>
            No experiences yet. Add experiences in the editor to see them here.
          </p>
        )}
      </div>
    </div>
  );
}
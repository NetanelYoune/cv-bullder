import { useEffect, useState } from "react";
import { getCvFromServer } from "../api/cvApi.js";

export default function PreviewPage() {
  const [cv, setCv] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setError("");
        const data = await getCvFromServer(); // GET /api/cv
        setCv(data);
      } catch (err) {
        // אם אין CV בשרת או שיש בעיה
        setCv(null);
        setError("No CV on server yet. Go to Editor and click Save CV.");
      }
    };

    load();
  }, []);

  if (error) {
    return (
      <div className="card">
        <h1 className="h1">Preview</h1>
        <p className="p" style={{ color: "var(--muted)" }}>
          {error}
        </p>
        <a className="btn" href="/editor" style={{ marginTop: 12 }}>
          Back to Editor
        </a>
      </div>
    );
  }

  if (!cv) {
    return (
      <div className="card">
        <h1 className="h1">Preview</h1>
        <p className="p" style={{ color: "var(--muted)" }}>
          Loading CV from server...
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 className="h1">CV Preview (From Server)</h1>
        <a className="btn" href="/editor">
          Back to Editor
        </a>
      </div>

      <div className="cv" style={{ marginTop: 14 }}>
        <div className="cv-header">
          <div className="cv-name">{cv.fullName || "Your Name"}</div>
          <p className="cv-contact">
            {(cv.email || "email")} · {(cv.phone || "phone")}
          </p>
        </div>

        <div className="section-title">Summary</div>
        <p className="p">{cv.summary || "No summary yet."}</p>

        <div className="section-title">Experience</div>
        {Array.isArray(cv.experiences) && cv.experiences.length > 0 ? (
          <div className="grid" style={{ gap: 12 }}>
            {cv.experiences.map((exp, idx) => (
              <div key={exp.id || idx} className="card" style={{ padding: 12, background: "rgba(0,0,0,0.18)" }}>
                <div style={{ fontWeight: 800 }}>
                  {exp.title || exp.role || "Title"}
                </div>
                <div className="small" style={{ marginTop: 4 }}>
                  {(exp.company || "")}
                  {" "}
                  {(exp.years ? `· ${exp.years}` : "")}
                  {(exp.startYear || exp.endYear) ? `· ${exp.startYear || ""} - ${exp.endYear || ""}` : ""}
                </div>
                <p className="p" style={{ marginTop: 8 }}>
                  {exp.description || ""}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="p" style={{ color: "var(--muted)" }}>
            No experiences yet.
          </p>
        )}
      </div>
    </div>
  );
}
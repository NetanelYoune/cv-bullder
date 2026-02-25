import { useCv } from "../context/CvContext";

export default function PreviewPage() {
  const { cv } = useCv();

  return (
    <div className="section" style={{ background: "rgba(255,255,255,0.02)" }}>
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.10)", paddingBottom: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 28, fontWeight: 900 }}>
          {cv.fullName || "Full Name"}
        </div>
        <div className="muted" style={{ marginTop: 6 }}>
          {(cv.email || "email@example.com") + "  •  " + (cv.phone || "Phone")}
        </div>
      </div>

      <h3 className="section-title">Summary</h3>
      <div className="card" style={{ marginBottom: 14 }}>
        {cv.summary || <span className="muted">Write a short professional summary...</span>}
      </div>

      <h3 className="section-title">Experience</h3>
      {cv.experiences.length === 0 ? (
        <div className="muted">No experiences yet.</div>
      ) : (
        <div className="cards">
          {cv.experiences.map((e) => (
            <div className="card" key={e.id}>
              <div style={{ fontWeight: 900 }}>
                {e.role || "Role"} — {e.company || "Company"}{" "}
                {e.years ? <span className="muted">({e.years})</span> : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
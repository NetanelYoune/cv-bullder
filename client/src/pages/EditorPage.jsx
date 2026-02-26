import { useContext, useMemo, useState } from "react";
import { CvContext } from "../context/CvContext.jsx";
import { saveCvToServer } from "../api/cvApi.js";

export default function EditorPage() {
  const { cv, setCv } = useContext(CvContext);
  const [saveStatus, setSaveStatus] = useState("");

  const statusBadge = useMemo(() => {
    if (!saveStatus) return null;
    if (saveStatus.includes("Saved")) return <span className="badge ok">{saveStatus}</span>;
    if (saveStatus.includes("failed")) return <span className="badge err">{saveStatus}</span>;
    return <span className="badge">{saveStatus}</span>;
  }, [saveStatus]);

  const handleChange = (e) => {
    setCv({ ...cv, [e.target.name]: e.target.value });
  };

  const handleSaveToServer = async () => {
    try {
      setSaveStatus("Saving...");
      await saveCvToServer(cv);
      setSaveStatus("Saved ✅");
      setTimeout(() => setSaveStatus(""), 1500);
    } catch (err) {
      setSaveStatus("Save failed ❌");
    }
  };

  const handleReset = () => {
    setCv({
      fullName: "",
      email: "",
      phone: "",
      summary: "",
      experiences: [],
    });
  };

  return (
    <div className="grid grid-2">
      <div className="card">
        <div className="card-title">
          <h1 className="h1">Resume Editor</h1>
          {statusBadge}
        </div>
        <p className="subtext">
          Fill your details and save them to the server. The preview page will render a clean, professional CV.
        </p>

        <div className="form" style={{ marginTop: 16 }}>
          <div className="field">
            <div className="label">Full name</div>
            <input
              className="input"
              name="fullName"
              placeholder="e.g., Nati Cohen"
              value={cv.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="field">
              <div className="label">Email</div>
              <input
                className="input"
                name="email"
                placeholder="e.g., nati@mail.com"
                value={cv.email}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <div className="label">Phone</div>
              <input
                className="input"
                name="phone"
                placeholder="e.g., 050-1234567"
                value={cv.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <div className="label">Professional summary</div>
            <textarea
              className="textarea"
              name="summary"
              placeholder="Write 3–5 lines that describe your strengths, experience, and what you're looking for."
              value={cv.summary}
              onChange={handleChange}
            />
          </div>

          <div className="actions">
            <button className="btn btn-primary" type="button" onClick={handleSaveToServer}>
              Save to Server
            </button>
            <button className="btn" type="button" onClick={handleReset}>
              Reset
            </button>
            <span className="small">Tip: go to Preview to see the CV layout.</span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">
          <h1 className="h1" style={{ fontSize: 20 }}>Quick Preview</h1>
          <h2 className="h2">Live from Context</h2>
        </div>

        <div className="cv">
          <div className="cv-header">
            <div className="cv-name">{cv.fullName || "Your Name"}</div>
            <p className="cv-contact">
              {(cv.email || "email")} · {(cv.phone || "phone")}
            </p>
          </div>

          <div className="section-title">Summary</div>
          <p className="p">{cv.summary || "Your summary will appear here…"}</p>
        </div>
      </div>
    </div>
  );
}
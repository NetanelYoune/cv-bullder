import { useContext, useMemo, useState } from "react";
import { CvContext } from "../context/CvContext.jsx";
import { saveCvToServer, improveSummary } from "../api/cvApi.js";

export default function EditorPage() {
  const { cv, setCv } = useContext(CvContext);

  const [saveStatus, setSaveStatus] = useState("");
  const [aiStatus, setAiStatus] = useState("");

  const statusBadge = useMemo(() => {
    if (!saveStatus && !aiStatus) return null;
    const text = aiStatus || saveStatus;
    if (text.includes("✅")) return <span className="badge ok">{text}</span>;
    if (text.includes("❌")) return <span className="badge err">{text}</span>;
    return <span className="badge">{text}</span>;
  }, [saveStatus, aiStatus]);

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

  const handleImproveSummary = async () => {
    try {
      setAiStatus("Improving...");
      const result = await improveSummary(cv.summary || "");
      setCv({ ...cv, summary: result.improvedText });
      setAiStatus("Improved ✅");
      setTimeout(() => setAiStatus(""), 1500);
    } catch (err) {
      setAiStatus("AI failed ❌");
    }
  };

  // ===== Experiences =====
  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      title: "",
      company: "",
      years: "",
      description: "",
    };
    setCv({ ...cv, experiences: [...(cv.experiences || []), newExp] });
  };

  const updateExperience = (id, field, value) => {
    const updated = (cv.experiences || []).map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    setCv({ ...cv, experiences: updated });
  };

  const deleteExperience = (id) => {
    const filtered = (cv.experiences || []).filter((exp) => exp.id !== id);
    setCv({ ...cv, experiences: filtered });
  };

  return (
    <div className="grid grid-2">
      {/* LEFT: Editor */}
      <div className="card">
        <div className="card-title">
          <h1 className="h1">Resume Editor</h1>
          {statusBadge}
        </div>

        <div className="form" style={{ marginTop: 16 }}>
          <div className="field">
            <div className="label">Full name</div>
            <input
              className="input"
              name="fullName"
              placeholder="e.g., Nati Cohen"
              value={cv.fullName || ""}
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
                value={cv.email || ""}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <div className="label">Phone</div>
              <input
                className="input"
                name="phone"
                placeholder="e.g., 050-1234567"
                value={cv.phone || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <div className="label">Professional summary</div>
            <textarea
              className="textarea"
              name="summary"
              placeholder="Write 3–5 lines that describe your strengths..."
              value={cv.summary || ""}
              onChange={handleChange}
            />
            <button
              className="btn"
              type="button"
              onClick={handleImproveSummary}
              style={{ marginTop: 10 }}
            >
              Improve Summary with AI
            </button>
          </div>

          {/* Experiences */}
          <div className="card" style={{ padding: 14, background: "rgba(255,255,255,0.04)" }}>
            <div className="card-title" style={{ marginBottom: 10 }}>
              <h2 className="h2" style={{ color: "var(--text)" }}>Experience</h2>
              <button className="btn" type="button" onClick={addExperience}>
                + Add Experience
              </button>
            </div>

            {Array.isArray(cv.experiences) && cv.experiences.length > 0 ? (
              <div className="grid" style={{ gap: 12 }}>
                {cv.experiences.map((exp) => (
                  <div key={exp.id} className="card" style={{ padding: 14, background: "rgba(0,0,0,0.18)" }}>
                    <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <div className="field">
                        <div className="label">Title</div>
                        <input
                          className="input"
                          value={exp.title || ""}
                          onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                          placeholder="e.g., Frontend Developer"
                        />
                      </div>

                      <div className="field">
                        <div className="label">Company</div>
                        <input
                          className="input"
                          value={exp.company || ""}
                          onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                          placeholder="e.g., Company name"
                        />
                      </div>
                    </div>

                    <div className="field" style={{ marginTop: 10 }}>
                      <div className="label">Years / Period</div>
                      <input
                        className="input"
                        value={exp.years || ""}
                        onChange={(e) => updateExperience(exp.id, "years", e.target.value)}
                        placeholder="e.g., 2023 - 2025"
                      />
                    </div>

                    <div className="field" style={{ marginTop: 10 }}>
                      <div className="label">Description</div>
                      <textarea
                        className="textarea"
                        value={exp.description || ""}
                        onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                        placeholder="What did you do? What impact?"
                      />
                    </div>

                    <div className="actions">
                      <button className="btn" type="button" onClick={() => deleteExperience(exp.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="p" style={{ color: "var(--muted)" }}>
                No experiences yet. Click “Add Experience”.
              </p>
            )}
          </div>

          <div className="actions" style={{ marginTop: 12 }}>
            <button className="btn btn-primary" type="button" onClick={handleSaveToServer}>
              Save CV
            </button>
            <a className="btn" href="/preview">
              Go to Preview
            </a>
          </div>
        </div>
      </div>

      {/* RIGHT: Quick Preview */}
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

          <div className="section-title">Experience</div>
          {Array.isArray(cv.experiences) && cv.experiences.length > 0 ? (
            <div className="grid" style={{ gap: 10 }}>
              {cv.experiences.slice(0, 2).map((exp) => (
                <div key={exp.id}>
                  <div style={{ fontWeight: 800 }}>{exp.title || "Title"}</div>
                  <div className="small">{exp.company || ""} {exp.years ? `· ${exp.years}` : ""}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="p" style={{ color: "var(--muted)" }}>No experiences yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
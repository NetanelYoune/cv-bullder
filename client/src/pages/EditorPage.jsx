import { useState } from "react";
import { Link } from "react-router-dom";
import { useCv } from "../context/CvContext";

export default function EditorPage() {
  const { cv, setCv } = useCv();

  const [exp, setExp] = useState({ company: "", role: "", years: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setCv({ ...cv, [name]: value });
  }

  function handleExpChange(e) {
    const { name, value } = e.target;
    setExp({ ...exp, [name]: value });
  }

  function addExperience() {
    if (!exp.company || !exp.role) return;

    const newExp = { id: Date.now(), ...exp };
    setCv({ ...cv, experiences: [...cv.experiences, newExp] });
    setExp({ company: "", role: "", years: "" });
  }

  function removeExperience(id) {
    setCv({ ...cv, experiences: cv.experiences.filter((e) => e.id !== id) });
  }

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <Link className="nav-link" to="/preview">Go to Preview</Link>
      </div>

      <div className="section">
        <h3 className="section-title">Basic Information</h3>

        <div className="grid">
          <input className="input" name="fullName" placeholder="Full name" value={cv.fullName} onChange={handleChange} />
          <input className="input" name="email" placeholder="Email" value={cv.email} onChange={handleChange} />
          <input className="input" name="phone" placeholder="Phone" value={cv.phone} onChange={handleChange} />
          <textarea className="textarea" name="summary" placeholder="Professional summary" value={cv.summary} onChange={handleChange} rows={4} />
        </div>
      </div>

      <div className="section">
        <h3 className="section-title">Experience</h3>

        <div className="grid" style={{ marginBottom: 12 }}>
          <input className="input" name="company" placeholder="Company" value={exp.company} onChange={handleExpChange} />
          <input className="input" name="role" placeholder="Role" value={exp.role} onChange={handleExpChange} />
          <input className="input" name="years" placeholder="Years (e.g. 2022-2024)" value={exp.years} onChange={handleExpChange} />
          <button className="btn" onClick={addExperience}>Add Experience</button>
        </div>

        {cv.experiences.length === 0 ? (
          <div className="muted">No experiences yet.</div>
        ) : (
          <div className="cards">
            {cv.experiences.map((e) => (
              <div className="card" key={e.id}>
                <div style={{ fontWeight: 800 }}>
                  {e.role} — {e.company} {e.years ? <span className="muted">({e.years})</span> : null}
                </div>
                <div style={{ marginTop: 10 }}>
                  <button className="btn btn-danger" onClick={() => removeExperience(e.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
const express = require("express");
const cors = require("cors");

console.log("✅ RUNNING: server/src/index.js"); // רק כדי לוודא שזה הקובץ שרץ

const app = express();
app.use(cors());
app.use(express.json());

let savedCv = null;

// Health
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Server is running" });
});

// Save CV
app.post("/api/cv/save", (req, res) => {
  savedCv = req.body;
  res.json({ success: true, message: "CV saved successfully" });
});

// Get CV ✅ חשוב ל-Preview
app.get("/api/cv", (req, res) => {
  if (!savedCv) {
    return res.status(404).json({ message: "No CV found" });
  }
  res.json(savedCv);
});

// Fake AI
function improveSummaryText(summary) {
  return `Professional Summary:\n\n${summary}\n\nA highly motivated and results-driven professional with strong communication skills and proven ability to deliver high-quality work.`;
}

function improveExperienceText(role, company, description) {
  return `As a ${role} at ${company}, I was responsible for ${description}. During this role, I demonstrated leadership, problem-solving skills, and a strong commitment to achieving business objectives.`;
}

app.post("/api/improve-summary", (req, res) => {
  const { summary } = req.body;
  if (!summary) {
    return res.status(400).json({ message: "Summary is required" });
  }
  res.json({ improvedText: improveSummaryText(summary) });
});

app.post("/api/improve-experience", (req, res) => {
  const { role, company, description } = req.body;
  if (!role || !company || !description) {
    return res.status(400).json({
      message: "Role, company and description are required",
    });
  }
  res.json({ improvedText: improveExperienceText(role, company, description) });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
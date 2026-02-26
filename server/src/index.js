const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let savedCv = null;

// בדיקה שהשרת עובד
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Server is running" });
});

// שמירת CV
app.post("/api/cv/save", (req, res) => {
  savedCv = req.body;
  res.json({ success: true, message: "CV saved successfully" });
});

// החזרת CV
app.get("/api/cv", (req, res) => {
  if (!savedCv) {
    return res.status(404).json({ message: "No CV found" });
  }

  res.json(savedCv);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
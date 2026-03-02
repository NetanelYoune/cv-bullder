const BASE_URL = "http://localhost:5000/api";

/* ===========================
   Save CV to Server
=========================== */
export async function saveCvToServer(cvData) {
  const response = await fetch(`${BASE_URL}/cv/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cvData),
  });

  if (!response.ok) {
    throw new Error("Failed to save CV");
  }

  return response.json();
}

/* ===========================
   Get CV from Server
=========================== */
export async function getCvFromServer() {
  const response = await fetch(`${BASE_URL}/cv`);

  if (!response.ok) {
    throw new Error("Failed to fetch CV");
  }

  return response.json();
}

/* ===========================
   Improve Summary (Fake AI)
=========================== */
export async function improveSummary(summary) {
  const response = await fetch(`${BASE_URL}/improve-summary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ summary }),
  });

  if (!response.ok) {
    throw new Error("Failed to improve summary");
  }

  return response.json();
}

/* ===========================
   Improve Experience (Fake AI)
=========================== */
export async function improveExperience(role, company, description) {
  const response = await fetch(`${BASE_URL}/improve-experience`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role, company, description }),
  });

  if (!response.ok) {
    throw new Error("Failed to improve experience");
  }

  return response.json();
}
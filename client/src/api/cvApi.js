const BASE_URL = "http://localhost:5000";

export async function saveCvToServer(cv) {
  const res = await fetch(`${BASE_URL}/api/cv/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cv),
  });

  if (!res.ok) {
    throw new Error("Failed to save CV");
  }

  return await res.json();
}
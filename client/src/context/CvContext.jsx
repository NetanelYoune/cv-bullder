import { createContext, useEffect, useState } from "react";

export const CvContext = createContext();

const defaultCv = {
  fullName: "",
  email: "",
  phone: "",
  summary: "",
  experiences: [],
};

export function CvProvider({ children }) {
  const [cv, setCv] = useState(() => {
    const saved = localStorage.getItem("cv");
    return saved ? JSON.parse(saved) : defaultCv;
  });

  useEffect(() => {
    localStorage.setItem("cv", JSON.stringify(cv));
  }, [cv]);

  return (
    <CvContext.Provider value={{ cv, setCv }}>
      {children}
    </CvContext.Provider>
  );
}
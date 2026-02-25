import { createContext, useContext, useEffect, useState } from "react";

const CvContext = createContext(null);

const DEFAULT_CV = {
  fullName: "",
  email: "",
  phone: "",
  summary: "",
  experiences: [],
};

const STORAGE_KEY = "cv_builder_cv";

export function CvProvider({ children }) {
  const [cv, setCv] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_CV;
    } catch (e) {
      return DEFAULT_CV;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cv));
    } catch (e) {}
  }, [cv]);

  return (
    <CvContext.Provider value={{ cv, setCv }}>
      {children}
    </CvContext.Provider>
  );
}

export function useCv() {
  const ctx = useContext(CvContext);
  if (!ctx) {
    throw new Error("useCv must be used inside CvProvider");
  }
  return ctx;
}
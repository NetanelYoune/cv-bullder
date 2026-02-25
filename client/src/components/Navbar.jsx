import { Link } from "react-router-dom";
import { useCv } from "../context/CvContext";

const DEFAULT_CV = {
  fullName: "",
  email: "",
  phone: "",
  summary: "",
  experiences: [],
};

export default function Navbar() {
  const { setCv } = useCv();

  function resetCv() {
    setCv(DEFAULT_CV);
    try {
      localStorage.removeItem("cv_builder_cv");
    } catch (e) {}
  }

  return (
    <div className="navbar">
      <div className="nav-left">
        <Link className="nav-link" to="/editor">Editor</Link>
        <Link className="nav-link" to="/preview">Preview</Link>
      </div>

      <div className="spacer" />

      <button className="btn btn-danger" onClick={resetCv}>Reset</button>
    </div>
  );
}
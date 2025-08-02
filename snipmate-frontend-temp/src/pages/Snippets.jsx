import React, { useState, useEffect } from "react";
import "./Snippets.css";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Snippets() {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const token = userInfo?.token;

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !code.trim()) return;

    try {
      const payload = { title, code, language };
      await api.post("/snippets", payload);

      setTitle("");
      setCode("");
      setLanguage("javascript");

      alert("Snippet added successfully!");
    } catch (err) {
      console.error("Error adding snippet", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("userInfo");
        navigate("/login");
      }
    }
  };

  return (
    <div className="snippet-form-container">
      <form className="snippet-form" onSubmit={handleSubmit}>
        <h2>🚀 Add a New Snippet</h2>

        <input
          type="text"
          placeholder="Snippet Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Enter your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={8}
          required
        />

        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="java">Java</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
        </select>

        <button type="submit">➕ Add Snippet</button>
      </form>
    </div>
  );
}

export default Snippets;

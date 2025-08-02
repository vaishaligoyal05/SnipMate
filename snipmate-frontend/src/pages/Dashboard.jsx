// import React, { useEffect, useState } from "react";
// import "./Dashboard.css";

// function Dashboard() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("userInfo");
//     if (storedUser) {
//       try {
//         setUser(JSON.parse(storedUser));
//       } catch (error) {
//         console.error("Failed to parse user info:", error);
//       }
//     }
//   }, []);

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">Dashboard</div>

//       {user ? (
//         <div className="dashboard-welcome">
//           Welcome back, <strong>{user.username || user.email}</strong>!<br />
//           Here's what's happening:
//         </div>
//       ) : (
//         <div className="dashboard-welcome">Loading user data...</div>
//       )}

//       <div className="card-grid">
//         <div className="dashboard-card">
//           <h3>Analytics</h3>
//           <p>View your app’s performance and traffic statistics.</p>
//         </div>
//         <div className="dashboard-card">
//           <h3>Your Snippets</h3>
//           <p>Access and manage your saved code snippets.</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "./Dashboard.css";
import { FiCopy, FiCheck, FiEdit, FiTrash2 } from "react-icons/fi";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [snippets, setSnippets] = useState([]);
  const [filteredSnippets, setFilteredSnippets] = useState([]);
  const [filters, setFilters] = useState({ title: "", language: "" });
  const [copiedId, setCopiedId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", code: "", language: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        fetchSnippets(parsed.token);
      } catch (err) {
        console.error("Failed to parse user info:", err);
      }
    }
  }, []);

  const fetchSnippets = async (token) => {
    try {
      const { data } = await axios.get("/snippets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnippets(data);
      setFilteredSnippets(data);
    } catch (err) {
      console.error("Failed to fetch snippets:", err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);

    const filtered = snippets.filter((snippet) => {
      const titleMatch = snippet.title.toLowerCase().includes(updatedFilters.title.toLowerCase());
      const langMatch = snippet.language.toLowerCase().includes(updatedFilters.language.toLowerCase());
      return titleMatch && langMatch;
    });

    setFilteredSnippets(filtered);
    setVisibleCount(6);
  };

  const handleCopy = (id, code) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/snippets/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const updated = snippets.filter((s) => s._id !== id);
      setSnippets(updated);
      setFilteredSnippets(updated);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const startEdit = (snippet) => {
    setEditId(snippet._id);
    setEditForm({ title: snippet.title, code: snippet.code, language: snippet.language });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const saveEdit = async () => {
    try {
      const { data } = await axios.put(`/snippets/${editId}`, editForm, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const updated = snippets.map((s) => (s._id === editId ? data : s));
      setSnippets(updated);
      setFilteredSnippets(updated);
      setEditId(null);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({ title: "", code: "", language: "" });
  };

  const visibleSnippets = filteredSnippets.slice(0, visibleCount);
  const canShowMore = visibleCount < filteredSnippets.length;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">Your Snippets</div>

      {user && (
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search by title"
            name="title"
            value={filters.title}
            onChange={handleFilterChange}
          />
          <select name="language" value={filters.language} onChange={handleFilterChange}>
            <option value="">All Languages</option>
            {Array.from(new Set(snippets.map((s) => s.language))).map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="snippet-list">
        {visibleSnippets.length > 0 ? (
          visibleSnippets.map((snippet) =>
            editId === snippet._id ? (
              <div key={snippet._id} className="snippet-card edit-mode">
                <input
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  placeholder="Title"
                />
                <textarea
                  name="code"
                  value={editForm.code}
                  onChange={handleEditChange}
                  rows={6}
                />
                <select
                  name="language"
                  value={editForm.language}
                  onChange={handleEditChange}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="java">Java</option>
                  <option value="c">C</option>
                  <option value="cpp">C++</option>
                </select>
                <div className="edit-actions">
                  <button onClick={saveEdit}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <div key={snippet._id} className="snippet-card">
                <h4>{snippet.title}</h4>
                <p><strong>Language:</strong> {snippet.language}</p>
                <div className="code-container">
                  <pre>{snippet.code}</pre>
                </div>
                <div className="snippet-actions">
                  <button className="copy-btn" onClick={() => handleCopy(snippet._id, snippet.code)}>
                    {copiedId === snippet._id ? <FiCheck /> : <FiCopy />}
                  </button>
                  <button className="edit-btn" onClick={() => startEdit(snippet)}>
                    <FiEdit />
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(snippet._id)}>
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            )
          )
        ) : (
          <p>No snippets found.</p>
        )}
      </div>

      {canShowMore && (
        <div className="show-more-container">
          <button className="show-more-btn" onClick={() => setVisibleCount((prev) => prev + 6)}>
            Show More
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

import React, { useState } from "react";
import { useCbtStore } from "../Store/cbtStore";

const AddSubject = () => {
  const classes = ['Primary', 'Junior Secondary', 'Senior Secondary']


  const [level, setlevel] = useState("");
  const [subjectName, setSubjectName] = useState("");

  const { addSubject, loading, message, error } = useCbtStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!level || !subjectName.trim()) return;

    await addSubject(level, subjectName);
    setSubjectName("");
    setlevel("");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow border-0">
        <div className="card-body">
          <h4 className="mb-3">Add Subject </h4>

          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Exam Dropdown */}
            <div className="mb-3">
              <label className="form-label">Select Level</label>
              <select
                className="form-select"
                value={level}
                onChange={(e) => setlevel(e.target.value)}
                required
              >
                <option value="">-- Choose Level --</option>
                {classes.map((exam, index) => (
                  <option key={index} value={exam}>
                    {exam}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Input */}
            <div className="mb-3">
              <label className="form-label">Subject Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter subject"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Adding..." : "Add Subject"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSubject;

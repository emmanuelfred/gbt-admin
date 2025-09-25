import React, { useState, useEffect } from "react";
import { useCbtStore } from "../Store/cbtStore";

const AddTopic = () => {
  const [levels, setLevels] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [levelId, setLevelId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [topicName, setTopicName] = useState("");

  const { getSubject,examData, addTopic, error, loading,  message } =
    useCbtStore();

  // Fetch levels and subjects
  useEffect(() => {
    getSubject();
  }, [getSubject]);

  // Sync levels from store
  useEffect(() => {
    if (examData && examData.length > 0) {
      setLevels(examData);
    }
  }, [examData]);

  const handleLevelChange = (e) => {
    const selectedLevelId = e.target.value;
    setLevelId(selectedLevelId);
    setSubjectId("");

    const selectedLevel = examData.find((lvl) => lvl._id === selectedLevelId);
    setSubjects(selectedLevel ? selectedLevel.subjects : []);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!levelId || !subjectId || !topicName) return;

  await addTopic(levelId, subjectId, topicName); // ✅ include levelId
  console.log(message)

  // Reset input if success
  setTopicName("");
};


  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow border-0">
        <div className="card-body">
          <h4 className="mb-0">Add Topic</h4>

          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}
          {message && <p className="text-success">{message}</p>}

          <form onSubmit={handleSubmit}>
            {/* Level Dropdown */}
            <div className="mb-3">
              <label className="form-label">Select Level</label>
              <select
                className="form-select"
                value={levelId}
                onChange={handleLevelChange}
                required
              >
                <option value="">-- Choose Level --</option>
                {levels.map((lvl) => (
                  <option key={lvl._id} value={lvl._id}>
                    {lvl.level}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Dropdown */}
            <div className="mb-3">
              <label className="form-label">Select Subject</label>
              <select
                className="form-select"
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                required
                disabled={!levelId}
              >
                <option value="">-- Choose Subject --</option>
                {subjects.map((subj) => (
                  <option key={subj._id} value={subj._id}>
                    {subj.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Topic Input */}
            <div className="mb-3">
              <label className="form-label">Topic Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter topic"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn text-white w-100"
              style={{ background: "#15253a" }}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Topic"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTopic;

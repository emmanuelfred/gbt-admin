import React, { useState, useEffect } from "react";
import { useRolestore } from "../Store/roleStore";

function AddRole() {
  const [roleName, setRoleName] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const { features, getFeature, loading, error, message, addRole } = useRolestore();

  useEffect(() => {
    getFeature();
  }, [getFeature]);

  const handleCheckboxChange = (feature) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!roleName.trim()) return alert("Role name is required");

    await addRole(roleName, selectedFeatures);

    setRoleName("");
    setSelectedFeatures([]);
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <div
        className="card shadow-sm p-4"
        style={{ maxWidth: "600px", width: "100%", borderRadius: "12px" }}
      >
        <h4 className="mb-4">Create New Role</h4>

        {error && <strong className="text-danger">{error}</strong>}
        {message && <strong className="text-success">{message}</strong>}

        <form onSubmit={handleSubmit}>
          {/* Role Name */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter role name"
              style={{ background: "#f0f2f5" }}
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              required
            />
          </div>

          {/* Features */}
          <div className="mb-3">
            {Array.isArray(features) && features.length > 0 ? (
              features.map((section, i) => (
                <div key={i} className="mb-3">
                  <div className="fw-bold text-secondary mb-1">{section.title}</div>
                  <div className="ms-3">
                    {section.pages.map((page, j) => {
                      const feature = page.pageName;
                      return (
                        <div key={j} className="form-check mb-1">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`${i}-${j}`}
                            checked={selectedFeatures.includes(feature)}
                            onChange={() => handleCheckboxChange(feature)}
                          />
                          <label className="form-check-label" htmlFor={`${i}-${j}`}>
                            {page.pageName}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">No features found.</p>
            )}
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-100">
            {loading ? "Loading..." : "Create Role"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddRole;

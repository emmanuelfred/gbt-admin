import React, { useState, useEffect } from "react";
import { useRolestore } from "../Store/roleStore";
import { useStaffstore } from "../Store/staffStore";

function AddStaff() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    jobTitle: "",
    role: "",
  });

  const { getRole, roles } = useRolestore();
  const { loading, error, message, addStaff } = useStaffstore();

  useEffect(() => {
    getRole();
  }, [getRole]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.role) {
      alert("Please fill in required fields.");
      return;
    }

    await addStaff(formData);

  

    // Reset only after successful add
    if (message) {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        department: "",
        jobTitle: "",
        role: "",
      });
    }
  };

  return (
    <div className="row justify-content-center">
      <div style={{ maxWidth: "600px", width: "100%", borderRadius: "12px" }}>
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h4 className="mb-4">Add New Staff</h4>
            {error && <strong className="text-danger">{error}</strong>}
            {message && <strong className="text-success">{message}</strong>}
            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="mb-3">
                <label className="form-label">
                  Full Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter full name"
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter email address"
                />
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Department */}
              <div className="mb-3">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter department"
                />
              </div>

              {/* Job Title */}
              <div className="mb-3">
                <label className="form-label">Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter job title"
                />
              </div>

              {/* Role Selection */}
              <div className="mb-3">
                <label className="form-label">
                  Assign Role <span className="text-danger">*</span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">-- Select Role --</option>
                  {roles.map((role) => (
                    <option key={role._id} value={role._id}>
                      {role.roleName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit */}
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn text-white"
                  style={{ backgroundColor: "#15253a" }}
                >
                  {loading ? "Loading..." : "Add Staff"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStaff;

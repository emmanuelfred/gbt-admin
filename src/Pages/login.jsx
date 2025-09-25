import React, { useState } from "react";
import { useStaffstore } from "../Store/staffStore";
import logo from "../assets/desktop-logo.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const { staffLogin, loading, error, message } = useStaffstore();
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await staffLogin({ staffId, password });
    
    if (success) {
      console.log(success)
      navigate("/home");
      window.location.href = '/home'
    }
  };

  return (
    <main style={{ minHeight: "100vh" }}>
      <div className="container d-flex flex-column flex-md-row justify-content-center align-items-center min-vh-100">
        <div
          className="card shadow p-4"
          style={{ width: "95%", maxWidth: "400px", borderRadius: "8px" }}
        >
          <img src={logo} alt="logo" style={{ width: 150, margin: "0 auto" }} />
          <form className="mt-3" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Staff ID"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn btn-primary w-100 mb-3"
              style={{ backgroundColor: "#1877f2" }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;

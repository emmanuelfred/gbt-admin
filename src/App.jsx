import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React, { useState } from "react";

import Home from "./Pages/Home";
import Header from "./Component/Header";
import Login from "./Pages/login";
import Sidebar from "./Component/Sidebar";
import AddRole from "./Pages/AddRole";
import AddStaff from "./Pages/AddStaff";
import AddQuestion from "./Pages/Addquestion";
import AddSubject from "./Pages/AddSubject";
import AddTopic from "./Pages/AddTopic";
import ProtectedRoute from "./Component/ProtectedRoute";
import { useIdleLogout } from "./hooks/useIdleLogout";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useIdleLogout(10 * 60 * 1000); // auto logout after 10 min idle

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <Header onToggleSidebar={toggleSidebar} />
      <main className="main-container ">
        <div className={`sidebar-drawer Side-menu-container ${isSidebarOpen ? "open" : ""}`}>
          <Sidebar />
        </div>

        {isSidebarOpen && <div className="sidebar-backdrop" onClick={closeSidebar}></div>}

        <section className="Main-content-container f">
          <Routes>
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="*" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/add_role" element={<ProtectedRoute><AddRole /></ProtectedRoute>} />
            <Route path="/add_staff" element={<ProtectedRoute><AddStaff /></ProtectedRoute>} />
            <Route path="/add_question" element={<ProtectedRoute><AddQuestion /></ProtectedRoute>} />
            <Route path="/add_subject" element={<ProtectedRoute><AddSubject /></ProtectedRoute>} />
            <Route path="/add_topic" element={<ProtectedRoute><AddTopic /></ProtectedRoute>} />
          </Routes>
        </section>
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  const location = useLocation();
  if (location.pathname === "/") return <Login />;
  return <Layout />;
}

export default App;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 text-center">
        <h1 className="mb-4">Welcome to Employee Management System</h1>

        {!token ? (
          <div>
            <Link to="/login" className="btn btn-primary m-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary m-2">
              Register
            </Link>
          </div>
        ) : (
          <div>
            <p className="mb-3">You are logged in as <strong>{role}</strong>.</p>
            <Link to="/getemployees" className="btn btn-success m-2">
              View Employees
            </Link>
            {role === "ROLE_ADMIN" && (
              <Link to="/addemployee" className="btn btn-info m-2">
                Add Employee
              </Link>
            )}
            <button onClick={handleLogout} className="btn btn-danger m-2">
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;

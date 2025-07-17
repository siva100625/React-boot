import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");           
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ROLE_USER");

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", {
        name,
        email,
        username,
        password,
        rolenames: [role], 
      });
      console.log("Employee added:", res.data);
      alert("Employee added successfully");
      setName("");
      setEmail("");
      setUsername("");
      setPassword("");
      setRole("ROLE_USER");
    } catch (error) {
      console.error("Add Employee Error:", error.response?.data || error.message);
      alert("Failed to add employee. Check console for details.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4">Add New Employee</h2>
        <form onSubmit={handleAddEmployee} style={{ maxWidth: "600px" }}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label> 
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="ROLE_USER">ROLE_USER</option>
              <option value="ROLE_ADMIN">ROLE_ADMIN</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Add Employee
          </button>
        </form>
      </div>
    </>
  );
};

export default AddEmployee;
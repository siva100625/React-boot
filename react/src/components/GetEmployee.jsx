import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const GetEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isAdmin = role === "ROLE_ADMIN";

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/employee", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(data);
      } catch (err) {
        console.error("Error fetching employees:", err);
        alert("Unauthorized access or error fetching employees.");
      }
    };

    fetchEmployees();
  }, [token]);

  const handleDelete = async (empId) => {
    try {
      await axios.delete(`http://localhost:8080/employee/${empId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees((prev) => prev.filter((emp) => emp.empId !== empId));
      alert("Employee deleted successfully.");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete employee.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="mb-4">Employee List</h2>
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {employees.map(({ empId, name, email }) => (
              <tr key={empId}>
                <td>{empId}</td>
                <td>{name}</td>
                <td>{email}</td>
                {isAdmin && (
                  <td>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => handleDelete(empId)}
                    >
                      Delete
                    </button>
                    <button className="btn btn-primary btn-sm">
                      Edit
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {employees.length === 0 && (
          <div className="text-center mt-4">No employees found.</div>
        )}
      </div>
    </>
  );
};

export default GetEmployees;

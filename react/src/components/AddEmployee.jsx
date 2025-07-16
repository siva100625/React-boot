import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";

const rolesList = ["ADMIN", "USER"]; // Add more roles if needed

const AddEmployees = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userName: "",
    password: "",
    roleNames: [],
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updatedRoles = checked
        ? [...prev.roleNames, value]
        : prev.roleNames.filter((role) => role !== value);
      return { ...prev, roleNames: updatedRoles };
    });
  };

  const addNewEmployee = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You are not logged in. Please log in to continue.");
      return navigate("/login");
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/employee/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        alert(response.data);
        navigate("/getemployees");
      } else {
        alert("Error while adding employee.");
      }
    } catch (error) {
      console.error("Add Employee Error:", error);
      if ([401, 403].includes(error.response?.status)) {
        alert("Authorization failed. Only admins can add employees.");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <section className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Add New Employee</h3>
                <form onSubmit={addNewEmployee}>
                  {["name", "email", "userName", "password"].map((field) => (
                    <div className="mb-3" key={field}>
                      <label htmlFor={field} className="form-label">
                        {field === "userName" ? "Username" : field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type={field === "password" ? "password" : "text"}
                        className="form-control"
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  ))}

                  <div className="mb-3">
                    <label className="form-label">Select Roles</label>
                    {rolesList.map((role) => (
                      <div className="form-check" key={role}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={role}
                          value={role}
                          checked={formData.roleNames.includes(role)}
                          onChange={handleRoleChange}
                        />
                        <label className="form-check-label" htmlFor={role}>
                          {role}
                        </label>
                      </div>
                    ))}
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Add Employee
                  </button>
                </form>
                <p className="mt-3 text-center">
                  Already a user? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddEmployees;

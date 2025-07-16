import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";

const AddEmployees = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userName: "",
    password: "",
    roleNames: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewEmployee = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You are not logged in. Please log in to continue.");
      navigate("/login");
      return;
    }

    const roleArray = formData.roleNames.split(",").map((role) => role.trim());

    try {
      const response = await axios.post(
        "http://localhost:8080/employee/add",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          userName: formData.userName,
          roleNames: roleArray,
        },
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
        alert("Error during employee creation.");
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
            <div className="card shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Add New Employee</h3>
                <form onSubmit={addNewEmployee}>
                  {["name", "email", "userName", "password"].map((field, index) => (
                    <div className="mb-3" key={index}>
                      <label htmlFor={field} className="form-label">
                        {field === "userName" ? "Username" : field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type={field === "password" ? "password" : field === "email" ? "email" : "text"}
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
                    <label htmlFor="roleNames" className="form-label">Roles (comma separated)</label>
                    <input
                      type="text"
                      className="form-control"
                      id="roleNames"
                      name="roleNames"
                      value={formData.roleNames}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">Add Employee</button>
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

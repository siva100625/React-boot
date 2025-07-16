import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8080/api/auth/login", credentials);
      const { token, roles } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", roles);

      console.log("Username:", data.username);
      console.log("Roles:", roles);
      console.log("Token:", token);

      alert("Login successful!");
      navigate("/getemployees");
    } catch (err) {
      console.error("Login Error:", err);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-header text-center">
                <h3>Login</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleLogin}>
                  <div className="mb-3 row">
                    <label htmlFor="userName" className="col-sm-3 col-form-label">
                      Username
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="userName"
                        name="userName"
                        placeholder="Enter username"
                        value={credentials.userName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label htmlFor="password" className="col-sm-3 col-form-label">
                      Password
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary w-100">
                      Submit
                    </button>
                  </div>
                </form>

                <div className="text-center mt-3">
                  <p>
                    Don't have an account? <Link to="/register">Register here</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

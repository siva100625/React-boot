import React, { useState } from "react";
import axios from "axios";

const AddTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    employeeId: ""
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const payload = {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      employee: {
        empId: parseInt(task.employeeId)
      }
    };

    try {
      await axios.post("https://employeemanagement-uo32.onrender.com/tasks/employee", payload, {
        headers: {
          Authorization: Bearer ${token},
          "Content-Type": "application/json"
        }
      });
      alert("Task created successfully!");
      setTask({ title: "", description: "", dueDate: "", employeeId: "" });
    } catch (err) {
      console.error("Error creating task", err);
      alert("Failed to create task");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "500px" }}>
        <h4 className="text-center mb-4">Add Task</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Employee ID</label>
            <input
              type="number"
              name="employeeId"
              className="form-control"
              value={task.employeeId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={task.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              value={task.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              name="dueDate"
              className="form-control"
              value={task.dueDate}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmployeeTaskList = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {    
    fetchEmployeeWithTasks();
  }, []);

  const fetchEmployeeWithTasks = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(https://employeemanagement-uo32.onrender.com/employee/${id}, {
        headers: {
          Authorization: Bearer ${token},
        },
      });

      console.log(response.data);
      
      
      setEmployee(response.data);
      console.log(1);
      
      console.log(employee);
      
    } catch (error) {
      console.error("Error fetching employee and tasks:", error);
      alert("Failed to fetch employee task data.");
    }
  };

  if (!employee) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "600px" }}>
        <h4 className="text-center mb-4">Employee Task List</h4>

        <div className="mb-3">
          <strong>Employee ID:</strong> {employee.empId}
        </div>
        <div className="mb-3">
          <strong>Employee Name:</strong> {employee.name}
        </div>

        <hr />

        {employee.tasks && employee.tasks.length > 0 ? (
          employee.tasks.map((task) => (
            <div key={task.taskId} className="mb-4 border rounded p-3 bg-white">
              <div><strong>Title:</strong> {task.title}</div>
              <div><strong>Description:</strong> {task.description}</div>
              <div><strong>Due Date:</strong> {task.dueDate}</div>
            </div>
          ))
        ) : (
          <p>No tasks assigned.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeTaskList;
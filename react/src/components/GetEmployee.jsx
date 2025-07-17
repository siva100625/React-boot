import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const GetEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [editedData, setEditedData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        rolenames: [],
    });

    const [assigningTaskToEmployeeId, setAssigningTaskToEmployeeId] = useState(null);
    const [taskDescriptions, setTaskDescriptions] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    
    const token = localStorage.getItem("token");
    const roles = JSON.parse(localStorage.getItem("roles") || "[]");
    const isAdmin = roles.includes("ROLE_ADMIN");

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get("http://localhost:8080/employee", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEmployees(response.data);
            } catch (err) {
                console.error("Error fetching employees:", err);
            }
        };
        if (token) {
            fetchEmployees();
        }
    }, [token]);

    const handleDelete = async (empID) => {
        try {
            await axios.delete(`http://localhost:8080/employee/${empID}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEmployees(employees.filter((emp) => emp.empID !== empID));
            alert("Employee deleted successfully");
        } catch (err) {
            console.error("Error deleting employee:", err);
            alert("Delete failed. Check your permissions.");
        }
    };

    const handleEditClick = (employee) => {
        setEditingEmployee(employee.empID);
        setEditedData({
            name: employee.name,
            email: employee.email,
            username: employee.username,
            password: "",
            rolenames: employee.roles?.map(role => role.roleName) || [],
        });
    };

    const handleEditChange = (e) => {
        setEditedData({ ...editedData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async () => {
        try {
            await axios.put(
                `http://localhost:8080/employee/${editingEmployee}`,
                editedData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setEmployees((prev) =>
                prev.map((emp) =>
                    emp.empID === editingEmployee
                        ? { ...emp, ...editedData, password: "" }
                        : emp
                )
            );
            alert("Employee updated successfully");
            setEditingEmployee(null);
        } catch (err) {
            console.error("Error updating employee:", err);
            alert("Update failed");
        }
    };

    const handleAssignTaskClick = (employee) => {
        setAssigningTaskToEmployeeId(employee.empID);
        const existingTasks = employee.works?.map(work => work.description).join('\n') || "";
        setTaskDescriptions(existingTasks);
    };

    const handleTaskSubmit = async () => {
        if (!assigningTaskToEmployeeId) return;
        const tasksArray = taskDescriptions.split('\n').filter(task => task.trim() !== "");
        try {
            await axios.put(
                `http://localhost:8080/employee/assign-work/${assigningTaskToEmployeeId}`,
                tasksArray,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setEmployees(prevEmployees =>
                prevEmployees.map(emp => {
                    if (emp.empID === assigningTaskToEmployeeId) {
                        const updatedWorks = tasksArray.map((desc, index) => ({
                            workId: index,
                            description: desc
                        }));
                        return { ...emp, works: updatedWorks };
                    }
                    return emp;
                })
            );
            alert("Tasks updated successfully!");
            setAssigningTaskToEmployeeId(null);
            setTaskDescriptions("");
        } catch (err) {
            console.error("Error assigning tasks:", err);
            alert("Failed to assign tasks. Check permissions.");
        }
    };

    const filteredEmployees = employees.filter(employee => {
        const query = searchQuery.toLowerCase();
        const nameMatch = employee.name.toLowerCase().includes(query);
        const taskMatch = employee.works && employee.works.some(work =>
            work.description.toLowerCase().includes(query)
        );
        return nameMatch || taskMatch;
    });

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <h2 className="mb-4">Employee List</h2>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Name or Task..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {employees.length === 0 ? (
                    <p>Loading employees...</p>
                ) : filteredEmployees.length === 0 ? (
                    <p>No employees found matching your search.</p>
                ) : (
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Tasks</th>
                                {isAdmin && <th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map((emp) => (
                                <tr key={emp.empID}>
                                    <td>{emp.empID}</td>
                                    <td>
                                        {editingEmployee === emp.empID ? (
                                            <input type="text" name="name" value={editedData.name} onChange={handleEditChange} className="form-control" />
                                        ) : (emp.name)}
                                    </td>
                                    <td>
                                        {editingEmployee === emp.empID ? (
                                            <input type="email" name="email" value={editedData.email} onChange={handleEditChange} className="form-control" />
                                        ) : (emp.email)}
                                    </td>
                                    <td>
                                        {editingEmployee === emp.empID ? (
                                            <input type="text" name="username" value={editedData.username} onChange={handleEditChange} className="form-control" />
                                        ) : (emp.username)}
                                    </td>
                                    <td>
                                        {emp.works && emp.works.length > 0
                                            ? emp.works.map(work => work.description).join(', ')
                                            : "No tasks assigned"
                                        }
                                    </td>
                                    {isAdmin && (
                                        <td>
                                            {editingEmployee === emp.empID ? (
                                                <>
                                                    <input type="password" name="password" placeholder="New Password" value={editedData.password} onChange={handleEditChange} className="form-control my-1" />
                                                    <button className="btn btn-success btn-sm me-2" onClick={handleEditSubmit}>Save</button>
                                                    <button className="btn btn-secondary btn-sm" onClick={() => setEditingEmployee(null)}>Cancel</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleDelete(emp.empID)} className="btn btn-danger btn-sm me-2">Delete</button>
                                                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleEditClick(emp)}>Edit</button>
                                                    <button className="btn btn-info btn-sm" onClick={() => handleAssignTaskClick(emp)}>
                                                        Edit Tasks
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {assigningTaskToEmployeeId && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Assign/Edit Tasks</h5>
                                    <button type="button" className="btn-close" onClick={() => setAssigningTaskToEmployeeId(null)}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Enter one task per line.</p>
                                    <div className="form-group">
                                        <textarea
                                            className="form-control"
                                            rows="5"
                                            value={taskDescriptions}
                                            onChange={(e) => setTaskDescriptions(e.target.value)}
                                            placeholder="Task 1 description&#10;Task 2 description"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setAssigningTaskToEmployeeId(null)}>Cancel</button>
                                    <button type="button" className="btn btn-success" onClick={handleTaskSubmit}>Save Tasks</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default GetEmployees;
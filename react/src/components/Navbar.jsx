import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand" to="/">EMS</Link>
      <ul className="navbar-nav">
        <li className="nav-item"><Link className="nav-link" to="/">Logout</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/add">AddEmployees</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/getemployees">EmployeeList</Link></li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
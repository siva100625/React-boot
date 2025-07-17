import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddEmployees from "./components/AddEmployees";
import GetEmployees from "./components/GetEmployees";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/add" element={<AddEmployees />} />
      <Route path="/getemployees" element={<GetEmployees />} />
    </Routes>
  </Router>
);

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetEmployees from "./components/GetEmployees";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import AddEmployees from "./components/AddEmployees";


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add" element={<AddEmployees />} />
      <Route path="/getemployees" element={<GetEmployees/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/addemployee"element={<Signup/>}></Route>
    </Routes>
  </Router>
);

export default App;
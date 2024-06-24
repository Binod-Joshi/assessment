import logo from "./logo.svg";
import "./App.css";
import Login from "./Forms/Login";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "./Forms/Register";
import DashboardTable from "./pages/DashboardTable";
import { useSelector } from "react-redux";
import Logout from "./Forms/Logout";

function App() {
  const { currentUser } = useSelector((state) => state.data);
  console.log(currentUser);
  return (
    <Router>
      {!currentUser?.email && (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
      {currentUser?.email && (
        <Routes>
          <Route path="/dashboardtable" element={<DashboardTable />} />
          <Route path="/adding" element = {<Register data={"afterlogin"}/>} />
          <Route path= "/logout" element={<Logout/>} />
          <Route path="*" element={<Navigate to="/dashboardtable" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;

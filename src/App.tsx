import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/GymDashboard/Dashboard";
import GymName from "./Components/GymName/GymName";
import Login from "./Components/LoginSignup/Login";
import Signup from "./Components/LoginSignup/Signup";
import Plan from "./Components/GymDashboard/Plan/Plan";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/gymname" element={<GymName />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/plan" element={<Plan />} />

          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

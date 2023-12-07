import { BrowserRouter, Route, Routes } from "react-router-dom";
import Batch from "./Components/GymDashboard/Batch/Batch";
import Dashboard from "./Components/GymDashboard/Dashboard";
import Plan from "./Components/GymDashboard/Plan/Plan";
import GymName from "./Components/GymName/GymName";
import Login from "./Components/LoginSignup/Login";
import Signup from "./Components/LoginSignup/Signup";
import AddMembers from "./Components/GymDashboard/Members/AddMembers";
import Member from "./Components/GymDashboard/Members/Member";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/gymname" element={<GymName />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/batch" element={<Batch />} />
          <Route path="/members" element={<Member />} />
          <Route path="/addmembers" element={<AddMembers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

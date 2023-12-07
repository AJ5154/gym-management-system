import useGym from "../../Context/UseGym";
import GymName from "../GymName/GymName";
import Navbar from "./Navbar";

const Dashboard = () => {
  const { gymExists } = useGym();

  if (!gymExists) {
    return <p>No gyms found. Redirecting...</p>;
  }

  return (
    <div>
      {gymExists ? <Navbar /> : <GymName />}
    </div>
  );
};

export default Dashboard;

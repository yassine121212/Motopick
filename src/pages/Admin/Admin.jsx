import "./Admin.scss";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const drivers = () => {
  return (
    <div className="drivers">
      <Sidebar />
      <div className="driversContainer">
        <Navbar />
       </div>
    </div>
  );
};

export default drivers;

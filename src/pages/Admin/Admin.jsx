import "./Admin.scss";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatadAdmins from "../../components/dataadmins/Dataadmins"

const drivers = () => {
  return (
    <div className="drivers">
      <Sidebar />
      <div className="driversContainer">
        <Navbar />
      <DatadAdmins/>
       </div>
    </div>
  );
};

export default drivers;

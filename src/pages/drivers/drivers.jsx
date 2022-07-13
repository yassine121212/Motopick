import "./drivers.scss";
import "./index.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datadrivers from "../../components/datadrivers/Datadrivers";

const drivers = () => {
  return (
    <div className="drivers">
      <Sidebar />

      <div className="driversContainer">
        <Navbar />
        <Datadrivers />
      </div>
    </div>
  );
};

export default drivers;

import "./block.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Block from "../../components/block/Block";

const block = () => {
  return (
    <div className="drivers">
      <Sidebar />

      <div className="driversContainer">
        <Navbar />
        <Block />
      </div>
    </div>
  );
};

export default block;

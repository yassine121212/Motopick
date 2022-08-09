import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import Tripsdelivroes from "../../components/TripsDelivries/Tripsdelivroes";
import Go from "../../components/Go/Go";

const Home = () => {

  const { currentUser } = useContext(AuthContext);
  const notify = () => toast("Wow so easy !");
  useEffect(() => {
    notify();
  }, [currentUser]);

  
  return (
    <div className="home">
      {/* <ToastContainer className={`${currentUser ? "" :"nonotify"}`}/> */}
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div  className="widgets">
          <Widget type="user" />
          <Widget type="orders" />
          <Widget type="Admins" />
          <Widget type="drivers" />
        </div>
        <div className="charts">
          <Featured />:
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="stats " >
          <br></br>
         <Tripsdelivroes /> 
        </div>
        <div className="stats " >

          <br></br>

          <Go />
     
       </div>
       
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          {/* <Table /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;

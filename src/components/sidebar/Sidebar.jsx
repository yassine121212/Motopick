import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import TakeoutDiningOutlinedIcon from '@mui/icons-material/TakeoutDiningOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect,useState } from "react";
import {AuthContext} from "../../context/AuthContext"

import { MotoContext } from "../../context/MotoContext";

const Sidebar = () => {
  const { userf } = useContext(MotoContext);
  const [usertest,setusertest]=useState()
  const { dispatch } = useContext(DarkModeContext);
  const auth = useContext(AuthContext);
  // console.log(userf[0].data.musers)
  // useEffect(() => {
  //   setusertest(userf[0])
  // },[userf])
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Motopickup</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          
          {/* {userf[0].data.musers&&(<Link to="/users" style={{ textDecoration: "none" }}>
            <li >
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>)} */}
          
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li >
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/Drivers" style={{ textDecoration: "none" }}>
            <li   >
              <DriveEtaIcon className="icon" />
              <span>Drivers</span>
            </li>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }}>
          <li>
            <TakeoutDiningOutlinedIcon className="icon" />
            <span>Orders</span>
          </li>
          </Link>
          <Link to="/Admin" style={{ textDecoration: "none" }}>
    
          <li>
            <AdminPanelSettingsOutlinedIcon className="icon" />
            <span>Admin</span>
          </li>
         </Link> 
          <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li  onClick={() => auth.dispatch({ type: "LOGOUT" })}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;

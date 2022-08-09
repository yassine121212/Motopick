import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import TakeoutDiningOutlinedIcon from "@mui/icons-material/TakeoutDiningOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { MotoContext } from "../../context/MotoContext";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
const Sidebar = () => {
  const { userf } = useContext(MotoContext);

  const { dispatch } = useContext(DarkModeContext);
  const auth = useContext(AuthContext);

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
          <Link to="/">
            <li>
              <DashboardIcon className="icon" />
              <span>Tableau de bord</span>
            </li>
          </Link>
          <p className="title">LISTES</p>

          {userf?.musers && (
            <Link to="/users" style={{ textDecoration: "none" }}>
              <li>
                <PersonOutlineIcon className="icon" />
                <span>Utilisateurs</span>
              </li>
            </Link>
          )}
          {userf?.mprices && (
            <Link to="/Config" style={{ textDecoration: "none" }}>
              <li>
                <PriceChangeIcon className="icon" />
                <span>Prix</span>
              </li>
            </Link>
          )}
          {userf?.mdrivers && (
            <Link to="/Drivers" style={{ textDecoration: "none" }}>
              <li>
                <DriveEtaIcon className="icon" />
                <span>Conducteurs</span>
              </li>
            </Link>
          )}
          {userf?.morders && (
            <Link to="/orders" style={{ textDecoration: "none" }}>
              <li>
                <TakeoutDiningOutlinedIcon className="icon" />
                <span>Ordres</span>
              </li>
            </Link>
          )}
          {userf?.mblock && (
            <Link to="/block" style={{ textDecoration: "none" }}>
              <li>
                <RemoveCircleOutlineIcon className="icon" />
                <span>Bloqué</span>
              </li>
            </Link>
          )}
          {userf?.madmin && (
            <Link to="/Admin" style={{ textDecoration: "none" }}>
              <li>
                <AdminPanelSettingsOutlinedIcon className="icon" />
                <span>Administrateur</span>
              </li>
            </Link>
          )}
          <p className="title">MAPS</p>
          <Link to="/maps_orders" style={{ textDecoration: "none" }}>
            <li>
              <ViewStreamIcon className="icon" />
              <span>Ordres</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profil</span>
          </li>
          <li onClick={() => auth.dispatch({ type: "LOGOUT" })}>
            <ExitToAppIcon className="icon" />
            <span>Se déconnecter</span>
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

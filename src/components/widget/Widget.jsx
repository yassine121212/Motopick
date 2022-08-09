import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { MotoContext } from "../../context/MotoContext";
const Widget = ({
  type,
  succ,
  cancOrC,
  cancOrD,
  plannedOr,
  reportedOrC,
  reportedOrD,
  trips,
  delivries,
}) => {
  let data;
  const { UsersLenght, AdminsLenght, OrdersLenght, OrdersSum, DriversLenght } =
    useContext(MotoContext);
  //temporary
  const diff = 20;
  const amountUs = UsersLenght;
  const amountAd = AdminsLenght;
  const amountOr = OrdersLenght;
  const amountDr = DriversLenght;
  const balance = OrdersSum;
  switch (type) {
    case "user":
      data = {
        title: "UTILISATEURS",
        isMoney: false,
        link: (
          <Link to="/users" style={{ textDecoration: "none" }}>
            voir tous les utilisateurs
          </Link>
        ),
        amount: amountUs,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "commentcustomer":
      data = {
        title: "COMMANDES",
        isMoney: false,
        
        amount: "bbbbbbbbbbbbbbbbbfddsvdv^dvd^vdsv vvvvvvvvvvvvvvvvvvvvdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;

    case "Admins":
      data = {
        title: "ADMINISTRATEURS",
        link: (
          <Link to="/admin" style={{ textDecoration: "none" }}>
            voir tous les administrateurs
          </Link>
        ),
        amount: amountAd,

        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "orders":
      data = {
        title: "COMMANDES",
        isMoney: true,
        link: (
          <Link to="/orders" style={{ textDecoration: "none" }}>
            voir details
          </Link>
        ),
        amount: balance,
        Num: amountOr,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(120, 75, 70, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    case "drivers":
      data = {
        title: "CONDUCTEURS",
        link: (
          <Link to="/drivers" style={{ textDecoration: "none" }}>
            voir details
          </Link>
        ),
        amount: amountDr,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    case "succeed_orders":
      data = {
        title: "Commandes réussies",
        amount: succ || 0,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    case "canceled_orders_Cu":
      data = {
        title: "Commandes annulées par le client",
        amount: cancOrC || 0,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    case "canceled_orders_Dr":
      data = {
        title: "Commandes annulées par chauffeur",
        amount: cancOrD || 0,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    case "reported_orders_Cu":
      data = {
        title: "Commandes signalées par conducteur",
        amount: reportedOrC || 0,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    case "reported_orders_Dr":
      data = {
        title: "Commandes signalées par client",
        amount: reportedOrD || 0,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    case "planed_orders":
      data = {
        title: "Commandes planifiées",
        amount: plannedOr || 0,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    case "trips":
      data = {
        title: "Voyages",
        amount: trips || 0,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    case "delivery":
      data = {
        title: "Livraisons",
        amount: delivries || 0,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;

    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">
          {data?.title} {data?.Num && <span>({data.Num})</span>}{" "}
        </span>
        <span className="counter">
          {data?.amount} {data?.isMoney && "MAD"}
        </span>
        <span className="link">{data?.link}</span>
      </div>
      <div className="right">
     
        {data?.icon}
      </div>
    </div>
  );
};

export default Widget;

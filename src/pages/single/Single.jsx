import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import Rating from "@mui/material/Rating";
import Widget from "../../components/widget/Widget";

import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import AppBlockingSharpIcon from "@mui/icons-material/AppBlockingSharp";
import RemoveCircleOutlineSharpIcon from "@mui/icons-material/RemoveCircleOutlineSharp";
import { MotoContext } from "../../context/MotoContext";
const Single = () => {
  const location = useLocation();
  const [id, setid] = useState(location.state.id);
  const [datauser, setdatauser] = useState(null);

  const [succedOr, setsuccedOr] = useState(null);
  const [canceledOrC, setcanceledOrC] = useState(null);

  const [canceledOrD, setcanceledOrD] = useState(null);
  const [plannedOr, setplannedOr] = useState(null);

  const [reportedOrC, setreportedOrC] = useState(null);
  const [reportedOrD, setreportedOrD] = useState(null);

  const [Trips, setTrips] = useState(null);
  const [delivries, setdelivries] = useState(null);
  const [CA, setCA] = useState(null);
  const [orderuser, setorderuser] = useState(null);

  const { userf, allOrders } = useContext(MotoContext);
  const total_CA=0;

  const handluser = async () => {
    const docRef = doc(db, "users", id);
    try {
      const docSnap = await getDoc(docRef);
      setdatauser(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  };

  const status_Orders = () => {
    setsuccedOr(
      allOrders.filter(
        (order) =>
          order.customer_uid === id &&
          order.is_canceled_by_customer === false &&
          order.is_canceled_by_customer === false &&
          order.is_reported_by_customer === false &&
          order.is_reported_by_customer === false &&
          order.is_planned === false
      ).lenght
    );
  };
  const canceled_Orders_customer = () => {
    setcanceledOrC(
      allOrders.filter(
        (order) =>
          order.customer_uid === id && order.is_canceled_by_customer === true
      ).length
    );
  };
  const canceled_Orders_driver = () => {
    setcanceledOrD(
      allOrders.filter(
        (order) =>
          order.customer_uid === id && order.is_canceled_by_driver === true
      ).length
    );
  };
  const reported_Orders_customer = () => {
    setreportedOrC(
      allOrders.filter(
        (order) =>
          order.customer_uid === id && order.is_reported_by_customer === true
      ).length
    );
  };
  const reported_Orders_driver = () => {
    setreportedOrD(
      allOrders.filter(
        (order) =>
          order.customer_uid === id && order.is_reported_by_driver === true
      ).length
    );
  };
  const planned_Orders = () => {
    setplannedOr(
      allOrders.filter(
        (order) => order.customer_uid === id && order.is_planned === true
      ).length
    );
  };
  const trips_Orders = () => {
    setTrips(
      allOrders.filter((order) => order.customer_uid === id && order.order_type === 1)
        .length
    );
  };
  const delivery_Orders = () => {
    setdelivries(
      allOrders.filter((order) => order.customer_uid === id && order.order_type === 2)
        .length
    );
  };
  const orders = () => {
    setorderuser(
      allOrders.filter((order) => order.customer_uid === id)
        
    );
  };
  const order_CA = () => {
   orderuser?.order_purchase_amount.map((input) => (
    total_CA =+input
   ))

  };


  const updateUser = async (id, blackListed) => {
    const userDoc = doc(db, "users", id);
    const newFields = { is_activated_account: !blackListed };
    await updateDoc(userDoc, newFields);
    window.location.reload();
  };

  useEffect(() => {
    handluser();
    status_Orders();
    canceled_Orders_customer();
    canceled_Orders_driver();
    reported_Orders_customer();
    reported_Orders_driver();
    planned_Orders();
    trips_Orders();
    delivery_Orders();
    orders();
    order_CA();
  }, [id]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item flex ">
              {datauser?.customer_picture ? (
                <img
                  className="itemImg"
                  src={datauser?.customer_picture}
                  alt="avatar"
                />
              ) : (
                <img
                  className="itemImg"
                  src="https://cdn1.iconfinder.com/data/icons/user-interface-1-glyph/32/ui_avatar_profil_user_circle-512.png"
                  alt="avatar"
                />
              )}

              <div className="cellAction1">
                {userf?.mblock && datauser?.is_activated_account && (
                  <div
                    className="deleteButton1"
                    onClick={() => {
                      updateUser(id, datauser?.is_activated_account);
                    }}
                  >
                    <IconButton color="error" aria-label="add an alarm">
                      <RemoveCircleOutlineSharpIcon />
                    </IconButton>{" "}
                    Deblock
                  </div>
                )}
              </div>
              <div className="details">
                <h1 className="itemTitle">{datauser?.customer_full_name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{datauser?.customer_email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Téléphone:</span>
                  <span className="itemValue">
                    {datauser?.customer_phone_number
                      ? datauser?.customer_phone_number
                      : "Inconnu"}
                  </span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">
                    {datauser?.customer_city
                      ? datauser?.customer_city
                      : "Inconnu"}
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs text-gray-700 font-bold p-1 ">
                    Used Cities :
                  </span>
                  {datauser?.customer_used_cities?.map((city) => (
                    <span className="text-xs text-gray-700 font-bold p-1 rounded-full bg-gray-100">
                      {city}
                    </span>
                  ))}
                </div>
                <div className="detailItem">
                  <Rating
                    name="read-only"
                    value={datauser?.customer_stars_mean || null}
                    readOnly
                    size="small"
                    className="justify-end"
                  />
                </div>
                <div className="detailItem">
                  <span className="itemKey">Chiffre d'affaire:</span>
                  <span className="itemValue">{/* {total_CA} */}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="mx-8">
          <div className="flex flex-wrap gap-2 w-full">
            <Widget type="succeed_orders" succ={succedOr} />
            <Widget type="canceled_orders_Cu" cancOrC={canceledOrC} />
            <Widget type="canceled_orders_Dr" cancOrD={canceledOrD} />
            <Widget type="reported_orders_Cu" reportedOrC={reportedOrC} />
            <Widget type="reported_orders_Dr" reportedOrD={reportedOrD} />
            <Widget type="planed_orders" plannedOr={plannedOr} />
            <Widget type="trips" trips={Trips} />
            <Widget type="delivery" delivries={delivries} />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List id={id} />
        </div>
      </div>
    </div>
  );
};

export default Single;

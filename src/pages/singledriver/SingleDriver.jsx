import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useLocation } from "react-router-dom";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { userColumns, userRows, ordersColumns } from "../../datatablesource";
import { Rating } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import BlockIcon from "@mui/icons-material/Block";
import IconButton from "@mui/material/IconButton";
import AppBlockingSharpIcon from "@mui/icons-material/AppBlockingSharp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import RemoveCircleOutlineSharpIcon from "@mui/icons-material/RemoveCircleOutlineSharp";
import DriverFiles from "../../components/DriverFiles/DriverFiles";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { CircularProgress, TableRow } from "@mui/material";
import { MotoContext } from "../../context/MotoContext";
import { useEffect, useState ,useContext} from "react";
import {   onSnapshot } from "firebase/firestore";

const Single = () => {
  const location = useLocation();
  const [id, setid] = useState(location.state.id);
  const [datauser, setdatauser] = useState(null);
  const [orders, setorders] = useState([]);
  const [loading, setloading] = useState(false);
  const { allUsers } = useContext(MotoContext);
  const { allDrivers } = useContext(MotoContext);
  const [data, setData] = useState([]);
  const [dataorder, setDataorder] = useState([]);

  const handluser = async () => {
    const docRef = doc(db, "drivers", id);
    try {
      const docSnap = await getDoc(docRef);
      setdatauser(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  };
  let list = [];
  useEffect(async () => {
    handluser();
    
  }, [id]);
  
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "orders"),
      (snapShot) => {
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });});
        setloading(true);
        setData(list);
        
      },

      (error) => {
        console.log(error);
      }
    );


    return () => {
      unsub();
 


    };


  }, []);
  useEffect(() => {
  setDataorder(data.filter((item)=>item.driver_uid == id))
  }, [data]);

  const actionColumn = [
    {
      field: "customer_uid",
      headerName: "Nom du client",
      width: 150,
      renderCell: (params) => {
        let name = allUsers.filter(
          (item) => item.id == params.row.customer_uid
        );
        return (
          <div className="flex flex-col ">{name[0]?.customer_full_name}</div>
        );
      },
    },
    {
      field: "driver_uid",
      headerName: "Nom du conducteur",
      width: 150,
      renderCell: (params) => {
        let name = allDrivers.filter(
          (item) => item.id == params.row.driver_uid
        );
        // console.log(name)
        return (
          <div className="flex flex-col ">{name[0]?.driver_full_name}</div>
        );
      },
    },
    {
      field: "driver_given_stars",
      headerName: "Etoiles donnée par le conducteur",
      width: 150,
      renderCell: (params) => {
        // console.log(name)
        return (
          <div className="flex flex-col ">
            <Rating
              name="read-only"
              value={params.row.driver_given_stars}
              readOnly
              size="small"
              className="justify-end"
            />
          </div>
        );
      },
    },
    {
      field: "customer_given_stars",
      headerName: "Etoiles donnée par le driver",
      width: 150,
      renderCell: (params) => {
        // console.log(name)
        return (
          <div className="flex flex-col ">
            <Rating
              name="read-only"
              value={params.row.customer_given_stars}
              readOnly
              size="small"
              className="justify-end"
            />
          </div>
        );
      },
    },
  ];

  const navigate = useNavigate();

  const updateUser = async (e, id, blackListed) => {
    e.preventDefault();
    const userDoc = doc(db, "drivers", id);
    const newFields = {
      is_blackListed_account: !blackListed,
    };
    await updateDoc(userDoc, newFields);
    navigate(0);
  };
  const updatedriver = async (e, id, verified) => {
    e.preventDefault();
    const userDoc = doc(db, "drivers", id);
    const newFields = { is_activated_account: !verified };
    await updateDoc(userDoc, newFields);
    // navigate(0);
  };


  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={
                  datauser?.driver_profile_picture
                    ? datauser?.driver_profile_picture
                    : ""
                }
                alt="Photo pic"
                className="itemImg"
              />
              <div className="ml-[3cm] flex flex-col gap-4">
                <h1 className="itemTitle">{datauser?.driver_full_name} </h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue ml-2">{datauser?.driver_email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Téléphone:</span>
                  <span className="itemValue ml-2">
                    {datauser?.driver_phone_number
                      ? datauser?.driver_phone_number
                      : "Inconnu"}
                  </span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Ville:</span>
                  <span className="itemValue ml-2">
                    {datauser?.driver_current_city
                      ? datauser?.driver_current_city
                      : "Inconnu"}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Motocycle type: </span>
                  <span className="itemValue ml-2">
                    {datauser?.driver_motocylces[0]?.motocycle_type
                      ? datauser?.driver_motocylces[0].motocycle_type
                      : "Inconnu"}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Driver registration date: </span>
                  <span className="itemValue ml-20">
                    {datauser?.driver_registration_date
                      ? datauser?.driver_registration_date.split(" ")[0]
                      : "Inconnu"}
                  </span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Driver type:</span>
                  <span className="itemValue ml-2">
                    <div>
                      {datauser?.is_driver == 1 && (
                        <span className="bg-red-100 w-fit text-color-red font-bold px-2 rounded-full">
                          coursier
                        </span>
                      )}
                      {datauser?.is_driver == 2 && (
                        <span className="bg-red-100 w-fit text-color-red font-bold px-2 rounded-full">
                          chauffeur
                        </span>
                      )}
                      {datauser?.is_driver == 3 && (
                        <span className="bg-red-100 w-fit text-color-red font-bold px-2 rounded-full">
                          chauffeur & coursier
                        </span>
                      )}
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <div className="cellAction">
              {datauser?.is_blacklisted_account && (
                <div
                  className="deleteButton1"
                  onClick={() => {
                    updateUser(id, datauser?.is_blacklisted_account);
                  }}
                >
                  <IconButton color="error" aria-label="add an alarm">
                    <RemoveCircleOutlineSharpIcon />
                  </IconButton>{" "}
                  Deblock
                </div>
              )}

              {!datauser?.is_activated_account && (
                <div
                  className="validate"
                  onClick={(e) => {
                    updatedriver(e, id, datauser?.is_activated_account);
                  }}
                >
                  <IconButton color="success" aria-label="add an alarm">
                    <ThumbUpIcon />
                  </IconButton>{" "}
                  Approve
                </div>
              )}
              {datauser?.is_activated_account && (
                <div
                  className="Disprove"
                  onClick={(e) => {
                    updatedriver(e, id, datauser?.is_activated_account);
                  }}
                >
                  <IconButton aria-label="add an alarm">
                    <ThumbDownAltIcon />
                  </IconButton>{" "}
                  Disapprove
                </div>
              )}
            </div>
          </div>

          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div>{<DriverFiles datauser={datauser} />}</div>
        <div className="datatable">
          <TableRow className="cc">
            {" "}
            TOTAL DES COMMANDES : {dataorder.length}
          </TableRow>
          {!loading && <CircularProgress color="success" className="spiner" />}

          {loading && (
            <DataGrid
              className="datagrid"
              rows={dataorder}
              columns={ordersColumns.concat(actionColumn)}
              pageSize={10}
              rowsPerPageOptions={[9]}
              checkboxSelection
              loading={!loading}
              components={{ Toolbar: GridToolbar }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Single;

import "./Dataorders.scss";
import { getFirestore, query, setDoc } from "firebase/firestore";
import React from "react";
import "antd/dist/antd.variable.min.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { userColumns, userRows, ordersColumns } from "../../datatablesource";
// import { ordersColumns } from "../../datatablesource";
import { useEffect, useState, useContext } from "react";
import { Button, Modal } from "antd";

import TableRow from "@mui/material/TableRow";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import CircularProgress from "@mui/material/CircularProgress";
import { MotoContext } from "../../context/MotoContext";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TrackOrders from "../TrackOrders";
import {
  PanoramaVerticalSelectRounded,
  SignalCellularNullOutlined,
} from "@mui/icons-material";

const Dataorders = () => {
  const [data, setData] = useState([]);
  const [dataor, setDataor] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [lano, setlano] = useState(null);
  const [latt, setlatt] = useState(null);
  const [fromadd, setfromadd] = useState(null);
  const [toadd, settoadd] = useState(null);

  const [openmod, setopenmod] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [loading, setloading] = useState(false);
  const { allUsers } = useContext(MotoContext);
  const { allDrivers } = useContext(MotoContext);
  const navigate = useNavigate();

  // console.log(allDrivers)
  const toview = (id) => {
    navigate("/orders/test", { state: { id } });
  };
  let list = [];
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "orders"),
      (snapShot) => {
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
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

  let listor = [];

  //  useEffect(() => {

  //     //  data.map(async (elem)=>{
  //     //   const workQ = query(collection(db, `orders/${elem.id}`))
  //     //   const workDetails = await getDocs(workQ);

  //     //   //  console.log("ccccccccccc");

  //     //   workDetails.docs.map( (doc)=>{
  //     //         listor.push({ id: doc.id, ...doc.data() })
  //     //         setDataor([...listor])
  //     //         setloading(true)

  //     //      }
  //   );

  //     //  })
  //   }

  //   ,[data])

  const actionColumn = [
    {
      headerName: "Nom du client ",
      width: 150,
      renderCell: (params) => {
        let name = allUsers.filter(
          (item) => item.id === params.row.customer_uid
        );
        console.log(name);
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
        let name = allDrivers.filter((item) => item.id == params.driver_uid);
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
      headerName: "Etoiles donnée par le conducteur",
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
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              onClick={() => toview(params.row.id)}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </div>
          </div>
        );
      },
    },
    {
      field: "order_arrival_location",
      headerName: "track",
      width: 150,
      renderCell: (params) => {
       

        console.log("😱");
    
        return (
          <div className="cellAction">
            <button
              onClick={() => {
                
                setfromadd({
                  lat: params.row.order_arrival_location?.latitude,
                  lon: params.row.order_arrival_location?.longitude
                });
                 settoadd({
                   lat: params.row.order_pickup_location?.latitude,
                   lon: params.row.order_pickup_location?.longitude,
                 });
                setopenmod(true);
              }}
              className=" px-2 rounded-md bg-green-500 font-bold ml-8 h-9  text-white"
            >
              <span className="">route</span>
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      {openmod && <TrackOrders  fromadd={fromadd} toadd={toadd} />}
      <TableRow className="cc"> TOTAL DES COMMANDES : {data.length}</TableRow>
      {!loading && <CircularProgress color="success" className="spiner" />}

      {loading && (
        <DataGrid
          className="datagrid"
          rows={data}
          columns={ordersColumns.concat(actionColumn)}
          pageSize={10}
          rowsPerPageOptions={[9]}
          checkboxSelection
          loading={!loading}
          components={{ Toolbar: GridToolbar }}
        />
      )}
    </div>
  );
};

export default Dataorders;

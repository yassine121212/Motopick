import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getFirestore, query, setDoc } from "firebase/firestore";
import { MotoContext } from "../../context/MotoContext.js";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import Spiner from "../Spiner/Spiner";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Datatable = () => {
  const [data, setData] = useState([]);
  const [listusersdeleted, setlistusersdeleted] = useState([]);
  const [loading, setloading] = useState(false);
  const { allOrders } = useContext(MotoContext);
  const navigate = useNavigate();

  const toview = (id) => {
    navigate("/users/test", { state: { id } });
  };
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setlistusersdeleted(
          list.filter((item) => item.is_deleted_account == true)
        );

        setData(list);
        
        setloading("true");
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const actionColumn = [
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
      field: "Orders Amount",
      headerName: "Montant de commandes",
      width: 170,
      renderCell: (params) => {
          let listorders = [];

           listorders = allOrders.filter(
            
            (item) =>(item.customer_uid === params.row.id)
        );
        return <div>{listorders.length}</div>;
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="flex justify-between mb-2">
        <TableRow>
          {" "}
          <span className="border-b-2 border-solid border-gray-300">
            TOTAL ACTIVE CUSTOMERS : {data.length}{" "}
          </span>
        </TableRow>
        <TableRow>
          <span className="border-b-2 border-solid border-gray-300">
            {" "}
            TOTAL CUSTOMERS DELETED : {listusersdeleted?.length}
          </span>
        </TableRow>
      </div>

      {!loading && <CircularProgress color="success" className="spiner" />}
      {loading && (
        <DataGrid
          className="datagrid"
          rows={data}
          columns={actionColumn.concat(userColumns)}
          pageSize={10}
          rowsPerPageOptions={[9]}
          checkboxSelection
          components={{ Toolbar: GridToolbar }}
        />
      )}
    </div>
  );
};

export default Datatable;

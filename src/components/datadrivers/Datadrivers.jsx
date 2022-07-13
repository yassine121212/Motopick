import "./Datadrivers.scss";
import {
  DataGrid,
  GridToolbar,
} from "@mui/x-data-grid";
import {
  getFirestore,
  query,
  setDoc,
} from "firebase/firestore";
import {
  userColumns,
  userRows,
} from "../../datatablesource";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
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

const Datadrivers = () => {
  const [data, setData] = useState([]);
  const [listorders, setlistorders] = useState();

  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const toview = (id) => {
    navigate(`/drivers/${id}`, { state: { id } });
  };
  // console.log(collection(db, "users").Doc("2BsvvTXA8vOMKaY213YwqUimYbH2"))

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "AdminPanelUsers"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          console.log(doc);
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        let listusers = list.filter(
          (item) => item.type == "driver"
        );

        setData(listusers);
        setloading(true);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(
        doc(db, "AdminPanelUsers", id)
      );
      setData(
        data.filter((item) => item.id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "verified",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        return (
          <div
            className={`"status"  ${
              params.row.verified
                ? "veri"
                : "disa"
            }`}
          >
            <span className="textSta">
              {params.row.verified
                ? "verified"
                : "disabled"}
            </span>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              onClick={() =>
                toview(params.row.id)
              }
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">
                View
              </div>
            </div>
            <div
              className="deleteButton"
              onClick={() =>
                handleDelete(params.row.id)
              }
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      {/* <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div> */}
      <TableRow className="cc">
        {" "}
        TOTAL DES DRIVERS : {data.length}
      </TableRow>

      {!loading && (
        <CircularProgress
          color="success"
          className="spiner"
        />
      )}
      {loading && (
        <DataGrid
          className="datagrid"
          rows={data}
          columns={userColumns.concat(
            actionColumn
          )}
          pageSize={10}
          rowsPerPageOptions={[9]}
          checkboxSelection
          components={{ Toolbar: GridToolbar }}
        />
      )}
    </div>
  );
};

export default Datadrivers;

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
  configColumns,
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
import "./Config.scss";
const Datadrivers = () => {
  const [data, setData] = useState([]);
  const [listorders, setlistorders] = useState();

  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const toview = (id) => {
    navigate("/Config/Update", { state: { id } });
  };
  // console.log(collection(db, "users").Doc("2BsvvTXA8vOMKaY213YwqUimYbH2"))




  const actionColumn = [
    
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
           <div onClick={()=>toview(params.row.id)} style={{ textDecoration: "none" }}>
              <div className="viewButton">Update</div>          
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];


  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "config"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
           list.push({
            id: doc.id,
            ...doc.data(),
          });
        });
       

        setData(list);
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
        doc(db, "config", id)
      );
      setData(
        data.filter((item) => item.id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div className="datatable">
 
      <TableRow className="cc">
        {" "}
        TOTAL  : {data.length}
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
          columns={configColumns.concat(actionColumn)}
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

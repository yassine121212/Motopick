import "./Block.scss";
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

const  Block = () => {
  const [data, setData] = useState([]);
  const [listorders, setlistorders] = useState();

  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const toview = (id) => {
    navigate(`/users/${id}`, { state: { id } });
  };
  
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
           list.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        let listusers = list.filter(
          (item) => item.is_activated_account == true
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
        doc(db, "users", id)
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
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div onClick={()=>toview(params.row.id)} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </div>
           
          </div>
        );
      },
    },
  ];
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
          columns={userColumns.concat(actionColumn)}
          pageSize={10}
          rowsPerPageOptions={[9]}
          checkboxSelection
          components={{ Toolbar: GridToolbar }}
        />
      )}
    </div>
  );
};

export default Block;

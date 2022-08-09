import "./Dataadmins.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getFirestore, query, setDoc } from "firebase/firestore";
import { adminColumns, userRows } from "../../datatablesource";
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
import { getAuth, deleteUser } from "firebase/auth";
import { MotoContext } from "../../context/MotoContext";

const Dataadmins = () => {
  const [data, setData] = useState([]);
  const [listorders, setlistorders] = useState();
  const { userf } = useContext(MotoContext);

  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const toview = (id) => {
    navigate("/users/test", { state: { id } });
  };

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "Admins"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
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
      await deleteDoc(doc(db, "Admins", id));
      setData(data.filter((item) => item.id !== id));

      const auth = getAuth();
      const uid = id;

      deleteUser(uid)
        .then(() => {
          // User deleted.
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {params.row.delet && (
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row.id)}
              >
                Delete
              </div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <TableRow className="cc"> TOTAL DES ADMINS : {data.length}</TableRow>
        <Link to="/Admin/new" className="link">
          Ajouter un nouveau administrateur{" "}
        </Link>
      </div>

      {!loading && <CircularProgress color="success" className="spiner" />}
      {loading && (
        <DataGrid
          className="datagrid"
          rows={data}
          columns={adminColumns.concat(actionColumn)}
          pageSize={10}
          rowsPerPageOptions={[9]}
          checkboxSelection
          components={{ Toolbar: GridToolbar }}
        />
      )}
    </div>
  );
};

export default Dataadmins;

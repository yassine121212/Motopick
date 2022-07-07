import "./datatable.scss";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { userColumns, userRows } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import Spiner from "../Spiner/Spiner"


const Datatable = () => {
  const [data, setData] = useState([]);
  const [listorders, setlistorders] = useState([]);

  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const toview=(id)=>{
    navigate("/users/test", { state: { id } });

  }
  // console.log(collection(db, "users").Doc("2BsvvTXA8vOMKaY213YwqUimYbH2"))
   
  useEffect(() => {
    // const fetchData = async () => {
    //   let list = [];
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "users"));
    //     querySnapshot.forEach((doc) => {
    //       list.push({ id: doc.id, ...doc.data() });
    //     });
    //     setData(list);
    //     console.log(list);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchData();

    // LISTEN (REALTIME)
    const unsub = onSnapshot(
    
      collection(db, "AdminPanelUsers"),
      (snapShot) => {
        
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
         });
        setData(list);
       
      },
      (error) => {
        console.log(error);
      }
    );
     
    return () => {
 
      unsub();
      
    };
    setloading(false)

  }, []);


  
   
  
 
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "AdminPanelUsers", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    { field: "order",
      headerName: "Orders",
      width: 200,
      renderCell: (params) => {
        const numorder =listorders.filter(  
          item=>  item.owner==params.row.id
          ).length
          // console.log(numorder)
          // console.log(params.row.id )
        return (
          <div className="orders">
             {numorder}
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
            <div onClick={()=>toview(params.row.id)} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
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
 
  
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>

      {loading && (
        <Spiner/>
      )}
      {!loading && (<DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[9]}
        checkboxSelection
        components={{ Toolbar: GridToolbar }} 

      />)}
      

     
    </div>
  );
};

export default Datatable;
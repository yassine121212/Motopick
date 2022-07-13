import "./datatable.scss";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {   getFirestore, query, setDoc } from 'firebase/firestore'

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
import TableRow from "@mui/material/TableRow";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Datatable = () => {
  const [data, setData] = useState([]);
  const [listorders, setlistorders] = useState();

  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const toview=(id)=>{
    navigate("/users/test", { state: { id } });

  }
  // console.log(collection(db, "users").Doc("2BsvvTXA8vOMKaY213YwqUimYbH2"))
   
  useEffect(() => {

    const unsub = onSnapshot(

      collection(db, "AdminPanelUsers"),
      (snapShot) => {
        
        let list = [];
        snapShot.docs.forEach((doc) => {
          console.log(doc);
          list.push({ id: doc.id, ...doc.data()});
         });
 
        setData(list);
        setloading('true')
        console.log(loading)

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
    // { field: "order",
    //   headerName: "Orders",
    //   width: 100,
      // renderCell: (params) => {
      //   let numorder ;
      //   data.map(async (elem)=>{
      //     const workQ = query(collection(db, `AdminPanelUsers/${elem.id}/orders`))
      //    const workDetails = await getDocs(workQ)
      //    let listor=[]
      //    console.log(workDetails.docs)
          

      //    workDetails.docs.map(
      //     (doc)=>
      //     { 
      //       listor.push({ id: doc.id, ...doc.data() });
      //       setlistorders([...listor])

      //    }
      // )
      //       console.log("eeeeeeeeeeeeeeeeee")
      //       console.log(listorders)

      //       numorder =listorders.filter((item) => item.id == params.row.id).length
         
      //   },[data])
        // return (
        //   <div className="orders">
        //      {numorder} 4
        //   </div>
        // );
      // },
    // },
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
      
 <TableRow className="cc"  > TOTAL DES CLIENTS : {data.length}
            </TableRow>     
      
      {!loading && (
       
        <CircularProgress  color="success" className="spiner" />
       
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

      />)}
          

     
    </div>
  );
};

export default Datatable;
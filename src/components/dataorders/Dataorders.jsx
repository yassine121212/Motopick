import "./Dataorders.scss";

import {   getFirestore, query, setDoc } from 'firebase/firestore'
import React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { userColumns, userRows ,ordersColumns} from "../../datatablesource";
// import { ordersColumns } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import Spiner from "../Spiner/Spiner"
import { list } from "firebase/storage";
import CircularProgress from '@mui/material/CircularProgress';

const Dataorders = () => {
  const [data, setData] = useState([]); 
  const [dataor, setDataor] = useState([]); 
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const toview=(id)=>{
    navigate("/users/test", { state: { id } });
  }
  useEffect(() => {
  
    
    const unsub = onSnapshot(
    
      collection(db, "AdminPanelUsers"),
      (snapShot) => {
        
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({id: doc.id, ...doc.data()});
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

  }, []);






  let listor= [];
 
  
  useEffect(() => {
 
       data.map(async (elem)=>{
        const workQ = query(collection(db, `AdminPanelUsers/${elem.id}/orders`))
        const workDetails = await getDocs(workQ);

        //  console.log("ccccccccccc");
 
        workDetails.docs.map( (doc)=>{ 
              listor.push({ id: doc.id, ...doc.data() })
              setDataor([...listor])
              setloading('true')

           }
        );
       
        
       })
    }

    ,[data])
    
   
      return (
    <div  className="datatable">
        <TableRow className="cc"  > TOTAL DES COMMANDES : {dataor.length}
            </TableRow>     
            {/* {!loading && ( */}
       
       {/* <CircularProgress  color="success" className="spiner" /> */}
      
     {/* )} */}
     {/* {loading && ( */}
    <DataGrid
        className="datagrid"
        rows={dataor}
        columns={ordersColumns}
        pageSize={10}
        rowsPerPageOptions={[9]}
        checkboxSelection
        components={{ Toolbar: GridToolbar }} 

      />
      {/* )} */}
    
    </div>
  );
       } 
        
export default Dataorders;
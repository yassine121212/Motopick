import "./Dataorders.scss";

import {   getFirestore, query, setDoc } from 'firebase/firestore'
import React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { userColumns, userRows } from "../../datatablesource";
import { ordersColumns } from "../../datatablesource";
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
const Dataorders = () => {
  const [data, setData] = useState([]); 
  const [dataor, setDataor] = useState([]); 
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const toview=(id)=>{
    navigate("/users/test", { state: { id } });
  }
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
        console.log(list);
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






  let listor= [];
 
  
  useEffect(() => {
 
       data.map(async (elem)=>{
         const workQ = query(collection(db, `AdminPanelUsers/${elem.id}/orders`))
        const workDetails = await getDocs(workQ)

         console.log("ccccccccccc");
        console.log(workDetails);

        workDetails.docs.map(
            (doc)=>
            { 
              listor.push({ id: doc.id, ...doc.data() });
              setDataor([...listor])

           }
        )
       
        
       })
   
    }
    ,[data])
    
   
      return (
    <div className="datatable">
      
      <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
             <TableCell className="tableCell">From</TableCell>
             <TableCell className="tableCell">Distance</TableCell>
             <TableCell className="tableCell">Price</TableCell>
             <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataor?.map((row) => (
            <TableRow key={row?.id}>
              <TableCell className="tableCell">{row?.id}</TableCell>

               {/* <TableCell className="tableCell">{row?.date}</TableCell> */}
               <TableCell className="tableCell">{row?.from}</TableCell>
               <TableCell className="tableCell">{row?.distance}</TableCell>

               <TableCell className="tableCell">
                <span className={`status ${row?.status}`}>{row?.status}</span>
              </TableCell>
              <TableCell className="tableCell">{row?.price} $</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     
    </div>
  );
       }   
export default Dataorders;
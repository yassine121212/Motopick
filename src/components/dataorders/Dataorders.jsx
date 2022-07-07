import "./Dataorders.scss";

import {   getFirestore, query, setDoc } from 'firebase/firestore'
import React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { userColumns, userRows } from "../../datatablesource";
import { ordersColumns } from "../../datatablesource";
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
import { list } from "firebase/storage";
const Dataorders = () => {
  const [data, setData] = useState([]); 
  const [data1, setData1] = useState([]); 
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


<<<<<<< Updated upstream
  useEffect(() => {

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

=======
>>>>>>> Stashed changes




  useEffect(() => {
 
       let list= [];
    data.map(async (elem)=>{
        const workQ = query(collection(db, `AdminPanelUsers/${elem.id}/orders`))
        const workDetails = await getDocs(workQ)
        const workInfo = workDetails.docs.map((doc)=>({
            ...doc.data(), id:doc.id
        }
        ),)
        setData1(workInfo);

        console.log(data1);

      })
        
    }
    ,[])

      return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>

     <DataGrid
        className="datagrid"
        rows={data1}
        columns={ordersColumns}
        pageSize={10}
        rowsPerPageOptions={[9]}
        checkboxSelection
        components={{ Toolbar: GridToolbar }} 

      />
     
    </div>
  );
       }   
export default Dataorders;
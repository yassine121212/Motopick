import "./Update.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  getDoc,updateDoc
} from "firebase/firestore";

import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import React, { useRef } from 'react'
import Stack from '@mui/material/Stack';
import SnackbarContent from '@mui/material/SnackbarContent';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useLocation } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const New = ({ inputs, title }) => {
    const location = useLocation();
    const [id, setid] = useState(location.state.id);
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const [datauser, setdatauser] = useState(null)

  const navigate = useNavigate()

   useEffect ( async () => {
    const docRef = doc(db, "config", id);
    try {
      const docSnap = await getDoc(docRef);
      setdatauser(docSnap.data());
  } catch(error) {
      console.log(error)
  }
 
},[id])



const [validation, setValidation] = useState("");


  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({ ...data, [name]: value });
  };
  const [open, setOpen] = React.useState(false);

  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);}
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const userDoc=doc(db,"config",id);
 
  await updateDoc(userDoc,data);
       setValidation("")
      navigate(-1)

    } catch (err) {
      
      if(err.code ) {

        setValidation("something wrong")
        setOpen(true);

      }
      
     
      console.log(err);
    }
   
   
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
         
          <div className="right">
            <form  onSubmit={handleAdd}>
          

            <div className="formInput" >
                  <label>label</label>
                  <input
                    id=""
                    type="text"
                    name="label"
                    // value={datauser.label}:

                    onChange={handleInput}
                  />

                </div>
            <div className="formInput" >
                  <label>Param</label>
                  <input
                    id=""
                    type="text"
                    // value={datauser.param}
                    name="param"
                    onChange={handleInput}
                  />

                </div>
            <div className="formInput" >
                  <label>Value 1</label>
                  <input
                    id=""
                    type="text"
                    // value={datauser.value1}
                    name="value1"
                    onChange={handleInput}
                  />

                </div>
            <div className="formInput" >
                  <label>Value 2</label>
                  <input
                    id=""
                    type="text"
                    // value={datauser.value2}
                    name="value2"
                    onChange={handleInput}
                  />

                </div>
            <div className="formInput" >
                  <label>Applicable value</label>
                  <input
                    id=""
                    type="text"
                    // value={datauser.applicable_value}
                    name="applicable_value"
                    onChange={handleInput}
                  />

                </div>

              {/* {inputs.map((input) => (
                
              ))} */}


                          <div class="grid-container">
              


  <button  disabled={per !== null && per < 100} type="submit">
                Send
              </button> 

  </div>    
  
              
            
            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error"sx={{ width: '100%' }}>
        {validation} !
        </Alert>
      </Snackbar>
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
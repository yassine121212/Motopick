import "./new.scss";
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
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const navigate = useNavigate()
const formRef=useRef()


const userCollectionRef= collection(db,"Admins" );

const [validation, setValidation] = useState("");

const [isChecked1, setIsChecked1] = useState(false);
const [isChecked2, setIsChecked2] = useState(false);
const [isChecked3, setIsChecked3] = useState(false);
const [isChecked4, setIsChecked4] = useState(false);
const [isChecked5, setIsChecked5] = useState(false);

const handleOnChange1 = () => {
  setIsChecked1(!isChecked1);
};
const handleOnChange2 = () => {
  setIsChecked2(!isChecked2);
};
const handleOnChange3 = () => {
  setIsChecked3(!isChecked3);
};
const handleOnChange4 = () => {
  setIsChecked4(!isChecked4);
};
const handleOnChange5 = () => {
  setIsChecked5(!isChecked5);
};


  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({ ...data, [name]: value });
  };
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  

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
       setValidation("")
   
      await addDoc(userCollectionRef,{email:data.email,nom:data.nom,prenom:data.prenom,mdrivers:isChecked2,musers:isChecked1,mprices:isChecked3,morders:isChecked4,mblock:isChecked5,madmin:false,delet:true})

      navigate(-1)

    } catch (err) {
      
      if(err.code === "auth/invalid-email") {

        setValidation("Email format invalid")
        setOpen(true);

      }
      
      if(err.code === "auth/email-already-in-use") {
        setValidation("Email already used")
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
            <form ref={formRef} onSubmit={handleAdd}>
          

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    name={input.name}
                    onChange={handleInput}
                  />

                </div>
              ))}


                          <div class="grid-container">
              

                          <label>   <h4> Les Droits: </h4>  </label>

<div class="box">
  <div class="item">
    <div class="checkbox-rect">
      <input type="checkbox" id="checkbox-rect1" name="check"  checked={isChecked1} onChange={handleOnChange1}/>
      <label for="checkbox-rect1">Manage Users</label>
    </div>
  </div>   
  <div class="item">
    <div class="checkbox-rect">
      <input type="checkbox" id="checkbox-rect2" name="check1"  checked={isChecked2} onChange={handleOnChange2}/>
      <label for="checkbox-rect2">Manage Drivers</label>
    </div>
  </div>   
   
  <div class="item">
    <div class="checkbox-rect">
      <input type="checkbox" id="checkbox-rect3" name="check2" checked={isChecked3} onChange={handleOnChange3}/>
      <label for="checkbox-rect3">Manage Prices</label>
    </div>
  </div>   
  <div class="item">
    <div class="checkbox-rect">
      <input type="checkbox" id="checkbox-rect4" name="check3" checked={isChecked4} onChange={handleOnChange4}/>
      <label for="checkbox-rect4">Manage Orders</label>
    </div>
  </div>   
  <div class="item">
    <div class="checkbox-rect">
      <input type="checkbox" id="checkbox-rect5" name="check4" checked={isChecked5} onChange={handleOnChange5}/>
      <label for="checkbox-rect5">Manage block liste</label>
    </div>
  </div>   
   
  </div>
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
            <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success"sx={{ width: '100%' }}>
       success!
        </Alert>
      </Snackbar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
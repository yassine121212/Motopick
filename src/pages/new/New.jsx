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

const handleOnChange1 = () => {
  setIsChecked1(!isChecked1);
};
const handleOnChange2 = () => {
  setIsChecked2(!isChecked2);
};
const handleOnChange3 = () => {
  setIsChecked3(!isChecked3);
};

  // useEffect(() => {
  //   const uploadFile = () => {
  //     const name = new Date().getTime() + file.name;

  //     console.log(name);
  //     const storageRef = ref(storage, file.name);
  //     const uploadTask = uploadBytesResumable(storageRef, file);

  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log("Upload is " + progress + "% done");
  //         setPerc(progress);
  //         switch (snapshot.state) {
  //           case "paused":
  //             console.log("Upload is paused");
  //             break;
  //           case "running":
  //             console.log("Upload is running");
  //             break;
  //           default:
  //             break;
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           setData((prev) => ({ ...prev, img: downloadURL }));
  //         });
  //       }
  //     );
  //   };
  //   file && uploadFile();
  // }, [file]);

  console.log(data);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({ ...data, [name]: value });
  };
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
   
  };

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
      console.log(res)
      setValidation("")
      // await setDoc(doc(db, "Admins", res.user.uid), {
      //   ...data,
      //   timeStamp: serverTimestamp(),
      // });
      await addDoc(userCollectionRef,{email:data.email,nom:data.nom,prenom:data.prenom,mdrivers:isChecked2,musers:isChecked1,mprices:isChecked3})

      navigate(-1)

    } catch (err) {
      
      if(err.code === "auth/invalid-email") {
        setValidation("Email format invalid")
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
          {/* <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div> */}
          <div className="right">
            <form ref={formRef} onSubmit={handleAdd}>
              {/* <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input   
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div> */}

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
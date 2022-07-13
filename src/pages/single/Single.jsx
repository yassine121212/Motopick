import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import { collection,getDoc,getDocs ,doc,updateDoc} from "firebase/firestore";
import { db } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";



import IconButton from '@mui/material/IconButton';
import AppBlockingSharpIcon from '@mui/icons-material/AppBlockingSharp';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
 const Single = () => {
  const location = useLocation();
  const [id, setid] = useState(location.state.id);
  const [datauser, setdatauser] = useState(null)
  const [orders, setorders] = useState([])
  const handluser = async () => {
    const docRef = doc(db, "AdminPanelUsers", id);
    try {
      const docSnap = await getDoc(docRef);
      setdatauser(docSnap.data());
  } catch(error) {
      console.log(error)
  }
 
}

const navigate = useNavigate();

 




const updateUser=async(id,blackListed)=>{
  const userDoc=doc(db,"AdminPanelUsers",id);
     const newFields={blackListed:!blackListed};
    await updateDoc(userDoc,newFields);
window.location.reload()


  }

  useEffect( async () => {
     handluser();
    
         const orders = collection(db, `AdminPanelUsers/${id}/orders`)
        const ordersder = await getDocs(orders)
         const workInfo = ordersder.docs.map((doc)=>({
            ...doc.data(), id:doc.id
        }))
        setorders(workInfo);
     
  }, [id]);
  
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={datauser?.photoUrl ? datauser?.photoUrl : ""}
                alt="Photo pic"
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{datauser?.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{datauser?.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{datauser?.phone ? datauser?.phone : "Inconnu"}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                  {datauser?.location ? datauser?.location : "Inconnu"}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">{datauser?.city ? datauser?.city : "Inconnu"}</span>
                </div>
                <div className="cellAction">
                {datauser?.blackListed &&(<div
              className="deleteButton1" 
              onClick={() => {
                updateUser(id , datauser?.blackListed);
              }}
            >
              <IconButton color="error" aria-label="add an alarm">
        <RemoveCircleOutlineSharpIcon />
      </IconButton> Deblock
            </div>)}
               </div>
               
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3/ 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List id={id}/>
        </div>
      </div>
    </div>
  );
};

export default Single;

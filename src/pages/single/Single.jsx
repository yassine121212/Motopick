import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import { collection,getDoc,getDocs ,doc} from "firebase/firestore";
import { db } from "../../firebase";

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
 
  useEffect( async () => {
     handluser();
    
         const orders = collection(db, `users/${id}/orders`)
        const ordersder = await getDocs(orders)
        console.log(ordersder)
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
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
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

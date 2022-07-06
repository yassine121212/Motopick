import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import { useEffect,useState } from "react";
import { collection,getDoc,getDocs ,doc} from "firebase/firestore";
import { db } from "../../firebase";
const List = ({id}) => {
  const [orders, setorders] = useState([])
async function fetchorders(){const orders = collection(db, `users/${id}/orders`)
       const ordersder = await getDocs(orders)
       console.log(ordersder)
       const workInfo = ordersder.docs.map((doc)=>({
           ...doc.data(), id:doc.id
       }))
       setorders(workInfo);
   }
  useEffect( () => {

    fetchorders()
        
   
 }, [id]);
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable orders={orders}/>
      </div>
    </div>
  )
}

export default List
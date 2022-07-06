import "./Orders.scss"

import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Dataorders from "../../components/dataorders/Dataorders"

const Orders = () => {
  return (
    <div className="orders">
      <Sidebar/>
      <div className="ordersContainer">
      <Navbar/>
       <Dataorders/>
      </div>
    </div>
  )
}

export default Orders;
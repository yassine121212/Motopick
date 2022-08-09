import "./config.scss"

import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Config from "../../components/conffig/Config"

const Orders = () => {
  return (
    <div className="orders">
      <Sidebar/>
      <div className="ordersContainer">
      <Navbar/>
       <Config/>
      </div>
    </div>
  )
}

export default Orders;
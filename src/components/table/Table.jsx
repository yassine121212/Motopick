import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect, useContext } from "react";
import { MotoContext } from "../../context/MotoContext";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ordersColumns } from "../../datatablesource";
import { Rating } from "@mui/material";

const List = ({ id }) => {
  const { allOrders, allDrivers } = useContext(MotoContext);

  const [orders, setorders] = useState(null);
  const [driver, setdriver] = useState(null);

  useEffect(() => {
    setorders(allOrders.filter((order) => order.customer_uid === id));

    // orders?.map((order) =>
    //   setdriver(
    //     allDrivers.filter((driver) => driver.id === order.driver_uid)
    //   )
    // );
  }, [id]);
 
   const actionColumn = [
     {
       field: "Driver name",
       headerName: "Nom du conducteur",
       width: 150,
       renderCell: (params) => {
         let name = allDrivers.filter(
           (item) => item.driver_uid === params.row.driver_uid
         );
          return (
           <div className="flex flex-col ">{name[0].driver_full_name}</div>
         );
       },
     },
   ]
  
  return (
    <DataGrid
      className="min-h-[14cm]"
      rows={orders || ""}
      columns={ordersColumns.concat(actionColumn) || ""}
      rowsPerPageOptions={[10]}
      checkboxSelection
      components={{ Toolbar: GridToolbar }}
    />
  );
};

export default List;

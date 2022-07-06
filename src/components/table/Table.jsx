import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import { collection,getDocs ,doc} from "firebase/firestore";
import { db } from "../../firebase";

const List = ({id}) => {
  
   
    
    const [orders, setorders] = useState(null)
    useEffect( async () => {
     
        const orders = collection(db, `users/${id}/orders`)
        const ordersder = await getDocs(orders)
        console.log(ordersder)
        const workInfo = ordersder.docs.map((doc)=>({
            ...doc.data(), id:doc.id
        }))
        setorders(workInfo);
      }
    , [id]);
  
  
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Distance</TableCell>
            <TableCell className="tableCell">Time</TableCell>
            <TableCell className="tableCell">From</TableCell>
            <TableCell className="tableCell">To</TableCell>
            <TableCell className="tableCell">Type</TableCell>
            <TableCell className="tableCell">Status</TableCell>
            <TableCell className="tableCell">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((row) => (
            <TableRow key={row?.id}>
              <TableCell className="tableCell">{row?.id}</TableCell>

              <TableCell className="tableCell">{row?.distance}</TableCell>
              {/* <TableCell className="tableCell">{row?.date}</TableCell> */}
              <TableCell className="tableCell">{row?.estimatedTime}</TableCell>
              <TableCell className="tableCell">{row?.from}</TableCell>
              <TableCell className="tableCell">{row?.to}</TableCell>
              <TableCell className="tableCell">{row?.type}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row?.status}`}>{row?.status}</span>
              </TableCell>
              <TableCell className="tableCell">{row?.price} $</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;

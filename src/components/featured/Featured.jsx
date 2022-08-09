import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useState, useContext, useEffect } from "react";
import { MotoContext } from "../../context/MotoContext";
import moment from "moment";

const Featured = () => {
  const { allOrders } = useContext(MotoContext);
  const [ordersDate, setordersDate] = useState(null);
  const [ordersLastDate, setordersLastDate] = useState(null);
  const [orders_sales_current_date, setorders_sales_current_date] =
    useState(null);
  const [orders_sales_last_date, setorders_sales_last_date] = useState(null);
  const [porcantage, setporcantage] = useState(null);
  const current_Date = moment().format("DD-MM-yyyy");
  const current_Last_Date = moment().subtract(1, "days").format("DD-MM-yyyy");

  const calculPourcantage = (cuPur, laPur) => {
    const diffPur = cuPur - laPur;
    const nextCal = diffPur / laPur;
    return nextCal * 100;
  };

  useEffect(() => {
    setordersDate(
      allOrders.filter(
        (order) => order.order_pickup_time?.split(" ")[0] === current_Date
      )
    );
    setordersLastDate(
      allOrders.filter(
        (order) => order.order_pickup_time?.split(" ")[0] === current_Last_Date
      )
    );
  }, [current_Date]);
  useEffect(() => {
    let elementCurrentDate = 0;
    let elementLastDate = 0;
    for (let index = 0; index < ordersDate?.length; index++) {
      elementCurrentDate =
        ordersDate[index].order_purchase_amount + elementCurrentDate;
    }
    for (let index = 0; index < ordersLastDate?.length; index++) {
      elementLastDate =
        ordersLastDate[index].order_purchase_amount + elementLastDate;
    }
    setorders_sales_current_date(elementCurrentDate);
    setorders_sales_last_date(elementLastDate);
    setporcantage(
      calculPourcantage(orders_sales_current_date, orders_sales_last_date)
    );
  }, [orders_sales_current_date, ordersLastDate]);
  return (
    <div className="featured">
      <div className="bottom mt-[2cm]">
        <div className="featuredChart">
          <CircularProgressbar
            value={porcantage}
            text={porcantage?.toFixed(1) + "%"}
            strokeWidth={5}
          />
        </div>
        <p className="title">Total des ventes réalisées aujourd'hui</p>
        <p className="amount">{orders_sales_current_date} MAD</p>
        {/* <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Featured;

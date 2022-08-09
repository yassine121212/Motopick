import "./SingleOrder.scss";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useEffect, useState,useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useLocation } from "react-router-dom";
import { MotoContext } from "../../context/MotoContext";
import { Rating } from "@mui/material";
import Widget from "../../components/widget/Widget";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const SingleOrder = () => {
    const location = useLocation();
  const [id, setid] = useState(location.state.id);
    const [dataorders, setdataorders] = useState(null);
    const { allDrivers } = useContext(MotoContext);
    const { allUsers } = useContext(MotoContext);

      let drivername= allDrivers.filter(
        (item) => item.id == dataorders?.driver_uid)
     

    const handlorder = async () => {
        const docRef = doc(db, "orders", id);
        try {
          const docSnap = await getDoc(docRef);
          setdataorders(docSnap.data());
         } catch (error) {
          console.log(error);
        }
      };
     
      useEffect(async () => {
        
        handlorder();
        
      }, [id]);
      
      let costumername = allUsers.filter(
        (item) => item.id == dataorders?.customer_uid)

        // les cartes pour les commentaires et cancellation reason 
        const card = (
          <React.Fragment>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                display="flex"
                justify-content="space-between"
                gutterBottom
              >
                commentaire sur le client{" "}
              </Typography>

              <Typography variant="body2">
                {dataorders?.comment_about_customer}
              </Typography>
            </CardContent>
          </React.Fragment>
        );
        const card1 = (
          <React.Fragment>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                scroll-behavior="smooth"
                color="text.secondary"
                display="flex"
                justify-content="space-between"
                gutterBottom
              >
                commentaire sur le conducteur{" "}
              </Typography>

              <Typography variant="body2">
                {dataorders?.comment_about_driver}
              </Typography>
            </CardContent>
          </React.Fragment>
        );
        const card2 = (
          <React.Fragment>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                scroll-behavior="smooth"
                color="text.secondary"
                display="flex"
                justify-content="space-between"
                gutterBottom
              >
                Motif d'annulation du client{" "}
              </Typography>

              <Typography variant="body2">
                {dataorders?.customer_cancellation_reason}
              </Typography>
            </CardContent>
          </React.Fragment>
        );
        const card3 = (
          <React.Fragment>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                scroll-behavior="smooth"
                color="text.secondary"
                display="flex"
                justify-content="space-between"
                gutterBottom
              >
                Motif d'annulation du conducteur
              </Typography>

              <Typography variant="body2">
                {dataorders?.driver_cancellation_reason}
              </Typography>
            </CardContent>
          </React.Fragment>
        );
        const card4 = (
          <React.Fragment>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                scroll-behavior="smooth"
                color="text.secondary"
                display="flex"
                justify-content="space-between"
                gutterBottom
              >
                Commentaires sur la commande
              </Typography>

              <Typography variant="body2">
                {dataorders?.order_comments}
              </Typography>
            </CardContent>
          </React.Fragment>
        );


  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title1">Informations</h1>
            <div className="item1">
              <div className="details">
                {/* <span className="itemKey"> Order type:   </span> */}

                <div className="detailItem">
                  <span className="itemKey"> Type de commande:</span>
                  <span className="itemValue">
                    {" "}
                    {dataorders?.order_type == 1 && <span>Voyage </span>}
                    {dataorders?.order_type == 2 && <span>Livraison</span>}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Nom de client :</span>
                  <span className="itemValue">
                    {" "}
                    {costumername[0]?.customer_full_name}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Nom du conducteur:</span>
                  <span className="itemValue">
                    {" "}
                    {drivername[0]?.driver_full_name}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Order city:</span>
                  <span className="itemValue"> {dataorders?.order_city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Type de Moto:</span>
                  <span className="itemValue">
                    {" "}
                    {dataorders?.order_moto_type}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">prix: </span>
                  <span className="itemValue">
                    {dataorders?.order_purchase_amount}{" "}
                    {dataorders?.order_purchase_amount && <span> DH</span>}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Distance </span>
                  <span className="itemValue">
                    {dataorders?.nbre_km_depart_destination}
                  </span>
                </div>
              </div>

              <div className="item1">
                <div className="details">
                  <div className="detailItem">
                    <span className="itemKey">Nombre tentaives : </span>
                    <span className="itemValue">
                      {dataorders?.nbre_tentaives}
                    </span>
                  </div>

                  <div className="detailItem">
                    <span className="itemKey">
                      Téléphone du destinataire :{" "}
                    </span>
                    <span className="itemValue">
                      {dataorders?.order_destinataire_phone}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Annulé par : </span>
                    <span className="itemValue">
                      {dataorders?.is_canceled_by_customer && (
                        <span> Client</span>
                      )}{" "}
                      {dataorders?.is_canceled_by_driver && (
                        <span>, Conducteur</span>
                      )}
                      {!dataorders?.is_canceled_by_customer &&
                        !dataorders?.is_canceled_by_driver && (
                          <span>Aucun</span>
                        )}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Rapporté par : </span>
                    <span className="itemValue">
                      {dataorders?.is_reported_by_customer && (
                        <span> Client</span>
                      )}{" "}
                      {dataorders?.is_reported_by_driver && (
                        <span>, Conducteur</span>
                      )}
                      {!dataorders?.is_reported_by_customer &&
                        !dataorders?.is_reported_by_driver && (
                          <span>Aucun</span>
                        )}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">prévu : </span>
                    <span className="itemValue">
                      {dataorders?.is_planned ? (
                        <span> Vrai</span>
                      ) : (
                        <span> Faux</span>
                      )}
                    </span>
                  </div>
                  <div className="detailItem flex">
                    <span className="itemKey">
                      Etoiles attribuées par le client:
                    </span>
                    <span className="itemValue">
                      {" "}
                      <Rating
                        name="read-only"
                        value={dataorders?.customer_given_stars || null}
                        readOnly
                        size="small"
                        className="justify-end"
                      />
                    </span>
                  </div>
                  <div className="detailItem flex">
                    <span className="itemKey">
                      Etoiles attribuées par le conducteur:
                    </span>
                    <span className="itemValue">
                      {" "}
                      <Rating
                        name="read-only"
                        value={dataorders?.driver_given_stars || null}
                        readOnly
                        size="small"
                        className="justify-end"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 
        <div className="home">
     
      <div className="homeContainer">
       
        <div  className="widgets">
          <Widget type="commentcustomer" />
          <Widget type="orders" />
          <Widget type="Admins" />
          <Widget type="user" />
          <Widget type="orders" />
          <Widget type="Admins" />
        </div>
       
      
      </div>
    </div> */}

        <div className="flex flex-nowrap">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: 228,
                height: 128,
                gap: 20,
              },
            }}
          >
            <Card variant="outlined">{card}</Card>
          </Box>
          <Box
            sx={{
              minWidth: 100,
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: 228,
                height: 128,
              },
            }}
          >
            <Card variant="outlined">{card1}</Card>
          </Box>
          <Box
            sx={{
              minWidth: 100,
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: 228,
                height: 128,
              },
            }}
          >
            <Card variant="outlined">{card2}</Card>
          </Box>
          <Box
            sx={{
              minWidth: 100,
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: 228,
                height: 128,
              },
            }}
          >
            <Card variant="outlined">{card3}</Card>
          </Box>
          <Box
            sx={{
              minWidth: 100,
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: 228,
                height: 128,
              },
            }}
          >
            <Card variant="outlined">{card4}</Card>
          </Box>
        </div>

        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
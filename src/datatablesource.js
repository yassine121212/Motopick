import Rating from "@mui/material/Rating";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import IconButton from "@mui/material/IconButton";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useContext } from "react";

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export const userColumns = [
  {
    field: "user",
    headerName: "Utilisateur",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.customer_picture ? (
            <img
              className="cellImg"
              src={params.row.customer_picture}
              alt="avatar"
            />
          ) : (
            <img
              className="cellImg"
              src="https://cdn1.iconfinder.com/data/icons/user-interface-1-glyph/32/ui_avatar_profil_user_circle-512.png"
              alt="avatar"
            />
          )}
          <span className="name">{params.row.customer_full_name}</span>
        </div>
      );
    },
  },
  {
    field: "customer_stars_mean",
    headerName: "Etoiles",
    width: 130,
    renderCell: (params) => {
      return (
        <div className="">
          <Rating
            name="read-only"
            value={params.row.customer_stars_mean}
            readOnly
            size="small"
            className="justify-end"
          />
        </div>
      );
    },
  },

  {
    field: "customer_email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "customer_date_naissance",
    headerName: "Age",
    width: 100,
    renderCell: (params) => {
      const testage = params.row.customer_date_naissance?.split("-");
      let age;
      if (testage) {
        age = parseInt(testage[2]);
      }
      const lastage = 2022 - age;

      return (
        <div>
          {" "}
          {params.row.customer_date_naissance ? <div>{lastage} ans</div> : "_"}
        </div>
      );
    },
  },
  {
    field: "customer_city",
    headerName: "Ville",
    width: 100,
  },
  {
    field: "customer_sexe",
    headerName: "Sexe",
    width: 100,
  },
  {
    field: "is_deleted_account",
    headerName: "Compte supprimé",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          {params.row.is_deleted_account ? (
            <span className="bg-red-100 w-fit text-color-red font-bold px-2 rounded-full">
              supprimé
            </span>
          ) : (
            <span className="bg-red-100 w-fit text-color-red font-bold px-2 rounded-full">
              non supprimé
            </span>
          )}
          {/* {params.row.is_activated_account && (
            <span className="bg-green-100 w-fit text-color-green font-bold px-2 rounded-full">
              Active
            </span>
          )}
          {!params.row.is_deleted_account &&
            !params.row.is_activated_account && (
              <span className="bg-yellow-100 w-fit text-color-yellow font-bold px-2 rounded-full">
                Not Active
              </span>
            )} */}
        </div>
      );
    },
  },
];

export const driversColumns = [
  {
    field: "drivers",
    headerName: "Conducteurs",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.driver_profile_picture ? (
            <img
              className="cellImg"
              src={params.row.driver_profile_picture}
              alt="avatar"
            />
          ) : (
            <img
              className="cellImg"
              src="https://cdn1.iconfinder.com/data/icons/user-interface-1-glyph/32/ui_avatar_profil_user_circle-512.png"
              alt="avatar"
            />
          )}

          <span className="name">{params.row.driver_full_name}</span>
        </div>
      );
    },
  },

  {
    field: "driver_email",
    headerName: "Email",
    width: 200,
  },

  {
    field: "driver_date_naissance",
    headerName: "Age",
    width: 100,
    renderCell: (params) => {
      const testage = params.row.driver_date_naissance?.split("-");
      let age;
      if (testage) {
        age = parseInt(testage[2]);
      }
      const lastage = 2022 - age;

      return (
        <div>
          {" "}
          {params.row.driver_date_naissance ? <div>{lastage} ans</div> : "_"}
        </div>
      );
    },
  },
  {
    field: "driver_current_city",
    headerName: "Ville",
    width: 100,
  },
  {
    field: "driver_order_total_amount",
    headerName: "Montant total de commandes",
    width: 210,
  },
  {
    field: "driver_sexe",
    headerName: "Sexe",
    width: 100,
  },
  {
    field: "driver_succeded_delivery",
    headerName: "Livraison réussie",
    width: 130,
  },
  {
    field: "driver_succeded_trip",
    headerName: "Voyage réussie",
    width: 100,
  },
  {
    field: "is_driver",
    headerName: "Type de conducteur",
    width: 160,
    renderCell: (params) => {
      return (
        <div>
          {params.row.is_driver == 1 && (
            <span className="bg-red-100 w-fit text-color-red font-bold px-2 rounded-full">
              coursier
            </span>
          )}
          {params.row.is_driver == 2 && (
            <span className="bg-red-100 w-fit text-color-red font-bold px-2 rounded-full">
              chauffeur
            </span>
          )}
          {params.row.is_driver == 3 && (
            <span className="bg-red-100 w-fit text-color-red font-bold px-2 rounded-full">
              chauffeur & coursier
            </span>
          )}
        </div>
      );
    },
  },
  {
    field: "is_deleted_account",
    headerName: "compte supprimé",
    width: 130,
    renderCell: (params) => {
      return (
        <div>
          {params.row.is_deleted_account ? (
            <div>
              <IconButton color="success" aria-label="add an alarm">
                <CheckIcon></CheckIcon>{" "}
              </IconButton>
            </div>
          ) : (
            <div>-</div>
          )}
        </div>
      );
    },
  },
  {
    field: "is_blacklisted_account",
    headerName: "Compte bloquée",
    width: 130,
    renderCell: (params) => {
      return (
        <div>
          {params.row.is_blacklisted_account ? (
            <div>
              <IconButton color="success" aria-label="add an alarm">
                <CheckIcon></CheckIcon>{" "}
              </IconButton>
            </div>
          ) : (
            <div>-</div>
          )}
        </div>
      );
    },
  },
  {
    field: "is_activated_account",
    headerName: "Compte activé",
    width: 130,
    renderCell: (params) => {
      return (
        <div>
          {params.row.is_activated_account ? (
            <div>
              <IconButton color="success" aria-label="add an alarm">
                <CheckIcon></CheckIcon>{" "}
              </IconButton>
            </div>
          ) : (
            <div>-</div>
          )}
        </div>
      );
    },
  },
  {
    field: "driver_stars_mean",
    headerName: "Etoiles",
    width: 130,
    renderCell: (params) => {
      return (
        <div className="">
          <Rating
            name="read-only"
            value={params.row.driver_stars_mean}
            readOnly
            size="small"
            className="justify-end"
          />
        </div>
      );
    },
  },
];
export const ordersColumns = [
  {
    field: "order_city",
    headerName: "Ordre de la ville",
    width: 120,
  },
  {
    field: "order_type",
    headerName: "Type de commande",
    width: 105,
    renderCell: (params) => {
      return (
        <div>
          {params.row.order_type == 1 && <div>Voyage </div>}
          <span> {params.row.order_type == 2 && <div>Livraison</div>}</span>
        </div>
      );
    },
  },
  {
    field: "nbre_km_depart_destination",
    headerName: "Distance",
    width: 80,
  },
  {
    field: "order_moto_type",
    headerName: "Type de Moto",
    width: 100,
    renderCell: (params) => {
      return (
        <span
          className={`w-fit ${
            params.row.order_moto_type == "GoGreen"
              ? "bg-green-100 text-color-green"
              : ""
          }
          ${
            params.row.order_moto_type == "GoConfort"
              ? "bg-blue-100 text-color-blue"
              : ""
          }
          ${
            params.row.order_moto_type == "GoSmart"
              ? "bg-yellow-100 text-color-yellow"
              : ""
          }
           font-bold px-2 rounded-full`}
        >
          {" "}
          {params.row.order_moto_type}
        </span>
      );
    },
  },
  {
    field: "nbre_tentaives",
    headerName: "Nombre de tentatives",
    width: 160,
  },
  {
    field: "order_purchase_amount",
    headerName: "montant des achats",
    width: 160,
    renderCell: (params) => {
      return (
        <div>
          {params.row.order_purchase_amount}{" "}
          {params.row.order_purchase_amount && <span> DH</span>}
        </div>
      );
    },
  },
  {
    field: "is_canceled_by_customer",
    headerName: "annulé par le client",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          {params.row.is_canceled_by_customer ? (
            <div>
              <IconButton color="success" aria-label="add an alarm">
                <CheckIcon></CheckIcon>{" "}
              </IconButton>
            </div>
          ) : (
            <div>-</div>
          )}
        </div>
      );
    },
  },
  {
    field: "is_canceled_by_driver",
    headerName: "annulé par le conducteur",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          {params.row.is_canceled_by_driver ? (
            <div>
              <IconButton color="success" aria-label="add an alarm">
                <CheckIcon></CheckIcon>{" "}
              </IconButton>
            </div>
          ) : (
            <div>-</div>
          )}
        </div>
      );
    },
  },
  {
    field: "is_reported_by_customer",
    headerName: "rapporté par le client",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          {params.row.is_reported_by_customer ? (
            <div>
              <IconButton color="success" aria-label="add an alarm">
                <CheckIcon></CheckIcon>{" "}
              </IconButton>
            </div>
          ) : (
            <div>-</div>
          )}
        </div>
      );
    },
  },
  {
    field: "is_reported_by_driver",
    headerName: "rapporté par le conducteur",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          {params.row.is_reported_by_driver ? (
            <div>
              <IconButton color="success" aria-label="add an alarm">
                <CheckIcon></CheckIcon>{" "}
              </IconButton>
            </div>
          ) : (
            <div>-</div>
          )}
        </div>
      );
    },
  },
  {
    field: "is_planned",
    headerName: "prévu ",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          {params.row.is_planned ? (
            <div>
              <IconButton color="success" aria-label="add an alarm">
                <CheckIcon></CheckIcon>{" "}
              </IconButton>
            </div>
          ) : (
            <div>-</div>
          )}
        </div>
      );
    },
  },
];
export const configColumns = [
  {
    field: "label",
    headerName: "label",
    width: 120,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.label}`}>
          <div> {params.row.label}</div>
        </div>
      );
    },
  },

  {
    field: "value1",
    headerName: "Prix / Km",
    width: 150,
  },
  {
    field: "value2",
    headerName: "Prix / type",
    width: 150,
  },
  {
    field: "icon",
    headerName: "Icône",
    width: 150,
  },
  {
    field: "applicable_value",
    headerName: "Applicable value",
    width: 150,
  },
];
export const adminColumns = [
  // { field: "id", headerName: "ID", width: 100 },
  {
    field: "nom",
    headerName: "nom",
    width: 100,
  },

  {
    field: "prenom",
    headerName: "Prenom",
    width: 100,
  },

  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "musers",
    headerName: "Gérer les utilisateurs",
    width: 180,
    renderCell: (params) => {
      return (
        <div>
          <div> {params.row.musers ? "Vrai" : "false"}</div>
        </div>
      );
    },
  },

  {
    field: "mdrivers",
    headerName: "Gérer les chauffeurs",
    width: 180,
    renderCell: (params) => {
      return (
        <div>
          <div> {params.row.mdrivers ? "Vrai" : "false"}</div>
        </div>
      );
    },
  },
  {
    field: "mprices",
    headerName: "Gérer les prix",
    width: 180,
  },
  {
    field: "morders",
    headerName: "Gérer les commandes",
    width: 180,
  },
  {
    field: "mblock",
    headerName: "Gérer la liste de blocage",
    width: 180,
  },
];

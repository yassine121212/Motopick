import { createContext, useState, useContext, useEffect } from "react";

import { MotoContext } from "./MotoContext";

export const ChartContext = createContext();

export const ChartProvider = ({ children }) => {
  const { allUsers, allOrders, allDrivers } = useContext(MotoContext);
  const [datadeliverie, setdatadeliverie] = useState(null);
  const [datatrips, setdatatrips] = useState(null);

  const [deliveriefemale, setdeliveriefemale] = useState(null);
  const [deliveriemale, setdeliveriemale] = useState(null);
  const [tripsfemale, settripsfemale] = useState(null);
  const [tripsmale, settripsmale] = useState(null);
  const [sumDelivriesCa, setsumDelivriesCa] = useState({});
  const [sumTripsCa, setsumTripsCa] = useState({});
  const [sumDelivriesage, setsumDelivriesage] = useState({});
  const [sumTripsage, setsumTripsage] = useState({});
  const [deliverieage1, setdeliverieage1] = useState(null);
  const [deliverieage2, setdeliverieage2] = useState(null);
  const [deliverieage3, setdeliverieage3] = useState(null);
  const [tripsagelenght1, settripsagelenght1] = useState(null);
  const [tripsagelenght2, settripsagelenght2] = useState(null);
  const [tripsagelenght3, settripsagelenght3] = useState(null);
  const [ordersType, setordersType] = useState();
  const [catypemoto, setcatypemoto] = useState();
  const [order_type_chauff, setorder_type_chauff] = useState();
  const [ca_order_type_chauff, setca_order_type_chauff] = useState();
  const [NovD, setNovD] = useState(null);
  const [NovT, setNovT] = useState(null);
  const [nomvilleDeliveries, setnomvilleDeliveries] = useState(null);
  const [nomvilleTrips, setnomvilleTrips] = useState(null);
  const [citiesDel, setcitiesDel] = useState(null);
  const [citiesTri, setcitiesTri] = useState(null);
  const [dodo, setdodo] = useState(null);

  let Dvilles = [];
  let Tvilles = [];
  let ca_green = 0;
  let ca_smart = 0;
  let listfe = [];
  let listma = [];
  let listfeTrips = [];
  let listmaTrips = [];

  let CaDefe = 0;
  let CaDema = 0;
  let CaTrfe = 0;
  let CaTrma = 0;
  let CaD1 = 0;
  let CaD2 = 0;
  let CaD3 = 0;
  let CaTr1 = 0;
  let CaTr2 = 0;
  let CaTr3 = 0;
  let listage1 = [];
  let tripsage1 = [];
  let listage2 = [];
  let tripsage2 = [];
  let listage3 = [];
  let tripsage3 = [];
  let ca_comfort = 0;
  let chauff1 = 0;
  let chauff2 = 0;
  let chauff3 = 0;
  let ca_chauff1 = 0;
  let ca_chauff2 = 0;
  let ca_chauff3 = 0;
  let uniquevileD = [];
  let uniquevileT = [];

  let novD = [];
  let novT = [];
  useEffect(() => {
    setdatadeliverie(allOrders.filter((order) => order.order_type == 1));
    setdatatrips(allOrders.filter((order) => order.order_type == 2));

    setordersType({
      gogreen: allOrders.filter((order) => order.order_moto_type === "go green")
        .length,

      gosmart: allOrders.filter((order) => order.order_moto_type === "go smart")
        .length,

      gocomfort: allOrders.filter(
        (order) => order.order_moto_type === "go comfort"
      ).length,
    });
    allOrders.map((order) => {
      if (order.order_moto_type === "go green")
        ca_green = ca_green + order.order_purchase_amount;
      if (order.order_moto_type === "go smart")
        ca_smart = ca_smart + order.order_purchase_amount;
      if (order.order_moto_type === "go comfort")
        ca_comfort = ca_comfort + order.order_purchase_amount;
    });
    setcatypemoto({ ca_green, ca_smart, ca_comfort });

    datadeliverie?.map((order) => {
      Dvilles.push(order.order_city);
      uniquevileD = [...new Set(Dvilles)];
    });
    datatrips?.map((order) => {
      Tvilles.push(order.order_city);
      uniquevileT = [...new Set(Tvilles)];
    });
  }, [allOrders]);

  const noville = () => {
    for (let index = 0; index < uniquevileD?.length; index++) {
      novD.push(
        datadeliverie?.filter((order) => order.order_city == uniquevileD[index])
          .length
      );
    }
    for (let index = 0; index < uniquevileT?.length; index++) {
      novT.push(
        datatrips?.filter((order) => order.order_city == uniquevileT[index])
          .length
      );
    }
  };

  useEffect(() => {
    noville();
    setNovD(novD);
    setNovT(novT);
    setnomvilleDeliveries(uniquevileD);
    setnomvilleTrips(uniquevileT);
  }, [allOrders]);
  useEffect(() => {
    // for (let index = 0; index < uniqueArr?.length; index++) {

    // nov.push(allOrders.filter((order)=> order.order_city == uniqueArr[index]).lenght)
    // console.log(allOrders.filter((order)=> order.order_city == 'casablanca'))

    datadeliverie?.map((order) =>
      allUsers.map((user) => {
        if (user.id === order.customer_uid && user.customer_sexe === "female") {
          listfe.push(user);
          CaDefe = order.order_purchase_amount + CaDefe;
        }
        if (user.id === order.customer_uid && user.customer_sexe === "male") {
          listma.push(user);
          CaDema = order.order_purchase_amount + CaDema;
        }

        //   const testage = user.customer_date_naissance?.split("-");

        // if (user.id === order.customer_uid  && 1992< testage[2] &&   testage[2]<=2002 )
        //  { listage1.push(user);
        //   CaD1 = order.order_purchase_amount + CaD1;}

        // if (user.id === order.customer_uid  &&  1982< testage[2] &&   testage[2]<=1992 )
        // {listage2.push(user);
        // CaD2 = order.order_purchase_amount + CaD2;}

        // if (user.id === order.customer_uid  &&   testage[2]<=1982 )
        // {CaD3= order.order_purchase_amount + CaD3;

        //   listage3.push(user);}
      })
    );
    datadeliverie?.map((order) =>
      allUsers.map((user) => {
        const testage = user.customer_date_naissance?.split("-");

        if (
          user.id === order.customer_uid &&
          1992 < testage[2] &&
          testage[2] <= 2002
        ) {
          listage1.push(user);
          CaD1 = order.order_purchase_amount + CaD1;
        }

        if (
          user.id === order.customer_uid &&
          1982 < testage[2] &&
          testage[2] <= 1992
        ) {
          listage2.push(user);
          CaD2 = order.order_purchase_amount + CaD2;
        }

        if (user.id === order.customer_uid && testage[2] <= 1982) {
          CaD3 = order.order_purchase_amount + CaD3;

          listage3.push(user);
        }
      })
    );
    datatrips?.map((order) =>
      allUsers.map((user) => {
        const testage = user.customer_date_naissance?.split("-");

        if (
          user.id === order.customer_uid &&
          1992 < testage[2] &&
          testage[2] <= 2002
        ) {
          CaTr1 = order.order_purchase_amount + CaTr1;

          tripsage1.push(user);
        }
        if (
          user.id === order.customer_uid &&
          1982 < testage[2] &&
          testage[2] <= 1992
        ) {
          CaTr2 = order.order_purchase_amount + CaTr2;

          tripsage2.push(user);
        }
        if (user.id === order.customer_uid && testage[2] <= 1982) {
          CaTr3 = order.order_purchase_amount + CaTr3;

          tripsage3.push(user);
        }
      })
    );
    datatrips?.map((order) =>
      allUsers.map((user) => {
        if (user.id === order.customer_uid && user.customer_sexe === "female") {
          listfeTrips.push(user);
          CaTrfe = order.order_purchase_amount + CaTrfe;
        }
        if (user.id === order.customer_uid && user.customer_sexe === "male") {
          listmaTrips.push(user);
          CaTrma = order.order_purchase_amount + CaTrma;
        }
      })
    );
    setsumDelivriesCa({ female: CaDefe, male: CaDema });
    setsumDelivriesage({ age1: CaD1, age2: CaD2, age3: CaD3 });
    setsumTripsCa({ female: CaTrfe, male: CaTrma });
    setsumTripsage({ age1: CaTr1, age2: CaTr2, age3: CaTr3 });
    setdeliveriefemale(listfe.length);
    setdeliveriemale(listma.length);
    settripsfemale(listfeTrips.length);
    settripsmale(listmaTrips.length);
    setdeliverieage1(listage1.length);
    setdeliverieage2(listage2.length);
    setdeliverieage3(listage3.length);
    settripsagelenght1(tripsage1.length);
    settripsagelenght2(tripsage2.length);
    settripsagelenght3(tripsage3.length);
  }, [allOrders, datadeliverie]);
  useEffect(() => {
    allOrders?.map((order) =>
      allDrivers.map((driver) => {
        if (driver.id === order.driver_uid && driver.is_driver === 1) {
          chauff1 = chauff1 + 1;
          ca_chauff1 = order.order_purchase_amount + ca_chauff1;
        }
        if (driver.id === order.driver_uid && driver.is_driver === 2) {
          chauff2 = chauff2 + 1;
          ca_chauff2 = order.order_purchase_amount + ca_chauff2;
        }
        if (driver.id === order.driver_uid && driver.is_driver === 3) {
          chauff3 = chauff3 + 1;
          ca_chauff3 = order.order_purchase_amount + ca_chauff3;
        }
      })
    );

    setorder_type_chauff({ chauff1, chauff2, chauff3 });
    setca_order_type_chauff({ ca_chauff1, ca_chauff2, ca_chauff3 });
  }, [allOrders, allDrivers]);
  let villesDeliv = [];
  let villesTrips = [];
  let villes_ca = [];
  useEffect(() => {
    allOrders?.map((order) => {
      villes_ca.push({
        city: order.order_city,
        price: order.order_purchase_amount,
      });
    });
    datadeliverie?.map((order) => {
      villesDeliv.push(order.order_city);
    });
    datatrips?.map((order) => {
      villesTrips.push(order.order_city);
    });
  }, [allOrders]);
  let cityMapDel = {};
  let cityMapTri = {};
  let vil_ca = [];
  let price_sum = [];

  useEffect(() => {
    villesDeliv.forEach((city) => {
      cityMapDel[city] = cityMapDel[city] ? cityMapDel[city] + 1 : 1;
    });
    villesTrips.forEach((city) => {
      cityMapTri[city] = cityMapTri[city] ? cityMapTri[city] + 1 : 1;
    });
    villes_ca.forEach((city, index) => {
      let obj = villes_ca.filter((x) => city.city === x.city);

      let summt = 0;
      obj.map((price) => {
        summt += price?.price;
      });
      if (city && summt) vil_ca[index] = { city: city.city, total: summt };
    });
    setdodo(
      vil_ca.filter(
        (thing, index, self) =>
          index ===
          self.findIndex(
            (t) => t?.city === thing?.city && t?.price === thing?.price
          )
      )
    );
    // villes_ca.forEach((city) => {
    //   vil_ca[city] = vil_ca[city]?.city
    //     ? vil_ca[city]?.price + vil_ca[city]?.price
    //     : vil_ca[city]?.price;
    // });
    // const count = villesDeliv.reduce((acc, item, arr) => {
    //   const count = acc[item] ? acc[item] + 1 : 1;
    //   return { ...acc, [item]: count };
    // }, {});

    // let fcities = ["casablanca", "rabat", "meknes", "tanger", "fes"];
    // let fffcities = [];
    // Object.values(cityMapDel).map((city) => {
    //   if (fcities.find((citye) => citye === "casablanca")) fffcities.push(city);
    // });

    setcitiesDel(cityMapDel);
    setcitiesTri(cityMapTri);
    
  }, [allOrders]);
  return (
    <ChartContext.Provider
      value={{
        deliveriefemale,
        deliveriemale,
        tripsfemale,
        tripsmale,
        sumDelivriesCa,
        sumTripsCa,
        deliverieage1,
        deliverieage2,
        deliverieage3,
        tripsagelenght1,
        tripsagelenght2,
        tripsagelenght3,
        ordersType,
        catypemoto,
        order_type_chauff,
        ca_order_type_chauff,
        sumTripsage,
        sumDelivriesage,
        NovT,
        NovD,
        nomvilleTrips,
        nomvilleDeliveries,
        citiesDel,
        citiesTri,
        dodo,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};

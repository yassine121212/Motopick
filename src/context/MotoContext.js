import { createContext, useState, useEffect } from "react";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, getDownloadURL, listAll } from "firebase/storage";

export const MotoContext = createContext();

export const MotoProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [userf, setuserf] = useState();
  const [allUsers, setAllUsers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [allDrivers, setAllDrivers] = useState([]);
  const [alladmins, setalladmins] = useState([]);
  const [DriversLenght, setDriversLenght] = useState(null);
  const [UsersLenght, setUsersLenght] = useState(null);
  const [AdminsLenght, setAdminsLenght] = useState(null);
  const [OrdersLenght, setOrdersLenght] = useState(null);
  const [OrdersSum, setOrdersSum] = useState(null);

  const [genderf, setgenderf] = useState(null);

  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "user-images/");
  let list = [];

  useEffect(() => {
    //
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        //  let listusers = list.filter((item) => item.type != "driver");

        setAllUsers(list);
      },
      (error) => {
        console.log(error);
      }
    );
   
    const unsub1 = onSnapshot(
      collection(db, "drivers"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });

        setAllDrivers(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
      unsub1();

    };

    // };

    // getAllUsers();
  }, [user]);
  useEffect(() => {
    const getalladmins = async () => {
      const querySnapshot = await getDocs(collection(db, "Admins"));

      setalladmins(
        querySnapshot.docs.map((doc) => {
          return {
            data: {
              ...doc.data(),
            },
          };
        })
      );
    };
    getalladmins();
  }, [user]);

  let listor = [];

  useEffect(() => {
    // allUsers.map(async (elem) => {
    const unsub = onSnapshot(
      collection(db, "orders"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setAllOrders(list);

        // console.log(allOrders)
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, [userf]);

  useEffect(() => {
    const admin = alladmins.filter((items) => items.data.email == user?.email);
    const { madmin, musers, mdrivers, morders, mblock, mprices, nom, prenom } =
      admin[0]?.data || "email";
    setuserf({
      musers,
      mdrivers,
      morders,
      mblock,
      madmin,
      mprices,
      nom,
      prenom,
    });
  }, [alladmins]);
  useEffect(() => {
    setUsersLenght(allUsers.length);
    setAdminsLenght(alladmins.length);
    setOrdersLenght(allOrders.length);
    let element = 0;
    for (let index = 0; index < allOrders.length; index++) {
      element = allOrders[index].order_purchase_amount + element;
    }
    setOrdersSum(element);
  }, [allUsers, alladmins, allOrders]);

  useEffect(() => {
    setDriversLenght(allDrivers.length);
  }, [allDrivers]);
  return (
    <MotoContext.Provider
      value={{
        allUsers,
        allDrivers,
        allOrders,
        UsersLenght,
        AdminsLenght,
        DriversLenght,
        OrdersLenght,
        OrdersSum,
        imageUrls,
        userf,
      }}
    >
      {children}
    </MotoContext.Provider>
  );
};

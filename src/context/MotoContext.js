import {
  createContext,
  useState,
  useEffect,
} from "react";
 import {
  collection,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { db,storage } from "../firebase";
import {
  ref,
  getDownloadURL,
  listAll,
} from "firebase/storage";
 
export const MotoContext = createContext();

export const MotoProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) ||
      null
  );
  const [userf,setuserf]=useState();
  const [allUsers, setAllUsers] = useState([]);
  const [alladmins, setalladmins] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const imagesListRef = ref(
    storage,
    "user-images/"
  );

   useEffect(() => {
    const getAllUsers = async () => {
      const querySnapshot = await getDocs(
        collection(db, "AdminPanelUsers")
      );

      setAllUsers(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: {
              ...doc.data(),
            },
          };
        })
      );
    };
    getAllUsers();
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, [user]);
   useEffect(() => {
    const getalladmins = async () => {
      const querySnapshot = await getDocs(
        collection(db, "Admins")
      );

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
  useEffect(()=>{
    const admin= alladmins.filter((items)=>(
      items.data.email==user.email))
    setuserf(admin)
    console.log(admin)
  }
  ,[alladmins])
  return (
    <MotoContext.Provider
      value={{
        allUsers,
        imageUrls,
        userf
      }}
    >
      {children}
    </MotoContext.Provider>
  );
};

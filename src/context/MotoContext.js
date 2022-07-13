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
  const [allUsers, setAllUsers] = useState([]);
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
 

  return (
    <MotoContext.Provider
      value={{
        allUsers,
        imageUrls,
      }}
    >
      {children}
    </MotoContext.Provider>
  );
};

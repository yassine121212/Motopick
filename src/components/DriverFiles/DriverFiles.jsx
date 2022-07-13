import {
  collection,
  getDocs,
} from "firebase/firestore";
import React, {
  useContext,
  useState,
  useEffect,
} from "react";
import { MotoContext } from "../../context/MotoContext";
import { db } from "../../firebase";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
 import { HiOutlineDownload } from "react-icons/hi";

import "./DriverFiles.scss";

const DriverFiles = ({ id }) => {
  const { allUsers } = useContext(MotoContext);
  const [driver, setdriver] = useState(null);
  const [files, setfiles] = useState();
  const [selectedimg, setselectedimg] =
    useState(null);

  console.log(allUsers);
  useEffect(() => {
    setdriver(
      allUsers.filter((item) => id == item.id)
    );
  }, [id]);
  useEffect(() => {
    const fetchFiles = async () => {
      const filesDriver = collection(
        db,
        `AdminPanelUsers/${id}/docs`
      );
      const filesder = await getDocs(filesDriver);
      const workInfo = filesder.docs.map(
        (doc) => ({
          ...doc.data(),
          id: doc.id,
        })
      );
      setfiles(workInfo);
    };
    fetchFiles();
  }, [id]);
  useEffect(() => {
    if (files?.length > 0)
      setselectedimg(files[0]);
  }, [files]);

  console.log(driver);
  console.log(files);
  return (
    <div className="files">
      <h1 className="title">Documents</h1>
      <div className="imgprin">
        <a href={selectedimg?.photoUrl} download>
          <div  style={{ "position":"relative" }}>
            <img
              src={selectedimg?.photoUrl}
              className="forimgprin"
              alt=""
            />
          <div className="icondow">
          
            <HiOutlineDownload className="pericon" size={60} />
          </div>
          </div>
        </a>
      </div>
      <div className="imagesslu">
        <GrFormPrevious
          className="previous butthover"
          onClick={() =>
            setselectedimg(
              files[
                files.indexOf(selectedimg) - 1
              ]
            )
          }
        />

        {files?.map((img, index) => (
          <div className="otherimg">
            <img
              src={img?.photoUrl}
              style={{
                border:
                  selectedimg === img
                    ? "2px solid #3ab39b"
                    : "",
              }}
              className="forotherimg"
              alt=""
              key={index}
              onClick={() => setselectedimg(img)}
            />
          </div>
        ))}

        <GrFormNext
          className="next butthover"
          onClick={() =>
            setselectedimg(
              files[
                files.indexOf(selectedimg) + 1
              ]
            )
          }
        />
      </div>
    </div>
  );
};

export default DriverFiles;

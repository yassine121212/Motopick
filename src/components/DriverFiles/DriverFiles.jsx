import { collection, getDocs } from "firebase/firestore";
import React, { useContext, useState, useRef, useEffect } from "react";
import { MotoContext } from "../../context/MotoContext";
import { db } from "../../firebase";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { HiOutlineDownload } from "react-icons/hi";
import Carousel from "react-elastic-carousel";

import "./DriverFiles.scss";
import MotoDriver from "../MotoDriver";

const DriverFiles = ({ datauser }) => {
  const [selectedimg, setselectedimg] = useState();
  console.log("😵");

  console.log(datauser);
  const Images = [
    datauser?.driver_anthropometrique,
    datauser?.driver_driving_licence_picture,
    datauser?.driver_identity_card_picture,
  ];
  useEffect(() => {
    setselectedimg(Images[0]);
  }, [datauser]);
  console.log("😆");
  console.log(Images);
  useEffect(() => {
    if (selectedimg == undefined) {
      setselectedimg(Images[0]);
    }
  }, [selectedimg]);

  return (
    <div className="files">
      <h1 className="title">Details</h1>
      <div className="flex flex-wrap justify-center justify-items-center gap-[0.5cm] w-full relative">
        <div className="">
          <Carousel
            className="shadow-lg "
            style={{
              height: "max-content",
              width: "14.5cm",
            }}
            itemsToShow={1}
          >
            {datauser?.driver_motocylces.map((moto) => (
              <MotoDriver moto={moto} />
            ))}
          </Carousel>
        </div>

        <div className="shadow-2xl p-5">
          <div className="imgprin">
            <a href={datauser?.driver_driving_licence_picture} download>
              <div style={{ position: "relative" }}>
                <img
                  src={selectedimg}
                  className="forimgprin sm:h-30 sm:w-30"
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
                setselectedimg(Images[Images.indexOf(selectedimg) - 1])
              }
            />

            {Images?.map((img, index) => (
              <div className="otherimg ">
                <img
                  src={img}
                  style={{
                    border: selectedimg === img ? "2px solid #3ab39b" : "",
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
                setselectedimg(Images[Images.indexOf(selectedimg) + 1])
              }
            />
          </div>
        </div>
        <div className="max-h-[4cm] shadow-2xl translate-x-[-7.2cm] translate-y-[7cm] p-8	flex-col flex absolute gap-2 py-2 ">
          <div className=" flex gap-5 justify-center">
            <div className="bg-gray-200 font-bold text-sm text-gray-700 px-1 max-h-5	rounded-full max-w-max">
              Driver Liscence Number :{" "}
              <span className="text-gray-500">122022</span>
            </div>
            <div className="bg-gray-200 font-bold text-sm text-gray-700 px-1  max-h-5	rounded-full max-w-max">
              Liscence Driving Expiration Date :{" "}
              <span className="text-gray-500">12-15-2022</span>
            </div>
          </div>
          <div className="flex gap-5 justify-center">
            <div className="bg-gray-200 font-bold text-sm text-gray-700 px-1 max-h-5	rounded-full max-w-max">
              Driver Card Identity Number :{" "}
              <span className="text-gray-500">122022</span>
            </div>
            <div className="bg-gray-200 font-bold text-sm text-gray-700 px-1  max-h-5	rounded-full max-w-max">
              Identity Card Expiration Date :{" "}
              <span className="text-gray-500">12-15-2022</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverFiles;

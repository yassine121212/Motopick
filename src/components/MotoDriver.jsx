import React from 'react';
 const MotoDriver = ({ moto }) => {
   return (
     <div className="flex flex-1 gap-4  max-w-max">
       <div className="">
         <img
           src={moto?.motocycle_picture}
           className="h-[5cm] w-[5cm] rounded-[0.3cm] bg-cover bg-center relative"
           alt=""
         />
       </div>
       <div className="flex flex-col">
         <div className=" flex flex-wrap gap-1 mt-2">
           <span className="px-2 bg-gray-200 rounded-full font-bold text-sm max-w-max">
             Motocycle type:{" "}
           </span>
           <span className="ml-2 px-2 bg-green-200 rounded-full font-bold text-sm ">
             {moto?.motocycle_type ? moto.motocycle_type : "Inconnu"}
           </span>
         </div>
         <div className="flex flex-wrap gap-1 mt-2">
           <span className="px-2 bg-gray-200 rounded-full font-bold text-sm max-w-max">
             Motocycle brand:{" "}
           </span>
           <span className="ml-2 px-2 bg-blue-200 rounded-full font-bold text-sm ">
             {moto?.motocycle_brand ? moto.motocycle_brand : "Inconnu"}
           </span>
         </div>

         <div className="flex flex-wrap gap-1 mt-2">
           <span className="px-2 bg-gray-200 rounded-full font-bold text-sm max-w-max">
             Motocycle model:{" "}
           </span>
           <span className="ml-2 px-2 bg-pink-200 rounded-full font-bold text-sm ">
             {moto?.motocycle_model ? moto.motocycle_model : "Inconnu"}
           </span>
         </div>
         <div className="flex flex-wrap gap-1 mt-2">
           <span className="px-2 bg-gray-200 rounded-full font-bold text-sm max-w-max">
             Motocycle imm:{" "}
           </span>
           <span className="ml-2 px-2 bg-yellow-200 rounded-full font-bold text-sm">
             {moto?.motocycle_imm ? moto.motocycle_imm : "Inconnu"}
           </span>
         </div>
       </div>
     </div>
   );
 };

export default MotoDriver;
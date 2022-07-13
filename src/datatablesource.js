
function getAge(dateString) 
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}


export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.photoUrl} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  
  {
    field:"Age",
    headerName: "Age",
    width: 100,
    renderCell: (params) => {
      return (
        <div>
         {params.row.Age}  years
        </div>
      );
    },
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 100,
    // renderCell: (params) => {
    //   return (
    //     <div className={`cellWithStatus ${params.row.male ? "true" :"false"}`}>
    //       {params.row.male==null
    //        ? (<div>_</div>)
    //         :(
    //           <>
    //           <div> {params.row.gender}</div>

    //           </>
    //         )
    //       }
           
    //     </div>
    //   );
    // },
  },
];

export const ordersColumns = [
  { field: "uid", headerName: "ID", width: 70 },
  {
    field: "status",
    headerName: "status",
    width: 230,
  },
  
  {
    field: "from",
    headerName: "from",
    width: 230,
  },
  
  {
    field:"distance",
    headerName: "distance",
    width: 100,
           
          
  
  },
  {
    field: "price",
    headerName: "price",
    width: 100,
  },
 
];
export const adminColumns = [
  { field: "id", headerName: "ID", width: 100 },
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
    field:"email",
    headerName: "Email",
    width: 200,
           
          
  
  },
  {
    field: "musers",
    headerName: "Mange users",
    width: 120,
  },
  
  {
    field: "mdrivers",
    headerName: "Mange drivers",
    width: 120,
  },
  {
    field: "mprices",
    headerName: "Mange prices",
    width: 120,
  },
];


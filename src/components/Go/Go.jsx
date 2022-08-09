import ReactApexChart from "react-apexcharts";
import ReactDOM from "react-dom";
import ApexChart from "apexcharts";
import React from "react";
import { ChartContext } from "../../context/chart.js";

import { useContext } from "react";
export default function Tripsdelivroes() {
  const {
    ordersType,
    catypemoto,
    order_type_chauff,
    ca_order_type_chauff,
    NovT,
    NovD,
    nomvilleTrips,
    nomvilleDeliveries,
    citiesDel,
    citiesTri,
    dodo,
  } = useContext(ChartContext);
  return (
    <div className="App">
      <Go
        ordersType={ordersType}
        catypemoto={catypemoto}
        order_type_chauff={order_type_chauff}
        ca_order_type_chauff={ca_order_type_chauff}
        citiesDel={citiesDel}
        citiesTri={citiesTri}
        dodo={dodo}
      ></Go>
    </div>
  );
}
class Go extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [12, 11, 12],
      options: {
        chart: {
          type: "donut",
          height: 200,
        },
        labels: ["Go green", "Go smart", "Go comfort"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
    this.statechauff = {
      series: [12, 11, 12],
      options: {
        chart: {
          type: "donut",
          height: 200,
        },
        labels: ["coursier", "chauffeur", "chauffeur & coursier"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
    this.state1 = {
      series: [44, 55, 13, 43, 22],
      options: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["coursier", "chauffeur", "chauffeur & coursier"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
    this.state2 = {
      series: [44, 55, 13, 43, 22],
      options: {
        chart: {
          width: 380,
          type: "pie",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
    this.citiesDelo = {
      options: {
        chart: {
          width: 380,
          type: "pie",
        },

        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }

  render() {
    const commandes_type_moto = [
      this.props.ordersType?.gogreen,
      this.props.ordersType?.gosmart,
      this.props.ordersType?.gocomfort,
    ];
    const ca_type_moto = [
      this.props.catypemoto?.ca_green,
      this.props.catypemoto?.ca_smart,
      this.props.catypemoto?.ca_comfort,
    ];
    const or_type_chauf = [
      this.props.order_type_chauff?.chauff1,
      this.props.order_type_chauff?.chauff2,
      this.props.order_type_chauff?.chauff3,
    ];
    const caor_type_chauf = [
      this.props.ca_order_type_chauff?.ca_chauff1,
      this.props.ca_order_type_chauff?.ca_chauff2,
      this.props.ca_order_type_chauff?.ca_chauff3,
    ];
    const current_citiesDel = [this.props.citiesDel];
    const labels_citiesDel = [this.props.citiesDel];
    const current_citiestri = [this.props.citiesTri];
    const labels_citiestri = [this.props.citiesTri];
    const dodo_villes = [this.props.dodo];
  
    const dooodo = Object.values(dodo_villes[0] || {});
    let values_ca_villes = [];
    let values_villes = [];

    dooodo.map((doro) => {
      values_ca_villes.push(doro.total);
    });
    dooodo.map((doro) => {
      values_villes.push(doro.city);
    });
    const labbs = {
      options: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: Object.keys(labels_citiesDel[0] || {}),
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
    const labbstri = {
      options: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: Object.keys(labels_citiestri[0] || {}),
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
    const labbsvilles_ca = {
      options: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: values_villes,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
    return (
      <div>
        <div className="flex	shadow-2xl	mt-8">
          <div className=" mr-20 ml-14">
            <h1 className="flex justify-center mt-10 mr-20 ml-10">
              {" "}
              <strong> total des commandes par types des motos </strong>
            </h1>

            <ReactApexChart
              options={this.state.options}
              series={commandes_type_moto}
              type="donut"
              width={350}
            />
          </div>

          <div>
            <h1 className="flex justify-center mt-10 mr-40 ml-20 ">
              {" "}
              <strong> Total CA par type de motos </strong>
            </h1>

            <ReactApexChart
              options={this.state.options}
              series={ca_type_moto}
              type="donut"
              width={350}
            />
          </div>
        </div>
        <div className="flex shadow-2xl	mt-8">
          <div className=" mr-20 ml-14">
            <h1 className="flex justify-center mt-10 mr-20">
              {" "}
              <strong> Total des commandes par type de chauffeur </strong>
            </h1>

            <ReactApexChart
              options={this.statechauff.options}
              series={or_type_chauf}
              type="donut"
              width={400}
            />
          </div>
          <div>
            <h1 className="flex justify-center mt-10 mr-40 ml-20 ">
              {" "}
              <strong> Total CA par type de chauffeur </strong>
            </h1>

            <ReactApexChart
              options={this.state.options}
              series={caor_type_chauf}
              type="donut"
              width={350}
            />
          </div>
        </div>

        <div className=" flex shadow-2xl	mt-8">
          <div className="w-50	">
            <h1 className="flex justify-center mt-10 mr-40 ml-20 ">
              {" "}
              <strong>Total deliveries </strong>
            </h1>

            <ReactApexChart
              options={labbs.options}
              series={Object.values(current_citiesDel[0] || {})}
              type="pie"
              width={320}
            />
          </div>
          <div>
            <h1 className="flex justify-center mt-10 mr-40 ml-20 ">
              {" "}
              <strong>Total deliveries </strong>
            </h1>

            <ReactApexChart
              options={labbstri.options}
              series={Object.values(current_citiestri[0] || {})}
              type="pie"
              width={320}
            />
          </div>
          <div>
            <h1 className="flex justify-center mt-10 mr-20 ml-20 ">
              {" "}
              <strong>Total deliveries </strong>
            </h1>

            <ReactApexChart
              options={labbsvilles_ca.options}
              series={values_ca_villes}
              type="pie"
              width={320}
            />
          </div>
        </div>
      </div>
    );
  }
}

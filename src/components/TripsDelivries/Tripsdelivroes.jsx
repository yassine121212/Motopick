import { borderRadius, color } from "@mui/system";
import React, { PureComponent } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "./tripsdelivroes.scss";
import { ChartContext } from "../../context/chart.js";

import { useContext } from "react";
export default function Tripsdelivroes() {
  const {
    deliveriefemale,
    deliveriemale,
    tripsmale,
    tripsfemale,
    sumDelivriesCa,
    sumTripsCa,
    sumDelivriesage,
    sumTripsage,
    deliverieage1,
    deliverieage2,
    deliverieage3,
    tripsagelenght1,
    tripsagelenght2,
    tripsagelenght3,
  } = useContext(ChartContext);

  const data = [
    { name: "Group A", value: deliveriemale },
    { name: "Group B", value: deliveriefemale },
  ];
  const datatrips = [
    { name: "Group A", value: tripsmale },
    { name: "Group B", value: tripsfemale },
  ];
  const Cadeliv = [
    { name: "Group A", value: sumDelivriesCa.male },
    { name: "Group B", value: sumDelivriesCa.female },
  ];
  const Cadelivage = [
    { name: "Group A", value: sumDelivriesage.age1 },
    { name: "Group B", value: sumDelivriesage.age2 },
    { name: "Group C", value: sumDelivriesage.age3 },
  ];
  const Catrips = [
    { name: "Group A", value: sumTripsCa.male },
    { name: "Group B", value: sumTripsCa.female },
  ];
  const Catripsage = [
    { name: "Group A", value: sumTripsage.age1 },
    { name: "Group B", value: sumTripsage.age2 },
    { name: "Group C", value: sumTripsage.age3 },
  ];
  const data3 = [
    { name: "Group A", value: deliverieage1 },
    { name: "Group B", value: deliverieage2 },
    { name: "Group C", value: deliverieage3 },
  ];
  const data2 = [
    { name: "Group A", value: tripsagelenght1 },
    { name: "Group B", value: tripsagelenght2 },
    { name: "Group C", value: tripsagelenght3 },
  ];

  const COLORS = ["#0088FE", "#00C49F"];
  const COLORS3 = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="App">
      <Tripsdelivroes1
        hookValue={data}
        hookValue1={datatrips}
        hookValue4={Cadeliv}
        hookValue5={Catrips}
        hookValue2={COLORS}
        hookValue3={COLORS3}
        hookValue6={data2}
        hookValue7={Cadelivage}
        hookValue8={Catripsage}
        hookValue9={data3}

      ></Tripsdelivroes1>
    </div>
  );
}
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {/* {`${(percent * 100).toFixed(0)}%`} */}
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class Tripsdelivroes1 extends PureComponent {
  render() {
    const data = this.props.hookValue;
    const datatrips = this.props.hookValue1;
    const data3 = this.props.hookValue9;
    const Cadeliv = this.props.hookValue4;
    const Catrips = this.props.hookValue5;
    const Cadelivage = this.props.hookValue7;
    const Catripsage = this.props.hookValue8;

    const COLORS = this.props.hookValue2;
    const COLORS3 = this.props.hookValue3;
    const data2 = this.props.hookValue6;
    return (
      <div className="flex  ">
        <div class="container shadow-2xl ">
          <h1 className="flex justify-center mt-5">
            Total des commandes par : <strong> Genre</strong>
          </h1>
          <div className="flex    justify-center mt-5">
            Femmes{" "}
            <span
              className="w-5 mr-5 ml-1"
              style={{
                backgroundColor: "#00C49F",
                borderRadius: 10,
                color: "#3ab39b",
              }}
            ></span>
            Hommes{" "}
            <span
              className="w-5 ml-1"
              style={{
                backgroundColor: "#0088FE",
                borderRadius: 10,
                color: "#0088FE",
              }}
            ></span>
          </div>
          <div className="flex  ">
            <div>
              <h1 className="flex justify-center mt-10">
                <strong> Deliveries </strong>
              </h1>
              <PieChart width={250} height={200}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
            <div>
              <h1 className="flex justify-center mt-10">
                {" "}
                <strong> Trips </strong>
              </h1>
              <PieChart width={250} height={200}>
                <Pie
                  data={datatrips}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {datatrips.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>
          <div className="flex">
            <div>
              <h1 className="flex justify-center ">
                {" "}
                <strong> chiffre d'affaire Deliveries</strong>
              </h1>

              <PieChart width={250} height={200}>
                <Pie
                  data={Cadeliv}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {Cadeliv?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
            <div>
              <h1 className="flex justify-center ">
                {" "}
                <strong> chiffre d'affaire Trips </strong>
              </h1>

              <PieChart width={250} height={200}>
                <Pie
                  data={Catrips}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {Catrips.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>
        </div>

        <div class="container ml-2 shadow-2xl  ">
          <h1 className="flex justify-center mt-5">
            KPIS : <strong>Par l'Age</strong>
          </h1>
          <div className="flex justify-center mt-5">
            [20ans-30ans]{" "}
            <span
              className="w-5 mr-5 ml-1"
              style={{
                backgroundColor: "#0088FE",
                borderRadius: 10,
                color: "#3ab39b",
              }}
            ></span>
            [30ans-40ans]{" "}
            <span
              className="w-5  mr-5 ml-1"
              style={{
                backgroundColor: "#00C49F",
                borderRadius: 10,
                color: "#0088FE",
              }}
            ></span>
            [+ 40ans]{" "}
            <span
              className="w-5 ml-1"
              style={{
                backgroundColor: "#FFBB28",
                borderRadius: 10,
                color: "#0088FE",
              }}
            ></span>
          </div>{" "}
          <div className="  flex">
            <div>
              <h1 className="flex justify-center mt-10">
                <strong> Deliveries </strong>
              </h1>

              <PieChart width={250} height={200}>
                <Pie
                  data={data3}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data3.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS3[index % COLORS3.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
            <div>
              <h1 className="flex justify-center mt-10">
                <strong> Trips </strong>
              </h1>
              <PieChart width={250} height={200}>
                <Pie
                  data={data2}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data2.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS3[index % COLORS3.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>
          <div className="flex">
            <div>
              <h1 className="flex justify-center">
                <strong> Chiffre d'affaire Deliveries </strong>
              </h1>

              <PieChart width={250} height={200}>
                <Pie
                  data={Cadelivage}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {Cadelivage.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS3[index % COLORS3.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
            <div>
              <h1 className="flex justify-center">
                <strong> Chiffre d'affaire Trips </strong>
              </h1>

              <PieChart width={250} height={200}>
                <Pie
                  data={Catripsage}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {Catripsage.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS3[index % COLORS3.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

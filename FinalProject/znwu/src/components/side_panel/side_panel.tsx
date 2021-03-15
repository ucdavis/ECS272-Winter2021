import { Button, Dropdown, Menu, Select } from "antd";
import * as d3 from "d3";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { DataEntry } from "../../data";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { DonutChart } from "../donut_chart/donut_chart";
import { groupBy } from "../../utils/groupBy";
import "./side_panel.scss";
import { Typography, Space } from "antd";
import { ParCoord } from "../par_coord/par_coord";
import { icons } from "../../icons/icons";

const { Text, Link } = Typography;
const { Option } = Select;

// export const foodTypeColor = d3
//   .scaleOrdinal()
//   .domain([
//     "Alcohol",
//     "Animal",
//     "Vegetables",
//     "Fruits",
//     "Nuts",
//     "FishSeafood",
//     "Cereals",
//     "Milk",
//     "StarchyRoots",
//     "Sugar",
//     "Eggs",
//     "Oil",
//     "Others",
//   ])
//   .range(d3.schemeDark2);

export const foodTypeColor = (type: string) =>
  (({
    Alcohol: "#9900cc",
    Animal: "#f9906f",
    Vegetables: "#136d15",
    Fruits: "#8db600",
    Nuts: "#4b291d",
    FishSeafood: "#3333cc",
    Cereals: "#f5deb3",
    Milk: "#189cc4",
    StarchyRoots: "#907A70",
    Sugar: "#ff0800",
    Eggs: "#ffa631",
    Oil: "#dbcf5c",
    Others: "grey",
  } as any)[type] || "grey");

export const SidePanel = (props: {
  data: DataEntry[];
  onFactorChanged: (factor?: string) => void;
  factor?: string;
}) => {
  // const [category, setCategory] = useState<Category>("victim");

  // const [measure, setMeasure] = useState<Measure>("casualties");

  // const data = props.data;

  const chartData = useMemo(() => {
    const data = props.data[0];
    return {
      Alcohol: data.Alcohol,
      Animal: data.Animal,
      Vegetables: data.Vegetables,
      Fruits: data.Fruits,
      Nuts: data.Nuts,
      FishSeafood: data.FishSeafood,
      Cereals: data.Cereals,
      Milk: data.Milk,
      StarchyRoots: data.StarchyRoots,
      Sugar: data.Sugar,
      Eggs: data.Eggs,
      Oil: data.Oil,
      Others:
        1 -
        data.Alcohol -
        data.Animal -
        data.Vegetables -
        data.Fruits -
        data.Nuts -
        data.FishSeafood -
        data.Cereals -
        data.Milk -
        data.StarchyRoots -
        data.Sugar -
        data.Eggs -
        data.Oil,
    };
  }, [props.data]);

  const countryColor = d3
    .scaleOrdinal()
    .domain(props.data.map((datum) => datum.Country))
    .range(d3.schemeAccent);

  return (
    <div
      style={{
        // margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        // flexFlow: "row",
        width: "100%",
        // justifyContent: "center",
      }}
    >
      <div style={{ height: "50%", margin: 0 }}>
        <Text className="subtitle">
          Showing {props.data.map((datum) => datum.Country).join(", ")}
        </Text>
        {props.data.length == 1 ? (
          <div>
            Food composition (kg)
            {/* <table style={{ marginTop: "20px" }}>
          <tr>
          <td>Category: </td>
            <td>
            <Select
            defaultValue="victim"
            style={{ width: "100%" }}
            onChange={setCategory}
            size="small"
            >
            <Option value="victim">By Victim Type</Option>
            <Option value="attack">By Attack Type</Option>
            </Select>
            </td>
            </tr>
            <tr>
            <td>Measure: </td>
            <td>
            <Select
            defaultValue="casualties"
            style={{ width: "100%" }}
            onChange={setMeasure}
            size="small"
            >
            <Option value="casualties">By Casualties</Option>
            <Option value="cases">By Case Count</Option>
            </Select>
            </td>
            </tr>
          </table> */}
            <div style={{ flexGrow: 1 }}>
              <DonutChart data={chartData}></DonutChart>
            </div>
          </div>
        ) : (
          <div>
            Comparison
            <table style={{ marginTop: "20px" }}>
              {props.data.map((datum) => (
                <tr>
                  <td>
                    <div
                      style={{
                        height: "20px",
                        width: "20px",
                        marginRight: "10px",
                        backgroundColor: countryColor(datum.Country) as string,
                      }}
                    />
                  </td>
                  <td>{datum.Country} </td>
                </tr>
              ))}
            </table>
          </div>
        )}
      </div>
      <div style={{ height: "50%", marginTop: "auto" }}>
        <Text className="subtitle">Details</Text>
        <ParCoord
          data={props.data}
          onFactorChanged={props.onFactorChanged}
          factor={props.factor}
          countryColor={countryColor}
        />
      </div>
    </div>
  );
};

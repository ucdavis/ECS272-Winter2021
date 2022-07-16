import { Button, Dropdown, Menu, Select } from "antd";
import * as d3 from "d3";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { attackTypeCode, DataEntry } from "../../data";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { DonutChart } from "../donut_chart/donut_chart";
import { groupBy } from "../../utils/groupBy";
import "./side_panel.scss";
import { ParaCoord } from "../paracoord/paracoord";
import { Typography, Space } from "antd";

const { Text, Link } = Typography;
const { Option } = Select;

type Category = "victim" | "attack";
type Measure = "casualties" | "cases";

type VictimType =
  | "Goverment"
  | "Civillian"
  | "Military"
  | "Terrorist"
  | "Other";
type AttackType =
  | "Hijacking"
  | "Bombing/Explosion"
  | "Kidnapping"
  | "Barricade Incident"
  | "Assassination"
  | "Armed Assault"
  | "Unarmed Assualt"
  | "Facility/Infrastructure Attack"
  | "Unknown";

export const generalVictimType = (key: string) => {
  let code = parseInt(key) || 20;
  if ([1, 5, 6, 8, 9, 10, 11, 12, 14, 15, 16, 18, 19, 21].indexOf(code) !== -1)
    return "Civillian";
  if ([2, 3, 7].indexOf(code) !== -1) return "Goverment";
  if ([4].indexOf(code) !== -1) return "Military";
  if ([17, 22].indexOf(code) !== -1) return "Terrorist";
  if ([13, 20].indexOf(code) !== -1) return "Other";
  return "Other";
};

export const SidePanel = (props: { data: DataEntry[] }) => {
  const [category, setCategory] = useState<Category>("victim");

  const [measure, setMeasure] = useState<Measure>("casualties");

  const chartData = useMemo(() => {
    let groupedData: { [key: string]: DataEntry[] } = {};
    if (category === "attack") {
      groupedData = groupBy(
        props.data,
        "attacktype1",
        (key) => attackTypeCode[key] ?? "Unknown"
      );
    } else {
      groupedData = groupBy(props.data, "targtype1", generalVictimType);
    }

    if (measure === "cases") {
      return Object.fromEntries(
        Object.entries(groupedData).map((entry) => [entry[0], entry[1].length])
      );
    } else {
      return Object.fromEntries(
        Object.entries(groupedData).map((entry) => [
          entry[0],
          entry[1].reduce((acc, ev) => acc + ev.nkill + ev.nwound, 0),
        ])
      );
    }
  }, [props.data, category, measure]);

  console.log(props.data);

  return (
    <div>
      <Text className="subtitle">Terrorism Overview</Text>
      <div
        style={{
          // margin: "0 auto",
          display: "flex",
          flexDirection: "row",
          flexFlow: "row",
          width: "100%",
          justifyContent: "center",
        }}
      >
        
        <table style={{ marginTop: "20px" }}>
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
        </table>
        <div style={{ flexGrow: 1 }}>
          <DonutChart data={chartData}></DonutChart>
        </div>
      </div>
      <Text className="subtitle">Case Composition</Text>
      <ParaCoord data={props.data} />
    </div>
  );
};

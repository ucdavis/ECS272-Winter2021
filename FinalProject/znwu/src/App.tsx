import React, { useMemo, useState } from "react";
import BarChart from "./BarChart";
import "./App.css";
import WorldMap from "./components/worldmap/WorldMap";
import { Slider, InputNumber, Layout, Menu } from "antd";
import "antd/dist/antd.css";
import { Typography } from "antd";
import { data, DataEntry } from "./data";
import usePromise from "react-use-promise";
import { SidePanel } from "./components/side_panel/side_panel";
import { Overview } from "./components/overview/overview";

const { Title, Text } = Typography;

const { Header, Footer, Sider, Content } = Layout;

const minDate = new Date(1970, 0, 1);
const maxDate = new Date(2018, 0, 1);
const daySpan = Math.round(
  (maxDate.getTime() - minDate.getTime()) / (24 * 3600 * 1000)
);
const monthSpan = (2018 - 1970) * 12;

const dateConverter = (pos?: number) => new Date(1970, pos ?? 0, 1);
const tipFormatter = (pos?: number) =>
  dateConverter(pos).toLocaleDateString("en-US");

const App: React.FC = () => {
  return (
    <div className="App">
      <Overview />
    </div>
  );
};

export default App;

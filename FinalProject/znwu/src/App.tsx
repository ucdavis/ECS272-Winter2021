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
import "react-slideshow-image/dist/styles.css";
import { Fade } from "react-slideshow-image";

import img1 from "./images/DM-coronavirus.jpg";
import img2 from "./images/1fbefc837b2407dd6782f10f0cba0de6aa8f7246-1000x600.png";
import img3 from "./images/Global COVID-19 Cases Per Capita.webp";
import img4 from "./images/good-vs-bad-food-unhealthy-junk-iStock_000058524328_Medium.jpg";
import img5 from "./images/EUS9VAaWsAMug35.jpg";
import img6 from "./images/obesity-may-increase-risk-of-covid-19-complications-722x406.jpg";
import img7 from "./images/mark-fletcher-brown-nN5L5GXKFz8-unsplash.jpg"
import { icons } from "./icons/icons";

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
    <div className="slide-container App">
      <link
        rel="stylesheet"
        type="text/css"
        href="//fonts.googleapis.com/css?family=Raleway"
      />
      <Fade autoplay={false}>
        <div className="each-fade">
          <h2>Covid and Healthy Diet</h2>
        </div>
        <div className="each-fade">
          <h2>Covid Situations</h2>
          <div className="info">
            <table>
              <tbody>
                <tr>
                  <td>
                    <img src={img1}></img>
                  </td>
                  <td>
                    <img src={img2}></img>
                  </td>
                  <td>
                    <img src={img3}></img>
                  </td>
                </tr>
                <tr>
                  <td>Covid strikes</td>
                  <td>Protection, Distancing</td>
                  <td>Global Pandemic</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="each-fade">
          <h2>Covid and Diet</h2>
          <div className="info">
            <table>
              <tbody>
                <tr>
                  <td>
                    <img src={img4}></img>
                  </td>
                  <td>
                    <img src={img5}></img>
                  </td>
                  <td>
                    <img src={img6}></img>
                  </td>
                </tr>
                <tr>
                  <td>Covid Susceptibility and Diet Habit</td>
                  <td>Alcohol Intake</td>
                  <td>Obesity</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="each-fade">
          <h2>Food Category</h2>
          <div className="foodtype">
            <table>
              <tbody>
                <tr>
                  <td>
                    <img src={icons.Cereals}></img>
                  </td>
                  <td>
                    <img src={icons.Vegetables}></img>
                  </td>
                  <td>
                    <img src={icons.Fruits}></img>
                  </td>
                  <td>
                    <img src={icons.Milk}></img>
                  </td>
                  <td>
                    <img src={icons.Eggs}></img>
                  </td>
                  <td>
                    <img src={icons.StarchyRoots}></img>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Cereals</h4>
                  </td>
                  <td>
                    <h4>Vegetables</h4>
                  </td>
                  <td>
                    <h4>Fruits</h4>
                  </td>
                  <td>
                    <h4>Milk</h4>
                  </td>
                  <td>
                    <h4>Eggs</h4>
                  </td>
                  <td>
                    <h4>Starchy Roots</h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={icons.Animal}></img>
                  </td>
                  <td>
                    <img src={icons.FishSeafood}></img>
                  </td>
                  <td>
                    <img src={icons.Sugar}></img>
                  </td>
                  <td>
                    <img src={icons.Alcohol}></img>
                  </td>
                  <td>
                    <img src={icons.Oil}></img>
                  </td>
                  <td>
                    <img src={icons.Nuts}></img>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Meat &amp; Animal Products</h4>
                  </td>
                  <td>
                    <h4>Fish &amp; Seafood</h4>
                  </td>
                  <td>
                    <h4>Sugar</h4>
                  </td>
                  <td>
                    <h4>Alcohol Beverages</h4>
                  </td>
                  <td>
                    <h4>Oil</h4>
                  </td>
                  <td>
                    <h4>Nuts</h4>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="each-fade">
          <Overview />
        </div>
        <div className="each-fade">
          <h2>Conclusion</h2>
          <div className="info">
            <table>
              <tbody>
                <tr>
                  <td>
                    <img src={img4}></img>
                  </td>
                  <td>
                    <img src={img7}></img>
                  </td>
                </tr>
                <tr>
                  <td>Diets do affect COVID susceptibility...</td>
                  <td>Feel free to explore new trends...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default App;

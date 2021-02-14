import React, { useState, useEffect } from "react";
import { csv } from "d3";
import { LinearProgress, IconButton } from "@material-ui/core";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import { makeStyles } from "@material-ui/core/styles";
import "./css/App.css";

import Drawer from "./components/Drawer";

import FocusPage from "./components/FocusPage";
import OverviewPage from "./components/OverviewPage";

const rawDataName = "Film_Locations_in_San_Francisco.csv";

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  title: {
    position: "fixed",
    width: "100%",
    height: "50px",
    backgroundColor: "#5D10A8",
    color: "white",
    paddingLeft: "10px",
    paddingTop: "5px",
    fontWeight: "lighter",
    fontFamily: "Roboto",
    zIndex: 10,
  },
  titleDummy: {
    width: "100%",
    height: "50px",
    backgroundColor: "white",
    color: "white",
    paddingLeft: "10px",
    paddingTop: "5px",
    zIndex: -1,
  },
  progress: {
    position: "fixed",
    top: "50px",
    width: "100%",
    zIndex: 11,
  },
  iconBtn: {
    position: "fixed",
    right: "10px",
    zIndex: 11,
  },
  icon: {
    color: "white",
  },
}));

export default function App(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [drawerInfo, setDrawerInfo] = useState({
    right: false,
    page: "Overview",
  });
  const [overviewSelectInfo, setOverviewSelectInfo] = useState({
    column: "",
    rows: [],
  });
  const [isFocusUpdate, setIsFocusUpdate] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);

  useEffect(() => {
    csv(process.env.PUBLIC_URL + "/dataset/" + rawDataName)
      .then((csv) => {
        // Data Preprocessing
        csv = csv.filter((ele) => ele.Locations !== "");
        csv.forEach((ele, idx) => {
          csv[idx]["Release Year"] = +ele["Release Year"];
          csv[idx]["Title"] = ele["Title"].replaceAll([",", "."], "");
          csv[idx]["Locations"] = ele["Locations"].replaceAll([",", "."], "");
          csv[idx]["Director"] = ele["Director"].replaceAll([",", "."], "");
          delete ele["Fun Facts"];
        });

        return csv.map((ele, idx) => ({
          ...ele,
          id: idx,
          Latitude: null,
          Longitude: null,
        }));
      })
      .then((csv) => {
        // set "data"
        setData(csv);
      })
      .then(() => {
        // Set "loading"
        setLoading(false);
      });
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerInfo({ ...drawerInfo, [anchor]: open });
  };

  // const isVisible = (pageName) => {
  //   return drawerInfo.page === pageName ? true : false;
  // };

  const classes = useStyles();

  return loading ? (
    <h1>Load Data...</h1>
  ) : (
    <div>
      <IconButton
        className={classes.iconBtn}
        onClick={toggleDrawer("right", true)}
        onKeyDown={toggleDrawer("right", false)}
      >
        <FormatListBulletedIcon className={classes.icon} />
      </IconButton>
      <h1 className={classes.title}>Film Locations in San Francisco</h1>
      <div className={classes.titleDummy} />
      {geoLoading ? (
        <LinearProgress className={classes.progress} />
      ) : (
        <LinearProgress
          className={classes.progress}
          variant="determinate"
          value={0}
        />
      )}
      <Drawer
        anchor={"right"}
        drawerInfo={drawerInfo}
        setDrawerInfo={setDrawerInfo}
        toggleDrawer={toggleDrawer}
      />
      <div className={classes.root}>
        <OverviewPage
          data={data}
          setOverviewSelectInfo={setOverviewSelectInfo}
          isFocusUpdate={isFocusUpdate}
          visible={true}
        />
        <FocusPage
          data={data}
          setData={setData}
          setIsFocusUpdate={setIsFocusUpdate}
          setGeoLoading={setGeoLoading}
          overviewSelectInfo={overviewSelectInfo}
          visible={true}
        />
      </div>
    </div>
  );
}

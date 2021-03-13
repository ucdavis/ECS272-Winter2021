import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import reportWebVitals from './reportWebVitals';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Home from "./Home";
import Geo from './Geo';
import ParallelCoordinate from "./ParallelCoordinate";
import ImageSKY from "./ImageSKY";
import Stat_view from "./Stat_view";
import key from "./api_key.json";

ReactDOM.render(
  <React.StrictMode>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
      integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
      crossorigin="anonymous"
    />

    <link
      rel="stylesheet"
      href="./index.css"
    />

    <Router>
      <Switch>
        <Route path = "/" exact component={Home}/>
        <Route path = "/geoOverview" component={Geo}/>
        <Route path = "/parallelCoordinate" component={ParallelCoordinate}/>
        <Route path = "/imageSky" component={ImageSKY}/>
        <Route path = "/Stat_view" component={Stat_view}/>
      </Switch>
    </Router>


  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

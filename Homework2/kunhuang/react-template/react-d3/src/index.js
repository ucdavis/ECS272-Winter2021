import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import data from  './datasets/Film_Locations_in_San_Francisco.csv';
import App from './App';
import My_Navbar from './My_Navbar';
import reportWebVitals from './reportWebVitals';
import Sk_BarChart from './Sk_BarChart';


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
      <My_Navbar/>
      <div className="sk_container">
        <div className="sk_row">
          <div className="sk_col">
            <h2>Context view: Directors and their appearances</h2>
            <App kind="VoronoiDiagram"/> 
          </div>
          <div className="sk_col">
            <div className="sk_row">
              <h2>Focus view: Top X most popular directors in all film locations</h2>
              <App kind="PieChart"/>
            </div>
            <div className="sk_row">
              <h2>Focus view: Top X most popular directors in selected film locations</h2>
              <App kind="BarChart"/>
            </div>
          </div>
        </div>
      </div>



  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

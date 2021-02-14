import React from 'react';
import BarChart from './BarChart';
import GeoChart from './GeoChart';
import LineChart from './LineChart';
import StackedAreaChart from './StackedAreaChart';
import ParallelCoordChart from './ParallelCoordChart';
import data from  './datasets/SF_Historical_Ballot_Measures.csv';
import PDdata from './datasets/Police_Department_Incidents_-_Previous_Year__2016_.csv';
import worldmapData from './san-francisco.geo.json'; //'./NorthAmerica.geo.json'; //'./SanFrancisco.Neighborhoods.json';
import './App.css';
import GroupBy from "./GroupBy";
import * as d3 from "d3";



class App extends React.Component{
  constructor(props){
    super(props);
    
    var dateParse = d3.timeParse("%m/%d/%Y %H:%M:%S %p");
    // let temp1 = dateParse('01/29/2017 12:00:00 AM');
    // console.log(temp1);
    // console.log(temp1.getMonth()+1,temp1.getYear()+1900,temp1.getHours());
    //data filtering
    d3.csv(PDdata)
    .then(csv => {
      // create data by selecting two columns from csv 
      var filterdata = csv.map(row => {
        return {
        cDate: dateParse(row['Date']),
        District: row['PdDistrict'],
        Category: row['Category'],
        Resolution: row['Resolution'],
        Month: dateParse(row['Date']).getMonth()+1,
        DayOfWeek: row['DayOfWeek'],
        Time: row['Time']
        }
      })

      var sortedata = GroupBy(filterdata,"cMonth");
      //console.log(sortedata);
      //console.log(Object.values(sortedata));

      const monthNames = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"
                  ];

      var plotdata = Object.values(sortedata).map((row, index) => {
          return {
              Month: index+1,
              Monthname: monthNames[index],
              cSum: row.length
          }
      })
      window.plotdata = plotdata;

      filterdata.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return (new Date(a.cDate) - new Date(b.cDate));
      });
      //console.log(filterdata);

      sortedata = GroupBy(filterdata,"District");

      
      plotdata = Object.values(sortedata).map((row,index) => {
        return {
            District: Object.keys(sortedata)[index],
            TotCrime: row.length
        }
      })
      plotdata.splice(-1,1) // get rid of outlier data point  (last array entry)
      //console.log(plotdata);

      sortedata = Object.keys(sortedata).map((key) => [(key), sortedata[key]]);//convert from object array to array
      sortedata.splice(-1,1) //get rid of outlier data point with no district name attached. returns array from (starting index, ending index)

      // console.log(sortedata)
      // console.log(sortedata[0][0]);
      // console.log(mapData.features);
      // console.log(mapData.features.length);
      // console.log(mapData.features[0].properties.DISTRICT);

      for(var i = 0; i < worldmapData.features.length; i++){
        var checkDistrict = worldmapData.features[i].properties.DISTRICT;
        for(var j = 0; j < sortedata.length; j++){
          if(sortedata[j][0] === checkDistrict){
            worldmapData.features[i].properties['INCIDENTS'] = sortedata[j][1];
            worldmapData.features[i].properties['TOTALCRIME'] = plotdata[j].TotCrime;
            break; //break after found
          }
        }
      }
      //console.log(worldmapData);
      window.worldmapData = worldmapData; //sketchy temporary work around to get data outside async function by using global variable
      window.sortedata = sortedata;
      //window.plotdata = plotdata;
    })

    console.log(window.plotdata);
    console.log(window.sortedata);
    console.log(window.worldmapData);

    this.state ={ //data that can change. passed down to child components as props
      //data: data,
      pdData: PDdata,
      lineData: window.plotdata,
      parallelcoordData: window.sortedata,
      mapData: worldmapData,
      //id: "chart-1"
    }


  }

  render(){
    return (
      <div className="App">
        <h2>ECS 272 Assignment 3 - Jeremy Lin</h2>
        <div id="container"> 
        <div id="tooltip"></div>
        </div>
        <div id="map"></div>
        <div class="info">Attempted Choropleth map of crime over each district</div>
        <GeoChart mapData={this.state.mapData} />
        <div class="info">Line Chart of Crime Incidents in SanFrancisco over each month in 2016</div>
        <LineChart data={this.state.pdData}/>
        <div class="info">Parallel Coord Chart of Crime Incidents in SanFrancisco </div>
        <ParallelCoordChart data={this.state.pdData}/>
        {/* <div class="info">Stacked Area Chart of Crime Incidents in SanFrancisco </div>
        {/* <StackedAreaChart data={this.state.pdData}/>  //NOT IMPLEMENTED   */}
        {/* <BarChart data={this.state.data} width={this.state.width} height={this.state.height} />   */}
      </div>
    );
  }

}

export default App;

import React from 'react';
import Scatter from './Scatter';
import Area from './Area';
import Parallel from './Parallel';
import data from  './datasets/data.csv';
import './App.css';
import * as d3 from "d3";

console.warn = () => {};

class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      data: data,
      cols: [],
      xcol: "year",
      ycol: "popularity",
      ccol: "acousticness",
      startyear: "1921",
      showonly: false,
      artists: 9
    }

  }

  async componentDidMount(){
    var cols = [];

    d3.csv( data)
        .then(csv => {
          var allcols = csv.columns;

          for(var c in allcols){
            var k = allcols[c];
            
            var nan = false;

            for(var i = 0; i < csv.length; i++){
              nan = nan || isNaN(Number(csv[i][k]));
            }

            if(!nan){
              cols.push(k);
            }
          }

        }).then(d => {
            this.setState(
            {
              data: data,
              cols: cols,
              xcol: "year",
              ycol: "popularity",
              ccol: "acousticness",
              startyear: "1921",
              showonly: false,
              artists: 9
            }
          )
        }
      )
  }

  handleClick(){
    this.setState(
      {
        data: data,
      }
    );
    console.log("Click");
  }

  genOptions(arr){
    if(arr.length > 0){
      return arr.map(function(e){
        return(<option value={e} key={e}> {e} </option>)
      })
    }
    return []
  }

  selected_xcol(e){
    console.log(e.target.value);
    var copy = this.state;
    copy["xcol"] = e.target.value;
    this.setState(copy);
    document.getElementById('up1').innerHTML = "Update";
  }

  selected_ycol(e){
    console.log(e.target.value);
    var copy = this.state;
    copy["ycol"] = e.target.value;
    this.setState(copy);
    document.getElementById('up1').innerHTML = "Update";
  }

  selected_ccol(e){
    console.log(e.target.value);
    var copy = this.state;
    copy["ccol"] = e.target.value;
    this.setState(copy);
    document.getElementById('up1').innerHTML = "Update";
  }

  selected_startyear(e){
    console.log(e.target.value);
    var copy = this.state;
    copy["startyear"] = e.target.value;
    this.setState(copy);
    document.getElementById('startyear_label').innerHTML = "Start Year: " + e.target.value;
    document.getElementById('up2').innerHTML = "Update";
  }

  toggle_check(){
    var copy = this.state;
    copy["showonly"] = !this.state.showonly;
    this.setState(copy);
    document.getElementById('up3').innerHTML = "Update";
  }

  selected_artists(e){
    console.log(e.target.value);
    var copy = this.state;
    copy["artists"] = e.target.value;
    this.setState(copy);
    document.getElementById('up3').innerHTML = "Update";
    document.getElementById('topn').innerHTML = "Top " + e.target.value + " artist(s)";
  }

  render(){

    return (
      <div className="App">
        <h2 style={{fontSize: "1.5vw", padding: "0px", margin: "0px"}}>ECS 272 HW 2</h2>

        <p style={{fontSize: ".7vw"}} id="up1" hidden>Update</p>
        <p style={{fontSize: ".7vw"}} id="up2" hidden>Update</p>
        <p style={{fontSize: ".7vw"}} id="up3" hidden>Update</p>

        <div id="container">
          <div id="tooltip" style={{fontSize: "1vw", padding: "0px", margin: "0px"}}></div>
          <div style={{display: "flex", flexDirection:"row", alignItems: 'center', justifyContent: "center", width: "100vw"}}>

            <div style={{display: "flex", flexDirection:"column", alignItems: 'center', justifyContent: "center"}}>
              <h3 style={{fontSize: "1vw", padding: "0px", margin: "0px"}}>Scatter with Arbitrary Numerical Columns (Random 10% of Data)</h3>
              <div style={{display: "flex", flexDirection:"row", alignItems: 'center'}}>
                <p style={{fontSize: ".7vw"}}> x feature: </p>
                  <select name="xcol_select" onChange={this.selected_xcol.bind(this)} value={this.state.xcol} style={{width: "6vw", height: "1vw", fontSize: ".6vw"}}>
                    {this.genOptions(this.state.cols)}
                  </select>
                <p style={{fontSize: ".7vw"}}> y feature: </p>
                  <select name="ycol_select" onChange={this.selected_ycol.bind(this)} value={this.state.ycol} style={{width: "6vw", height: "1vw", fontSize: ".6vw"}}>
                    {this.genOptions(this.state.cols)}
                  </select>
                <p style={{fontSize: ".7vw"}}> color feature: </p>
                  <select name="ccol_select" onChange={this.selected_ccol.bind(this)} value={this.state.ccol} style={{width: "6vw", height: "1vw", fontSize: ".6vw"}}>
                    {this.genOptions(this.state.cols)}
                  </select>
              </div>
              <div id = "bar"> </div>
            </div>

            <div style={{display: "flex"}}>
              <div style={{display: "flex", flexDirection:"column", alignItems: 'center'}}>
                <h3 style={{fontSize: "1vw", padding: "0px", margin: "0px"}}>Prominence of Keys Over Time</h3>
                <div style={{display: "flex", flexDirection:"row", alignItems: 'center'}}>
                  <p style={{fontSize: ".7vw"}} id="startyear_label"> Start Year: 1921 </p>
                  <input type="range" min = "1921" max = "2020" step = "10" onChange={this.selected_startyear.bind(this)} style={{width: "6vw", height: "1vw"}}/>
                </div>
                <div id="area"> </div>
              </div>
            </div>

          </div>

          <div>
            <h3 style={{fontSize: "1vw", padding: "0px", margin: "0px"}}>Attributes of Songs by the Most Prolific Artists</h3>
            <div style={{display: "flex", flexDirection:"row", alignItems: 'center', justifyContent: "center"}}>
              <p style={{fontSize: ".7vw"}} id="topn">Top 9 artist(s) </p>
              <input type="range" min = "1" max = "9" step = "1" onChange={this.selected_artists.bind(this)} style={{width: "6vw", height: "1vw"}}/>
              <p style={{fontSize: ".7vw"}}> Show Only Averages: </p>
              <input
                type="checkbox"
                name={"name"}
                checked={this.state.showonly}
                onChange={this.toggle_check.bind(this)}
                className="form-check-input"
                style={{width: "1vw", height: "1vw"}}
              />
            </div>
            <div id="parallel"> </div>
          </div>

        </div>
        <Scatter data={this.state.data} xcol = {this.state.xcol} ycol = {this.state.ycol} ccol = {this.state.ccol} width={this.state.width} height={this.state.height} />
        
        <Area data={this.state.data} width={this.state.width} height={this.state.height} startyear = {this.state.startyear}/>
        <Parallel data={this.state.data} width={this.state.width} height={this.state.height} startyear = {this.state.startyear} showonly={this.state.showonly} artists={this.state.artists}/>

      </div>
    );
  }

}

export default App;

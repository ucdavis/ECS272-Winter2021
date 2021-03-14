// public packages & App.css
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import data1 from './datasets/test.json';
import data11 from './datasets/news_info.json';
import {updateHandle} from './components/drawYAxis';
import background from "./img/newspaper2.png";
import * as d3 from "d3";

// self-defined
import NewsFlow from "./components/NewsFlow";
import ToolBar from "./components/ToolBar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateTank2 = this.updateTank2.bind(this);
    this.playAnimation = this.playAnimation.bind(this);
    this.homeButton = this.homeButton.bind(this);
    this.setValueFunction = this.setValueFunction.bind(this);
    this.setGaugeWells = this.setGaugeWells.bind(this);
    this.setDrawPipeBool = this.setDrawPipeBool.bind(this);
    this.setCount = this.setCount.bind(this);
    this.setHeading = this.setHeading.bind(this);
    this.setValNegative = this.setValNegative.bind(this);
    this.setParentLevel = this.setParentLevel.bind(this);
    this.setWellSelectedData = this.setWellSelectedData.bind(this);
    this.setTotalSizeAndCurrentInTankSize = this.setTotalSizeAndCurrentInTankSize.bind(this);
    this.restartMonthandDay = this.restartMonthandDay.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.setMonth = this.setMonth.bind(this);
    this.setDay = this.setDay.bind(this);
    this.state = {
      id: "chart-1",
      val: 95,
      heading: "Covid-19 Articles",
      parentLevel: "root",
      data: data11,
      count: 0,
      wellSelectedData: null, //Data that is filtered based on well selection
      gaugeTank: null,
      wellsGauge: null, //Array of gauge function for wells
      totalSize: data11.news_details.length,
      currentInTankSize: data11.news_details.length,
      month: 0,
      day: 0,
      drawPipeBool: true,
      func: this.updateTank2,
      setValFunction: this.setValueFunction,
      setGaugeWellsFunction: this.setGaugeWells,
      setDrawPipeBoolFunction: this.setDrawPipeBool,
      setCountFunction: this.setCount,
      setHeadingFunction: this.setHeading,
      setValNegativeFunction: this.setValNegative,
      setParentLevelFunction: this.setParentLevel,
      setWellSelectedDataFunction: this.setWellSelectedData,
      setTotalSizeAndCurrentInTankSizeFunction: this.setTotalSizeAndCurrentInTankSize,
      setMonthFunction: this.setMonth,
      setDayFunction: this.setDay,
      restartMonthandDayFunction: this.restartMonthandDay,
      indexSlideNumber: 0,
      riseBoolean: 1,
    };

    // use arrow function so that we don't need to bind any functions
    // this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    // read data from public/datasets
    // fetch("./datasets/test.json", 
    //   {
    //   headers : { 
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //    }
    // })
    //   .then((res) => res.json())
    //   .then((data) => {

    //     console.log("fetch data ", data[0]);
    //     this.setState({ data });
    //   });
  }

  nextSlide = () => {
    console.log("in next slide");
    if(d3.select("#PlayButton").text() != "Playing"){
      if(this.state.indexSlideNumber == 2){
        console.log("complete" , d3.select("#mainCircle").attr("complete"))
        if(d3.select("#mainCircle").attr("complete") == "true"){
          console.log("in true ");
          this.setState({indexSlideNumber: this.state.indexSlideNumber + 1});
        }
      }else if(this.state.indexSlideNumber == 8){
        d3.select("#PlayButton").text("Play");
        this.setState({count: 0});
        this.setState({currentInTankSize: this.state.data.news_details.length});
        this.setState({totalSize: this.state.data.news_details.length});
        this.setState({wellSelectedData: null});

        //draw tank
        this.setState({val: -1});
        this.setState({heading: "Covid-19 Articles"});
        this.setState({val: 95});

        this.setState({month: 0});
        this.setState({day: 0});
        this.setState({drawPipeBool: true});

        //draw wells
        this.setState({parentLevel: "root"});

        
        this.state.wellsGauge.forEach(function(d,i){
          d.update(0);
          var str = "#bottomWells" + (i+1);
          d3.select(str).attr("currNumPoints", 0);
        })

        //Update handle position
        updateHandle("Apr,1");
        this.setState({indexSlideNumber: this.state.indexSlideNumber + 1});
      }
      else{
         this.setState({indexSlideNumber: this.state.indexSlideNumber + 1});
      }
     
    }

  }

  prevSlide = () => {
     console.log("in prev slide");
    if(d3.select("#PlayButton").text() != "Playing"){
      if(this.state.indexSlideNumber == 2){
        console.log("complete" , d3.select("#mainCircle").attr("complete"))
        if(d3.select("#mainCircle").attr("complete") == "true"){
          console.log("in true ");
          this.setState({indexSlideNumber: this.state.indexSlideNumber - 1});
        }
      }else{
        if(this.state.indexSlideNumber == 8 || this.state.indexSlideNumber == 9){
          this.setState({count: 0});
          this.setState({currentInTankSize: this.state.data.news_details.length});
          this.setState({totalSize: this.state.data.news_details.length});
          this.setState({wellSelectedData: null});

          //draw tank
          this.setState({val: -1});
          this.setState({heading: "Covid-19 Articles"});
          this.setState({val: 95});

          this.setState({month: 0});
          this.setState({day: 0});
          this.setState({drawPipeBool: true});

          //draw wells
          this.setState({parentLevel: "root"});

        
          this.state.wellsGauge.forEach(function(d,i){
            d.update(0);
            var str = "#bottomWells" + (i+1);
            d3.select(str).attr("currNumPoints", 0);
          })

           d3.select("#PlayButton").text("Play")
        }


         this.setState({indexSlideNumber: this.state.indexSlideNumber - 1});

      }
    }
   


  }

  restartMonthandDay = (value) => {
    console.log(" in restartMonthandDay ", value);
    this.setState({month: value});
    this.setState({day: value});
  }

  setTotalSizeAndCurrentInTankSize = (value) =>{
    console.log(" in setTotalSizeAndCurrentInTankSize ", value);
    this.setState({totalSize: value});
    this.setState({currentInTankSize: value});
  }

  setGaugeWells = (arr) =>{
    console.log("in setGaugeWells");
    this.setState({wellsGauge: []});
    this.setState({wellsGauge: arr});
  }

  setWellSelectedData = (arr) =>{
    console.log(" in setwellSelectedData ", arr);
    this.setState({wellSelectedData: arr});
    //console.log(" in wellSelectedData ", this.state.wellSelectedData);
  }

  setMonth= (val) => {
    console.log("in setMonth ", val);
    this.setState({month: val});
  }

  setDay= (val) => {
    console.log("in setDay ", val);
    this.setState({day: val});
  }

  setParentLevel= (val) => {
    console.log("in setParentLevel ", val);
    this.setState({parentLevel: val});
  }

  setCount= (val) => {
    console.log("in setCount ", val);
    this.setState({count: val});
  }

  setHeading = (val) => {
    console.log("in setHeading ", val);
    this.setState({heading: val});
  }

  setDrawPipeBool = (val) => {
    console.log("in drawPipeBool ", val);
    this.setState({drawPipeBool: val});
  }

  setValNegative = (value) => {
    console.log("in setValNegative ", value);
    this.setState({val: value});
  }


  updateTank2 = (val) =>{
    console.log("in update tank 2");
     this.setState({gaugeTank: val});
  }

  setValueFunction = (val, boolean) => {
    console.log(" in setValueFunction", val);
    this.setState({count: 1});
    const currentVal = this.state.val;
    // console.log("currentVal ", currentVal);
    // console.log("this.state.currentInTankSize ", this.state.currentInTankSize)
    // console.log("this.state.currentInTankSize - val ", this.state.currentInTankSize - val)
    this.setState({riseBoolean: boolean});
    const totalSize = this.state.totalSize;
    this.setState({currentInTankSize: this.state.currentInTankSize - val});
    const currentInTankSize = this.state.currentInTankSize;
    // console.log(" currentInTankSize ", currentInTankSize);
    // console.log(" totalSize ", totalSize);
    var newVal = (currentInTankSize*95)/ totalSize;
    //console.log("newVal ", newVal);
    this.setState({val: newVal});
  }

  homeButton = () =>{

     if(this.state.indexSlideNumber > 8){
      if(this.state.parentLevel != "root"){
        console.log("home button clicked");
        d3.select("#wells").selectAll(".tooltip").style("opacity", 0)
        var root = this.state.parentLevel;


        if(d3.select("#centerWell1").attr("tagNameCurrent") != "none"){
          d3.select("#centerWell1").attr("tagNameCurrent", "none");
          d3.select("#centerWell1").selectAll("#dataCircle").remove("*");
          d3.select("#centerWell1").selectAll("#backgroundCircle").style("fill-opacity", 0);
          d3.select("#centerWell1").selectAll("#outerCircle").attr("opacity", 0);
         }


        d3.select("#PlayButton").text("Play");
        this.setState({count: 0});
        this.setState({currentInTankSize: this.state.data.news_details.length});
        this.setState({totalSize: this.state.data.news_details.length});
        this.setState({wellSelectedData: null});

        //draw tank
        this.setState({val: -1});
        this.setState({heading: "Covid-19 Articles"});
        this.setState({val: 95});

        this.setState({month: 0});
        this.setState({day: 0});
        this.setState({drawPipeBool: true});

        //draw wells
        this.setState({parentLevel: "root"});

        
        this.state.wellsGauge.forEach(function(d,i){
          d.update(0);
          var str = "#bottomWells" + (i+1);
          d3.select(str).attr("currNumPoints", 0);
        })

        //Update handle position
        updateHandle("Apr,1");
       }
    }
  }


  playAnimation = () =>{

    if(this.state.indexSlideNumber > 7){
      console.log("play button clicked");
      this.setState({drawPipeBool: false});
      d3.select("#wells").selectAll(".tooltip").style("opacity", 0)


      if(d3.select("#centerWell1").attr("tagNameCurrent") != "none"){
        d3.select("#centerWell1").attr("tagNameCurrent", "none");
        d3.select("#centerWell1").selectAll("#dataCircle").remove("*");
        d3.select("#centerWell1").selectAll("#backgroundCircle").style("fill-opacity", 0);
        d3.select("#centerWell1").selectAll("#outerCircle").attr("opacity", 0);
       }


       if(this.state.indexSlideNumber == 8){
        d3.select("#textDiv").html("As the animation plays you can see the color of each water droplet is the same color of the well the droplet is going to. The water level for the water tank decreases over time as more droplets leave. Also in the water tank you can see the current day and the number of articles published that day. The water levels of each well rises as more droplets enter and the percentage of the wells increases accordingly. You can see over the last five days the main color of droplets shown were green and blue, with very little red. This means that there were more articles about miscellaneous policies and health system policies than economic policies during the last five days. In the end we see Health System Policies has the second highest percentage and is worth looking into. <strong>Double click</strong> on the <strong>blue well</strong> to continue.");
       }
       


        //console.log("In Play Animation");
      //console.log(" d3.select(#playButton)",  d3.select("#playButton"));
      if(d3.select("#PlayButton").text() == "Play"){
        d3.select("#PlayButton").text("Playing")

        if(this.state.month == 0){
          this.setState({month: 4});
          this.setState({day: 1});
        }else{
          this.setState({day: this.state.day + 1});
        }
      }else if(d3.select("#PlayButton").text() == "Restart"){

        console.log("Restart action instead");

        if(this.state.indexSlideNumber != 8){
          d3.select("#PlayButton").text("Play")
          if(this.state.parentLevel == "root"){
             this.setState({currentInTankSize: this.state.data.news_details.length});
           }else{
            this.setState({currentInTankSize: this.state.wellSelectedData.news_details.length});
           }
         
          this.setState({val: 95});
          this.setState({month: 0});
          this.setState({day: 0});

          this.state.wellsGauge.forEach(function(d,i){
            d.update(0);
            var str = "#bottomWells" + (i+1);
            d3.select(str).attr("currNumPoints", 0);
          })

          //update handle position
          updateHandle("Apr,1");
        }



      }
    }

    
    
  }


  render() {
    const { id, val, data } = this.state;
    //console.log("this.state ", this.state)
   // console.log("this.id ", id)
    const divStyle = {
      height: "100%",
      width: "100%",
    };

    return (
      <div className="App">
        <div id="myContainer" >
          <AppBar position="static" id="toolBar" style={{backgroundColor: "black"}}>
            <Toolbar >
              <Button color="inherit"  onClick={this.homeButton}>Home</Button>
              <Button color="inherit" onClick={this.playAnimation}  id="PlayButton">Play</Button>
              <Button color="inherit" onClick={this.prevSlide}  style={{"marginLeft": "auto"}} id="prevSlideButton">Prev</Button>
              <Button color="inherit" onClick={this.nextSlide}  id="nextSlideButton">Next</Button>
            </Toolbar>
          </AppBar>
          <NewsFlow data={this.state} />



        </div>
      </div>
    );
  }
}

export default App;
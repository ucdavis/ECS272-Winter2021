import React, {Component} from 'react';
import * as d3 from "d3";
import { data_processing,data_cleaning } from './data_processing';

class Sk_BarChart extends Component{

    constructor(props){
        super(props);
        this.state = {
            value: 5,
            location: "City Hall"
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleChange(event){
        this.setState({
            value: event.target.value
        });
    }

    handleSelect(event){
        this.setState({
            location:event.target.value
        });
    }

    componentDidMount(){
        this.drawChart();
    }

    componentDidUpdate() {
        this.drawChart();
    }

    data_pipeline(num, location, dataset){
        let top_directors = [];
        console.log("dataset: ",dataset);
        let data = data_processing(data_cleaning(dataset,["Director","Locations"]),["Director","Locations"]);
        
        let director_stat = {};
        let locations = new Set();
        data.map(data=>{
                locations.add(data["Locations"]);
                if(data["Locations"]!=location){
                  return;
                }
                if(director_stat.hasOwnProperty(data["Director"])){
                  director_stat[data["Director"]]+=1;
                }else{
                  director_stat[data["Director"]]=0;
                }
              });
        d3.select("#locations")
          .selectAll("options")
          .data(locations)
          .enter()
          .append("option")
          .attr("value",data=>data)
          .text(data=>data);

    for(let i = 0; i<num; i++){
                let max_count = -1;
                let max_director = "";
                for(let prop in director_stat){
                  if(director_stat[prop]>max_count){
                    max_director = prop;
                    max_count = director_stat[prop];
                  }
                }
                top_directors.push({
                name:max_director,
                number:max_count
                });
                delete director_stat[max_director];
            }
        
          console.log(top_directors);
          return top_directors;
    
      }


    drawChart(){
            // log csv in browser console
        d3.csv(this.props.data)
        .then((dataset)=>{

            let top_directors = this.data_pipeline(this.state.value,this.state.location,dataset);
        
            console.log("in drawchart:",this.state.value);
            console.log(top_directors);
            if(!top_directors){
                return;
            }
            console.log("in sk_barchart");
            console.log(top_directors);
            let colors = d3.scaleSequential().domain([0,d3.max(top_directors,data=>data.number)]).interpolator(d3.interpolateBlues);
            
            
             /********************************* 
            * Visualization codes start here
            * ********************************/
           var width = this.props.width;
           var height = this.props.height;
           var margin = {left: 40, right: 85, top: 20, bottom: 20}
            
    
           let x_scale = d3.scaleBand()
                      .domain(top_directors.map(data=>data.name))
                      .rangeRound([margin.left, width - margin.right])
                      .padding(0.1);
    
            let y_scale = d3.scaleLinear()
                      .domain([0,d3.max(top_directors,data=>data.number)])
                      .range([height-margin.bottom,margin.top]);
            
           d3.select("#container").selectAll("*").remove();
           
           var svg = d3.select('#container')
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .style("background","grey");
    
            let bars = svg.append("g")
               .selectAll("rect")
               .data(top_directors)
               .join("rect")
               .attr("x",data=>x_scale(data.name))
               .attr("y",data=>y_scale(data.number))
               .attr("height",data=>{return y_scale(0)-y_scale(data.number)})
               .attr("width",x_scale.bandwidth())
               .attr("fill",data=>colors(data.number));
            
            let captions = svg.append("g")
               .selectAll("text")
               .data(top_directors)
               .join("text")
               .attr("text-anchor","middle")
               .attr("x",data=>x_scale(data.name)+x_scale.bandwidth()/2)
               .attr("y",data=>y_scale(data.number)+15)
               .text(data=>data.name+":"+data.number)
               .attr("font-size", "11px")
               .attr("fill","white");
     
           
           // create a scatter plot
        svg.append("g")
           .attr("transform","translate(0,"+(height-margin.bottom)+")")
           .call(d3.axisBottom(x_scale));
        svg.append("g")
           .attr("transform","translate("+margin.left+",0)")
           .call(d3.axisLeft(y_scale));
           
        let legends = svg.append("g")
           .attr("transform","translate(400,0)")
           .selectAll(".category").data(top_directors);
    
        let legend = legends.join("g")
              .classed("category",true)
              .attr("transform",(data,index)=>{
                return "translate(0,"+(index+1)*30+")";
     
            });
        
        legend.append("rect")
            .attr("width",20)
            .attr("height",20)
            .attr("fill",data=>colors(data.number));
    
        legend.append("text").text(data=>data.name)
                           .attr("font-weight","bold")
                           .attr("font-family", "Saira")
                           .attr("fill",data=>colors(data.number))
                           .attr("x",20)
                           .attr("y",20);    

        });

    
    }

    render(){
        return (
        <div id={"#" + this.props.id}>
            <form>
                <label>
                Top X directors:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
            </form>
            <select id="locations" value={this.state.location} onChange={this.handleSelect} >

            </select>
        </div>);
    }
}

export default Sk_BarChart;
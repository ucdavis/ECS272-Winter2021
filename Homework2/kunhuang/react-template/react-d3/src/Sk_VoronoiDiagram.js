import React, {Component} from 'react';
import * as d3 from "d3";
import { data_processing,data_cleaning } from './data_processing';

class Sk_VoronoiDiagram extends Component{

    constructor(props){
        super(props);
        this.state = {
            radius:25
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({
            radius: event.target.value
        });
    }

    componentDidMount(){
        this.drawChart();
    }

    componentDidUpdate() {
        this.drawChart();
    }

    data_pipeline(dataset){
  
        let data = data_processing(data_cleaning(dataset,["Director"]),["Director"]);
        let directors = {};
        data.map(data=>{
            if(directors.hasOwnProperty(data["Director"])){
                directors[data["Director"]] += 1;
            }else{
                directors[data["Director"]] = 1;
            }
        });

        let keys = Object.keys(directors);
        console.log("keys",keys)
        let results = keys.map(data=>{
            return {Director:data, appearance:directors[data]}
        });
        console.log("results",results)

        return results;
    
      }


    drawChart(){
            // log csv in browser console
        d3.csv(this.props.data)
        .then((dataset)=>{

            let top_directors = this.data_pipeline(dataset);
        
            console.log("in voronoi diagram",top_directors);
            if(!top_directors){
                return;
            }
            let width = this.props.width;
            let height = this.props.height;
            let margin = {left: 50, right: 20, top: 20, bottom: 20}

            d3.select('#container_VoronoiDiagram').selectAll("*").remove();
            let svg = d3.select('#container_VoronoiDiagram')
                          .append('svg')
                          .attr("width",width)
                          .attr("height",height)
                          .style("background","grey");



            let x_scale = d3.scaleBand()
                            .domain(top_directors.map(data=>data["Director"]))
                            .rangeRound([margin.left, width - margin.right])
                            .padding(0.1);

            let y_scale = d3.scaleLinear()
                            .domain([0,d3.max(top_directors,data=>data["appearance"])])
                            .range([height-margin.bottom,margin.top]);

            let colors = d3.scaleSequential().domain([0,d3.max(top_directors,data=>data["appearance"])]).interpolator(d3.interpolateBlues);

            let scatterplots = top_directors.map(data=>{
                return [x_scale(data["Director"]),y_scale(data["appearance"]),data["appearance"]];
            });

            let delaunay = d3.Delaunay.from(scatterplots,data=>data[0],data=>data[1]);
            let voronoi = delaunay.voronoi([ 0, 0, width, height ])

            svg.selectAll('path')
                .data( top_directors.map((d,i) => voronoi.renderCell(i)) )
                .join('path')
                .attr('d', data => data)
                .style("fill","grey")
                .style('opacity', 0.8)
                .style('stroke', 'white')
                .style('stroke-opacity', 1)

            console.log("scatterplot",scatterplots);
            svg.selectAll("circle")
                .data(scatterplots)
                .enter()
                .append("circle")
                .attr("cx",data=>data[0])
                .attr("cy",data=>data[1])
                .attr("r",this.state.radius)
                .attr("fill",data=>colors(data[2]));

            svg.append("g")
                .attr("transform","translate("+margin.left+",0)")
                .call(d3.axisLeft(y_scale))
                .attr("fill","white")
                .style("color","white");

            svg.append("text")
                .attr("class", "y label")
                .attr("text-anchor", "end")
                .attr("x",-(width/2)+2*margin.top)
                .attr("y", 6)
                .attr("dy", ".75em")
                .attr("transform", "rotate(-90)")
                .text("appearances (times)")
                .attr("fill","white");


        });

    
    }

    render(){
        return (
        <div id={"#" + this.props.id}>
            <form>
                <label for="vol">voronoi diagram scatterplots radius:</label>
                <input type="range" min="0" max="25" onChange={this.handleChange}/>
            </form>
        </div>);
    }
}

export default Sk_VoronoiDiagram;
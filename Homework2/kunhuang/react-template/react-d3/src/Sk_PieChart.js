import React, {Component} from 'react';
import * as d3 from "d3";
import { data_processing,data_cleaning } from './data_processing';

class Sk_BarChart extends Component{

    constructor(props){
        super(props);
        this.state = {
            value: 5
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({
            value: event.target.value
        });
    }

    componentDidMount(){
        this.drawChart();
    }

    componentDidUpdate() {
        this.drawChart();
    }

    data_pipeline(num, dataset){
  
        let data = data_processing(data_cleaning(dataset,["Director"]),["Director"]);
        let top_5_directors = [];
        let director_stat = {}
        data.map(data=>{
          if(director_stat.hasOwnProperty(data["Director"])){
            director_stat[data["Director"]]+=1;
          }else{
            director_stat[data["Director"]]=1;
          }
        });
        for(let i = 0; i<num; i++){
          let max_count = -1;
          let max_director = "";
          for(let prop in director_stat){
            if(director_stat[prop]>max_count){
              max_director = prop;
              max_count = director_stat[prop];
            }
          }
          top_5_directors.push({
          name:max_director,
          number:max_count
          });
          delete director_stat[max_director];
        }
        return top_5_directors;
    
      }


    drawChart(){
            // log csv in browser console
        d3.csv(this.props.data)
        .then((dataset)=>{

            let top_directors = this.data_pipeline(this.state.value,dataset);
        

            if(!top_directors){
                return;
            }

            let pie_data = d3.pie().sort(null).value(data=>data.number)(top_directors);
  
            let colors = d3.scaleSequential().domain([0,d3.max(top_directors,data=>data.number)]).interpolator(d3.interpolateBlues);
            var width = this.props.width;
            var height = this.props.height;
            d3.select('#container_pie').selectAll("*").remove();
            let svg = d3.select('#container_pie')
                          .append('svg')
                          .attr("width",width)
                          .attr("height",height)
                          .style("background","grey");
            let segments = d3.arc()
                             .innerRadius(0)
                             .outerRadius(150)
                             .padAngle(0.05)
                             .padRadius(50);
            let g = svg.append("g")
                      .attr("transform","translate(200,200)")
                      .selectAll("path")
                      .data(pie_data)
                      .join("path")
                      .attr("d",segments)
                      .attr("fill",data=>colors(data.data.number));
                      
            let caption = svg.select("g")
                           .selectAll("text")
                           .data(pie_data);
            //console.log(svg.select("g").selectAll("text"));
            caption.join("text").each(function(data){
            let center = segments.centroid(data);
            //console.log(this);
            d3.select(this).attr("x",center[0]-80)
                           .attr("y",center[1])
                           .text(data.data.name+":"+data.data.number)
                           .attr("font-family","Saira")
                           .attr("font-weight","bold")
                           .attr("fill","white");
            });
            let legends = svg.append("g")
                             .attr("transform","translate(400,100)")
                             .selectAll(".category").data(pie_data);
            let legend = legends.join("g")
                                .classed("category",true)
                                .attr("transform",(data,index)=>{
                                  return "translate(0,"+(index+1)*30+")";
                                });
            legend.append("rect")
                  .attr("width",20)
                  .attr("height",20)
                  .attr("fill",data=>colors(data.data.number));
            legend.append("text").text(data=>data.data.name)
                                 .attr("font-weight","bold")
                                 .attr("font-family", "Saira")
                                 .attr("fill",data=>colors(data.data.number))
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
        </div>);
    }
}

export default Sk_BarChart;
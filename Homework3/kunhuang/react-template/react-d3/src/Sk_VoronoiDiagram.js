import React, {Component} from 'react';
import * as d3 from "d3";
import { data_processing,data_cleaning } from './data_processing';
import Sk_CirclePlot from './Sk_CirclePlot'

class Sk_VoronoiDiagram extends Component{

    constructor(props){
        super(props);
        this.state = {
            radius:10,
            zoomState: null,
            circlePlotData:null
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
        // console.log("keys",keys)
        let results = keys.map(data=>{
            return {Director:data, appearance:directors[data]}
        });
        // console.log("results",results)

        return results;
    
      }

    // handleZoom(state){
    //     // console.log("handle zooming");
    //     this.setState({
    //         zoomState: state
    //     });
    // }

    drawCirclePlot(data){
        let width = this.props.width;
        let height = this.props.height;
        let radius = width/40;
        d3.select('#CirclePlot').selectAll("*").remove();
        let svg = d3.select('#CirclePlot')
                    .append('svg')
                    .attr("width",width)
                    .attr("height",height)
                    .style("background","grey");

        console.log("circleplotting");

        const circles = data.map((data)=>{
            data["cx"] = Math.random() * (width - radius*2)+radius/4;
            data["cy"] = Math.random() * (height - radius*2)+radius/4;
            return data;
        });

        console.log("circles",circles)

        svg.append("text")
            .attr("transform","translate(50,50)")
            .attr("id","cp_counter")
            .text("Selected Appearances Sum: 0");


        svg.selectAll("circle")
            .data(circles)
            .join("circle")
            .attr("cx",data=>data["cx"])
            .attr("cy",data=>data["cy"])
            .attr("r",radius)
            .attr("fill",data=>data["color"])
            .attr("id", (data,index)=>{
                return "cp"+index;
            })
            .on("click",(event)=>{
                // d3.select(this).transition()
                //                .attr("fill", "black");
                const curr_text = d3.select("#cp_counter").text();
                let split_text = curr_text.split(":");
                if(d3.select("#"+event.target.id).attr("stroke")!="rgb(255, 0, 0)"){
                    d3.select("#"+event.target.id)
                    .transition()
                    .attr("stroke", "red");
                    let appearance = Number(circles[Number(event.target.id.replace("cp",""))]["appearance"]);
                    d3.select("#cp_counter").text(split_text[0]+":"+(Number(split_text[1])+appearance));
                
                }else{
                    d3.select("#"+event.target.id)
                    .transition()
                    .attr("stroke", "none");  
                    // d3.select("#cp_counter").text(split_text[0]+":"+(Number(split_text[1])-circles[Number(event.target.id.replace("cp"))]["appearance"]));
                    let appearance = Number(circles[Number(event.target.id.replace("cp",""))]["appearance"]);
                    d3.select("#cp_counter").text(split_text[0]+":"+(Number(split_text[1])-appearance));
                }
                // console.log(d3.select("#"+event.target.id).attr("stroke"));


            })
            .append("title")
            .text(data=>data["director"]+":"+data["appearance"]);
    }


    drawChart(){
            // log csv in browser console
        d3.csv(this.props.data)
        .then((dataset)=>{

            let top_directors = this.data_pipeline(dataset);
        
            // console.log("in voronoi diagram",top_directors);
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

            let names = top_directors.map(data=>{
                return data["Director"];
            });


            names = [...new Set(names)];
            // console.log(names);

            let x_scale = d3.scaleLinear()
                            .domain([0,names.length])
                            .rangeRound([margin.left, width - margin.right]);




            let y_scale = d3.scaleLinear()
                            .domain([0,d3.max(top_directors,data=>data["appearance"])])
                            .range([height-margin.bottom,margin.top]);
            
            // if(this.state.zoomState!=null){
            //     const updated_y_domain = this.state.zoomState.rescaleY(y_scale).domain();
            //     y_scale.domain(updated_y_domain);
            //     const updated_x_domain = this.state.zoomState.rescaleX(x_scale).domain();
            //     x_scale.domain(updated_x_domain);
            //     console.log(x_scale.domain());
            //     console.log(y_scale.domain());

            // }

            let colors = d3.scaleSequential().domain([0,d3.max(top_directors,data=>data["appearance"])]).interpolator(d3.interpolateBlues);

            let scatterplots = top_directors.map(data=>{
                return [x_scale(names.indexOf(data["Director"])),y_scale(data["appearance"]),data["appearance"],data["Director"]];
            });

            let delaunay = d3.Delaunay.from(scatterplots,data=>data[0],data=>data[1]);
            let voronoi = delaunay.voronoi([ 0, 0, width, height ]);

            svg.selectAll('path')
                .data( top_directors.map((d,i) => voronoi.renderCell(i)) )
                .join('path')
                .attr('d', data => data)
                .style("fill",(data,index)=>{
                    return colors(top_directors[index]["appearance"]);
                })
                .style('opacity', 0.8)
                .style('stroke', 'white')
                .style('stroke-opacity', 1);

            // console.log("scatterplot",scatterplots);
            let words = svg.selectAll("text")
                            .data(scatterplots)
                            .enter()
                            .append("text")
                            .attr("transform",data=>{
                                return "translate("+data[0]+","+data[1]+")";
                            })
                            .style("font-size",data=>{
                                return this.state.radius+"px";
                            })
                            .attr("fill","black")
                            .style("text-anchor", "middle")
                            .text(data=>data[3]);


            svg.append("g")
                .attr("transform","translate("+margin.left+",0)")
                .call(d3.axisLeft(y_scale))
                .attr("fill","black")
                .style("color","black");

            svg.append("text")
                .attr("class", "y label")
                .attr("text-anchor", "end")
                .attr("x",-110)
                .attr("y", 6)
                .attr("dy", ".75em")
                .attr("transform", "rotate(-90)")
                .text("appearances (times)")
                .attr("fill","black");

            // const zoomi = d3.zoom().on("zoom",(event)=>{
            //                             //   console.log("zomming");               
            //                             const zoomState = event.transform;
            //                             this.handleZoom(zoomState);
                                        //   console.log(zoomState);
                                    // });

            let selected = ({selection})=>{
                if(selection==null){

                    words.attr("font-weight","")
                }else{
                    const [[x0, y0], [x1, y1]] = selection;
                    words.attr("font-weight", ([x, y]) => {
                      return x0 <= x && x <= x1
                          && y0 <= y && y <= y1
                          ? "bold" : "";
                    });
                    words.style("font-size", ([x, y]) => {
                        return x0 <= x && x <= x1
                            && y0 <= y && y <= y1
                            ? (this.state.radius*4) + "px": this.state.radius+"px";
                      });
                    let selected_names = [];

                    for(let i = 0; i < scatterplots.length; i++){
                        if(x0 <= scatterplots[i][0] && scatterplots[i][0] <= x1 && y0 <= scatterplots[i][1] && scatterplots[i][1] <= y1){
                            selected_names.push({
                                director : scatterplots[i][3],
                                appearance : scatterplots[i][2],
                                color : colors(scatterplots[i][2])
                            });
                        }
                    }
                    console.log(selected_names);

                    this.drawCirclePlot(selected_names);

                }
            }

            const brush = d3.brush()
                            .filter(event => !event.ctrlKey&&(event.metaKey||event.target.__data__.type!="overlay")&&!event.button)
                            .on("start brush end",selected);

            svg.append("g")
                .attr("class","brush")
                .call(brush)
                .call(brush.move,[[100,100],[200,200]])
                .call(g => g.select(".overlay").style("cursor","default"));

            // svg.call(zoomi)
            // this.setState({
            //     circlePlotData: selected_names
            // })




        });

    
    }

    render(){
        return (
        <div id={"#" + this.props.id}>
            {/* <Sk_CirclePlot data={this.state.circlePlotData} width={this.props.width} height={this.props.height}/> */}
        </div>);
    }
}

export default Sk_VoronoiDiagram;
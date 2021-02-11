import React, {Component} from 'react';
import * as d3 from "d3";
import { drag } from 'd3';

class Sk_CirclePlot extends Component{

    componentDidMount(){
        this.drawChart();
    }

    componentDidUpdate() {
        this.drawChart();
    }

    drawChart(){
        
        let data = this.props.data;
        if(data == null){
            return;
        }
        let width = this.props.width;
        let height = this.props.height;
        let radius = this.props.radius;
        d3.select('#CirclePlot').selectAll("*").remove();
        let svg = d3.select('#CirclePlot')
                    .append('svg')
                    .attr("width",width)
                    .attr("height",height)
                    .style("background","grey");

        const circles = data.map((data)=>{
            data["cx"] = Math.random() * (width - radius*2);
            data["cy"] = Math.random() * (height - radius*2);
            return data;
        });

        let drag = d3.drag()
                     .on("start",(event,data)=>{
                         d3.select(this).raise().attr("stroke","black");
                     })
                     .on("drag",(event,data)=>{
                        d3.select(this).attr("cx", data.cx = event.x)
                                        .attr("cy", data.cy = event.y);
                     })
                     .on("end",(event,data)=>{
                        d3.select(this).attr("stroke", null);
                     });

        svg.selectAll("circle")
            .data(circles)
            .join("circle")
            .attr("cx",data=>data["cx"])
            .attr("cy",data=>data["cy"])
            .attr("r",radius)
            .attr("fill",data=>data["color"])
            .call(drag);


    }

    render(){
        return (
        <div id={"#" + this.props.id}>

        </div>);
    }


}

export default Sk_CirclePlot;
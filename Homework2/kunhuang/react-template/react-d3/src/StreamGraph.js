import React, {Component} from 'react';
import * as d3 from "d3";

class StreamGraph extends Component{

    componentDidMount(){
        this.drawChart();
    }

    drawChart(){
        d3.csv( this.props.data)
        .then(csv => {
            // log csv in browser console
        console.log(csv);
        let width = 600;
        let height = 400;
        let margin = {left: 60, right: 20, top: 20, bottom: 60};
        
        let keys = new Set();
        let data = csv.map(row => {

                keys.add(row["Month"]);

                return ({
                        keyword: row["Keyword1"],
                        month: row["Month"],
                        pass: (row["Pass or Fail"]=="P")?1:0,
                        fail: (row["Pass or Fail"]=="F")?1:0
                        });
            });
        let max_total = 0;
        keys.forEach(key=>{
            max_total= d3.max([max_total,d3.sum(data,d=>{
                if(row["month"]==key){
                    return d["pass"];
                }
                return 0;
                
            })+d3.sum(data,d=>{
                if(row["month"]==key){
                    return d["fail"];
                }
                return 0;
            })]);
        });

        const svg = d3.select('#container')
        .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append("g")
          .attr("translate(" + margin.left + "," + margin.top + ")");

        let x_scaler = d3.scaleBand()
                          .domain(keys)
                          .rangeRound([margin.left,width - margin.right]);
        
        // let y_scaler = d3.scaleLinear()
        //                  .domain([0,max_total])
        //                  .range([height-margin.bottom,margin.top]);


        svg.append("g")
            .attr("transform", "translate(0," + (height-margin.bottom) + ")")
            .call(d3.axisBottom(x_scaler));
        
        // svg.append("g")
        //     .attr("transform", "translate("+margin.left+",0)")
        //     .call(d3.axisLeft(y_scaler));
        
        svg.append("g")
            .selectAll("circle")
            .data()

        
     });

    }

    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default StreamGraph;
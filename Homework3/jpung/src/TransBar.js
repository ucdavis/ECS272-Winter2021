import React, {Component} from 'react';
import * as d3 from "d3";

class Transition extends Component{

    componentDidMount(){
        this.drawChart();
    }

    drawChart(){
        d3.csv(this.props.data)
        .then(csv => {
        
        // Preprocessing
        var init_data = csv.map(row => {
            return {
                num: Number(row['Number']),
                name: String(row['Name']),
                total: Number(row['Total']),
                hp: Number(row['HP']),
                attack: Number(row['Attack']),
                defense: Number(row['Defense']),
                sp_attack: Number(row['Sp_Atk']),
                sp_defense: Number(row['Sp_Def']),
                speed: Number(row['Speed']),
                gen: Number(row['Generation'])
            }
        })

        // Filter 1st generation pokemons
        function filterGen(array) {
        return array.filter(pokemon => pokemon.gen == 1);
        }

        var data = filterGen(init_data);

        console.log(data);

        // Filter selected pokemon
        function filterSelected(array, chosenNum) {
            var oneRow = array.filter(pokemon => pokemon.num == chosenNum)[0];
            var hp = {
                attr: "hp",
                score: oneRow.hp
            };
            var attack = {
                attr: "attack",
                score: oneRow.attack
            };
            var defense = {
                attr: "defense",
                score: oneRow.defense
            };
            var sp_attack = {
                attr: "sp_attack",
                score: oneRow.sp_attack
            };
            var sp_defense = {
                attr: "sp_defense",
                score: oneRow.sp_defense
            };
            var speed = {
                attr: "speed",
                score: oneRow.speed
            };
            var data =[];
            data.push(hp, attack, defense, sp_attack, sp_defense, speed);
            return data;
        }
            
        const margin = {top: 35, left: 35, bottom: 5, right: -15};
        const width = 500;
        const height = 300;

        var svg = d3.select("#transBar")
            .append("svg")
            .attr("viewBox", [0, 0, width, height+30])

        var x = d3.scaleBand()
            .range([margin.left, width - margin.right])
            .padding(0.1)
            .paddingOuter(0.2)

        var y = d3.scaleLinear()
            .range([height - margin.bottom, margin.top])

        var xAxis = g => g
            .attr("transform", 
                "translate(0," + (height - margin.bottom) + ")")
            .call(d3.axisBottom(x).tickSizeOuter(0))

        var yAxis = g => g
            .attr("transform", 
                "translate(" + margin.left + ",0)")
            .call(d3.axisLeft(y))

        var yGrid = g => g
            .attr("transform", 
                "translate(" + margin.left + ",0)")
            .style("color", "#b3b3b3")
            .call(d3.axisLeft(y).tickSize(-width + margin.right))
            .call(g => g.selectAll("text").remove())

        svg.append("g")
            .attr("class", "x-axis")
        
        svg.append("rect").attr("class", "block")
            .attr("x", 0)
            .attr("y", 0 + margin.top)
            .attr("height", height - margin.bottom)
            .attr("width", margin.left)
            .attr("fill", "#fff");
        
        svg.append("g")
            .attr("class", "y-axis")
        svg.append("g")
            .attr("class", "y-grid")
           
        function update(data, input) {

            var sel_data = filterSelected(data, input);
            x.domain(sel_data.map(d => d.attr))

            svg.selectAll(".x-axis").transition().duration(speed)
                .call(xAxis);

            y.domain([0, d3.max(sel_data, d => d["score"])]).nice()

            svg.selectAll(".y-axis").transition().duration(speed)
                .call(yAxis);
            svg.selectAll(".y-grid").transition().duration(speed)
                .call(yGrid);

            var bar = svg.selectAll(".bar")
                .data(sel_data, d => d.attr)
            
            bar.exit().remove();
            
            bar = bar
                .enter().insert("g", ".block")
            .append("rect")
                .attr("class", "bar")
                .attr("fill", "steelblue")
                .attr("width", x.bandwidth())
                .merge(bar)
            
            bar.transition().duration(speed)
                .attr("x", d => x(d.attr))
                .attr("y", d => y(d["score"]))
                .attr("height", d => y(0) - y(d["score"]))

            var text = svg.selectAll(".text")
                .data(sel_data, d => d.attr)
            
            text.exit().remove();
            
            text = text
                .enter().insert("g", ".block")
            .append("text")
                .attr("class", "text")
                .attr("text-anchor", "middle")
                .merge(text);
            
            text.transition().duration(speed)
                .attr("x", d => x(d.attr) + x.bandwidth() / 2)
                .attr("y", function(d) {
                    return (y(d["score"]) > height - margin.top
                        ? y(d["score"]) - 5
                        : y(d["score"]) + 15)
                })
                .attr("fill", function(d) {
                    return (y(d["score"]) > height - margin.top
                        ? "#333"
                        : "#fff")
                })
                .text(d => d["score"]);
        }

        var speed = 500;
        var input = 0;
        var buttonDiv = d3.select("#inputs");
        var viewButton = buttonDiv.append("button")
            .text("View")
            .attr("id", "buttonCentre")
            .classed("Button", true)
            .on('click', function(){
                input = document.getElementById("quantity").value;
                console.log(input);
                update(data, input);
                svg.update = update;
            });

        
        
        
     });

    }

    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default Transition;
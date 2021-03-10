import * as d3 from "d3";
import worldtopo from "../assets/data/world-topo-min.json"


export function test(){
    /*
    d3.select("testmove")
      .data([1,2,3])
      .enter()
      .append("p")
      .text(d =>d)
      .attr("title", d => d+2)
      .attr("id", d=>d+4)
      .on("mouseover", function(d){
          console.log(this)
          console.log(this.title)
          console.log(this.id)
          console.log(d.x)
          console.log(d)
      })
    */
    var svg = d3.select("testmove").append("svg").attr("width", 50)
    .attr("height", 40)
    svg.append("div")
      .attr("class", "labeltooltip")
      .attr("style", "left:"+20+"px;top:"+30+"px")
      .html("Hi")
      

    var countries = topojson.feature(worldtopo, worldtopo.objects.countries).features;
    country = countries.filter(specificCountry)[0] //filter specific country
    var land = country.geometry
    //filter country
    function specificCountry(countries){
      const cty = countries.properties.name
      return cty == "United States"
    }


}

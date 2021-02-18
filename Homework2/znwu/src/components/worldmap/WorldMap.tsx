import { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
// import world from "../../datasets/countries-110m.json";
import "./WorldMap.scss";
import { GeometryCollection, Objects, Topology } from "topojson-specification";
import { GeoJsonProperties } from "geojson";
import { DataEntry } from "../../data";

let world: Topology = require("../../datasets/countries-110m.json");

type Country = GeometryCollection<GeoJsonProperties>;

let allCountries = world.objects.countries as Country;

type TimeSpan = {
  start: Date;
  end: Date;
};

const WorldMap = (props: {
  limit: number;
  data: { [country: string]: DataEntry[] };
  onSelectCountry: (country?: string) => void;
  type: "country" | "region";
}) => {
  const ref = useRef(null);
  let width = 938;
  let height = 500;
  let country = useRef<string | undefined>(undefined);

  useEffect(() => {
    const data = topojson.feature(
      world,
      world.objects.countries as GeometryCollection<GeoJsonProperties>
    ).features;

    for (const countryName in props.data) {
      let match = data.find(
        (geoCountry) => geoCountry.properties!.name === countryName
      );
      if (!match) {
        // console.log(countryName);
      } else {
        match.properties!.events = props.data[countryName];
        match.properties!.ncasualties = props.data[countryName].reduce(
          (value, entry) => value + entry.nkill + entry.nwound,
          0
        );
      }
    }

    // let country: string | undefined = undefined;
    let projection = d3
      .geoMercator()
      .scale(150)
      // .scale((width + 1) / 2 / Math.PI)
      .translate([width / 2, height / 1.5])
      .precision(0.1);

    // const domain = d3.extent(data, function (d) {
    //   return d.properties!.ncasualties as number;
    // }) as [number, number];
    // domain[0] = 0;
    // domain[1] = Math.max(domain[1] ?? 0, props.limit);
    const domain = [0, props.limit];

    var color = d3
      .scaleLinear()
      .domain(domain)
      //@ts-ignore
      .range(["white", "red"]);

    var path = d3.geoPath().projection(projection);
    // var graticule = d3.geoGraticule();

    var svg = d3
      .select(ref.current)
      .append("svg")
      .attr("preserveAspectRatio", "xMidYMid")
      .attr("viewBox", "0 0 " + width + " " + height);
    // .attr("width", width)
    // .attr("height", height);

    svg
      .append("rect")
      .attr("class", "background")
      .attr("width", width)
      .attr("height", height);
    // .on("click", country_clicked);

    var g = svg.append("g");

    var tooltip = d3.select(ref.current).append("div").attr("class", "tooltip");

    g.append("g")
      .attr("id", "countries")
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
      .attr("id", (d) => d.properties!.name)
      .attr("d", path as any)
      .attr("fill", (d) => {
        if (d.properties!.events && d.properties!.events.length) {
          return color(d.properties!.ncasualties);
        }
        return null;
      })
      .on("click", country_clicked as any)
      .on("mousemove", function (event, d) {
        tooltip
          .html(
            d.properties!.name +
              " casualties: <br/>" +
              (d.properties!.ncasualties ?? 0)
          )
          .style("top", d3.pointer(event, svg)[1] + "px")
          .style("left", d3.pointer(event, svg)[0] + 10 + "px")
          // .attr("transform", `translate(${d3.pointer(event, this)})`)
          .raise();
        // console.log(d.properties!.events.map((ev: any) =>  ev.nwound));
      })
      .on("mouseout", function () {
        tooltip.html(null).lower();
      });

    if (country.current) {
      g.select("[id='" + country.current + "']")
        .raise()
        .attr("class", "active");
      // console.log(country.current);
    }

    const pl = 50;
    const pt = height - 50;
    const linearGradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "linearColor")
      //Color gradient direction
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");
    // //Set rectangle bar start color
    linearGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "white");
    // //Set end color
    linearGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "red");

    svg
      .append("rect")
      .attr("x", pl - 30)
      .attr("y", pt - 40) // 83 is the height of the rectangle
      //Width and height of rectangle
      .attr("width", 180)
      .attr("height", 56)
      //Set the color by referring to the id above
      .style("fill", "white");
    svg
      .append("rect")
      //x. Coordinates of the upper left corner of the Y rectangle
      .attr("x", pl)
      .attr("y", pt - 10) // 83 is the height of the rectangle
      //Width and height of rectangle
      .attr("width", 100)
      .attr("height", 16)
      //Set the color by referring to the id above
      .style("fill", "url(#" + linearGradient.attr("id") + ")");
    //Set text

    // Data initial value
    svg
      .append("text")
      .attr("x", pl - 20)
      .attr("y", pt)
      .text(0)
      .classed("linear-text", true);
    // visualMap title
    svg
      .append("text")
      .attr("x", pl + 20)
      .attr("y", pt - 20) // 8 for padding
      .text("Casualties:")
      .classed("linear-text", true);
    //Data terminal value
    svg
      .append("text")
      .attr("x", pl + 100)
      .attr("y", pt) // 12 is the font size
      .text(domain[1])
      .classed("linear-text", true);

    function country_clicked(event: any, d: Country) {
      let xyz = [width / 2, height / 1.5, 1];
      if (country.current) {
        g.selectAll("[id='" + country.current + "']").classed("active", false);
      }
      let newCountry = (d?.properties as any)?.name;
      // console.log(newCountry);
      if (newCountry && country.current !== newCountry) {
        // var xyz = get_xyz(d);
        country.current = newCountry;
        // g.selectAll("#" + country)
      } else {
        country.current = undefined;
      }
      props.onSelectCountry(country.current);
      if (country.current) {
        g.selectAll("[id='" + country.current + "']").attr("class", "active");
      }
      // zoom(xyz);
    }
    return function cleanup() {
      svg.remove();
      tooltip.remove();
    };
  });

  return <div ref={ref} />;
};

export default WorldMap;

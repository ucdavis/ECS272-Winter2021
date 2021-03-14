import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
// import world from "../../datasets/countries-110m.json";
import "./WorldMap.scss";
import { GeometryCollection, Objects, Topology } from "topojson-specification";
import { GeoJsonProperties } from "geojson";
import { DataEntry } from "../../data";
import React from "react";
import { generalVictimType, foodTypeColor } from "../side_panel/side_panel";

let world: Topology = require("../../datasets/countries-110m.json");

type Country = GeometryCollection<GeoJsonProperties>;

type TimeSpan = {
  start: Date;
  end: Date;
};

const WorldMap = (props: {
  // limit: number;
  data: DataEntry[];
  onSelectionChanged: (countries: string[]) => void;
  type: "map" | string;
}) => {
  const ref = useRef(null);
  let width = 938;
  let height = 500;
  let countries = useRef<string[]>([]);

  const xyz = [width / 2, height / 1.5, 1];

  useEffect(() => {
    console.log("drawing")
    const countryData = topojson.feature(
      world,
      world.objects.countries as GeometryCollection<GeoJsonProperties>
    ).features;

    for (const country of props.data) {
      let match = countryData.find(
        (geoCountry) => geoCountry.properties!.name === country.Country
      );
      if (!match) {
        console.log(country.Country);
      } else {
        match.properties!.stat = country;
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
    const domain = [0, 10];

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
      .data(countryData)
      .enter()
      .append("path")
      .attr("id", (d) => d.properties!.name)
      .attr("d", path as any)
      .attr("fill", (d) => {
        let stat = d.properties!.stat as DataEntry | undefined;
        if (stat) {
          return color(stat.Confirmed);
        }
        return null;
      })
      .on("click", country_clicked as any)
      // .on("mousemove", function (event, d) {
      //   tooltip
      //     .html(
      //       d.properties!.name +
      //         " casualties: <br/>" +
      //         (d.properties!.ncasualties ?? 0)
      //     )
      //     .style("top", d3.pointer(event, svg)[1] + "px")
      //     .style("left", d3.pointer(event, svg)[0] + 10 + "px")
      //     .raise();
      // })
      // .on("mouseout", function () {
      //   tooltip.html(null).lower();
      // });
    const ge = g.append("g").attr("id", "events");

    if (xyz) {
      g.attr(
        "transform",
        "translate(" +
          projection.translate() +
          ")scale(" +
          xyz[2] +
          ")translate(-" +
          xyz[0] +
          ",-" +
          xyz[1] +
          ")"
      );
    }
    for (const country of countries.current) {
      g.select("[id='" + country + "']")
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
      let newCountry = (d?.properties as any)?.name;
      if (countries.current.indexOf(newCountry) !== -1) {
        g.selectAll("[id='" + newCountry + "']").classed("active", false);
        countries.current = countries.current.filter(
          (country) => country != newCountry
        );
        props.onSelectionChanged(countries.current);
      } else {
        g.selectAll("[id='" + newCountry + "']")
          .attr("class", "active")
          .raise();
        countries.current = [...countries.current, newCountry];
        props.onSelectionChanged(countries.current);
      }
    }

    function get_xyz(d: Country | undefined) {
      var bounds = path.bounds(d as any);
      var w_scale = (bounds[1][0] - bounds[0][0]) / width;
      var h_scale = (bounds[1][1] - bounds[0][1]) / height;
      var z = 0.96 / Math.max(w_scale, h_scale);
      var x = (bounds[1][0] + bounds[0][0]) / 2;
      var y = (bounds[1][1] + bounds[0][1]) / 2 + height / z / 6;
      return [x, y, z];
    }

    return function cleanup() {
      svg.remove();
      tooltip.remove();
    };
  }, [props.data]);

  const div = useMemo(() => <div ref={ref} />, []);

  return div;
};

// const WorldMap = React.memo(_WorldMap);
export default WorldMap;

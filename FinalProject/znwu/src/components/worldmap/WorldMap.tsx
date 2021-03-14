import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
// import world from "../../datasets/countries-110m.json";
import "./WorldMap.scss";
import { GeometryCollection, Objects, Topology } from "topojson-specification";
import { GeoJsonProperties } from "geojson";
import { DataEntry } from "../../data";
import React from "react";
import { translateFactor } from "../../utils/translate_factor";

let world: Topology = require("../../datasets/countries-110m.json");

type Country = GeometryCollection<GeoJsonProperties>;

const width = 938;
const height = 600;
const xyz = [width / 2, height / 1.5, 1];
const projection = d3
  .geoMercator()
  .scale(150)
  // .scale((width + 1) / 2 / Math.PI)
  .translate([width / 2, height / 1.5])
  .precision(0.1);
const path = d3.geoPath().projection(projection);

const domain = [0, 10];

const deathRateColor = d3
  .scaleLinear()
  .domain(domain)
  //@ts-ignore
  .range(["white", "red"]);

const xmargin = 40;
const ymargin = 40;

function get_xyz(d: Country | undefined) {
  return path.centroid(d as any);
  var bounds = path.bounds(d as any);
  var w_scale = (bounds[1][0] - bounds[0][0]) / width;
  var h_scale = (bounds[1][1] - bounds[0][1]) / height;
  var z = 0.96 / Math.max(w_scale, h_scale);
  var x = (bounds[1][0] + bounds[0][0]) / 2;
  var y = (bounds[1][1] + bounds[0][1]) / 2 + height / z / 6;
  return [x, y, z];
}

const continents = ["AF", "AS", "EU", "NA", "SA", "OC", "UNKNOWN"];

const continentNames = {
  AF: "Africa",
  AS: "Asia",
  EU: "Europe",
  NA: "North America",
  SA: "South America",
  OC: "Oceana",
};

const continentColor: any = {
  NA: "#1f77b4",
  // AS: "#ff7f0e",
  EU: "#2ca02c",
  SA: "#9467bd",
  AF: "#8c564b",
  OC: "#e377c2",
  UNKNOWN: "#7f7f7f",
  AS: "#bcbd22",
  // "#17becf"
};

const WorldMap = (props: {
  // limit: number;
  data: DataEntry[];
  onSelectionChanged: (countries: string[]) => void;
  type: "map" | string;
}) => {
  const ref = useRef(null);
  const div = useMemo(() => <div ref={ref} />, []);

  let countries = useRef<string[]>([]);

  const countryData = useMemo(() => {
    const countryData = topojson.feature(
      world,
      world.objects.countries as GeometryCollection<GeoJsonProperties>
    ).features;

    countryData.forEach(
      (country) => (country.properties!.geo = get_xyz(country as any))
    );
    for (const country of props.data) {
      let match = countryData.find(
        (geoCountry) => geoCountry.properties!.name === country.Country
      );
      if (!match) {
        // console.log(country.Country);
      } else {
        match.properties!.stat = country;
      }
    }
    return countryData;
  }, [props.data]);

  const validCountryData = useMemo(() => {
    const validCountryData = countryData.filter(
      (datum) => datum.properties!.stat?.Confirmed_abs
    );
    validCountryData.sort(
      (a, b) =>
        -a.properties!.stat.Confirmed_abs + b.properties!.stat.Confirmed_abs
    );
    return validCountryData;
  }, [countryData]);

  let [svg, setSvg] = useState<d3.Selection<
    SVGSVGElement,
    any,
    any,
    any
  > | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current).append("svg");
    setSvg(svg);
    return () => {
      svg.remove();
    };
  }, [ref.current]);

  useEffect(() => {
    if (!svg) return;
    svg
      .attr("preserveAspectRatio", "xMidYMid")
      .attr("viewBox", "0 0 " + width + " " + height)
      .append("rect")
      .attr("class", "background")
      .attr("width", width)
      .attr("height", height);
  }, [svg]);

  let [gMap, setGMap] = useState<d3.Selection<
    SVGGElement,
    any,
    any,
    any
  > | null>(null);
  useEffect(() => {
    if (!svg) return;
    const g = svg?.append("g");
    setGMap(g);
    return () => {
      g.remove();
    };
  }, [svg]);

  let [gBub, setGBub] = useState<d3.Selection<
    SVGGElement,
    any,
    any,
    any
  > | null>(null);
  useEffect(() => {
    if (!svg) return;
    const gb = svg?.append("g");
    setGBub(gb);
    return () => {
      gb.remove();
    };
  }, [svg]);

  let [gCor, setGCor] = useState<d3.Selection<
    SVGGElement,
    any,
    any,
    any
  > | null>(null);
  useEffect(() => {
    if (!svg) return;
    const gCor = svg.append("g");
    setGCor(gCor);
    return () => {
      gCor.remove();
    };
  }, [svg, props.type]);

  let [tooltip, setTooltip] = useState<d3.Selection<
    HTMLDivElement,
    any,
    any,
    any
  > | null>(null);
  useEffect(() => {
    if (!ref.current) return;

    const tooltip = d3
      .select(ref.current)
      .append("div")
      .attr("class", "tooltip");
    setTooltip(tooltip);
    return () => {
      tooltip.remove();
    };
  }, [ref.current]);

  function country_clicked(event: any, d: Country) {
    if (!gMap || !svg) return;
    let xyz = [width / 2, height / 1.5, 1];
    let newCountry = (d?.properties as any)?.name;
    console.log("clicked " + newCountry);
    if (countries.current.indexOf(newCountry) !== -1) {
      d3.selectAll(
        "[id='" + newCountry + "'],[id='circ" + newCountry + "']"
      ).classed("active", false);
      countries.current = countries.current.filter(
        (country) => country != newCountry
      );
      props.onSelectionChanged(countries.current);
    } else {
      d3.selectAll("[id='" + newCountry + "'],[id='circ" + newCountry + "']")
        .attr("class", "active")
        .raise();
      countries.current = [...countries.current, newCountry];
      props.onSelectionChanged(countries.current);
    }
  }

  // Draw continent keys
  useEffect(() => {
    if (!svg) return;
    const keyElementWidth = 100;
    const keyElementHeight = 30;
    const keyWidth = keyElementWidth * (continents.length - 1);
    const continentKeyScale = d3
      .scaleBand()
      .domain(continents.filter((continent) => continent != "UNKNOWN"))
      .range([width - keyWidth, width]);

    svg
      .append("g")
      .attr("class", "continent-key")
      // .attr("transform", "translate(0," + height + ")")
      .selectAll("g")
      .data(continents.filter((continent) => continent != "UNKNOWN"))
      .enter()
      .append("g")
      .attr("class", "continent-key-element");

    d3.selectAll("g.continent-key-element")
      .append("rect")
      .attr("width", keyElementWidth)
      .attr("height", keyElementHeight)
      .attr("x", function (d: any) {
        return continentKeyScale(d) as any;
      })
      .attr("fill", function (d: any) {
        return continentColor[d] as any;
      })
      .on("mouseover", function (event, d: any) {
        d3.selectAll(
          continents
            .filter((continent) => continent != d)
            .map((continent) => "." + continent)
            .join(",")
        )
          .transition()
          .duration(1000)
          .attr("opacity", 0);
      })
      .on("mouseout", function (event, d: any) {
        d3.selectAll(continents.map((continent) => "." + continent).join(","))
          .transition()
          .duration(1000)
          .attr("opacity", 1);
      });

    d3.selectAll("g.continent-key-element")
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", function (d: any) {
        return (continentKeyScale(d) as number) + keyElementWidth / 2;
      })
      .text(function (d: any) {
        return (continentNames as any)[d] || continentNames;
      })
      .attr("fill", "white")
      .attr("pointer-events", "none");

    // The text BBox has non-zero values only after rendering
    d3.selectAll("g.continent-key-element text").attr("y", function (d) {
      var textHeight = (this as any).getBBox().height;
      // The BBox.height property includes some extra height we need to remove
      var unneededTextHeight = 4;
      return (keyElementHeight + textHeight) / 2 - unneededTextHeight;
    });
  }, [svg]);

  // Draw world map background
  useEffect(() => {
    if (!svg || !gMap || gMap.empty()) return;
    gMap
      .append("g")
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
          return deathRateColor(stat.DeathRate);
        }
        return null;
      })
      .on("click", country_clicked as any);

    const pl = 30;
    const pt = 40;
    const linearGradient = gMap
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
      .attr("stop-color", "#d62728");

    gMap
      .append("rect")
      .attr("x", pl - 30)
      .attr("y", pt - 40) // 83 is the height of the rectangle
      //Width and height of rectangle
      .attr("width", 180)
      .attr("height", 50)
      //Set the color by referring to the id above
      .style("fill", "white");
    gMap
      .append("rect")
      //x. Coordinates of the upper left corner of the Y rectangle
      .attr("x", pl)
      .attr("y", pt - 10) // 83 is the height of the rectangle
      //Width and height of rectangle
      .attr("width", 100)
      .attr("height", 10)
      //Set the color by referring to the id above
      .style("fill", "url(#" + linearGradient.attr("id") + ")");
    //Set text

    // Data initial value
    gMap
      .append("text")
      .attr("x", pl - 20)
      .attr("y", pt)
      .text(0)
      .classed("linear-text", true);
    // visualMap title
    gMap
      .append("text")
      .attr("x", pl + 20)
      .attr("y", pt - 20) // 8 for padding
      .text("Death Rate:")
      .classed("linear-text", true);
    //Data terminal value
    gMap
      .append("text")
      .attr("x", pl + 100)
      .attr("y", pt) // 12 is the font size
      .text(domain[1] + "%")
      .classed("linear-text", true);
  }, [gMap, props.data]);

  useEffect(() => {
    if (!gMap) return;
    for (const country of countries.current) {
      gMap
        .select("[id='" + country + "']")
        .raise()
        .attr("class", "active");
    }
  }, [gMap, countries.current]);

  // Drawing axis
  useEffect(() => {
    console.log([gCor, props.type]);
    if (!gCor || props.type === "map") return;
    const xExtent = d3.extent(props.data, function (d) {
      return (d as any)[props.type === "map" ? "Obesity" : props.type];
    }) as [number, number];
    xExtent[0] = Math.min(xExtent[0], 0);
    xExtent[1] = Math.max(1, Math.ceil(xExtent[1]));
    const x = d3
      .scaleLinear()
      .domain(xExtent)
      .range([xmargin, width - xmargin]);
    const y = d3
      .scaleLinear()
      .domain([0, 10])
      .range([height - ymargin, ymargin]);
    gCor
      .append("g")
      .attr("transform", "translate(0," + (height - ymargin) + ")")
      .call(d3.axisBottom(x));
    gCor
      .append("g")
      .attr("transform", "translate(" + xmargin + ", 0)")
      .call(d3.axisLeft(y));

    gCor
      .append("text")
      .text(translateFactor[props.type])
      .attr("text-anchor", "middle")
      .attr("transform", "translate(" + width / 2 + "," + (height - 10) + ")");

    gCor
      .append("text")
      .text("Death rate (%)")
      .attr("text-anchor", "middle")
      .attr(
        "transform",
        "translate(" + 20 + "," + height / 2 + ") rotate(-90)"
      );
  }, [gCor, props.data, props.type]);

  // Hide/show map
  useEffect(() => {
    if (props.type != "map") {
      gMap?.transition().duration(1000).attr("opacity", 0);
    } else {
      gMap?.transition().duration(1000).attr("opacity", 1);
    }
  }, [gMap, props.type]);

  useEffect(() => {
    if (!gBub) return;
    gBub
      .attr("id", "bubbles")
      .selectAll("circle")
      .data(validCountryData)
      .enter()
      .append("circle")
      .attr("id", (d) => "circ" + d.properties!.name)
      .attr("class", (d) => d.properties!.stat.Continent)
      .attr("r", (d) => Math.sqrt(d.properties!.stat.Confirmed_abs) / 2000 + 1)
      // .attr("cx", (d) => d.properties!.geo[0])
      // .attr("cy", (d) => d.properties!.geo[1])
      // .attr("pointer-events", "none")
      .attr("fill", (d) => {
        // let stat = d.properties!.stat as DataEntry | undefined;
        // if (stat) {
        //   return color(stat.Confirmed);
        // }
        // return null;
        return continentColor[d.properties!.stat.Continent] as any;
      })
      .on("click", country_clicked as any)
      .on("mousemove", function (event, d: any) {
        if (!tooltip) return;
        const datum = d.properties!.stat as DataEntry;
        tooltip
          .html(
            datum.Country +
              "<br/>Confirmed cases: " +
              datum.Confirmed_abs +
              "<br/> Death rate: " +
              datum.DeathRate.toFixed(2) +
              "%"
          )
          .style("top", d3.pointer(event, svg)[1] + "px")
          .style("left", d3.pointer(event, svg)[0] + 10 + "px")
          .raise()
          .style("display", "block");
      })
      .on("mouseout", function () {
        tooltip?.html(null).lower().style("display", "none");
      });
  }, [props.data, gBub]);

  useEffect(() => {
    if (!gBub) return;
    const xExtent = d3.extent(props.data, function (d) {
      return (d as any)[props.type === "map" ? "Obesity" : props.type];
    }) as [number, number];
    xExtent[0] = Math.min(xExtent[0], 0);
    xExtent[1] = Math.max(1, Math.ceil(xExtent[1]));
    const x = d3
      .scaleLinear()
      .domain(xExtent)
      .range([xmargin, width - xmargin]);
    const y = d3
      .scaleLinear()
      .domain([0, 10])
      .range([height - ymargin, ymargin]);
    function getX(d: any, type: string) {
      if (type == "map") {
        return d.properties!.geo[0];
      } else {
        return x(d.properties!.stat[type]);
      }
    }
    gBub
      .attr("id", "bubbles")
      .selectAll("circle")
      .transition()
      .duration(1000)
      .attr("cx", (d: any) => getX(d, props.type))
      .attr("cy", (d: any) =>
        props.type == "map"
          ? d.properties!.geo[1]
          : y(d.properties!.stat.DeathRate)
      );
  }, [props.data, gBub, props.type]);

  return div;
};

// const WorldMap = React.memo(_WorldMap);
export default WorldMap;

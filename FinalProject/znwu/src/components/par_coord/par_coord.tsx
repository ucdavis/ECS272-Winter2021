import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { DataEntry } from "../../data";
import { icons } from "../../icons/icons";

export const ParCoord = (props: {
  data: DataEntry[];
  onFactorChanged: (factor?: string) => void;
  factor?: string;
  countryColor: any;
}) => {
  const dimensions = [
    "DeathRate",
    "Obesity",
    "Undernourished",
    "Alcohol",
    "Animal",
    "Vegetables",
    "Fruits",
    "Nuts",
    "FishSeafood",
    "Cereals",
    "Milk",
    "StarchyRoots",
    "Sugar",
    "Eggs",
    "Oil",
  ];

  const ref = useRef(null);

  const height = 350;

  const width = 500;

  useEffect(() => {
    const y: any = {};
    console.log(props.data);
    for (let i in dimensions) {
      const name = dimensions[i];
      const extent = d3.extent(props.data, function (d) {
        return (d as any)[name];
      }) as [number, number];
      extent[0] = Math.min(extent[0], 0);
      extent[1] = Math.max(5, Math.ceil(extent[1] / 5) * 5);
      y[name] = d3.scaleLinear().domain(extent).range([height, 0]);
    }

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("preserveAspectRatio", "xMidYMid")
      .attr("viewBox", "0 -50 " + (width + 0) + " " + (height + 60));
    //   .attr("width", width + margin.left + margin.right)
    //   .attr("height", height + margin.top + margin.bottom)
    const g = svg.append("g");
    //   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scalePoint().range([0, width]).padding(1).domain(dimensions);
    function path(d: any) {
      return d3.line()(
        dimensions.map(function (p) {
          return [x(p), y[p](d[p])];
        }) as [number, number][]
      );
    }

    const ga = g
      .selectAll("myAxis")
      // For each dimension of the dataset I add a 'g' element:
      .data(dimensions)
      .enter()
      .append("g")
      .attr("transform", function (d) {
        return "translate(" + x(d) + ")";
      });

    ga.append("rect")
      .attr("width", (d) => 30)
      .attr("transform", "translate(-20, -30)")
      .attr("height", height + 50)
      .attr("fill", (d) => (d === props.factor ? "blue" : "none"))
      .attr("id", (d) => d);

    ga.each(function (d) {
      d3.select(this).call(d3.axisLeft(y[d]));
    })
      .append("image")
      .attr("href", (d: any) => (icons as any)[d])
      .attr("height", 30)
      .attr("width", 30)
      .attr("transform", function (d: any) {
        return "translate(-15, -30)";
      })
      .on("click", factor_clicked);

    g.selectAll("myPath")
      .data(props.data)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", "none")
      .style("stroke", (d) => props.countryColor(d.Country))
      .style("stroke-width", 3)
      .style("opacity", 1);

    function factor_clicked(event: any, d: any) {
      const factor = props.factor;
      console.log("clicked " + d + " with " + factor);
      if (factor !== d) {
        d3.select("#" + factor).attr("fill", null);
        d3.select("#" + d).attr("fill", "blue");
        props.onFactorChanged(d);
      } else {
        d3.select("#" + d).attr("fill", null);
        props.onFactorChanged(undefined);
      }
    }

    return function () {
      svg.remove();
    };
  }, [props.data, props.factor]);

  return <div ref={ref} />;
};

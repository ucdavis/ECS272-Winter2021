import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

import "../css/Chord.css";

const Chord = ({ data, returnClickedItems, toCleanClickedItems }) => {
  const ref = useRef();
  const [clickedItems, setClickedItems] = useState({
    parent: "",
    children: [],
  });

  const width = window.innerHeight;
  const height = window.innerHeight;
  const radius = height / 2.5;
  const horizontalShift = (width * 6) / 12; // it's a global shifting, not related to the grid in Chord.css

  useEffect(() => {
    // Data Preprocessing
    var tmpClickedItems = { ...clickedItems };
    const colorIn = "#00f";
    const colorOut = "#f00";
    const colorNone = "#ccc";
    const nodeColor = {
      Title: "#5DE645",
      Locations: "#E6A42E",
      Director: "#1777E6",
    };
    const tree = d3.cluster().size([2 * Math.PI, radius - 100]);
    const line = d3
      .lineRadial()
      .curve(d3.curveBundle.beta(0.85))
      .radius((d) => d.y)
      .angle((d) => d.x);
    const uniTitle = getColumnUniCount(data, "Title");
    const uniLoc = getColumnUniCount(data, "Locations");
    const uniDirector = getColumnUniCount(data, "Director");
    const data_hierachy = hierachy_SF(data, uniTitle, uniLoc, uniDirector);
    const root = tree(
      bilink(
        d3
          .hierarchy(data_hierachy)
          .sort(
            (a, b) =>
              d3.ascending(a.height, b.height) ||
              d3.ascending(a.data.name, b.data.name)
          )
      )
    );

    const svg = d3.select(ref.current);

    // Clean
    svg.select("#title").remove();
    svg.select("#nodes").remove();
    svg.select("#links").remove();

    // Title
    svg
      .append("text")
      .attr("id", "title")
      .attr(
        "transform",
        "translate(" + -width * 0.3 + " ," + -height * 0.4 + ")"
      )
      .attr("fill", "#737373")
      .attr("font-family", "sans-serif")
      .attr("font-size", 20)
      .attr("text-anchor", "middle")
      .text("Overview");

    // Legend
    svg
      .selectAll("legendDot")
      .data(Object.keys(nodeColor))
      .enter()
      .append("circle")
      .attr("cx", width * 0.25)
      .attr("cy", (d, idx) => -height * 0.4 + idx * 15)
      .attr("r", 3)
      .attr("fill", (d) => nodeColor[d]);

    svg
      .selectAll("legendText")
      .data(Object.keys(nodeColor))
      .enter()
      .append("text")
      .attr("x", width * 0.25 + 10)
      .attr("y", (d, idx) => -height * 0.4 + idx * 15)
      .attr("font-size", 10)
      .attr("fill", (d) => nodeColor[d])
      .text((d) => d)
      .attr("text-anchor", "left")
      .attr("alignment-baseline", "middle");

    // Nodes
    svg
      .append("g")
      .attr("id", "nodes")
      .attr("font-family", "sans-serif")
      .attr("font-size", 8)
      .selectAll("g")
      .data(root.leaves())
      .join("g")
      .attr(
        "transform",
        (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
      )
      .append("text")
      .attr("dy", "0.31em")
      .attr("x", (d) => (d.x < Math.PI ? 6 : -6))
      .attr("fill", (d) => nodeColor[d.parent.data.name])
      .attr("font-weight", (d) =>
        clickedItems.children.includes(d.data.name) ? "bold" : null
      )
      .attr("text-anchor", (d) => (d.x < Math.PI ? "start" : "end"))
      .attr("transform", (d) => (d.x >= Math.PI ? "rotate(180)" : null))
      .text((d) => {
        let text = d.data.name.replaceAll("_", " ");
        return text.length <= 20 ? text : text.slice(0, 20).concat("...");
      })
      .each(function (d) {
        d.text = this;
      })
      .on("click", handleClick)
      .on("mouseover", overed)
      .on("mouseout", outed)
      .call((text) =>
        text.append("title").text(
          (d) => `${id(d).replaceAll(".", " / ")}
        ${d.outgoing.length} outgoing
        ${d.incoming.length} incoming`
        )
      );

    // Links
    const links = svg
      .append("g")
      .attr("id", "links")
      .attr("stroke", colorNone)
      .attr("stroke-width", (d) => "0.075%")
      .attr("fill", "none")
      .selectAll("path")
      .data(root.leaves().flatMap((leaf) => leaf.outgoing))
      .join("path")
      .attr("mix-blend-mode", "multiply")
      .attr("d", ([i, o]) => line(i.path(o)))
      .each(function (d) {
        d.path = this;
      });

    function overed(event, d) {
      links.style("mix-blend-mode", null);
      d3.select(this).attr("font-weight", "bold");
      d3.selectAll(d.incoming.map((d) => d.path))
        .attr("stroke", colorIn)
        .raise();
      d3.selectAll(d.incoming.map(([d]) => d.text))
        .attr("fill", (d) => nodeColor[d.parent.data.name])
        .attr("font-weight", "bold");
      d3.selectAll(d.outgoing.map((d) => d.path))
        .attr("stroke", colorOut)
        .raise();
      d3.selectAll(d.outgoing.map(([, d]) => d.text))
        .attr("fill", (d) => nodeColor[d.parent.data.name])
        .attr("font-weight", "bold");
    }

    function outed(event, d) {
      links.style("mix-blend-mode", "multiply");
      d3.selectAll(d.incoming.map((d) => d.path)).attr("stroke", null);
      d3.selectAll(d.incoming.map(([d]) => d.text))
        .attr("fill", (d) => nodeColor[d.parent.data.name])
        .attr("font-weight", null);
      d3.selectAll(d.outgoing.map((d) => d.path)).attr("stroke", null);
      d3.selectAll(d.outgoing.map(([, d]) => d.text))
        .attr("fill", (d) => nodeColor[d.parent.data.name])
        .attr("font-weight", null);

      if (clickedItems.children.includes(d.data.name)) return;
      d3.select(this).attr("font-weight", null);
    }

    function handleClick(event, d) {
      const clickedParentName = d.parent.data.name;
      const clickedChildrenName = d.data.name;

      if (clickedParentName !== clickedItems.parent) {
        tmpClickedItems = {
          parent: clickedParentName,
          children: [clickedChildrenName],
        };
      } else if (clickedItems.children.includes(clickedChildrenName)) {
        // double click
        tmpClickedItems = {
          ...clickedItems,
          children: clickedItems.children.filter(
            (ele) => ele !== clickedChildrenName
          ),
        };
      } else {
        tmpClickedItems = {
          ...clickedItems,
          children: [...clickedItems.children, clickedChildrenName],
        };
      }

      returnClickedItems(tmpClickedItems);
      setClickedItems((clickedItems) => ({
        ...tmpClickedItems,
      }));
    }
  });
  return (
    <div className="chord">
      <svg className="d3-chord" id={id} viewBox={`0 0 ${width} ${height}`}>
        <g
          ref={ref}
          transform={`translate(${horizontalShift}, ${radius + 40})`}
        ></g>
      </svg>
    </div>
  );
};

const id = (node) => {
  return `${node.parent ? id(node.parent) + "." : ""}${node.data.name}`;
};
const bilink = (root) => {
  const map = new Map(root.leaves().map((d) => [id(d), d]));
  for (const d of root.leaves()) {
    d.incoming = [];
    d.outgoing = d.data.imports.map((i) => [d, map.get(i)]);
  }
  for (const d of root.leaves()) {
    for (const o of d.outgoing) {
      o[1].incoming.push(o);
    }
  }
  return root;
};
const construct_children = (data, tgtData, tgtInfo, restsInfo) => {
  return tgtData.map((tgt) => {
    if (tgt.name === "Others") {
      return {
        name: tgt.name,
        size: tgt.count,
        imports: [],
      };
    }

    const selectedData = data.filter((ele) => ele[tgtInfo.name] === tgt.name);
    let connections = selectedData.map((ele) => {
      var results = [];
      restsInfo.forEach((rest) => {
        if (rest.list.includes(ele[rest.name])) {
          results.push(rest.prefix.concat(ele[rest.name]));
        } else {
          results.push(rest.prefix.concat("Others"));
        }
      });

      return results;
    });
    connections = connections.reduce((acc, curr) => acc.concat(curr), []);
    connections = [...new Set(connections)];

    return {
      name: tgt.name,
      size: tgt.count,
      imports: connections,
    };
  });
};
const hierachy_SF = (data, uniTitle, uniLoc, uniDirector) => {
  const titleInfo = {
    name: "Title",
    prefix: "SF_Films.Title.",
    list: uniTitle.map((ele) => ele.name),
  };
  const locInfo = {
    name: "Locations",
    prefix: "SF_Films.Locations.",
    list: uniLoc.map((ele) => ele.name),
  };
  const directorInfo = {
    name: "Director",
    prefix: "SF_Films.Director.",
    list: uniDirector.map((ele) => ele.name),
  };

  const title = {
    name: "Title",
    children: construct_children(data, uniTitle, titleInfo, [
      locInfo,
      directorInfo,
    ]),
  };
  const loc = {
    name: "Locations",
    children: construct_children(data, uniLoc, locInfo, [
      titleInfo,
      directorInfo,
    ]),
  };
  const director = {
    name: "Director",
    children: construct_children(data, uniDirector, directorInfo, [
      locInfo,
      titleInfo,
    ]),
  };

  return {
    name: "SF_Films",
    children: [title, loc, director],
  };
};
const getColumnUniCount = (data, columnName) => {
  var tgtList = data.map((ele) => ele[columnName]);

  var tmp_counts = {};
  for (var i = 0; i < tgtList.length; i++) {
    tmp_counts[tgtList[i]] = 1 + (tmp_counts[tgtList[i]] || 0);
  }

  const entries = Object.entries(tmp_counts);
  var uniCounts = entries.map((ele) => ({ name: ele[0], count: ele[1] }));
  uniCounts = uniCounts.sort((a, b) => {
    var A = a.count;
    var B = b.count;
    if (A < B) {
      return 1;
    }
    if (A > B) {
      return -1;
    }

    return 0; // if equal
  });

  const others = {
    name: "Others",
    count: uniCounts.slice(59).reduce((acc, curr) => acc + curr.count, 0),
  };

  uniCounts = uniCounts.slice(0, 59);
  uniCounts.push(others);

  return uniCounts;
};

export default Chord;

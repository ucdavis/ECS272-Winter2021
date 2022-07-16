import { useEffect, useRef } from "react";
import { DataEntry } from "../../data";
import * as d3 from "d3";
import * as d3Sankey from "d3-sankey";
import { SankeyLayout } from "d3-sankey";
import { generalVictimType, victimTypeColor } from "../side_panel/side_panel";

export const ParaCoord = (props: {
  data: DataEntry[];
  selectedEvents: { [id: number]: boolean };
}) => {
  const ref = useRef(null);

  useEffect(() => {
    var width = 1000;
    var height = 250;
    var sankey = (d3Sankey as any)
      .sankey()
      .nodeSort(null as any)
      .linkSort(null)
      .nodeWidth(4)
      .nodePadding(20)
      .extent([
        [0, 5],
        [width, height - 5],
      ]);

    var svg = d3
      .select(ref.current)
      .append("svg")
      .attr("preserveAspectRatio", "xMidYMid")
      .attr("viewBox", "0 0 " + width + " " + height);
    // console.log(props.data);

    const graph = generateGraph(
      [...props.data].sort((entry) => entry["targtype1"]),
      [
        ["targtype1", generalVictimType],
        ["attacktype1_txt", (key) => key],
        ["suicide", (key) => (key === "0" ? "Non-Suicide" : "Suicide")],
        ["success", (key) => (key === "0" ? "Failed" : "Success")],
        ["propextent_txt", (key) => key || "No property damage"],
      ],
      (entry) => 1
    );

    const { nodes, links } = sankey({
      nodes: graph.nodes.map((d) => Object.assign({}, d)),
      links: graph.links.map((d) => Object.assign({}, d)),
    });

    svg
      .append("g")
      .selectAll("rect")
      .data(nodes)
      .join("rect")
      .attr("x", (d: any) => d.x0)
      .attr("y", (d: any) => d.y0)
      .attr("height", (d: any) => d.y1 - d.y0)
      .attr("width", (d: any) => d.x1 - d.x0)
      .append("title")
      .text((d: any) => `${d.name}\n${d.value.toLocaleString()}`);

    var color = victimTypeColor;

    svg
      .append("g")
      .attr("fill", "none")
      .selectAll("g")
      .data(links)
      .join("path")
      .attr("d", d3Sankey.sankeyLinkHorizontal() as any)
      .attr("stroke", (d: any) => {
        return color(d.names[0]) as string;
      })
      .attr("stroke-width", (d: any) => d.width)
      .style("mix-blend-mode", "multiply")
      .append("title")
      .text((d: any) => `${d.names.join(" → ")}\n${d.value.toLocaleString()}`);

    svg
      .append("g")
      .style("font", "16px sans-serif")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .attr("x", (d: any) => (d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6))
      .attr("y", (d: any) => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d: any) => (d.x0 < width / 2 ? "start" : "end"))
      .text((d: any) => d.name)
      .append("tspan")
      .attr("fill-opacity", 0.7)
      .text((d: any) => ` ${d.value.toLocaleString()}`);

    return function () {
      svg.remove();
    };
  }, [props]);

  return <div ref={ref} />;
};

function generateGraph<T>(
  data: T[],
  properties: Array<[keyof T, (key: string) => string]>,
  value: (entry: T) => number
) {
  let index = 0;
  const nodes = [];
  const links = [];
  const indexByKey = new Map();
  const nodeByKey = new Map();

  function getPropertyValue(
    entry: T,
    property: [keyof T, (key: string) => string]
  ): string {
    const propertyName = property[0];
    const propertyTransform = property[1];
    return propertyTransform(entry[propertyName] as any);
  }

  for (const property of properties) {
    for (const entry of data) {
      const propertyValue: string = getPropertyValue(entry, property);
      const key = JSON.stringify([property[0], propertyValue]);
      if (nodeByKey.has(key)) continue;
      const node = { name: propertyValue };
      nodes.push(node);
      nodeByKey.set(key, node);
      indexByKey.set(key, index);
      index++;
    }
  }

  for (let i = 1; i < properties.length; i++) {
    const curProperty = properties[i - 1];
    const nextProperty = properties[i];
    const prefix = properties.slice(0, i + 1);
    const linkByKey = new Map();
    for (const entry of data) {
      const names = prefix.map((property) =>
        property[1](entry[property[0]] as any)
      );
      const key = JSON.stringify(names);
      let link = linkByKey.get(key);
      if (link) {
        link.value += value(entry);
        continue;
      }
      link = {
        source: indexByKey.get(
          JSON.stringify([curProperty[0], getPropertyValue(entry, curProperty)])
        ),
        target: indexByKey.get(
          JSON.stringify([
            nextProperty[0],
            getPropertyValue(entry, nextProperty),
          ])
        ),
        names,
        value: value(entry),
      };
      links.push(link);
      linkByKey.set(key, link);
    }
  }
  return { nodes, links };
}

function generateGraph2<T>(
  data: T[],
  properties: Array<[keyof T, (key: string) => string]>,
  value: (entry: T) => number
) {
  let index = 0;
  const nodes = [];
  const links = [];
  const indexByKey = new Map();
  const nodeByKey = new Map();
  const nodeByIndex = new Map<number, { name: string }[]>();

  function getPropertyValue(
    entry: T,
    property: [keyof T, (key: string) => string]
  ): string {
    const propertyName = property[0];
    const propertyTransform = property[1];
    return propertyTransform(entry[propertyName] as any);
  }

  const markedData: {
    entry: T;
    priority: { [id: number]: number | undefined };
  }[] = data.map((entry) => ({
    entry: entry,
    priority: {},
  }));
  for (let i = 0; i < properties.length; i++) {
    const property = properties[i];
    for (const markedEntry of markedData) {
      const propertyValue: string = getPropertyValue(
        markedEntry.entry,
        property
      );
      const key = JSON.stringify([property[0], propertyValue]);
      if (!nodeByKey.has(key)) {
        const node = { name: propertyValue };
        nodes.push(node);
        nodeByKey.set(key, node);
        indexByKey.set(key, index);
        index++;
      }

      markedEntry.priority[i - 1] = markedEntry.priority[i - 1] ?? 0;
      markedEntry.priority[i - 1]! += index;
      markedEntry.priority[i + 1] = markedEntry.priority[i + 1] ?? 0;
      markedEntry.priority[i + 1]! += index;
    }
  }

  data.map((entry) => {});

  for (let i = 1; i < properties.length; i++) {
    const curProperty = properties[i - 1];
    const nextProperty = properties[i];
    const prefix = properties.slice(0, i + 1);
    const linkByKey = new Map();
    const linksInStage = [];
    for (const markedEntry of markedData) {
      const entry = markedEntry.entry;
      const names = properties.map((property) =>
        property[1](entry[property[0]] as any)
      );
      const key = JSON.stringify(names);
      let link = {
        source: indexByKey.get(
          JSON.stringify([curProperty[0], getPropertyValue(entry, curProperty)])
        ),
        target: indexByKey.get(
          JSON.stringify([
            nextProperty[0],
            getPropertyValue(entry, nextProperty),
          ])
        ),
        names,
        entry,
        sourcePriority: markedEntry.priority[i - 1] ?? 0,
        targetPriority: markedEntry.priority[i] ?? 0,
        value: value(entry),
      };
      linksInStage.push(link);
      linkByKey.set(key, link);
    }
    linksInStage.sort(
      (a, b) =>
        a.source - b.source ||
        a.sourcePriority - b.sourcePriority ||
        a.targetPriority - b.targetPriority ||
        getNodeIndex(properties[0][0], a.names[0]) -
          getNodeIndex(properties[0][0], b.names[0])
    );
    links.push(...linksInStage);
  }
  function getNodeIndex(property: keyof T, value: string): number {
    return indexByKey.get(JSON.stringify([property, value]));
  }
  return { nodes, links };
}

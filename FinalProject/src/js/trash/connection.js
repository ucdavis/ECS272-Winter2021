import embed from 'vega-embed'

export function connection(id, width = 400, height = 300){
    let spec = {
        "$schema": "https://vega.github.io/schema/vega/v5.json",
        "width": 900,
        "height": 560,
        "padding": {"top": 25, "left": 0, "right": 0, "bottom": 0},
        "autosize": "none",
      
        "signals": [
          {
            "name": "hover",
            "value": null,
            "on": [
              {"events": "@cell:mouseover", "update": "datum"},
              {"events": "@cell:mouseout", "update": "null"}
            ]
          },
          {
            "name": "title",
            "value": "U.S. Airports, 2008",
            "update": "hover ? hover.name + ' (' + hover.iata + ')' : 'U.S. Airports, 2008'"
          },
          {
            "name": "cell_stroke",
            "value": null,
            "on": [
              {"events": "dblclick", "update": "cell_stroke ? null : 'brown'"},
              {"events": "mousedown!", "update": "cell_stroke"}
            ]
          }
        ],
      
        "data": [
          {
            "name": "states",
            "url": "https://vega.github.io/vega/data/us-10m.json",
            "format": {"type": "topojson", "feature": "states"},
            "transform": [
              {
                "type": "geopath",
                "projection": "projection"
              }
            ]
          },
          {
            "name": "traffic",
            "url": "https://vega.github.io/vega/data/flights-airport.csv",
            "format": {"type": "csv", "parse": "auto"},
            "transform": [
              {
                "type": "aggregate",
                "groupby": ["origin"],
                "fields": ["count"], "ops": ["sum"], "as": ["flights"]
              }
            ]
          },
          {
            "name": "airports",
            "url": "https://vega.github.io/vega/data/airports.csv",
            "format": {"type": "csv", "parse": "auto"},
            "transform": [
              {
                "type": "lookup",
                "from": "traffic", "key": "origin",
                "fields": ["iata"], "as": ["traffic"]
              },
              {
                "type": "filter",
                "expr": "datum.traffic != null"
              },
              {
                "type": "geopoint",
                "projection": "projection",
                "fields": ["longitude", "latitude"]
              },
              {
                "type": "filter",
                "expr": "datum.x != null && datum.y != null"
              },
              {
                "type": "voronoi", "x": "x", "y": "y"
              },
              {
                "type": "collect", "sort": {
                  "field": "traffic.flights",
                  "order": "descending"
                }
              }
            ]
          },
          {
            "name": "routes",
            "url": "https://vega.github.io/vega/data/flights-airport.csv",
            "format": {"type": "csv", "parse": "auto"},
            "transform": [
              {
                "type": "filter",
                "expr": "hover && hover.iata == datum.origin"
              },
              {
                "type": "lookup",
                "from": "airports", "key": "iata",
                "fields": ["origin", "destination"], "as": ["source", "target"]
              },
              {
                "type": "filter",
                "expr": "datum.source && datum.target"
              },
              {
                "type": "linkpath",
                "shape": "line"
              }
            ]
          }
        ],
      
        "projections": [
          {
            "name": "projection",
            "type": "albersUsa",
            "scale": 1200,
            "translate": [{"signal": "width / 2"}, {"signal": "height / 2"}]
          }
        ],
      
        "scales": [
          {
            "name": "size",
            "type": "linear",
            "domain": {"data": "traffic", "field": "flights"},
            "range": [16, 1000]
          }
        ],
      
        "marks": [
          {
            "type": "path",
            "from": {"data": "states"},
            "encode": {
              "enter": {
                "fill": {"value": "#dedede"},
                "stroke": {"value": "white"}
              },
              "update": {
                "path": {"field": "path"}
              }
            }
          },
          {
            "type": "symbol",
            "from": {"data": "airports"},
            "encode": {
              "enter": {
                "size": {"scale": "size", "field": "traffic.flights"},
                "fill": {"value": "steelblue"},
                "fillOpacity": {"value": 0.8},
                "stroke": {"value": "white"},
                "strokeWidth": {"value": 1.5}
              },
              "update": {
                "x": {"field": "x"},
                "y": {"field": "y"}
              }
            }
          },
          {
            "type": "path",
            "name": "cell",
            "from": {"data": "airports"},
            "encode": {
              "enter": {
                "fill": {"value": "transparent"},
                "strokeWidth": {"value": 0.35}
              },
              "update": {
                "path": {"field": "path"},
                "stroke": {"signal": "cell_stroke"}
              }
            }
          },
          {
            "type": "path",
            "interactive": false,
            "from": {"data": "routes"},
            "encode": {
              "enter": {
                "path": {"field": "path"},
                "stroke": {"value": "black"},
                "strokeOpacity": {"value": 0.35}
              }
            }
          },
          {
            "type": "text",
            "interactive": false,
            "encode": {
              "enter": {
                "x": {"signal": "width", "offset": -5},
                "y": {"value": 0},
                "fill": {"value": "black"},
                "fontSize": {"value": 20},
                "align": {"value": "right"}
              },
              "update": {
                "text": {"signal": "title"}
              }
            }
          }
        ]
      }
      console.log(2)
    embed(id, spec, {})

}
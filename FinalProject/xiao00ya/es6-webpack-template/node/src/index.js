// import testData from "./assets/data/test.json"; /* Example of reading in data */
import sfGeoData from "./assets/data/san-francisco-crime-updated1.json";
import detail_to_coarse_map from  "./assets/data/detail_to_coarse_category_map.json";
import coarse_to_detail_map from  "./assets/data/coarse_to_detail_category_map.json";

import SFgeoData_update from "./assets/data/SFN.json";
// import knowlege_dependency from "./assets/data/graph.json";
import knowledge_dependency from "./assets/data/universe_graph.json";
import scatter_knowledge from "./assets/data/counter_universe_graph.json";
import './css/style.scss';
import './css/styles.css'; /* Example of connecting a style-sheet */

// import {drawBarChart} from "./js/barchart"; /* Example of importing one function from a js file for multiple {f(x), f(y), f(z)}*/
// import {drawCrimeTimeBarChart} from "./js/barchart";
// import {updateBar} from "./js/barchart";
// import {updateY} from "./js/barchart";
// import {revertY} from "./js/barchart";
// import {updateLocations} from "./js/geoGraph";
// import {earaseLocations} from "./js/geoGraph";
// import {drawStreamFromCsvAsync} from "./js/streamgraph"; 
// import {drawSF} from "./js/geoGraph";
import {drawStateChart} from "./js/statechart";
import {drawTopicHierarchyAsync} from "./js/topicHiearchy";
import {drawKnowledgeUniverse} from "./js/knowledge_universe";
import {drawOverviewChart} from "./js/staPatterns"
import {drawRefPattern} from "./js/staPatterns"

import * as jquery from "jquery";

// import index from "../src/"
import index from "./util"

// show main page and hide the rest
function show(shown, hidden) {
  document.getElementById(hidden).style.display='none';
  var div_to_show = document.getElementById(shown);
  // div_to_show.style.display='block';
  // div_to_show.fadeIn(400);
  $( hidden ).fadeOut( 10000 );
  $( "#" + shown ).fadeIn( 1000 );
  return false;
}


document.getElementById("next").addEventListener("click", next);

function next() {
  console.log("Click the next button!");
  document.getElementById("demo").innerHTML = "Hello World";
  
  // window.location.replace("test.html");
  // window.location.assign("test.html");
  show("page2", "page1");
  drawStateChart(8, "testDiv");
  
}
document.getElementById("page1").style = "display:block";
document.getElementById("page2").style = "display:block";
document.getElementById("page3").style = "display:block";
document.getElementById("page4").style = "display:block";
document.getElementById("page5").style = "display:block";
drawTopicHierarchyAsync("#hierarchy");
drawKnowledgeUniverse("#universe", knowledge_dependency)
drawKnowledgeUniverse("#universe", scatter_knowledge)

drawOverviewChart("#collaboration");
drawRefPattern("add_ref", "#reference");
drawRefPattern("add_media", "#media");
drawRefPattern("add_info", "#info");
drawRefPattern("reversion", "#revert");
drawRefPattern("remove_info","#rem_info");
drawRefPattern("remove_media","#rem_media");
// drawStreamFromCsvAsync("coarse","#bar");

// drawCrimeTimeBarChart("WEAPON LAWS","#bar1");

// drawSF(sfGeoData, "property crimes","#bar2");




/* 
    TODO: all the other logic for implementing your charts + adding in some basic filters 
    (e.g. dropdown menus for seeing different aspects of the data)
*/


// function init() {
//   console.log("In the initial phase!");
//   if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
//   var $ = go.GraphObject.make;  // for conciseness in defining templates

//   // some constants that will be reused within templates
//   var roundedRectangleParams = {
//     parameter1: 2,  // set the rounded corner
//     spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight  // make content go all the way to inside edges of rounded corners
//   };

//   myDiagram =
//     $(go.Diagram, "myDiagramDiv",  // must name or refer to the DIV HTML element
//       {
//         "animationManager.initialAnimationStyle": go.AnimationManager.None,
//         "InitialAnimationStarting": function(e) {
//             var animation = e.subject.defaultAnimation;
//             animation.easing = go.Animation.EaseOutExpo;
//             animation.duration = 900;
//             animation.add(e.diagram, 'scale', 0.1, 1);
//             animation.add(e.diagram, 'opacity', 0, 1);
//         },

//         // have mouse wheel events zoom in and out instead of scroll up and down
//         "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
//         // support double-click in background creating a new node
//         "clickCreatingTool.archetypeNodeData": { text: "new node" },
//         // enable undo & redo
//         "undoManager.isEnabled": true,
//         positionComputation: function (diagram, pt) {
//           return new go.Point(Math.floor(pt.x), Math.floor(pt.y));
//         }
//       });

//   // when the document is modified, add a "*" to the title and enable the "Save" button
//   myDiagram.addDiagramListener("Modified", function (e) {
//     var button = document.getElementById("SaveButton");
//     if (button) button.disabled = !myDiagram.isModified;
//     var idx = document.title.indexOf("*");
//     if (myDiagram.isModified) {
//       if (idx < 0) document.title += "*";
//     } else {
//       if (idx >= 0) document.title = document.title.substr(0, idx);
//     }
//   });

//   // define the Node template
//   myDiagram.nodeTemplate =
//     $(go.Node, "Auto",
//       {
//         locationSpot: go.Spot.Top,
//         isShadowed: true, shadowBlur: 1,
//         shadowOffset: new go.Point(0, 1),
//         shadowColor: "rgba(0, 0, 0, .14)"
//       },
//       new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
//       // define the node's outer shape, which will surround the TextBlock
//       $(go.Shape, "RoundedRectangle", roundedRectangleParams,
//         {
//           name: "SHAPE", fill: "#ffffff", strokeWidth: 0,
//           stroke: null,
//           portId: "",  // this Shape is the Node's port, not the whole Node
//           fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
//           toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
//           cursor: "pointer"
//         }),
//       $(go.TextBlock,
//         {
//           font: "bold small-caps 11pt helvetica, bold arial, sans-serif", margin: 7, stroke: "rgba(0, 0, 0, .87)",
//           editable: true  // editing the text automatically updates the model data
//         },
//         new go.Binding("text").makeTwoWay())
//     );


//   // unlike the normal selection Adornment, this one includes a Button
//   myDiagram.nodeTemplate.selectionAdornmentTemplate =
//     $(go.Adornment, "Spot",
//       $(go.Panel, "Auto",
//         $(go.Shape, "RoundedRectangle", roundedRectangleParams,
//         { fill: null, stroke: "#7986cb", strokeWidth: 3 }),
//         $(go.Placeholder)  // a Placeholder sizes itself to the selected Node
//       ),
//       // the button to create a "next" node, at the top-right corner
//       $("Button",
//         {
//           alignment: go.Spot.TopRight,
//           click: addNodeAndLink  // this function is defined below
//         },
//         $(go.Shape, "PlusLine", { width: 6, height: 6 })
//       ) // end button
//     ); // end Adornment

//   myDiagram.nodeTemplateMap.add("Start",
//     $(go.Node, "Spot", { desiredSize: new go.Size(75, 75) },
//       new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
//       $(go.Shape, "Circle",
//         {
//           fill: "#52ce60", /* green */
//           stroke: null,
//           portId: "",
//           fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
//           toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
//           cursor: "pointer"
//         }),
//       $(go.TextBlock, "Start",
//         {
//           font: "bold 16pt helvetica, bold arial, sans-serif",
//           stroke: "whitesmoke"
//         })
//     )
//   );

//   myDiagram.nodeTemplateMap.add("End",
//     $(go.Node, "Spot", { desiredSize: new go.Size(75, 75) },
//       new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
//       $(go.Shape, "Circle",
//         {
//           fill: "maroon",
//           stroke: null,
//           portId: "",
//           fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
//           toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
//           cursor: "pointer"
//         }),
//       $(go.Shape, "Circle", { fill: null, desiredSize: new go.Size(65, 65), strokeWidth: 2, stroke: "whitesmoke" }),
//       $(go.TextBlock, "End",
//         {
//           font: "bold 16pt helvetica, bold arial, sans-serif",
//           stroke: "whitesmoke"
//         })
//     )
//   );

//   // clicking the button inserts a new node to the right of the selected node,
//   // and adds a link to that new node
//   function addNodeAndLink(e, obj) {
//     var adornment = obj.part;
//     var diagram = e.diagram;
//     diagram.startTransaction("Add State");

//     // get the node data for which the user clicked the button
//     var fromNode = adornment.adornedPart;
//     var fromData = fromNode.data;
//     // create a new "State" data object, positioned off to the right of the adorned Node
//     var toData = { text: "new" };
//     var p = fromNode.location.copy();
//     p.x += 200;
//     toData.loc = go.Point.stringify(p);  // the "loc" property is a string, not a Point object
//     // add the new node data to the model
//     var model = diagram.model;
//     model.addNodeData(toData);

//     // create a link data from the old node data to the new node data
//     var linkdata = {
//       from: model.getKeyForNodeData(fromData),  // or just: fromData.id
//       to: model.getKeyForNodeData(toData),
//       text: "transition"
//     };
//     // and add the link data to the model
//     model.addLinkData(linkdata);

//     // select the new Node
//     var newnode = diagram.findNodeForData(toData);
//     diagram.select(newnode);

//     diagram.commitTransaction("Add State");

//     // if the new node is off-screen, scroll the diagram to show the new node
//     diagram.scrollToRect(newnode.actualBounds);
//   }

//   // replace the default Link template in the linkTemplateMap
//   myDiagram.linkTemplate =
//     $(go.Link,  // the whole link panel
//       {
//         curve: go.Link.Bezier,
//         adjusting: go.Link.Stretch,
//         reshapable: true, relinkableFrom: true, relinkableTo: true,
//         toShortLength: 3
//       },
//       new go.Binding("points").makeTwoWay(),
//       new go.Binding("curviness"),
//       $(go.Shape,  // the link shape
//         { strokeWidth: 1.5 },
//         new go.Binding('stroke', 'progress', function(progress) {
//           return progress ? "#52ce60" /* green */ : 'black';
//         }),
//         new go.Binding('strokeWidth', 'progress', function(progress) {
//           return progress ? 2.5 : 1.5;
//         })
//         ),
//       $(go.Shape,  // the arrowhead
//         { toArrow: "standard", stroke: null },
//         new go.Binding('fill', 'progress', function(progress) {
//           return progress ? "#52ce60" /* green */ : 'black';
//         })),
//       $(go.Panel, "Auto",
//         $(go.Shape,  // the label background, which becomes transparent around the edges
//           {
//             fill: $(go.Brush, "Radial",
//               { 0: "rgb(245, 245, 245)", 0.7: "rgb(245, 245, 245)", 1: "rgba(245, 245, 245, 0)" }),
//             stroke: null
//           }),
//         $(go.TextBlock, "transition",  // the label text
//           {
//             textAlign: "center",
//             font: "9pt helvetica, arial, sans-serif",
//             margin: 4,
//             editable: true  // enable in-place editing
//           },
//           // editing the text automatically updates the model data
//           new go.Binding("text").makeTwoWay())
//       )
//     );

//   // read in the JSON data from the "mySavedModel" element
//   load();
// }

// // Show the diagram's model in JSON format
// function save() {
//   document.getElementById("mySavedModel").value = myDiagram.model.toJson();
//   myDiagram.isModified = false;
// }
// function load() {
//   myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
// }



// function init() {
// 	if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
// 	var $ = go.GraphObject.make;  // for conciseness in defining templates
// 	myDiagram = $(go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
// 				  {
// 		"undoManager.isEnabled": true  // enable undo & redo
// 	});
// 	// define a simple Node template
// 	myDiagram.nodeTemplate =
// 		$(go.Node, "Auto",  // the Shape will go around the TextBlock
// 		  $(go.Shape, "RoundedRectangle", { strokeWidth: 0, fill: "white" },
// 			// Shape.fill is bound to Node.data.color
// 			new go.Binding("fill", "color")),
// 		  $(go.TextBlock,
// 			{ margin: 8, font: "bold 14px sans-serif", stroke: '#333' }, // Specify a margin to add some room around the text
// 			// TextBlock.text is bound to Node.data.key
// 			new go.Binding("text", "key"))
// 		 );
// 	// but use the default Link template, by not setting Diagram.linkTemplate
// 	// create the model data that will be represented by Nodes and Links
// 	myDiagram.model = new go.GraphLinksModel(
// 		[
// 			{ key: "Alpha", color: "lightblue" },
// 			{ key: "Beta", color: "orange" },
// 			{ key: "Gamma", color: "lightgreen" },
// 			{ key: "Delta", color: "pink" }
// 		],
// 		[
// 			{ from: "Alpha", to: "Beta" },
// 			{ from: "Alpha", to: "Gamma" },
// 			{ from: "Beta", to: "Beta" },
// 			{ from: "Gamma", to: "Delta" },
// 			{ from: "Delta", to: "Alpha" }
// 		]);
// }
// ;
// if(window.init) {init();}
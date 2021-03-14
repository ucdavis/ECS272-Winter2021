import * as d3 from "d3";

export function drawAnnotation1(svgPipes, leftPoint, length){
	console.log("Drawing ANnotation 1");
	d3.select('foreignObject').remove("*");

		svgPipes.append('foreignObject')
                        .attr('x', 1)
                        .attr('y', 0)
                        .attr('width', leftPoint-10)
                        .attr('height', length)
                        .style("fill", "#D3D3D3")
                        .append("xhtml:body")
    .html('<div style="width: 150px; background: #D3D3D3; border: 1px solid black;  text-align: justify; padding-right: 2px; padding-left: 2px; overflow-y: auto;" id="textDiv">Finally, we have a set of pipes that connect the water tank to the wells. This will allow each article, represented by a circle, to flow from the water tank to the corresponding event topic the article&#39;s content is mostly about.</div>');

    d3.select("#textDiv").style("width", (leftPoint -10) + "px").style("height", length + "px").style("max-height", length + "px");
}

export function drawAnnotation2(svgPipes, leftPoint, length){
	console.log("Drawing ANnotation 2");
	d3.select('foreignObject').remove("*");

		svgPipes.append('foreignObject')
                        .attr('x', 1)
                        .attr('y', 0)
                        .attr('width', leftPoint-10)
                        .attr('height', length)
                        .style("fill", "#D3D3D3")
                        .append("xhtml:body")
    .html('<div style="width: 150px; background: #D3D3D3; border: 1px solid black;  text-align: justify; padding-right: 2px; padding-left: 2px; overflow-y: auto;" id="textDiv">Now we are going to show you some findings. To speed up the process the current screen has already animated the water droplets going to the wells that were published from April 1, 2020 to June 24, 2020. Click the <strong>PLAY</strong> button to see the animation of the last five days of the dataset.</div>');

    d3.select("#textDiv").style("width", (leftPoint -10) + "px").style("height", length + "px").style("max-height", length + "px");
}

export function drawAnnotation3(svgPipes, leftPoint, length){
	console.log("Drawing ANnotation 3");
	d3.select('foreignObject').remove("*");

		svgPipes.append('foreignObject')
                        .attr('x', 1)
                        .attr('y', 0)
                        .attr('width', leftPoint-10)
                        .attr('height', length)
                        .style("fill", "#D3D3D3")
                        .append("xhtml:body")
    .html('<div style="width: 150px; background: #D3D3D3; border: 1px solid black;  text-align: justify; padding-right: 2px; padding-left: 2px; overflow-y: auto;" id="textDiv">Now the water tank is all the articles that went into the Health System Policies and the wells are sub events of Health System Policies. We again fast forward animation to show the final results. Shockingly important topics such as investments, and facial coverings are barely talked about. Additionally, single clicking on the green well and clicking on water droplets shows that most of the articles also had some content about Public Info Campaigns, making it clear a bias towards this topic. Click the green well again to exit the view. Click <strong>NEXT</strong> to explore yourself.</div>');

    d3.select("#textDiv").style("width", (leftPoint -10) + "px").style("height", length + "px").style("max-height", length + "px");
}
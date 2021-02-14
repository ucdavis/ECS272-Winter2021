import {draw_streamgraph_domestic} from "./steamgraph_domestic.js";
import {draw_streamgraph_international} from "./streamgraph_international.js"
import {draw_streamgraph_all} from "./steamgraph_all.js"

import {draw_pie_chart_arrival} from './piechartarrival.js'
import {draw_pie_chart_depature} from './piechartdepature.js'
import {draw_bar_chart} from './barchart.js'


function calcDom(name) {
    return {
        id: name,
        width: d3.select(name).style('width').slice(0, -2),
        height: d3.select(name).style('height').slice(0, -2)
    };
}

const onchangeSelector = () => {
    console.log("selector 1 changed");
    var obj = document.getElementById("view_selector");
    var sele = obj.options;
    obj.onchange = function () {
        var index = obj.selectedIndex;
        d3.select('#streamgraph_svg_area')
            .selectAll('*')
            .remove();
        if (sele[index].value === '1') {
            draw_streamgraph_all(calcDom('#streamgraph_svg_area'));
        } else if (sele[index].value === '2') {
            draw_streamgraph_domestic(calcDom('#streamgraph_svg_area'));
        } else if (sele[index].value === '3') {
            draw_streamgraph_international(calcDom('#streamgraph_svg_area'));
        }
    };
};

const onchangeSelector2 = () => {
    console.log("selector 2 changed");
    var obj = document.getElementById("view_selector2");
    var sele = obj.options;
    obj.onchange = function () {
        var index = obj.selectedIndex;
        d3.select('#piechart_svg_area')
            .selectAll('*')
            .remove();
        if (sele[index].value === '1') {
            draw_pie_chart_arrival(calcDom('#piechart_svg_area'));
        } else if (sele[index].value === '2') {
            draw_pie_chart_depature(calcDom('#piechart_svg_area'));
        }
    };
};

const onchangeSlider = () => {
    console.log("Slider changed");
    var obj = document.getElementById("month_range");
    // console.log(obj.id, obj.value);
    obj.onchange = function () {
        d3.select('#barchart_svg_area')
            .selectAll('*')
            .remove();
        draw_bar_chart(calcDom('#barchart_svg_area'), obj.value);
    };
};


draw_streamgraph_all(calcDom('#streamgraph_svg_area'));
draw_pie_chart_arrival(calcDom('#piechart_svg_area'));
draw_bar_chart(calcDom('#barchart_svg_area'), "7");

onchangeSelector();
onchangeSelector2();
onchangeSlider();
import * as d3 from "d3";
import csvPath from '../assets/data/TopArtistbyCent.csv';
import newcsv from '../assets/data/TopArtistsDecadeNew.csv';

export async function drawStackedBarChartTopArtist(selectedOption){

    
    var myElement = document.getElementById("stackedbarcharttopartist");

    if(myElement){
        //#myElementID element DOES exists
        d3.select("#remove_svg").remove();
    }
    
    
    // set the dimensions and margins of the graph
    var margin = {top: 40, right: 20, bottom: 30, left: 30},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;


    // append the svg object to the body of the page
    var svg1 = d3.select("#stackedbarcharttopartist")
                .append("svg")
                .attr("id","remove_svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");



    
    // const data = await d3.csv(csvPath);
    const data2 = await d3.csv(newcsv);


    // var subgroups = data.columns.slice(1)
    // var subgroups = data2.columns.slice(1)
    // subgroups.pop(); 
    // remove topartist field
    var subgroups = ['artist1','artist2','artist3','artist4','artist5'];
    console.log("Sliceeee: " + subgroups)


    // var groups = d3.map(data, function(d){
    //     console.log(d.year);
    //     return d.year}).sort()
    // removed keys as it was not needed, instead sorted the data
    var groups = d3.map(data2, function(d){
        return d.year}).sort()
    groups = [... new Set(groups)]; //another way to get unique values (https://stackoverflow.com/a/42123984)

    console.log("Groupsssss: " + groups)


    
    var x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.2])
        svg1.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSizeOuter(0));


    var y = d3.scaleLinear()
                .domain([0,5])
                .range([ height, 0 ]);
        svg1.append("g")
            .call(d3.axisLeft(y));

    var color = d3.scaleOrdinal()
                .domain(subgroups)
                .range(['#fcd471','#fbafa1','#fb84ce', '#ef54f1', '#c4fa7'])

      

    
    

    // console.log("Xxxxxxx..." + x(1950))
    var dropDownValue=selectedOption;

    //https://www.javatpoint.com/how-to-create-dropdown-list-using-javascript
    
    
    // function selectedAttr() {  
    //     var mylist = document.getElementById("selectButton1");  
    //     const dropDownValueOpt = mylist.options[mylist.selectedIndex].text; 
    //     return dropDownValueOpt; 
    //     }  

    // //$("#selectButton1").on("change", selectedAttr);
    // var dropDownValue = selectedAttr();


    console.log("Valueeeeeee:   " + dropDownValue)


    function getBarValue(data,groups,dropDownValue){
        var y_array = [];
        for (let y in groups){
            var y_value = {};
        for(var i =0 ; i<data.length; i++){
            var row=data[i];
                if (row.year === groups[y]){
                    if (!y_value['year']){y_value['year']=groups[y]}
                    if (!y_value[row.topartist]){y_value[row.topartist]=row[dropDownValue];}
                }
            }
            y_array.push(y_value);
        }
        return y_array; 
    };

    var y_test = getBarValue(data2,groups,dropDownValue);
    // console.log(y_test)
    var stackedData = d3.stack()
                        .keys(subgroups)(y_test)
    console.log(stackedData);
    // Show the bars

    svg1.append("g")
        .selectAll("g")
        .data(stackedData)
        .enter().append("g")
            .attr("fill", function(d) { return color(d.key); })
            .selectAll("rect")
            .data(function(d) { return d; })
        .enter().append("rect")
                .attr("x", function(d) { return x(d.data.year); })
                .attr("y", function(d) { return y(d[1]); })
                .attr("height", function(d) { return y(d[0]) - y(d[1]); })
                .attr("width",x.bandwidth())
                .append("title")

    //https://bl.ocks.org/ricardo-marino/ca2db3457f82dbb10a8753ecba8c0029
    // svg1.selectAll("rect")
    //     .transition()
    //     .duration(800)
    //     .attr("y", function(d) { return y(d[1]); })
    //     .attr("height", function(d) { return y(d[0]) - y(d[1]); })
    //     .delay(function(d,i){console.log(i) ; return(i*1000)})
      
        
    
    var colors = [ '#fcd471','#fbafa1','#fb84ce', '#ef54f1', '#c4fa7']
    var attr = ['artist1','artist2','artist3','artist4','artist5']
    var padding = 450;
    
        
        
        var legend = svg1.append('g')
                    .attr('class', 'legend')
                    .attr('transform', 'translate(' + (padding + 12) + ', 0)');
    
                legend.selectAll('rect')
                    .data(attr)
                    .enter()
                    .append('rect')
                    .attr('x', 0)
                    .attr('y', function(d, i){
                        return i + 16;
                    })
                    .attr('width', 10)
                    .attr('height', 10)
                    .attr('fill', function(d, i){
                        return colors[i];
                    });
                
                legend.selectAll('text')
                    .data(attr)
                    .enter()
                    .append('text')
                    .text(function(d){
                        return d;
                    })
                    .attr('x', 16)
                    .attr('y', function(d, i){
                        return i + 16;
                    })
                    .attr('text-anchor', 'start')
                    .attr('alignment-baseline', 'hanging');
           
}
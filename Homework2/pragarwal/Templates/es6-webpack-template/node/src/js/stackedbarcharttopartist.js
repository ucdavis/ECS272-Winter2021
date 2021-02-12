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


        
        
        
      //.text(d => `${d.data.year} ${d.key}`);

    // svg.append("g")
    // .selectAll("g")
    // .data(stackedData)
    // .join("g")
    //   .attr("fill", d => color(d.key))
    // .selectAll("rect")
    // .data(d => d)
    // .join("rect")
    //   .attr("x", d => x(d.data.year))
    //   .attr("y", d => y(d[1]))
    //   .attr("height", d => y(d[0]) - y(d[1]))
    //   .attr("width", x.bandwidth())
    // .append("title")
    
}


// import * as d3 from "d3";
// import csvPath from '../assets/data/TopArtistbyCent.csv';

// export async function drawStackedBarChartTopArtist(){

//     // set the dimensions and margins of the graph
//     var margin = {top: 40, right: 20, bottom: 30, left: 30},
//     width = 600 - margin.left - margin.right,
//     height = 300 - margin.top - margin.bottom;

//     // append the svg object to the body of the page
//     var svg = d3.select("#stackedbarcharttopartist")
//                 .append("svg")
//                 .attr("width", width + margin.left + margin.right)
//                 .attr("height", height + margin.top + margin.bottom)
//                 .append("g")
//                 .attr("transform",
//                     "translate(" + margin.left + "," + margin.top + ")");


//     const data = await d3.csv(csvPath);

//     var subgroups = data.columns.slice(1)

//     console.log("Sliceeee: " + data.columns.slice(1))


//     var groups = d3.map(data, function(d){return(d.year)}).keys()

//     console.log("Groupsssss: " + groups)


    
//     var x = d3.scaleBand()
//         .domain([1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020])
//         .range([0, width])
//         .padding([0.2])
//         svg.append("g")
//             .attr("transform", "translate(0," + height + ")")
//             .call(d3.axisBottom(x).tickSizeOuter(0));


//     var y = d3.scaleLinear()
//                 .domain([0, 5])
//                 .range([ height, 0 ]);
//                 svg.append("g")
//                 .call(d3.axisLeft(y));

//     var color = d3.scaleOrdinal()
//                 .domain(subgroups)
//                 .range(['#fcd471','#fbafa1','#fb84ce', '#ef54f1', '#c4fa7'])

      

//     var stackedData = d3.stack()
//                         .keys(subgroups)
//                         (data)


//     console.log("Xxxxxxx..." + x(1950))

//     // Show the bars
//     svg.append("g")
//     .selectAll("g")
//     .data(stackedData)
//     .enter().append("g")
//         .attr("fill", function(d) { return color(d.key); })
//     .selectAll("rect")
//     .data(function(d) { return d; })
//     .enter().append("rect")
//         .attr("x", function(d) { return x(d.data.year); })
//         .attr("y", function(d) { return y(d[1]); })
//         .attr("height", function(d) { return y(d[0]) - y(d[1]); })
//         .attr("width",x.bandwidth())
//         .append("title")
//       //.text(d => `${d.data.year} ${d.key}`);

//     // svg.append("g")
//     // .selectAll("g")
//     // .data(stackedData)
//     // .join("g")
//     //   .attr("fill", d => color(d.key))
//     // .selectAll("rect")
//     // .data(d => d)
//     // .join("rect")
//     //   .attr("x", d => x(d.data.year))
//     //   .attr("y", d => y(d[1]))
//     //   .attr("height", d => y(d[0]) - y(d[1]))
//     //   .attr("width", x.bandwidth())
//     // .append("title")
    
// }
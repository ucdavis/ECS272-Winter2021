import * as d3 from "d3";
import {getLargestTagName, getNumberEventsAtLevel}  from "./sharedFunctions";

export function getWaterTankPercentage(month, day, firstMonth, firstDay, data, total_size){
	console.log(" in getWaterTankPercentage data", data, "total_size ", total_size);

	var dataArr = data.news_details;
	var indexMonthDayArr = [];
	var monthNames = ["Apr", "May", "Jun"];
	var monthDays = [30, 31, 30];

	dataArr.forEach(function(d,i){
      //console.log("d is ", d);

      //Get Month and Day
      var strSplit = d.time.split("T");
      //console.log("strSplit ", strSplit);
      var strSplit2 = strSplit[0].split("-");
      //console.log("strSplit2 ", strSplit2);
      var currMonth = parseInt(strSplit2[1]);
      var currDay = parseInt(strSplit2[2]);
      //console.log("currMonth ", currMonth, " currDay ", currDay);

      if(currMonth < month){
      	indexMonthDayArr.push(d);
      }else if(currMonth == month){
      	if(currDay <= day){
      		indexMonthDayArr.push(d);
      	}
      }
    })//end for each

  	console.log("indexMonthDayArr ", indexMonthDayArr);

  	var numberRes = (95*(total_size - indexMonthDayArr.length))/total_size;

  	return indexMonthDayArr.length;

}


export function getWellsPercentage(month, day, data, total_size, parentLevel){
	console.log(" in getWellsPercentage data", data, "total_size ", total_size);

	var dataArr = data.news_details;
	var indexMonthDayArr = [];
	var [numEvents, childrenEvents] = getNumberEventsAtLevel(parentLevel, dataArr);
	var numPerEvent = []


	childrenEvents.forEach(function(d,i){
		numPerEvent.push(0);
	})

	dataArr.forEach(function(d,i){
      //console.log("d is ", d);

      //Get Month and Day
      var strSplit = d.time.split("T");
      //console.log("strSplit ", strSplit);
      var strSplit2 = strSplit[0].split("-");
      //console.log("strSplit2 ", strSplit2);
      var currMonth = parseInt(strSplit2[1]);
      var currDay = parseInt(strSplit2[2]);
      //console.log("currMonth ", currMonth, " currDay ", currDay);

      if(currMonth < month){
      	indexMonthDayArr.push(d);
      	var largTag = getLargestTagName(parentLevel, d);
      	//console.log("largTag ", largTag);
      	//console.log("childrenEvents", childrenEvents)
      	var index = childrenEvents.indexOf(largTag);
      	numPerEvent[index] = numPerEvent[index] + 1;
      }else if(currMonth == month){
      	if(currDay <= day){
      		indexMonthDayArr.push(d);
      		var largTag = getLargestTagName(parentLevel, d);
      		var index = childrenEvents.indexOf(largTag);
      		numPerEvent[index] = numPerEvent[index] + 1;
      	}
      }
    })//end for each

    //console.log("numPerEvent ", numPerEvent);

    // numPerEvent.forEach(function(d,i){
    // 	numPerEvent[i] = (numPerEvent[i]/total_size)*100;
    // })

    return numPerEvent;
}

import * as d3 from "d3";


//Recursive Functoin to Get Number of Event Categories and those Event Category Names at Given Level Name
export function recurseNumberEventsAtLevel(levelName, childrenArr, currName){
	var res = 0;
	var childrenRes = [];
	// else if(childrenArr == undefined){
	// 	return [0, []];


	if(childrenArr == undefined){
		return [0, []];
	}else if(levelName == currName){
		var temp = [];
		for(var j = 0; j < childrenArr.length;j++){
			temp.push(childrenArr[j].event);
		}
		return [childrenArr.length, temp];
	}else{
		for(var i = 0; i < childrenArr.length; i++){
			[res, childrenRes] = recurseNumberEventsAtLevel(levelName, childrenArr[i].children, childrenArr[i].event);

			if(res != 0){
				break;
			}
		}
		
	}
	return [res, childrenRes];
}//end function

//Gets the number of event categories and their names at a given level name
export function getNumberEventsAtLevel(levelName, data){
	var res = 0;
	var childrenRes = [];

	//console.log("data in getNumberEventsAtLevel", data)


	var firstElement = data[0].tags;
	var eventName = firstElement[0].event;

	[res, childrenRes] = recurseNumberEventsAtLevel(levelName, firstElement[0].children, eventName);

	return [res, childrenRes];
}

function recurseLargestTagName(parentLevel, currentLevel, currentChildren){
	var result;
	if(currentLevel == parentLevel){
		//get largest child
		var maxPercentage = 0;
		var maxChild = "";

		for(var i = 0; i < currentChildren.length;i++){
			if(currentChildren[i].percentage > maxPercentage){
				maxPercentage = currentChildren[i].percentage;
				maxChild = currentChildren[i].event;
			}
		}

		//console.log("maxChild ", maxChild);

		return maxChild;
	}else if(currentChildren == undefined){
		//console.log("no children for ", currentLevel);
		return null;
	}else{
		// console.log("here 2 recurseLargestTagName");
		var res = "none";
		for(var i = 0; i < currentChildren.length;i++){
			// console.log("currentChildren.length ", currentChildren.length, " i ", i);
			// console.log("here 2 recurseLargestTagName new event ", currentChildren[i].event);
			res = recurseLargestTagName(parentLevel, currentChildren[i].event, currentChildren[i].children);

			if(res != null){
				//console.log("here for not none");
				result = res;
				break;
			}
		}
	}

	return result;
}


//Gets name of largest tag
export function getLargestTagName(parentLevel, d){
	var firstElement = d.tags[0];
	//console.log("firstElement ", firstElement);

	var ans = recurseLargestTagName(parentLevel, d.tags[0].event, d.tags[0].children);
	//console.log("ans = ", ans);
	return ans;
}
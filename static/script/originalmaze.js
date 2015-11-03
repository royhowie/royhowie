var width = $(document).width() - 10,
	height = $(document).height() + 20,
	bar = 8,
	drawTime = 100;

var colors = ["rgb(73,186,57)", "rgb(255,127,127)", "steelblue"], 		//electric blue: "#000fff", 
	color = "#4682b4";//colors[Math.floor(Math.random()*colors.length)];

var svg = d3.select("body")
		.append("svg")
		.attr("width", width)
		.attr("height", height);

var draw = function (row, col, direction) {
	var deltaX = 0, deltaY = 0, gap = 20;

	//location is in the form of [row, col]
	//direction is 1 through 4 for N, S, W, E

	if (direction == 1)			//North
		deltaY = -4 - gap;
	else if (direction == 2)	//South
		deltaY = gap + 4;
	else if (direction == 3)	//West
		deltaX = -4 - gap;
	else if (direction == 4)	//East
        deltaX = gap + 4;
		// deltaY = gap + 4;
	else
		return true;
	

	svg.append("line")
	 	.attr("stroke", color)
	 	.attr("stroke-width", bar)
	 	.attr("x1", 6 + gap*row)
	 	.attr("y1", 6 + gap*col)
	 	.attr("x2", 6 + gap*row)
	 	.attr("y2", 6 + gap*col)
	 .transition()
	 .duration(drawTime)
	 	.attr("x2", 6 + gap*row + deltaX)
	 	.attr("y2", 6 + gap*col + deltaY);
}
var graph = [], stack = [];

var run = function() {
	fill();
	step(0,0);
}
var fill = function() {
	var x = Math.floor(width/20) + 2,
		y = Math.floor(height/20) + 1;
	for (var i = 0; i < x; i++) {
		var row = new Array();
		for (var k = 0; k < y; k++)
			row[k] = 0;
		graph[i] = row;
	}
}
var step = function (row, col) {
	var location = [row, col];
	graph[row][col] = 1;

	stack.push(location);

	var next = empty(row, col);

	draw(row, col, next);

	if (next === 1)
		setTimeout(function(){ step(row, col - 1)}, drawTime);
	else if (next === 2)
		setTimeout(function(){ step(row, col + 1)}, drawTime);
	else if (next === 3)
		setTimeout(function(){ step(row - 1, col)}, drawTime);
	else if (next === 4)
		setTimeout(function(){ step(row + 1, col)}, drawTime);
	else if (next === 0 && stack.length > 0 && !(row == 0 && col == 0)) {
		while (stack.length > 0){
			var place = stack.pop();
			if (empty(place[0], place[1]) !== 0)	break;
		}
		setTimeout(function(){ step(place[0], place[1])}, drawTime);
	}
	else
		console.log("finished");
}
var empty = function (row, col){
	var holder = new Array();

	if (col > 0 && graph[row][col-1] === 0)
		holder.push(1);	//north
	if (col < graph[row].length - 2 && graph[row][col+1] === 0)
		holder.push(2);	//south
	if (row > 0 && graph[row-1][col] === 0)
		holder.push(3);	//west
	if (row < graph.length - 2 && graph[row+1][col] === 0)
		holder.push(4);	//east

	return holder[Math.floor(Math.random() * holder.length)] | 0;
}
run();


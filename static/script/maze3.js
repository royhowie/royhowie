/* 
    color options:
        rgb(73,186,57)
        rgb(255,127,127)
        steelblue
        #000fff             // electric blue
*/

var barWidth = 30
  , color = "#4682b4"
  , drawTime = 100
  , gap = 32
  , height = $(document).height() + 20
  , width = $(document).width() - 10
  ;

var graph = fill()
  , stack = []
  ;

var svg = d3.select("body").append("svg").attr("width", width).attr("height", height);

function draw (location, direction) {
    var deltaX = 0
      , deltaY = 0
      , x = 6 + gap * location[0]
      , y = 6 + gap * location[1]
      // , row = location[0]
      // , col = location[1]
      ;

    var distance = gap + (barWidth >> 1)
      , vector = Math.pow(-1, direction % 2) * distance
      ;

    switch (direction) {
        case 1: deltaY = vector; break;   // North
        case 2: deltaY = -vector; break;    // South
        case 3: deltaX = vector; break;   // East
        case 4: deltaX = -vector; break;    // West
    }
    
    svg.append("line")
        .attr("stroke", color)
        .attr("stroke-width", barWidth)
        .attr("x1", x)
        .attr("y1", y)
        .attr("x2", x)
        .attr("y2", y)
     .transition()
     .duration(drawTime)
        .attr("x2", x + deltaX)
        .attr("y2", y + deltaY);
}
function empty (location) {
    var row = location[0]
      , col = location[1]
      , holder = []
      ;

    if (col > 0 && graph[row][col - 1] === 0)
        holder.push(1); // north
    if (col < graph[row].length - 2 && graph[row][col + 1] === 0)
        holder.push(2); // south
    if (row > 0 && graph[row - 1][col] === 0)
        holder.push(3); // west
    if (row < graph.length - 2 && graph[row + 1][col] === 0)
        holder.push(4); // east

    return getRandom(holder) || 0;
}
function fill () {
    var x = (2 + width/20) | 0
      , y = (1 + height/20) | 0
      , holder = [];
      ;

    for (var i = x - 1; i--;) {
        holder[i] = [];
        for (var j = y - 1; j--;) {
            holder[i][j] = 0;
        }
    }
    return holder;
}
function getRandom (arr) {
    var pos = (arr.length * Math.random()) | 0;
    return arr[pos] | 0;
}
function step (location) {
    var row = location[0]
      , col = location[1]
      , place = []
      ;

    graph[row][col] = 1;
    stack.push(location);

    var next = empty(location);

    draw(location, next);

    if (next) {
        switch (next) {
            case 1: place = [row, col - 1]; break;
            case 2: place = [row, col + 1]; break;
            case 3: place = [row - 1, col]; break;
            case 4: place = [row + 1, col]; break;
        }
        // place = [ row + (next > 2) * (next * 2 - 7) , col + (next < 3) * (next * 2 - 3)]
    } else if (!next && (row || col) && stack.length) {
        place = stack.pop();
        while (!empty(place)) {
            place = stack.pop();
        }
    }

    if (place) {
        setTimeout(step.bind(null, place), drawTime);
    } else {
        console.log("finished");
    }
}

$(document).ready(step.bind(null, [0, 0]));
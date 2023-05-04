//Your JavaScript goes in here
// Hello World 
// document.write("Hello World");
import { makeGrid, addFinalStates, completedOrNot, isTerminalState, isObstacle, addObstacles, getNeighbours, calculateNewValue, nextCell, DIRECTIONS, getDirection } from "./required-functions.js";
// window.simulationStatus = simulationStatus;
window.initialize = initialize;
window.change_interval = change_interval;

var grid, newGrid;
var iterations = 1;
var nextCellToCalculate = [2, 0];
var curSteps = 0;
var reward = -0.1, gamma = 0.9, epsilon = 0.3, alpha = 0.1;
var clicks = 0, timer;


var time;

function createEquation(current_q_sa, max_next_q_sa, action, display = 1) {
	let action_char = 'L';
	if (action == 1)
		action_char = 'U'
	else if (action == 2)
		action_char = 'R'
	else if (action == 3)
		action_char = 'D'
	let result_val = current_q_sa + alpha * (reward + gamma * max_next_q_sa - current_q_sa);
	let equation_str = showNumber(current_q_sa) + " + " + showNumber(alpha) + " * ( " + showNumber(reward) + " + " + showNumber(gamma) + " * " + showNumber(max_next_q_sa) + " - ( " + showNumber(current_q_sa) + " ))";
	var equation = "Q" + "[(" + nextCellToCalculate[0] + "," + nextCellToCalculate[1] + ")," + action_char + "] &xlarr; " + equation_str + " = " + showNumber(result_val);
	// console.log(equation);
	if (display == 1)
		document.getElementById("value-calculation-paragraph").innerHTML = equation;
	else
		document.getElementById("value-calculation-paragraph").innerHTML = "";
	return result_val;

}

function converged() {
	document.getElementById("converged-iterations").innerHTML = iterations;
	document.getElementById("modal1").classList.add("is-visible");
	console.log("converged");
	clearInterval(time);
	// if (time != 0) {
	// 	clearInterval(time);
	// }
}


function clickedOnNextValue(e) {
	var cell = nextCellToCalculate;
	// console.log("clicked on next value", nextCellToCalculate);\
	curSteps += 1;
	let x = Math.random();
	let current_q_sa;
	let next_action, exploring = 0;
	if (x < epsilon) {
		next_action = Math.floor((Math.random() * 4)) // 0L, 1U, 2R, 3D 
		current_q_sa = newGrid[nextCellToCalculate[0]][nextCellToCalculate[1]][next_action]
		exploring = 1;
	}
	else {
		next_action = newGrid[nextCellToCalculate[0]][nextCellToCalculate[1]].indexOf(Math.max(...newGrid[nextCellToCalculate[0]][nextCellToCalculate[1]]))
		current_q_sa = newGrid[nextCellToCalculate[0]][nextCellToCalculate[1]][next_action]
	}

	const max_next_q_sa = calculateNewValue(nextCellToCalculate[0], nextCellToCalculate[1], next_action, reward, gamma, newGrid, 0);
	const value = createEquation(current_q_sa, max_next_q_sa, next_action);
	// console.log(value);

	// console.log(grid);
	newGrid[nextCellToCalculate[0]][nextCellToCalculate[1]][next_action] = value;
	nextCellToCalculate = nextCell(nextCellToCalculate[0], nextCellToCalculate[1], next_action, newGrid);

	if (isTerminalState(nextCellToCalculate[0], nextCellToCalculate[1], newGrid) || curSteps > grid.size[0] * grid.size[0]) {
		curSteps = 0;
		iterations++;
		console.log(iterations)
		document.getElementById("iteration-number").innerHTML = iterations;
		// console.log(completedOrNot(grid, newGrid));
		if (completedOrNot(grid, newGrid)) {
			// alert("Value Iteration has converged");
			converged();
		}
		grid = structuredClone(newGrid);
		constructTable(grid);

		nextCellToCalculate = [2, 0];
	}

	document.getElementById("stepsv").innerHTML = curSteps;
	constructTable(grid);

	if (exploring) {
		var reqCell = document.getElementById("cell2" + cell[0] + cell[1]);
		//  var oldColor = reqCell.style.backgroundColor;
		reqCell.animate({ backgroundColor: "#f5695f" }, 500);
	}
	else {
		var reqCell = document.getElementById("cell2" + cell[0] + cell[1]);
		//  var oldColor = reqCell.style.backgroundColor;
		reqCell.animate({ backgroundColor: "grey" }, 500);
	}


	// reqCell = document.getElementById("cell" + cell[0] + cell[1]);
	// oldColor = reqCell.style.backgroundColor;
	// reqCell.animate({ backgroundColor: "#263034" }, 2000);

	// reqCell = document.getElementById("cell" + nextCellToCalculate[0] + nextCellToCalculate[1]);
	// oldColor = reqCell.style.backgroundColor;
	// reqCell.animate({ backgroundColor: "lightgrey" }, 1500);
}

function clickedOnNextIteration(e) {
	var cell = nextCellToCalculate;
	// console.log("clicked on next value", nextCellToCalculate);
	let steps = 0;
	while (1) {
		steps += 1;
		let x = Math.random();
		let current_q_sa;
		let next_action, exploring = 0;
		if (x < epsilon) {
			next_action = Math.floor((Math.random() * 4)) // 0L, 1U, 2R, 3D 
			current_q_sa = newGrid[nextCellToCalculate[0]][nextCellToCalculate[1]][next_action]
			exploring = 1;
		}
		else {
			next_action = newGrid[nextCellToCalculate[0]][nextCellToCalculate[1]].indexOf(Math.max(...newGrid[nextCellToCalculate[0]][nextCellToCalculate[1]]))
			current_q_sa = newGrid[nextCellToCalculate[0]][nextCellToCalculate[1]][next_action]
		}

		const max_next_q_sa = calculateNewValue(nextCellToCalculate[0], nextCellToCalculate[1], next_action, reward, gamma, newGrid, 0);
		const value = createEquation(current_q_sa, max_next_q_sa, next_action, 0);
		// console.log(value);

		// console.log(grid);
		newGrid[nextCellToCalculate[0]][nextCellToCalculate[1]][next_action] = value;
		nextCellToCalculate = nextCell(nextCellToCalculate[0], nextCellToCalculate[1], next_action, newGrid);

		if (isTerminalState(nextCellToCalculate[0], nextCellToCalculate[1], newGrid) || steps > grid.size[0] * grid.size[0]) {
			iterations++;
			curSteps = 0;
			console.log(iterations)
			document.getElementById("iteration-number").innerHTML = iterations;
			// console.log(completedOrNot(grid, newGrid));
			if (completedOrNot(grid, newGrid)) {
				// alert("Value Iteration has converged");
				converged();
			}
			grid = structuredClone(newGrid);
			// constructTable(grid);

			nextCellToCalculate = [2, 0];
			break;
		}
	}

	constructTable(grid);

}
function showNumber(x) {
	if (hasTwoZeroDecimals(x)) return x.toExponential(2);
	if (x === -2) {
		x = 0;
	}
	return parseFloat(x).toFixed(3);
}

const allEqual = arr => arr.every(val => val === arr[0]);

function colourFinalStates(grid) {
	// console.log(grid);
	var gridSize = grid.size[0];
	for (var i = 0; i < gridSize; i++) {
		for (var j = 0; j < gridSize; j++) {
			var cell = document.getElementById("cell" + i + j);
			var cell2 = document.getElementById("cell2" + i + j);
			if (allEqual(grid[i][j]) && grid[i][j][0] === 1) {
				cell.style.backgroundColor = "green";
				cell.style.color = "white";
				cell2.style.backgroundColor = "green";
				cell2.style.color = "white";
			} else if (allEqual(grid[i][j]) && grid[i][j][0] === -1) {
				cell.style.backgroundColor = "red";
				cell.style.color = "white";
				cell2.style.backgroundColor = "red";
				cell2.style.color = "white";
			} else if (allEqual(grid[i][j]) && grid[i][j][0] === -2) {
				cell.style.backgroundColor = "black";
				cell.style.color = "white";
				cell2.style.backgroundColor = "black";
				cell2.style.color = "white";
			} else {
				cell.style.backgroundColor = "white";
				cell.style.color = "black";
				cell2.style.backgroundColor = "white";
				cell2.style.color = "black";
			}
		}
	}
}


function hasTwoZeroDecimals(x) {
	let z = x.toString();
	if (z.indexOf(".") === -1) return false;
	z = z.split(".")[1];
	return z[0] === "0" && z[1] === "0";
}
function singleClickedOnCell(e) {
	var cell = e.target;
	var cellId = cell.id;
	var cellIdArray = cellId.split("cell");

	var x = parseInt(cellIdArray[1][0]);
	var y = parseInt(cellIdArray[1][1]);
	if (isTerminalState(x, y, grid) || (grid.size[0] === x + 1 && y == 0)) {
		return;
	}
	if (isObstacle(x, y, grid)) {
		grid[x][y][0] = 0;
		grid[x][y][1] = 0;
		grid[x][y][2] = 0;
		grid[x][y][3] = 0;
		newGrid[x][y][0] = 0;
		newGrid[x][y][1] = 0;
		newGrid[x][y][2] = 0;
		newGrid[x][y][3] = 0;
		// console.log("obstacle removed")
		colourFinalStates(grid);
		constructTable(grid);
		return;
	}
	// console.log(x, y);

	addObstacles(x, y, -2, grid);
	grid[x][y][0] = -2;
	grid[x][y][1] = -2;
	grid[x][y][2] = -2;
	grid[x][y][3] = -2;
	newGrid[x][y][0] = -2;
	newGrid[x][y][1] = -2;
	newGrid[x][y][2] = -2;
	newGrid[x][y][3] = -2;
	// console.log("obstacle added")
	colourFinalStates(grid);
	constructTable(grid);
}
function clickedOnCell(e) {

	clicks++;  //count clicks	
	if (clicks === 1) {
		timer = setTimeout(function () {
			singleClickedOnCell(e);
			clicks = 0;             //after action performed, reset counter
		}, 300);
	} else {
		clearTimeout(timer);
		// console.log("yes")  //prevent single-click action
		doubleClickedOnCell(e);
		clicks = 0;             //after action performed, reset counter
	}
}

function doubleClickedOnCell(e) {
	// console.log(e.detail);
	var cell = e.target;
	var cellId = cell.id;
	var cellIdArray = cellId.split("cell");

	var x = parseInt(cellIdArray[1][0]);
	var y = parseInt(cellIdArray[1][1]);
	if (isObstacle(x, y, grid)) {
		return;
	}
	if (isTerminalState(x, y, grid)) {
		if (grid[x][y][0] === 1) {
			grid[x][y][0] = -1;
			grid[x][y][1] = -1;
			grid[x][y][2] = -1;
			grid[x][y][3] = -1;
			newGrid[x][y][0] = -1;
			newGrid[x][y][1] = -1;
			newGrid[x][y][2] = -1;
			newGrid[x][y][3] = -1;
			for (let i = 0; i < newGrid.finalStates.length; i++) {
				const state = newGrid.finalStates[i];
				if (state.x === x && state.y === y) {
					newGrid.finalStates[i].value = -1;
					grid.finalStates[i].value = -1;
					break;
				}
			}
		}
		else {
			grid[x][y][0] = 0;
			grid[x][y][1] = 0;
			grid[x][y][2] = 0;
			grid[x][y][3] = 0;
			newGrid[x][y][0] = 0;
			newGrid[x][y][1] = 0;
			newGrid[x][y][2] = 0;
			newGrid[x][y][3] = 0;
			for (let i = 0; i < newGrid.finalStates.length; i++) {
				const state = newGrid.finalStates[i];
				if (state.x === x && state.y === y) {
					newGrid.finalStates.splice(i, 1);
					grid.finalStates.splice(i, 1);
					break;
				}
			}
		}
	}
	else {
		grid[x][y][0] = 1;
		grid[x][y][1] = 1;
		grid[x][y][2] = 1;
		grid[x][y][3] = 1;
		newGrid[x][y][0] = 1;
		newGrid[x][y][1] = 1;
		newGrid[x][y][2] = 1;
		newGrid[x][y][3] = 1;
		newGrid.finalStates.push({ x: x, y: y, value: 1 });
		grid.finalStates.push({ x: x, y: y, value: 1 });
	}
	// console.log(x, y, grid[x][y]);

	// colourFinalStates(grid);
	constructTable(grid);
}

function constructTable(grid) {
	var gridSize = grid.size[0];
	var table = document.createElement("table");
	table.setAttribute("id", "grid");
	for (var i = 0; i < gridSize; i++) {
		var row = document.createElement("tr");
		for (var j = 0; j < gridSize; j++) {
			var cell = document.createElement("td");
			cell.setAttribute("id", "cell" + i + j);
			cell.setAttribute("class", "cell");
			cell.setAttribute("onclick", "clickedOnCell(event)");
			// cell.setAttribute("ondblclick", "doubleClickedOnCell(event)");
			cell.onclick = clickedOnCell;
			// cell.ondblclick = doubleClickedOnCell;
			if (!allEqual(grid[i][j]) || (allEqual(grid[i][j]) && grid[i][j][0] !== 1 && grid[i][j][0] !== -1 && grid[i][j][0] !== -2)) {
				cell.appendChild(document.createTextNode('L : ' + showNumber(grid[i][j][0])));
				cell.appendChild(document.createElement('br'));
				cell.appendChild(document.createTextNode('U : ' + showNumber(grid[i][j][1])));
				cell.appendChild(document.createElement('br'));
				cell.appendChild(document.createTextNode('R : ' + showNumber(grid[i][j][2])));
				cell.appendChild(document.createElement('br'));
				cell.appendChild(document.createTextNode('D : ' + showNumber(grid[i][j][3])));
			}
			else if (allEqual(grid[i][j]) && (grid[i][j][0] === -1 || grid[i][j][0] === 1)) {
				cell.appendChild(document.createTextNode(showNumber(grid[i][j][0])));
			}

			if (!isTerminalState(i, j, grid) && !isObstacle(i, j, grid)) {
				var arrow = document.createElement("i");
				var classname = "fa-solid fa-arrow-" + getDirection(i, j, grid);
				arrow.setAttribute("class", classname);
				arrow.setAttribute("id", "arrow" + i + j);

				cell.appendChild(arrow);
			}

			row.appendChild(cell);
		}
		table.appendChild(row);
	}


	////////////////////////////////////////

	var table2 = document.createElement("table");
	table2.setAttribute("id", "grid");
	table2.setAttribute("class", "grid2");
	for (var i = 0; i < gridSize; i++) {
		var row = document.createElement("tr");
		for (var j = 0; j < gridSize; j++) {
			var cell = document.createElement("td");
			cell.setAttribute("id", "cell2" + i + j);
			cell.setAttribute("class", "cell");
			// cell.setAttribute("onclick", "clickedOnCell(event)");
			// cell.onclick = clickedOnCell;
			if (!allEqual(newGrid[i][j]) || (allEqual(newGrid[i][j]) && newGrid[i][j][0] !== 1 && newGrid[i][j][0] !== -1 && newGrid[i][j][0] !== -2)) {
				cell.appendChild(document.createTextNode('L : ' + showNumber(newGrid[i][j][0])));
				cell.appendChild(document.createElement('br'));
				cell.appendChild(document.createTextNode('U : ' + showNumber(newGrid[i][j][1])));
				cell.appendChild(document.createElement('br'));
				cell.appendChild(document.createTextNode('R : ' + showNumber(newGrid[i][j][2])));
				cell.appendChild(document.createElement('br'));
				cell.appendChild(document.createTextNode('D : ' + showNumber(newGrid[i][j][3])));
			}
			else if (allEqual(newGrid[i][j]) && (newGrid[i][j][0] === -1 || newGrid[i][j][0] === 1)) {
				cell.appendChild(document.createTextNode(showNumber(newGrid[i][j][0])));
			}

			// if(!isTerminalState(i, j, grid) && !isObstacle(i, j, grid)) {
			// 	var arrow = document.createElement("i");
			// 	var classname = "fa-solid fa-arrow-"+ DIRECTIONS.toString(getDirection(i, j, grid));
			// 	arrow.setAttribute("class", classname);
			// 	arrow.setAttribute("id", "arrow" + i + j);

			// 	cell.appendChild(arrow);
			// }

			row.appendChild(cell);
		}
		table2.appendChild(row);
	}


	document.getElementById("matrix").innerHTML = "";
	document.getElementById("matrix").appendChild(table);
	var nextIteration = document.createElement("h2");
	nextIteration.setAttribute("id", "nextIteration-smallscreen");
	nextIteration.setAttribute("class", "next-iteration-display");
	nextIteration.appendChild(document.createTextNode("Next Iteration"));
	document.getElementById("matrix").appendChild(nextIteration);
	document.getElementById("matrix").appendChild(table2);
	var observation = document.createElement("h2");
	observation.setAttribute("id", "observation-smallscreen");
	observation.setAttribute("class", "next-iteration-display");
	observation.appendChild(document.createTextNode("Observations"));
	document.getElementById("matrix").appendChild(observation);
	colourFinalStates(grid);
}

var nextValue = document.getElementById("next-value");
if (nextValue != null)
	nextValue.addEventListener("click", clickedOnNextValue);

var nextIteration = document.getElementById("next-iteration");
if (nextIteration)
	nextIteration.addEventListener("click", clickedOnNextIteration);
var gridSizeSelect;
var gridSize, discountFactor;
var rewardSelect, discountFactorSelect, epsilonSelect, alphaSelect;



function start() {
	if (grid.completed || newGrid.completed) {
		if (document.getElementById("start").value == "End") {
			reset();
		}
		else {
			document.getElementById("start").value = "End";
		}
		return;

	}
	if (document.getElementById("start").value == "Start") {
		started = true;
		time = setInterval(clickedOnNextValue, 3000 - document.getElementById("interval").value);
		document.getElementById("start").value = "Next";
		document.getElementById("pause").disabled = false;
		document.getElementById("pause").style.backgroundColor = "#288ec8";
		document.getElementById("reset").disabled = false;
		document.getElementById("reset").style.backgroundColor = "#288ec8";
		document.getElementById("reset").style.cursor = "pointer";
		document.getElementById("pause").style.cursor = "pointer";
	}
	else if (document.getElementById("start").value == "Next") {
		clearInterval(time);
		if (onpause) {
			clickedOnNextIteration();
		} else {
			clickedOnNextIteration();
			time = setInterval(clickedOnNextValue, 3000 - document.getElementById("interval").value);
		}
	}
	else {
		reset();
	}
}

function pause() {
	if (!started) {
		return;
	}
	if (grid.completed || newGrid.completed) {
		return;
	}
	if (document.getElementById("start").value == "Start") return;
	if (document.getElementById("pause").value == "Pause") {
		if (time != 0)
			clearInterval(time);
		document.getElementById("pause").value = "Resume";
		onpause = 1;
	}
	else {
		if (time != 0)
			clearInterval(time);
		time = setInterval(clickedOnNextValue, 3000 - document.getElementById("interval").value);
		document.getElementById("pause").value = "Pause";
		onpause = 0;
	}
}
function reset() {
	onpause = 0;
	started = false;
	if (time != 0) {
		clearInterval(time);
	}
	iterations = 1;
	document.getElementById("converged-iterations").innerHTML = 0;
	initialize();
}
function change_interval() {
	if (!started) {
		return;
	}
	if (grid.completed || newGrid.completed) {
		return;
	}
	if (time != 0) { clearInterval(time); }
	if (document.getElementById("interval").value != 100) {
		clearInterval(time);
		time = setInterval(clickedOnNextValue, 3000 - document.getElementById("interval").value);
		document.getElementById("pause").style.backgroundColor = "#288ec8";
	}
	else document.getElementById("pause").style.backgroundColor = "grey";
}

function initialize() {

	document.getElementById("start").value = "Start";
	document.getElementById("pause").value = "Pause";
	onpause = 0;
	started = false;
	if (time != 0) {
		clearInterval(time);
	}
	iterations = 0;
	document.getElementById("iteration-number").innerHTML = 0;
	document.getElementById("stepsv").innerHTML = 0;
	document.getElementById("converged-iterations").innerHTML = 0;
	gridSizeSelect = document.getElementById("grid-sizes");
	var value = gridSizeSelect.value;
	gridSize = parseInt(value);

	rewardSelect = document.getElementById("reward");
	reward = rewardSelect.value;
	reward = parseFloat(reward);

	epsilonSelect = document.getElementById("epsilon");
	epsilon = epsilonSelect.value;
	epsilon = parseFloat(epsilon);

	alphaSelect = document.getElementById("alpha");
	alpha = alphaSelect.value;
	alpha = parseFloat(alpha);

	discountFactorSelect = document.getElementById("discount");
	var discountFactor = discountFactorSelect.value;
	discountFactor = parseFloat(discountFactor);
	gamma = discountFactor;


	grid = makeGrid(gridSize);

	grid = addFinalStates(0, gridSize - 1, 1, grid);
	grid = addFinalStates(1, gridSize - 1, -1, grid);
	grid[gridSize - 2][0][0] = -2;
	grid[gridSize - 2][0][1] = -2;
	grid[gridSize - 2][0][2] = -2;
	grid[gridSize - 2][0][3] = -2;
	nextCellToCalculate = [gridSize - 1, 0]
	newGrid = structuredClone(grid);
	constructTable(grid);

	// console.log(grid);

}
initialize();
gridSizeSelect.addEventListener("change", function (e) {
	gridSize = parseInt(e.target.value);
	// console.log(gridSize);
	// constructTable(gridSize);
	initialize();
});

rewardSelect.addEventListener("change", function (e) {
	reward = parseFloat(e.target.value);
	// console.log(reward);
	// constructTable(gridSize);
	initialize();
});

epsilonSelect.addEventListener("change", function (e) {
	epsilon = parseFloat(e.target.value);
	// console.log(reward);
	// constructTable(gridSize);
	initialize();
});

alphaSelect.addEventListener("change", function (e) {
	alpha = parseFloat(e.target.value);
	// console.log(reward);
	// constructTable(gridSize);
	initialize();
});

discountFactorSelect.addEventListener("change", function (e) {
	gamma = parseFloat(e.target.value);
	// console.log(gamma);
	// constructTable(gridSize);
	initialize();
});


const closeEls = document.querySelectorAll("[data-close]");
const isVisible = "is-visible";
var onpause = 0, started = 0;

for (const el of closeEls) {
	el.addEventListener("click", function () {
		this.parentElement.parentElement.parentElement.classList.remove(isVisible);
		// initialize();
	});
}

function handlers() {
	document.getElementById("reset").onclick = function () { reset(); };
	document.getElementById("start").onclick = function () { start(); };
	document.getElementById("pause").onclick = function () { pause(); };
};
handlers();

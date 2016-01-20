"use strict"
console.log("Allo :)");

var calcText = getEle('calcText');
var numControlsHTML = document.getElementsByClassName('numControls');
var operatorHTML = document.getElementsByClassName('operation');
var colorChangeHTML = document.getElementsByClassName("colorChange");
var numbers = [];
var operators = [];
var colorChange = [];
var clearButton = getEle('clearButton');
var plusMinusButton = getEle('plusMinusButton');
var percentButton = getEle('percentButton');
var goldColor = getEle('goldColor');
var silverColor = getEle('silverColor');
var blackColor = getEle('blackColor');
var calcBody = getEle("calcBody");
var fingerButtonOutside = getEle('fingerButtonOutside');
var fingerButtonInside = getEle('fingerButtonInside');


function Calculator() {
	this.total = 0;
	this.mode = "+";
	this.mem = {
		cached : "",
		active : false
	};
}

var calculator = new Calculator;

// Populate arrays with dom elements
// ;(function  populateArrays() {
// 	for(var i = 0; i < numControlsHTML.length; i++) {
// 	numbers.push(numControlsHTML[i]);
// 	}
// 	for(var k = 0; k < operatorHTML.length; k++) {
// 		operators.push(operatorHTML[k]);
// 	}
// }());

populateArray(numControlsHTML, numbers);
populateArray(operatorHTML, operators);
populateArray(colorChangeHTML, colorChange);

// Assign onclicks to number elements
numbers.forEach(function(e) {
	e.onclick = function() {
 		calculator.mem.active = true;
		if(calculator.mode === "=") {
			calculator.total = 0;
		}
		if(e.id === "decimalButton") {
			if(calculator.mem.cached.indexOf(".") === -1)
			calculator.mem.cached += ".";
		}
		else {
			calculator.mem.cached += e.value.toString();
			calcText.innerHTML = displayFomatedNum(calculator.mem.cached);
			clearButton.innerHTML = "C";
		}
		console.log("hehe");
	}
		
});

// Assign onclicks to operator elements
operators.forEach(function(e) {
	e.onclick = function() {
		// getMode();
		// clearMem()
		console.log("Operator Clicked: " + e.id)
		performOp(e.id);
	};
});

// Addition onclick events................
plusMinusButton.onclick = function() {
	if(calculator.mem.cached.toString().indexOf("-") === -1) {
		calculator.mem.cached = "-" + calculator.mem.cached;
	}
	else {
		calculator.mem.cached = calculator.mem.cached.substring(1);
	}
	calcText.innerHTML = displayFomatedNum(calculator.mem.cached);
}

percentButton.onclick = function() {
	if(calculator.mem.cached !== "") {
		calculator.mem.cached *= .01;
		calcText.innerHTML = displayFomatedNum(calculator.mem.cached);
	} else {
		calculator.total *= .01;
		calcText.innerHTML = displayFomatedNum(calculator.total);
	}
}

clearButton.onclick = function() {
	if(calculator.mem.active && calculator.mem.cached !== "") {
		calculator.mem.cached = "";
		calculator.mem.active = false;
		calcText.innerHTML = "0";
		clearButton.innerHTML = "AC";
		console.log(calculator.mem.cached);
	} else {
		calculator.mode = "+";
		calculator.total = 0;
		calcText.innerHTML = "Cleared!";
		clearButton.innerHTML = "AC";
		setTimeout(function() {
			calcText.innerHTML = "0";
		},500);
		console.log(calculator.mem.cached + ": All clear");
	}
}

// Addition operation functions........................
function clearMem() {
	calcText.innerHTML = displayFomatedNum(calculator.total);
	calculator.mem.cached = "";
	console.log("Cleared hit.")
}

function getMode() {
	if(calculator.mem.cached !== "") {
		if(calculator.mode === "+" || calculator.mode === "=") {
			calculator.total += parseFloat(calculator.mem.cached);
		}
		else if(calculator.mode === "-") {
			calculator.total -= parseFloat(calculator.mem.cached);
		}
		else if(calculator.mode === "*") {
			calculator.total *= parseFloat(calculator.mem.cached);
		}
		else if(calculator.mode === "/") {
			calculator.total /= parseFloat(calculator.mem.cached);
		}
	}
	console.log("getMode");
}

function performOp(type) {
	getMode();
	clearMem();
	if(type === "divideButton")
			calculator.mode = "/";
	else if(type === "minusButton")
			calculator.mode = "-";
	else if(type === "multiply")
			calculator.mode = "*";
	else if (type === "equalsButton")
			calculator.mode = "=";
	else
			calculator.mode = "+";
	console.log("performOp");
}

// Change Color functions........................
goldColor.onclick = function() {
	colorChange.forEach(function(e) {
			e.style.backgroundColor = "white";
	});
	fingerButtonOutside.style.padding = "3px";
	fingerButtonOutside.className = "goldRing colorChange";
	fingerButtonInside.style.height = "34px";
	fingerButtonInside.style.width = "34px";
	calcBody.style.backgroundColor = "rgb(246,186,160)";
	calcBody.style.height = "546px";
	calcBody.style.width = "276px";
	calcBody.style.padding = "3px";
}

silverColor.onclick = function() {
	colorChange.forEach(function(e) {
			e.style.backgroundColor = "white";
	});
	fingerButtonOutside.style.padding = "3px";
	fingerButtonOutside.className = "silverRing colorChange";
	fingerButtonInside.style.height = "34px";
	fingerButtonInside.style.width = "34px";
	calcBody.style.backgroundColor = "silver";
	calcBody.style.height = "546px";
	calcBody.style.width = "276px";
	calcBody.style.padding = "3px";
}

blackColor.onclick = function() {
	colorChange.forEach(function(e) {
			e.style.backgroundColor = "black";
	});
	fingerButtonOutside.style.padding = "1px";
	fingerButtonOutside.className = "silverRing colorChange";
	fingerButtonInside.style.height = "38px";
	fingerButtonInside.style.width = "38px";
	calcBody.style.backgroundColor = "silver";
	calcBody.style.height = "542px";
	calcBody.style.width = "272px";
	calcBody.style.padding = "1px";

}

// Helper functions........................
function populateArray(collection, array) {
	for (var i = 0, l = collection.length; i < l; i++) {
		array.push(collection[i]);
	}
	console.log("Arrays populated");
}

function displayFomatedNum(num) {
	num = num.toString();
	if(num.indexOf(".") > 0) {
		num = num.split(".");
		num[0] = num[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return num.join(".");
	} 
	return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getEle(element) {
	return document.getElementById(element);
}

// var addButton = getEle('addButton');
// var minusButton = getEle('minusButton');
// var multiplyButton = getEle("multiply");
// var dividButton = getEle('divideButton');
// var equalsButton = getEle('equalsButton');
// addButton.onclick = function() {
// 	getMode();
// 	clearMem();
// 	calculator.mode = "+";
// }

// addButton.onclick = function() {
// 	getMode();
// 	clearMem();
// 	calculator.mode = "+";
// }

// minusButton.onclick = function() {
// 	getMode();
// 	clearMem();
// 	calculator.mode = "-";
// 	console.log("Cached: " + calculator.mem.cached);
// }

// multiplyButton.onclick = function() {
// 	getMode();
// 	clearMem();
// 	calculator.mode = "*";
// }

// divideButton.onclick = function() {
// 	getMode();
// 	clearMem();
// 	calculator.mode = "/";
// }
// equalsButton.onclick = function() {
// 	getMode();
// 	clearMem();
// 	calculator.mode = "=";
// }

const matrixTextClasses = document.getElementsByClassName('matrix-text');
var chars = null;

// const speed_ms = 0;
const speed_ms = 0;
var char_load = 50;
var increment_char_load = 1;
var max_char_load = 250;

const animateCharacterSwitch = 1;

function endAnimation(){
	chars = document.getElementsByTagName('char');
	for (c of chars) {
		c.innerText = c.getAttribute("char");
		c.classList.add("end-animation");
	}
}


const body = document.querySelector('body');
body.addEventListener("dblclick", (event) => {

	console.log('double click start');

	endAnimation();

	console.log('end');
});


var mylatesttap;
function doubletap() {

	var now = new Date().getTime();
	var timesince = now - mylatesttap;
	if((timesince < 600) && (timesince > 0))
	{
		endAnimation(); 
	}

	mylatesttap = new Date().getTime();

}


var characters = ' █▓▒░|:.';
function nextCharacter(num){
	return characters[num%(characters.length)];
}

function setup(){
	for (sfc of matrixTextClasses) {
		var text = sfc.getAttribute("text");

		for (let i = 0; i < text.length; i++) 
		{
			var char = document.createElement("char");
			char.innerText = " ";
			char.setAttribute("char",text[i]);
			char.setAttribute("num",0);
			

			sfc.appendChild(char);

		}
		
	}
}
setup();

// console.log(chars);


function transitionText(){
	// console.log("transitionText");
	chars = document.getElementsByTagName('char');
	
	var result = true;
	var char_count = 0;
	for (c of chars) {

		var char = c.getAttribute("char");
		var iText = c.innerText;
		var num = parseInt(c.getAttribute("num"));
		num += 1;

		if (char == iText)
		{
			c.classList.add("char-done");
			continue;
		}

		result = false;
		
		char_count += 1
		if (char_count > char_load)
		{
			break;
		}
		else
		{
			c.classList.add('char-start');

			
		}

		if (animateCharacterSwitch == 0)
		{
			c.innerText = char;
			continue;
		}


		if (num < characters.length)
		{
			c.innerText = nextCharacter(num);
			// c.classList.add('char-start');
		}
		else
		{
			c.innerText = char;
		}
		
		c.setAttribute("num",num);

	} 
	
	char_load += increment_char_load;
	char_load = Math.min(char_load,max_char_load);

	console.log(char_load);
	return result;
}
// transitionText();

function runUntilTrue() {
	// Simulate a condition that might eventually return true
	var result = transitionText(); // Adjust the probability as needed
	// console.log(result);

	if (result) {
		console.log("Function returned true, stopping.");
	} else {
		console.log("Function returned false, running again after 0.0 seconds.");
		
		// if (speed_ms > 0)
		// {
		// 	speed_ms -= 2;
		// }

		// speed_ms -= 2;
		setTimeout(runUntilTrue, speed_ms); // Wait for 0 milliseconds before trying again
	}
}
runUntilTrue();


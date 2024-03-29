window.addEventListener("load", main, false);
function main() {
	var canv = document.getElementById("schedule");
	var ctx = canv.getContext("2d")

	var day;
	var time;

	var xUnit;
	var yUnit;

	var numTimes = 4;

	var widthThreshold = 700;
	var spacer = 5;
	var xOffset = 64 + spacer;
	var yOffset = 32 + spacer;

	function canvasCalibrator() {   // scales canvas element
		canv.width = canv.clientWidth;
		canv.height = canv.clientHeight;
		
		xUnit = (canv.width - xOffset) / 5;
		yUnit = (canv.height - yOffset)  / numTimes;
	}

	function daySelector(i) {   // writes the days with resizing
		if (i == 0) {
			if (canv.width < widthThreshold) {
				day = "Mon";
			}
			else {
				day = "Monday";
			}
		}
		else if (i == 1) {
			if (canv.width < widthThreshold) {
				day = "Tue";
			}
			else {
				day = "Tuesday";
			}	   
		}
		else if (i == 2) {
			if (canv.width < widthThreshold) {
				day = "Wed";
			}
			else {
				day = "Wednesday";
			}	 
		}
		else if (i == 3) {
			if (canv.width < widthThreshold) {
				day = "Thu";
			}
			else {
				day = "Thursday";
			}	 
		}
		else if (i == 4) {
			if (canv.width < widthThreshold) {
				day = "Fri";
			}
			else {
				day = "Friday";
			}	 
		}
	}

	function timeSelector(i) {  // writes the time with resizing
		time = i + 10
		if (time > 12) {
			time -= 12;
		}
		if (canv.width > widthThreshold) {
			time = time + ":00"
			xOffset = 64 + spacer
		}
		else {
			xOffset = 24 + spacer
		}
	}
	function drawBlock(block, text) { // draws the given block in the schedule

		if (block[0] == "Mon") {
			block[0] = 0;
		}
		else if (block[0] == "Tue") {
			block[0] = 1;
		}
		else if (block[0] == "Wed") {
			block[0] = 2;
		}
		else if (block[0] == "Thu") {
			block[0] = 3;
		}
		else if (block[0] == "Fri") {
			block[0] = 4;
		}

		if (block[1] >= 10) {
			block[1] -= 10;
		}
		else {
			block[1] += 1;
		}
		ctx.fillRect(xOffset + xUnit * block[0], yOffset + yUnit * block[1], xUnit, yUnit * block[2]); 
		if (canv.width < widthThreshold) {
			return;
		}
		ctx.font = "20px Georgia";
		ctx.fillStyle = "black"
		ctx.textAlign = "center";
		if (block[1] % 1 == 0) {
			ctx.fillText(text, xOffset + xUnit * (block[0] + 0.5), yOffset + yUnit * (block[1] + 0.6));
		} else {
			ctx.fillText(text, xOffset + xUnit * (block[0] + 0.5), yOffset + yUnit * (block[1] + 1.1));
		}
	}

	function drawSchedule() {   // draws the schedule

		ece313 = ["ECE 313", "#ff44ff", ["Mon", 10, 1], ["Wed", 10, 1], ["Fri", 10, 1]];

		hort105_lec = ["HORT 105", "#ff4444", ["Mon", 11, 1], ["Wed", 11, 1]];
		hort105_dis = ["HORT 105", "#ff7777", ["Fri", 12, 2]];
		

		courses = [
			ece313,
			hort105_lec,
			hort105_dis
		];

		for (i=0; i < courses.length; i++) {
			for (j=2; j < courses[i].length; j++) {
				ctx.fillStyle = courses[i][1];
				drawBlock(courses[i][j], courses[i][0]);
			}
		}
	}
	function draw() {   // drawing function
		canvasCalibrator();
	
		ctx.font = "24px Georgia";
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, canv.width, canv.height); // background

		drawSchedule();

		ctx.font = "24px Georgia";
		ctx.fillStyle = "black";
		ctx.textAlign = "center";
		ctx.lineWidth = "2";

		for (i=0; i < (canv.width-xOffset)/xUnit; i++) { // vertical lines and days
			ctx.beginPath();
			ctx.moveTo(xOffset + xUnit * i, 0);
			ctx.lineTo(xOffset + xUnit * i, canv.height);
			ctx.stroke();
			
			daySelector(i);
			ctx.fillText(day, xOffset + xUnit * i + xUnit/2, yOffset * 2/3);
		}

		ctx.textAlign = "right";
		for (i=0; i < numTimes; i++) { // horizontal lines and time
			ctx.beginPath();
			ctx.moveTo(xOffset, yUnit * i + yOffset);
			ctx.lineTo(canv.width, yUnit * i + yOffset);
			ctx.stroke();

			timeSelector(i);
			ctx.fillText(time, xOffset - spacer/2, yUnit * i + yOffset + spacer);
		}
	}

	window.onresize = draw;
	draw();
	draw();	// I need to draw twice to fix a window size bug. not sure why.
}

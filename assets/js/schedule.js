window.addEventListener("load", main, false);
function main() {
    var canv = document.getElementById("schedule");
    var ctx = canv.getContext("2d")

    var day;
    var time;

    var xUnit;
    var yUnit;

    var numTimes = 9;

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
            block[1] += 2;
        }
        ctx.fillRect(xOffset + xUnit * block[0], yOffset + yUnit * block[1], xUnit, yUnit * block[2]); 
        if (canv.width < widthThreshold) {
            return;
        }
        ctx.font = "20px Georgia";
        ctx.fillStyle = "black"
        ctx.textAlign = "center";
        ctx.fillText(text, xOffset + xUnit * (block[0] + 0.5), yOffset + yUnit * (block[1] + 0.6));
    }

    function drawSchedule() {   // draws the schedule
        math257_lec = ["MATH 257", "#ff4444", ["Mon", 11, 1], ["Wed", 11, 1]];
        math257_lab = ["MATH 257", "#cc1111", ["Fri", 11, 1]];
        math257_dis = ["MATH 257", "#ff7777", ["Tue", 10, 1]];

        phys21x_lec = ["PHYS 213/214", "#44ff44", ["Mon", 10, 1], ["Wed", 10, 1]];
        phys214_lec = ["PHYS 214", "#44ff44", ["Fri", 10, 1]];
        phys21x_lab = ["PHYS 213/214", "#11cc11", ["Mon", 12, 2]];
        phys21x_dis = ["PHYS 213/214", "#77ff77", ["Wed", 12, 2]];

        ece391_lec = ["ECE 391", "#ff44ff", ["Tue", 2, 1.5], ["Thu", 2, 1.5]];
        ece391_dis = ["ECE 391", "#ff88ff", ["Wed", 2, 1]];

        ece310_lec = ["ECE 310", "#ffff44", ["Mon", 3, 1], ["Wed", 3, 1], ["Fri", 3, 1]];
        ece310_lab = ["ECE 311", "#cccc11", ["Tue", 11, 2]];

        seminar = ["SEMINAR", "#44ffff", ["Wed", 5, 2]];
        
        courses = [
            math257_lec, 
            math257_lab, 
            math257_dis,

            phys21x_lec,
            phys214_lec, 
            phys21x_lab, 
            phys21x_dis, 
            
            ece391_lec, 
            ece391_dis, 
            
            ece310_lec, 
            ece310_lab,
        
            seminar
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
        ctx.lineWidth = "2";

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canv.width, canv.height); // background

        drawSchedule();
        
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
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

    draw();
    window.onresize = draw;
}
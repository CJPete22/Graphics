/*
Copyright 2020
Carly Peterson -- cjpeterson7@wisc.edu
University of Wisconsin: Madison
Undergrad working toward BS of Computer Science and German
*/

function setup() { "use strict";
    var canvas = document.getElementById('myCanvas');
    var sideSize = document.getElementById('sizeChange');
    var xSlider = document.getElementById('xslider');
    var ySlider = document.getElementById('yslider');
    var slider1 = document.getElementById('slider1');
    var slider2 = document.getElementById('slider2');
    var slider3 = document.getElementById('slider3');

    var red = false; var green = false; var blue = false;

    function draw() {
        var context = canvas.getContext('2d');
        var color = "rgb(" 
                    + slider1.value.toString(16) + ","
                    + slider2.value.toString(16) + ","
                    + slider3.value.toString(16) + ")";
        var cx = canvas.width/2;
        var cy = canvas.height/2;
        var dx = xSlider.value;
        var dy = ySlider.value;
        var sl = sideSize.value;
        var topEckeX = cx; var topEckeY = cy-(sl*Math.sqrt(3)/4);
        var leftEckeX = cx-(sl/2); var leftEckeY = cy+(sl*Math.sqrt(3)/4);
        var rightEckeX = cx+(sl/2); var rightEckeY = cy+(sl*Math.sqrt(3)/4);
        canvas.width=canvas.width;

        if (color == "rgb(255,255,255)"){
            context.fillStyle = "black";
            context.fillRect(0,0,canvas.width,canvas.height);
        }
        
	if (color == "rgb(255,0,0)") red = true;
        if (color == "rgb(0,255,0)") green = true;
        if (color == "rgb(0,0,255)") blue = true;

        function drawDreiEck() {
            context.beginPath();
            context.fillStyle = color;
            context.moveTo(topEckeX, topEckeY);
            context.lineTo(leftEckeX, leftEckeY);
            context.lineTo(rightEckeX, rightEckeY);
            context.closePath();
            context.fill();
        }

        function drawKreis(cx, cy, r, color) {
            context.beginPath();
            context.strokeStyle = color;
            context.arc(cx, cy, r, 0, 2 * Math.PI);
            context.stroke();
        }
        
        context.translate(dx, dy);
        drawDreiEck();
        if (red == true) { drawKreis(topEckeX, topEckeY, sl/10, "red"); }
        else { drawKreis(topEckeX, topEckeY, sl/10, color); }
        if (green == true) { drawKreis(leftEckeX, leftEckeY, sl/10, "green"); }
        else { drawKreis(leftEckeX, leftEckeY, sl/10, color); }
        if (blue == true) { drawKreis(rightEckeX, rightEckeY, sl/10, "blue"); }
        else { drawKreis(rightEckeX, rightEckeY, sl/10, color); }

        if (red && green && blue) {
            context.font = "" + sl/16 + "px Ariel";
            context.fillStyle = "yellow";
            context.textAlign = "center";
            context.fillText("All Colors Found!", cx, cy); 
        }
    }
    xSlider.addEventListener("input", draw);
    ySlider.addEventListener("input", draw);
    sideSize.addEventListener("input", draw);
    slider1.addEventListener("input", draw);
    slider2.addEventListener("input", draw);
    slider3.addEventListener("input", draw);
    draw();
}
window.onload = setup();

/*
Copyright 2020
Carly Peterson -- cjpeterson7@wisc.edu
University of Wisconsin: Madison
Undergrad working toward BS of Computer Science and German
*/

window.onload = function () { "use strict";
    var canvas = document.getElementById('myCanvas');
    var sVal = document.getElementById('speed');
    var btn = document.getElementById('reset');
    var ctx = canvas.getContext('2d');
    var wRad = 0; var wAngVel = -0.05;
    var hPos = 0; var hVel = 0;
    var hRad = 0; var hAngVel = 0;
    var sRad = 0; var sAngVel = 0.005;
    var sPos = 0; var sVel = 0.1;
    var rX = 0; var rY = 0; var rXVel = 0; var rYVel = 0;
    var onHorse = true; var xAcc = 0.01; var yAcc = 0.5;
     
    function drawWindmill() {
        ctx.fillStyle = "brown";
        ctx.beginPath();
        ctx.moveTo(100,50);
        ctx.lineTo(150,100);
        ctx.lineTo(150,125);
        ctx.lineTo(170,250);
        ctx.lineTo(160,250);
        ctx.lineTo(160,270);
        ctx.lineTo(40,270);
        ctx.lineTo(40,250);
        ctx.lineTo(30,250);
        ctx.lineTo(50,125);
        ctx.lineTo(50,100);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(100,100,20,0,2*Math.PI);
        ctx.fill();
    }

    function drawBlades(wRad) {
        function blade() {
            ctx.fillStyle = "tan";
            ctx.beginPath();
            ctx.rect(0,-5,150,10);
            ctx.fill();
            
            ctx.beginPath();
            ctx.fillStyle = "grey";
            ctx.rect(25,5,125,70);
            ctx.fill();
        }
        ctx.rotate(wRad);
        blade();
        ctx.rotate(Math.PI / 2);
        blade();
        ctx.rotate(Math.PI / 2);
        blade();
        ctx.rotate(Math.PI / 2);
        blade();
        ctx.arc(0,0,10,0,2*Math.PI);
        ctx.fill();
    }

    function drawHorse(hRad) {
        ctx.fillStyle = "#421d03";
        ctx.save();                                        // Base Coordinate System, stack 1

	// Neck
        ctx.beginPath();
        ctx.translate(90,40);                              // Upper Right Body
        ctx.rotate(-(Math.PI / 4) + 0.2);                  // Initial Neck Angle
        var bRad = (25 / 180 * Math.PI) * Math.sin(hRad);
        ctx.rotate(bRad);                                  // Neck Angle based on hRad
        ctx.rect(0,0,35,5); ctx.fill();

        ctx.beginPath();
        ctx.translate(40,-15);                             // Neck End
        ctx.rotate(Math.PI / 4);                           // Horizontal to Base X-Axis
        ctx.rect(0,0,30,20);
        ctx.restore();                                     // Base Coordinate System, stack empty
        ctx.fill();

        ctx.save();                                        // Base Coordinate System, stack 1
        ctx.translate(50,70); ctx.save();                  // Lower Left Body, stack 2

        ctx.beginPath();
        ctx.translate(5,0);                                // Background Back Leg
        ctx.rotate(hRad);                                  // Movement
        ctx.rect(-2.5,0,5,30);
        ctx.restore(); ctx.save(); ctx.fill();             // Lower Left Body, stack 2

        ctx.beginPath();
        ctx.translate(45,0);                               // Background Front Leg
        ctx.rotate(hRad);                                  // Movement
        ctx.rect(-2.5,0,5,30); ctx.fill();

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.restore(); ctx.restore();                      // Base Coordinate System, stack empty
        ctx.translate(50,35);                              // Upper Left Body
        ctx.rect(0,0,50,40);
        ctx.translate(0,35); ctx.save(); ctx.fill();       // Lower Left Body, stack 1

	ctx.beginPath();
        ctx.translate(5,0);                                // Back Leg
        ctx.rotate(hRad-(Math.PI/2));                      // Movement
        ctx.rect(-2.5,0,5,30);
        ctx.restore(); ctx.save(); ctx.fill();             // Base Coordinate System, stack 1

	ctx.beginPath();
        ctx.translate(45,0);                               // Front Leg
        ctx.rotate(hRad-(Math.PI/2));                      // Movement
        ctx.rect(-2.5,0,5,30);
        ctx.fill(); ctx.restore();                         // Base Coordinate System, stack empty
    }

    function drawRider(onHorse) {
        ctx.fillStyle = "white"; ctx.save();               // Base Coordinate System, stack 1
        ctx.translate(25,50); ctx.save();                  // Figure Center, stack 2

        // Foreground Leg
        if(!onHorse) {
            ctx.beginPath();
            ctx.rotate(Math.PI / 4);                       // Right Leg
            ctx.rect(-3,-2,6,30);
            ctx.restore(); ctx.save(); ctx.fill();         // Figure Center, stack 2
        }

        ctx.beginPath();
        ctx.rotate(-Math.PI / 4);                          // Right Leg (Background)
        ctx.rect(-3,-2,5,30);
        ctx.restore(); ctx.save(); ctx.fill();             // Figure Center, stack 2

        // Body and Head
        ctx.beginPath();
        ctx.translate(0,-25);                              // Figure Top
        ctx.rect(-3,0,6,25);
        ctx.arc(0,-10,10,0,Math.PI*2);                     // Head
        ctx.fill(); ctx.save();                            // Figure Top, stack 3

        // Arm(s)
        if (onHorse) {
            ctx.beginPath();
            ctx.translate(0,10);                           // Arm Postition
            ctx.rotate(-Math.PI / 6);                      // Arm Angle
            ctx.rect(0,0,25,5);
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.translate(0,10);                           // Arm Position
            ctx.rotate(-Math.PI / 4);                      // Arm Angle
            ctx.rect(0,0,25,5);
            ctx.scale(-1,1);                               // Reflect to Repeat Arm
            ctx.rotate(-Math.PI / 2);                      // Arm Angle
            ctx.rect(0,0,25,5);
            ctx.fill();
        }
        ctx.restore(); ctx.restore(); ctx.restore();       // Base Coordinate System, stack empty
    }

    function drawBG(wRad, sPos, sAngVel) {
        // Sky
        ctx.beginPath();
        ctx.rect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "#9cc2ff"
        ctx.fill(); ctx.save();                            // Base Coordinate System, stack 1

        // Background Windmill
        ctx.translate(canvas.width-200,canvas.height-235); // Windmill Position
        ctx.scale(0.75,0.75);                              // Scale to Mimic Distance
        drawWindmill();
        ctx.translate(100,100); ctx.save();                // Blade Center, stack 2
        drawBlades(wRad-(Math.PI/4)+0.5);
        ctx.restore(); ctx.restore();                      // Base Coordinate System, stack empty

        // Ground
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.rect(0,canvas.height-35,canvas.width,35);
        ctx.fill();

        // Sun
        ctx.beginPath();
        ctx.translate(200,150);                            // Sun Position
        ctx.arc(0,0,50,0,2*Math.PI);
        ctx.fillStyle = "yellow";
        ctx.fill(); ctx.save();                            // Sun Position, stack 1

        // Sun Rays
        var col = true;
        for(var i=sRad; i<sRad+(2*Math.PI); i+=Math.PI/10){
            ctx.beginPath();
            ctx.rotate(i);                                 // Ray Placement
            ctx.rect(60 + sPos,0,10,5);
            // Alternate Every Other Color
            if (col == true) {
                col = !col;
                ctx.fillStyle = "yellow";
            } else {
                col = !col;
                ctx.fillStyle = "orange";
            }
            ctx.fill();
            ctx.restore(); ctx.save();                     // Sun Position, stack 1
        }
        ctx.font = "80px Playbill";
        ctx.textAlign = "center";
        ctx.fillStyle = "purple";
        ctx.fillText("A Beautiful Day to Fight Giants...", 20+canvas.width/3, 50);
        ctx.restore();                                     // Base Coordinate System, stack empty
    }
 
    function draw() {
        requestAnimationFrame(draw);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 40;
        wRad += wAngVel;                                   // Calculate Windmill Radians
        hRad += hAngVel;                                   // Calculate Horse Radians
        hVel = hAngVel*30; hPos += hVel;                   // Calculate Horse Velocity and Position
        sRad += sAngVel; sPos += sVel;                     // Calculate Sun Turn Velocity and Ray Movement

        // Correct for Screen Edges
        if (hPos >= canvas.width) hPos = -150;
        if (hPos < -150) hPos = -150;

        // Limit Sun Ray Position
        if (sPos >= 20) sVel *= -1;
        if (sPos <= 0) sVel *= -1;

        ctx.save();                                        // Base Coordinate System, stack 1
        drawBG(wRad, sPos, sAngVel);
        ctx.restore(); ctx.save();                         // Base Coordinate System, stack 1

        ctx.translate(canvas.width-400,canvas.height-300); // Canvas Bottom Right
        drawWindmill();
        ctx.translate(100,100); ctx.save();                // Blade Center, stack 2
        drawBlades(wRad);
        ctx.restore(); ctx.restore(); ctx.save();          // Base Coordinate System, stack 1

        ctx.translate(hPos,canvas.height-130);             // Move Horse
        drawHorse(hRad);
        ctx.restore(); ctx.save();                         // Base Coordinate System, stack 1
        if (hPos <= canvas.width-400 && onHorse) {
            ctx.translate(hPos+55,canvas.height-146);      // Move Rider
            drawRider(onHorse);
            rX = hPos+hVel+55; rXVel = -wAngVel*150;       // Calculate Initial Figure X Position and Velocity
            rY = canvas.height-146;                        // Calculate Initial Figure Y Position
            ctx.restore(); ctx.save();                     // Base Coordinate System, stack 1
        } else {
             onHorse = false;

             // X-Axis
             if(rXVel > 0) rXVel -= xAcc; else rXVel = 0;  // Calculate Figure X Acceleration
             rX += rXVel;                                  // Calculate Figure X Position
 
             // Y-Axis
             rYVel += yAcc; rY -= rYVel;                   // Calculate Figure Y Velocity and Position
             
             ctx.translate(rX, rY);                        // Move Figure
             drawRider(onHorse);
             ctx.restore();                                // Base Coordinate System, stack empty
        }

        if (hVel*-1 > 0 || rX >= canvas.width) {
            ctx.beginPath();
            ctx.font = "80px Playbill";
            ctx.textAlign = "left";
            ctx.fillStyle = "purple";
            ctx.fillText("...or not",100+canvas.width*2/3, 280);
            ctx.fill();
        }
    }
    
    sVal.addEventListener("input", function(){hAngVel = sVal.value*0.001});
    btn.addEventListener("click",function(){
        wRad=0; hPos=0; hRad=0; sPos=0; onHorse=true; rYVel = 0;}); 
    draw();
}

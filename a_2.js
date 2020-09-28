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
    var sPos = 0; var sVel = 0.08;
    var rX = 0; var rY = 0; var rXVel = 0; var rYVel = 0;
    var onHorse = true; var xAcc = 0.02; var yAcc = 0.02;
     
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

    function drawBlades(wind) {
        function blade() {
            ctx.fillStyle = "tan";
            ctx.beginPath();
            ctx.rect(0,0,150,10);
            ctx.fill();
            
            ctx.beginPath();
            ctx.fillStyle = "grey";
            ctx.rect(25,10,125,70);
            ctx.fill();
        }
        ctx.rotate(wind);
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
        ctx.beginPath();
        ctx.fillStyle = "#421d03";
        ctx.save();
        ctx.translate(50,35);

	// Neck
        ctx.translate(40,5);
        ctx.rotate(-(Math.PI / 4) + 0.2);
        var bRad = (25 / 180 * Math.PI) * Math.sin(hRad);
        ctx.rotate(bRad);
        ctx.rect(0,0,35,5);

	// Head
        ctx.translate(40,-15);
        ctx.rotate(Math.PI / 4);
        ctx.rect(0,0,30,20);
        ctx.restore();
        ctx.fill();

        ctx.save();
        ctx.beginPath();
        ctx.translate(50,70);
        ctx.save();

        // Background Back Leg
        ctx.translate(5,0);
        ctx.rotate(hRad);
        ctx.rect(-2.5,0,5,30);
        ctx.restore(); ctx.save();

        // Background Front Leg
        ctx.translate(45,0);
        ctx.rotate(hRad);
        ctx.rect(-2.5,0,5,30);

        ctx.fillStyle = "black"; ctx.fill();
        ctx.beginPath();
        ctx.restore(); ctx.restore();
        ctx.translate(50,35);
        ctx.rect(0,0,50,40);
        ctx.translate(0,35);
        ctx.save();

	//Back Leg
        ctx.translate(5,0);
        ctx.rotate(hRad-(Math.PI/2));
        ctx.rect(-2.5,0,5,30);
        ctx.restore(); ctx.save();

	// Front Leg
        ctx.translate(45,0);
        ctx.rotate(hRad-(Math.PI/2));
        ctx.rect(-2.5,0,5,30);
        ctx.fill(); ctx.restore(); ctx.restore();
    }

    function drawRider(onHorse) {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.save();
        ctx.translate(25,50);
        ctx.save();

        // Foreground Leg
        if(!onHorse) {
            ctx.rotate(Math.PI / 4);
            ctx.rect(-3,-2,6,30);
            ctx.restore(); ctx.save();
        }

        // Background Leg
        ctx.rotate(-Math.PI / 4);
        ctx.rect(-3,-2,5,30);
        ctx.restore(); ctx.save(); ctx.fill();

        // Body and Head
        ctx.beginPath();
        ctx.translate(0,-25);
        ctx.rect(-3,0,6,25);
        ctx.arc(0,-10,10,0,Math.PI*2);
        ctx.fill(); ctx.save();

        if (onHorse) {
            ctx.beginPath();
            ctx.translate(0,10);
            ctx.rotate(-Math.PI / 6);
            ctx.rect(0,0,25,5);
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.translate(0,10);
            ctx.rotate(-Math.PI / 4);
            ctx.rect(0,0,25,5);
            ctx.scale(-1,1);
            ctx.rotate(-Math.PI / 2);
            ctx.rect(0,0,25,5);
            ctx.fill();
        }

        ctx.restore();
    }

    function drawBG(wRad, sPos, sAngVel) {
        // Sky
        ctx.beginPath();
        ctx.rect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "#9cc2ff"
        ctx.fill();

        // Background Windmill
        ctx.save();
        ctx.translate(canvas.width - 200,canvas.height - 235);
        ctx.scale(0.75,0.75);
        drawWindmill();
        ctx.translate(100,100);
        ctx.save();
        drawBlades(wRad-(Math.PI/4)+0.5);
        ctx.restore(); ctx.restore();

        // Ground
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.rect(0,canvas.height-35,canvas.width,35);
        ctx.fill();

        // Sun
        ctx.beginPath();
        ctx.translate(200,150);
        ctx.arc(0,0,50,0,2*Math.PI);
        ctx.fillStyle = "yellow";
        ctx.fill();

        // Sun Rays
        ctx.save();
        var col = true;
        for(var i = sRad; i < sRad+(2*Math.PI); i+=Math.PI/10) {
            ctx.beginPath();
            ctx.rotate(i);
            ctx.rect(60 + sPos,0,10,5);
            if (col == true) {
                col = !col;
                ctx.fillStyle = "yellow";
            } else {
                col = !col;
                ctx.fillStyle = "orange";
            }
            ctx.fill();
            ctx.restore(); ctx.save();
        }
        ctx.font = "80px Playbill";
        ctx.textAlign = "center";
        ctx.fillStyle = "purple";
        ctx.fillText("A Beautiful Day to Fight Giants...", 20+canvas.width/3, 50);
        ctx.restore();
    }

    function draw() {
        requestAnimationFrame(draw);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 40;
        wRad += wAngVel;
        hRad += hAngVel; hVel = hAngVel * 30; hPos += hVel;
        sRad += sAngVel; sPos += sVel;
        
        if (hPos >= canvas.width) hPos = -50;
        if (hPos < -50) hPos = canvas.width;

        if (sPos >= 20) sVel *= -1;
        if (sPos <= 0) sVel *= -1;

        ctx.save();
        drawBG(wRad, sPos, sAngVel);
        ctx.restore(); ctx.save();

        ctx.translate(canvas.width - 400,canvas.height - 300);
        drawWindmill();
        ctx.translate(100,100);
        ctx.save();
        drawBlades(wRad);
        ctx.restore(); ctx.restore(); ctx.save();

        ctx.save();
        ctx.translate(hPos,canvas.height - 130);
        drawHorse(hRad);
        if (hPos <= canvas.width - 500 && onHorse) { 
            ctx.translate(hPos+55,canvas.height - 146);
            drawRider(onHorse);
            rX = hPos; rXVel = hVel;
            rY = canvas.height -146;
        } else {
             console.log(rX, rXVel, xAcc);
             onHorse = false;

             // X-Axis
             if(rXVel > 0) rXVel -= xAcc;
             else rXVel = 0;
             rX += rXVel;

             // Y-Axis
             rYVel += yAcc;
             rY -= rYVel;

             ctx.translate(rX, rY);
             drawRider(onHorse);
        }
    }
    sVal.addEventListener("input", function(){hAngVel = sVal.value/1000});
    btn.addEventListener("click",function(){
        wRad=0; hPos=0; hRad=0; sPos=0; onHorse=true;}); 
    draw();
}

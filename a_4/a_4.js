/*
Copyright 2020
Carly Peterson -- cjpeterson7@wisc.edu
University of Wisconsin: Madison
Undergrad working toward BS of Computer Science and German
*/

window.onload = function () {
    // Initialize Global Variables
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    var slider = document.getElementById('slider');
    var inc = 0;

    // Transformation Helpers
    function moveToTx(loc,Tx) {
        var res=vec2.create(); 
        vec2.transformMat3(res,loc,Tx); 
        ctx.moveTo(res[0],res[1]);
    }

    function lineToTx(loc,Tx) {
        var res=vec2.create(); 
        vec2.transformMat3(res,loc,Tx); 
        ctx.lineTo(res[0],res[1]);
    }

    function drawTrajectory(start,end,intervals,curve,Tx,color) {
        ctx.strokeStyle=color;
        ctx.beginPath();
        moveToTx(curve(start),Tx);
        for(var i=1; i<=intervals; i++) {
            var t=((intervals-i)/intervals)*start+(i/intervals)*end;
            lineToTx(curve(t),Tx);
        }
        ctx.stroke();
    }

    // Object Functions
    function drawPointer(color, Tx) {
        ctx.beginPath();
        ctx.fillStyle = color;
        moveToTx([-.2,.1],Tx);
        lineToTx([.05,.1],Tx);
        lineToTx([0,0],Tx);
        lineToTx([.05,-.1],Tx);
        lineToTx([-.2,-.1],Tx);
        lineToTx([-.25,0],Tx);
        ctx.closePath();
        ctx.fill();
    }

    function chain(Tx) {
        var color = ["red","orange","yellow"]
        for(var i=0; i<3; i++) {
            drawPointer(color[i],Tx);
            
        }
    }

    // Curve Functions
    // c0-> wavy circle
    var inRad = 1.75; var nWav = 10.0; var h = 0.15;
    function c0(t) {
        var R = inRad + h * Math.sin(nWav * 2.0 * Math.PI * t);
        var x = R * Math.cos(2.0 * Math.PI * t);
        var y = R * Math.sin(2.0 * Math.PI * t);
        return [x,y];
    }

    function c0Tang(t) {
        var R = inRad + h * Math.sin(nWav * Math.PI * t);
        var Rdt = h * nWav * 2.0 * Math.PI * Math.cos(nWav * 2.0 * Math.PI * t);
        var x = Rdt * Math.cos(2.0 * Math.PI * t)
            - R * 2.0 * Math.PI * Math.sin(2.0 * Math.PI * t);
        var y = Rdt * Math.sin(2.0 * Math.PI * t)
            + R * 2.0 * Math.PI * Math.cos(2.0 * Math.PI * t);
        return [x,y];
    }

    function draw() {
        requestAnimationFrame(draw);
        canvas.width = window.innerWidth; canvas.height = window.innerHeight;
        var cx = canvas.width / 2; var cy = canvas.height / 2;
        inc += 0.001; if(inc > 1) inc = 0;
        var curTx = mat3.create();

        var center = mat3.create();
        mat3.fromTranslation(center,[cx,cy]);
        mat3.scale(center,center,[150,-150]);
        mat3.multiply(curTx,curTx,center);
        drawTrajectory(0,1,1000,c0,center,"red");

        var pointAxes = mat3.create();
        mat3.fromTranslation(pointAxes,c0(inc));
        var tan = c0Tang(inc); var ang = Math.atan2(tan[1],tan[0]);
        mat3.rotate(pointAxes,pointAxes,ang);
        mat3.multiply(curTx,center,pointAxes);
        drawPointer("red",curTx);

        pointAxes = mat3.create();
        mat3.fromTranslation(pointAxes,c0(inc+.01));
        tan = c0Tang(inc+0.01); ang = Math.atan2(tan[1],tan[0]);
        mat3.rotate(pointAxes,pointAxes,ang);
        mat3.multiply(curTx,center,pointAxes);
        drawPointer("orange",curTx);
    }
    draw();
}

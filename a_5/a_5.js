// Carly Peterson cjpeterson7@wisc.edu

window.onload = function(){
    /* Global Variables */
    var cvs = document.getElementById('myCanvas');
    var ctx = cvs.getContext('2d');
    var slider1 = document.getElementById('slider1');

    /* Helper Methods */
    function moveTo(loc,Tx) {
        var res=vec3.create(); 
        vec3.transformMat4(res,loc,Tx); 
        ctx.moveTo(res[0],res[1]);}

    function lineTo(loc,Tx) {
        var res = vec3.create();
        vec3.transformMat4(res,loc,Tx);
        ctx.lineTo(res[0],res[1]);}

    /* Coordinate System Outline Help */
    function drawAxes(ccs) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        moveTo([20,0,0],ccs); lineTo([0,0,0],ccs);
        moveTo([0,20,0],ccs); lineTo([0,0,0],ccs);
        moveTo([0,0,20],ccs); lineTo([0,0,0],ccs);
        ctx.stroke();
    }

    /* Curve Variables & Functions */
    var inRad = 5.0; var nWav = 30.0; var h = 5;
    function c0(t) {
        var R = inRad + h * Math.sin(nWav * 2.0 * Math.PI * t);
        var x = R * Math.cos(2.0 * Math.PI * t);
        var y = inRad * t;
        var z = R * Math.sin(2.0 * Math.PI * t);
        return [x,y,z];
    }

    function c0Tang(t) {
        var R = inRad + h * Math.sin(nWav * Math.PI * t);
        var Rdt = h * nWav * 2.0 * Math.PI * Math.cos(nWav * 2.0 * Math.PI * t);
        var x = Rdt * Math.cos(2.0 * Math.PI * t)
            - R * 2.0 * Math.PI * Math.sin(2.0 * Math.PI * t);
        var y = 1;
        var z = Rdt * Math.sin(2.0 * Math.PI * t)
            + R * 2.0 * Math.PI * Math.cos(2.0 * Math.PI * t);
        return [x,y,z];
    }

    function drawTrajectory(start,end,intervals,curve,Tx) {
        ctx.strokeStyle="green";
        ctx.beginPath();
        moveTo(curve(start),Tx);
        for(var i=1; i<=intervals; i++) {
            var t=((intervals-i)/intervals)*start+(i/intervals)*end;
            lineTo(curve(t),Tx);
        }
        ctx.stroke();
    }

    /* Camera Location Assist Methods */
    var cameraCurve = function(angle) {
        var distance = 120.0;
        var eye = vec3.create();
        eye[0] = distance*Math.sin(angle);
        eye[1] = 50;
        eye[2] = distance*Math.cos(angle);  
        return [eye[0],eye[1],eye[2]];
    }

    /* Main Draw Method */
    function draw() {
        requestAnimationFrame(draw);
        cvs.width = cvs.width;

        // Viewer Camera
        var eye = cameraCurve(slider1.value*.02*Math.PI); 
        var center = vec3.fromValues(0,0,0); 
        var up = vec3.fromValues(0,100,0);
        var camLookAt = mat4.create();
        mat4.lookAt(camLookAt,eye,center,up);

        // Projection
        var camOrtho = mat4.create(); var proj = mat4.create();
        mat4.ortho(camOrtho,-10,10,-10,10,-1,1);

        // Viewport
        var vp = mat4.create();
        mat4.fromTranslation(vp,[200,200,0]);
        mat4.scale(vp,vp,[100,-100,100]);

        // Final Coordinate System Calculation
        var fcs = mat4.create();
        mat4.multiply(fcs,vp,camOrtho);
        mat4.multiply(fcs,fcs,camLookAt);

        // Canvas
        drawAxes(fcs);
        drawTrajectory(0,2,5000,c0,fcs);
    }

    /* Onload Function */
    slider1.addEventListener('input',draw);
    draw();
}

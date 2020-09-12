function setup() { "use strict";
    var canvas = document.getElementById('myCanvas');
    var sideSize = document.getElementById('sizeChange');
    var xSlider = document.getElementById('xslider');
    var ySlider = document.getElementById('yslider');
    var slider1 = document.getElementById('slider1');
    var slider2 = document.getElementById('slider2');
    var slider3 = document.getElementById('slider3');
    
    var cx = canvas.width/2;
    var cy = canvas.height/2;
    var sl = sideSize.value;

    function draw() {
        var context = canvas.getContext('2d');
        var color = "rgb(" 
                    + slider1.value.toString(16) + ","
                    + slider2.value.toString(16) + ","
                    + slider3.value.toString(16) + ")";
        var dx = xSlider.value;
        var dy = ySlider.value;
        sl = sideSize.value;
        canvas.width=canvas.width;

        if (color == "rgb(255,255,255)"){
            context.fillStyle = "black";
            context.fillRect(0,0,canvas.width,canvas.height);
        }

        function drawDreiEck() {
            context.beginPath();
            context.fillStyle = color;
            context.moveTo(cx-(sl/2), cy+(sl*Math.sqrt(3)/4));
            context.lineTo(cx+(sl/2), cy+(sl*Math.sqrt(3)/4));
            context.lineTo(cx, cy-(sl*Math.sqrt(3)/4));
            context.closePath();
            context.fill();
        }

        
        context.translate(dx, dy);
        drawDreiEck();
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

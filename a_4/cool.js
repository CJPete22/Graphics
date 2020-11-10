    function wavyDiamond(t) {
        var Rx = Math.cos(40.0 * Math.PI * t);
        var Ry = Math.sin(40.0 * Math.PI * t);
        var x = Rx * Math.cos(2.0 * Math.PI * t);
        var y = Ry * Math.sin(2.0 * Math.PI * t);
        return [x,y];
    }

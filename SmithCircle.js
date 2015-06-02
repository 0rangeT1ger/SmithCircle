/**
 * Created by wujia_000 on 2015/6/2.
 */
var canvas = document.getElementById("canvas");
var canvas_instance = canvas.getContext("2d");
canvas_instance.circle = function(x,y,radius){  //”√”⁄ª≠‘≤
    this.beginPath();
    this.arc(x,y,radius,0,2*Math.PI,true);
    this.closePath();
    this.stroke();
}
canvas_instance.lineWidth=2;
canvas_instance.moveTo(0,250);
canvas_instance.lineTo(500,250);
canvas_instance.stroke();
canvas_instance.circle(250,250,250);
for(var i = 10; i<250; i+=20){
    canvas_instance.lineWidth=1;
    canvas_instance.circle(500-(i),250,i);

}
for(var j = 10; j<1500; j*=1.6){
    canvas_instance.circle(500,250+j,j);
    canvas_instance.circle(500,250-j,j);
}
function displayResult(e){
    var axis_x=(e.clientX-250)/250;
    var axis_y=(-e.clientY+250)/250;
    var l=Math.sqrt(axis_y*axis_y+(1-axis_x)*(1-axis_x));
    var cos = (1-axis_x)/l;
    var sin = axis_y/l;
    var x = Math.round(l/(2*sin)*10000)/10000;
    var r = Math.round(l/(2*cos)*10000)/10000;
    document.getElementById("information").innerHTML="Gamar:" + axis_x + "<br>Gamai:" + axis_y + "<br>r:" + r+"<br>x:" + x;
}
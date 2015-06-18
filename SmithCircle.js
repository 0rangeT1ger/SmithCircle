/**
 * Created by wujia_000 on 2015/6/2.
 */
var canvas = document.getElementById("canvas");
var canvas_instance = canvas.getContext("2d");
canvas_instance.circle = function(x,y,radius){  //用于画圆
    this.beginPath();
    this.arc(x,y,radius,0,2*Math.PI,true);
    this.closePath();
    this.stroke();
}

function initial(){
    canvas_instance.clearRect(0,0,500,500);
    canvas_instance.strokeStyle ="black";
    canvas_instance.lineWidth=2;
    canvas_instance.moveTo(0,250);
    canvas_instance.lineTo(500,250);
    canvas_instance.stroke();
    canvas_instance.moveTo(250,0);
    canvas_instance.lineTo(250,500);
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
}
initial();
function displayResult(e){
    initial();
    var Gammar_display = document.getElementById("Gammar");
    var Gammai_display = document.getElementById("Gammai");
    var r_display = document.getElementById("r");
    var x_display = document.getElementById("x");
    var angle_display = document.getElementById("angle");
    var z_inWindow = document.getElementById("z_in");
    var rou_isplay= document.getElementById("rou");
    var axis_x=(e.clientX-250)/250;      // 反射系数实部
    var axis_y=(-e.clientY+250)/250;     // 反射系数虚部
    var l=Math.sqrt(axis_y*axis_y+(1-axis_x)*(1-axis_x));
    var cos = (1-axis_x)/l;
    var sin = axis_y/l;
    var r_axis = l/(2*cos)*250;
    var x_axis = l/(2*sin)*250;
    var r = 250/r_axis-1;
    var x = 250/x_axis;
    var x_minified = Math.abs(Math.round(x*10000)/10000);  // 归一化电抗值
    var r_minified = Math.abs(Math.round(r*10000)/10000);  // 归一化电阻值
    var angle = calculateAngle(axis_x,axis_y)/(Math.PI*2)*0.5;
    var rou = (1+Math.sqrt(axis_x*axis_x+axis_y*axis_y))/(1-Math.sqrt(axis_x*axis_x+axis_y*axis_y))
    var z_in_real = (1-axis_x*axis_x+axis_y*axis_y)/((1-axis_x)*(1-axis_x)-axis_y*axis_y);
    var z_in_im = (-2*axis_x*axis_y)/((1-axis_x)*(1-axis_x)-axis_y*axis_y);
    canvas_instance.lineWidth = 4;
    canvas_instance.circle(500-r_axis,250,r_axis);
    canvas_instance.circle(500,Math.abs(250-x_axis),Math.abs(x_axis));
    //console.log(Math.abs(x),Math.abs(r));
    Gammar_display.innerHTML = "Gammar:"+axis_x;
    Gammai_display.innerHTML = "Gammai:"+axis_y;
    r_display.innerHTML = "r:" + r_minified;
    x_display.innerHTML = "x:" + x_minified;
    angle_display.innerHTML = "电刻度：" + Math.round(angle*100)/100;
    rou_isplay.innerHTML = "驻波系数ρ:" + rou;
    z_inWindow.innerHTML = "输入阻抗：<br>" + Math.round(z_in_real*10000)/10000 + " + " + Math.round(z_in_im*10000)/10000 + " i";
}
function calculateAngle(x,y){
    var l = Math.sqrt(x*x+y*y);
    if(x>0){
        if(y>0){          //第一象限
            return Math.asin(y/l)+Math.PI;
        }
        if(y<0){          //第四象限
            return Math.PI*2 + Math.asin(y/l)-Math.PI;
        }
    }
    if(x<0){
        if(y>0){            //第二象限
            return Math.PI - Math.asin(y/l)+Math.PI;
        }
        if(y<0){           //第三象限
            return Math.PI - Math.asin(y/l)-Math.PI;
        }
    }
}
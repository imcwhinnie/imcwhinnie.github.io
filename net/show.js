alert('This page may use a large portion of your CPU power!');


class coord{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
}

function drawnode(xco, yco, height, canvas, text){
	ctx.beginPath();
	ctx.arc(xco, yco, height/2, 0, 2*Math.PI);
	ctx.stroke();
	ctx.fillText(text, xco-15, yco);
}

function drawnetwork(net){
	var slider = document.getElementById('slider');
	slider.max = net.layers_act[net.layers_info.length-1].shape[0]-1;
	var data = slider.value;
	document.getElementById('sliderout').innerHTML = "Selected data row: "+data.toString();

	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,canvas.width, canvas.height);
	var maximumnodes = max(net.layers_info);
	var spacing = 75;
	var maximumwidth = (net.layers_info.length+1)*spacing;
	if(maximumwidth > canvas.width){
		canvas.width = maximumwidth;
	}
	var height_of_node = 400/maximumnodes;
	if(height_of_node>50){
		height_of_node = 50;
	}

	if(maximumnodes*height_of_node < canvas.height){
		canvas.height = maximumnodes*height_of_node;
	}


	ctx.fillStyle = "#FF0000";
	ctx.font = "10px Arial";


	var layers = {}


	//Draw nodes

	for(var x=0; x<net.layers_info.length; x++){
		var nonodes = net.layers_info[x];
		var padding = (maximumnodes-nonodes)*(height_of_node/2)
		var nodes = [];
		for(var y=0; y<nonodes; y++){
			var yco = (height_of_node*(y+1))-(height_of_node/2)+padding;
			var xco = spacing*(x+1);
			nodes = nodes.concat(new coord(xco,yco));
			var text = net.layers_act[x][data][y].toFixed(4);
			drawnode(xco, yco, height_of_node, ctx, text)
		}
		layers[x] = nodes;
	}
	
	//Draw lines

	for(var x=0; x<net.layers_info.length-1; x++){
		var nonodes = net.layers_info[x];
		for(var y=0; y<nonodes; y++){
			var start = layers[x][y];
			start.x += height_of_node/2
			for(var z=0; z<net.layers_info[x+1];z++){
				var end = layers[x+1][z];
				var newx = end.x - height_of_node/2 //Editing the variable does bad things so a new variable
				var grad = (end.y-start-y)/(end.x-start.x)
				ctx.beginPath();
				ctx.moveTo(start.x, start.y);
				ctx.lineTo(newx, end.y);
				ctx.stroke();
			}
		}
	}
}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


window.onload = drawnetwork(go);

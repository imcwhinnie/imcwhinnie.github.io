function changedeep(){
    var form = document.forms['hidden'];
    var values = {}
    for(var x=0; x<form.length; x++){
        if(form[x].value != ""){
            values[form[x].name] = Number(form[x].value);
        }else{
            values[form[x].name] = 1;
            form[x].value = 1;
        }
    }
    var new_layers = JSON.parse(JSON.stringify(go.layers_info)); //Will be the end of me
    for(value in values){
        new_layers[value] = values[value];
    }
    if(new_layers != go.layers_info){
        go = new NeuralNetwork(new_layers);
        go.feedforward(ins);
        showcost(go, outs);
        drawnetwork(go);
    }
}

function addlayer(){
    var new_layers = go.layers_info
    new_layers = new_layers.slice(0,-1).concat(1).concat(new_layers[new_layers.length-1])
    go = new NeuralNetwork(new_layers);
    go.feedforward(ins);
    showcost(go, outs);
    drawnetwork(go);
    listhidden(go);
}

function deletelayer(){
    if(go.layers_info.length > 2){
        var new_layers = go.layers_info
        new_layers = new_layers.slice(0,-2).concat(new_layers[new_layers.length-1])
        go = new NeuralNetwork(new_layers);
        go.feedforward(ins);
        showcost(go, outs);
        drawnetwork(go);
        listhidden(go);
    }else{
        alert('Not enough layers.')
    }
}

function listhidden(net){
    var list = document.getElementById('hiddenlist');
    list.innerHTML = '';
    for(var i=1; i<net.layers_info.length-1; i++){
        list.innerHTML += '<li>Layer '+i.toString()+'<input type="number" name='+i.toString()+' value='+go.layers_info[i]+'></li>';
    }
}
function download(){
    var link = document.getElementById('downloadlink');
    var name = prompt('Please enter the name of your neural network:');
    if(name){
        link.download = name+'.nn';
        link.href = 'data:text/plain;charset=utf-8,'+JSON.stringify(go);
        link.click();
    }
}

function usenet(jsondata){
    var newnet = JSON.parse(jsondata);

    var to = new NeuralNetwork(newnet.layers_info);
    
    for(property in newnet){
        if(newnet.hasOwnProperty(property)){
            if(typeof(newnet[property]) == 'object' && !(Array.isArray(newnet[property]))){
                for(index in newnet[property]){
                    to[property][index] = new mat(newnet[property][index]);
                }
            }else{
                to[property] = newnet[property];
            }
        }
    }


    if(to.layers_info[0]+to.layers_info[to.layers_info.length-1] != ins.shape[1]+outs.shape[1]){
        alert('Neural Network does not match training data.');
    }else{
        go = to
        go.feedforward(ins);
        showcost(go, outs);
        drawnetwork(go);
        listhidden(go);
    }
}


function readNet() {

    var files = document.getElementById('nn-file').files;
    if (!files.length) {
      alert('Please select a file!');
      return;
    }

    var file = files[0];
    var start = 0;
    var stop =  file.size - 1;

    var reader = new FileReader();

    reader.onloadend = function(evt) {
        if (evt.target.readyState == FileReader.DONE) { 
            usenet(evt.target.result);
        }
    };

    var blob = file.slice(start, stop + 1);
    reader.readAsText(blob);
}
  
  
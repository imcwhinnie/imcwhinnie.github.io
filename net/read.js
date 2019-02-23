function parsedata(data){
    csv = data;
    csv = csv.slice(3);
    csv = csv.split('\n');
    lenin = go.layers_info[0];
    lenout = go.layers_info[go.layers_info.length-1];

    if(csv[0].split(',').length != lenin+lenout){
        if(confirm('Would you like to change the network to match the data set?')){
            newlenin = Number(prompt('How many input features are there?'));
            newlenout = (csv[0].split(',').length)-newlenin;
            if(confirm('New input size: '+newlenin.toString()+'\nNew output size: '+newlenout.toString()+'\nPress cancel to cancel.')){
                var new_layers = go.layers_info
                new_layers[0] = newlenin;
                new_layers[new_layers.length-1] = newlenout;
                go = new NeuralNetwork(new_layers);
                parsedata(data);
                go.feedforward(ins);
                showcost(go, outs);
                drawnetwork(go);
                listhidden(go);
            }else{
                return false;
            }

        }
    }

    var new_in= new mat([]);
    var new_out = new mat([]);

    for(var i=0; i<csv.length; i++){
        var line = csv[i].split(',');
        if(line.length != lenin+lenout){
            continue
        }
        var new_in_line = new mat([]);
        for(var x=0; x<lenin; x++){
            new_in_line = new_in_line.concat(Number(line[x]));
        }
        var new_out_line = new mat([]);
        for(var x=0; x<lenout; x++){
            new_out_line = new_out_line.concat(Number(line[lenin+x]));
        }
        new_in = new_in.concat([new_in_line]);
        new_out = new_out.concat([new_out_line]);
    }

    ins = new_in;
    outs = new_out;

    go.feedforward(ins);
    showcost(go, outs);
    drawnetwork(go);
    showdata(ins, outs);
    listhidden(go);
}



function readBlob() {

    var files = document.getElementById('csv-file').files;
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
        parsedata(evt.target.result);
      }
    };

    var blob = file.slice(start, stop + 1);
    reader.readAsBinaryString(blob);
}
  
  

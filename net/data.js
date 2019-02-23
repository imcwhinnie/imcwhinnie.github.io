


var table = document.getElementById('dataTable');


function showdata(inputs, outputs){


    while(table.firstChild){
       table.removeChild(table.firstChild);
    }



    var rowsinput = inputs.shape[0];
    var columnsinput = inputs.shape[1];

    var columnsoutput = outputs.shape[1];


    var headrow = document.createElement('tr');
    table.appendChild(headrow);


    var header = document.createElement('th');
    headrow.appendChild(header)
    for(var i=0; i<columnsinput; i++){
        var header = document.createElement('th');
        header.innerHTML = "Input no."+i.toString();
        headrow.appendChild(header);
    }
    for(var i=0; i<columnsoutput; i++){
        var header = document.createElement('th');
        header.innerHTML = "Output no."+i.toString();
        headrow.appendChild(header);
    }



    for(var j=0; j<rowsinput; j++){
        var newrow = document.createElement('tr');
        var index = document.createElement('td');
        index.innerHTML = j;
        newrow.appendChild(index);
        for(var i=0; i<columnsinput; i++){
            var data = document.createElement('td');
            data.innerHTML = inputs[j][i];
            newrow.appendChild(data);
        }
        for(var i=0; i<columnsoutput; i++){
            var data = document.createElement('td');
            data.innerHTML = outputs[j][i];
            newrow.appendChild(data);
        }
        table.appendChild(newrow);
    }
}


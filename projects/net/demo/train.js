function donetraining(net, output_data){
  showcost(net, output_data);
  drawnetwork(net);
  statusupdate('Not Training');
}

function inccount(){
  document.getElementById('count').innerHTML = Number(document.getElementById('count').innerHTML) + 1;
}

function heavytraining(net, times, input_data, output_data){
  for(var x=0; x<times; x++){
    net.train(input_data, output_data);
    setTimeout(inccount, 0);
  }
  donetraining(net, output_data);
}

function dosomething(net, input_data, output_data){
  times = Number(prompt('How many times would you like to train?'));
  statusupdate('Training');
  setTimeout(heavytraining, 50, net, times, input_data, output_data);
}


function showcost(net, output_data){
  document.getElementById('averagecost').innerHTML = net.averageCost(output_data).toString();
}

function statusupdate(text){
  document.getElementById('status').innerHTML = text;
}
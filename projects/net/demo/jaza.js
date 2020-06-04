/*
MIT License

Copyright (c) 2018 Iain McWhinnie <--- yah boi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

debug = false;

class mat extends Array{
  constructor(array){
    super();
    var rr = JSON.parse(JSON.stringify(array));
    for(var i=0;i<rr.length;i++){
      this.push(rr[i]);
    }
  }

  sum(ndarray){
    ndarray = ndarray || this;
    var total = 0;
    for(var i=0; i<ndarray.length; i++){
      if(typeof(ndarray[i]) == "object"){
        total += this.sum(ndarray[i]);
      }else{
        total += ndarray[i];
      }
    }
    return total;
  }

  no_of_digits(ndarray){
    ndarray = ndarray || this;
    var count = 0;
    for(var i=0; i<ndarray.length; i++){
      if(typeof(ndarray[i]) == "object"){
        count += this.no_of_digits(ndarray[i]);
      }else{
        count += 1;
      }
    }
    return count;
  }

  get average(){
    return this.sum()/this.no_of_digits();
  }

  indexaxiszero2d(index){
    var new_array = [];
    for(var i=0;i<this.length;i++){
      new_array.push(this[i][index]);
    }
    return new mat(new_array);
  }

  indexaxiszero3d(index){
    var new_array = [];
    for(var i=0;i<this.length;i++){
      var new_new_array = [];
      for(var j=0;j<this[0].length;j++){
        new_new_array.push(this[i][j][index]);
      }
      new_array.push(new_new_array);
    }
    return new mat(new_array);
  }

  assignaxis3d(index, value){
    //eg this[:,:,index] = value
    for(var i=0;i<this.length;i++){
      for(var j=0;j<this[0].length;j++){
        this[i][j][index] = value[i][j];
      }
    }
  }

  assignaxis2d(index, value){
    for(var i=0;i<this.length;i++){
      this[i][index] = value[i];
    }
  }

  get averageaxis0(){
    var total = zerosndArray(this.shape.splice(1));
    var count = 0;
    for(var x=0; x<this.shape[0]; x++){
      total = addArrays(total, this[x]);
      count = count + 1;
    }
    function dividebycount(x){return x/count};
    return total.applyfunc(dividebycount);
  }

  applyfunc(func, ndarray){
    var ndarray = ndarray || new mat(JSON.parse(JSON.stringify(this)));
    for(var i = 0; i<ndarray.length;i++){
      if(typeof(ndarray[i])!="number"){
        ndarray[i] = this.applyfunc(func,ndarray[i]);
      }else{
        ndarray[i] = func(ndarray[i]);
      }
    }
    return ndarray;
  }

  shapecalc(ndarray){
    ndarray = ndarray || this;
    var shape = [];
    var depth = 0;
    while(true){
      var current = ndarray;
      for(var i = 0; i<depth;i++){
        current = current[0];
      }
      if(typeof(current)=="number"){
        break;
      }
      shape.push(current.length);
      depth += 1;
    }
    return shape;
  }

  get shape(){
    return this.shapecalc();
  }

  get transpose2d(){
    var new_array = zerosndArray(this.shape.reverse());
    for(var x=0; x<this[0].length; x++){
      new_array[x] = this.indexaxiszero2d(x);
    }
    return new_array;
  }

  getthicc(ndarray){//Disgusting and useless function
    ndarray = ndarray || this;
    for(var i = 0; i<ndarray.length;i++){
      if(typeof(ndarray[i])!="number"){
        ndarray[i] = this.getthicc(ndarray[i]);
      }else{
        var nnew_array = [];
        for(var y=0; y<ndarray.length;y++){
          nnew_array.push(ndarray[i]);
          nnew_array.push(ndarray[i]);
        }
        ndarray = nnew_array;
        break;//If you like a good infinite loop remove this line
      }
    }
    return ndarray;
  }

  scalar(factor, ndarray){
    ndarray = ndarray || this;
    function scale(x){return x*factor};
    ndarray = ndarray.applyfunc(scale);
    return ndarray;
  }

}


function sigmoid(x){
  return 1/(1+Math.exp(-x));
}

function dsigmoid(x){
  x = sigmoid(x);
  return x*(1-x);
}

function zerosArray(length){
  return new mat(new Array(length).fill(0));//Stack overflow
}

function zerosndArray(shape, index){
  index = index || 0;
  var new_array = [];
  if(index==shape.length-1){
    return zerosArray(shape[index]);
  }else{
    for(var i=0; i<shape[index]; i++){
      new_array.push(zerosndArray(shape, index+1));
    }
  }
  return new mat(new_array);
}

function randomArray(length){
  var new_array = [];
  for(var i=0;i<length;i++){
    new_array.push((Math.random()*2)-1);//Mean of 0
  }
  return new_array;
}

function randomndArray(shape, index){
  index = index || 0;
  var new_array = [];
  if(index==shape.length-1){
    return randomArray(shape[index]);
  }else{
    for(var i=0; i<shape[index]; i++){
      new_array.push(randomndArray(shape, index+1));
    }
  }
  return new mat(new_array);
}

function multiplyArrays(x,y){
  var new_array = [];
  for(var i=0; i<x.length;i++){
    if(typeof(x[i])!="number"){
      new_array.push(multiplyArrays(x[i],y[i]));
    }else{
      new_array.push(x[i]*y[i]);
    }
  }
  return new mat(new_array);
}

function addArrays(x,y){
  var new_array = [];
  for(var i=0; i<x.length;i++){
    if(typeof(x[i])!="number"){
      new_array.push(addArrays(x[i],y[i]));
    }else{
      new_array.push(x[i]+y[i]);
    }
  }
  return new mat(new_array);
}

function addBis(layer,bis){
  var new_array = [];
  for(var i=0; i<layer.length;i++){
    if(typeof(layer[i])!="number"){
      new_array.push(addArrays(layer[i],bis[0]));
    }else{
      new_array.push(layer[i]+bis[0][i]);
    }
  }
  return new mat(new_array);
}

function subArrays(x,y){
  var new_array = [];
  for(var i=0; i<x.length;i++){
    if(typeof(x[i])!="number"){
      new_array.push(subArrays(x[i],y[i]));
    }else{
      new_array.push(x[i]-y[i]);
    }
  }
  return new mat(new_array);
}

function dot(a,b){
  //https://mathinsight.org/matrix_vector_multiplication
  if(a.shape[1]!=b.shape[0]){
    console.log('Shapes not aligned.');
  }
  var dot_product = new mat(zerosndArray([a.shape[0],b.shape[1]]));
  for(var x=0; x<dot_product.shape[0];x++){
    for(var y=0; y<dot_product.shape[1];y++){

      var scales = b.indexaxiszero2d(y);
      var values = a[x];//numpy equilivant a[:,x]
      var products = new mat(multiplyArrays(scales,values));
      dot_product[x][y] = products.sum();
    }
  }

  return dot_product;
}

function max(array){
  var maximum = 0;
  for(var x=0; x<array.length; x++){
    if(array[x]>maximum){
      maximum = array[x];
    }
  }
  return maximum
}

function square(x){return x**2}
function times2(x){return x*2}

class NeuralNetwork{
  constructor(layers){
    this.layers_info = layers;
    this.rate = 1;

    this.layers = {};
    this.layers_act = {};
    for(var i=0; i<this.layers_info.length;i++){
      if(i!=0){
        this.layers[i] = new mat(zerosndArray([1,this.layers_info[i]]));
      }
      this.layers_act[i] = new mat(zerosndArray([1,this.layers_info[i]]));
    }

    this.syn = {};
    this.bis = {};
    var no_nodes_prev = this.layers_info[0];
    for(var i=1;i<this.layers_info.length;i++){
      var no_nodes_now = this.layers_info[i];
      this.syn[i] = new mat(randomndArray([no_nodes_prev, no_nodes_now]));
      this.bis[i] = new mat(randomndArray([no_nodes_now, 1]));
      no_nodes_prev = no_nodes_now;
    }
  }

  feedforward(first_layer){
    this.layers_act[0] = first_layer;
    var prev;
    for(var i=0; i<this.layers_info.length-1;i++){
      prev = this.layers_act[i];
      this.layers[i+1] = dot(prev, this.syn[i+1]);
      this.layers[i+1] = addBis(this.layers[i+1], this.bis[i+1].transpose2d);
      var unact = this.layers[i+1];
      this.layers_act[i+1] = unact.applyfunc(sigmoid);
    }
  }

  cost(expected, deriv){
    deriv = deriv || false;
    var output_layer = this.layers_act[this.layers_info.length-1];
    if(!deriv){
      return subArrays(output_layer, expected).applyfunc(square);
    }else{
      return subArrays(output_layer, expected).applyfunc(times2);
    }
  }

  averageCost(expected){
    return this.cost(expected).average;
  }

  getgrad(layer, first_layer, expected, previousGrad){

    var no_data_samp = first_layer.shape[0];
    if(no_data_samp != expected.shape[0]){
      console.error('Data sets don\'t match.');
    }

    var layer_before = this.layers_act[layer-1];
    var last_layer_no = (this.layers_info.length-1);

    if(layer==last_layer_no){
      var gprev = this.cost(expected, true);
    }else if(!gprev){
      var gprev = this.getgrad(layer+1, first_layer, expected)[2];
    }

    var combis = this.layers_info[layer];
    //console.log('layer '+layer+' has '+combis+' combis');
    var combis_this_layer = this.layers_info[layer-1];

    var full_g_syn = zerosndArray(([no_data_samp].concat(this.syn[layer].shape)));
    var full_g_bis = zerosndArray(([no_data_samp].concat(this.bis[layer].shape)));
    var full_g_prev = zerosndArray(([no_data_samp].concat(combis_this_layer)));

    for(var x=0; x<combis; x++){
      var cur_gprev = new mat(gprev.indexaxiszero2d(x));
      if(debug){console.log('Layer: '+layer)};
      if(debug){console.log('cur_gprev.shape: ',cur_gprev.shape)};
      var glayact = new mat(this.layers[layer].applyfunc(dsigmoid).indexaxiszero2d(x));
      if(debug){console.log('glayact.shape: ',glayact.shape)};
      var gsynlay = layer_before;
      if(debug){console.log('gsynlay.shape: ',gsynlay.shape)}

      //grad_syn = cur_gprev*glayact*gsynlay
      var grad_syn = new mat(gsynlay);
      for(var i=0; i<no_data_samp; i++){
        grad_syn[i] = new mat(grad_syn[i]).scalar(glayact[i]*cur_gprev[i]);
      }
      if(debug){console.log('grad_syn.shape: ',grad_syn.shape)};
      


      //gbislay = 1

      //grad_bis = cur_gprev*glayact*1
      var grad_bis = multiplyArrays(cur_gprev, glayact);
      //shape will be [4]
      //needs to be [4,1]
      for(var i=0; i<grad_bis.length; i++){
        grad_bis[i] = [grad_bis[i]];
      }
      if(debug){console.log('grad_bis.shape: ',grad_bis.shape)};

      var gprelay = this.syn[layer].indexaxiszero2d(x);
      if(debug){console.log('gprelay.shape: ',gprelay.shape)};

      //grad_prev = gprelay*glayact*cur_gprev
      var grad_prev = zerosndArray([no_data_samp, combis_this_layer]);
      for(var i=0; i<cur_gprev.length; i++){
        for(var j=0; j<gprelay.length; j++){
          grad_prev[i][j] = cur_gprev[i]*glayact[i]*gprelay[j];
        }
      }
      if(debug){console.log('grad_prev.shape: ',grad_prev.shape)};


      //full_g_syn[:,:,x] += grad_syn
      full_g_syn.assignaxis3d(x, addArrays(grad_syn,full_g_syn.indexaxiszero3d(x)));
      //full_g_bis[:,x] += grad_bis
      full_g_bis.assignaxis2d(x, addArrays(grad_bis,full_g_bis.indexaxiszero2d(x)));
      //full_g_prev += grad_prev
      full_g_prev = addArrays(full_g_prev, grad_prev);
    }

    return [full_g_syn,full_g_bis,full_g_prev];
  }

  train(input_data, output_data){
    this.feedforward(input_data);
    var gprev = undefined
    var syn, bis, prev
    for(var i=this.layers_info.length-1; i>=1; i--){
      [syn,bis,prev] = this.getgrad(i, input_data, output_data, gprev);
      this.syn[i] = subArrays(this.syn[i], syn.averageaxis0.scalar(this.rate));
      this.bis[i] = subArrays(this.bis[i], bis.averageaxis0.scalar(this.rate));
      gprev = prev;
    }
  }

}



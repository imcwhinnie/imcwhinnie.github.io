
//alert('This page may use a large portion of your CPU power!');

go = new NeuralNetwork([2,1]);

ins = new mat([[0.5 , 0.25],
               [0.25, 0.5 ],
               [0.5 , 0.5 ],
               [0.25, 0.25]]);

outs = new mat([[1],
                [0],
                [1],
                [0]]);

go.feedforward(ins);

window.onload = showcost(go, outs);
window.onload = showdata(ins, outs);
window.onload = drawnetwork(go);
window.onload = listhidden(go);
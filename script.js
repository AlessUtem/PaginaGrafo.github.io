/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints a message in the browser's dev tools console
console.log("Hello 🌎");



var nodes = new vis.DataSet([
  { id: 1, label: "Node 1" },
  { id: 2, label: "Node 2" },
  { id: 3, label: "Node 3" },
  { id: 4, label: "Node 4" },
  { id: 5, label: "Node 5" },
]);

// create an array with edges
var edges = new vis.DataSet([
  { from: 1, to: 3 ,label: "1"},
  { from: 1, to: 2,label: "2"},
  { from: 2, to: 4 ,label: "3"},
  { from: 2, to: 5 ,label: "4"},
  { from: 3, to: 3 ,label: "5"},
]);



//FUNCION PARA AÑADIR UN NODO
var ID=7;
function añadirnodo(){
  
  var Label="G-"
 nodes.add([{id: ID, label:Label+ID}]);
  ID=ID+1;
}


//FUNCION PARA CONECTAR NODOS



function conectarnodos(DESDE,HASTA,PESO){
edges.add([{from: document.getElementById("DESDE"),
            to: document.getElementById("HASTA"),
            label:document.getElementById("PESO"),}]);
  
}







// FUNCION PARA EDITAR NODOS
function editarnodos(ID,Label){
nodes.updateOnly({id:ID, label:Label});
}

//FUNCION PARA BORRAR DATOS DEL NODO
function borrarnodo(ID){
  nodes.remove(ID);
  
}

//FUNCION PARA BORRAR ARISTA
function borrararista(label){
  edges.remove(label);
  
}

var ids = nodes.getIds();
console.log('ids', ids);



añadirnodo();  
conectarnodos(6,1,"5");
editarnodos(5,"Node five");
borrarnodo(3);
borrararista("2");

var item1 = nodes.get(2);
console.log('item1', item1);

var item2 = edges.get();
console.log('item2', item2);
// RETORNA ITEM QUE CONTIENE EL OBJETO EDGES 
var items = edges.get({
  filter: function (item) {
    return item.from== 1;
  }
});
console.log('filtered items', items);





/*
  var nodoId = 1;
  nodo = {
            add: function(tipo){

                  color = '#CCCDC5';
                  label = 'I-';
              
                nodo = {
                    id: nodoId, 
                    label: label+nodoId
                   
                };
                nodoId += 1;
                nodes.add(nodo);
            }
        };
        */
var nodoId = 8;
var label12;
var nodo;
function añadirn(){
 label12 = 'I-';
  nodo = ([{
       id: nodoId, 
       label: label12+nodoId
          
  }]);
  nodoId+=1;
  nodes.add(nodo);
  
}



// create a network
var container = document.getElementById("mynetwork");
var data = {
  nodes: nodes,
  edges: edges,
};
var options = {};
var network = new vis.Network(container, data, options);


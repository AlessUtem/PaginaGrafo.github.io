/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints a message in the browser's dev tools console
console.log("Hello 🌎");



var nodes = new vis.DataSet([]);

// create an array with edges
var edges = new vis.DataSet([]);


//FUNCION PARA AÑADIR UN NODO
var ID=1;
function añadirnodo(){
  
  var Label="G-"
 nodes.add([{id: ID, label:Label+ID}]);
  ID=ID+1;
}


//FUNCION PARA CONECTAR NODOS
function conectarnodos(){
      edges.add([{from: document.getElementsByName("DESDE")[0].value,
            to: document.getElementsByName("HASTA")[0].value,
            label:document.getElementsByName("PESO")[0].value}]);
  
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


/*
añadirnodo();  
conectarnodos(6,1,"5");
editarnodos(5,"Node five");
borrarnodo(3);
borrararista("2");
conectarnodos(1,7,"2");

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
*/


    
// create a network


var container = document.getElementById("mynetwork");
var data = {
  nodes: nodes,
  edges: edges,
};
var options = {};
var network = new vis.Network(container, data, options);




/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints a message in the browser's dev tools console
console.log("Hello 🌎");

var nodes = new vis.DataSet([
  { id: 1, label: "Node a" },
  { id: 2, label: "Node b" },
  { id: 3, label: "Node c" },
  { id: 4, label: "Node d" },
  { id: 5, label: "Node e" }
]);

// create an array with edges
var edges = new vis.DataSet([
  { from: 1, to: 3, label: "1" },
  { from: 1, to: 4, label: "1" },
  { from: 1, to: 5, label: "1" },
  { from: 2, to: 3, label: "1" },
  { from: 2, to: 4, label: "1" },
  { from: 2, to: 1, label: "1" },
  { from: 3, to: 5, label: "1" }
  
]);



//CREAMOS UNA MATRIZ A PARTIR DEL VECTOR QUE TIENE TODOS LOS IDS DE LOS NODOS
let generarMatriz = size => {
  let matriz = [];
  let random = () => 0;
  for (let x = 0; x < size; x++) {
    matriz[x] = [];
    for (let y = 0; y < size; y++) {
      matriz[x][y] = random();
    }
  }
  return matriz;
};


//CREAMOS LA VARIABLE CANTIDAD QUE ALAMCENA EL VECTOR CON LOS IDS DE LOS NODOS
var cantidad = nodes.getIds();
//CREAMOS LA VARIABLE ARRAYAUX QUE SERA LA MATRIZ DE LARGO LARGOIDXLARGOID LLENADO CON 0
var arrayaux = [];
// GENERAMOS LA MATRIZ ARRAYAUX 
arrayaux = generarMatriz(cantidad.length);




function arrayFinal() {
  for (var i = 0; i < arrayaux.length; i++) {
    for (var j = 0; j < arrayaux.length; j++) 
    {
      //BUSCAMOS TODOS LAS ARISTAS QUE CORRESPONDAN AL ID i+1, EN ESTE CASO 0+1=1
        var items = edges.get({
        filter: function (item) {
        return item.from== i+1;}});
    //DE ESAS ARISTAS SACAMOS LOS TO O DE DONDE ESTAN CONECTADOS 
        var from1 = items.map(function(items) {
            return items.to;});
      
      //LO MISMO PERO AQUI LO HACEMOS AL REVES
        var items2 = edges.get({
        filter: function (item) {
        return item.to== i+1;}});
    // ES PORQUE EN EL PRIMER ITEMS NO SE ENCUENTRAN SI ESTAN CONECTADOS INVERSAMENTE
        var from2 = items2.map(function(items) {
        return items.from;});
      //SUMAMOS LOS DOS VECTORES
      Array.prototype.push.apply(from1, from2);
      //CON EL LARGO DE FROM1 ENTONCTRAMOS A CUANTOS NODOS ESTA CONECTADO EL NODO ID i+1
      //ENTONCES RECORRIMOS ESE LARGO EJ: ID 1 TIENE LARGO 4 PQ TIENE 4 NODOS CONECTADOS
      //ENTONCES CON EL IF, AL LA MATRIZ ESTAR LLENA DE 0 SOLO LE VA LLENANDO CON 1 A LOS
      //INDICES QUE SEAN IGUALES AL CONTENIDO DE FROM1
       for (var z = 0; z< from1.length; z++){
        if(j+1==from1[z])  {
          arrayaux[i][j]=1;
        }  
      }
    }
  }     
  arrayFinal=arrayaux;
  return arrayFinal;
}
arrayFinal();


//FUNCION PARA AÑADIR UN NODO
var ID = 6;
function añadirnodo() {
  var Label = "G-";
  nodes.add([{ id: ID, label: Label + ID }]);
  ID = ID + 1;
}

//FUNCION PARA CONECTAR NODOS
function conectarnodos() {
  edges.add([
    {
      from: document.getElementsByName("DESDE")[0].value,
      to: document.getElementsByName("HASTA")[0].value,
      label: document.getElementsByName("PESO")[0].value
    }
  ]);
}

// FUNCION PARA EDITAR NODOS
function editarnodos(ID, Label) {
  nodes.updateOnly({ id: ID, label: Label });
}

//FUNCION PARA BORRAR DATOS DEL NODO
function borrarnodo(ID) {
  nodes.remove(ID);
}

//FUNCION PARA BORRAR ARISTA
function borrararista(label) {
  edges.remove(label);
}

var ids = nodes.getIds();
console.log("ids", ids);


function agregarElementos(){ 
var lista=document.getElementById("MostrarMatriz"); 
arrayFinal.forEach(function(data,index){
var linew= document.createElement("li");    
var contenido = document.createTextNode(data);
lista.appendChild(linew);
linew.appendChild(contenido);

})
}
agregarElementos();

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
  edges: edges
};
var options = {};
var network = new vis.Network(container, data, options);

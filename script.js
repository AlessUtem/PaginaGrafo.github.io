/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints a message in the browser's dev tools console
console.log("Hello 🌎");
var container = document.getElementById("mynetwork");

//NO DIRIGIDOS A NO DIRIGIDOS
/*
var xoptions = {
  edges: {
    arrows: {
      to: { enabled: true, scaleFactor: 1, type: "arrow" }
    }
  }
};
*/
var container = document.getElementById("mynetwork");
var data = {
  nodes: nodes,
  edges: edges
};
var nodes = new vis.DataSet([
  { id: 1, label: "Nodo 1" },
  { id: 2, label: "Nodo 2" },
  { id: 3, label: "Nodo 3" },
  { id: 4, label: "Nodo 4" },
  { id: 5, label: "Nodo 5" }
]);

var o_nodes = new vis.DataSet(nodes);

// create an array with edges

var edges = new vis.DataSet([
  { id:"1-1" ,from: 1, to: 2, label: "1" },
  { id:"1-2" ,from: 1, to: 3, label: "1" },
  { id:"1-3" ,from: 1, to: 4, label: "1" },
  { id:"2-1" ,from: 2, to: 5, label: "1" },
  { id:"3-1" ,from: 3, to: 5, label: "1" },
  { id:"4-1",from: 4, to: 5, label: "1" },
]);

var data = {
  nodes: nodes,
  edges: edges
};
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

//FUNCION PARA AÑADIR UN NODO
var ID = 6;
function añadirnodo() {
  var Label = "Nodo ";
  nodes.add([{ id: ID, label: Label + ID }]);
  ID = ID + 1;
}
function añadirarista(){
  var options = {
  manipulation: {
    enabled:true,
    addEdge: function(edgeData,callback) {
      if (edgeData.from === edgeData.to) {
        var r = confirm("Do you want to connect the node to itself?");
        if (r === true) {
          callback(edgeData);
        }
      }
      else {
        callback(edgeData);
      }
    }
  }
}
}
//FUNCION PARA CONECTAR NODOS
function conectarnodos() {
  var aristas =edges.get();
  var contadoraristas=aristas.filter(aristas=>aristas.from==document.getElementsByName("DESDE")[0].value);
contadoraristas=contadoraristas.length+1
  edges.add([
    {
      from: document.getElementsByName("DESDE")[0].value,
      to: document.getElementsByName("HASTA")[0].value,
      label: document.getElementsByName("PESO")[0].value,   
      id:(document.getElementsByName("DESDE")[0].value+"-"+contadoraristas),
    }
  ]);
}

// FUNCION PARA EDITAR NODOS
function editarnodos(ID, Label) {
  //nodes.updateOnly({ id: ID, label: Label });
}

//FUNCION PARA BORRAR DATOS DEL NODO
function borrarnodo() {
  var ide = document.getElementsByName("ELIMINAR")[0].value;
  ide = ide - 0; 
  nodes.remove(ide);
   var aristas =edges.get();
  
  var contadoraristas=aristas.filter(aristas=>aristas.from==ide);
    var x=contadoraristas.length;
    while(x!=0){
      edges.remove(contadoraristas[x-1].id);
      x=x-1;
    }
  
  contadoraristas=aristas.filter(aristas=>aristas.to==ide);
  x=contadoraristas.length;
   while(x!=0){
      edges.remove(contadoraristas[x-1].id);
      x=x-1;
    }
}

//FUNCION PARA BORRAR ARISTA
function borrararista(label) {
  edges.remove(label);
}

var arrayaux = [];
//Funcion
function arrayFinal() {
  arrayaux = [];
  var from1;
  //CREAMOS LA VARIABLE CANTIDAD QUE ALAMCENA EL VECTOR CON LOS IDS DE LOS NODOS
  var cantidad = nodes.getIds();
  //CREAMOS LA VARIABLE ARRAYAUX QUE SERA LA MATRIZ DE LARGO LARGOIDXLARGOID LLENADO CON 0
  // GENERAMOS LA MATRIZ ARRAYAUX
  arrayaux = generarMatriz(cantidad.length);

  for (var i = 0; i < arrayaux.length; i++) {
    for (var j = 0; j < arrayaux.length; j++) {
      //BUSCAMOS TODOS LAS ARISTAS QUE CORRESPONDAN AL ID i+1, EN ESTE CASO 0+1=1
      from1 = vectornodos(i);
      //CON EL LARGO DE FROM1 ENCONTRAMOS A CUANTOS NODOS ESTA CONECTADO EL NODO ID i+1
      //ENTONCES RECORRIMOS ESE LARGO EJ: ID 1 TIENE LARGO 4 PQ TIENE 4 NODOS CONECTADOS
      //ENTONCES CON EL IF, AL LA MATRIZ ESTAR LLENA DE 0 SOLO LE VA LLENANDO CON 1 A LOS
      //INDICES QUE SEAN IGUALES AL CONTENIDO DE FROM1
      for (var z = 0; z < from1.length; z++) {
        if (j + 1 == from1[z]) {
          arrayaux[i][j] = 1;
        }
      }
    }
  }
  return arrayaux;
}

var tabla;
var tblBody;
var haytabla = false;
function genera_tabla() {
  var arrayX = arrayFinal();
  var cantidad = nodes.getIds();

  if (haytabla == true) {
    tabla.removeChild(tblBody);
    haytabla = false;
  }
  if (haytabla == false) {
    // Obtener la referencia del elemento body
    var body = document.getElementsByTagName("body")[0];

    // Crea un elemento <table> y un elemento <tbody>

    tabla = document.getElementById("matrizdecaminos");
    tblBody = document.createElement("tbody");

    // Crea las celdas
    for (var i = 0; i < cantidad.length; i++) {
      // Crea las hileras de la tabla
      var hilera = document.createElement("tr");

      for (var j = 0; j < cantidad.length; j++) {
        // Crea un elemento <td> y un nodo de texto, haz que el nodo de
        // texto sea el contenido de <td>, ubica el elemento <td> al final
        // de la hilera de la tabla
        var celda = document.createElement("td");
        var textoCelda = document.createTextNode(arrayaux[i][j]);
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
      }
      // agrega la hilera al final de la tabla (al final del elemento tblbody)
      tblBody.appendChild(hilera);
    }

    // posiciona el <tbody> debajo del elemento <table>
    console.log(tabla);
    tabla.appendChild(tblBody);
    // appends <table> into <body>

    //body.appendChild(tabla); deja la tabla de matriz por debajo de la pagina

    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");
    haytabla = true;
  }
}

function grafoconexo() {
  var retornar;
  var grafoconexo1;
  var from1;
  var from2;
  var canid = nodes.getIds();
  var comprobarsi = 0;

  //creamos for que recorra el largo de nodos que existen
  for (var i = 0; i < canid.length; i++) {
    from1 = vectornodos(i); //obtenemos un vector con los nodos a los cuales esta conectado
    //el nodo actual(nodo(i))
    from2 = vectornodos2(i); //obtenemos lo mismo que en el anterior pero incluyendo el nodo(i)
    //llamamos a la funcion repetidos para ver si hay algun nodo conectado SOLO a si mismo o
    //en su defecto conectado a nada
    if (repetidos(from2).length <= 1) {
      comprobarsi = 1;
    }
    //entonces si esta vacio o solo esta conectado a si mismo se hace verdadero la sentencia
    //y se termina el bucle for
    if (comprobarsi == 1) {
      grafoconexo1 = true;
      break;
    } else {
      grafoconexo1 = false;
    }
  }

  if (grafoconexo1 == true) {
    retornar = true;
  } else {
    retornar = false;
  }
  return retornar;
}

function imprimirgrafoconexo() {
  var grafoconexo1 = grafoconexo();
  var retornar;

  if (grafoconexo1 == true) {
    retornar = "El grafo no es conexo";
  } else {
    retornar = "El grafo es conexo";
  }
  return retornar;
}

// funciona para el boton de comprobar si el grafo es conexo
function recargar(contenido) {
  contenido = imprimirgrafoconexo();
  document.getElementById("conexo").innerHTML = contenido;
}

console.log("El grafo es:", grafoconexo());

//FUNCION QUE ARROJA EN UN VECTOR TODOS LOS NODOS AL QUE ESTA CONECTADO EL NODO ACTUAL (I)
// RECOMENDABLE SOLO USAR EN FOR
function vectornodos(i) {
  var items = edges.get({
    filter: function(item) {
      return item.from == i + 1;
    }
  });

  var desde = items.map(function(items) {
    return items.to;
  });

  var items2 = edges.get({
    filter: function(item) {
      return item.to == i + 1;
    }
  });
  var hasta = items2.map(function(items) {
    return items.from;
  });
  Array.prototype.push.apply(desde, hasta);
  return desde;
}
//FUNCION QUE HACE LO MISMO QUE LA ANTERIOR PERO ESTA INCLUYE AL MISMO NODO ESTE CONECTADO O NO
function vectornodos2(i) {
  var items = edges.get({
    filter: function(item) {
      return item.from == i + 1;
    }
  });

  var desde = items.map(function(items) {
    return items.to;
  });

  var items2 = edges.get({
    filter: function(item) {
      return item.to == i + 1;
    }
  });
  var hasta = items2.map(function(items) {
    return items.from;
  });

  var items3 = edges.get({
    filter: function(item) {
      return item.from == i + 1;
    }
  });
  var hasta2 = items3.map(function(items) {
    return items.from;
  });

  Array.prototype.push.apply(desde, hasta);
  Array.prototype.push.apply(desde, hasta2);
  return desde;
}

//OBTIENE TODOS LOS ELEMENtOS REPETIDOS DENTRO DE UN VECTOR
function repetidos(vector) {
  var repetidos = {};

  vector.forEach(function(numero) {
    repetidos[numero] = (repetidos[numero] || 0) + 1;
  });

  var resultado = Object.values(repetidos);
  return resultado;
}
//
function vectornodos3(i) {
  var items = edges.get({
    filter: function(item) {
      return item.from == i + 1;
    }
  });

  var desde = items.map(function(items) {
    return items.to;
  });

  var items2 = edges.get({
    filter: function(item) {
      return item.to == i + 1;
    }
  });
  var hasta = items2.map(function(items) {
    return items.from;
  });

  var items3 = edges.get({
    filter: function(item) {
      return item.from == i + 1;
    }
  });
  var hasta2 = items3.map(function(items) {
    return items.from;
  });

  var items4 = edges.get({
    filter: function(item) {
      return item.to == i + 1;
    }
  });
  var hasta3 = items4.map(function(items) {
    return items.to;
  });

  Array.prototype.push.apply(desde, hasta);
  Array.prototype.push.apply(desde, hasta2);
  Array.prototype.push.apply(desde, hasta3);
  return desde;
}
//MISMO QUE EL 2 PERO CON LA CONDICION DEL 3
function vectornodos4(i) {
  var items = edges.get({
    filter: function(item) {
      return item.from == i;
    }
  });

  var desde = items.map(function(items) {
    return items.to;
  });

  var items2 = edges.get({
    filter: function(item) {
      return item.to == i;
    }
  });
  var hasta = items2.map(function(items) {
    return items.from;
  });
  Array.prototype.push.apply(desde, hasta);
  return desde;
}

function vectornodosGRADOS(i) {
  var items = edges.get({
    filter: function(item) {
      return item.from == i;
    }
  });

  var desde = items.map(function(items) {
    return items.to;
  });

  var items2 = edges.get({
    filter: function(item) {
      return item.to == i;
    }
  });
  var hasta = items2.map(function(items) {
    return items.from;
  });

  var items3 = edges.get({
    filter: function(item) {
      return item.from == i;
    }
  });
  var hasta2 = items3.map(function(items) {
    return items.from;
  });

  var items4 = edges.get({
    filter: function(item) {
      return item.to == i;
    }
  });
  var hasta3 = items4.map(function(items) {
    return items.to;
  });

  Array.prototype.push.apply(desde, hasta);
  Array.prototype.push.apply(desde, hasta2);
  Array.prototype.push.apply(desde, hasta3);
  return desde;
}

//funcion para enlazar los nodos en pantalla
/*
      var dsoptions = {
            manipulation: {
              enabled: false,
          
              addEdge: function (data, callback) {
                  console.log('add edge', data);
                  if (data.from == data.to) {
                      var r = confirm("Do you want to connect the node to itself?");
                      if (r === true) {
                          callback(data);
                      }
                  }
                  else {
                      callback(data);
                  }
                  // after each adding you will be back to addEdge mode
                  network.addEdgeMode();
              }
          }};
*/
console.log("grafoconectado", vectornodosGRADOS(4));

function addConexion(nodoInicial, nodoFinal, valorDistancia) {
  var arrayaux;
  valorDistancia = parseInt(valorDistancia, 10);

  buscarNodo = grafoDijkstra.filter(item => item.origen === nodoInicial);
  if (buscarNodo.length === 0) {
    conexion = [];
    conexion.push({
      destino: nodoFinal,
      distancia: valorDistancia
    });
    grafoDijkstra.push({ origen: nodoInicial, conexiones: conexion });
  } else {
    buscarNodo[0].conexiones.push({
      destino: nodoFinal,
      distancia: valorDistancia
    });
  }
}

camino = [];

function shortestPath() {
   grafoDijkstra = [];
  var dataedge = edges.get();
  var enlaces;
  var valores;
  for (var xzy = 0; xzy < dataedge.length; xzy++) {
    addConexion(dataedge[xzy].from, dataedge[xzy].to, dataedge[xzy].label);
    addConexion(dataedge[xzy].to, dataedge[xzy].from, dataedge[xzy].label);
  }
  var g = new Graph();
  grafoDijkstra.forEach(function(value, key, array) {
    enlaces = {};

    value.conexiones.forEach(function(conexion, key, array) {
      enlaces[conexion.destino] = conexion.distancia;
    });

    g.addVertex(value.origen, enlaces);
  });
  var nodoiaux = document.getElementsByName("nodoInicial")[0].value;
  var nodofaux = document.getElementsByName("nodoFinal")[0].value;
  var auxiliar1;
  var auxiliar2;
  var i = nodoiaux.toString();
  var f = nodofaux.toString();
  var auxiliar;
  auxiliar1 = g.shortestPath(i, f);
  auxiliar2 = auxiliar1.concat(i);

  var camino = g
    .shortestPath(i, f)
    .concat(i)
    .reverse();
  console.log("CAMINODELGRAFO", camino);
  return camino;
}

function imprimirCamino() {
  var aux = shortestPath();
  var aux2 = "";
  for (var i = 0; i < aux.length; i++) {
    aux2 = aux2 + aux[i] + ">";
  }
  return aux2;
}
function recargarCamino(contenido) {
  contenido = imprimirCamino();
  document.getElementById("Camino").innerHTML = contenido;
}

console.log("Imprimiendo camino", imprimirCamino());

function edgeto(){
//  return edge.to;
  var aristas =edges.get();
  var contadoraristas=aristas.filter(aristas=>aristas.from==1);
   
  var y =nodes.getIds();
    console.log("-----------------------------------------------");
    console.log(y);
}
//poder identificar los edges de un nodo
function euleriano(){
  var conexo = grafoconexo();
  var cantid = nodes.getIds();
  var imp = 0; // vertices con aristas impares
  var verticemax = 0;
  var max = 0;
  var camino = [];
  var aristas =edges.get();
  var min =aristas.filter(aristas=>aristas.from==cantid[0]);
  console.log("ddddddd");
  if ((conexo = true)) {
    for (let i = 0; i < cantid.legth; i++) {
      var contadoraristas=aristas.filter(aristas=>aristas.from==cantid[i]);
      if (contadoraristas % 2 == 1) {
        imp++;
      }

      if (contadoraristas >= max) {
        max = vectornodos(i);
        verticemax = i;
      }
      
      
      if (min > contadoraristas) {
        min = contadoraristas;
      }
    }
  console.log("ddddddd");
    if (imp < 3 && min > 1) {
      camino.push(verticemax);
      var aristas =edges.get();
      var contadoraristas=aristas.filter(aristas=>aristas.from==verticemax);
      var vectoraristas = [];
      var cont = 0;
      var repetido;
      console.log("ddddddd");
      for(let i = 0; i < aristas.legth; i++){
        
        for (let j = 0; j < contadoraristas.legth; j++) {
          for(let k = 0; k < vectoraristas.legth;k++){
            if(contadoraristas[j]=vectoraristas[k]){
              repetido = true;
            }else{
              repetido = false;
            }
          }
          
         if(contadoraristas[j].from=camino[0] && repetido != true ){
            camino[0].push(contadoraristas[j].to);
            vectoraristas.push[j];
           console.log(contadoraristas[j].from + "-")
           cont++;
          }
    
        
       }
   contadoraristas=aristas.filter(aristas=>aristas.from==camino[cont]);
     }
    }
  }
}
//}
//caminoeuleriano
/*function eu(i,max){
  var cant=vectornodos(i);
if(i==max){
  console.log(0);
  
}else{
  if(cant>1){
      for(var j= 0;j<cant.legth;j++){
          console.log(eu(j,max));
      }
    }else{
   console.log(recurcivacamino(i,max))
    }
}

*/

euleriano();

function verticesNOadyacentes() {
  var cantidaddenodos = nodes.getIds();

  for (var i = 0; i < cantidaddenodos.length; i++) {}
}

function grafoHamiltoniano() {
  var grafoconexoaux = grafoconexo();
  var grafohamiltoniano;
  var cantidaddenodos = nodes.getIds();
  if (grafoconexoaux == true) {
    grafohamiltoniano = false;
  } else {
    for (var i = 0; i < cantidaddenodos.length; i++) {
      if (vectornodos3(i).length / 2 <= 1) {
        grafohamiltoniano = false;
        break;
      } else {
        if (vectornodos3(i).length / 2 >= cantidaddenodos.length / 2) {
          grafohamiltoniano = true;
        } else {
          grafohamiltoniano = false;
          break;
        }
      }
    }
  }

  return grafohamiltoniano;
}

function imprimirgrafohamiltoniano() {
  var grafoham = grafoHamiltoniano();
  var retornar;

  if (grafoham == true) {
    retornar = "El grafo es Hamiltoniano";
  } else {
    retornar = "El grafo no es Hamiltoniano";
  }
  return retornar;
}
console.log("grafo es:", imprimirgrafohamiltoniano());

// funciona para el boton de comprobar si el grafo es conexo
function recargar3(contenido) {
  contenido = imprimirgrafohamiltoniano();
  document.getElementById("hamiltoniano").innerHTML = contenido;
}

var options = {
  manipulation: {
    enabled: true,
    initiallyActive: false,
    añadirnodo:true,
    addNode: false,
    addEdge: false,
    editEdge: false,
    deleteNode: true,
    deleteEdge: true,
    controlNodeStyle:{
      // all node options are valid.
    }
  }
              };
var network = new vis.Network(container, data, options);
network.setOptions(options);

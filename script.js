/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints a message in the browser's dev tools console
console.log("Hello 🌎");

var nodes = new vis.DataSet([
  { id: 1, label: "Nodo 1" },
  { id: 2, label: "Nodo 2" },
  { id: 3, label: "Nodo 3" },
  { id: 4, label: "Nodo 4" },
  { id: 5, label: "Nodo 5" },
  { id: 6, label: "Nodo 6"}
]);

// create an array with edges
var edges = new vis.DataSet([
  { from: 1, to: 3, label: "1" },
  { from: 1, to: 4, label: "1" },
  { from: 1, to: 5, label: "1" },
  { from: 2, to: 3, label: "1" },
  { from: 2, to: 4, label: "1" },
  { from: 2, to: 1, label: "1" },
  { from: 3, to: 5, label: "1" },
  { from: 3, to: 1, label: "1" },
  { from: 6, to: 1, label: "1" }
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

//FUNCION PARA AÑADIR UN NODO
var ID = 7;
function añadirnodo() {
  var Label = "Nodo ";
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

var arrayaux = [];
//Funcion
function arrayFinal() {
  arrayaux = [];
  //CREAMOS LA VARIABLE CANTIDAD QUE ALAMCENA EL VECTOR CON LOS IDS DE LOS NODOS
  var cantidad = nodes.getIds();
  //CREAMOS LA VARIABLE ARRAYAUX QUE SERA LA MATRIZ DE LARGO LARGOIDXLARGOID LLENADO CON 0
  // GENERAMOS LA MATRIZ ARRAYAUX
  arrayaux = generarMatriz(cantidad.length);

  for (var i = 0; i < arrayaux.length; i++) {
    for (var j = 0; j < arrayaux.length; j++) {
      //BUSCAMOS TODOS LAS ARISTAS QUE CORRESPONDAN AL ID i+1, EN ESTE CASO 0+1=1
      var items = edges.get({
        filter: function(item) {
          return item.from == i + 1;
        }
      });
      //DE ESAS ARISTAS SACAMOS LOS TO O DE DONDE ESTAN CONECTADOS
      var from1 = items.map(function(items) {
        return items.to;
      });

      //LO MISMO PERO AQUI LO HACEMOS AL REVES
      var items2 = edges.get({
        filter: function(item) {
          return item.to == i + 1;
        }
      });
      // ES PORQUE EN EL PRIMER ITEMS NO SE ENCUENTRAN SI ESTAN CONECTADOS INVERSAMENTE
      var from2 = items2.map(function(items) {
        return items.from;
      });
      //SUMAMOS LOS DOS VECTORES
      Array.prototype.push.apply(from1, from2);
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

var abecedario = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "ñ",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];

function genera_tabla() {
  var arrayX = arrayFinal();
  var cantidad = nodes.getIds();

  // Obtener la referencia del elemento body
  var body = document.getElementsByTagName("body")[0];

  // Crea un elemento <table> y un elemento <tbody>
  var tabla = document.createElement("table");
  var tblBody = document.createElement("tbody");

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
  tabla.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tabla);
  // modifica el atributo "border" de la tabla y lo fija a "2";
  tabla.setAttribute("border", "2");
}

var items = edges.get({
  filter: function(item) {
    return item.from == 6;
  }
});
//DE ESAS ARISTAS SACAMOS LOS TO O DE DONDE ESTAN CONECTADOS
var from1 = items.map(function(items) {
  return items.to;
});

//LO MISMO PERO AQUI LO HACEMOS AL REVES
var items2 = edges.get({
  filter: function(item) {
    return item.from == 6;
  }
});
var from2 = items2.map(function(items) {
  return items.from;
});
Array.prototype.push.apply(from1, from2);

console.log("grafo", from1);

function grafoconexo() {
  var retornar;
  var grafoconexo1;
  var canid = nodes.getIds();
  var comprobarsi=0;
  for (var i = 0; i < canid.length; i++) {
    var items = edges.get({
      filter: function(item) {
        return item.from == i + 1;
      }
    });
   from1=vectornodos(i);
  
    
    if(repetidos(from1).length<=1 ){
      comprobarsi=1;
    }
    
    
    if (comprobarsi==1) {   
      
      
      grafoconexo1 = true;
      break;
    } else {
      grafoconexo1 = false;
    }
  }

  if (grafoconexo1 == true) {
    retornar = "El grafo no es conexo";
  } else {
    retornar = "El grafo es conexo";
  }
  return retornar;
}

function recargar(contenido) {
  contenido = grafoconexo();
  document.getElementById("conexo").innerHTML = contenido;
}

console.log("El grafo es:", grafoconexo());


function vectornodos(i){
  
  
     var items = edges.get({
      filter: function(item) {
        return item.from == i + 1;
      }});
  
    var desde = items.map(function(items) {
       return items.to;
    });


    var items2 = edges.get({
      filter: function(item) {
        return item.to == i + 1;
      }
    });
    var hasta = items2.map(function(items) {
        return items2.from;
  
    });
    Array.prototype.push.apply(desde, hasta);
    return desde;
  
}




function repetidos(vector){
var repetidos = {};

vector.forEach(function(numero){
  repetidos[numero] = (repetidos[numero] || 0) + 1;
});
  
  var resultado=Object.values(repetidos);
 return resultado;
}


console.log('repetidos',repetidos(from1));
var container = document.getElementById("mynetwork");
var data = {
  nodes: nodes,
  edges: edges
};
var options = {};
var network = new vis.Network(container, data, options);

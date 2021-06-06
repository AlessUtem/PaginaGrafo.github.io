/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints a message in the browser's dev tools console
console.log("Hello 🌎");
var nodes,edges,camino,grafoDijkstra;
var storage = new plog.storages.LocalStorage({ maxSize: 200 });
plog.useStorage(storage);

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
  { id: "1-2", from: 1, to: 2, label: "2" },
  { id: "2-3", from: 2, to: 3, label: "5" },
  { id: "1-3", from: 1, to: 3, label: "5" },
  { id: "2-4", from: 2, to: 4, label: "3" },
  { id: "3-5", from: 3, to: 5, label: "4" },
  { id: "5-1", from: 4, to: 5, label: "4" },
  { id: "1-5", from: 1, to: 5, label: "6" },
  { id: "2-5", from: 2, to: 5, label: "2" }
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
  plog.info("Se añade un nodo");
  var Label = "Nodo ";
  nodes.add([{ id: ID, label: Label + ID }]);

  var n = nodes.getIds();
  var select = document.getElementsByName("ELIMINAR")[0];
  var selecthasta = document.getElementsByName("HASTA")[0];
  var selectdesde = document.getElementsByName("DESDE")[0];
  var selectcamino1 = document.getElementsByName("nodoinicial")[0];
  var selectcamino2 = document.getElementsByName("nodofinal")[0];
  var option = document.createElement("option");
  option.value = n[n.length - 1];
  option.text = "Nodo " + n[n.length - 1];
  select.add(option);
  var option = document.createElement("option");
  option.value = n[n.length - 1];
  option.text = "Nodo " + n[n.length - 1];
  selecthasta.add(option);
  var option = document.createElement("option");
  option.value = n[n.length - 1];
  option.text = "Nodo " + n[n.length - 1];
  selectdesde.add(option);
  var option = document.createElement("option");
  option.value = n[n.length - 1];
  option.text = "Nodo " + n[n.length - 1];
  selectcamino1.add(option);
  var option = document.createElement("option");
  option.value = n[n.length - 1];
  option.text = "Nodo " + n[n.length - 1];
  selectcamino2.add(option);
plog.info("Se agrega el nodo a sus respectivos select en la pagina");
  ID = ID + 1;
}



selects();
function selects() {
  var select = document.getElementsByName("ELIMINAR")[0];
  var selecthasta = document.getElementsByName("HASTA")[0];
  var selectdesde = document.getElementsByName("DESDE")[0];
  var selectcamino1 = document.getElementsByName("nodoinicial")[0];
  var selectcamino2 = document.getElementsByName("nodofinal")[0];
  var n = nodes.getIds();
  for (var i = 0; i < n.length; i++) {
    var option = document.createElement("option");
    option.value = n[i];
    option.text = "Nodo " + n[i];
    select.add(option);
  }
  for (var i = 0; i < n.length; i++) {
    var option = document.createElement("option");
    option.value = n[i];
    option.text = "Nodo " + n[i];
    selecthasta.add(option);
  }
  for (var i = 0; i < n.length; i++) {
    var option = document.createElement("option");
    option.value = n[i];
    option.text = "Nodo " + n[i];
    selectdesde.add(option);
  }
  for (var i = 0; i < n.length; i++) {
    var option = document.createElement("option");
    option.value = n[i];
    option.text = "Nodo " + n[i];
    selectcamino1.add(option);
  }
  for (var i = 0; i < n.length; i++) {
    var option = document.createElement("option");
    option.value = n[i];
    option.text = "Nodo " + n[i];
    selectcamino2.add(option);
  }
}

function ordenar(x) {
  var y = [];
  var arreglofinal = [];
  var z;
  var separar;
  for (var i = 0; i < x.length; i++) {
    z = x[i].id;
    separar = z.split("-");
    y[i] = separar[1];
  }
  y.sort((a, b) => a - b);
  console.log(y);
  for (var i = 0; i < x.length; i++) {
    z = x[i].id;
    separar = z.split("-");
    arreglofinal[i] = separar[0] + "-" + y[i];
  }
  return arreglofinal;
}
function recorridoaristas(desde) {
  var contador = 1;
  var retorna = [];
  var aristas = edges.get();

  var contadoraristas = aristas.filter(aristas => aristas.from == desde);
  contadoraristas = ordenar(contadoraristas);
  console.log(contadoraristas);
  for (var i = 0; i < contadoraristas.length; i++) {
    var verifica = desde + "-" + contador;
    console.log(verifica);
    if (contadoraristas[i] != verifica) {
      retorna[0] = verifica;
      retorna[1] = false;
      return retorna;
      break;
    }
    contador++;
  }
  retorna[1] = true;
  return retorna;
}
//FUNCION PARA CONECTAR NODOS
function conectarnodos() {
  var desde = document.getElementsByName("DESDE")[0].value;
  var hasta = document.getElementsByName("HASTA")[0].value;
  var peso = document.getElementsByName("PESO")[0].value;
  
  if(desde==0||hasta==0){
    plog.warn(
      "se intento conectar nodos inexistentes,se alerta al usuario y se cancela la operacion"
    );
    alert("agregue nodos y vuelva a intentar");
  }else if (peso < 1) {
    alert("no se pueden ingresar pesos negativos,signos o de valor 0");
    plog.warn(
      "se intento conectar dos nodos usando un peso negativo,signos o de valor 0 y se cancela la operacion"
    );
  } else if (peso % 1 != 0) {
    alert("ingrese solo numeros enteros");
    plog.warn(
      "se intento conectar dos nodos usando un peso decimal y se cancela la operacion"
    );
  } else {
    plog.info(
      "se conecto el nodo " +
        desde +
        " con el nodo " +
        hasta +
        " con un peso de " +
        peso
    );

    console.log(
      "se trato de conectar el nodo ",
      document.getElementsByName("DESDE")[0].value,
      " con el nodo",
      document.getElementsByName("HASTA")[0].value
    );
    var aristas = edges.get();
    var contadoraristas = aristas.filter(
      aristas => aristas.from == document.getElementsByName("DESDE")[0].value
    );
    console.log(contadoraristas);
    console.log(contadoraristas.sort(contadoraristas.id));
    console.log(recorridoaristas(desde)[1]);
    if (recorridoaristas(desde)[1] == true) {
      contadoraristas = contadoraristas.length + 1;
      edges.add([
        {
          id:
            document.getElementsByName("DESDE")[0].value +
            "-" +
            contadoraristas,
          from: document.getElementsByName("DESDE")[0].value,
          to: document.getElementsByName("HASTA")[0].value,
          label: document.getElementsByName("PESO")[0].value
        }
      ]);
      return;
    }
    if (recorridoaristas(desde)[1] == false) {
      edges.add([
        {
          id: recorridoaristas(desde)[0],
          from: document.getElementsByName("DESDE")[0].value,
          to: document.getElementsByName("HASTA")[0].value,
          label: document.getElementsByName("PESO")[0].value
        }
      ]);
      return;
    }
  }
}

//FUNCION PARA BORRAR DATOS DEL NODO
function borrarnodo() {
  var ide = document.getElementsByName("ELIMINAR")[0].value;
  ide = ide - 0;
  console.log(ide);
  var borrar = nodes.getIds();
  borrar = borrar.indexOf(ide);
if(ide==0){
  plog.warn("Se intento eliminar un nodo cuando no hay ninguno,se cancela la operacion y se manda alerta ");
alert("Para eliminar un nodo,agregue uno primero")

}
  plog.info("Se elimina el nodo " + ide + " junto con todas sus aristas ");
  var select = document.getElementsByName("ELIMINAR")[0];
  var selecthasta = document.getElementsByName("HASTA")[0];
  var selectdesde = document.getElementsByName("DESDE")[0];
  var selectcamino1 = document.getElementsByName("nodoinicial")[0];
  var selectcamino2 = document.getElementsByName("nodofinal")[0];
  select.remove(borrar);
  selecthasta.remove(borrar);
  selectdesde.remove(borrar);
  selectcamino1.remove(borrar);
  selectcamino2.remove(borrar);

  nodes.remove(ide);
  var aristas = edges.get();
  var contadoraristas = aristas.filter(aristas => aristas.from == ide);

  var x = contadoraristas.length;
  console.log(x);
  while (x != 0) {
    edges.remove(contadoraristas[x - 1].id);
    x = x - 1;
  }

  contadoraristas = aristas.filter(aristas => aristas.to == ide);
  x = contadoraristas.length;
  while (x != 0) {
    edges.remove(contadoraristas[x - 1].id);
    x = x - 1;
  }
}

var arrayaux = [];
//Funcion

function verificaconexion(array) {
  var from1;
  var cantidad = nodes.getIds();
  plog.info("Se rellena la matriz de caminos del grafo");
  arrayaux = generarMatriz(cantidad.length);
  for (var i = 0; i < arrayaux.length; i++) {
    for (var j = 0; j < arrayaux.length; j++) {
      from1 = vectornodos4(cantidad[i]);

      for (var z = 0; z < from1.length; z++) {
        if (cantidad[j] == from1[z]) {
          arrayaux[i][j] = 1;
        }
      }
    }
  }
  return arrayaux;
}

var tabla;
var tabla1;
var tblBody;
var borrarcelda;
var celdaantigua;
var haytabla = false;
function genera_tabla() {
  
  var arrayX = verificaconexion();
  var cantidad = nodes.getIds();
  var h;
  if (haytabla == true) {
    tabla.removeChild(tblBody);
    tabla1.removeChild(borrarcelda);
    haytabla = false;
    plog.info("Se borra la matriz generada anteriormente");
  }
  if (haytabla == false) {
    plog.info("Se crea la matriz de caminos del grafo");
    // Obtener la referencia del elemento body
    var body = document.getElementsByTagName("body")[0];

    // Crea un elemento <table> y un elemento <tbody>

    tabla = document.getElementById("matrizdecaminos");
    tabla1 = document.getElementById("matrizdecaminos");
    borrarcelda = document.createElement("tbody");
    tblBody = document.createElement("tbody");
    for (var i = 0; i < cantidad.length; i++) {
      celdaantigua = document.createElement("th");
      h = "N" + cantidad[i];
      var textoCelda = document.createTextNode(h);
      celdaantigua.appendChild(textoCelda);
      borrarcelda.appendChild(celdaantigua);
    }
    tabla1.appendChild(borrarcelda);
    // Crea las celdas
    for (var i = 0; i < cantidad.length; i++) {
      // Crea las hileras de la tabla
      var hilera = document.createElement("tr");

      for (var j = 0; j < cantidad.length; j++) {
        var celda = document.createElement("td");
        var textoCelda = document.createTextNode(arrayX[i][j]);

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
plog.info("Se muestra la matriz de caminos del grafo en una ventana modal");
    document.location.href = "#openModal";
  }
}

function revisar(from) {
  if (from[0] <= 1) {
    return true;
  } else return false;
}

function grafoconexo() {
  plog.info("Se comprueba si el grafo es conexo");
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
    from2 = vectornodos4(canid[i]); //obtenemos lo mismo que en el anterior pero incluyendo el nodo(i)
    //llamamos a la funcion repetidos para ver si hay algun nodo conectado SOLO a si mismo o
    //en su defecto conectado a nada

    if (repetidos(from2).length <= 1 && revisar(repetidos(from2)) == false) {
      comprobarsi = 1;
    } else if (repetidos(from2).length <= 0) {
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
  plog.info("se muestra si el grafo es conexo");
  contenido = imprimirgrafoconexo();
  alert(contenido);
  // document.getElementById("conexo").innerHTML = contenido;
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

console.log("vectornodos", vectornodos4(1));

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
  valorDistancia = parseInt(valorDistancia, 10);
plog.info("Se comprueba utlizando Dijkstra,el camino mas corto entre nodo los nodos");
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



function shortestPath() {
  grafoDijkstra = new Array(nodes.length);
  var aristas = edges.get();
  var enlaces;
  var valores;
  for (var j = 0; j < aristas.length; j++) {
    addConexion(aristas[j].from, aristas[j].to, aristas[j].label);
    addConexion(aristas[j].to, aristas[j].from, aristas[j].label);
  }
  var g = new Graph();
  grafoDijkstra.forEach(function(value, key, array) {
    enlaces = {};

    value.conexiones.forEach(function(conexion) {
      enlaces[conexion.destino] = conexion.distancia;
    });

    
    
  var nodoINICIAL = document.getElementsByName("nodoinicial")[0].value;
  var nodoFINAL = document.getElementsByName("nodofinal")[0].value;
  if (nodoINICIAL ==0 ||nodoFINAL==0) {
    alert("agregue un nodo");
     plog.info("Se intenta encontrar el camino mas corto con nodos inexistentes,se alerta al usuario y se cancela la operacion");
    return;
  }
  if (nodoINICIAL == nodoFINAL) {
    alert("ingrese dos nodos distintos entre si");
    plog.info("Se intenta comprobar el camino mas corto entre un nodo y si mismo,se alerta al usuario y se cancela la operacion");
    return;
  }
  var i = nodoINICIAL.toString();
  var f = nodoFINAL.toString();
  g.addVertex(value.origen, enlaces);
  camino = g
    .shortestPath(i, f)
    .concat(i)
    .reverse();
  /*console.log("CAMINODELGRAFO", camino);
  plog.info(
    "Se muestra el camino mas corto entre el nodo " + i + " y el nodo " + f
  );
    */
    
    
  });
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
  var aux = shortestPath();
  var tamaño = 0;
  var aux2;
  var aristas = edges.get();
  for (var i = 0; i < aux.length - 1; i++) {
    aux2 = aux[i + 1];
    var contadoraristas = aristas.filter(aristas => aristas.from == aux[i]);
    var aristax = contadoraristas.filter(
      contadoraristas => contadoraristas.to == aux2
    );
    aristax = aristax[0].label;
    aristax = aristax - 0;
    tamaño = tamaño + aristax;
  }
  contenido = imprimirCamino();
  contenido = contenido.substring(0, contenido.length - 1);
  alert("camino:" + contenido + "\ntamaño:" + tamaño);
  // document.getElementById("Camino").innerHTML = contenido;
}



function aristarepetida(arista, vectorrepetido) {
  var repetido;
  for (let k = 0; k < vectorrepetido.length; k++) {
    if (arista == vectorrepetido[k]) {
      repetido = true;
      break;
    } else {
      repetido = false;
    }
  }
  return repetido;
}

function verticerepetido(vertice, vectorrepetido) {
  var repetido;
  for (let k = 0; k < vectorrepetido.length; k++) {
    if (vertice == vectorrepetido[k]) {
      
      repetido = true;
      break;
    } else {
      repetido = false;
    }
  }
  return repetido;
}

//poder identificar los edges de un nodo
function euleriano() {
  var conexo = grafoconexo();
  var cantid = nodes.getIds();
  var imp = 0; // vertices con aristas impares
  var verticemax = 0;
  var verticemin = 0;
  var maxfrom = 0;
  var cantmin = 0;
  var camino = [];
  var aristas = edges.get();
  var min =
    aristas.filter(aristas => aristas.from == cantid[0]).length +
    aristas.filter(aristas => aristas.to == cantid[0]).length;
  console.log("ddddddd");
  if (conexo == false) {
    for (var i = 0; i < cantid.length; i++) {
      var to = aristas.filter(aristas => aristas.to == cantid[i]);
      var from = aristas.filter(aristas => aristas.from == cantid[i]);
      var cantaristas = from.length + to.length;

      //console.log(cantid[i],"=(",contadoraristas,")");
      if (cantaristas % 2 == 1) {
        imp++;
      }

      if (cantaristas > maxfrom) {
        maxfrom = cantaristas;

        verticemax = cantid[i];
      }
      console.log(min, cantaristas);

      if (cantaristas <= min) {
        console.log("eded");
        min = cantaristas;
        if (cantaristas == 1) {
          verticemin = cantid[i];
          cantmin++;
        }
      }
    }
    console.log(
      "{imp=",
      imp,
      ";maxfrom=",
      maxfrom,
      ";min=",
      min,
      ";verticemin=",
      verticemin,
      "}"
    );
    if (imp < 3 && min > 1) {
      camino.push(verticemax);
      var aristas = edges.get();
      var aristasto = aristas.filter(aristas => aristas.to == verticemax);
      var contadoraristas = aristas.filter(
        aristas => aristas.from == verticemax
      );
      contadoraristas = contadoraristas.concat(aristasto);
      var vectoraristas = [];
      var cont = 0;
      var repetido = false;
      var vertices = [];
      console.log(vectoraristas.length);
      for (var i = 0; i < aristas.length; i++) {
        for (var j = 0; j < contadoraristas.length; j++) {
          //si el cont-1 es igual a un from o to
          if (
            contadoraristas[j].to == camino[cont] &&
            contadoraristas[j].from != camino[cont - 1] &&
            aristarepetida(contadoraristas[j], vectoraristas) != true
          ) {
            camino.push(contadoraristas[j].from);
            vectoraristas.push(contadoraristas[j]);
            cont++;
          } else {
            if (
              contadoraristas[j].from == camino[cont] &&
              aristarepetida(contadoraristas[j], vectoraristas) != true
            ) {
              camino.push(contadoraristas[j].to);
              vectoraristas.push(contadoraristas[j]);
              cont++;
            }
          }
        }

        aristasto = aristas.filter(aristas => aristas.to == camino[cont]);
        contadoraristas = aristas.filter(
          aristas => aristas.from == camino[cont]
        );
        contadoraristas = contadoraristas.concat(aristasto);
      }

      console.log(camino);
    } else if (imp < 3 && min >= 1 && (cantmin == 1 || cantmin == 2)) {
      console.log("verticemin", verticemin);
      camino.push(verticemin);
      var aristas = edges.get();
      var aristasto = aristas.filter(aristas => aristas.to == verticemin);
      var contadoraristas = aristas.filter(
        aristas => aristas.from == verticemin
      );
      contadoraristas = contadoraristas.concat(aristasto);
      var vectoraristas = [];
      var cont = 0;
      var repetido = false;
      var vertices = [];

      for (var i = 0; i < aristas.length; i++) {
        for (var j = 0; j < contadoraristas.length; j++) {
          if (
            contadoraristas[j].to == camino[cont] &&
            contadoraristas[j].from != camino[cont - 1] &&
            aristarepetida(contadoraristas[j], vectoraristas) != true
          ) {
            camino.push(contadoraristas[j].from);
            vectoraristas.push(contadoraristas[j]);

            cont++;
          } else {
            if (
              contadoraristas[j].from == camino[cont] &&
              aristarepetida(contadoraristas[j], vectoraristas) != true
            ) {
              camino.push(contadoraristas[j].to);
              vectoraristas.push(contadoraristas[j]);

              cont++;
            }
          }
        }

        aristasto = aristas.filter(aristas => aristas.to == camino[cont]);
        contadoraristas = aristas.filter(
          aristas => aristas.from == camino[cont]
        );
        contadoraristas = contadoraristas.concat(aristasto);
      }
      console.log(camino);
    }
  } else {
    plog.warn("no puede ser euleriano por que no es conexo");
  }
  return camino;
}

function imprimireuleriano() {
  var aux = euleriano();
  var aux2 = "";
  var aux3;
  console.log(aux);
  if (aux.length == 0) {
    plog.info("Se comprueba que el grafo no es euleriano");
    aux3 = "El grafo no es euleriano";
    alert(aux3);
    //document.getElementById("euleriano").innerHTML = aux3;
  } else {
    plog.info("Se comprueba que el grafo si es euleriano");
    aux3 = "El grafo es euleriano y su camino es:";

    for (var i = 0; i < aux.length - 1; i++) {
      aux2 = aux2 + aux[i] + "->";
    }
    aux2 = aux2 + aux[aux.length - 1];
    alert(aux3 + aux2);
    // document.getElementById("euleriano").innerHTML = aux3 + aux2;
  }
}

function archivo() {
  var aux = "";
  var events = storage.getEvents();
  for (var i = 0; i < events.length - 1; i++) {
    aux = aux + JSON.stringify(events[i]) + "\n";
  }

  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:events/plain;charset=utf-8," + encodeURIComponent(aux)
  );
  element.setAttribute("download", "log.txt");
  console.log(element);
  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

document.getElementById("download").addEventListener(
  "click",
  function() {
    // Genera la descarga del .txt

    archivo();
  },
  false
);

function verticesNOadyacentes() {
  var cantidaddenodos = nodes.getIds();

  for (var i = 0; i < cantidaddenodos.length; i++) {}
}
console.log(vectornodos3(0));

function grafoHamiltoniano() {
  var grafoconexoaux = grafoconexo();
  var grafohamiltoniano;
  var cantidaddenodos = nodes.getIds();
  if (grafoconexoaux == true) {
    plog.warn("no puede ser hamiltoniano por que no es conexo");
    grafohamiltoniano = false;
  } else {
    for (var i = 0; i < cantidaddenodos.length; i++) {
      if (vectornodos3(i).length / 2 <= 1) {
        grafohamiltoniano = false;
        plog.warn("opcion 1");
        break;
      } else {
        if (vectornodos3(i).length / 2 >= cantidaddenodos.length / 2) {
          grafohamiltoniano = true;
        } else {
          grafohamiltoniano = false;
          plog.warn("opcion 2");
          break;
        }
      }
    }
  }

  return grafohamiltoniano;
}

function recorrerhamiltoniano() {
  var eshamiltoniano = grafoHamiltoniano();
  var nodosid = nodes.getIds();
  var aristas = edges.get();
  var conexo = grafoconexo();
  var min =
    aristas.filter(aristas => aristas.from == nodosid[0]).length +
    aristas.filter(aristas => aristas.to == nodosid[0]).length;
  var nodomin;
  var camino = [];
  //if(eshamiltoniano==true){
  for (var i = 0; i < nodosid.length; i++) {
    var to = aristas.filter(aristas => aristas.to == nodosid[i]);
    var from = aristas.filter(aristas => aristas.from == nodosid[i]);
    var cantaristas = from.length + to.length;

    if (cantaristas <= min) {
      min = cantaristas;

      nodomin = nodosid[i];
    }
  }

  camino.push(nodomin);
  var aristasto = aristas.filter(aristas => aristas.to == nodomin);
  var contadoraristas = aristas.filter(aristas => aristas.from == nodomin);
  contadoraristas = contadoraristas.concat(aristasto);
  var vectornodos = [nodomin];
  var vectoraristas = [];
  var repetido = false;
  var repetidonodo = false;
  var cont = 0;

  for (var i = 0; i < nodosid.length; i++) {
    for (var j = 0; j < contadoraristas.length; j++) {
      //------------DESDE EL TO-----------------
      if (
        contadoraristas[j].to == camino[cont] &&
        contadoraristas[j].from != camino[cont - 1] &&
        aristarepetida(contadoraristas[j], vectoraristas) != true &&
        verticerepetido(contadoraristas[j].from, vectornodos) != true
      ) {
        camino.push(contadoraristas[j].from);
        vectornodos.push(contadoraristas[j].from);
        vectoraristas.push(contadoraristas[j]);
        cont++;
        //console.log("vuelta ",i ," vectoringresado ",contadoraristas[j].from," total para imprimir ",camino," total eliminado ",vectornodos);
      } else {
        //------------DESDE EL FROM--------------
        if (
          contadoraristas[j].from == camino[cont] &&
          aristarepetida(contadoraristas[j], vectoraristas) != true &&
          verticerepetido(contadoraristas[j].to, vectornodos) != true
        ) {
          camino.push(contadoraristas[j].to);
          vectornodos.push(contadoraristas[j].to);
          vectoraristas.push(contadoraristas[j]);
          cont++;
          //console.log("--vuelta ",i ," vectoringresado ",contadoraristas[j].to," total para imprimir ",camino," total eliminado ",vectornodos);
        }
      }
    }

    aristasto = aristas.filter(aristas => aristas.to == camino[cont]);
    contadoraristas = aristas.filter(aristas => aristas.from == camino[cont]);
    contadoraristas = contadoraristas.concat(aristasto);
  }
  // }

  console.log("vectornods", camino);
  return camino;
}

function imprimirhamiltoniano2() {
  var aux = recorrerhamiltoniano();
  var aux2 = "";
  var aux3;
  console.log(aux);
  if (aux.length == 0) {
    plog.info("Se comprueba que el grafo no es hamiltoniano");
    aux3 = "El grafo no es hamiltoniano";
    alert(aux3);
    document.getElementById("hamiltoniano").innerHTML = aux3;
  } else {
    plog.info("Se comprueba que el grafo si es hamiltoniano");
    aux3 = "El grafo es hamiltoniano y su camino es: ";

    for (var i = 0; i < aux.length - 1; i++) {
      aux2 = aux2 + aux[i] + "->";
    }
    aux2 = aux2 + aux[aux.length - 1];
    alert(aux3 + aux2);
    //document.getElementById("hamiltoniano").innerHTML = aux3 + aux2;
  }
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

// funciona para el boton de comprobar si el grafo es conexo
function recargar3(contenido) {
  plog.info("Se comprueba que el grafo sea hamiltoniano");
  contenido = imprimirgrafohamiltoniano();
  document.getElementById("hamiltoniano").innerHTML = contenido;
}

function recorreradyacente(nodo,aristas) {
 console.log(aristas);
  var aristasto = aristas.filter(aristas => aristas.to == nodo);
  var contadoraristas = aristas.filter(aristas => aristas.from == nodo);
  contadoraristas = contadoraristas.concat(aristasto);
  var aux = contadoraristas[0];
  var min = contadoraristas[0].label;
  console.log("total ",contadoraristas);
  console.log("min antes ",min);
  for (let i=0; i < contadoraristas.length; i++) {
    
    if (contadoraristas[i].label <= min) {
      min = contadoraristas[i].label;
      
      aux = contadoraristas[i];
    }
  }
  console.log("min despues ",min);
  return aux;
}
function aristasdeunnodo(nodo) {
  var aristas = edges.get();
  var aristasto = aristas.filter(aristas => aristas.to == nodo);
  var contadoraristas = aristas.filter(aristas => aristas.from == nodo);
  contadoraristas = contadoraristas.concat(aristasto);
  return contadoraristas;
}
function eliarisvect(arista,vector){ //elimina arista en vector
var aux = [];
for(let i = 0;i<vector.length;i++){
 if(vector[i]!=arista){
  aux.push(vector[i]);
 }
return aux;
}
}
function prim() {
  var nodos = nodes.getIds();
  var aristas = edges.get();
  console.log("nodos", nodos[0]);
  var aristaminima = recorreradyacente(nodos[0]);
  var aristasdesechables = [];
  var arisnodo = aristasdeunnodo(nodos[0]);
  var aux = nodos[0];
  var camino = [aux];
  var nodorepetido=[aux];
  var aristarepetida=aristas;
  console.log(aristarepetida);
  aristarepetida=eliarisvect(aristaminima,aristarepetida);
  
  console.log(aristas,"aristarepetidas",aristarepetida);
  for (let i = 0; i < nodos.length; i++) {
    
    for (let j = 0; j < arisnodo.length; j++) {
      if (arisnodo != aristaminima) {
        aristasdesechables.push(arisnodo[j]);
      }
    }
    console.log(nodorepetido,"repetido",verticerepetido(aristaminima.to,nodorepetido));
    console.log("||||from=",aristaminima.from," to=",aristaminima.to);
    if (aux == aristaminima.from && verticerepetido(aristaminima.to,nodorepetido) != true) {
      
      console.log("from ",aux," = ", aristaminima.from," -->",aristaminima.to);
      aristarepetida=eliarisvect(aristaminima,aristarepetida);
      aristaminima = recorreradyacente(aristaminima.to,aristarepetida);
      nodorepetido.push(aristaminima.to);
      aux = aristaminima.to;
      camino.push(aux);
      
    } else {
      if (aux == aristaminima.to && verticerepetido(aristaminima.from,nodorepetido) != true){
        
      console.log("to ",aux," = ", aristaminima.to," -->",aristaminima.from);
        aristarepetida=eliarisvect(aristaminima,aristarepetida);
      aristaminima = recorreradyacente(aristaminima.from,aristarepetida);
       nodorepetido.push(aristaminima.from);
      aux = aristaminima.from;
      camino.push(aux);
      }
      
    }
  }
  console.log(camino);
  return camino;
}
prim();


var options = {
  manipulation: {
    enabled: true,
    addNode: false,
    addEdge: false,
    editEdge: true,
    deleteNode: false,
    deleteEdge: true
  }
};
var network = new vis.Network(container, data, options);
network.setOptions(options);

/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints a message in the browser's dev tools console
console.log("Hello 🌎");

var storage = new plog.storages.LocalStorage({maxSize: 200});

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
  { id: 5, label: "Nodo 5" },
  
]);

var o_nodes = new vis.DataSet(nodes);

// create an array with edges

var edges = new vis.DataSet([
  { id: "1-1", from: 1, to: 2, label: "1" },
  { id: "1-3", from: 1, to: 4, label: "1" },
 { id: "1-2", from: 1, to: 3, label: "1" },
  { id: "2-1", from: 2, to: 5, label: "1" },
  { id: "3-1", from: 3, to: 5, label: "1" },
  { id: "5-1", from: 5, to: 4, label: "1" }
  
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
  plog.info('Se añade un nodo');
  var Label = "Nodo ";
  nodes.add([{ id: ID, label: Label + ID }]);
  
  
   var n=nodes.getIds();
  var select=document.getElementsByName("ELIMINAR")[0];
  var selecthasta=document.getElementsByName("HASTA")[0];
  var selectdesde=document.getElementsByName("DESDE")[0];
     var selectcamino1=document.getElementsByName("nodoinicial")[0];
   var selectcamino2=document.getElementsByName("nodofinal")[0];
    var option = document.createElement("option");
  option.value = n[n.length-1];
    option.text = "Nodo "+ n[n.length-1];
  select.add(option);
  var option = document.createElement("option");
  option.value = n[n.length-1];
    option.text = "Nodo "+ n[n.length-1];
  selecthasta.add(option);
  var option = document.createElement("option");
  option.value = n[n.length-1];
    option.text = "Nodo "+ n[n.length-1];
  selectdesde.add(option);
   var option = document.createElement("option");
  option.value = n[n.length-1];
    option.text = "Nodo "+ n[n.length-1];
  selectcamino1.add(option);
   var option = document.createElement("option");
  option.value = n[n.length-1];
    option.text = "Nodo "+ n[n.length-1];
  selectcamino2.add(option);
  
  ID = ID + 1;
 

}

selects();
 function selects(){
  var select=document.getElementsByName("ELIMINAR")[0];
   var selecthasta=document.getElementsByName("HASTA")[0];
    var selectdesde=document.getElementsByName("DESDE")[0];
   var selectcamino1=document.getElementsByName("nodoinicial")[0];
   var selectcamino2=document.getElementsByName("nodofinal")[0];
  var n=nodes.getIds();
  for(var i=0; i < n.length; i++){
    var option = document.createElement("option");
  option.value = n[i];
    option.text = "Nodo "+ n[i];
  select.add(option);
  } 
    for(var i=0; i < n.length; i++){
    var option = document.createElement("option");
  option.value = n[i];
    option.text = "Nodo "+ n[i];
  selecthasta.add(option);
  }
      for(var i=0; i < n.length; i++){
    var option = document.createElement("option");
  option.value = n[i];
    option.text = "Nodo "+ n[i];
  selectdesde.add(option);
  }
      for(var i=0; i < n.length; i++){
    var option = document.createElement("option");
  option.value = n[i];
    option.text = "Nodo "+ n[i];
  selectcamino1.add(option);
  }
   for(var i=0; i < n.length; i++){
    var option = document.createElement("option");
  option.value = n[i];
    option.text = "Nodo "+ n[i];
  selectcamino2.add(option);
  }
}

function ordenar(x){
  var y=[];
  var arreglofinal=[];
   var z;
  var separar;
 for (var i = 0; i < x.length; i++){
  z=x[i].id;
   separar=z.split("-");
   y[i]=separar[1]; 
 }
  y.sort((a, b) => a - b);
  console.log(y);
 for (var i = 0; i < x.length; i++){
   z=x[i].id;
   separar=z.split("-");
   arreglofinal[i]=(separar[0] +"-"+y[i]);
 }
  return arreglofinal;
 
  
}
function recorridoaristas(desde){
   var contador=1;
  var retorna=[];
  var aristas = edges.get();
  
  var contadoraristas = aristas.filter(aristas => aristas.from == desde);
  contadoraristas=ordenar(contadoraristas);
  console.log(contadoraristas);
  for (var i = 0; i < contadoraristas.length; i++){
    var verifica=desde+"-"+contador;
    console.log(verifica);
    if(contadoraristas[i]!=(verifica)){
      retorna[0]=verifica;
      retorna[1]=false;
       return retorna;
      break;
       };
    contador++;
  }
  retorna[1]=true;
  return retorna;
}
//FUNCION PARA CONECTAR NODOS
function conectarnodos() {
  var desde=document.getElementsByName("DESDE")[0].value;
  var hasta=document.getElementsByName("HASTA")[0].value;
  var peso=document.getElementsByName("PESO")[0].value;
 
  plog.info('se conecto el nodo '+ desde +' con el nodo '+ hasta + ' con un peso de ' + peso );
  
  console.log('se trato de conectar el nodo ',document.getElementsByName("DESDE")[0].value,' con el nodo',document.getElementsByName("HASTA")[0].value);
  var aristas = edges.get();
  var contadoraristas = aristas.filter(aristas => aristas.from == document.getElementsByName("DESDE")[0].value);
 console.log(contadoraristas);
  console.log(contadoraristas.sort(contadoraristas.id));
 console.log(recorridoaristas(desde)[1]);
  if(recorridoaristas(desde)[1]==true){
    contadoraristas = contadoraristas.length + 1;
  edges.add([
    {
      id: document.getElementsByName("DESDE")[0].value + "-" + contadoraristas,
      from: document.getElementsByName("DESDE")[0].value,
      to: document.getElementsByName("HASTA")[0].value,
      label: document.getElementsByName("PESO")[0].value,
      
    }
  ]);
    return;
  }
  if(recorridoaristas(desde)[1]==false){
  edges.add([
    {
      id: recorridoaristas(desde)[0],
      from: document.getElementsByName("DESDE")[0].value,
      to: document.getElementsByName("HASTA")[0].value,
      label: document.getElementsByName("PESO")[0].value,
      
    }
  ]);
    return;
  }
 
}


//FUNCION PARA BORRAR DATOS DEL NODO
function borrarnodo() {
  plog.info('Se elimina un nodo');
  var ide = document.getElementsByName("ELIMINAR")[0].value;
  ide = ide - 0;
  console.log(edges.get());
  var borrar=nodes.getIds();
  borrar=borrar.indexOf(ide);
  
 
 var select=document.getElementsByName("ELIMINAR")[0];
   var selecthasta=document.getElementsByName("HASTA")[0];
  var selectdesde=document.getElementsByName("DESDE")[0];
    var selectcamino1=document.getElementsByName("nodoinicial")[0];
   var selectcamino2=document.getElementsByName("nodofinal")[0];
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

//FUNCION PARA BORRAR ARISTA
function borrararista(label) {
  edges.remove(label);
}

var arrayaux = [];
//Funcion

function verificaconexion(array) {
  var from1;
  var cantidad = nodes.getIds();
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
var tblBody;
var haytabla = false;
function genera_tabla() {
  plog.info('Se genera la matriz de caminos del grafo');
  var arrayX = verificaconexion();
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
  }
}

function revisar(from){
   if(from[0]<=1){
    return true;
  }else return false;
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
    from2 = vectornodos4(canid[i]); //obtenemos lo mismo que en el anterior pero incluyendo el nodo(i)
    //llamamos a la funcion repetidos para ver si hay algun nodo conectado SOLO a si mismo o
    //en su defecto conectado a nada
   
    if (repetidos(from2).length <= 1&&revisar(repetidos(from2))==false) {
        comprobarsi = 1;
    }else if(repetidos(from2).length <= 0){
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
  plog.info('se muestra si el grafo es conexo');
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
  var nodoINICIAL = document.getElementsByName("nodoinicial")[0].value;
  var nodoFINAL = document.getElementsByName("nodofinal")[0].value;
  var i = nodoINICIAL.toString();
  var f = nodoFINAL.toString();
  var camino = g
    .shortestPath(i, f)
    .concat(i)
    .reverse();
  console.log("CAMINODELGRAFO", camino);
  plog.info('Se muestra el camino mas corto entre el nodo '+i+' y el nodo '+f);
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
  contenido = contenido.substring(0, contenido.length - 1);
  document.getElementById("Camino").innerHTML = contenido;
}

function edgeto() {
  //  return edge.to;
  var aristas = edges.get();
  var contadoraristas = aristas.filter(aristas => aristas.from == 1);

  var y = nodes.getIds();
  console.log("-----------------------------------------------");
  console.log(y);
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
  var min = aristas.filter(aristas => aristas.from == cantid[0]).length;
  console.log("ddddddd");
  if ((conexo == false)) {
    for (var i = 0; i < cantid.length; i++) {
      var to = aristas.filter(aristas => aristas.to == cantid[i]);
      var from = aristas.filter(aristas => aristas.from == cantid[i]);
      var cantaristas = from.length + to.length;
      console.log("vertice ",cantid[i]," = desde: ",from.length," ,hasta: ",to.length);

      //console.log(cantid[i],"=(",contadoraristas,")");
      if (cantaristas % 2 == 1) {
         console.log("-------vertice ",cantid[i]," = desde: ",from.length," ,hasta: ",to.length);
        imp++;
      }

      if (from.length > maxfrom) {
        maxfrom = from.length;

        verticemax = cantid[i];
      }

      if (min > cantaristas) {
        min = cantaristas;
        if(cantaristas == 1){
          verticemin = cantid[i];
          cantmin++;
        }
      }
    }
    console.log("{imp=",imp,";maxfrom=",maxfrom,";min=",min,"}");
    // console.log(verticemax);
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
      //console.log(contadoraristas);
      //console.log("contadoraristas",contadoraristas);
      //console.log("camino",camino[0]);
      console.log(vectoraristas.length);
      for (var i = 0; i < aristas.length; i++) {
        // aristas totales vertices totales
        //console.log("vvvvvvvvvv");
        // console.log("vectorssssss",camino[cont]);
        for (var j = 0; j < contadoraristas.length; j++) {
          // aristas por vertice
          // console.log(repetido,contadoraristas[j]);

          //si el cont-1 es igual a un from o to
          if (
            contadoraristas[j].to == camino[cont] &&
            contadoraristas[j].from != camino[cont - 1] &&
            repetido != true
          ) {
            camino.push(contadoraristas[j].from);

            vectoraristas.push(contadoraristas[j]);
            //    console.log("<<<<<<<la puse",camino[cont],"desde",camino[cont-1]);
            //  console.log("arista anulada ",contadoraristas[j],"-");
            cont++;
          } else {
            if (contadoraristas[j].from == camino[cont] && repetido != true) {
              camino.push(contadoraristas[j].to);

              vectoraristas.push(contadoraristas[j]);
              //  console.log("<<<<<<<le puse",camino[cont],"desde",camino[cont-1]);
              // console.log("arista anulada ",contadoraristas[j],"-");
              cont++;
            }
          }
          for (let k = 0; k < vectoraristas.length; k++) {
            if (contadoraristas[j] == vectoraristas[k]) {
              repetido = true;
            } else {
              repetido = false;
            }
          }

          //console.log("total aristas",i,"vector",camino[cont],"vuelta",j,"se repite? ",repetido);
          //console.log(contadoraristas[j],"-");
        }

        aristasto = aristas.filter(aristas => aristas.to == camino[cont]);
        contadoraristas = aristas.filter(
          aristas => aristas.from == camino[cont]
        );
        contadoraristas = contadoraristas.concat(aristasto);

        //console.log(contadoraristas);
        for (let h = 0; h < vectoraristas.length; h++) {
          // console.log(contadoraristas[0]," = ",vectoraristas[h]);
          if (contadoraristas[0] == vectoraristas[h]) {
            repetido = true;
            break;
          } else {
            repetido = false;
          }
          //console.log(repetido);
        }
        //console.log(repetido);
      }
      
      console.log(camino);
      return camino;
    }
    else{
      if(imp < 3 && min >= 1 && (cantmin == 1 || cantmin == 2)){
        console.log("toma esta");
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
       console.log("vectorssssss",camino[cont]);
        for (var j = 0; j < contadoraristas.length; j++) {
          
           for (let k = 0; k < vectoraristas.length; k++) {
            if (contadoraristas[j] == vectoraristas[k]) {
              repetido = true;
            } else {
              repetido = false;
            }
            console.log(repetido);
          }
          console.log(repetido,contadoraristas[j]);
          if (
            contadoraristas[j].to == camino[cont] &&
            contadoraristas[j].from != camino[cont - 1] &&
            repetido != true
          ) {
            camino.push(contadoraristas[j].from);
            vectoraristas.push(contadoraristas[j]);
               console.log("arista anulada ",contadoraristas[j],"-",repetido);
            cont++;
            console.log("<<<<<<<la puse",camino[cont],"desde",camino[cont-1]);
          } else {
            if (contadoraristas[j].from == camino[cont] && repetido != true) {
        
              camino.push(contadoraristas[j].to);
              vectoraristas.push(contadoraristas[j]);    
               console.log("arista anulada ",contadoraristas[j],"-",repetido);
              cont++;
              console.log("<<<<<<<le puse",camino[cont],"desde",camino[cont-1]);
            }
          }
         
        }
          

        aristasto = aristas.filter(aristas => aristas.to == camino[cont]);
        contadoraristas = aristas.filter(
          aristas => aristas.from == camino[cont]
        );
        contadoraristas = contadoraristas.concat(aristasto);

        for (let h = 0; h < vectoraristas.length; h++) {
          if (contadoraristas[0] == vectoraristas[h]) {
            repetido = true;
            break;
          } else {
            repetido = false;
          }
        }
      }    
      console.log(camino);
      return camino;
      }
    }
   
  }
  return camino;
}

function imprimireuleriano() {
  var aux = euleriano();
  var aux2 = "";
  var aux3;
  console.log(aux);
  if (aux.length == 0){
    plog.info('Se comprueba que el grafo no es euleriano');
    aux3 = "El grafo no es euleriano";
     document.getElementById("euleriano").innerHTML = aux3;
  } else {
    plog.info('Se comprueba que el grafo si es euleriano');
    aux3 = "El grafo es euleriano y su camino es:";
   
    
    for (var i = 0; i < aux.length-1; i++) {
      aux2 = aux2 + aux[i] + "->";
    }
    aux2 = aux2 + aux[aux.length-1];

    document.getElementById("euleriano").innerHTML = aux3 + aux2;
  }
}

function archivo(){
  var aux= "";
  var events = storage.getEvents();
  for (var i = 0; i < events.length-1; i++) {
      aux = aux + JSON.stringify(events[i]) + "\n";
    }
  
  var element = document.createElement('a');
  element.setAttribute('href', 'data:events/plain;charset=utf-8,' + encodeURIComponent(aux));
  element.setAttribute('download',"log.txt");
 console.log(element);
  element.style.display = 'none';  
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

document.getElementById("download").addEventListener("click", function(){
    // Generate download of hello.txt file with some content
    
    archivo();
}, false);

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
  plog.info('Se comprueba que el grafo sea hamiltoniano');
  contenido = imprimirgrafohamiltoniano();
  document.getElementById("hamiltoniano").innerHTML = contenido;
}

/*function prim(nodes=[]){
    let n = nodes.length;
    let longitudesAristas = Array.from({length:n}, () =>
        Array.from({length:n}, () => Infinity));
    for (let node of nodes){
        if (Array.isArray(node.parent)){
            for (let link of node.parent){
                if (typeof link==="object" && link.hasOwnProperty("value")){
                    longitudesAristas[node.index][link.index] = link.value;
                    longitudesAristas[link.index][node.index] = link.value;
                }
            }
        }
    }
    let masProximo = [];
    let distanciaMinima = [];
    for (let i=0; i<n; i++){
        masProximo[i] = 0;
        distanciaMinima[i] = longitudesAristas[i][0];
    }
    let resultado = [];
    for (let i=1; i<n; i++){
        let minimo = Infinity;
        let k;
        for (let j=1; j<n; j++){
            if (distanciaMinima[j]>=0 && distanciaMinima[j]<minimo){
                minimo = distanciaMinima[j];
                k = j;
            }
        }
        resultado.push(`${k},${masProximo[k]}`);
        distanciaMinima[k] = -1;
        for (let j=1; j<n; j++){
            if (longitudesAristas[j][k]<distanciaMinima[j]){
                distanciaMinima[j] = longitudesAristas[j][k];
                masProximo[j] = k;
            }
        }
    }
    return resultado;
}
*/
function findMinEdge(edges) {
    let min = null;
    for (const edge of edges) {
        min = min ? edge[2] < min[2] ? edge : min : edge;
    }
    return min;
}

function kruskal(edges, vertices) {
    let mstree = [];
    let edgesCopy = edges.slice(0);
    let disjoinSet = new disjoinSet();
    disjoinSet.makeSet(vertices);
    while (mstree.length < vertices.length - 1) {
        let min = findMinEdge(edgesCopy);
                 // No forme un anillo y verifique el concepto de conjunto, especifique un punto final para cada vértice, determine si los puntos finales de los dos puntos nuevos son consistentes
        if (disjoinSet.unionSet(vertices[min[0]], vertices[min[1]])) {
            mstree.push(min);
        }
        edgesCopy.splice(edgesCopy.indexOf(min), 1);
    }
    return mstree;
}
 
 
function imprimirkruskal(){
let mstree = kruskal(edges, vertices);
console.log(mstree);
 }

//FUNCION PARA AGREGAR SELECT AL FORMULARIO
/*window.onload = function agregarSelect() {
  var cantid = nodes.getIds();
  var select1 = document.getElementsByClassName("nodoid")[0];

  for (var i = 0; i < cantid.length; i++) {
    var option = document.createElement("option");
    option.value = cantid[i];
    option.text = "Nodo " + cantid[i];
    select1.appendChild(option);
  }
};*/

var options = {
  manipulation: {
    enabled: true,
    addNode: function(nodeData, callback) {
      nodeData.label = "Nodo " + ID;
      nodeData.id = ID;
      ID = ID + 1;
      callback(nodeData);
    },

    addEdge: false,
    editEdge: true,
    deleteNode: true,
    deleteEdge: true
  }
};
var network = new vis.Network(container, data, options);
network.setOptions(options);

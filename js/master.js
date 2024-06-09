
// Declaracion de variables

let equipoLocal, equipoVisitante, saque, primerSaque, auxPosLocal, auxPosVisitante, saqueActual, diferenciaPuntos,equipoSaque;
let puntajeLocal = 0;
let puntajeVisitante = 0;
let posicionEquipoLocal = new Array(6);
let posicionEquipoVisitante = new Array(6); 

//Declaracion de :
//Funcion para cargar posiciones
function cargarArray(array, equipo) {
    for (let i = 0; i < 6; i++) {
        array[i] = prompt(`Ingrese el número de jugador para la posición ${i + 1} del equipo ${equipo}:`);
    }
}

//Funcion para asiganar el saque
function saque_1(saque){
    if (saque === "L") {
        equipoSaque = equipoLocal;
        numSaqueActual = posicionEquipoLocal[0];
        saqueActual = 1;
    } else if (saque === "V") {
        equipoSaque = equipoVisitante;
        numSaqueActual = posicionEquipoVisitante[0];
        saqueActual = 2;
    }
}

//Funcion para cargar los puntos y las rotaciones
function puntosYRotacion(punto){
    if (punto === "L") {
        puntajeLocal++;
        if (saqueActual === 2){
            for (let j = 0; j < 5; j++) {
                auxPosLocal = posicionEquipoLocal[j];
                posicionEquipoLocal[j] = posicionEquipoLocal [j+1];
                numSaqueActual = posicionEquipoLocal[0];
            }
            posicionEquipoLocal[5] = auxPosLocal;
            saqueActual = 1;
        }
    } else if (punto === "V") {
        puntajeVisitante++;
        if (saqueActual === 1){
            for (let k = 0; k < 5; k++) {
                auxPosVisitante = posicionEquipoVisitante[k];
                posicionEquipoVisitante[k] = posicionEquipoVisitante [k+1];
                numSaqueActual = posicionEquipoVisitante[0];
            }
            posicionEquipoVisitante[5] = auxPosVisitante;
            saqueActual = 2;
        }
    }
    diferenciaPuntos = puntajeLocal - puntajeVisitante;
    diferenciaPuntos = Math.abs(diferenciaPuntos);
}

//Funcion para declarar al ganador
function ganador(a, b){
    if (a > b){
        alert("FIN DEL SET, Ganador el equipo: " + equipoLocal);
    } else if (b > a){
        alert("FIN DEL SET, Ganador el equipo: " + equipoVisitante);
    }
}

//Comienzo del progama

alert("Bienvenido a tu asistente de planillero preferido");
alert("Por favor, sigue las instrucciones para setear correctamente el inicio del partido");
alert("Comenzamos?");

equipoLocal = prompt("Ingrese el nombre del equipo local: ");
equipoVisitante = prompt("Ingrese el nombre del equipo visitante: ");

console.log("Equipo Local:", equipoLocal);
console.log("Equipo Visitante:", equipoVisitante);

// Solicitar la posicion de los jugadores

cargarArray(posicionEquipoLocal, 'local');
cargarArray(posicionEquipoVisitante, 'visitante');

// Definimos quien comienza sacando en el partido
saque = prompt("¿Quien saca? L o V (local o visitante)");
saque_1(saque);
alert("COMIENZA EL PARTIDO, va al saque el jugador numero " + numSaqueActual + " del equipo: " + equipoSaque);

// Definimos la cantidad de puntos para que terimne el set
while (((puntajeLocal < 5) && (puntajeVisitante < 5)) || (diferenciaPuntos < 2 )) {
    alert(`Puntaje actual:\n${equipoLocal}: ${puntajeLocal}\n${equipoVisitante}: ${puntajeVisitante}\n Va al saque el jugador numero: ${numSaqueActual}`);
    punto = prompt("Para quien fue el punto? L o V (local o visitante)"); 
    puntosYRotacion(punto);
}
ganador(puntajeLocal, puntajeVisitante);
alert(`Puntaje final:\n${equipoLocal}: ${puntajeLocal}\n${equipoVisitante}: ${puntajeVisitante}`);






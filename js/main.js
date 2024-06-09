// Declaracion de variables
let equipoLocal, equipoVisitante, saque, primerSaque;
let posicionEquipoLocal = new Array(6);
let posicionEquipoVisitante = new Array(6); 

alert("Bienvenido a tu asistente de planillero preferido");
alert("Por favor, sigue las instrucciones para setear correctamente el inicio del partido");
alert("Comenzamos?");

equipoLocal = prompt("Ingrese el nombre del equipo local: ");
equipoVisitante = prompt("Ingrese el nombre del equipo visitante: ");

console.log("Equipo Local:", equipoLocal);
console.log("Equipo Visitante:", equipoVisitante);

// Solicitar la posicion de los jugadores

for (let i = 0; i < 6; i++) {
    posicionEquipoLocal[i] = prompt(`Ingrese el numero de jugador para la posición ${i + 1} del equipo local:`);
   
}

for (let i = 0; i < 6; i++) {
    posicionEquipoVisitante[i] = prompt(`Ingrese el numero de jugador para la posición ${i + 1} del equipo visitante:`);
}

saque = prompt("¿Quien saca? L o V (local o visitante)");

if (saque === "L") {
    saque = equipoLocal;
    primerSaque = posicionEquipoLocal[0];
} else if (saque === "V") {
    saque = equipoVisitante;
    primerSaque = posicionEquipoVisitante[0];
}

alert("COMIENZA EL PARTIDO, va al saque el jugador numero " + primerSaque + " del equipo: " + saque);

console.log("Equipo Local:", equipoLocal);
console.log("Equipo Visitante:", equipoVisitante);
console.log("Posiciones equipo local:", posicionEquipoLocal);
console.log("Posiciones equipo visitante:", posicionEquipoVisitante);
console.log("Primer Saque:", primerSaque);
console.log("Saque:", saque);

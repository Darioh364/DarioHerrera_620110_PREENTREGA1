let equipoLocal = "";
let equipoVisitante = "";
let primer_saque = 0;
let punto = "";
let saqueActual = 0;
let diferenciaPuntos = 0;
let posicionesLocal = [];
let posicionesVisitante = [];
let puntaje_Local = 0;
let puntaje_Visitante = 0;
let banderaLocal = 0;
let banderaVisitante = 0;

// Obtengo los Datos del equipo Local
document.getElementById('guardarLocal').addEventListener('click', function() {

    equipoLocal = document.getElementById('nombre_Equipo_Local').value;

    // Obtener los valores de los inputs y almacenarlos en el array
    posicionesLocal = [];
    for (let i = 0; i <= 5; i++) {
        let valor_Local = document.getElementById(`pos_Local_${i}`).value;
        posicionesLocal.push(parseInt(valor_Local)); // Convertir a entero y agregar al array
    }

    let boton_Guardar_Local = document.getElementById('guardarLocal');
    boton_Guardar_Local.innerHTML = `Guardado`;

    // Deshabilitar los inputs y mostrar los valores almacenados
    for (let i = 0; i <= 5; i++) {
        let inputLocal = document.getElementById(`pos_Local_${i}`);
        inputLocal.disabled = true;
    }

    document.getElementById('nombre_Equipo_Local').value = equipoLocal;
    document.getElementById('nombre_Equipo_Local').disabled = true;
/*
    posicionesLocal = [1,2,3,4,5,6];
    console.log(posicionesLocal);
    console.log(equipoLocal);
*/
});

// Obtengo los Datos del equipo Visitante
document.getElementById('guardarVisitante').addEventListener('click', function() {

    equipoVisitante = document.getElementById('nombre_Equipo_Visitante').value;

    // Obtener los valores de los inputs y almacenarlos en el array
    posicionesVisitante = [];
    for (let i = 0; i <= 5; i++) {
        let valor_Visitante = document.getElementById(`pos_Visitante_${i}`).value;
        posicionesVisitante.push(parseInt(valor_Visitante)); // Convertir a entero y agregar al array
    }

    // Cambia el estado del Boton para que Aparezca que los datos se guardaron
    let boton_Guardar_Visitante = document.getElementById('guardarVisitante');
    boton_Guardar_Visitante.innerHTML = `Guardado`;

    // Deshabilitar los inputs y mostrar los valores almacenados
    for (let i = 0; i <= 5; i++) {
        let inputVisitante = document.getElementById(`pos_Visitante_${i}`);
        inputVisitante.disabled = true;
    }

    document.getElementById('nombre_Equipo_Visitante').value = equipoVisitante;
    document.getElementById('nombre_Equipo_Visitante').disabled = true;

/*
    posicionesVisitante = [7,8,9,10,11,12];
    console.log(posicionesVisitante);
    console.log(equipoVisitante);
*/
});

// Obtengo quien tiene el saque
document.getElementById('boton_Saque_Local').addEventListener('click', function() {
    let botonSaqueLocal = document.getElementById('boton_Saque_Local');
    botonSaqueLocal.classList.toggle('btn-secondary');
    botonSaqueLocal.classList.toggle('btn-success');
    primer_saque = 1;
    console.log(primer_saque);
}, { once: true });

document.getElementById('boton_Saque_Visitante').addEventListener('click', function() {
    let botonSaqueVisitante = document.getElementById('boton_Saque_Visitante');
    botonSaqueVisitante.classList.toggle('btn-secondary');
    botonSaqueVisitante.classList.toggle('btn-success');
    primer_saque = 2;
    console.log(primer_saque);
}, { once: true });

// Boton para empezar el partido
document.getElementById('boton_Empezar').addEventListener('click', function() {
    let contenido_Msj_Centro = document.getElementById('msj_Centro');
    let puntaje_Local_Block = document.getElementById('puntaje_Local');
    let puntaje_Visitante_Block = document.getElementById('puntaje_Visitante');
    let boton_Empezar_Block = document.getElementById('boton_Empezar_Block');
    let nombre_Equipo_Local_Block = document.getElementById('nombre_Equipo_Local_Let');
    let nombre_Equipo_Visitante_Block = document.getElementById('nombre_Equipo_Visitante_Let');
    const posicionesLocalComparacion = [...posicionesLocal]; //Es una mouske herramientas que nos servira mas tarde 
    const posicionesVisitanteComparacion = [...posicionesVisitante]; //Es una mouske herramientas que nos servira mas tarde 


    puntaje_Local = 0;
    puntaje_Visitante = 0;

    contenido_Msj_Centro.innerHTML = `
        <h4>¿Para quien fue punto?</h4>
    `;

    puntaje_Local_Block.innerHTML = `
        <h4>${puntaje_Local}</h4>
    `;

    puntaje_Visitante_Block.innerHTML = `
        <h4>${puntaje_Visitante}</h4>
    `;

    boton_Empezar_Block.innerHTML = ``;

    nombre_Equipo_Local_Block.innerHTML = `
        <h6>${equipoLocal}</h6>
    `;

    nombre_Equipo_Visitante_Block.innerHTML = `
        <h6>${equipoVisitante}</h6>
    `;
// Pongo en verde el input del jugador que va al saque y todo el resto en rojo

    if (primer_saque === 1) {
        document.getElementById(`pos_Local_0`).classList.add('green-bg');
        saqueActual = 1;
        for (let i = 1; i <= 5; i++) {
            document.getElementById(`pos_Local_${i}`).classList.add('red-bg');
        }
        for (let i = 0; i <= 5; i++) {
            document.getElementById(`pos_Visitante_${i}`).classList.add('red-bg');
        }
    } else if (primer_saque === 2) {
        document.getElementById(`pos_Visitante_0`).classList.add('green-bg');
        saqueActual = 2;
        for (let i = 0; i <= 5; i++) {
            document.getElementById(`pos_Visitante_${i}`).classList.add('red-bg');
        }
        for (let i = 0; i <= 5; i++) {
            document.getElementById(`pos_Local_${i}`).classList.add('red-bg');
        }
    }

    // Función para actualizar el puntaje
    function actualizarPuntaje(equipo) {
        if (equipo === 'L') {
            puntaje_Local++;
                if (saqueActual === 2) {
                    saqueActual = 1;
                    rotarPosiciones(posicionesLocal, saqueActual);
                    rotar_Color_Saque(saqueActual, posicionesLocal, posicionesLocalComparacion);
                }
        } else if (equipo === 'V') {
            puntaje_Visitante++;
            if (saqueActual === 1) {
                saqueActual = 2;
                rotarPosiciones(posicionesVisitante, saqueActual);
                rotar_Color_Saque(saqueActual, posicionesVisitante, posicionesVisitanteComparacion);
            }
            
        }
    }

    // Función para rotar posiciones
    function rotarPosiciones(posiciones, saque) {
        let aux = posiciones[0];
        for (let i = 0; i < 5; i++) {
            posiciones[i] = posiciones[i + 1];
        }
        posiciones[5] = aux;
    }

    // Función para verificar el estado del juego
    function verificarEstado() {
        diferenciaPuntos = Math.abs(puntaje_Local - puntaje_Visitante);
        if ((puntaje_Local >= 15 || puntaje_Visitante >= 15) && diferenciaPuntos >= 2) {
            alert('Fin del juego');
        }
    }

    // Función para actualizar la pantalla
    function actualizarPantalla() {
        puntaje_Local_Block.innerHTML = `<h4>${puntaje_Local}</h4>`;
        puntaje_Visitante_Block.innerHTML = `<h4>${puntaje_Visitante}</h4>`;
        //verificarEstado();
    }

    function rotar_Color_Saque(saque, posiciones1, posiciones2) {

        let index;
        let value = posiciones1[0];
    
        if (saque === 1) {
            // Buscar el índice de este valor en posiciones2 (posicionesLocalComparacion)
            index = posiciones2.indexOf(value);
            // Asignar el verde al jugador del saque local y rojo a los demás
            for (let i = 0; i <= 5; i++) {
                document.getElementById(`pos_Local_${i}`).classList.add('red-bg');
                if (i === index) {
                    document.getElementById(`pos_Visitante_${i}`).classList.remove('red-bg');
                    document.getElementById(`pos_Local_${index}`).classList.add('green-bg');
                }
            }
    
            // Aplicar rojo a todos los jugadores visitantes
            for (let i = 0; i <= 5; i++) {
                document.getElementById(`pos_Visitante_${i}`).classList.remove('green-bg');
                document.getElementById(`pos_Visitante_${i}`).classList.add('red-bg');
            }
    
        } else if (saque === 2) {
            // Buscar el índice de este valor en posiciones2 (posicionesVisitanteComparacion)
            index = posiciones2.indexOf(value);
    
            // Asignar el verde al jugador del saque visitante y rojo a los demás
            for (let i = 0; i <= 5; i++) {
                document.getElementById(`pos_Visitante_${i}`).classList.add('red-bg');
                if (i === index) {
                    document.getElementById(`pos_Visitante_${i}`).classList.remove('red-bg');
                    document.getElementById(`pos_Visitante_${index}`).classList.add('green-bg');
                } 
            }
    
            // Aplicar rojo a todos los jugadores locales
            for (let i = 0; i <= 5; i++) {
                document.getElementById(`pos_Local_${i}`).classList.remove('green-bg');
                document.getElementById(`pos_Local_${i}`).classList.add('red-bg');
            }
        }
    }
    

 // Asignar eventos para actualizar el puntaje, espera si se acciona un boton u el otro:--------------------------------------------------------------

    document.getElementById('boton_Saque_Local').addEventListener('click', function() {
        actualizarPuntaje('L');
        actualizarPantalla();
        verificarEstado();
    });

    document.getElementById('boton_Saque_Visitante').addEventListener('click', function() {
        actualizarPuntaje('V');
        actualizarPantalla ();
        verificarEstado();
    });
    

});

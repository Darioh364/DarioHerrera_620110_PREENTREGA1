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
    for (let i = 1; i <= 6; i++) {
        let valor_Local = document.getElementById(`pos_Local_${i}`).value;
        posicionesLocal.push(parseInt(valor_Local)); // Convertir a entero y agregar al array
    }

    let boton_Guardar_Local = document.getElementById('guardarLocal');
    boton_Guardar_Local.innerHTML = `Guardado`;

    // Deshabilitar los inputs y mostrar los valores almacenados
    for (let i = 1; i <= 6; i++) {
        let inputLocal = document.getElementById(`pos_Local_${i}`);
        inputLocal.disabled = true;
    }

    document.getElementById('nombre_Equipo_Local').value = equipoLocal;
    document.getElementById('nombre_Equipo_Local').disabled = true;

    console.log(posicionesLocal);
    console.log(equipoLocal);
});

// Obtengo los Datos del equipo Visitante
document.getElementById('guardarVisitante').addEventListener('click', function() {
    equipoVisitante = document.getElementById('nombre_Equipo_Visitante').value;

    // Obtener los valores de los inputs y almacenarlos en el array
    posicionesVisitante = [];
    for (let i = 1; i <= 6; i++) {
        let valor_Visitante = document.getElementById(`pos_Visitante_${i}`).value;
        posicionesVisitante.push(parseInt(valor_Visitante)); // Convertir a entero y agregar al array
    }

    // Cambia el estado del Boton para que Aparezca que los datos se guardaron
    let boton_Guardar_Visitante = document.getElementById('guardarVisitante');
    boton_Guardar_Visitante.innerHTML = `Guardado`;

    // Deshabilitar los inputs y mostrar los valores almacenados
    for (let i = 1; i <= 6; i++) {
        let inputVisitante = document.getElementById(`pos_Visitante_${i}`);
        inputVisitante.disabled = true;
    }

    document.getElementById('nombre_Equipo_Visitante').value = equipoVisitante;
    document.getElementById('nombre_Equipo_Visitante').disabled = true;

    console.log(posicionesVisitante);
    console.log(equipoVisitante);
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
        document.getElementById(`pos_Local_1`).classList.add('green-bg');
        saqueActual = 1;
        for (let i = 2; i <= 6; i++) {
            document.getElementById(`pos_Local_${i}`).classList.add('red-bg');
        }
        for (let i = 1; i <= 6; i++) {
            document.getElementById(`pos_Visitante_${i}`).classList.add('red-bg');
        }
    } else if (primer_saque === 2) {
        document.getElementById(`pos_Visitante_1`).classList.add('green-bg');
        saqueActual = 2;
        for (let i = 2; i <= 6; i++) {
            document.getElementById(`pos_Visitante_${i}`).classList.add('red-bg');
        }
        for (let i = 1; i <= 6; i++) {
            document.getElementById(`pos_Local_${i}`).classList.add('red-bg');
        }
    }

    // Función para actualizar el puntaje
    function actualizarPuntaje(equipo) {
        if (equipo === 'L') {
            console.log('a');
            puntaje_Local++;
                if (saqueActual === 2) {
                    alert('Entre aca Local');
                    rotarPosiciones(posicionesLocal);
                    saqueActual = 1;
                }
        } else if (equipo === 'V') {
            console.log('b');
            puntaje_Visitante++;
            if (saqueActual === 1) {
                alert('Entre aca Visitante+');
                rotarPosiciones(posicionesVisitante);
                saqueActual = 2;
            }
            
        }
    }

    // Función para rotar posiciones
    function rotarPosiciones(posiciones) {
        let aux = posiciones[0];
        for (let i = 0; i < 5; i++) {
            posiciones[i] = posiciones[i + 1];
        }
        posiciones[5] = aux;
        
    }

    // Función para verificar el estado del juego
    function verificarEstado() {
        diferenciaPuntos = Math.abs(puntaje_Local - puntaje_Visitante);
        if ((puntaje_Local >= 5 || puntaje_Visitante >= 5) && diferenciaPuntos >= 2) {
            alert('Fin del juego');
        }
    }

    // Función para actualizar la pantalla
    function actualizarPantalla() {
        puntaje_Local_Block.innerHTML = `<h4>${puntaje_Local}</h4>`;
        puntaje_Visitante_Block.innerHTML = `<h4>${puntaje_Visitante}</h4>`;
        //verificarEstado();
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

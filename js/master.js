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
let historial;

document.getElementById('boton_Ver_Instrucciones').addEventListener('click', function () {
    document.getElementById('instrucciones_Box').style.display = 'flex';
    document.getElementById('cerrar_instruciones').addEventListener('click', function () {
        document.getElementById('instrucciones_Box').style.display = 'none';
    });
});


// Obtengo los Datos del equipo Local
document.getElementById('guardarLocal').addEventListener('click', function () {

    let entrada_Vacia_Incorrecta_Numero = false;
    let entradas_Iguales = false;
    equipoLocal = document.getElementById('nombre_Equipo_Local').value;
    let valores = new Set(); // Conjunto para almacenar valores únicos

    for (let i = 0; i <= 5; i++) {
        let input = document.getElementById(`pos_Local_${i}`);
        let value = input.value;

        if (value === "" || isNaN(value) || equipoLocal === "") {
            entrada_Vacia_Incorrecta_Numero = true;
            break;
        }

        let valor_Pos = Number(value);
        if (valores.has(valor_Pos)) {
            entradas_Iguales = true;
        } else {
            valores.add(valor_Pos);
        }
    }

    if (entrada_Vacia_Incorrecta_Numero) {
        document.getElementById('error_carga_Box').style.display = 'flex';
        document.getElementById('cerrar_Erorr_Carga').addEventListener('click', function () {
            document.getElementById('error_carga_Box').style.display = 'none';
        });
    } else if (entradas_Iguales) {
        document.getElementById('datos_Iguales_Box').style.display = 'flex';
        document.getElementById('cerrar_Datos_Iguales').addEventListener('click', function () {
            document.getElementById('datos_Iguales_Box').style.display = 'none';
        });
    } else {
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
    }


});

// Obtengo los Datos del equipo Visitante
document.getElementById('guardarVisitante').addEventListener('click', function () {

    let entrada_Vacia_Incorrecta_Numero = false;
    let entradas_Iguales = false;
    equipoVisitante = document.getElementById('nombre_Equipo_Visitante').value;
    let valores = new Set(); // Conjunto para almacenar valores únicos

    for (let i = 0; i <= 5; i++) {
        let input = document.getElementById(`pos_Visitante_${i}`);
        let value = input.value;

        if (value === "" || isNaN(value) || equipoVisitante === "") {
            entrada_Vacia_Incorrecta_Numero = true;
            break;
        }

        let valor_Pos = Number(value);
        if (valores.has(valor_Pos)) {
            entradas_Iguales = true;
        } else {
            valores.add(valor_Pos);
        }
    }

    if (entrada_Vacia_Incorrecta_Numero) {
        document.getElementById('error_carga_Box').style.display = 'flex';
        document.getElementById('cerrar_Erorr_Carga').addEventListener('click', function () {
            document.getElementById('error_carga_Box').style.display = 'none';
        });
    } else if (entradas_Iguales) {
        document.getElementById('datos_Iguales_Box').style.display = 'flex';
        document.getElementById('cerrar_Datos_Iguales').addEventListener('click', function () {
            document.getElementById('datos_Iguales_Box').style.display = 'none';
        });
    } else {
        // Obtener los valores de los inputs y almacenarlos en el array
        posicionesVisitante = [];
        for (let i = 0; i <= 5; i++) {
            let valor_Visitante = document.getElementById(`pos_Visitante_${i}`).value;
            posicionesVisitante.push(parseInt(valor_Visitante)); // Convertir a entero y agregar al array
        }

        // Cambia el estado del Botón para que aparezca que los datos se guardaron
        let boton_Guardar_Visitante = document.getElementById('guardarVisitante');
        boton_Guardar_Visitante.innerHTML = `Guardado`;

        // Deshabilitar los inputs y mostrar los valores almacenados
        for (let i = 0; i <= 5; i++) {
            let inputVisitante = document.getElementById(`pos_Visitante_${i}`);
            inputVisitante.disabled = true;
        }
        document.getElementById('nombre_Equipo_Visitante').value = equipoVisitante;
        document.getElementById('nombre_Equipo_Visitante').disabled = true;
    }

});

// Obtengo quien tiene el saque
document.getElementById('boton_Saque_Local').addEventListener('click', function () {
    let botonSaqueLocal = document.getElementById('boton_Saque_Local');
    botonSaqueLocal.classList.toggle('btn-secondary');
    botonSaqueLocal.classList.toggle('btn-success');
    primer_saque = 1;
    console.log(primer_saque);
}, { once: true });

document.getElementById('boton_Saque_Visitante').addEventListener('click', function () {
    let botonSaqueVisitante = document.getElementById('boton_Saque_Visitante');
    botonSaqueVisitante.classList.toggle('btn-secondary');
    botonSaqueVisitante.classList.toggle('btn-success');
    primer_saque = 2;
    console.log(primer_saque);
}, { once: true });


document.getElementById('boton_Ver_Historial').addEventListener('click', function () {
    document.getElementById('dialogOverlay').style.display = 'flex';
    mostrarHistorial();

});

document.getElementById('boton_Cerrar_Historial').addEventListener('click', function () {
    document.getElementById('dialogOverlay').style.display = 'none';
});


document.getElementById('boton_Borrar_Historial').addEventListener('click', function () {
    document.getElementById('borrar_Historial_Box').style.display = 'flex';

    document.getElementById('si_Borrar_Historial').addEventListener('click', function () {
        historial = 1;
        if (historial === 1) {
            localStorage.clear();
            let historial_Borrado = document.getElementById('borrar_Historial');
            historial_Borrado.innerHTML = `
                El historial se borro de forma correcta. <br>
                <button id="terminar_Borrado_Historial">Terminar</button>
            `;
            document.getElementById('terminar_Borrado_Historial').addEventListener('click', function () {
                document.getElementById('borrar_Historial_Box').style.display = 'none';
            });
        } else if (historial === 2) {
            document.getElementById('borrar_Historial_Box').style.display = 'none';
        }
    });
    document.getElementById('no_Borrar_Historial').addEventListener('click', function () {
        historial = 2;
        if (historial === 1) {
            localStorage.clear();
            document.getElementById('borrar_Historial_Box').style.display = 'none';
        } else if (historial === 2) {
            document.getElementById('borrar_Historial_Box').style.display = 'none';
        }
    });


});
// Función para mostrar el cuadro de diálogo con el historial
function mostrarHistorial() {
    let historial = obtenerHistorialPartidos();
    let historialContenido = document.getElementById('historialContenido');
    historialContenido.innerHTML = ''; // Limpiar contenido previo

    if (historial.length > 0) {
        historial.forEach(partido => {
            let partidoElemento = document.createElement('div');
            partidoElemento.innerHTML = `
                <strong>Nombre del Partido:</strong> ${partido.nombre}<br>
                <strong>Equipo Ganador:</strong> ${partido.datos.equipoGanador}<br>
                <strong>Puntaje Ganador:</strong> ${partido.datos.puntajeGanador}<br>
                <strong>Equipo Perdedor:</strong> ${partido.datos.equipoPerdedor}<br>
                <strong>Puntaje Perdedor:</strong> ${partido.datos.puntajePerdedor}<br>
                <hr>
            `;
            historialContenido.appendChild(partidoElemento);
        });
    } else {
        historialContenido.innerHTML = 'No hay partidos guardados en el historial.';
    }

    document.getElementById('dialogOverlay').style.display = 'flex';
}

function obtenerHistorialPartidos() {
    let historial = [];
    for (let i = 0; i < localStorage.length; i++) {
        let clave = localStorage.key(i);
        let partidoJSON = localStorage.getItem(clave);
        let partido = JSON.parse(partidoJSON);
        historial.push({ nombre: clave, datos: partido });
    }
    return historial;
}

// Boton para empezar el partido
document.getElementById('boton_Empezar').addEventListener('click', function () {
    let contenido_Msj_Centro = document.getElementById('msj_Centro');
    let puntaje_Local_Block = document.getElementById('puntaje_Local');
    let puntaje_Visitante_Block = document.getElementById('puntaje_Visitante');
    let boton_Empezar_Block = document.getElementById('boton_Empezar_Block');
    let nombre_Equipo_Local_Block = document.getElementById('nombre_Equipo_Local_Let');
    let nombre_Equipo_Visitante_Block = document.getElementById('nombre_Equipo_Visitante_Let');
    const posicionesLocalComparacion = [...posicionesLocal]; //Es una mouske herramientas que nos servira mas tarde 
    const posicionesVisitanteComparacion = [...posicionesVisitante]; //Es una mouske herramientas que nos servira mas tarde 
    let boton_Ver_Historial_Block = document.getElementById('boton_Ver_Historial_Block');
    let boton_Borrar_Historial_Block = document.getElementById('boton_Borrar_Historial_Block');

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
    boton_Borrar_Historial_Block.innerHTML = ``;

    boton_Ver_Historial_Block.innerHTML = ``;

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
        if ((puntaje_Local >= 5 || puntaje_Visitante >= 5) && diferenciaPuntos >= 2) {
            if (puntaje_Local > puntaje_Visitante) {
                finDelJuego(equipoLocal, equipoVisitante, puntaje_Local, puntaje_Visitante);
            } else {
                finDelJuego(equipoVisitante, equipoLocal, puntaje_Visitante, puntaje_Local);
            }
        }
    }

    // Función para actualizar la pantalla
    function actualizarPantalla() {
        puntaje_Local_Block.innerHTML = `<h4>${puntaje_Local}</h4>`;
        puntaje_Visitante_Block.innerHTML = `<h4>${puntaje_Visitante}</h4>`;
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

    function finDelJuego(equipoGanador, equipoPerdedor, puntajeGanador, puntajePerdedor) {
        //Creo un objeto, para guardar los datos del partido
        let datos_Partido = {
            equipoGanador: equipoGanador,
            puntajeGanador: puntajeGanador,
            equipoPerdedor: equipoPerdedor,
            puntajePerdedor: puntajePerdedor
        };
        //Cuadro de dialogo para mostrar el fin y ganador del partido
        document.getElementById('ganadorPartido_Box').style.display = 'flex';
        let ganadorPartido = document.getElementById('ganadorPartido');

        ganadorPartido.innerHTML = `
            <strong>Equipo Ganador:</strong> ${datos_Partido.equipoGanador}<br>
            <strong>Puntaje Ganador:</strong> ${datos_Partido.puntajeGanador}<br>
            <strong>Equipo Perdedor:</strong> ${datos_Partido.equipoPerdedor}<br>
            <strong>Puntaje Perdedor:</strong> ${datos_Partido.puntajePerdedor}<br>
            <hr>
        `;
        document.getElementById('boton_Cerrar_ganadorPartido').addEventListener('click', function () {
            // Ocultar el cuadro de dialogo de ganador del partido
            document.getElementById('ganadorPartido_Box').style.display = 'none';

            // Mostrar el cuadro de dialogo para guardar los datos del partido
            document.getElementById('guardar_Datos_Box').style.display = 'flex';

            // Agregar evento click al botón para cerrar guardar_Datos_Box
            document.getElementById('boton_Cerrar_GuardarDatosPartido').addEventListener('click', function () {
                // Obtener los valores de nombre_Del_Partido y fecha_Del_Partido
                let nombre_Del_Partido = document.getElementById('nombre_Del_Partido').value;
                let fecha_Del_Partido = document.getElementById('fecha_Del_Partido').value;

                // Crear el Id_Partido combinando nombre y fecha
                let Id_Partido = nombre_Del_Partido + '(' + fecha_Del_Partido + ')';

                // Verificar si los datos son válidos
                if (nombre_Del_Partido && fecha_Del_Partido) {
                    // Guardar datos_Partido en LocalStorage bajo el nombre proporcionado
                    localStorage.setItem(Id_Partido, JSON.stringify(datos_Partido));

                    // Mostrar mensaje de datos guardados correctamente
                    let mensaje_Datos_Guardado = document.getElementById('caja_Guardar_Datos');
                    mensaje_Datos_Guardado.innerHTML = `
                        Datos del partido guardados correctamente. <br>
                        <button id="terminar_Guardado_De_Datos">Terminar</button>
                    `;

                    // Agregar evento click al botón Terminar
                    document.getElementById('terminar_Guardado_De_Datos').addEventListener('click', function () {
                        // Ocultar el cuadro de dialogo de guardar_Datos_Box
                        document.getElementById('guardar_Datos_Box').style.display = 'none';

                        // Recargar la página
                        location.reload();
                    });
                } else {
                    // Mostrar mensaje de datos ingresados incorrectos
                    document.getElementById('error_Datos_Box').style.display = 'flex';
                    // Agregar evento click al botón Intentar otra vez
                    document.getElementById('reintento_Guardado_De_Datos').addEventListener('click', function () {
                        // Mostrar nuevamente el cuadro de dialogo de guardar_Datos_Box
                        document.getElementById('error_Datos_Box').style.display = 'none';
                        document.getElementById('guardar_Datos_Box').style.display = 'flex';
                    });
                }
            });
        });
    }


    // Asignar eventos para actualizar el puntaje, espera si se acciona un boton u el otro:--------------------------------------------------------------

    document.getElementById('boton_Saque_Local').addEventListener('click', function () {
        actualizarPuntaje('L');
        actualizarPantalla();
        verificarEstado();
    });

    document.getElementById('boton_Saque_Visitante').addEventListener('click', function () {
        actualizarPuntaje('V');
        actualizarPantalla();
        verificarEstado();
    });


});

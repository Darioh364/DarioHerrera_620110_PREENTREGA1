let equipoLocal = "";
let equipoVisitante = "";
let primer_saque = 0;
let saqueActual = 0;
let diferenciaPuntos = 0;
let posicionesLocal = [];
let posicionesVisitante = [];
let arraysDeFormaciones = [];
let array_De_Texto = [];
let array_Texto_2 = []
let puntaje_Local = 0;
let puntaje_Visitante = 0;
let banderaLocal = 0;
let banderaVisitante = 0;
let idioma_Aux = 0;
let contador_Idioma = 0;
let i = 0;
//_________________________________________________________________________________________________________________________________________
// Cargo un array con los textos de los elementos por si se necesitan despues para traducir la pagina
const elementos_Id = [
    "titulo_Pagina_1","titulo_Pagina_2", "selector_Idioma", "nombre_Equipo_Local_Let", "nombre_Equipo_Visitante_Let","puntaje", "boton_Ver_Instrucciones", "boton_Ver_Historial", "boton_Borrar_Historial", "puntaje_Local", "puntaje_Visitante", 
    "boton_Saque_Local", "msj_Centro", "boton_Saque_Visitante", "boton_Empezar", "guardarLocal", "guardarVisitante", "boton_Guardar_1", "boton_Guardar_2", "titulo_Posiciones_1", "titulo_Posiciones_2"
];
//Array para los textos
let elementos_Pagina = elementos_Id.map(function(id) {
    let element = document.getElementById(id); 
    if (element) {
        array_De_Texto[i] = element.innerText; // Asigna el innerText al índice actual del array
        i++; // Incrementa el índice
    }
})



//________________________________________________________________________________________________________________
//_____________________________________________________________________________________________________________
//Enviar datos
async function traducir_Elemento_Especifico (idioma_Elegido, texto){
    if (contador_Idioma == 0){
        idioma_Aux = "es";
    }
        const url_2 = 'https://text-translator2.p.rapidapi.com/translate';
        const data = new FormData();
        data.append('source_language', `${idioma_Aux}`);
        data.append('target_language', `${idioma_Elegido}`);
        data.append('text', `${texto}`);

        const options_2 = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': '3ddf2e1860mshcf816e06e72ca7ep1d6231jsn3d1e2ad14d05',
                'x-rapidapi-host': 'text-translator2.p.rapidapi.com'
            },
            body: data
        };
        // Hago la peticion de la traduccion
        await fetch(url_2, options_2)
        .then(res => res.json())
        .then(objeto => {
            let texto_Traducido = objeto.data.translatedText
            array_Traducido(texto_Traducido);
        });
}

//_______________________________________________________________________________________________________________________________


async function traducir_Html(idioma_Elegido) {
    for (let elemento of array_De_Texto) {
        let texto = elemento; 
        await traducir_Elemento_Especifico(idioma_Elegido, texto);
        // Llamo a la función para que cambie el texto del html
    }
    contador_Idioma ++;
    idioma_Aux = idioma_Elegido;
    imprimir_Html_Traducido(array_Texto_2);
    console.log(array_Texto_2)
    array_Texto_2 = [];
}

async function array_Traducido(texto_Traducido){
        let element = texto_Traducido; // Obtiene el elemento por ID
        if (element) { // Verifica que el elemento exista
            array_Texto_2.push(element); // Agrega el texto del elemento al array
        }
}

function imprimir_Html_Traducido(array_Texto_2){
    elementos_Id.forEach(function(id, index) {
        if (index < array_Texto_2.length) {
            let texto_Cambiado = array_Texto_2[index]; // Accede al elemento del array usando el índice
            document.getElementById(id).innerText = texto_Cambiado; // Cambia el texto del elemento
        }
    })
}

document.getElementById('idioma_Elegido').addEventListener('change', function () {
    let idioma_Seleccionado = this.value;
    traducir_Html(idioma_Seleccionado);
})





//--------------------------------------------------------------------------------------------------------------------------------------------------
// Obtengo las posiciones guardadas en el .json
fetch('data/equipos_1.json')
    .then(response => response.json())
    .then(data_Equipos1 => {
        // Process the data
        arraysDeFormaciones = data_Equipos1.map(formacion => Object.values(formacion));
    })
    .catch(error => console.error('Error fetching the JSON data:', error));



// Funciones para modificar el DOM:
// Función para mostrar instrucciones
function mostrarInstrucciones() {
    Swal.fire({
        title: "<h4><strong>Bienvenido a tu planillero de voley</strong></h4>",
        html: `
                    <div id="instrucciones" class="text-start">
                    <h5 class="card-subtitle mb-2 text-muted">Instrucciones de Uso (Por favor leer con atención para su
                        correcto funcionamiento)</h5>
                    <p><strong>1.</strong> Ingresar los números de los jugadores y el nombre de cada equipo al inicio
                        del partido (Locales y visitantes).</p>
                    <p><strong>2.</strong> Luego, presionar "Guardar" en ambos.</p>
                    <p><strong>3.</strong> Seleccionar quién de los 2 equipos comienza el partido sacando, y después
                        presionar "Comenzar".</p>
                    <p><strong>4.</strong> El planillero iniciará el partido y mostrará de color verde el jugador que va
                        al saque.</p>
                    <p><strong>5.</strong> Solo queda ir anotando para qué equipo es cada punto y el programa llevará
                        por usted las rotaciones y el puntaje de ambos equipos.</p>
                    <p><strong>(Siempre se mostrará en verde el jugador que va al saque)</strong></p>
                    <p><strong>El partido está configurado a 5 puntos y diferencia de 2 así no se hace muy largo el
                            probarlo.</strong></p>
                    <h3>Historial</h3>
                    <p><strong>6.</strong> Cada vez que finalice un juego podrá guardar un registro del mismo.</p>
                    <p><strong>7.</strong> Para acceder a él, solo utilice los botones que aparecen en la pantalla
                        principal.</p>
                </div>
        `,
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: `
          <i class="fa fa-thumbs-up"></i> Okey!
        `,
    });
}
//Funcion para mostrar error de carga de datos
function mostrarErrorCarga() {
    Swal.fire({
        icon: "error",
        title: "mmm...",
        text: "Faltan completar campos o los datos son incorrectos ",
    });
}
//Funcion para mostrar error de datos iguales
function mostrarDatosIguales() {
    Swal.fire({
        icon: "warning",
        title: "Apa apa apa...",
        text: "Hay 2 numeros repetidos en un mismo equipo",
    });
}
// Función para mostrar el cuadro de diálogo con el historial
function mostrarHistorial() {
    document.getElementById('dialogOverlay').style.display = 'flex';
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
    document.getElementById('boton_Cerrar_Historial').addEventListener('click', function () {
        document.getElementById('dialogOverlay').style.display = 'none';
    });
}
//____________________________________________________________________________________________________________________________________________________
// Funciones para la logica del programa:
//Funcion para obtener el historial de partidos
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
//Funcion para Borrar historial
function borra_Historial() {
    let historial = 0;
    // Alerta para preguntar si borrar el historial 
    Swal.fire({
        title: "Esta seguro de que quiere borrar el historial?",
        showDenyButton: true,
        confirmButtonText: "Borrar",
        denyButtonText: `No borrar`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            historial = 1;
            if (historial === 1) {
                localStorage.clear();
                Swal.fire("El historial se borro de forma correcta.", "", "success");
            }
        } else if (result.isDenied) {
            historial = 2;
            if (historial === 1) {
                localStorage.clear();
                document.getElementById('borrar_Historial_Box').style.display = 'none';
                Swal.fire("El historial no se borro", "", "info");
            }
        }
    });
}
// Funcion para obtener datos del equipo local y visitante respectivamente
function prueba(equipo) {
    let entrada_Vacia_Incorrecta_Numero = false;
    let entradas_Iguales = false;
    nombreEquipo = document.getElementById(`nombre_Equipo_${equipo}`).value;
    let valores = new Set(); // Conjunto para almacenar valores únicos
    for (let i = 0; i <= 5; i++) {
        let input = document.getElementById(`pos_${equipo}_${i}`);
        let value = input.value;

        if (value === "" || isNaN(value) || nombreEquipo === "") {
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
        mostrarErrorCarga();
    } else if (entradas_Iguales) {
        mostrarDatosIguales();
    } else {
        // Obtener los valores de los inputs y almacenarlos en el array
        posiciones = [];
        for (let i = 0; i <= 5; i++) {
            let valor = document.getElementById(`pos_${equipo}_${i}`).value;
            posiciones.push(parseInt(valor)); // Convertir a entero y agregar al array
        }
        let boton_Guardar = document.getElementById(`guardar${equipo}`);
        boton_Guardar.innerHTML = `Guardado`;

        // Deshabilitar los inputs y mostrar los valores almacenados
        for (let i = 0; i <= 5; i++) {
            let inputLocal = document.getElementById(`pos_${equipo}_${i}`);
            inputLocal.disabled = true;
        }
        document.getElementById(`nombre_Equipo_${equipo}`).value = nombreEquipo;
        document.getElementById(`nombre_Equipo_${equipo}`).disabled = true;
    }
    return nombreEquipo;
    return posiciones;
}
//____________________________________________________________________________________________________________________________________________________
// Botones para de la pantalla principal:
// Obtengo los Datos del equipo Local
//Funcion para cargar automaticamente las posiciones
function cargar_Formacion(i, formacion_Equipo) {
    if (arraysDeFormaciones.length > 0) {
        const valor = arraysDeFormaciones[i]; // Asignar correctamente el primer array
        // Asignar los valores a los inputs
        document.getElementById(`pos_${formacion_Equipo}_0`).value = valor[0];
        document.getElementById(`pos_${formacion_Equipo}_1`).value = valor[1];
        document.getElementById(`pos_${formacion_Equipo}_2`).value = valor[2];
        document.getElementById(`pos_${formacion_Equipo}_3`).value = valor[3];
        document.getElementById(`pos_${formacion_Equipo}_4`).value = valor[4];
        document.getElementById(`pos_${formacion_Equipo}_5`).value = valor[5];
    }
}
// Funcion para elegir la formacion a cargar
function elegir_Formacion(formacion_Id, formacion_Equipo) {
    switch (formacion_Id) {
        case `guardado_${formacion_Equipo}_1`:
            cargar_Formacion(0, formacion_Equipo);
            break;
        case `guardado_${formacion_Equipo}_2`:
            cargar_Formacion(1, formacion_Equipo);
            break;
        case `guardado_${formacion_Equipo}_3`:
            cargar_Formacion(2, formacion_Equipo);
            break;
        case `guardado_${formacion_Equipo}_4`:
            cargar_Formacion(3, formacion_Equipo);
            break;
        case `guardado_${formacion_Equipo}_5`:
            cargar_Formacion(4, formacion_Equipo);
            break;
        case `guardado_${formacion_Equipo}_6`:
            cargar_Formacion(5, formacion_Equipo);
            break;
    }
}

// Creo los eventos para esperar y ver si se utilizan las rotaciones previas guardadas

const dropdown_Local = document.getElementById('guardado_Local');
dropdown_Local.addEventListener('click', (event) => {
    const formacion = event.target.closest('li'); // Me sirve para ubicar en que Elelemto "li" se hizo click
    if (formacion) {
        let formacion_Equipo_Local = "Local";
        elegir_Formacion(formacion.id, formacion_Equipo_Local);
    }
});

const dropdown_Visitante = document.getElementById('guardado_Visitante');
dropdown_Visitante.addEventListener('click', (event) => {
    const formacion = event.target.closest('li'); // Me sirve para ubicar en que Elelemto "li" se hizo click
    if (formacion) {
        let formacion_Equipo_Visitante = "Visitante";
        elegir_Formacion(formacion.id, formacion_Equipo_Visitante);
    }
});

// Obtengo los Datos del equipo Local
document.getElementById('guardarLocal').addEventListener('click', function () {
    let equipo = 'Local';
    prueba(equipo);
    posicionesLocal = posiciones;
    equipoLocal = nombreEquipo;
});

// Obtengo los Datos del equipo Visitante
document.getElementById('guardarVisitante').addEventListener('click', function () {
    let equipo = 'Visitante';
    prueba(equipo);
    posicionesVisitante = posiciones;
    equipoVisitante = nombreEquipo;
});
// Obtengo quien tiene el saque al comienzo
document.getElementById('boton_Saque_Local').addEventListener('click', function () {
    let botonSaqueLocal = document.getElementById('boton_Saque_Local');
    botonSaqueLocal.classList.toggle('btn-secondary');
    botonSaqueLocal.classList.toggle('btn-success');
    primer_saque = 1;
    console.log(primer_saque);
});

document.getElementById('boton_Saque_Visitante').addEventListener('click', function () {
    let botonSaqueVisitante = document.getElementById('boton_Saque_Visitante');
    botonSaqueVisitante.classList.toggle('btn-secondary');
    botonSaqueVisitante.classList.toggle('btn-success');
    primer_saque = 2;
    console.log(primer_saque);
});
//______________________________________________________________________________________________________________________________
// Boton para ver instrucciones
document.getElementById('boton_Ver_Instrucciones').addEventListener('click', function () {
    mostrarInstrucciones();
});
// Boton para ver historial
document.getElementById('boton_Ver_Historial').addEventListener('click', function () {
    mostrarHistorial();
});
// Boton para borrar el historial
document.getElementById('boton_Borrar_Historial').addEventListener('click', function () {
    borra_Historial();
});
// Boton para empezar el partido
document.getElementById('boton_Empezar').addEventListener('click', function () {
    let contenido_Msj_Centro = document.getElementById('msj_Centro');
    let puntaje_Local_Block = document.getElementById('puntaje_Local');
    let puntaje_Visitante_Block = document.getElementById('puntaje_Visitante');
    let boton_Empezar_Block = document.getElementById('boton_Empezar_Block');
    let nombre_Equipo_Local_Block = document.getElementById('nombre_Equipo_Local_Let');
    let nombre_Equipo_Visitante_Block = document.getElementById('nombre_Equipo_Visitante_Let');
    let selector_Idioma = document.getElementById('selector_Idioma');
    let idioma_Elegido = document.getElementById('idioma_Elegido');
    const posicionesLocalComparacion = [...posicionesLocal]; //Es una mouske herramientas que nos servira mas tarde 
    const posicionesVisitanteComparacion = [...posicionesVisitante]; //Es una mouske herramientas que nos servira mas tarde 
    let boton_Ver_Historial_Block = document.getElementById('boton_Ver_Historial_Block');
    let boton_Borrar_Historial_Block = document.getElementById('boton_Borrar_Historial_Block');
    //_________________________Modificacion del DOM para la pantalla de incio del partido____________________________________________________
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
        <h6 id="nombre_Equipo_Local_Let" class="m-0">${equipoLocal}</h6>
    `;

    nombre_Equipo_Visitante_Block.innerHTML = `
        <h6 id="nombre_Equipo_Visitante_Let" class="m-0">${equipoVisitante}</h6>
    `;
    boton_Borrar_Historial_Block.innerHTML = ``;

    boton_Ver_Historial_Block.innerHTML = ``;

    selector_Idioma.innerHTML = ``;

    idioma_Elegido.innerHTML = ``;

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
    //___________________________________________________________________________________________________________________________________________________
    // Funciones para la logica del programa cuando ya comenzo:
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
    // Funcion para cambiar el color del jugador que saca
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
    // Funcion para terminar el partido
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
    // Asignar eventos para actualizar el puntaje, espera si se acciona un boton u el otro:
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

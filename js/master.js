let equipoLocal = "";
let equipoVisitante = "";




// Obtengo los Datos del equipo Local
document.getElementById('guardarLocal').addEventListener('click', function() {
    let posicionesLocal = [];
    equipoLocal = document.getElementById('nombre_Equipo_Local').value;
    

    // Obtener los valores de los inputs y almacenarlos en el array
    for (let i = 1; i <= 6; i++) {
        let valor_Local = document.getElementById(`pos_Local_${i}`).value;
        posicionesLocal.push(parseInt(valor_Local)); // Convertir a entero y agregar al array
    }

    console.log(posicionesLocal); 
    console.log(equipoLocal); 
});

// Obtengo los Datos del equipo Local
document.getElementById('guardarVisitante').addEventListener('click', function() {
    let posicionesVisitante = [];
    equipoVisitante = document.getElementById('nombre_Equipo_Visitante').value;

    // Obtener los valores de los inputs y almacenarlos en el array
    for (let i = 1; i <= 6; i++) {
        let valor_Visitante = document.getElementById(`pos_Visitante_${i}`).value;
        posicionesVisitante.push(parseInt(valor_Visitante)); // Convertir a entero y agregar al array
    }

    console.log(posicionesVisitante);
    console.log(equipoVisitante);
});

//obtengo quien tiene el saque (Si se apreta el del local, se asigna al local... Si se aprieta el visitante, se asgina al visitante)

document.getElementById('boton_Saque_Local').addEventListener('click', function() {
    let botonSaqueLocal = document.getElementById('boton_Saque_Local');

    
    botonSaqueLocal.classList.toggle('btn-secondary');
    botonSaqueLocal.classList.toggle('btn-success');
    let primer_saque = 1;
    console.log(primer_saque);
});


document.getElementById('boton_Saque_Visitante').addEventListener('click',function(){
    let botonSaqueVisitante = document.getElementById('boton_Saque_Visitante');

    botonSaqueVisitante.classList.toggle('btn-secondary');
    botonSaqueVisitante.classList.toggle('btn-success');
    let primer_saque = 2;
    console.log(primer_saque);

})


//Boton para empezar el partido
document.getElementById('boton_Empezar').addEventListener('click',function(){

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

});
